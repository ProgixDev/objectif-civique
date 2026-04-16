export type CoachOffer = {
  id: "single" | "pack3" | "full";
  title: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
  badge?: string;
};

export const COACH_OFFERS: CoachOffer[] = [
  {
    id: "single",
    title: "1 séance",
    price: "49 €",
    period: "ponctuel",
    features: [
      "1 visio de 45 min",
      "Plan d'action écrit",
      "Réponse aux questions",
    ],
    highlight: false,
  },
  {
    id: "pack3",
    title: "Pack 3 séances",
    price: "129 €",
    period: "économisez 12 €",
    features: [
      "3 visios de 45 min",
      "Suivi entre les séances",
      "Documents personnalisés",
    ],
    highlight: true,
    badge: "POPULAIRE",
  },
  {
    id: "full",
    title: "Accompagnement complet",
    price: "299 €",
    period: "jusqu'à l'examen",
    features: [
      "Visios illimitées",
      "Aide aux démarches préfecture",
      "Garantie satisfaction",
    ],
    highlight: false,
  },
];
