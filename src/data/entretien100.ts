/**
 * Les 100 questions de l'entretien de naturalisation (entretien d'assimilation).
 *
 * Contrairement à l'examen civique (QCM), l'entretien en préfecture est un ORAL
 * à questions ouvertes. Ce fichier fournit, pour chaque question, une réponse
 * modèle que le candidat peut lire et réviser.
 *
 * Réparti en 6 thèmes (total = 100) :
 *   valeurs 20 · histoire 20 · institutions 19 · vie-en-france 15 ·
 *   geographie-culture 14 · parcours-personnel 12
 *
 * Pour le « parcours personnel », il n'y a pas de bonne réponse factuelle :
 * la réponse modèle est un conseil de préparation.
 *
 * Sources : Livret du citoyen, service-public.fr, Constitution de 1958,
 * loi du 9 décembre 1905. Contenu civique public.
 */

export type EntretienTheme =
  | "valeurs"
  | "histoire"
  | "institutions"
  | "vie-en-france"
  | "geographie-culture"
  | "parcours-personnel";

export type EntretienQuestion = {
  id: string;
  theme: EntretienTheme;
  question: string;
  /** Réponse modèle (ou conseil, pour le thème parcours-personnel). */
  answer: string;
  /** true si la réponse est un conseil personnel plutôt qu'un fait. */
  personnel?: boolean;
};

export const ENTRETIEN_THEME_LABELS: Record<EntretienTheme, string> = {
  valeurs: "Valeurs et principes républicains",
  histoire: "Histoire de France",
  institutions: "Institutions et politique",
  "vie-en-france": "Vie en France",
  "geographie-culture": "Géographie et culture",
  "parcours-personnel": "Parcours personnel",
};

export const ENTRETIEN_THEMES_ORDER: EntretienTheme[] = [
  "valeurs",
  "histoire",
  "institutions",
  "vie-en-france",
  "geographie-culture",
  "parcours-personnel",
];

export const ENTRETIEN_100: EntretienQuestion[] = [
  // ---------- VALEURS ET PRINCIPES RÉPUBLICAINS (20) ----------
  {
    id: "ent-val-1",
    theme: "valeurs",
    question: "Quelle est la devise de la République française ?",
    answer:
      "« Liberté, Égalité, Fraternité ». Héritée de la Révolution française, elle est inscrite à l'article 2 de la Constitution et figure sur les frontons des mairies et des écoles.",
  },
  {
    id: "ent-val-2",
    theme: "valeurs",
    question: "Qu'est-ce que la laïcité ?",
    answer:
      "La laïcité est la neutralité de l'État vis-à-vis des religions. Elle garantit la liberté de conscience : chacun est libre de croire, de ne pas croire ou de changer de religion. Elle repose sur la loi du 9 décembre 1905 séparant les Églises et l'État.",
  },
  {
    id: "ent-val-3",
    theme: "valeurs",
    question: "Que représente Marianne ?",
    answer:
      "Marianne est l'allégorie (le symbole) de la République française. Son buste est présent dans les mairies ; elle incarne la liberté et les valeurs de la République.",
  },
  {
    id: "ent-val-4",
    theme: "valeurs",
    question: "Quel est l'hymne national de la France ?",
    answer:
      "La Marseillaise, écrite par Rouget de Lisle en 1792 et devenue hymne national en 1795.",
  },
  {
    id: "ent-val-5",
    theme: "valeurs",
    question:
      "Quelles sont les couleurs du drapeau français et d'où viennent-elles ?",
    answer:
      "Bleu, blanc, rouge. Le blanc est la couleur du roi, le bleu et le rouge celles de la ville de Paris. Le drapeau tricolore est né de la Révolution française.",
  },
  {
    id: "ent-val-6",
    theme: "valeurs",
    question: "Quelle est la fête nationale et que commémore-t-elle ?",
    answer:
      "Le 14 juillet, en souvenir de la prise de la Bastille en 1789 et de la Fête de la Fédération de 1790, symboles de la Révolution française.",
  },
  {
    id: "ent-val-7",
    theme: "valeurs",
    question: "Que signifie l'égalité entre les femmes et les hommes ?",
    answer:
      "Les femmes et les hommes ont exactement les mêmes droits. Toute discrimination fondée sur le sexe (emploi, salaire, vie publique) est interdite. Cette égalité est garantie par la Constitution.",
  },
  {
    id: "ent-val-8",
    theme: "valeurs",
    question: "La liberté d'expression est-elle absolue en France ?",
    answer:
      "Non. C'est un droit fondamental, mais il connaît des limites : l'injure, la diffamation, l'incitation à la haine ou à la violence et l'apologie du terrorisme sont interdites et punies par la loi.",
  },
  {
    id: "ent-val-9",
    theme: "valeurs",
    question: "Qu'est-ce que la liberté de conscience ?",
    answer:
      "C'est le droit de croire ou de ne pas croire, de choisir et de changer de religion ou de conviction, sans subir aucune contrainte.",
  },
  {
    id: "ent-val-10",
    theme: "valeurs",
    question: "Peut-on critiquer le gouvernement ou une religion en France ?",
    answer:
      "Oui. La liberté d'expression permet de critiquer les responsables politiques, les idées et les religions, tant que l'on n'appelle pas à la haine ou à la violence contre des personnes.",
  },
  {
    id: "ent-val-11",
    theme: "valeurs",
    question: "Qu'est-ce que la fraternité ?",
    answer:
      "C'est la solidarité entre les citoyens : l'entraide, le respect des autres et la lutte contre les exclusions. Elle inspire la protection sociale et le droit d'asile.",
  },
  {
    id: "ent-val-12",
    theme: "valeurs",
    question: "Que veut dire « l'égalité devant la loi » ?",
    answer:
      "Tous les citoyens sont égaux devant la loi, sans distinction d'origine, de religion, de sexe ou de fortune. La loi est la même pour tous.",
  },
  {
    id: "ent-val-13",
    theme: "valeurs",
    question: "Le mariage forcé est-il autorisé en France ?",
    answer:
      "Non. Le mariage suppose le consentement libre des deux époux. Le mariage forcé est interdit et puni par la loi.",
  },
  {
    id: "ent-val-14",
    theme: "valeurs",
    question: "La polygamie est-elle autorisée en France ?",
    answer:
      "Non. En France, on ne peut être marié qu'à une seule personne à la fois (monogamie). La polygamie est interdite.",
  },
  {
    id: "ent-val-15",
    theme: "valeurs",
    question: "Qu'est-ce que la séparation des pouvoirs ?",
    answer:
      "C'est la répartition du pouvoir entre trois branches indépendantes : l'exécutif (le gouvernement), le législatif (le Parlement) et le judiciaire (la justice). Elle protège la liberté et évite l'abus de pouvoir.",
  },
  {
    id: "ent-val-16",
    theme: "valeurs",
    question: "L'école publique est-elle laïque ?",
    answer:
      "Oui. L'enseignement public est neutre et les signes religieux ostensibles y sont interdits (loi du 15 mars 2004), au nom de la laïcité.",
  },
  {
    id: "ent-val-17",
    theme: "valeurs",
    question: "Qu'est-ce qu'une discrimination ?",
    answer:
      "C'est le fait de traiter défavorablement une personne en raison de son origine, de son sexe, de sa religion, de son handicap, de son orientation sexuelle, etc. La discrimination est interdite et punie par la loi.",
  },
  {
    id: "ent-val-18",
    theme: "valeurs",
    question: "La France reconnaît-elle une religion officielle ?",
    answer:
      "Non. La France est un État laïque : elle ne reconnaît ni ne finance aucun culte (loi de 1905) et respecte toutes les croyances.",
  },
  {
    id: "ent-val-19",
    theme: "valeurs",
    question: "Qu'est-ce que le respect de la vie privée ?",
    answer:
      "C'est un droit fondamental : chacun a droit au respect de sa vie personnelle et familiale, de son domicile et de sa correspondance.",
  },
  {
    id: "ent-val-20",
    theme: "valeurs",
    question: "Que veut dire « la République est indivisible » ?",
    answer:
      "Cela signifie que la loi et la République sont les mêmes sur tout le territoire. Il n'existe qu'un seul peuple français, sans division en communautés séparées.",
  },

  // ---------- HISTOIRE DE FRANCE (20) ----------
  {
    id: "ent-his-1",
    theme: "histoire",
    question: "En quelle année a eu lieu la Révolution française ?",
    answer:
      "En 1789. La prise de la Bastille, le 14 juillet 1789, en est le symbole. Elle met fin à la monarchie absolue et donne naissance à la Déclaration des droits de l'homme et du citoyen.",
  },
  {
    id: "ent-his-2",
    theme: "histoire",
    question: "Qu'est-ce que la Déclaration des droits de l'homme et du citoyen ?",
    answer:
      "Un texte adopté le 26 août 1789 qui proclame la liberté, l'égalité et les droits fondamentaux de tous les hommes. Il a aujourd'hui valeur constitutionnelle.",
  },
  {
    id: "ent-his-3",
    theme: "histoire",
    question: "Qui était Charles de Gaulle ?",
    answer:
      "Chef de la France libre pendant la Seconde Guerre mondiale (appel du 18 juin 1940), il a fondé la Ve République en 1958 et en a été le premier président.",
  },
  {
    id: "ent-his-4",
    theme: "histoire",
    question: "Que commémore-t-on le 8 mai ?",
    answer:
      "La victoire des Alliés et la fin de la Seconde Guerre mondiale en Europe, le 8 mai 1945.",
  },
  {
    id: "ent-his-5",
    theme: "histoire",
    question: "Que commémore-t-on le 11 novembre ?",
    answer:
      "L'armistice du 11 novembre 1918, qui met fin à la Première Guerre mondiale.",
  },
  {
    id: "ent-his-6",
    theme: "histoire",
    question:
      "En quelle année les femmes ont-elles obtenu le droit de vote en France ?",
    answer:
      "En 1944 (ordonnance du 21 avril 1944). Elles ont voté pour la première fois en 1945.",
  },
  {
    id: "ent-his-7",
    theme: "histoire",
    question: "Quand l'esclavage a-t-il été aboli en France ?",
    answer:
      "Définitivement le 27 avril 1848, sous l'impulsion de Victor Schœlcher.",
  },
  {
    id: "ent-his-8",
    theme: "histoire",
    question: "Qui a fait abolir la peine de mort et quand ?",
    answer:
      "Elle a été abolie le 9 octobre 1981, sous la présidence de François Mitterrand, à l'initiative du garde des Sceaux Robert Badinter.",
  },
  {
    id: "ent-his-9",
    theme: "histoire",
    question: "Qu'est-ce que la Résistance ?",
    answer:
      "L'ensemble des personnes et des mouvements qui ont combattu l'occupation allemande et le régime de Vichy pendant la Seconde Guerre mondiale (1940-1945).",
  },
  {
    id: "ent-his-10",
    theme: "histoire",
    question: "Combien de Républiques la France a-t-elle connues ?",
    answer:
      "Cinq. Nous vivons aujourd'hui sous la Ve République, fondée en 1958.",
  },
  {
    id: "ent-his-11",
    theme: "histoire",
    question: "Qui était Napoléon Bonaparte ?",
    answer:
      "Un général de la Révolution devenu empereur des Français (1804-1815). Il a notamment créé le Code civil en 1804, qui organise encore le droit français.",
  },
  {
    id: "ent-his-12",
    theme: "histoire",
    question: "Qu'est-ce que le Code civil ?",
    answer:
      "Un ensemble de lois créé en 1804 sous Napoléon, qui régit la vie privée : mariage, famille, propriété, contrats. Il est toujours en vigueur.",
  },
  {
    id: "ent-his-13",
    theme: "histoire",
    question: "Qui était Jules Ferry ?",
    answer:
      "Un ministre de la IIIe République qui a rendu l'école primaire gratuite, laïque et obligatoire (lois de 1881-1882).",
  },
  {
    id: "ent-his-14",
    theme: "histoire",
    question: "Qu'est-ce que la Première Guerre mondiale ?",
    answer:
      "Un conflit de 1914 à 1918 opposant notamment la France et l'Allemagne. Elle a fait des millions de morts et s'achève par l'armistice du 11 novembre 1918.",
  },
  {
    id: "ent-his-15",
    theme: "histoire",
    question: "Qu'est-ce que la Seconde Guerre mondiale ?",
    answer:
      "Un conflit mondial de 1939 à 1945. La France a été occupée par l'Allemagne nazie ; la Libération a lieu en 1944-1945.",
  },
  {
    id: "ent-his-16",
    theme: "histoire",
    question: "Qui était Simone Veil ?",
    answer:
      "Rescapée de la Shoah et femme politique, elle a fait adopter en 1975 la loi autorisant l'interruption volontaire de grossesse (IVG). Elle fut aussi la première présidente du Parlement européen.",
  },
  {
    id: "ent-his-17",
    theme: "histoire",
    question: "Que prévoit la loi de 1905 ?",
    answer:
      "La loi du 9 décembre 1905 sépare les Églises et l'État : l'État devient neutre et ne finance aucun culte. C'est le fondement de la laïcité.",
  },
  {
    id: "ent-his-18",
    theme: "histoire",
    question: "Qu'a proclamé la France le 21 septembre 1792 ?",
    answer:
      "L'abolition de la royauté et la proclamation de la Première République.",
  },
  {
    id: "ent-his-19",
    theme: "histoire",
    question: "Qui était Victor Hugo ?",
    answer:
      "Un grand écrivain français du XIXe siècle (Les Misérables, Notre-Dame de Paris), également engagé en politique pour la République et contre la peine de mort.",
  },
  {
    id: "ent-his-20",
    theme: "histoire",
    question: "Qu'est-ce que l'appel du 18 juin 1940 ?",
    answer:
      "L'appel lancé depuis Londres par le général de Gaulle, invitant les Français à poursuivre le combat contre l'occupant allemand. C'est l'acte fondateur de la Résistance.",
  },

  // ---------- INSTITUTIONS ET POLITIQUE (19) ----------
  {
    id: "ent-ins-1",
    theme: "institutions",
    question: "Qui est le président de la République ?",
    answer:
      "En 2026, le président de la République est Emmanuel Macron (élu en 2017, réélu en 2022). Vérifiez toujours le nom du président en exercice le jour de votre entretien.",
  },
  {
    id: "ent-ins-2",
    theme: "institutions",
    question: "Pour combien de temps le président est-il élu ?",
    answer:
      "Pour 5 ans (quinquennat), au suffrage universel direct, renouvelable une seule fois de suite.",
  },
  {
    id: "ent-ins-3",
    theme: "institutions",
    question: "Qui nomme le Premier ministre ?",
    answer:
      "Le président de la République (article 8 de la Constitution).",
  },
  {
    id: "ent-ins-4",
    theme: "institutions",
    question: "Quel est le rôle du Premier ministre ?",
    answer:
      "Il dirige le gouvernement, conduit la politique de la nation et fait appliquer les lois.",
  },
  {
    id: "ent-ins-5",
    theme: "institutions",
    question: "De quoi est composé le Parlement ?",
    answer:
      "De deux chambres : l'Assemblée nationale (les députés) et le Sénat (les sénateurs). Le Parlement vote la loi et contrôle le gouvernement.",
  },
  {
    id: "ent-ins-6",
    theme: "institutions",
    question: "Combien y a-t-il de députés à l'Assemblée nationale ?",
    answer:
      "577 députés, élus au suffrage universel direct pour 5 ans.",
  },
  {
    id: "ent-ins-7",
    theme: "institutions",
    question: "Comment sont élus les sénateurs ?",
    answer:
      "Au suffrage indirect, par de grands électeurs (des élus locaux). Le Sénat compte 348 sénateurs.",
  },
  {
    id: "ent-ins-8",
    theme: "institutions",
    question: "À quel âge peut-on voter en France ?",
    answer:
      "À 18 ans, âge de la majorité, à condition d'être de nationalité française et inscrit sur les listes électorales.",
  },
  {
    id: "ent-ins-9",
    theme: "institutions",
    question: "Qui vote les lois ?",
    answer:
      "Le Parlement (Assemblée nationale et Sénat). Le gouvernement comme les parlementaires peuvent proposer des lois.",
  },
  {
    id: "ent-ins-10",
    theme: "institutions",
    question: "Qu'est-ce que la Constitution ?",
    answer:
      "Le texte fondamental qui organise les pouvoirs de l'État et garantit les droits des citoyens. La Constitution actuelle date de 1958 (Ve République).",
  },
  {
    id: "ent-ins-11",
    theme: "institutions",
    question: "Comment est élu le maire ?",
    answer:
      "Les habitants élisent les conseillers municipaux ; ceux-ci élisent ensuite le maire parmi eux, pour 6 ans.",
  },
  {
    id: "ent-ins-12",
    theme: "institutions",
    question: "Qu'est-ce que le Conseil constitutionnel ?",
    answer:
      "Une institution qui vérifie que les lois respectent la Constitution et veille à la régularité des élections nationales.",
  },
  {
    id: "ent-ins-13",
    theme: "institutions",
    question: "Qu'est-ce qu'un référendum ?",
    answer:
      "Un vote par lequel les citoyens répondent directement par oui ou par non à une question posée, par exemple pour adopter une loi ou réviser la Constitution.",
  },
  {
    id: "ent-ins-14",
    theme: "institutions",
    question: "Qu'est-ce que le droit de vote ?",
    answer:
      "Le droit de participer aux élections pour choisir ses représentants. C'est à la fois un droit et un devoir civique du citoyen.",
  },
  {
    id: "ent-ins-15",
    theme: "institutions",
    question: "Quelles sont les principales élections en France ?",
    answer:
      "La présidentielle, les législatives (députés), les municipales, les départementales, les régionales et les européennes.",
  },
  {
    id: "ent-ins-16",
    theme: "institutions",
    question: "Qu'est-ce que le suffrage universel ?",
    answer:
      "Le droit de vote reconnu à tous les citoyens majeurs, sans condition de fortune ni de sexe.",
  },
  {
    id: "ent-ins-17",
    theme: "institutions",
    question: "Qui rend la justice en France ?",
    answer:
      "Des juges indépendants, au nom du peuple français. La justice est séparée du pouvoir politique.",
  },
  {
    id: "ent-ins-18",
    theme: "institutions",
    question: "Quelle est la différence entre l'Assemblée nationale et le Sénat ?",
    answer:
      "Les députés (Assemblée) sont élus directement par les citoyens ; les sénateurs sont élus indirectement. En cas de désaccord, l'Assemblée nationale a le dernier mot.",
  },
  {
    id: "ent-ins-19",
    theme: "institutions",
    question: "Quels droits politiques la nationalité française apporte-t-elle ?",
    answer:
      "Elle permet notamment de voter à toutes les élections, d'être candidat et d'accéder aux emplois publics réservés aux nationaux.",
  },

  // ---------- VIE EN FRANCE (15) ----------
  {
    id: "ent-vie-1",
    theme: "vie-en-france",
    question: "Qu'est-ce que le SMIC ?",
    answer:
      "Le Salaire Minimum Interprofessionnel de Croissance : le salaire horaire minimum légal en dessous duquel un employeur ne peut pas rémunérer un salarié.",
  },
  {
    id: "ent-vie-2",
    theme: "vie-en-france",
    question: "Quelle est la durée légale du travail par semaine ?",
    answer:
      "35 heures. Au-delà, ce sont des heures supplémentaires.",
  },
  {
    id: "ent-vie-3",
    theme: "vie-en-france",
    question: "Jusqu'à quel âge l'instruction est-elle obligatoire ?",
    answer:
      "L'instruction est obligatoire de 3 à 16 ans ; une obligation de formation existe ensuite jusqu'à 18 ans.",
  },
  {
    id: "ent-vie-4",
    theme: "vie-en-france",
    question: "Qu'est-ce que la Sécurité sociale ?",
    answer:
      "Le système public qui protège les personnes contre les risques de la vie : maladie, maternité, vieillesse (retraite), accidents du travail et charges de famille.",
  },
  {
    id: "ent-vie-5",
    theme: "vie-en-france",
    question: "Quels sont les principaux numéros d'urgence ?",
    answer:
      "Le 15 (SAMU, urgences médicales), le 17 (police/gendarmerie), le 18 (pompiers) et le 112 (numéro d'urgence européen).",
  },
  {
    id: "ent-vie-6",
    theme: "vie-en-france",
    question: "L'école publique est-elle gratuite ?",
    answer:
      "Oui. L'école publique est gratuite et laïque, et l'instruction est obligatoire.",
  },
  {
    id: "ent-vie-7",
    theme: "vie-en-france",
    question: "Qu'est-ce que la carte Vitale ?",
    answer:
      "La carte qui atteste de vos droits à l'Assurance maladie et permet le remboursement de vos soins.",
  },
  {
    id: "ent-vie-8",
    theme: "vie-en-france",
    question: "Le travail non déclaré (« au noir ») est-il autorisé ?",
    answer:
      "Non. Le travail non déclaré est interdit et puni par la loi, quel que soit le montant concerné.",
  },
  {
    id: "ent-vie-9",
    theme: "vie-en-france",
    question: "Qu'est-ce qu'un contrat de travail ?",
    answer:
      "Un accord entre un employeur et un salarié qui fixe le poste, le salaire et les conditions de travail (CDI, CDD, etc.).",
  },
  {
    id: "ent-vie-10",
    theme: "vie-en-france",
    question: "Peut-on se faire soigner même avec de faibles revenus ?",
    answer:
      "Oui. Le système de santé et des dispositifs comme la Complémentaire santé solidaire permettent l'accès aux soins pour les personnes à faibles revenus.",
  },
  {
    id: "ent-vie-11",
    theme: "vie-en-france",
    question: "Qu'est-ce que la retraite ?",
    answer:
      "Un revenu versé aux personnes qui ont cessé de travailler à partir d'un certain âge, financé par les cotisations sociales.",
  },
  {
    id: "ent-vie-12",
    theme: "vie-en-france",
    question: "À qui s'adresser pour ses démarches administratives ?",
    answer:
      "À la mairie, à la préfecture ou en ligne sur service-public.fr. Pour l'emploi : France Travail (ex-Pôle emploi) ; pour les prestations familiales : la CAF.",
  },
  {
    id: "ent-vie-13",
    theme: "vie-en-france",
    question: "Qu'est-ce que la CAF ?",
    answer:
      "La Caisse d'allocations familiales : elle verse des aides aux familles et aux personnes à revenus modestes (allocations familiales, aide au logement, etc.).",
  },
  {
    id: "ent-vie-14",
    theme: "vie-en-france",
    question: "Comment met-on fin à un mariage en France ?",
    answer:
      "Par le divorce, prononcé ou enregistré selon les cas, avec les mêmes droits pour les deux époux. La répudiation, elle, est interdite.",
  },
  {
    id: "ent-vie-15",
    theme: "vie-en-france",
    question: "Que faire si l'on est victime ou témoin de violences ?",
    answer:
      "Appeler la police (17) ou le 112, et le 3919 pour les violences conjugales. Porter plainte est un droit ; la loi protège les victimes.",
  },

  // ---------- GÉOGRAPHIE ET CULTURE (14) ----------
  {
    id: "ent-geo-1",
    theme: "geographie-culture",
    question: "Quelle est la capitale de la France ?",
    answer: "Paris.",
  },
  {
    id: "ent-geo-2",
    theme: "geographie-culture",
    question: "Citez quelques grands fleuves français.",
    answer:
      "La Seine, la Loire (le plus long), la Garonne, le Rhône et le Rhin.",
  },
  {
    id: "ent-geo-3",
    theme: "geographie-culture",
    question: "Quels sont les principaux massifs montagneux ?",
    answer:
      "Les Alpes (avec le Mont Blanc, plus haut sommet), les Pyrénées, le Massif central, le Jura et les Vosges.",
  },
  {
    id: "ent-geo-4",
    theme: "geographie-culture",
    question: "Quels mers et océans bordent la France ?",
    answer:
      "L'océan Atlantique, la mer Méditerranée, la Manche et la mer du Nord.",
  },
  {
    id: "ent-geo-5",
    theme: "geographie-culture",
    question: "Citez des pays frontaliers de la France.",
    answer:
      "La Belgique, le Luxembourg, l'Allemagne, la Suisse, l'Italie, l'Espagne, ainsi que Monaco et l'Andorre.",
  },
  {
    id: "ent-geo-6",
    theme: "geographie-culture",
    question: "Qu'est-ce que l'Union européenne ?",
    answer:
      "Une union de 27 pays européens qui coopèrent sur le plan économique et politique. La France en est membre fondateur ; la monnaie est l'euro.",
  },
  {
    id: "ent-geo-7",
    theme: "geographie-culture",
    question: "Quelle est la monnaie de la France ?",
    answer: "L'euro (€), depuis 2002.",
  },
  {
    id: "ent-geo-8",
    theme: "geographie-culture",
    question: "Citez un monument célèbre de Paris.",
    answer:
      "La tour Eiffel, l'Arc de triomphe, la cathédrale Notre-Dame ou le musée du Louvre, par exemple.",
  },
  {
    id: "ent-geo-9",
    theme: "geographie-culture",
    question: "Qu'est-ce que le Louvre ?",
    answer:
      "Le plus grand musée de France, à Paris. Il abrite notamment La Joconde de Léonard de Vinci.",
  },
  {
    id: "ent-geo-10",
    theme: "geographie-culture",
    question: "Combien y a-t-il de régions en France métropolitaine ?",
    answer:
      "13 régions métropolitaines, auxquelles s'ajoutent les régions et territoires d'outre-mer.",
  },
  {
    id: "ent-geo-11",
    theme: "geographie-culture",
    question: "Citez des territoires français d'outre-mer.",
    answer:
      "La Guadeloupe, la Martinique, la Guyane, La Réunion, Mayotte, la Polynésie française, la Nouvelle-Calédonie…",
  },
  {
    id: "ent-geo-12",
    theme: "geographie-culture",
    question: "Citez une spécialité de la cuisine française.",
    answer:
      "Par exemple la baguette, le fromage, le bœuf bourguignon, la ratatouille ou le pot-au-feu. Le repas gastronomique des Français est inscrit au patrimoine de l'UNESCO.",
  },
  {
    id: "ent-geo-13",
    theme: "geographie-culture",
    question: "Quelle est la langue officielle de la France ?",
    answer: "Le français (article 2 de la Constitution).",
  },
  {
    id: "ent-geo-14",
    theme: "geographie-culture",
    question: "Quel rôle la France joue-t-elle à l'ONU ?",
    answer:
      "L'Organisation des Nations unies œuvre pour la paix dans le monde. La France y est membre permanent du Conseil de sécurité.",
  },

  // ---------- PARCOURS PERSONNEL (12) — réponses = conseils ----------
  {
    id: "ent-per-1",
    theme: "parcours-personnel",
    question: "Pourquoi voulez-vous devenir français(e) ?",
    answer:
      "Réponse personnelle et sincère. Reliez-la à votre vie en France : attaches familiales, travail, projet d'avenir, adhésion aux valeurs de la République. Évitez les motifs purement pratiques (obtenir des papiers).",
    personnel: true,
  },
  {
    id: "ent-per-2",
    theme: "parcours-personnel",
    question: "Depuis combien de temps vivez-vous en France ?",
    answer:
      "Répondez précisément : année d'arrivée et durée. Connaissez les dates clés de votre parcours (arrivée, titres de séjour successifs).",
    personnel: true,
  },
  {
    id: "ent-per-3",
    theme: "parcours-personnel",
    question: "Quelle est votre situation professionnelle ?",
    answer:
      "Indiquez votre métier, votre employeur, depuis quand, et éventuellement vos diplômes. Montrez votre intégration par le travail.",
    personnel: true,
  },
  {
    id: "ent-per-4",
    theme: "parcours-personnel",
    question: "Êtes-vous marié(e) ? Avez-vous des enfants ?",
    answer:
      "Donnez les informations exactes : date de mariage, prénoms et dates de naissance des enfants. La cohérence avec votre dossier est vérifiée.",
    personnel: true,
  },
  {
    id: "ent-per-5",
    theme: "parcours-personnel",
    question: "Que représente la France pour vous ?",
    answer:
      "Réponse personnelle : parlez des valeurs (liberté, égalité, laïcité), de ce qui vous attache à la France et de votre volonté d'y construire votre vie.",
    personnel: true,
  },
  {
    id: "ent-per-6",
    theme: "parcours-personnel",
    question: "Qu'aimez-vous dans la culture française ?",
    answer:
      "Réponse sincère : cuisine, histoire, paysages, langue, art de vivre… Donnez un exemple concret et personnel.",
    personnel: true,
  },
  {
    id: "ent-per-7",
    theme: "parcours-personnel",
    question: "Participez-vous à la vie associative ou locale ?",
    answer:
      "Mentionnez toute implication : association, bénévolat, école des enfants, vie de quartier. Cela illustre votre intégration.",
    personnel: true,
  },
  {
    id: "ent-per-8",
    theme: "parcours-personnel",
    question: "Comment avez-vous appris le français ?",
    answer:
      "Expliquez votre parcours (cours, travail, vie quotidienne). L'agent évalue aussi votre aisance à l'oral tout au long de l'entretien (niveau B2 attendu).",
    personnel: true,
  },
  {
    id: "ent-per-9",
    theme: "parcours-personnel",
    question: "Quels devoirs implique le fait de devenir français ?",
    answer:
      "Respecter les lois et les valeurs de la République, payer ses impôts, être solidaire, et participer à la vie civique (par exemple en votant).",
    personnel: true,
  },
  {
    id: "ent-per-10",
    theme: "parcours-personnel",
    question: "Avez-vous de la famille en France ?",
    answer:
      "Répondez précisément : conjoint, enfants, parents, proches, et leur situation. Montrez vos attaches en France.",
    personnel: true,
  },
  {
    id: "ent-per-11",
    theme: "parcours-personnel",
    question: "Quels sont vos projets d'avenir en France ?",
    answer:
      "Réponse personnelle : projets professionnels, familiaux, installation durable. Montrez que votre avenir se construit en France.",
    personnel: true,
  },
  {
    id: "ent-per-12",
    theme: "parcours-personnel",
    question: "Êtes-vous prêt(e) à défendre les valeurs de la République ?",
    answer:
      "Oui, avec sincérité : respect de la laïcité, de l'égalité femmes-hommes et de la liberté d'expression ; refus de toute discrimination et de toute violence.",
    personnel: true,
  },
];

export function getEntretienByTheme(theme: EntretienTheme): EntretienQuestion[] {
  return ENTRETIEN_100.filter((q) => q.theme === theme);
}

export function countEntretienByTheme(theme: EntretienTheme): number {
  return getEntretienByTheme(theme).length;
}
