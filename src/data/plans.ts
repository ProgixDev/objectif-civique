import { Plan } from "@/types";

/**
 * Les 6 forfaits commerciaux. L'ordre = ordre d'affichage dans le paywall.
 *
 * NB : le `price` est l'affichage ; `amountCents` est la source de vérité
 * numérique. Les `id` servent de clé partout (DB, Stripe, gating) — ne pas
 * renommer sans migration.
 */
export const PLANS: Plan[] = [
  {
    id: "discovery",
    title: "Découverte",
    price: "5,99 €",
    period: "/ 7 jours",
    amountCents: 599,
    mode: "payment",
    accessDays: 7,
    highlight: false,
    features: [
      "Accès complet pendant 7 jours",
      "Toutes les questions",
      "Idéal pour tester l'app",
    ],
  },
  {
    id: "premium",
    title: "Premium",
    price: "9,99 €",
    period: "/ mois",
    amountCents: 999,
    mode: "subscription",
    accessDays: null,
    highlight: false,
    features: [
      "Toutes les questions",
      "Simulations illimitées",
      "Suivi de progression",
    ],
  },
  {
    id: "silver",
    title: "Argent",
    price: "15,99 €",
    period: "/ 3 mois",
    amountCents: 1599,
    mode: "subscription",
    accessDays: null,
    highlight: false,
    features: [
      "Tout du plan Premium",
      "Économisez vs mensuel",
      "Accompagnement prioritaire",
    ],
  },
  {
    id: "gold",
    title: "Or",
    price: "19,99 €",
    period: "/ 6 mois",
    amountCents: 1999,
    mode: "subscription",
    accessDays: null,
    highlight: true,
    badge: "RECOMMANDÉ",
    features: [
      "Tout du plan Argent",
      "Meilleur rapport qualité-prix",
      "Support prioritaire",
    ],
  },
  {
    id: "diamond",
    title: "Diamant",
    price: "29,99 €",
    period: "/ an",
    amountCents: 2999,
    mode: "subscription",
    accessDays: null,
    highlight: false,
    features: [
      "Tout du plan Or",
      "Le plus économique sur 1 an",
      "Toutes les futures mises à jour",
    ],
  },
  {
    id: "vip",
    title: "Accès VIP",
    price: "39,99 €",
    period: "à vie",
    amountCents: 3999,
    mode: "payment",
    accessDays: null,
    highlight: false,
    badge: "À VIE",
    features: [
      "Accès illimité à vie",
      "Paiement unique, jamais de renouvellement",
      "Toutes les futures mises à jour",
    ],
  },
];

export const PLAN_LABELS: Record<string, string> = {
  free: "Gratuit",
  discovery: "Découverte",
  premium: "Premium",
  silver: "Argent",
  gold: "Or",
  diamond: "Diamant",
  vip: "Accès VIP",
};

/** Récupère un forfait par son id. */
export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
