import { Plan } from "@/types";

/**
 * Les 6 formules commerciales — toutes en **paiement UNIQUE** (aucun
 * renouvellement automatique). Le candidat achète un accès pour une durée, puis
 * décide librement de prolonger ou non à la fin.
 *
 * NB : le `price` est l'affichage ; `amountCents` est la source de vérité.
 * `accessDays` = durée d'accès (null = à vie). Les `id` servent de clé partout
 * (DB, Stripe, gating) — ne pas renommer sans migration.
 */
export const PLANS: Plan[] = [
  {
    id: "discovery",
    title: "Accès 7 jours",
    price: "5,99 €",
    period: "paiement unique",
    amountCents: 599,
    mode: "payment",
    accessDays: 7,
    highlight: false,
    features: [
      "Accès complet pendant 7 jours",
      "Toutes les questions officielles",
      "Idéal pour tester",
    ],
  },
  {
    id: "premium",
    title: "Accès 1 mois",
    price: "11,99 €",
    period: "paiement unique",
    amountCents: 1199,
    mode: "payment",
    accessDays: 30,
    highlight: false,
    features: [
      "Accès complet pendant 1 mois",
      "Simulations illimitées",
      "Suivi de progression",
    ],
  },
  {
    id: "silver",
    title: "Accès 3 mois",
    price: "17,99 €",
    period: "paiement unique",
    amountCents: 1799,
    mode: "payment",
    accessDays: 90,
    highlight: false,
    features: [
      "Accès complet pendant 3 mois",
      "Toutes les mises en situation",
      "Plus économique que le mois",
    ],
  },
  {
    id: "gold",
    title: "Accès 6 mois",
    price: "21,99 €",
    period: "paiement unique",
    amountCents: 2199,
    mode: "payment",
    accessDays: 180,
    highlight: true,
    badge: "RECOMMANDÉ",
    features: [
      "Accès complet pendant 6 mois",
      "Meilleur rapport qualité-prix",
      "Pour une préparation sereine",
    ],
  },
  {
    id: "diamond",
    title: "Accès 1 an",
    price: "31,99 €",
    period: "paiement unique",
    amountCents: 3199,
    mode: "payment",
    accessDays: 365,
    highlight: false,
    features: [
      "Accès complet pendant 1 an",
      "Le plus économique sur la durée",
      "Toutes les futures mises à jour",
    ],
  },
  {
    id: "vip",
    title: "Accès à vie",
    price: "41,99 €",
    period: "paiement unique",
    amountCents: 4199,
    mode: "payment",
    accessDays: null,
    highlight: false,
    badge: "À VIE",
    features: [
      "Accès illimité, à vie",
      "Aucun renouvellement, jamais",
      "Toutes les futures mises à jour",
    ],
  },
];

export const PLAN_LABELS: Record<string, string> = {
  free: "Gratuit",
  discovery: "Accès 7 jours",
  premium: "Accès 1 mois",
  silver: "Accès 3 mois",
  gold: "Accès 6 mois",
  diamond: "Accès 1 an",
  vip: "Accès à vie",
};

/** Récupère un forfait par son id. */
export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
