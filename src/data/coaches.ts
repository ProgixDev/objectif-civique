export type Coach = {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  completedSessions: number;
};

export const COACHES: Coach[] = [
  {
    id: "c1",
    name: "Amina Bensouda",
    specialty: "Naturalisation & démarches",
    languages: ["Français", "Arabe", "Anglais"],
    rating: 4.9,
    completedSessions: 312,
  },
  {
    id: "c2",
    name: "Mehdi Rahmani",
    specialty: "Carte de résident",
    languages: ["Français", "Arabe", "Espagnol"],
    rating: 4.8,
    completedSessions: 218,
  },
  {
    id: "c3",
    name: "Fatou Diallo",
    specialty: "Préparation intensive",
    languages: ["Français", "Anglais", "Wolof"],
    rating: 4.9,
    completedSessions: 427,
  },
];
