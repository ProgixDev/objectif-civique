import { ThemeId } from "@/types";

export type SubTopic = {
  title: string;
  summary: string;
  facts?: string[];
};

export type LessonSection = {
  heading: string;
  body: string;
  subTopics?: SubTopic[];
};

export type Lesson = {
  themeId: ThemeId;
  intro: string;
  sections: LessonSection[];
  keyPoints: string[];
};

/**
 * Leçons résumées affichées dans `/theme/[id]`. Contenu de transition —
 * le contenu pédagogique riche est dans FULL-DATA/2-guides-pedagogiques/cours
 * et sera branché en Phase 5 d'intégration.
 */
export const LESSONS: Record<ThemeId, Lesson> = {
  "principes-valeurs-republique": {
    themeId: "principes-valeurs-republique",
    intro:
      "Les principes et valeurs républicains — liberté, égalité, fraternité, laïcité — sont au cœur de la société française. L'examen civique vérifie votre compréhension de ces principes fondamentaux.",
    sections: [
      {
        heading: "La devise et les symboles",
        body:
          "« Liberté, Égalité, Fraternité » est la devise officielle, héritée de la Révolution. Le drapeau tricolore, l'hymne (La Marseillaise) et Marianne sont les symboles de la République.",
      },
      {
        heading: "La laïcité",
        body:
          "Loi du 9 décembre 1905 : séparation des Églises et de l'État. La République est laïque, garantit la liberté de conscience et le libre exercice des cultes.",
      },
    ],
    keyPoints: [
      "Devise : Liberté, Égalité, Fraternité",
      "Loi de 1905 sur la laïcité",
      "Drapeau bleu-blanc-rouge, Marseillaise (1792)",
      "Fête nationale : 14 juillet",
    ],
  },
  "droits-et-devoirs": {
    themeId: "droits-et-devoirs",
    intro:
      "Les droits et devoirs du citoyen découlent de la Déclaration des droits de l'homme et du citoyen (1789) et de la Constitution. Ils définissent la place de chacun dans la société française.",
    sections: [
      {
        heading: "Droits fondamentaux",
        body:
          "Liberté d'expression, d'association, de conscience, droit à l'éducation, à la santé, au logement. Tous protégés par la Constitution.",
      },
      {
        heading: "Devoirs du citoyen",
        body:
          "Respect des lois, paiement des impôts, scolarisation des enfants, défense du pays, jury d'assises, vote.",
      },
    ],
    keyPoints: [
      "Déclaration des droits de l'homme et du citoyen (1789)",
      "Liberté, propriété, sûreté, résistance à l'oppression",
      "Devoirs civiques : impôts, vote, défense, jury",
    ],
  },
  "systeme-institutionnel": {
    themeId: "systeme-institutionnel",
    intro:
      "Les institutions de la République française sont organisées selon le principe de séparation des pouvoirs : exécutif, législatif et judiciaire. Comprendre leur rôle est essentiel.",
    sections: [
      {
        heading: "Le pouvoir exécutif",
        body:
          "Le Président de la République (élu pour 5 ans au suffrage universel direct) et le Gouvernement (Premier ministre + ministres) exercent le pouvoir exécutif.",
      },
      {
        heading: "Le pouvoir législatif",
        body:
          "Le Parlement comprend l'Assemblée nationale (577 députés élus pour 5 ans) et le Sénat (348 sénateurs élus pour 6 ans). Il vote les lois.",
      },
      {
        heading: "Le pouvoir judiciaire",
        body:
          "Composé de juges et magistrats indépendants. Tribunaux judiciaires (civil, pénal) et administratifs.",
      },
    ],
    keyPoints: [
      "Ve République depuis 1958",
      "Président élu pour 5 ans, mandat renouvelable une fois",
      "Parlement bicaméral : Assemblée nationale + Sénat",
      "Séparation des pouvoirs (Montesquieu)",
    ],
  },
  "histoire-geographie-culture": {
    themeId: "histoire-geographie-culture",
    intro:
      "L'histoire, la géographie et la culture françaises forment l'identité de la République. Quelques dates clés, lieux et figures majeures sont régulièrement évalués.",
    sections: [
      {
        heading: "Dates clés",
        body:
          "496 : baptême de Clovis. 1789 : Révolution française. 1804 : Code civil. 1905 : laïcité. 1944 : droit de vote des femmes. 1958 : Ve République. 2002 : passage à l'euro.",
      },
      {
        heading: "Géographie",
        body:
          "France métropolitaine + 5 départements et régions d'outre-mer. 18 régions, 101 départements. Capitale : Paris. Frontières avec la Belgique, le Luxembourg, l'Allemagne, la Suisse, l'Italie, Monaco, l'Espagne et Andorre.",
      },
      {
        heading: "Culture",
        body:
          "Patrimoine littéraire (Hugo, Voltaire), artistique (Monet, Rodin), philosophique (Descartes, Sartre), gastronomique reconnu par l'UNESCO.",
      },
    ],
    keyPoints: [
      "1789 : Révolution française",
      "1958 : Ve République (de Gaulle)",
      "18 régions, 101 départements",
      "Membre fondateur de l'Union européenne",
    ],
  },
  "vivre-en-societe": {
    themeId: "vivre-en-societe",
    intro:
      "Vivre en France implique de connaître les démarches administratives, le système de santé, l'école, le monde du travail et les valeurs partagées au quotidien.",
    sections: [
      {
        heading: "Vie quotidienne",
        body:
          "Numéros d'urgence (15 SAMU, 17 Police, 18 Pompiers, 112 Europe). Sécurité sociale, CAF, Pôle Emploi sont des organismes centraux.",
      },
      {
        heading: "École et travail",
        body:
          "École obligatoire de 3 à 16 ans. Code du travail régit les relations employeur-salarié. Salaire minimum (SMIC), durée légale du travail (35h).",
      },
      {
        heading: "Démarches administratives",
        body:
          "Mairie : état civil, carte d'identité, mariage. Préfecture : titres de séjour, naturalisation, permis de conduire.",
      },
    ],
    keyPoints: [
      "École obligatoire 3-16 ans",
      "Sécurité sociale : maladie, retraite, famille, chômage",
      "SMIC, 35h, congés payés",
      "Égalité hommes-femmes",
    ],
  },
};
