import { ThemeId } from "@/types";

export type LessonSection = {
  heading: string;
  body: string;
};

export type Lesson = {
  themeId: ThemeId;
  intro: string;
  sections: LessonSection[];
  keyPoints: string[];
};

export const LESSONS: Record<ThemeId, Lesson> = {
  institutions: {
    themeId: "institutions",
    intro:
      "Les institutions de la République française sont organisées selon le principe de séparation des pouvoirs : exécutif, législatif et judiciaire. Comprendre leur rôle est essentiel pour l'examen civique.",
    sections: [
      {
        heading: "Le pouvoir exécutif",
        body:
          "Le Président de la République est le chef de l'État, élu au suffrage universel direct pour 5 ans. Il nomme le Premier ministre, qui dirige le Gouvernement et conduit la politique de la Nation.",
      },
      {
        heading: "Le pouvoir législatif",
        body:
          "Le Parlement est composé de l'Assemblée nationale (577 députés élus pour 5 ans) et du Sénat (348 sénateurs élus pour 6 ans). Il vote les lois, contrôle le Gouvernement et vote le budget.",
      },
      {
        heading: "Le pouvoir judiciaire",
        body:
          "La justice est indépendante. Elle est rendue au nom du peuple français. Le Conseil constitutionnel veille à la conformité des lois à la Constitution.",
      },
    ],
    keyPoints: [
      "La France est une République indivisible, laïque, démocratique et sociale.",
      "La Constitution actuelle est celle de la Ve République, adoptée en 1958.",
      "Le mandat présidentiel est de 5 ans, renouvelable une fois consécutivement.",
    ],
  },
  histoire: {
    themeId: "histoire",
    intro:
      "L'histoire de France s'étend sur plus de deux millénaires. Quelques dates et événements clés sont régulièrement évalués lors de l'examen civique et de l'entretien de naturalisation.",
    sections: [
      {
        heading: "La Révolution française (1789)",
        body:
          "Le 14 juillet 1789, la prise de la Bastille marque le début de la Révolution française. La Déclaration des Droits de l'Homme et du Citoyen est adoptée le 26 août 1789. Elle pose les fondements de la société démocratique moderne.",
      },
      {
        heading: "Les Républiques successives",
        body:
          "La France a connu cinq Républiques : la Ire (1792), la IIe (1848), la IIIe (1870), la IVe (1946) et la Ve (depuis 1958). La Ve République a été fondée par le général Charles de Gaulle.",
      },
      {
        heading: "Les guerres mondiales",
        body:
          "La Première Guerre mondiale (1914-1918) et la Seconde Guerre mondiale (1939-1945) ont profondément marqué la France. Le 8 mai 1945 commémore la victoire sur l'Allemagne nazie ; le 11 novembre commémore l'armistice de 1918.",
      },
    ],
    keyPoints: [
      "14 juillet 1789 : prise de la Bastille, fête nationale.",
      "Déclaration des Droits de l'Homme et du Citoyen : 26 août 1789.",
      "La Ve République a été fondée par Charles de Gaulle en 1958.",
    ],
  },
  valeurs: {
    themeId: "valeurs",
    intro:
      "Les valeurs républicaines — Liberté, Égalité, Fraternité et laïcité — sont au cœur de la société française. L'examen civique vérifie votre compréhension de ces principes.",
    sections: [
      {
        heading: "La devise : Liberté, Égalité, Fraternité",
        body:
          "Héritée de la Révolution française, cette devise figure sur les bâtiments publics et les documents officiels. Elle symbolise les trois valeurs fondamentales de la République.",
      },
      {
        heading: "La laïcité",
        body:
          "La laïcité est un principe fondamental de la République. Elle garantit la liberté de conscience, la neutralité de l'État vis-à-vis des religions, et le libre exercice des cultes dans le respect de l'ordre public. La loi de séparation des Églises et de l'État date de 1905.",
      },
      {
        heading: "L'égalité entre les femmes et les hommes",
        body:
          "L'égalité des droits entre les femmes et les hommes est garantie par la Constitution. Les femmes ont obtenu le droit de vote en 1944 et participent pleinement à la vie politique, économique et sociale.",
      },
    ],
    keyPoints: [
      "Devise de la République : Liberté, Égalité, Fraternité.",
      "Loi de séparation des Églises et de l'État : 9 décembre 1905.",
      "Droit de vote des femmes : 21 avril 1944.",
    ],
  },
  geographie: {
    themeId: "geographie",
    intro:
      "Connaître la géographie de la France — son territoire, ses régions, ses fleuves et ses frontières — fait partie des attendus de l'examen civique.",
    sections: [
      {
        heading: "Le territoire",
        body:
          "La France métropolitaine compte environ 552 000 km². Elle est divisée en 13 régions et 101 départements. S'y ajoutent les territoires d'Outre-mer (Guadeloupe, Martinique, Guyane, Réunion, Mayotte, etc.).",
      },
      {
        heading: "Les fleuves et montagnes",
        body:
          "Les principaux fleuves sont la Seine, la Loire, le Rhône, la Garonne et le Rhin. Les principales montagnes sont les Alpes, les Pyrénées, le Massif central, les Vosges et le Jura. Le Mont Blanc (4 809 m) est le point culminant.",
      },
      {
        heading: "Les frontières et voisins",
        body:
          "La France métropolitaine partage ses frontières terrestres avec la Belgique, le Luxembourg, l'Allemagne, la Suisse, l'Italie, Monaco, l'Espagne et Andorre. Elle est entourée par l'Atlantique, la Manche et la Méditerranée.",
      },
    ],
    keyPoints: [
      "13 régions et 101 départements en France.",
      "La capitale est Paris.",
      "Les fleuves principaux : Seine, Loire, Rhône, Garonne, Rhin.",
    ],
  },
  culture: {
    themeId: "culture",
    intro:
      "La culture française — ses symboles, ses figures, ses traditions — est un élément clé de l'identité nationale. L'examen civique teste votre connaissance du patrimoine commun.",
    sections: [
      {
        heading: "Les symboles de la République",
        body:
          "Le drapeau tricolore (bleu, blanc, rouge), l'hymne national La Marseillaise, la Marianne (allégorie de la République) et le coq gaulois sont les principaux symboles de la France.",
      },
      {
        heading: "Les grandes figures",
        body:
          "Parmi les grandes figures françaises : Charles de Gaulle, Napoléon Bonaparte, Victor Hugo, Marie Curie, Simone Veil, Albert Camus. Ces personnalités ont marqué l'histoire, les sciences, la littérature ou les droits humains.",
      },
      {
        heading: "Les traditions et le patrimoine",
        body:
          "La gastronomie française est inscrite au patrimoine culturel immatériel de l'UNESCO. Le 14 juillet est la fête nationale. Le 1er mai (fête du Travail), le 8 mai (victoire 1945) et le 11 novembre (armistice 1918) sont également des jours fériés républicains.",
      },
    ],
    keyPoints: [
      "Drapeau tricolore : bleu, blanc, rouge.",
      "Hymne national : La Marseillaise, composé par Rouget de Lisle.",
      "Fête nationale : 14 juillet.",
    ],
  },
};
