export type PartnerProfile = {
  id: string;
  /** Nom d'icône lucide-react-native */
  icon: string;
  title: string;
  description: string;
};

export type PartnerBenefit = {
  id: string;
  /** Nom d'icône lucide-react-native */
  icon: string;
  title: string;
  description: string;
};

export type PartnerStep = {
  number: number;
  title: string;
  description: string;
};

export const PARTNER_INTRO = {
  title: "Programme partenaire",
  tagline:
    "Rejoignez Objectif Civique et accompagnez ensemble les candidats à l'examen civique français.",
};

/**
 * Profils acceptés au programme partenaire — listés explicitement
 * pour que les visiteurs identifient rapidement leur cas.
 */
export const PARTNER_PROFILES: PartnerProfile[] = [
  {
    id: "youtubers",
    icon: "Youtube",
    title: "YouTubeurs",
    description:
      "Chaînes spécialisées sur l'intégration, la vie en France ou l'examen civique.",
  },
  {
    id: "influencers",
    icon: "Instagram",
    title: "Influenceurs & créateurs",
    description:
      "Créateurs de contenu sur les réseaux sociaux suivant les communautés immigrées.",
  },
  {
    id: "training",
    icon: "GraduationCap",
    title: "Organismes de formation",
    description:
      "Centres de formation linguistique, civique ou préparant aux examens officiels.",
  },
  {
    id: "associations",
    icon: "HeartHandshake",
    title: "Associations liées à l'immigration",
    description:
      "Associations d'aide aux immigrés, intégration et démarches administratives.",
  },
  {
    id: "pros",
    icon: "Briefcase",
    title: "Professionnels de l'accompagnement",
    description:
      "Avocats, juristes, conseillers en immigration, médiateurs administratifs.",
  },
];

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    id: "commission",
    icon: "BadgePercent",
    title: "Commission attractive",
    description:
      "Une commission sur chaque utilisateur référencé qui s'abonne via votre lien partenaire.",
  },
  {
    id: "dashboard",
    icon: "LayoutDashboard",
    title: "Tableau de bord dédié",
    description:
      "Suivez vos référencements, vos revenus et vos statistiques en temps réel.",
  },
  {
    id: "support",
    icon: "Headphones",
    title: "Support prioritaire",
    description:
      "Une équipe dédiée pour répondre à vos questions et accompagner vos utilisateurs.",
  },
  {
    id: "content",
    icon: "Sparkles",
    title: "Contenus & visuels prêts",
    description:
      "Bannières, codes promo et supports de communication fournis gratuitement.",
  },
];

export const PARTNER_STEPS: PartnerStep[] = [
  {
    number: 1,
    title: "Remplir le formulaire",
    description:
      "Présentez votre activité et votre communauté en quelques lignes.",
  },
  {
    number: 2,
    title: "Échanger avec notre équipe",
    description:
      "Un membre de l'équipe vous contacte sous 48h pour discuter du partenariat.",
  },
  {
    number: 3,
    title: "Recevoir vos accès",
    description:
      "Vous recevez votre lien partenaire personnalisé et l'accès au tableau de bord.",
  },
  {
    number: 4,
    title: "Commencer à recommander",
    description:
      "Partagez Objectif Civique à votre communauté et suivez vos résultats.",
  },
];
