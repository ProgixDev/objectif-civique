import { Question } from "@/types";

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: "a1",
    category: "NAT",
    theme: "valeurs",
    text: "Quelle est la devise de la France ?",
    choices: [
      "Liberté, Égalité, Fraternité",
      "Unité, Force, Honneur",
      "Travail, Famille, Patrie",
      "Liberté, Justice, Paix",
    ],
    correctIndex: 0,
    explanation:
      "La devise de la République française est inscrite dans la Constitution.",
  },
  {
    id: "a2",
    category: "NAT",
    theme: "culture",
    text: "Quel est l'hymne national français ?",
    choices: [
      "Le chant des partisans",
      "La Marseillaise",
      "La Carmagnole",
      "Le chant du départ",
    ],
    correctIndex: 1,
    explanation:
      "La Marseillaise, composée en 1792, est l'hymne national depuis 1879.",
  },
  {
    id: "a3",
    category: "NAT",
    theme: "geographie",
    text: "Combien de régions y a-t-il en France métropolitaine ?",
    choices: ["11", "12", "13", "18"],
    correctIndex: 2,
    explanation:
      "Depuis la réforme de 2016, la France métropolitaine compte 13 régions.",
  },
  {
    id: "a4",
    category: "NAT",
    theme: "institutions",
    text: "Qui élit le Président de la République ?",
    choices: [
      "Le Parlement",
      "Les grands électeurs",
      "Le peuple au suffrage universel direct",
      "Les sénateurs uniquement",
    ],
    correctIndex: 2,
    explanation:
      "Depuis 1962, le Président est élu au suffrage universel direct.",
  },
  {
    id: "a5",
    category: "NAT",
    theme: "culture",
    text: "Quelle est la principale fête nationale française ?",
    choices: ["1er mai", "8 mai", "14 juillet", "11 novembre"],
    correctIndex: 2,
    explanation:
      "Le 14 juillet commémore la prise de la Bastille de 1789.",
  },
];
