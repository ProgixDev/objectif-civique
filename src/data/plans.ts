import { Plan } from "@/types";

export const PLANS: Plan[] = [
  {
    id: "monthly",
    title: "1 mois",
    price: "4,99 €",
    period: "/mois",
    highlight: false,
    features: [
      "Toutes les questions",
      "Simulations illimitées",
      "Suivi de progression",
    ],
  },
  {
    id: "quarterly",
    title: "3 mois",
    price: "9,99 €",
    period: "/3 mois",
    highlight: true,
    badge: "RECOMMANDÉ",
    features: [
      "Tout du plan 1 mois",
      "Économisez 33%",
      "Accompagnement prioritaire",
    ],
  },
  {
    id: "lifetime",
    title: "À vie",
    price: "29,99 €",
    period: "paiement unique",
    highlight: false,
    features: [
      "Accès illimité à vie",
      "Toutes les futures mises à jour",
      "Support prioritaire",
    ],
  },
];

export const PLAN_LABELS: Record<string, string> = {
  free: "Gratuit",
  monthly: "1 mois",
  quarterly: "3 mois",
  lifetime: "À vie",
};
