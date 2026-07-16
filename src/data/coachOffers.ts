/**
 * Services d'accompagnement administratif proposés par l'équipe Objectif Civique.
 * Aligné sur la structure du site DemarchesCivique (6 pôles de spécialisation).
 *
 * Note : ce ne sont plus des "offres tarifaires" mais des **pôles de
 * spécialisation**. Chaque pôle est un type de démarche pour lequel nos
 * juristes peuvent vous accompagner. Le tarif est défini lors du premier
 * échange.
 */
export type CoachService = {
  id: string;
  /** Nom d'icône lucide-react-native */
  icon: string;
  title: string;
  description: string;
};

export const COACH_SERVICES: CoachService[] = [
  {
    id: "asile",
    icon: "Gavel",
    title: "Demandeurs d'asile",
    description:
      "Accompagnement pour votre demande d'asile. Aide OFPRA, préparation entretien, suivi complet.",
  },
  {
    id: "etudiants",
    icon: "GraduationCap",
    title: "Étudiants",
    description:
      "Études en France. Inscription, visa, titre de séjour étudiant.",
  },
  {
    id: "titre-sejour",
    icon: "BadgeCheck",
    title: "Titre de séjour",
    description:
      "Première demande ou renouvellement. Constitution et vérification du dossier.",
  },
  {
    id: "naturalisation",
    icon: "Award",
    title: "Naturalisation",
    description:
      "Demande de nationalité française. Préparation complète du dossier.",
  },
  {
    id: "regroupement",
    icon: "Users",
    title: "Regroupement familial",
    description:
      "Faire venir votre famille en France. Dossier OFII, conditions de ressources.",
  },
  {
    id: "regularisation",
    icon: "Scale",
    title: "Régularisation",
    description:
      "Régulariser votre situation administrative en France.",
  },
  {
    id: "dcem",
    icon: "Plane",
    title: "Document de circulation (DCEM)",
    description:
      "Document de circulation pour étranger mineur : permettez à votre enfant de voyager et de revenir en France en toute légalité.",
  },
  {
    id: "taj",
    icon: "Eraser",
    title: "Effacement du fichier TAJ",
    description:
      "Demande d'effacement ou de rectification de vos données dans le fichier TAJ (Traitement d'Antécédents Judiciaires).",
  },
];

/** Méthode en 4 étapes affichée sur la page Accompagnement. */
export type CoachStep = {
  number: number;
  icon: string;
  title: string;
  description: string;
};

export const COACH_STEPS: CoachStep[] = [
  {
    number: 1,
    icon: "Phone",
    title: "Contact",
    description: "Prise de contact initiale et analyse sommaire de votre situation.",
  },
  {
    number: 2,
    icon: "FileText",
    title: "Proposition",
    description:
      "Établissement d'un devis transparent et d'une stratégie personnalisée.",
  },
  {
    number: 3,
    icon: "Handshake",
    title: "Accompagnement",
    description:
      "Montage du dossier, relecture critique et suivi avec les autorités.",
  },
  {
    number: 4,
    icon: "BadgeCheck",
    title: "Finalisation",
    description: "Obtention de votre titre ou validation de votre démarche.",
  },
];

/** Garanties / engagements de l'équipe. */
export type CoachGuarantee = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export const COACH_GUARANTEES: CoachGuarantee[] = [
  {
    id: "objective",
    icon: "Scale",
    title: "Évaluation objective",
    description:
      "Nous analysons vos chances réelles de succès dès le premier échange. Aucun frais n'est engagé sans visibilité complète sur la stratégie adoptée.",
  },
  {
    id: "expertise",
    icon: "ShieldCheck",
    title: "Maîtrise des procédures",
    description:
      "Une pratique quotidienne du droit des étrangers et de la jurisprudence administrative pour anticiper les exigences des services de l'État.",
  },
  {
    id: "deontology",
    icon: "Lock",
    title: "Secret professionnel",
    description:
      "Chaque situation est traitée dans le respect absolu de la déontologie, avec la réactivité nécessaire face aux urgences administratives.",
  },
];

/** Coordonnées de l'équipe d'accompagnement Objectif Civique. */
export const COACH_CONTACT = {
  phone: "+33 7 51 25 23 09",
  phoneTel: "+33751252309",
  // Numéro perso du client (provisoire, à remplacer par le numéro pro).
  email: "service.horizon224@gmail.com",
  hours: "Lun – Sam : 9h – 20h",
  whatsapp: "+33751252309",
} as const;
