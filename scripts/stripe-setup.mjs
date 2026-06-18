#!/usr/bin/env node
/**
 * Crée les 6 produits + tarifs Objectif Civique dans Stripe, puis affiche les
 * price_id à coller dans les secrets des Edge Functions.
 *
 * Sans dépendance : utilise `fetch` (Node >= 18) directement sur l'API Stripe.
 *
 * Usage (PowerShell) :
 *   $env:STRIPE_SECRET_KEY = "sk_test_..."   # clé SECRÈTE de test
 *   node scripts/stripe-setup.mjs
 *
 * Idempotence : relancer crée de NOUVEAUX produits. À lancer une seule fois par
 * environnement (test, puis live). Pour repartir de zéro, archive les anciens
 * produits dans le Dashboard Stripe.
 */

const SECRET = process.env.STRIPE_SECRET_KEY;
if (!SECRET) {
  console.error("✗ Variable STRIPE_SECRET_KEY manquante (sk_test_... ou sk_live_...).");
  process.exit(1);
}

const API = "https://api.stripe.com/v1";

/** Appel API Stripe en x-www-form-urlencoded (encodage des clés imbriquées). */
async function stripe(path, params) {
  const body = new URLSearchParams();
  const add = (key, value) => {
    if (value === undefined || value === null) return;
    body.append(key, String(value));
  };
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      for (const [k2, v2] of Object.entries(v)) add(`${k}[${k2}]`, v2);
    } else {
      add(k, v);
    }
  }
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`${path} → ${json.error?.message ?? res.status}`);
  }
  return json;
}

// Définition des forfaits. Montants en centimes d'euro.
const PLANS = [
  { key: "discovery", name: "Découverte — 7 jours", amount: 599, recurring: null },
  { key: "premium", name: "Premium — Mensuel", amount: 999, recurring: { interval: "month", interval_count: 1 } },
  { key: "silver", name: "Argent — 3 mois", amount: 1599, recurring: { interval: "month", interval_count: 3 } },
  { key: "gold", name: "Or — 6 mois", amount: 1999, recurring: { interval: "month", interval_count: 6 } },
  { key: "diamond", name: "Diamant — Annuel", amount: 2999, recurring: { interval: "year", interval_count: 1 } },
  { key: "vip", name: "Accès VIP — À vie", amount: 3999, recurring: null },
];

// Variable d'env de price_id attendue par les Edge Functions (abonnements seuls).
const PRICE_ENV = {
  premium: "STRIPE_PRICE_PREMIUM",
  silver: "STRIPE_PRICE_SILVER",
  gold: "STRIPE_PRICE_GOLD",
  diamond: "STRIPE_PRICE_DIAMOND",
};

const isLive = SECRET.startsWith("sk_live_");

async function main() {
  console.log(`\n→ Création des produits Stripe (${isLive ? "LIVE ⚠️" : "TEST"})…\n`);
  const out = {};

  for (const plan of PLANS) {
    const product = await stripe("/products", {
      name: `Objectif Civique · ${plan.name}`,
      metadata: { plan: plan.key },
    });

    const priceParams = {
      product: product.id,
      unit_amount: plan.amount,
      currency: "eur",
      metadata: { plan: plan.key },
    };
    if (plan.recurring) priceParams.recurring = plan.recurring;

    const price = await stripe("/prices", priceParams);
    out[plan.key] = price.id;
    console.log(`  ✓ ${plan.name.padEnd(26)} → ${price.id}`);
  }

  console.log(
    "\n────────────────────────────────────────────────────────────\n" +
      "Secrets à définir sur les Edge Functions Supabase :\n" +
      "  supabase secrets set \\\n" +
      Object.entries(PRICE_ENV)
        .map(([key, env]) => `    ${env}=${out[key]}`)
        .join(" \\\n") +
      "\n\n(Découverte et VIP sont des paiements uniques : pas de price_id requis,\n" +
      " le montant est facturé directement par l'Edge Function.)\n"
  );
}

main().catch((e) => {
  console.error("\n✗ Échec :", e.message);
  process.exit(1);
});
