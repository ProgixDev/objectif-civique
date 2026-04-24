export type GuideSection = {
  id: string;
  title: string;
  body: string;
};

export const GUIDE_INTRO = {
  title: "Découvrir Objectif Civique",
  tagline:
    "Votre compagnon pour préparer l'examen civique et l'entretien de naturalisation.",
};

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "objective",
    title: "L'objectif de cette application",
    body:
      "Objectif Civique vous aide à préparer, seul(e) et à votre rythme, l'examen civique et l'entretien de naturalisation française. L'application couvre les trois parcours officiels : Carte de Résident (CR), Carte de Séjour Pluriannuelle (CSP) et Naturalisation (NAT).",
  },
  {
    id: "how-to-use",
    title: "Comment utiliser l'application",
    body:
      "1. Choisissez votre objectif (CR, CSP ou NAT) lors de la personnalisation.\n\n2. Entraînez-vous avec l'onglet Entraînement : révisez thème par thème (institutions, histoire, valeurs, géographie, culture).\n\n3. Lancez une Simulation quand vous vous sentez prêt(e) : 40 questions, 45 minutes, seuil de réussite à 80 %.\n\n4. Suivez votre progression dans l'onglet Progrès.\n\n5. Consultez les Flashcards pour une révision rapide avant le jour J.",
  },
  {
    id: "eligibility",
    title: "Suis-je concerné(e) par l'examen civique ?",
    body:
      "Certaines personnes sont dispensées de l'examen civique : les mineurs, les personnes de 65 ans et plus, et les personnes en situation de handicap sur présentation d'un certificat médical. Faites le test d'éligibilité dans l'application pour savoir si vous devez passer l'examen.",
  },
  {
    id: "exam-day",
    title: "Le jour de l'examen",
    body:
      "L'examen se déroule dans un centre agréé par la préfecture. Vous répondrez à 40 questions à choix multiple en 45 minutes. Il faut obtenir au moins 32 bonnes réponses sur 40 (80 %) pour réussir. Utilisez l'onglet Centres d'examen pour trouver le centre le plus proche de chez vous.",
  },
  {
    id: "content-source",
    title: "D'où viennent les questions ?",
    body:
      "Toutes les questions sont issues du livret du citoyen et des listes officielles publiées par le ministère de l'Intérieur sur formation-civique.interieur.gouv.fr. Le contenu est mis à jour chaque année selon les évolutions de la législation.",
  },
  {
    id: "support",
    title: "Besoin d'aide ?",
    body:
      "Consultez l'onglet Profil pour gérer votre abonnement, vos paramètres et nous contacter. Vous pouvez aussi échanger avec la communauté dans l'onglet Forum et suivre les dernières actualités sur la naturalisation dans l'onglet Actualités.",
  },
];

export const GUIDE_FAQ = [
  {
    q: "L'application est-elle à jour ?",
    a: "Oui, nous actualisons les questions et explications à chaque nouvelle version officielle publiée par le ministère de l'Intérieur.",
  },
  {
    q: "Puis-je utiliser l'application hors-ligne ?",
    a: "Les questions déjà téléchargées restent accessibles hors-ligne. La synchronisation de votre progression nécessite une connexion internet.",
  },
  {
    q: "Quelle est la différence entre Entraînement et Simulation ?",
    a: "L'Entraînement est à votre rythme avec feedback immédiat après chaque réponse. La Simulation reproduit les conditions réelles de l'examen : 40 questions, 45 minutes chronométrées, correction à la fin.",
  },
  {
    q: "Comment réussir l'examen civique ?",
    a: "Visez 32 bonnes réponses sur 40 (80 %). Entraînez-vous régulièrement, lisez les explications détaillées après chaque question, et enchaînez plusieurs simulations complètes avant le jour J.",
  },
];
