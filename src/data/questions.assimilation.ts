import { AssimilationQuestion, AssimilationTopic } from "@/types";

/**
 * Entretien d'assimilation — questions susceptibles d'être posées
 * lors de l'entretien en préfecture après dépôt du dossier de naturalisation.
 *
 * Format : Vrai/Faux ou choix multiples (2-3 options) + explication.
 * Sources : compilation de questions des forums + référentiel Livret du citoyen.
 * À enrichir avec le PDF de 2500 questions du client une fois validé.
 */

export const ASSIMILATION_TOPIC_LABELS: Record<AssimilationTopic, string> = {
  motivation: "Motivation",
  valeurs: "Valeurs de la République",
  histoire: "Histoire de France",
  institutions: "Institutions",
  "vie-quotidienne": "Vie en société",
  personnel: "Vie personnelle",
};

export const ASSIMILATION_QUESTIONS: AssimilationQuestion[] = [
  // ---------- VALEURS ----------
  {
    id: "ass-val-1",
    topic: "valeurs",
    type: "vraiFaux",
    text: "En France, chacun est libre de croire ou de ne pas croire en une religion.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "La liberté de conscience est garantie par le principe de laïcité. Toute personne peut croire ou ne pas croire, et changer librement de religion.",
  },
  {
    id: "ass-val-2",
    topic: "valeurs",
    type: "vraiFaux",
    text: "La devise de la République française est « Liberté, Égalité, Fraternité ».",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Héritée de la Révolution française, cette devise est inscrite à l'article 2 de la Constitution.",
  },
  {
    id: "ass-val-3",
    topic: "valeurs",
    type: "vraiFaux",
    text: "Un employeur peut refuser d'embaucher une femme parce qu'elle est une femme.",
    choices: ["Vrai", "Faux"],
    correctIndex: 1,
    explanation:
      "C'est une discrimination interdite par la loi. L'égalité entre les femmes et les hommes est garantie par la Constitution.",
  },
  {
    id: "ass-val-4",
    topic: "valeurs",
    type: "choix",
    text: "Que garantit le principe de laïcité ?",
    choices: [
      "L'interdiction de toute religion",
      "La neutralité de l'État et la liberté de conscience",
      "L'obligation de pratiquer une religion",
    ],
    correctIndex: 1,
    explanation:
      "La laïcité (loi de 1905) garantit la liberté de conscience et la neutralité de l'État vis-à-vis des religions.",
  },
  {
    id: "ass-val-5",
    topic: "valeurs",
    type: "vraiFaux",
    text: "La répudiation d'une épouse est autorisée en France.",
    choices: ["Vrai", "Faux"],
    correctIndex: 1,
    explanation:
      "La répudiation est interdite. Seul le divorce, prononcé par un juge, met fin au mariage en France.",
  },
  {
    id: "ass-val-6",
    topic: "valeurs",
    type: "vraiFaux",
    text: "On peut insulter publiquement une personne en raison de son origine.",
    choices: ["Vrai", "Faux"],
    correctIndex: 1,
    explanation:
      "Les injures à caractère raciste, sexiste ou homophobe sont punies par la loi.",
  },
  {
    id: "ass-val-7",
    topic: "valeurs",
    type: "choix",
    text: "À l'école publique, peut-on porter un signe religieux très visible ?",
    choices: ["Oui, toujours", "Non, c'est interdit", "Seulement le vendredi"],
    correctIndex: 1,
    explanation:
      "La loi du 15 mars 2004 interdit les signes religieux ostensibles à l'école publique au nom de la laïcité.",
  },

  // ---------- HISTOIRE ----------
  {
    id: "ass-his-1",
    topic: "histoire",
    type: "vraiFaux",
    text: "La Révolution française a commencé en 1789.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Le 14 juillet 1789, la prise de la Bastille marque le début symbolique de la Révolution. C'est aujourd'hui la fête nationale.",
  },
  {
    id: "ass-his-2",
    topic: "histoire",
    type: "choix",
    text: "Qui a fondé la Ve République en 1958 ?",
    choices: ["Napoléon Bonaparte", "Charles de Gaulle", "François Mitterrand"],
    correctIndex: 1,
    explanation:
      "Charles de Gaulle a fondé la Ve République en 1958 et en a été le premier président élu.",
  },
  {
    id: "ass-his-3",
    topic: "histoire",
    type: "vraiFaux",
    text: "Les femmes ont obtenu le droit de vote en France en 1944.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Le droit de vote des femmes a été accordé par ordonnance du 21 avril 1944. Elles ont voté pour la première fois en 1945.",
  },
  {
    id: "ass-his-4",
    topic: "histoire",
    type: "choix",
    text: "Que commémore-t-on le 11 novembre ?",
    choices: [
      "La fin de la Seconde Guerre mondiale",
      "L'armistice de 1918 (fin de la Première Guerre mondiale)",
      "La prise de la Bastille",
    ],
    correctIndex: 1,
    explanation:
      "Le 11 novembre 1918, l'armistice est signé à Rethondes, mettant fin à la Première Guerre mondiale.",
  },
  {
    id: "ass-his-5",
    topic: "histoire",
    type: "vraiFaux",
    text: "La peine de mort a été abolie en France sous la présidence de François Mitterrand.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "La peine de mort a été abolie le 9 octobre 1981, sous la présidence de François Mitterrand, à l'initiative de Robert Badinter.",
  },
  {
    id: "ass-his-6",
    topic: "histoire",
    type: "choix",
    text: "En quelle année l'esclavage a-t-il été définitivement aboli en France ?",
    choices: ["1789", "1848", "1944"],
    correctIndex: 1,
    explanation:
      "L'esclavage a été définitivement aboli par décret le 27 avril 1848, sous l'impulsion de Victor Schœlcher.",
  },

  // ---------- INSTITUTIONS ----------
  {
    id: "ass-ins-1",
    topic: "institutions",
    type: "vraiFaux",
    text: "Le président de la République est élu pour 7 ans.",
    choices: ["Vrai", "Faux"],
    correctIndex: 1,
    explanation:
      "Depuis le référendum de 2000, le mandat présidentiel est de 5 ans (quinquennat), renouvelable une fois consécutivement.",
  },
  {
    id: "ass-ins-2",
    topic: "institutions",
    type: "choix",
    text: "Qui nomme le Premier ministre ?",
    choices: [
      "L'Assemblée nationale",
      "Le président de la République",
      "Le Sénat",
    ],
    correctIndex: 1,
    explanation:
      "Le Premier ministre est nommé par le président de la République (article 8 de la Constitution).",
  },
  {
    id: "ass-ins-3",
    topic: "institutions",
    type: "vraiFaux",
    text: "Le Parlement français est composé de l'Assemblée nationale et du Sénat.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Le Parlement bicaméral comprend l'Assemblée nationale (577 députés) et le Sénat (348 sénateurs).",
  },
  {
    id: "ass-ins-4",
    topic: "institutions",
    type: "choix",
    text: "À partir de quel âge peut-on voter en France ?",
    choices: ["16 ans", "18 ans", "21 ans"],
    correctIndex: 1,
    explanation:
      "Le droit de vote est ouvert à tout citoyen français majeur, soit à partir de 18 ans.",
  },
  {
    id: "ass-ins-5",
    topic: "institutions",
    type: "vraiFaux",
    text: "Le maire est élu directement par les habitants de la commune.",
    choices: ["Vrai", "Faux"],
    correctIndex: 1,
    explanation:
      "Les habitants élisent les conseillers municipaux. Ce sont ensuite les conseillers municipaux qui élisent le maire parmi eux.",
  },

  // ---------- VIE QUOTIDIENNE ----------
  {
    id: "ass-vie-1",
    topic: "vie-quotidienne",
    type: "choix",
    text: "Quel numéro composer pour appeler les pompiers ?",
    choices: ["15", "17", "18"],
    correctIndex: 2,
    explanation:
      "Le 18 est le numéro des pompiers. Le 15 = SAMU, le 17 = police/gendarmerie, le 112 = numéro d'urgence européen.",
  },
  {
    id: "ass-vie-2",
    topic: "vie-quotidienne",
    type: "vraiFaux",
    text: "Jusqu'à quel âge l'instruction est-elle obligatoire en France : jusqu'à 16 ans.",
    choices: ["Vrai", "Faux"],
    correctIndex: 1,
    explanation:
      "Depuis la rentrée 2019, l'instruction est obligatoire de 3 à 16 ans. La formation est elle obligatoire jusqu'à 18 ans.",
  },
  {
    id: "ass-vie-3",
    topic: "vie-quotidienne",
    type: "vraiFaux",
    text: "Le SMIC est le salaire minimum légal en France.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Le SMIC (Salaire Minimum Interprofessionnel de Croissance) est le salaire horaire minimum en dessous duquel un employeur ne peut pas rémunérer un salarié.",
  },
  {
    id: "ass-vie-4",
    topic: "vie-quotidienne",
    type: "choix",
    text: "Quelle est la durée légale du temps de travail par semaine en France ?",
    choices: ["32 heures", "35 heures", "40 heures"],
    correctIndex: 1,
    explanation:
      "La durée légale du travail est fixée à 35 heures par semaine depuis 2000. Au-delà, ce sont des heures supplémentaires.",
  },
  {
    id: "ass-vie-5",
    topic: "vie-quotidienne",
    type: "vraiFaux",
    text: "Le mariage entre deux personnes du même sexe est autorisé en France.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "La loi du 17 mai 2013 a ouvert le mariage aux couples de même sexe en France.",
  },
  {
    id: "ass-vie-6",
    topic: "vie-quotidienne",
    type: "vraiFaux",
    text: "Le travail non déclaré est légal s'il s'agit de petits travaux.",
    choices: ["Vrai", "Faux"],
    correctIndex: 1,
    explanation:
      "Le travail non déclaré (« au noir ») est interdit et puni par la loi, quel que soit le montant.",
  },

  // ---------- MOTIVATION (entretien personnel) ----------
  {
    id: "ass-mot-1",
    topic: "motivation",
    type: "choix",
    text: "Lors de l'entretien, quelle est la question de motivation la plus fréquente ?",
    choices: [
      "Quelle est votre couleur préférée ?",
      "Pourquoi voulez-vous devenir français ?",
      "Aimez-vous la cuisine française ?",
    ],
    correctIndex: 1,
    explanation:
      "« Pourquoi voulez-vous devenir français ? » est la question d'ouverture quasi-systématique. Préparez une réponse sincère liée à vos attaches, projet de vie et adhésion aux valeurs.",
  },
  {
    id: "ass-mot-2",
    topic: "motivation",
    type: "vraiFaux",
    text: "Lors de l'entretien d'assimilation, l'agent évalue aussi votre niveau de français oral.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Un niveau B2 à l'oral est attendu : capacité à s'exprimer spontanément et clairement sur des sujets variés.",
  },
  {
    id: "ass-mot-3",
    topic: "motivation",
    type: "choix",
    text: "Quelle attitude est attendue lors de l'entretien ?",
    choices: [
      "Apprendre des réponses par cœur",
      "Montrer une adhésion sincère aux valeurs républicaines",
      "Éviter de donner son avis",
    ],
    correctIndex: 1,
    explanation:
      "L'agent cherche à vérifier votre adhésion réelle aux valeurs de la République, pas votre capacité à réciter. Soyez sincère et personnel.",
  },

  // ---------- PERSONNEL ----------
  {
    id: "ass-per-1",
    topic: "personnel",
    type: "vraiFaux",
    text: "Lors de l'entretien, on peut vous demander quelle est votre profession.",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Les questions sur la vie professionnelle (employeur, fonction, ancienneté) sont systématiques. Préparez une fiche claire.",
  },
  {
    id: "ass-per-2",
    topic: "personnel",
    type: "vraiFaux",
    text: "L'agent peut vous demander la date de mariage de votre conjoint(e) si vous êtes marié(e).",
    choices: ["Vrai", "Faux"],
    correctIndex: 0,
    explanation:
      "Les questions de vie privée (date de mariage, prénoms des enfants, dates de naissance) sont posées pour vérifier la cohérence du dossier.",
  },
  {
    id: "ass-per-3",
    topic: "personnel",
    type: "choix",
    text: "Si une question vous met mal à l'aise, que faire ?",
    choices: [
      "Refuser de répondre sèchement",
      "Demander poliment des précisions ou expliquer pourquoi",
      "Quitter l'entretien",
    ],
    correctIndex: 1,
    explanation:
      "Il est toujours possible de demander une reformulation ou d'expliquer poliment votre situation. La courtoisie et la transparence sont clés.",
  },
];

export function getAssimilationByTopic(
  topic: AssimilationTopic
): AssimilationQuestion[] {
  return ASSIMILATION_QUESTIONS.filter((q) => q.topic === topic);
}

export const ASSIMILATION_TOPICS_ORDER: AssimilationTopic[] = [
  "motivation",
  "valeurs",
  "histoire",
  "institutions",
  "vie-quotidienne",
  "personnel",
];
