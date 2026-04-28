import { ThemeId } from "@/types";

export type SubTopic = {
  /** Short title shown as the sub-section heading (e.g. "La laïcité"). */
  title: string;
  /** 1–3 sentence résumé to memorise. */
  summary: string;
  /** Optional bullet "key facts" displayed under the summary. */
  facts?: string[];
};

export type LessonSection = {
  heading: string;
  body: string;
  /** Sub-topics that detail the section (e.g. devise, laïcité within Valeurs). */
  subTopics?: SubTopic[];
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
        subTopics: [
          {
            title: "Le Président de la République",
            summary:
              "Élu pour 5 ans au suffrage universel direct, renouvelable une fois consécutivement. Il est le chef des armées, garant de la Constitution et nomme le Premier ministre.",
            facts: [
              "Mandat : 5 ans (quinquennat depuis 2000)",
              "Réside au palais de l'Élysée",
              "Peut dissoudre l'Assemblée nationale",
            ],
          },
          {
            title: "Le Premier ministre",
            summary:
              "Nommé par le Président, il dirige le Gouvernement et conduit la politique de la Nation. Il réside à l'hôtel de Matignon.",
            facts: [
              "Nommé par le Président",
              "Coordonne l'action des ministres",
              "Responsable devant l'Assemblée nationale",
            ],
          },
        ],
      },
      {
        heading: "Le pouvoir législatif",
        body:
          "Le Parlement est composé de l'Assemblée nationale (577 députés élus pour 5 ans) et du Sénat (348 sénateurs élus pour 6 ans). Il vote les lois, contrôle le Gouvernement et vote le budget.",
        subTopics: [
          {
            title: "L'Assemblée nationale",
            summary:
              "577 députés élus pour 5 ans au suffrage universel direct. Elle vote les lois et peut renverser le Gouvernement par une motion de censure.",
            facts: ["577 députés", "Mandat : 5 ans", "Élus au suffrage direct"],
          },
          {
            title: "Le Sénat",
            summary:
              "348 sénateurs élus pour 6 ans au suffrage indirect par les grands électeurs. Il représente les collectivités territoriales.",
            facts: ["348 sénateurs", "Mandat : 6 ans", "Suffrage indirect"],
          },
        ],
      },
      {
        heading: "Le pouvoir judiciaire",
        body:
          "La justice est indépendante. Elle est rendue au nom du peuple français. Le Conseil constitutionnel veille à la conformité des lois à la Constitution.",
        subTopics: [
          {
            title: "L'autorité judiciaire",
            summary:
              "Indépendante des pouvoirs exécutif et législatif. Elle veille au respect des lois et protège les libertés individuelles.",
          },
          {
            title: "Le Conseil constitutionnel",
            summary:
              "Veille à la conformité des lois à la Constitution. Composé de 9 membres nommés pour 9 ans.",
          },
        ],
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
        subTopics: [
          {
            title: "La prise de la Bastille",
            summary:
              "Le 14 juillet 1789, le peuple parisien prend d'assaut la prison de la Bastille, symbole de l'arbitraire royal. Cette date est la fête nationale.",
          },
          {
            title: "La Déclaration des Droits de l'Homme et du Citoyen",
            summary:
              "Adoptée le 26 août 1789, elle proclame les principes universels de liberté, d'égalité et de fraternité. Elle reste un texte fondateur de la République.",
          },
        ],
      },
      {
        heading: "Les Républiques successives",
        body:
          "La France a connu cinq Républiques : la Ire (1792), la IIe (1848), la IIIe (1870), la IVe (1946) et la Ve (depuis 1958). La Ve République a été fondée par le général Charles de Gaulle.",
        subTopics: [
          {
            title: "La Ire République (1792)",
            summary:
              "Proclamée le 22 septembre 1792 après l'abolition de la monarchie. Premier régime républicain de la France.",
          },
          {
            title: "La Ve République (depuis 1958)",
            summary:
              "Fondée par Charles de Gaulle en 1958. Régime semi-présidentiel actuel, marqué par un exécutif fort.",
          },
        ],
      },
      {
        heading: "Les guerres mondiales",
        body:
          "La Première Guerre mondiale (1914-1918) et la Seconde Guerre mondiale (1939-1945) ont profondément marqué la France. Le 8 mai 1945 commémore la victoire sur l'Allemagne nazie ; le 11 novembre commémore l'armistice de 1918.",
        subTopics: [
          {
            title: "La Première Guerre mondiale (1914-1918)",
            summary:
              "Conflit mondial déclenché par l'attentat de Sarajevo. L'armistice est signé le 11 novembre 1918 — jour férié en France.",
          },
          {
            title: "La Seconde Guerre mondiale (1939-1945)",
            summary:
              "Marquée par l'Occupation allemande, la Résistance et l'appel du 18 juin 1940 du général de Gaulle. Le 8 mai commémore la victoire sur le nazisme.",
          },
        ],
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
        subTopics: [
          {
            title: "Liberté",
            summary:
              "Chacun peut faire ce qu'il veut tant qu'il ne nuit pas à autrui. La liberté inclut la liberté de conscience, d'expression, d'association et de circulation.",
          },
          {
            title: "Égalité",
            summary:
              "Tous les citoyens sont égaux devant la loi, sans distinction d'origine, de sexe, de religion ou de fortune. L'État lutte contre les discriminations.",
          },
          {
            title: "Fraternité",
            summary:
              "Lien de solidarité qui unit tous les membres de la société. Elle se traduit par l'entraide, la sécurité sociale et le devoir d'assistance.",
          },
        ],
      },
      {
        heading: "La laïcité",
        body:
          "La laïcité est un principe fondamental de la République. Elle garantit la liberté de conscience, la neutralité de l'État vis-à-vis des religions, et le libre exercice des cultes dans le respect de l'ordre public. La loi de séparation des Églises et de l'État date de 1905.",
        subTopics: [
          {
            title: "Comprendre la laïcité",
            summary:
              "Principe fondamental de la République française. Elle garantit la liberté de conscience tout en assurant la neutralité de l'État face aux religions.",
            facts: [
              "Loi de séparation des Églises et de l'État : 1905",
              "Journée de la laïcité : 9 décembre",
              "L'État ne reconnaît, ne salarie ni ne subventionne aucun culte",
            ],
          },
          {
            title: "La laïcité à l'école",
            summary:
              "Les signes religieux ostensibles sont interdits à l'école publique (loi de 2004). L'objectif : garantir un espace neutre où chacun peut apprendre librement.",
          },
          {
            title: "La neutralité de l'État",
            summary:
              "Les agents publics doivent être neutres : ils ne peuvent pas afficher de signe religieux dans l'exercice de leurs fonctions.",
          },
        ],
      },
      {
        heading: "L'égalité entre les femmes et les hommes",
        body:
          "L'égalité des droits entre les femmes et les hommes est garantie par la Constitution. Les femmes ont obtenu le droit de vote en 1944 et participent pleinement à la vie politique, économique et sociale.",
        subTopics: [
          {
            title: "Droits politiques",
            summary:
              "Droit de vote des femmes accordé le 21 avril 1944. Première utilisation : élections municipales de 1945.",
          },
          {
            title: "Égalité au travail",
            summary:
              "Interdiction des discriminations à l'embauche, à la rémunération et à la promotion. Le principe « à travail égal, salaire égal » est inscrit dans la loi.",
          },
        ],
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
        subTopics: [
          {
            title: "France métropolitaine",
            summary:
              "Située en Europe de l'Ouest, environ 552 000 km². Divisée en 13 régions et 101 départements.",
          },
          {
            title: "France d'outre-mer",
            summary:
              "5 départements et régions d'outre-mer (DROM) : Guadeloupe, Martinique, Guyane, La Réunion, Mayotte. Plusieurs collectivités d'outre-mer.",
          },
        ],
      },
      {
        heading: "Les fleuves et montagnes",
        body:
          "Les principaux fleuves sont la Seine, la Loire, le Rhône, la Garonne et le Rhin. Les principales montagnes sont les Alpes, les Pyrénées, le Massif central, les Vosges et le Jura. Le Mont Blanc (4 809 m) est le point culminant.",
        subTopics: [
          {
            title: "Les fleuves principaux",
            summary:
              "Seine (Paris), Loire (le plus long), Rhône (Lyon), Garonne (Bordeaux), Rhin (frontière avec l'Allemagne).",
          },
          {
            title: "Les montagnes",
            summary:
              "Alpes (frontière Italie/Suisse, Mont Blanc 4 809 m), Pyrénées (frontière Espagne), Massif central, Vosges, Jura.",
          },
        ],
      },
      {
        heading: "Les frontières et voisins",
        body:
          "La France métropolitaine partage ses frontières terrestres avec la Belgique, le Luxembourg, l'Allemagne, la Suisse, l'Italie, Monaco, l'Espagne et Andorre. Elle est entourée par l'Atlantique, la Manche et la Méditerranée.",
        subTopics: [
          {
            title: "Les pays frontaliers",
            summary:
              "8 pays voisins : Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne, Andorre.",
          },
          {
            title: "Les façades maritimes",
            summary:
              "Trois mers : la Manche au nord, l'océan Atlantique à l'ouest, la Méditerranée au sud.",
          },
        ],
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
        subTopics: [
          {
            title: "Le drapeau tricolore",
            summary:
              "Trois bandes verticales : bleu, blanc, rouge. Adopté pendant la Révolution française. Visible sur les bâtiments publics.",
          },
          {
            title: "La Marseillaise",
            summary:
              "Hymne national composé en 1792 par Rouget de Lisle. Hymne officiel depuis 1879.",
          },
          {
            title: "Marianne",
            summary:
              "Allégorie féminine de la République. Coiffée du bonnet phrygien, elle figure sur les pièces, les timbres et dans les mairies.",
          },
        ],
      },
      {
        heading: "Les grandes figures",
        body:
          "Parmi les grandes figures françaises : Charles de Gaulle, Napoléon Bonaparte, Victor Hugo, Marie Curie, Simone Veil, Albert Camus. Ces personnalités ont marqué l'histoire, les sciences, la littérature ou les droits humains.",
        subTopics: [
          {
            title: "Politique",
            summary:
              "Charles de Gaulle (fondateur de la Ve République), Napoléon Bonaparte (empereur), François Mitterrand, Simone Veil (droits des femmes).",
          },
          {
            title: "Lettres et sciences",
            summary:
              "Victor Hugo, Albert Camus, Simone de Beauvoir (littérature) ; Marie Curie, Louis Pasteur (sciences).",
          },
        ],
      },
      {
        heading: "Les traditions et le patrimoine",
        body:
          "La gastronomie française est inscrite au patrimoine culturel immatériel de l'UNESCO. Le 14 juillet est la fête nationale. Le 1er mai (fête du Travail), le 8 mai (victoire 1945) et le 11 novembre (armistice 1918) sont également des jours fériés républicains.",
        subTopics: [
          {
            title: "Jours fériés républicains",
            summary:
              "14 juillet (fête nationale), 1er mai (fête du Travail), 8 mai (victoire 1945), 11 novembre (armistice 1918).",
          },
          {
            title: "Patrimoine UNESCO",
            summary:
              "La gastronomie française et le savoir-faire de la baguette sont inscrits au patrimoine culturel immatériel de l'UNESCO.",
          },
        ],
      },
    ],
    keyPoints: [
      "Drapeau tricolore : bleu, blanc, rouge.",
      "Hymne national : La Marseillaise, composé par Rouget de Lisle.",
      "Fête nationale : 14 juillet.",
    ],
  },
};
