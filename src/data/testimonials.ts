export type Testimonial = {
  id: string;
  name: string;
  origin: string;
  goal: string;
  quote: string;
  avatarKey: "avatar1" | "avatar2" | "avatar3";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aïcha T.",
    origin: "Maroc",
    goal: "Naturalisation",
    quote:
      "Le coach m'a vraiment aidée à structurer ma préparation. J'ai eu 38/40 !",
    avatarKey: "avatar1",
  },
  {
    id: "t2",
    name: "Mamadou D.",
    origin: "Sénégal",
    goal: "Carte de résident",
    quote:
      "Les démarches de préfecture n'avaient plus de secret pour moi après 3 séances.",
    avatarKey: "avatar2",
  },
  {
    id: "t3",
    name: "Lina B.",
    origin: "Algérie",
    goal: "CSP",
    quote:
      "Merci pour l'accompagnement humain et patient, indispensable pour moi.",
    avatarKey: "avatar3",
  },
];
