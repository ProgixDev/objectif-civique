export type ForumReply = {
  id: string;
  author: string;
  authorInitials: string;
  authorGoal: "NAT" | "CSP" | "CR";
  body: string;
  createdAt: string; // ISO
  helpful: number;
};

export type ForumThread = {
  id: string;
  author: string;
  authorInitials: string;
  authorGoal: "NAT" | "CSP" | "CR";
  topic: "NAT" | "CSP" | "CR" | "general";
  title: string;
  body: string;
  createdAt: string;
  views: number;
  replies: ForumReply[];
};

export const FORUM_THREADS: ForumThread[] = [
  {
    id: "t-001",
    author: "Aminata D.",
    authorInitials: "AD",
    authorGoal: "NAT",
    topic: "NAT",
    title: "Examen civique récent : comment s'est-il passé ?",
    body:
      "Bonjour à tous, est-ce que l'un ou l'une d'entre vous a passé l'examen civique récemment dans le cadre d'une demande de naturalisation ? Je voudrais avoir vos retours sur l'ambiance, les questions, le type de centre… Merci d'avance !",
    createdAt: "2026-04-19T14:23:00Z",
    views: 143,
    replies: [
      {
        id: "r-001-1",
        author: "Karim B.",
        authorInitials: "KB",
        authorGoal: "NAT",
        body:
          "Je l'ai passé la semaine dernière à Lyon, tout s'est très bien passé. 40 questions, 45 minutes, une majorité sur les institutions et la laïcité. Bien réviser la devise et la Constitution.",
        createdAt: "2026-04-19T18:42:00Z",
        helpful: 12,
      },
      {
        id: "r-001-2",
        author: "Sarah M.",
        authorInitials: "SM",
        authorGoal: "NAT",
        body:
          "Même chose pour moi à Paris. Les questions sont claires, pas de pièges. La simulation ici m'a beaucoup aidée à gérer le chrono.",
        createdAt: "2026-04-20T09:15:00Z",
        helpful: 8,
      },
    ],
  },
  {
    id: "t-002",
    author: "Mohamed L.",
    authorInitials: "ML",
    authorGoal: "CSP",
    topic: "CSP",
    title: "CSP : quels documents préparer avant le rendez-vous ?",
    body:
      "J'ai mon rendez-vous pour la carte de séjour pluriannuelle dans 3 semaines. Quelqu'un peut me dire quels documents sont indispensables et si l'examen civique est systématiquement demandé ? Merci.",
    createdAt: "2026-04-17T11:10:00Z",
    views: 98,
    replies: [
      {
        id: "r-002-1",
        author: "Fatou C.",
        authorInitials: "FC",
        authorGoal: "CSP",
        body:
          "Passeport, attestation d'examen civique (si requis selon votre situation), justificatifs de ressources et de domicile. Préfecture peut demander d'autres pièces selon le motif de séjour.",
        createdAt: "2026-04-17T15:30:00Z",
        helpful: 15,
      },
    ],
  },
  {
    id: "t-003",
    author: "Elena R.",
    authorInitials: "ER",
    authorGoal: "CR",
    topic: "CR",
    title: "Carte de résident : délais de traitement en 2026",
    body:
      "Quelqu'un a-t-il une idée des délais actuels pour obtenir la carte de résident de 10 ans ? J'ai déposé mon dossier il y a 4 mois et toujours pas de nouvelles.",
    createdAt: "2026-04-14T08:45:00Z",
    views: 212,
    replies: [
      {
        id: "r-003-1",
        author: "Abou S.",
        authorInitials: "AS",
        authorGoal: "CR",
        body:
          "Chez moi ça a pris 6 mois en Île-de-France. Ça dépend beaucoup de la préfecture. Relancez par courrier si aucune nouvelle après 4 mois.",
        createdAt: "2026-04-14T12:20:00Z",
        helpful: 9,
      },
      {
        id: "r-003-2",
        author: "Linh T.",
        authorInitials: "LT",
        authorGoal: "CR",
        body:
          "Pareil, 5-7 mois en moyenne selon les retours de ce forum. Patience. Sur le site ANEF vous pouvez suivre l'état de votre dossier.",
        createdAt: "2026-04-15T10:05:00Z",
        helpful: 6,
      },
    ],
  },
  {
    id: "t-004",
    author: "Yuki N.",
    authorInitials: "YN",
    authorGoal: "NAT",
    topic: "general",
    title: "Niveau B2 : quelles ressources recommander ?",
    body:
      "Je dois justifier du niveau B2 de français pour la naturalisation. Quelles ressources, podcasts ou livres vous recommandez pour m'améliorer en plus de l'application ?",
    createdAt: "2026-04-10T19:30:00Z",
    views: 176,
    replies: [
      {
        id: "r-004-1",
        author: "Camille F.",
        authorInitials: "CF",
        authorGoal: "NAT",
        body:
          "Le podcast InnerFrench est excellent pour le B2. Lire des articles de Le Monde ou France Info régulièrement aide aussi beaucoup pour la culture générale.",
        createdAt: "2026-04-11T08:12:00Z",
        helpful: 22,
      },
    ],
  },
  {
    id: "t-005",
    author: "Abdoulaye K.",
    authorInitials: "AK",
    authorGoal: "NAT",
    topic: "NAT",
    title: "Entretien d'assimilation : à quoi s'attendre ?",
    body:
      "Mon entretien est programmé en mai. Quelqu'un peut partager son expérience ? Est-ce qu'il y a des questions pièges ?",
    createdAt: "2026-04-06T14:00:00Z",
    views: 301,
    replies: [],
  },
];
