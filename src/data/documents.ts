import { Category } from "@/types";

export type DocumentSection = {
  id: string;
  title: string;
  description: string;
};

export type DocumentItem = {
  id: string;
  sectionId: string;
  label: string;
  detail?: string;
  /** "required" = obligatoire ; "conditional" = selon votre situation */
  status: "required" | "conditional";
};

export type DossierContent = {
  goal: Category;
  /** Texte court d'introduction affiché en haut de l'écran. */
  intro: string;
  /** Niveau de langue exigé pour le cas. */
  languageLevel: string;
  sections: DocumentSection[];
  items: DocumentItem[];
};

export const DOSSIERS: Record<Category, DossierContent> = {
  NAT: {
    goal: "NAT",
    intro:
      "Pièces à réunir pour déposer une demande de naturalisation française. Vérifiez chaque élément avant la prise de rendez-vous en préfecture.",
    languageLevel: "B2 (oral et écrit)",
    sections: [
      {
        id: "identite",
        title: "État civil & identité",
        description: "Documents officiels d'identité et de filiation.",
      },
      {
        id: "sejour",
        title: "Séjour en France",
        description: "Justificatifs de votre résidence régulière.",
      },
      {
        id: "ressources",
        title: "Ressources & fiscalité",
        description: "Preuves d'insertion professionnelle et fiscale.",
      },
      {
        id: "integration",
        title: "Intégration & langue",
        description: "Diplômes ou attestations exigés pour la naturalisation.",
      },
    ],
    items: [
      {
        id: "nat-cni",
        sectionId: "identite",
        label: "Pièce d'identité en cours de validité",
        detail: "Passeport ou carte d'identité du pays d'origine.",
        status: "required",
      },
      {
        id: "nat-acte-naissance",
        sectionId: "identite",
        label: "Acte de naissance traduit",
        detail: "Traduction par traducteur assermenté, légalisée ou apostillée.",
        status: "required",
      },
      {
        id: "nat-livret-famille",
        sectionId: "identite",
        label: "Livret de famille (si concerné)",
        detail: "En cas de mariage ou d'enfants.",
        status: "conditional",
      },
      {
        id: "nat-titre",
        sectionId: "sejour",
        label: "Titre de séjour en cours de validité",
        status: "required",
      },
      {
        id: "nat-justif-residence",
        sectionId: "sejour",
        label: "Justificatifs de résidence sur 5 ans",
        detail: "Factures, quittances, baux, attestations d'hébergement.",
        status: "required",
      },
      {
        id: "nat-avis-impots",
        sectionId: "ressources",
        label: "Avis d'imposition des 3 dernières années",
        status: "required",
      },
      {
        id: "nat-contrat-travail",
        sectionId: "ressources",
        label: "Contrat de travail et 3 derniers bulletins de salaire",
        status: "required",
      },
      {
        id: "nat-attest-langue",
        sectionId: "integration",
        label: "Attestation de niveau B2 de français",
        detail: "TCF, TEF, DELF B2, DALF, ou diplôme français équivalent.",
        status: "required",
      },
      {
        id: "nat-test-civique",
        sectionId: "integration",
        label: "Attestation du test civique",
        detail: "Validation des connaissances civiques (test officiel).",
        status: "required",
      },
    ],
  },

  CR: {
    goal: "CR",
    intro:
      "Pièces à fournir pour obtenir ou renouveler une Carte de Résident de 10 ans.",
    languageLevel: "A2 (oral et écrit)",
    sections: [
      {
        id: "identite",
        title: "État civil & identité",
        description: "Documents officiels d'identité et de filiation.",
      },
      {
        id: "sejour",
        title: "Ancienneté & séjour",
        description: "Justificatifs d'ancienneté sur le territoire.",
      },
      {
        id: "ressources",
        title: "Ressources & logement",
        description: "Preuves de stabilité économique.",
      },
      {
        id: "integration",
        title: "Intégration & langue",
        description: "Conditions linguistiques et républicaines.",
      },
    ],
    items: [
      {
        id: "cr-cni",
        sectionId: "identite",
        label: "Pièce d'identité en cours de validité",
        status: "required",
      },
      {
        id: "cr-acte-naissance",
        sectionId: "identite",
        label: "Acte de naissance traduit",
        detail: "Traduction par traducteur assermenté.",
        status: "required",
      },
      {
        id: "cr-titre-actuel",
        sectionId: "sejour",
        label: "Titre de séjour en cours de validité",
        status: "required",
      },
      {
        id: "cr-justif-anciennete",
        sectionId: "sejour",
        label: "Justificatifs d'ancienneté (≥ 5 ans en France)",
        detail: "Baux, factures, attestations, bulletins de salaire.",
        status: "required",
      },
      {
        id: "cr-justif-logement",
        sectionId: "ressources",
        label: "Justificatif de logement",
        detail: "Bail, taxe d'habitation, ou attestation d'hébergement.",
        status: "required",
      },
      {
        id: "cr-ressources",
        sectionId: "ressources",
        label: "Justificatifs de ressources",
        detail: "Avis d'imposition, bulletins de salaire, contrats de travail.",
        status: "required",
      },
      {
        id: "cr-attest-langue",
        sectionId: "integration",
        label: "Attestation de niveau A2 de français",
        detail: "TCF, TEF, DELF A2 ou équivalent.",
        status: "required",
      },
      {
        id: "cr-test-civique",
        sectionId: "integration",
        label: "Attestation du test civique",
        status: "required",
      },
    ],
  },

  CSP: {
    goal: "CSP",
    intro:
      "Pièces à fournir pour obtenir ou renouveler une Carte de Séjour Pluriannuelle.",
    languageLevel: "A2 (oral et écrit)",
    sections: [
      {
        id: "identite",
        title: "État civil & identité",
        description: "Documents officiels d'identité.",
      },
      {
        id: "sejour",
        title: "Séjour en France",
        description: "Justificatifs de votre séjour régulier.",
      },
      {
        id: "ressources",
        title: "Activité & ressources",
        description: "Preuves d'activité professionnelle ou de ressources.",
      },
      {
        id: "integration",
        title: "Intégration & langue",
        description: "Conditions linguistiques et civiques.",
      },
    ],
    items: [
      {
        id: "csp-cni",
        sectionId: "identite",
        label: "Pièce d'identité en cours de validité",
        status: "required",
      },
      {
        id: "csp-acte-naissance",
        sectionId: "identite",
        label: "Acte de naissance",
        detail: "Traduction par traducteur assermenté si étranger.",
        status: "required",
      },
      {
        id: "csp-vls-tsr",
        sectionId: "sejour",
        label: "Visa long séjour ou récépissé en cours",
        status: "required",
      },
      {
        id: "csp-justif-domicile",
        sectionId: "sejour",
        label: "Justificatif de domicile de moins de 6 mois",
        status: "required",
      },
      {
        id: "csp-cir",
        sectionId: "integration",
        label: "Attestation du Contrat d'Intégration Républicaine (CIR)",
        detail: "Signé avec l'OFII et formations suivies.",
        status: "required",
      },
      {
        id: "csp-attest-langue",
        sectionId: "integration",
        label: "Attestation de niveau A2 de français",
        detail: "Délivrée par l'organisme de formation linguistique.",
        status: "required",
      },
      {
        id: "csp-activite",
        sectionId: "ressources",
        label: "Justificatif d'activité",
        detail: "Contrat de travail, inscription Pôle Emploi, formation, etc.",
        status: "required",
      },
      {
        id: "csp-ressources",
        sectionId: "ressources",
        label: "Justificatifs de ressources",
        detail: "Bulletins de salaire ou attestations équivalentes.",
        status: "conditional",
      },
    ],
  },
};
