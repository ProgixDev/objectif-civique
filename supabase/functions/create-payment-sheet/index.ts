// Edge Function : prépare un PaymentSheet Stripe pour le forfait demandé.
//
// Appelée par l'app (hook usePurchase) avec le JWT de l'utilisateur. Renvoie
// { paymentIntent, ephemeralKey, customer } pour initialiser le PaymentSheet
// natif. Le forfait n'est PAS encore activé ici : c'est le webhook Stripe qui
// confirmera le paiement et écrira `subscription_plan` (source de vérité).

import Stripe from "npm:stripe@^17";
import { createClient } from "npm:@supabase/supabase-js@2";
import { CURRENCY, PLAN_CONFIG, STRIPE_API_VERSION } from "../_shared/plans.ts";
import { corsHeaders, json } from "../_shared/http.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: STRIPE_API_VERSION,
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Identifier l'appelant via son JWT.
    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();
    if (userErr || !user) return json({ error: "unauthorized" }, 401);

    // 2. Valider le forfait demandé.
    const { planId } = await req.json().catch(() => ({ planId: null }));
    const cfg = PLAN_CONFIG[planId as string];
    if (!cfg) return json({ error: "invalid_plan" }, 400);

    const admin = createClient(supabaseUrl, serviceKey);

    // 3. Récupérer ou créer le client Stripe, mémorisé sur le profil.
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id, email")
      .eq("id", user.id)
      .maybeSingle();

    let customerId: string | null = profile?.stripe_customer_id ?? null;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? profile?.email ?? undefined,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      await admin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // 4. Clé éphémère (permet au PaymentSheet d'afficher/réutiliser les cartes).
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: STRIPE_API_VERSION }
    );

    let clientSecret: string | null = null;

    if (cfg.mode === "subscription") {
      const priceId = Deno.env.get(cfg.priceEnv!);
      if (!priceId) return json({ error: "price_not_configured" }, 500);

      // Changement de formule : on annule les abonnements actifs existants pour
      // éviter un double prélèvement (v1 = remplacement immédiat).
      const existing = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 10,
      });
      for (const sub of existing.data) {
        await stripe.subscriptions.cancel(sub.id, { prorate: false });
      }

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
        metadata: { user_id: user.id, plan: planId },
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const pi = invoice.payment_intent as Stripe.PaymentIntent;
      clientSecret = pi.client_secret;
    } else {
      // Paiement unique (Découverte 7 jours / VIP à vie).
      const pi = await stripe.paymentIntents.create({
        amount: cfg.amountCents,
        currency: CURRENCY,
        customer: customerId,
        automatic_payment_methods: { enabled: true },
        metadata: { user_id: user.id, plan: planId },
      });
      clientSecret = pi.client_secret;
    }

    if (!clientSecret) return json({ error: "no_client_secret" }, 500);

    return json({
      paymentIntent: clientSecret,
      ephemeralKey: ephemeralKey.secret,
      customer: customerId,
    });
  } catch (e) {
    console.error("[create-payment-sheet]", e);
    return json({ error: "server_error" }, 500);
  }
});
