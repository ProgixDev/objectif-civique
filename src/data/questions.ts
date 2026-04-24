import { Question } from "@/types";
import { EXTENDED_QUESTIONS } from "./questions.extended";

const BASE_QUESTIONS: Question[] = [
  // Institutions (10)
  {
    id: "q1",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est la devise de la République française ?",
    choices: [
      "Liberté, Égalité, Fraternité",
      "Liberté, Justice, Paix",
      "Travail, Famille, Patrie",
      "Unité, Force, Honneur",
    ],
    correctIndex: 0,
    explanation:
      "La devise de la République française, héritée de la Révolution de 1789, figure dans la Constitution.",
  },
  {
    id: "q2",
    category: "CSP",
    theme: "institutions",
    text: "Qui est le chef de l'État en France ?",
    choices: [
      "Le Premier ministre",
      "Le Président de la République",
      "Le président du Sénat",
      "Le président de l'Assemblée nationale",
    ],
    correctIndex: 1,
    explanation:
      "Le Président de la République est le chef de l'État, élu pour 5 ans au suffrage universel direct.",
  },
  {
    id: "q3",
    category: "NAT",
    theme: "institutions",
    text: "Combien de chambres compose le Parlement français ?",
    choices: ["Une", "Deux", "Trois", "Quatre"],
    correctIndex: 1,
    explanation:
      "Le Parlement est composé de deux chambres : l'Assemblée nationale et le Sénat.",
  },
  {
    id: "q4",
    category: "CR",
    theme: "institutions",
    text: "Qui élit les députés de l'Assemblée nationale ?",
    choices: [
      "Les sénateurs",
      "Les maires",
      "Les citoyens au suffrage universel direct",
      "Le Président de la République",
    ],
    correctIndex: 2,
    explanation:
      "Les députés sont élus par les citoyens au suffrage universel direct pour 5 ans.",
  },
  {
    id: "q5",
    category: "NAT",
    theme: "institutions",
    text: "Que signifie le sigle RF sur les bâtiments publics ?",
    choices: [
      "République Française",
      "Région France",
      "Royaume de France",
      "Rassemblement Français",
    ],
    correctIndex: 0,
    explanation:
      "RF signifie République Française — l'acronyme officiel de l'État.",
  },
  {
    id: "q6",
    category: "CSP",
    theme: "institutions",
    text: "Quelle est la durée du mandat présidentiel ?",
    choices: ["4 ans", "5 ans", "6 ans", "7 ans"],
    correctIndex: 1,
    explanation:
      "Depuis 2000, le mandat présidentiel est de 5 ans, renouvelable une fois consécutivement.",
  },
  {
    id: "q7",
    category: "NAT",
    theme: "institutions",
    text: "Quel est le symbole féminin représentant la République ?",
    choices: ["Marianne", "Jeanne", "Joséphine", "Clémence"],
    correctIndex: 0,
    explanation:
      "Marianne est la figure allégorique de la République française depuis la Révolution.",
  },
  {
    id: "q8",
    category: "CR",
    theme: "institutions",
    text: "Quelle est la capitale de la France ?",
    choices: ["Lyon", "Marseille", "Paris", "Toulouse"],
    correctIndex: 2,
    explanation: "Paris est la capitale de la France depuis le haut Moyen Âge.",
  },
  {
    id: "q9",
    category: "NAT",
    theme: "institutions",
    text: "Le Conseil constitutionnel veille à la conformité des lois avec :",
    choices: [
      "Les traités européens",
      "La Constitution",
      "Le Code civil",
      "Le règlement de l'Assemblée",
    ],
    correctIndex: 1,
    explanation:
      "Le Conseil constitutionnel contrôle la conformité des lois à la Constitution.",
  },
  {
    id: "q10",
    category: "CSP",
    theme: "institutions",
    text: "Qui nomme le Premier ministre ?",
    choices: [
      "L'Assemblée nationale",
      "Le Sénat",
      "Le peuple par référendum",
      "Le Président de la République",
    ],
    correctIndex: 3,
    explanation:
      "Le Premier ministre est nommé par le Président de la République.",
  },

  // Histoire (6)
  {
    id: "q11",
    category: "CSP",
    theme: "histoire",
    text: "En quelle année la Marseillaise est-elle devenue l'hymne national ?",
    choices: ["1789", "1795", "1879", "1958"],
    correctIndex: 2,
    explanation:
      "La Marseillaise, composée en 1792 par Rouget de Lisle, est devenue hymne national en 1879.",
  },
  {
    id: "q12",
    category: "NAT",
    theme: "histoire",
    text: "Quelle date marque la prise de la Bastille ?",
    choices: ["14 juillet 1789", "4 août 1789", "10 août 1792", "21 septembre 1792"],
    correctIndex: 0,
    explanation:
      "Le 14 juillet 1789 marque le début de la Révolution française avec la prise de la Bastille.",
  },
  {
    id: "q13",
    category: "NAT",
    theme: "histoire",
    text: "Qui a proclamé l'abolition de l'esclavage en France en 1848 ?",
    choices: [
      "Napoléon III",
      "Victor Schœlcher",
      "Jules Ferry",
      "Léon Gambetta",
    ],
    correctIndex: 1,
    explanation:
      "Victor Schœlcher a œuvré pour le décret d'abolition de l'esclavage du 27 avril 1848.",
  },
  {
    id: "q14",
    category: "CR",
    theme: "histoire",
    text: "En quelle année les femmes ont-elles obtenu le droit de vote en France ?",
    choices: ["1848", "1918", "1944", "1968"],
    correctIndex: 2,
    explanation:
      "Les femmes ont obtenu le droit de vote par ordonnance du 21 avril 1944.",
  },
  {
    id: "q15",
    category: "NAT",
    theme: "histoire",
    text: "Qui était le président de la République lors de la fondation de la Ve République ?",
    choices: [
      "Georges Pompidou",
      "Charles de Gaulle",
      "Vincent Auriol",
      "René Coty",
    ],
    correctIndex: 1,
    explanation:
      "Charles de Gaulle a fondé la Ve République en 1958 et en est devenu le premier président.",
  },
  {
    id: "q16",
    category: "CSP",
    theme: "histoire",
    text: "Quel événement a marqué la fin de la Seconde Guerre mondiale en Europe ?",
    choices: [
      "Le 8 mai 1945",
      "Le 11 novembre 1918",
      "Le 6 juin 1944",
      "Le 14 juillet 1945",
    ],
    correctIndex: 0,
    explanation:
      "Le 8 mai 1945 marque la capitulation de l'Allemagne nazie et la fin de la guerre en Europe.",
  },

  // Valeurs (6)
  {
    id: "q17",
    category: "NAT",
    theme: "valeurs",
    text: "Que signifie la laïcité en France ?",
    choices: [
      "L'interdiction des religions",
      "La séparation des Églises et de l'État",
      "Le financement public des cultes",
      "L'obligation de pratiquer une religion",
    ],
    correctIndex: 1,
    explanation:
      "La laïcité, loi de 1905, pose la séparation des Églises et de l'État et la neutralité religieuse.",
  },
  {
    id: "q18",
    category: "CR",
    theme: "valeurs",
    text: "Quelle est la loi fondamentale de la laïcité en France ?",
    choices: [
      "La loi de 1881",
      "La loi de 1905",
      "La loi de 1958",
      "La loi de 2004",
    ],
    correctIndex: 1,
    explanation:
      "La loi du 9 décembre 1905 fonde la laïcité en France.",
  },
  {
    id: "q19",
    category: "NAT",
    theme: "valeurs",
    text: "Les citoyens français sont égaux devant :",
    choices: [
      "L'école seulement",
      "La loi",
      "Le travail uniquement",
      "Le service public seulement",
    ],
    correctIndex: 1,
    explanation:
      "L'égalité devant la loi est un principe fondamental de la République.",
  },
  {
    id: "q20",
    category: "CSP",
    theme: "valeurs",
    text: "La liberté d'expression est garantie par :",
    choices: [
      "La Convention européenne",
      "La Déclaration des droits de l'homme de 1789",
      "La Charte de l'environnement",
      "La loi de 1905",
    ],
    correctIndex: 1,
    explanation:
      "La DDHC de 1789 garantit la liberté d'expression (article 11).",
  },
  {
    id: "q21",
    category: "NAT",
    theme: "valeurs",
    text: "Le principe de fraternité implique :",
    choices: [
      "L'obligation familiale",
      "La solidarité entre citoyens",
      "L'appartenance religieuse",
      "Le service militaire",
    ],
    correctIndex: 1,
    explanation:
      "La fraternité appelle à la solidarité et à l'entraide entre tous les citoyens.",
  },
  {
    id: "q22",
    category: "CR",
    theme: "valeurs",
    text: "Qui protège les droits et libertés garantis par la Constitution ?",
    choices: [
      "Le Président",
      "Le Conseil constitutionnel",
      "Le Premier ministre",
      "Le Sénat",
    ],
    correctIndex: 1,
    explanation:
      "Le Conseil constitutionnel veille au respect des droits fondamentaux.",
  },

  // Géographie (4)
  {
    id: "q23",
    category: "NAT",
    theme: "geographie",
    text: "Combien de régions métropolitaines compte la France ?",
    choices: ["11", "12", "13", "18"],
    correctIndex: 2,
    explanation:
      "Depuis 2016, la France métropolitaine est divisée en 13 régions.",
  },
  {
    id: "q24",
    category: "CSP",
    theme: "geographie",
    text: "Quel est le plus long fleuve de France ?",
    choices: ["La Seine", "La Loire", "Le Rhône", "La Garonne"],
    correctIndex: 1,
    explanation:
      "La Loire, avec ses 1 013 km, est le plus long fleuve de France.",
  },
  {
    id: "q25",
    category: "CR",
    theme: "geographie",
    text: "Le point culminant de la France métropolitaine est :",
    choices: ["Le Puy de Sancy", "Le Mont Blanc", "Le Puy de Dôme", "L'Aiguille du Midi"],
    correctIndex: 1,
    explanation:
      "Le Mont Blanc culmine à 4 810 m dans les Alpes.",
  },
  {
    id: "q26",
    category: "NAT",
    theme: "geographie",
    text: "La France est bordée par combien de mers et océans ?",
    choices: ["Un", "Deux", "Trois", "Quatre"],
    correctIndex: 2,
    explanation:
      "La France est bordée par la mer du Nord, la Manche, l'Atlantique et la Méditerranée.",
  },

  // Culture (4)
  {
    id: "q27",
    category: "NAT",
    theme: "culture",
    text: "Quelle est la principale fête nationale française ?",
    choices: [
      "Le 1er mai",
      "Le 8 mai",
      "Le 14 juillet",
      "Le 11 novembre",
    ],
    correctIndex: 2,
    explanation:
      "Le 14 juillet commémore la prise de la Bastille et la Fête de la Fédération.",
  },
  {
    id: "q28",
    category: "CSP",
    theme: "culture",
    text: "Quel musée parisien abrite la Joconde ?",
    choices: [
      "Le musée d'Orsay",
      "Le Louvre",
      "Le Centre Pompidou",
      "Le musée Rodin",
    ],
    correctIndex: 1,
    explanation:
      "La Joconde de Léonard de Vinci est exposée au musée du Louvre.",
  },
  {
    id: "q29",
    category: "CR",
    theme: "culture",
    text: "Quel auteur a écrit \"Les Misérables\" ?",
    choices: [
      "Émile Zola",
      "Victor Hugo",
      "Gustave Flaubert",
      "Honoré de Balzac",
    ],
    correctIndex: 1,
    explanation:
      "Victor Hugo a publié \"Les Misérables\" en 1862.",
  },
  {
    id: "q30",
    category: "NAT",
    theme: "culture",
    text: "Qui a peint les Nymphéas ?",
    choices: [
      "Claude Monet",
      "Pierre-Auguste Renoir",
      "Edgar Degas",
      "Paul Cézanne",
    ],
    correctIndex: 0,
    explanation:
      "Claude Monet, peintre impressionniste, a réalisé la célèbre série des Nymphéas.",
  },
];

export const QUESTIONS: Question[] = [...BASE_QUESTIONS, ...EXTENDED_QUESTIONS];

export const GOAL_LABELS = {
  NAT: "Naturalisation",
  CSP: "Carte de Séjour Pluriannuelle",
  CR: "Carte de Résident",
} as const;

export const DEADLINE_LABELS = {
  lt1m: "Moins d'1 mois",
  "1to3m": "1 à 3 mois",
  "3to6m": "3 à 6 mois",
  undecided: "Pas encore décidé",
} as const;

export const LEVEL_LABELS = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
  inconnu: "Non défini",
} as const;
