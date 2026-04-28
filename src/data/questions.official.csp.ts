import { Question } from "@/types";

/**
 * OFFICIAL_CSP_QUESTIONS — 190 questions officielles publiées par le
 * Ministère de l'Intérieur pour le niveau Carte de Séjour Pluriannuelle (CSP).
 *
 * Source : formation-civique.interieur.gouv.fr/examen-civique/liste-officielle-des-questions-de-connaissance-csp/
 *
 * Format examen : QCM 40 questions / 45 min / seuil 80 % (32/40).
 * Les énoncés reprennent fidèlement les questions officielles. Les choix et
 * réponses correctes ont été reconstitués à partir du Livret du Citoyen et
 * des fiches officielles du gouvernement. Les explications sont synthétiques
 * et factuelles.
 *
 * Mapping vers nos thèmes :
 *   §1 Principes et valeurs       → "valeurs"
 *   §2 Système institutionnel     → "institutions"
 *   §3 Droits et devoirs          → "valeurs"
 *   §4 Histoire / Géo / Culture   → "histoire" | "geographie" | "culture"
 *   §5 Vivre en société           → "culture"
 *
 * Note : la question "Pour qui l'école est elle obligatoire ?" (sans apostrophe)
 * du listing officiel est un doublon typographique de "Pour qui l'école est-elle
 * obligatoire ?" et n'a pas été ajoutée.
 */

export const OFFICIAL_CSP_QUESTIONS: Question[] = [
  // ─── §1 Principes et valeurs de la République ───────────────────────
  {
    id: "off-csp-001",
    category: "CSP",
    theme: "valeurs",
    text: "À quoi correspond la date du 14 juillet ?",
    choices: [
      "À la fête nationale française",
      "À la signature de la Constitution",
      "À la fin de la Seconde Guerre mondiale",
      "À l'élection du président",
    ],
    correctIndex: 0,
    explanation:
      "Le 14 juillet est la fête nationale, commémorant la prise de la Bastille (1789) et la Fête de la Fédération (1790).",
  },
  {
    id: "off-csp-002",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est l'un des symboles de la République française ?",
    choices: [
      "Le drapeau tricolore",
      "L'aigle royal",
      "Le château de Versailles",
      "Le sceptre",
    ],
    correctIndex: 0,
    explanation:
      "Le drapeau tricolore (bleu, blanc, rouge) est l'un des symboles officiels avec La Marseillaise, Marianne et la devise.",
  },
  {
    id: "off-csp-003",
    category: "CSP",
    theme: "valeurs",
    text: "Le principe d'égalité signifie que :",
    choices: [
      "Tous les citoyens sont égaux devant la loi",
      "Tous les citoyens ont le même salaire",
      "Tous les citoyens ont le même métier",
      "Personne ne paie d'impôts",
    ],
    correctIndex: 0,
    explanation:
      "L'égalité républicaine garantit le même traitement devant la loi sans distinction d'origine, de sexe ou de religion.",
  },
  {
    id: "off-csp-004",
    category: "CSP",
    theme: "valeurs",
    text: "« Liberté, Égalité, Fraternité », c'est :",
    choices: [
      "La devise de la République française",
      "Le titre de l'hymne national",
      "Une œuvre littéraire",
      "Une chanson populaire",
    ],
    correctIndex: 0,
    explanation:
      "Devise de la République inscrite à l'article 2 de la Constitution, héritée de la Révolution française.",
  },
  {
    id: "off-csp-005",
    category: "CSP",
    theme: "valeurs",
    text: "A-t-on le droit d'insulter publiquement quelqu'un parce qu'il est différent (handicap, apparence physique, sexe…) ?",
    choices: [
      "Non, c'est interdit et puni par la loi",
      "Oui, c'est la liberté d'expression",
      "Oui, sauf si la victime porte plainte",
      "Cela dépend du contexte",
    ],
    correctIndex: 0,
    explanation:
      "Les injures discriminatoires sont punies par la loi (jusqu'à 1 an de prison et 45 000 € d'amende).",
  },
  {
    id: "off-csp-006",
    category: "CSP",
    theme: "valeurs",
    text: "Certains métiers peuvent-ils être réservés aux hommes ?",
    choices: [
      "Non, l'égalité hommes-femmes est garantie",
      "Oui, les métiers physiques",
      "Oui, dans l'armée uniquement",
      "Oui, dans la police uniquement",
    ],
    correctIndex: 0,
    explanation:
      "La discrimination à l'emploi en raison du sexe est interdite. Tous les métiers sont ouverts aux femmes comme aux hommes.",
  },
  {
    id: "off-csp-007",
    category: "CSP",
    theme: "institutions",
    text: "De quand date la Constitution de la Ve République ?",
    choices: ["1958", "1789", "1944", "1981"],
    correctIndex: 0,
    explanation:
      "Constitution adoptée le 4 octobre 1958, fondatrice de la Ve République sous l'impulsion de Charles de Gaulle.",
  },
  {
    id: "off-csp-008",
    category: "CSP",
    theme: "institutions",
    text: "Le régime de la France est :",
    choices: [
      "Une République démocratique",
      "Une monarchie",
      "Un empire",
      "Une dictature",
    ],
    correctIndex: 0,
    explanation:
      "La France est une République démocratique (article 1 de la Constitution).",
  },
  {
    id: "off-csp-009",
    category: "CSP",
    theme: "valeurs",
    text: "Lequel de ces symboles représente officiellement la République française ?",
    choices: ["Marianne", "L'aigle", "Le lion", "Le sanglier"],
    correctIndex: 0,
    explanation:
      "Marianne est l'allégorie officielle de la République française, coiffée du bonnet phrygien.",
  },
  {
    id: "off-csp-010",
    category: "CSP",
    theme: "valeurs",
    text: "Où peut-on voir la devise de la République ?",
    choices: [
      "Sur les bâtiments publics (mairies, écoles)",
      "Uniquement à la télévision",
      "Sur les pièces de monnaie uniquement",
      "Dans les entreprises privées",
    ],
    correctIndex: 0,
    explanation:
      "« Liberté, Égalité, Fraternité » figure sur les frontons des mairies, écoles et bâtiments publics.",
  },
  {
    id: "off-csp-011",
    category: "CSP",
    theme: "valeurs",
    text: "Quels sont des symboles officiels de la République française ?",
    choices: [
      "Le drapeau, La Marseillaise, Marianne, la devise",
      "L'Église, l'État, la Justice",
      "Paris, Lyon, Marseille",
      "Le coq, le lion, l'aigle",
    ],
    correctIndex: 0,
    explanation:
      "Les symboles officiels sont le drapeau tricolore, l'hymne La Marseillaise, Marianne et la devise « Liberté, Égalité, Fraternité ».",
  },
  {
    id: "off-csp-012",
    category: "CSP",
    theme: "valeurs",
    text: "Qu'est-ce que l'égalité ?",
    choices: [
      "Le droit pour tous d'être traités de la même manière par la loi",
      "Avoir le même salaire que tout le monde",
      "Avoir les mêmes vêtements",
      "Avoir la même religion",
    ],
    correctIndex: 0,
    explanation:
      "L'égalité républicaine garantit le même traitement légal pour tous, sans distinction.",
  },
  {
    id: "off-csp-013",
    category: "CSP",
    theme: "valeurs",
    text: "Que signifie la liberté ?",
    choices: [
      "Le droit de faire ce qui ne nuit pas à autrui",
      "Le droit de tout faire",
      "Le droit de ne pas travailler",
      "Le droit de ne pas voter",
    ],
    correctIndex: 0,
    explanation:
      "Définition issue de l'article 4 de la Déclaration des Droits de l'Homme et du Citoyen (1789).",
  },
  {
    id: "off-csp-014",
    category: "CSP",
    theme: "valeurs",
    text: "Que signifie le mot « fraternité » dans la devise française ?",
    choices: [
      "La solidarité entre les citoyens",
      "Avoir le même père",
      "Vivre dans la même ville",
      "Parler la même langue",
    ],
    correctIndex: 0,
    explanation:
      "La fraternité est le lien de solidarité unissant les citoyens d'une même nation.",
  },
  {
    id: "off-csp-015",
    category: "CSP",
    theme: "culture",
    text: "Quel animal est un symbole de la France ?",
    choices: ["Le coq gaulois", "L'aigle", "Le taureau", "Le loup"],
    correctIndex: 0,
    explanation:
      "Le coq gaulois est un symbole national, présent sur les maillots sportifs et certains monuments officiels.",
  },
  {
    id: "off-csp-016",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est l'un des rôles des associations ?",
    choices: [
      "Permettre aux citoyens de s'engager pour une cause",
      "Faire les lois",
      "Élire le président",
      "Remplacer l'État",
    ],
    correctIndex: 0,
    explanation:
      "Les associations (loi 1901) permettent l'engagement citoyen sur des causes culturelles, sociales ou solidaires.",
  },
  {
    id: "off-csp-017",
    category: "CSP",
    theme: "culture",
    text: "Quel est le nom de l'hymne national ?",
    choices: ["La Marseillaise", "La Marianne", "Le Chant des partisans", "L'Hexagone"],
    correctIndex: 0,
    explanation:
      "La Marseillaise, composée par Rouget de Lisle en 1792, hymne officiel depuis 1879.",
  },
  {
    id: "off-csp-018",
    category: "CSP",
    theme: "culture",
    text: "Quel symbole de la République française est tricolore ?",
    choices: ["Le drapeau", "L'hymne", "La devise", "Marianne"],
    correctIndex: 0,
    explanation:
      "Le drapeau tricolore (bleu, blanc, rouge) date de la Révolution française.",
  },
  {
    id: "off-csp-019",
    category: "CSP",
    theme: "culture",
    text: "Quelle est la date de la fête nationale française ?",
    choices: ["Le 14 juillet", "Le 1er janvier", "Le 8 mai", "Le 11 novembre"],
    correctIndex: 0,
    explanation:
      "Le 14 juillet commémore la prise de la Bastille (1789) et la Fête de la Fédération (1790).",
  },
  {
    id: "off-csp-020",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle est la devise de la République française ?",
    choices: [
      "Liberté, Égalité, Fraternité",
      "Travail, Famille, Patrie",
      "Honneur, Patrie, Justice",
      "Paix, Amour, Espoir",
    ],
    correctIndex: 0,
    explanation:
      "Devise inscrite à l'article 2 de la Constitution, héritée de la Révolution française.",
  },
  {
    id: "off-csp-021",
    category: "CSP",
    theme: "culture",
    text: "Quelle est la langue officielle de la République française ?",
    choices: ["Le français", "L'anglais", "Le breton", "L'occitan"],
    correctIndex: 0,
    explanation:
      "Article 2 de la Constitution : « La langue de la République est le français. »",
  },
  {
    id: "off-csp-022",
    category: "CSP",
    theme: "culture",
    text: "Quelle est la place de la langue française dans la République ?",
    choices: [
      "C'est la langue officielle inscrite dans la Constitution",
      "C'est une langue parmi d'autres",
      "C'est une langue régionale",
      "Elle n'a aucun statut officiel",
    ],
    correctIndex: 0,
    explanation:
      "Le français est la langue officielle, inscrite à l'article 2 de la Constitution depuis 1992.",
  },
  {
    id: "off-csp-023",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle liberté permet à chacun d'exprimer ses idées ?",
    choices: [
      "La liberté d'expression",
      "La liberté de circulation",
      "La liberté de religion",
      "La liberté de réunion",
    ],
    correctIndex: 0,
    explanation:
      "La liberté d'expression est garantie par l'article 11 de la Déclaration des Droits de l'Homme et du Citoyen.",
  },
  {
    id: "off-csp-024",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle proposition est correcte ? La liberté d'expression :",
    choices: [
      "Est garantie mais a des limites (incitation à la haine, diffamation)",
      "Permet de tout dire sans limite",
      "Est interdite en France",
      "Est réservée aux journalistes",
    ],
    correctIndex: 0,
    explanation:
      "Liberté protégée mais encadrée : incitation à la haine, diffamation, injures et apologie du terrorisme sont punies.",
  },
  {
    id: "off-csp-025",
    category: "CSP",
    theme: "culture",
    text: "Quelles sont les couleurs du drapeau français ?",
    choices: ["Bleu, blanc, rouge", "Rouge, blanc, vert", "Bleu, jaune, rouge", "Bleu, blanc, jaune"],
    correctIndex: 0,
    explanation:
      "Drapeau tricolore : bleu (côté hampe), blanc (centre), rouge — adopté pendant la Révolution.",
  },
  {
    id: "off-csp-026",
    category: "CSP",
    theme: "culture",
    text: "Qu'est-ce que la Marseillaise ?",
    choices: [
      "L'hymne national de la France",
      "Une fête régionale",
      "Un plat traditionnel",
      "Une danse populaire",
    ],
    correctIndex: 0,
    explanation:
      "La Marseillaise, composée par Rouget de Lisle en 1792, est l'hymne national depuis 1879.",
  },
  {
    id: "off-csp-027",
    category: "CSP",
    theme: "culture",
    text: "Qu'est-ce qui est traditionnellement organisé sur les Champs-Élysées le 14 juillet pour célébrer la fête nationale ?",
    choices: [
      "Un défilé militaire",
      "Un concert classique",
      "Un match de football",
      "Une foire agricole",
    ],
    correctIndex: 0,
    explanation:
      "Défilé militaire du 14 juillet sur les Champs-Élysées, présidé par le Président de la République depuis 1880.",
  },
  {
    id: "off-csp-028",
    category: "CSP",
    theme: "culture",
    text: "Qui est Marianne ?",
    choices: [
      "L'allégorie de la République française",
      "La femme du Président",
      "Une héroïne de la Résistance",
      "Une chanteuse française",
    ],
    correctIndex: 0,
    explanation:
      "Marianne est la représentation symbolique de la République, coiffée du bonnet phrygien.",
  },
  {
    id: "off-csp-029",
    category: "CSP",
    theme: "valeurs",
    text: "Une personne peut-elle changer librement de religion ?",
    choices: [
      "Oui, c'est la liberté de conscience",
      "Non, c'est interdit",
      "Uniquement avec l'accord de la mairie",
      "Seulement après 18 ans",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de conscience garantie par la laïcité permet de changer ou de quitter une religion.",
  },
  {
    id: "off-csp-030",
    category: "CSP",
    theme: "valeurs",
    text: "« La France est une République indivisible, ..., démocratique et sociale. » Complétez cette phrase extraite de l'article 1er de la Constitution :",
    choices: ["laïque", "monarchique", "impériale", "religieuse"],
    correctIndex: 0,
    explanation:
      "Article 1 : « La France est une République indivisible, laïque, démocratique et sociale. »",
  },
  {
    id: "off-csp-031",
    category: "CSP",
    theme: "valeurs",
    text: "En quelle année la loi de séparation des Églises et de l'État a-t-elle été votée ?",
    choices: ["1905", "1789", "1958", "1881"],
    correctIndex: 0,
    explanation:
      "Loi du 9 décembre 1905 instaurant la séparation des Églises et de l'État, fondement de la laïcité.",
  },
  {
    id: "off-csp-032",
    category: "CSP",
    theme: "valeurs",
    text: "Que permet le principe de laïcité ?",
    choices: [
      "La liberté de conscience et la neutralité de l'État",
      "D'interdire toutes les religions",
      "D'imposer une religion d'État",
      "De fermer les lieux de culte",
    ],
    correctIndex: 0,
    explanation:
      "La laïcité garantit la liberté de croire ou ne pas croire et la neutralité religieuse de l'État.",
  },
  {
    id: "off-csp-033",
    category: "CSP",
    theme: "valeurs",
    text: "Quel droit est garanti par la laïcité ?",
    choices: [
      "La liberté de conscience",
      "Le droit de propriété",
      "Le droit de vote",
      "Le droit au logement",
    ],
    correctIndex: 0,
    explanation:
      "La laïcité garantit la liberté de croire, de ne pas croire ou de changer de religion.",
  },
  {
    id: "off-csp-034",
    category: "CSP",
    theme: "valeurs",
    text: "Pourquoi le principe de laïcité doit-il être respecté à l'école ?",
    choices: [
      "Pour garantir la neutralité et le vivre-ensemble",
      "Parce que la religion n'existe pas",
      "Pour interdire la culture",
      "Pour favoriser une seule religion",
    ],
    correctIndex: 0,
    explanation:
      "La laïcité scolaire (loi 2004) protège les élèves de toute pression religieuse et garantit la liberté de conscience.",
  },
  {
    id: "off-csp-035",
    category: "CSP",
    theme: "valeurs",
    text: "Qu'est-ce que la laïcité ?",
    choices: [
      "Un principe garantissant la liberté de conscience et la neutralité de l'État",
      "L'interdiction des religions",
      "Une religion d'État",
      "Une obligation de croire",
    ],
    correctIndex: 0,
    explanation:
      "Loi de 1905 : la laïcité sépare les religions et l'État, garantissant la liberté de conscience.",
  },
  {
    id: "off-csp-036",
    category: "CSP",
    theme: "valeurs",
    text: "Un enfant peut-il refuser d'aller à l'école pour une raison religieuse ?",
    choices: [
      "Non, l'instruction est obligatoire",
      "Oui, sans condition",
      "Seulement le vendredi",
      "Seulement le samedi",
    ],
    correctIndex: 0,
    explanation:
      "L'instruction est obligatoire de 3 à 16 ans (depuis 2019). Aucun motif religieux ne peut justifier une non-scolarisation.",
  },
  {
    id: "off-csp-037",
    category: "CSP",
    theme: "valeurs",
    text: "Une personne a-t-elle le droit de ne pas croire en une religion ?",
    choices: [
      "Oui, c'est la liberté de conscience",
      "Non, c'est interdit",
      "Uniquement à l'étranger",
      "Seulement en privé",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de conscience inclut le droit de ne pas croire (athéisme, agnosticisme), garanti par la laïcité.",
  },

  // ─── §2 Système institutionnel et politique (38-83) ─────────────────
  {
    id: "off-csp-038",
    category: "CSP",
    theme: "institutions",
    text: "Qui nomme le Premier ministre ?",
    choices: [
      "Le Président de la République",
      "L'Assemblée nationale",
      "Le Sénat",
      "Les Français au suffrage direct",
    ],
    correctIndex: 0,
    explanation:
      "Le Premier ministre est nommé par le Président de la République (article 8 de la Constitution).",
  },
  {
    id: "off-csp-039",
    category: "CSP",
    theme: "institutions",
    text: "Le Parlement est composé :",
    choices: [
      "De l'Assemblée nationale et du Sénat",
      "Du Gouvernement et du Président",
      "Des préfets",
      "Du Conseil constitutionnel",
    ],
    correctIndex: 0,
    explanation:
      "Le Parlement bicaméral : Assemblée nationale (577 députés) + Sénat (348 sénateurs).",
  },
  {
    id: "off-csp-040",
    category: "CSP",
    theme: "institutions",
    text: "Qu'est-ce que le pouvoir exécutif ? Le pouvoir :",
    choices: [
      "D'appliquer les lois et de gouverner",
      "De voter les lois",
      "De juger les criminels",
      "De rédiger la Constitution",
    ],
    correctIndex: 0,
    explanation:
      "Le pouvoir exécutif applique les lois et conduit la politique de la Nation. Il est exercé par le Président et le Gouvernement.",
  },
  {
    id: "off-csp-041",
    category: "CSP",
    theme: "institutions",
    text: "Les dirigeants sont élus par les citoyens dans :",
    choices: [
      "Une démocratie",
      "Une monarchie",
      "Une dictature",
      "Une théocratie",
    ],
    correctIndex: 0,
    explanation:
      "Une démocratie est un régime où le pouvoir vient du peuple et où les dirigeants sont élus.",
  },
  {
    id: "off-csp-042",
    category: "CSP",
    theme: "valeurs",
    text: "A-t-on le droit de ne pas respecter une loi ?",
    choices: [
      "Non, le respect de la loi est obligatoire pour tous",
      "Oui, si on n'est pas d'accord",
      "Oui, dans certains cas",
      "Oui, si on est étranger",
    ],
    correctIndex: 0,
    explanation:
      "Toute personne résidant en France doit respecter la loi. Le non-respect entraîne des sanctions.",
  },
  {
    id: "off-csp-043",
    category: "CSP",
    theme: "valeurs",
    text: "Qui doit respecter la loi ?",
    choices: [
      "Tout le monde, citoyens et dirigeants",
      "Seulement les citoyens",
      "Seulement les étrangers",
      "Seulement les jeunes",
    ],
    correctIndex: 0,
    explanation:
      "La loi s'applique à tous : citoyens, étrangers, élus et dirigeants. Nul n'est au-dessus des lois.",
  },
  {
    id: "off-csp-044",
    category: "CSP",
    theme: "institutions",
    text: "Quel est le rôle de l'autorité judiciaire ?",
    choices: [
      "Faire appliquer la loi et rendre la justice",
      "Voter les lois",
      "Diriger l'armée",
      "Élire le président",
    ],
    correctIndex: 0,
    explanation:
      "L'autorité judiciaire est indépendante (article 64 de la Constitution) et veille au respect des lois.",
  },
  {
    id: "off-csp-045",
    category: "CSP",
    theme: "institutions",
    text: "Quel pouvoir détient un juge ? Le pouvoir :",
    choices: ["Judiciaire", "Législatif", "Exécutif", "Médiatique"],
    correctIndex: 0,
    explanation:
      "Les juges exercent le pouvoir judiciaire, indépendant de l'exécutif et du législatif.",
  },
  {
    id: "off-csp-046",
    category: "CSP",
    theme: "institutions",
    text: "L'autorité judiciaire est exercée par :",
    choices: [
      "Les juges et les magistrats",
      "Les députés",
      "Les ministres",
      "Le préfet",
    ],
    correctIndex: 0,
    explanation:
      "Les magistrats (juges du siège et du parquet) exercent l'autorité judiciaire au nom du peuple français.",
  },
  {
    id: "off-csp-047",
    category: "CSP",
    theme: "valeurs",
    text: "Que se passe-t-il si un ministre ne respecte pas la loi ?",
    choices: [
      "Il est jugé comme tout citoyen",
      "Rien, il a l'immunité totale",
      "Il est seulement renvoyé",
      "Il est gracié automatiquement",
    ],
    correctIndex: 0,
    explanation:
      "Aucun ministre n'est au-dessus de la loi. La Cour de justice de la République juge les ministres.",
  },
  {
    id: "off-csp-048",
    category: "CSP",
    theme: "institutions",
    text: "Qui est élu lors des élections législatives ?",
    choices: ["Les députés", "Le président", "Les sénateurs", "Le maire"],
    correctIndex: 0,
    explanation:
      "Les élections législatives élisent les députés à l'Assemblée nationale (577 députés pour 5 ans).",
  },
  {
    id: "off-csp-049",
    category: "CSP",
    theme: "institutions",
    text: "Combien de députés composent l'Assemblée nationale ?",
    choices: ["577", "348", "1000", "200"],
    correctIndex: 0,
    explanation:
      "L'Assemblée nationale compte 577 députés, élus pour 5 ans au suffrage universel direct.",
  },
  {
    id: "off-csp-050",
    category: "CSP",
    theme: "institutions",
    text: "Quand sont élus les sénateurs ?",
    choices: [
      "Tous les 6 ans, par moitié tous les 3 ans",
      "Tous les 5 ans",
      "Tous les 7 ans",
      "Tous les 10 ans",
    ],
    correctIndex: 0,
    explanation:
      "Les sénateurs sont élus pour 6 ans au suffrage indirect ; le Sénat est renouvelé par moitié tous les 3 ans.",
  },
  {
    id: "off-csp-051",
    category: "CSP",
    theme: "institutions",
    text: "Qui est élu lors des élections municipales ?",
    choices: [
      "Les conseillers municipaux",
      "Le préfet",
      "Le président",
      "Les sénateurs",
    ],
    correctIndex: 0,
    explanation:
      "Les habitants élisent les conseillers municipaux ; ceux-ci élisent ensuite le maire en leur sein.",
  },
  {
    id: "off-csp-052",
    category: "CSP",
    theme: "institutions",
    text: "Qui est élu lors des élections présidentielles ?",
    choices: [
      "Le Président de la République",
      "Le Premier ministre",
      "Les députés",
      "Les sénateurs",
    ],
    correctIndex: 0,
    explanation:
      "Le Président est élu pour 5 ans au suffrage universel direct (depuis 1962).",
  },
  {
    id: "off-csp-053",
    category: "CSP",
    theme: "institutions",
    text: "À partir de quel âge a-t-on le droit de voter ?",
    choices: ["18 ans", "16 ans", "21 ans", "25 ans"],
    correctIndex: 0,
    explanation:
      "Le droit de vote est ouvert à tout citoyen français majeur, soit à partir de 18 ans.",
  },
  {
    id: "off-csp-054",
    category: "CSP",
    theme: "institutions",
    text: "Pour combien de temps est élu le président de la République française ?",
    choices: ["5 ans", "7 ans", "4 ans", "10 ans"],
    correctIndex: 0,
    explanation:
      "Quinquennat depuis 2000 (référendum). Mandat renouvelable une fois consécutivement.",
  },
  {
    id: "off-csp-055",
    category: "CSP",
    theme: "institutions",
    text: "Pour combien de temps sont élus les députés ?",
    choices: ["5 ans", "6 ans", "7 ans", "3 ans"],
    correctIndex: 0,
    explanation:
      "Mandat des députés : 5 ans, sauf dissolution de l'Assemblée nationale par le Président.",
  },
  {
    id: "off-csp-056",
    category: "CSP",
    theme: "institutions",
    text: "Pour combien de temps sont élus les sénateurs ?",
    choices: ["6 ans", "5 ans", "9 ans", "4 ans"],
    correctIndex: 0,
    explanation:
      "Mandat des sénateurs : 6 ans, renouvelable par moitié tous les 3 ans.",
  },
  {
    id: "off-csp-057",
    category: "CSP",
    theme: "institutions",
    text: "Qui possède le pouvoir exécutif ?",
    choices: [
      "Le Président de la République et le Gouvernement",
      "L'Assemblée nationale",
      "Les juges",
      "Les sénateurs",
    ],
    correctIndex: 0,
    explanation:
      "Le pouvoir exécutif est partagé entre le Président de la République et le Gouvernement (Premier ministre + ministres).",
  },
  {
    id: "off-csp-058",
    category: "CSP",
    theme: "institutions",
    text: "Quelle condition est nécessaire pour voter aux élections ?",
    choices: [
      "Être inscrit sur les listes électorales",
      "Payer un impôt spécial",
      "Avoir un emploi",
      "Habiter Paris",
    ],
    correctIndex: 0,
    explanation:
      "Pour voter, il faut être citoyen français majeur, jouir de ses droits civiques et être inscrit sur les listes électorales.",
  },
  {
    id: "off-csp-059",
    category: "CSP",
    theme: "institutions",
    text: "Qui peut voter aux élections en France ?",
    choices: [
      "Les citoyens français majeurs inscrits sur les listes",
      "Tous les habitants",
      "Seulement les hommes",
      "Seulement les retraités",
    ],
    correctIndex: 0,
    explanation:
      "Les citoyens français majeurs jouissant de leurs droits civiques. Les Européens peuvent voter aux municipales et européennes.",
  },
  {
    id: "off-csp-060",
    category: "CSP",
    theme: "institutions",
    text: "Que signifie « suffrage universel » ?",
    choices: [
      "Tous les citoyens majeurs ont le droit de vote",
      "Seuls les hommes votent",
      "Seuls les riches votent",
      "Le vote se fait par Internet",
    ],
    correctIndex: 0,
    explanation:
      "Le suffrage universel donne le droit de vote à tous les citoyens majeurs, sans condition de fortune ou de sexe.",
  },
  {
    id: "off-csp-061",
    category: "CSP",
    theme: "institutions",
    text: "Concernant les partis politiques, quelle proposition est correcte ?",
    choices: [
      "Ils peuvent se former librement et concourent à l'expression du suffrage",
      "Ils sont interdits",
      "Il y a un seul parti officiel",
      "Ils sont nommés par le Président",
    ],
    correctIndex: 0,
    explanation:
      "Article 4 de la Constitution : les partis se forment librement et concourent à l'expression du suffrage.",
  },
  {
    id: "off-csp-062",
    category: "CSP",
    theme: "institutions",
    text: "Quel est le rôle des députés ?",
    choices: [
      "Voter les lois et contrôler le Gouvernement",
      "Diriger les ministères",
      "Juger les criminels",
      "Nommer le Président",
    ],
    correctIndex: 0,
    explanation:
      "Les députés siègent à l'Assemblée nationale. Ils votent les lois, le budget et contrôlent l'action du Gouvernement.",
  },
  {
    id: "off-csp-063",
    category: "CSP",
    theme: "institutions",
    text: "La séparation des pouvoirs est un principe fondamental. Quels sont les trois pouvoirs concernés ?",
    choices: [
      "Exécutif, législatif, judiciaire",
      "Président, Premier ministre, ministres",
      "État, Régions, Communes",
      "Police, Justice, Armée",
    ],
    correctIndex: 0,
    explanation:
      "Théorie de Montesquieu : séparer l'exécutif (gouverner), le législatif (faire les lois) et le judiciaire (juger).",
  },
  {
    id: "off-csp-064",
    category: "CSP",
    theme: "institutions",
    text: "Qui possède le pouvoir législatif ?",
    choices: [
      "Le Parlement (Assemblée nationale et Sénat)",
      "Le Président",
      "Le Gouvernement",
      "Les juges",
    ],
    correctIndex: 0,
    explanation:
      "Le pouvoir législatif vote les lois. Il est exercé par le Parlement, composé de l'Assemblée nationale et du Sénat.",
  },
  {
    id: "off-csp-065",
    category: "CSP",
    theme: "institutions",
    text: "Qui sanctionne l'auteur d'un vol ?",
    choices: ["Un juge", "Un député", "Le maire", "Le préfet"],
    correctIndex: 0,
    explanation:
      "Seul un juge peut prononcer une sanction pénale. La justice est rendue au nom du peuple français.",
  },
  {
    id: "off-csp-066",
    category: "CSP",
    theme: "institutions",
    text: "Qui élit les députés ?",
    choices: [
      "Les citoyens français majeurs au suffrage universel direct",
      "Le Président",
      "Le Sénat",
      "Les maires",
    ],
    correctIndex: 0,
    explanation:
      "Les députés sont élus pour 5 ans au suffrage universel direct par les citoyens français majeurs.",
  },
  {
    id: "off-csp-067",
    category: "CSP",
    theme: "institutions",
    text: "Qui vote les lois ?",
    choices: ["Le Parlement", "Le Président", "Le Gouvernement", "Les préfets"],
    correctIndex: 0,
    explanation:
      "Les lois sont votées par le Parlement (Assemblée nationale et Sénat) et promulguées par le Président.",
  },
  {
    id: "off-csp-068",
    category: "CSP",
    theme: "institutions",
    text: "Qui réside au palais de l'Élysée ?",
    choices: [
      "Le Président de la République",
      "Le Premier ministre",
      "Le Président de l'Assemblée",
      "Le Président du Sénat",
    ],
    correctIndex: 0,
    explanation:
      "Le palais de l'Élysée est la résidence officielle du Président de la République depuis 1848.",
  },
  {
    id: "off-csp-069",
    category: "CSP",
    theme: "geographie",
    text: "Combien y a-t-il de départements en France ?",
    choices: ["101", "96", "100", "120"],
    correctIndex: 0,
    explanation:
      "La France compte 101 départements : 96 en métropole + 5 d'outre-mer (Guadeloupe, Martinique, Guyane, Réunion, Mayotte).",
  },
  {
    id: "off-csp-070",
    category: "CSP",
    theme: "institutions",
    text: "Qui représente l'État dans un département ?",
    choices: ["Le préfet", "Le maire", "Le sénateur", "Le député"],
    correctIndex: 0,
    explanation:
      "Le préfet est nommé par le Président et représente l'État dans chaque département.",
  },
  {
    id: "off-csp-071",
    category: "CSP",
    theme: "institutions",
    text: "Qui dirige la commune ?",
    choices: [
      "Le maire, élu par le conseil municipal",
      "Le préfet",
      "Le Premier ministre",
      "Le député",
    ],
    correctIndex: 0,
    explanation:
      "Le maire est élu par les conseillers municipaux pour 6 ans. Il dirige la commune et exécute les décisions du conseil.",
  },
  {
    id: "off-csp-072",
    category: "CSP",
    theme: "institutions",
    text: "Est-ce que le président de la République a tous les pouvoirs ?",
    choices: [
      "Non, ses pouvoirs sont définis par la Constitution",
      "Oui, il a tous les pouvoirs",
      "Oui, mais seulement en temps de guerre",
      "Oui, sauf le pouvoir de juger",
    ],
    correctIndex: 0,
    explanation:
      "Les pouvoirs du Président sont strictement définis par la Constitution. Le principe de séparation des pouvoirs s'applique.",
  },
  {
    id: "off-csp-073",
    category: "CSP",
    theme: "institutions",
    text: "Qui est le préfet ?",
    choices: [
      "Le représentant de l'État dans le département",
      "Le maire d'une grande ville",
      "Un juge",
      "Un député",
    ],
    correctIndex: 0,
    explanation:
      "Nommé par le Président, le préfet représente l'État et chaque membre du Gouvernement dans le département.",
  },
  {
    id: "off-csp-074",
    category: "CSP",
    theme: "institutions",
    text: "Quel est le rôle du Parlement ?",
    choices: [
      "Voter les lois et contrôler le Gouvernement",
      "Diriger l'armée",
      "Élire le président",
      "Rendre la justice",
    ],
    correctIndex: 0,
    explanation:
      "Le Parlement (Assemblée nationale + Sénat) vote les lois, le budget de l'État et contrôle le Gouvernement.",
  },
  {
    id: "off-csp-075",
    category: "CSP",
    theme: "institutions",
    text: "Quel est le régime politique de la France aujourd'hui ?",
    choices: [
      "Une République (Ve République)",
      "Une monarchie",
      "Un empire",
      "Une fédération",
    ],
    correctIndex: 0,
    explanation:
      "La France est une République depuis 1870 (sauf 1940-1944). La Ve République a été fondée en 1958.",
  },
  {
    id: "off-csp-076",
    category: "CSP",
    theme: "institutions",
    text: "Combien d'États font partie de l'Union européenne au 1er janvier 2025 ?",
    choices: ["27", "28", "25", "30"],
    correctIndex: 0,
    explanation:
      "L'UE compte 27 États membres depuis le retrait du Royaume-Uni (Brexit, 31 janvier 2020).",
  },
  {
    id: "off-csp-077",
    category: "CSP",
    theme: "institutions",
    text: "Quel État n'est pas membre de l'Union européenne ?",
    choices: ["La Suisse", "La France", "L'Allemagne", "L'Italie"],
    correctIndex: 0,
    explanation:
      "La Suisse, la Norvège et le Royaume-Uni (depuis 2020) ne sont pas membres de l'UE.",
  },
  {
    id: "off-csp-078",
    category: "CSP",
    theme: "institutions",
    text: "Quelle condition est nécessaire pour voter aux élections européennes ?",
    choices: [
      "Être citoyen d'un État de l'Union européenne et inscrit sur les listes",
      "Avoir 21 ans minimum",
      "Habiter à Bruxelles",
      "Parler plusieurs langues",
    ],
    correctIndex: 0,
    explanation:
      "Tout citoyen de l'UE majeur peut voter aux élections européennes dans son pays de résidence, sous condition d'inscription.",
  },
  {
    id: "off-csp-079",
    category: "CSP",
    theme: "institutions",
    text: "À quelle fréquence les élections européennes sont-elles organisées ?",
    choices: ["Tous les 5 ans", "Tous les 3 ans", "Tous les 7 ans", "Tous les 4 ans"],
    correctIndex: 0,
    explanation:
      "Les députés européens sont élus pour 5 ans au suffrage universel direct.",
  },
  {
    id: "off-csp-080",
    category: "CSP",
    theme: "institutions",
    text: "Quel pays est un pays fondateur de l'Union européenne ?",
    choices: ["L'Allemagne", "La Pologne", "L'Espagne", "La Grèce"],
    correctIndex: 0,
    explanation:
      "Six pays fondateurs (1957, traité de Rome) : Allemagne, France, Italie, Belgique, Pays-Bas, Luxembourg.",
  },
  {
    id: "off-csp-081",
    category: "CSP",
    theme: "institutions",
    text: "Quelle est la monnaie utilisée en France ?",
    choices: ["L'euro", "Le franc", "Le dollar", "La livre"],
    correctIndex: 0,
    explanation:
      "L'euro a remplacé le franc français le 1er janvier 2002 (billets et pièces).",
  },
  {
    id: "off-csp-082",
    category: "CSP",
    theme: "institutions",
    text: "Qui élit les députés européens ?",
    choices: [
      "Les citoyens des États membres au suffrage universel direct",
      "Les chefs d'État",
      "Les députés nationaux",
      "Le Président de la Commission",
    ],
    correctIndex: 0,
    explanation:
      "Les députés européens sont élus pour 5 ans au suffrage universel direct par les citoyens de chaque État membre.",
  },
  {
    id: "off-csp-083",
    category: "CSP",
    theme: "institutions",
    text: "Quand célèbre-t-on la journée de l'Europe ?",
    choices: ["Le 9 mai", "Le 1er mai", "Le 14 juillet", "Le 8 mai"],
    correctIndex: 0,
    explanation:
      "Le 9 mai commémore la Déclaration Schuman de 1950, considérée comme l'acte de naissance de l'UE.",
  },

  // ─── §3 Droits et devoirs (84-113) ──────────────────────────────────
  {
    id: "off-csp-084",
    category: "CSP",
    theme: "valeurs",
    text: "Comment s'appelle la Constitution actuelle de la France ?",
    choices: [
      "La Constitution de la Ve République",
      "La Constitution de 1789",
      "La Charte des droits",
      "La Déclaration des Droits de l'Homme",
    ],
    correctIndex: 0,
    explanation:
      "Constitution de la Ve République, adoptée le 4 octobre 1958, modifiée à plusieurs reprises depuis.",
  },
  {
    id: "off-csp-085",
    category: "CSP",
    theme: "valeurs",
    text: "Comment s'appelle le texte qui énonce les droits et devoirs des personnes résidant en France ?",
    choices: [
      "La Déclaration des Droits de l'Homme et du Citoyen",
      "Le Code civil uniquement",
      "Le règlement intérieur",
      "Le livret du citoyen",
    ],
    correctIndex: 0,
    explanation:
      "La Déclaration des Droits de l'Homme et du Citoyen (1789) est le texte fondateur des droits et libertés en France.",
  },
  {
    id: "off-csp-086",
    category: "CSP",
    theme: "valeurs",
    text: "Concernant les droits individuels, quelle proposition est correcte ?",
    choices: [
      "Ils sont garantis mais peuvent être limités pour protéger l'intérêt général",
      "Ils sont absolus et illimités",
      "Ils n'existent que pour les Français",
      "Ils ne s'appliquent pas aux mineurs",
    ],
    correctIndex: 0,
    explanation:
      "Les droits sont garantis par la Constitution, mais leur exercice peut être limité dans l'intérêt général (sécurité, santé publique).",
  },
  {
    id: "off-csp-087",
    category: "CSP",
    theme: "valeurs",
    text: "De quelle année date la Déclaration des droits de l'homme et du citoyen ?",
    choices: ["1789", "1804", "1848", "1958"],
    correctIndex: 0,
    explanation:
      "Adoptée le 26 août 1789 pendant la Révolution française. Texte fondateur des droits et libertés.",
  },
  {
    id: "off-csp-088",
    category: "CSP",
    theme: "valeurs",
    text: "Lequel de ces droits est un droit fondamental ?",
    choices: [
      "La liberté d'expression",
      "Le droit de ne pas payer d'impôt",
      "Le droit de rouler vite",
      "Le droit de ne pas travailler",
    ],
    correctIndex: 0,
    explanation:
      "Les libertés d'expression, de conscience, de réunion, de circulation sont des droits fondamentaux.",
  },
  {
    id: "off-csp-089",
    category: "CSP",
    theme: "valeurs",
    text: "Parmi ces textes, lequel garantit les droits et libertés en France ?",
    choices: [
      "La Constitution et la Déclaration des Droits de l'Homme et du Citoyen",
      "Le Code de la route",
      "Le règlement scolaire",
      "Le livret de famille",
    ],
    correctIndex: 0,
    explanation:
      "La Constitution (1958) et la DDHC (1789, intégrée au préambule) garantissent les droits et libertés.",
  },
  {
    id: "off-csp-090",
    category: "CSP",
    theme: "valeurs",
    text: "Qu'est-ce que la liberté d'expression ?",
    choices: [
      "Le droit d'exprimer ses idées et opinions, dans le respect de la loi",
      "Le droit de tout dire sans limite",
      "Le droit de garder le silence",
      "Le droit réservé aux journalistes",
    ],
    correctIndex: 0,
    explanation:
      "Garantie par l'article 11 de la DDHC. Les abus (incitation à la haine, diffamation, injure) sont punis.",
  },
  {
    id: "off-csp-091",
    category: "CSP",
    theme: "valeurs",
    text: "Quel droit permet à une personne de se défendre devant la justice ?",
    choices: [
      "Les droits de la défense",
      "Le droit de grève",
      "Le droit de propriété",
      "Le droit de manifester",
    ],
    correctIndex: 0,
    explanation:
      "Les droits de la défense incluent le droit à un avocat, à la présomption d'innocence et à un procès équitable.",
  },
  {
    id: "off-csp-092",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est le texte fondateur établissant en France les droits et les devoirs de chaque citoyen ?",
    choices: [
      "La Déclaration des Droits de l'Homme et du Citoyen",
      "Le Code pénal",
      "La Charte de l'environnement",
      "Le Livret du citoyen",
    ],
    correctIndex: 0,
    explanation:
      "Adoptée le 26 août 1789, la DDHC pose les principes fondamentaux des droits humains en France.",
  },
  {
    id: "off-csp-093",
    category: "CSP",
    theme: "histoire",
    text: "Quel texte a été adopté pendant la Révolution française ?",
    choices: [
      "La Déclaration des Droits de l'Homme et du Citoyen",
      "La Constitution de 1958",
      "Le traité de Maastricht",
      "La Charte de l'environnement",
    ],
    correctIndex: 0,
    explanation:
      "La DDHC, adoptée le 26 août 1789, est l'un des textes phares de la Révolution française.",
  },
  {
    id: "off-csp-094",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle liberté permet à une personne de ne pas avoir de religion ?",
    choices: [
      "La liberté de conscience",
      "La liberté de circulation",
      "La liberté du travail",
      "La liberté de la presse",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de conscience, garantie par la laïcité, inclut le droit de croire, de ne pas croire ou de changer de religion.",
  },
  {
    id: "off-csp-095",
    category: "CSP",
    theme: "valeurs",
    text: "Une femme peut avorter :",
    choices: [
      "Oui, c'est un droit garanti par la loi",
      "Non, c'est interdit",
      "Seulement avec l'accord de son mari",
      "Seulement après 30 ans",
    ],
    correctIndex: 0,
    explanation:
      "L'interruption volontaire de grossesse est légale depuis la loi Veil (1975) et la liberté est inscrite dans la Constitution depuis 2024.",
  },
  {
    id: "off-csp-096",
    category: "CSP",
    theme: "valeurs",
    text: "Est-il toujours possible de divorcer ?",
    choices: [
      "Oui, le divorce est un droit",
      "Non, le mariage est définitif",
      "Seulement pour les hommes",
      "Seulement après 10 ans de mariage",
    ],
    correctIndex: 0,
    explanation:
      "Le divorce est légal depuis 1884. Plusieurs procédures existent : par consentement mutuel, pour faute, etc.",
  },
  {
    id: "off-csp-097",
    category: "CSP",
    theme: "valeurs",
    text: "La peine de mort est :",
    choices: [
      "Abolie en France",
      "Encore appliquée pour les crimes les plus graves",
      "Suspendue temporairement",
      "Réservée aux mineurs",
    ],
    correctIndex: 0,
    explanation:
      "Abolie en France le 9 octobre 1981 sous François Mitterrand, à l'initiative de Robert Badinter.",
  },
  {
    id: "off-csp-098",
    category: "CSP",
    theme: "valeurs",
    text: "Concernant les limites aux libertés individuelles, quelle proposition est correcte ?",
    choices: [
      "Elles peuvent être limitées par la loi pour protéger l'ordre public ou autrui",
      "Elles ne peuvent jamais être limitées",
      "Elles dépendent uniquement du juge",
      "Le Président peut les supprimer à tout moment",
    ],
    correctIndex: 0,
    explanation:
      "L'article 4 de la DDHC : « La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui ». Les limites sont fixées par la loi.",
  },
  {
    id: "off-csp-099",
    category: "CSP",
    theme: "valeurs",
    text: "En France, est-ce légal d'être marié à plusieurs personnes en même temps ?",
    choices: [
      "Non, la polygamie est interdite",
      "Oui, dans certaines régions",
      "Oui, avec l'accord du maire",
      "Oui, sans condition",
    ],
    correctIndex: 0,
    explanation:
      "La polygamie est interdite en France. Seul le mariage monogame est reconnu (article 147 du Code civil).",
  },
  {
    id: "off-csp-100",
    category: "CSP",
    theme: "culture",
    text: "Faut-il réduire ses déchets ?",
    choices: [
      "Oui, c'est une obligation civique pour protéger l'environnement",
      "Non, ça ne sert à rien",
      "Seulement à la campagne",
      "Seulement pour les entreprises",
    ],
    correctIndex: 0,
    explanation:
      "Réduire et trier ses déchets est un geste citoyen. La loi anti-gaspillage (2020) impose le tri à tous.",
  },
  {
    id: "off-csp-101",
    category: "CSP",
    theme: "culture",
    text: "Jeter une bouteille dans la rue est :",
    choices: [
      "Interdit et passible d'une amende",
      "Autorisé",
      "Toléré le week-end",
      "Permis si la bouteille est vide",
    ],
    correctIndex: 0,
    explanation:
      "Le dépôt sauvage de déchets est interdit. Amende : 135 € pour un mégot ou une bouteille jetée dans la rue.",
  },
  {
    id: "off-csp-102",
    category: "CSP",
    theme: "valeurs",
    text: "Pourquoi les libertés individuelles peuvent-elles être limitées ?",
    choices: [
      "Pour protéger l'ordre public et les droits d'autrui",
      "Pour le plaisir des autorités",
      "Elles ne peuvent jamais être limitées",
      "Pour favoriser certaines personnes",
    ],
    correctIndex: 0,
    explanation:
      "Les libertés peuvent être restreintes par la loi pour protéger l'intérêt général, l'ordre public ou les droits d'autrui.",
  },
  {
    id: "off-csp-103",
    category: "CSP",
    theme: "culture",
    text: "Que doit faire une personne en cas d'accident ?",
    choices: [
      "Porter assistance à la victime et appeler les secours",
      "Continuer son chemin sans rien faire",
      "Filmer l'accident",
      "Prévenir uniquement la famille",
    ],
    correctIndex: 0,
    explanation:
      "Le défaut d'assistance à personne en danger est puni jusqu'à 5 ans de prison et 75 000 € d'amende (article 223-6 du Code pénal).",
  },
  {
    id: "off-csp-104",
    category: "CSP",
    theme: "valeurs",
    text: "Que permet la citoyenneté française ?",
    choices: [
      "De voter, d'être éligible et de circuler librement dans l'UE",
      "Uniquement de payer des impôts",
      "Uniquement de travailler",
      "De ne pas respecter la loi",
    ],
    correctIndex: 0,
    explanation:
      "La citoyenneté française confère droits civils, politiques (vote) et la citoyenneté européenne (libre circulation dans l'UE).",
  },
  {
    id: "off-csp-105",
    category: "CSP",
    theme: "valeurs",
    text: "Que risque une personne qui ne respecte pas la loi ?",
    choices: [
      "Une sanction (amende, prison) prononcée par un juge",
      "Rien",
      "Un avertissement uniquement",
      "Une interdiction de voter à vie",
    ],
    correctIndex: 0,
    explanation:
      "Le non-respect de la loi entraîne des sanctions pénales (amendes, peines de prison) prononcées par les tribunaux.",
  },
  {
    id: "off-csp-106",
    category: "CSP",
    theme: "institutions",
    text: "Quel est le rôle de la gendarmerie ?",
    choices: [
      "Assurer la sécurité publique, principalement en zone rurale et péri-urbaine",
      "Voter les lois",
      "Juger les criminels",
      "Élire le président",
    ],
    correctIndex: 0,
    explanation:
      "La gendarmerie nationale dépend du ministère de l'Intérieur. Elle assure la sécurité en zone rurale et péri-urbaine.",
  },
  {
    id: "off-csp-107",
    category: "CSP",
    theme: "institutions",
    text: "Quel est le rôle de la police ?",
    choices: [
      "Assurer la sécurité, faire respecter la loi et l'ordre public",
      "Voter les lois",
      "Diriger les écoles",
      "Décider des impôts",
    ],
    correctIndex: 0,
    explanation:
      "La police nationale fait respecter la loi, lutte contre la délinquance et protège les citoyens, surtout en zone urbaine.",
  },
  {
    id: "off-csp-108",
    category: "CSP",
    theme: "valeurs",
    text: "Qu'est-ce qu'une infraction ?",
    choices: [
      "Une violation de la loi punie par une sanction",
      "Une simple erreur",
      "Une contravention seulement",
      "Un délit administratif sans sanction",
    ],
    correctIndex: 0,
    explanation:
      "Une infraction est un acte interdit par la loi. Trois catégories : contravention, délit, crime (par gravité croissante).",
  },
  {
    id: "off-csp-109",
    category: "CSP",
    theme: "culture",
    text: "Comment peut-on réduire ses déchets ?",
    choices: [
      "En triant, recyclant et limitant les emballages",
      "En les brûlant dans son jardin",
      "En les jetant dans la rue",
      "En les enterrant",
    ],
    correctIndex: 0,
    explanation:
      "Tri sélectif, compost, achat en vrac, réutilisation : tous les gestes utiles pour réduire l'empreinte écologique.",
  },
  {
    id: "off-csp-110",
    category: "CSP",
    theme: "culture",
    text: "Déposer une machine à laver cassée sur le trottoir est :",
    choices: [
      "Interdit, il faut l'apporter en déchetterie ou faire appel à un service d'enlèvement",
      "Autorisé",
      "Permis le dimanche",
      "Permis si la machine est en panne",
    ],
    correctIndex: 0,
    explanation:
      "Le dépôt sauvage est puni d'une amende. Les déchets encombrants doivent être déposés en déchetterie ou collectés sur rendez-vous.",
  },
  {
    id: "off-csp-111",
    category: "CSP",
    theme: "valeurs",
    text: "En quoi consiste la traite des êtres humains ?",
    choices: [
      "L'exploitation de personnes (travail forcé, prostitution, esclavage moderne)",
      "Le commerce international",
      "Le tourisme",
      "Le transport de marchandises",
    ],
    correctIndex: 0,
    explanation:
      "Crime grave : recrutement, transport ou hébergement de personnes à des fins d'exploitation. Puni de 7 à 20 ans de prison.",
  },
  {
    id: "off-csp-112",
    category: "CSP",
    theme: "valeurs",
    text: "Que doit faire une victime de violences ?",
    choices: [
      "Porter plainte auprès de la police ou de la gendarmerie",
      "Garder le silence",
      "Se venger personnellement",
      "Quitter la France",
    ],
    correctIndex: 0,
    explanation:
      "Une victime peut porter plainte 24h/24, appeler le 17 ou le 3919 (violences faites aux femmes). L'aide juridictionnelle existe.",
  },
  {
    id: "off-csp-113",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle est l'infraction la plus grave ?",
    choices: ["Le crime", "Le délit", "La contravention", "L'infraction routière"],
    correctIndex: 0,
    explanation:
      "Hiérarchie : contravention (la moins grave), délit, crime (la plus grave, jugé en cour d'assises).",
  },

  // ─── §4 Histoire, géographie et culture (114-160) ────────────────────
  {
    id: "off-csp-114",
    category: "CSP",
    theme: "histoire",
    text: "En quelle année a débuté la Révolution française ?",
    choices: ["1789", "1804", "1848", "1870"],
    correctIndex: 0,
    explanation:
      "La Révolution débute le 14 juillet 1789 avec la prise de la Bastille à Paris.",
  },
  {
    id: "off-csp-115",
    category: "CSP",
    theme: "histoire",
    text: "Qui était Napoléon Ier ?",
    choices: [
      "Un empereur français du début du XIXe siècle",
      "Un roi du Moyen Âge",
      "Un président de la Ve République",
      "Un philosophe des Lumières",
    ],
    correctIndex: 0,
    explanation:
      "Napoléon Bonaparte, empereur des Français de 1804 à 1815. Auteur du Code civil.",
  },
  {
    id: "off-csp-116",
    category: "CSP",
    theme: "culture",
    text: "Lequel de ces personnages historiques est français ?",
    choices: ["Charles de Gaulle", "Winston Churchill", "Abraham Lincoln", "Mahatma Gandhi"],
    correctIndex: 0,
    explanation:
      "Charles de Gaulle (1890-1970) : général, fondateur de la Ve République et chef de la France libre durant la Seconde Guerre mondiale.",
  },
  {
    id: "off-csp-117",
    category: "CSP",
    theme: "histoire",
    text: "Dans quelle République est-on aujourd'hui ?",
    choices: ["La Ve République", "La IIIe République", "La IVe République", "La VIe République"],
    correctIndex: 0,
    explanation:
      "La Ve République, fondée par Charles de Gaulle, est en vigueur depuis le 4 octobre 1958.",
  },
  {
    id: "off-csp-118",
    category: "CSP",
    theme: "histoire",
    text: "Qu'est-ce que la Shoah ?",
    choices: [
      "Le génocide des Juifs d'Europe par le régime nazi (1939-1945)",
      "Une guerre antique",
      "Une révolution au XIXe siècle",
      "Un mouvement artistique",
    ],
    correctIndex: 0,
    explanation:
      "La Shoah désigne l'extermination systématique d'environ 6 millions de Juifs par l'Allemagne nazie pendant la Seconde Guerre mondiale.",
  },
  {
    id: "off-csp-119",
    category: "CSP",
    theme: "histoire",
    text: "Quel pays ou région du monde a été colonisé par la France ?",
    choices: ["L'Algérie", "Le Royaume-Uni", "L'Espagne", "L'Allemagne"],
    correctIndex: 0,
    explanation:
      "La France a colonisé l'Algérie (1830-1962), une grande partie de l'Afrique de l'Ouest, l'Indochine et d'autres territoires.",
  },
  {
    id: "off-csp-120",
    category: "CSP",
    theme: "histoire",
    text: "Qui a rendu l'école gratuite, laïque et obligatoire ?",
    choices: ["Jules Ferry", "Napoléon Ier", "Charles de Gaulle", "Léon Blum"],
    correctIndex: 0,
    explanation:
      "Lois Jules Ferry (1881-1882) : école primaire gratuite (1881), obligatoire et laïque (1882).",
  },
  {
    id: "off-csp-121",
    category: "CSP",
    theme: "histoire",
    text: "Quand a eu lieu la Seconde Guerre mondiale ?",
    choices: ["1939-1945", "1914-1918", "1870-1871", "1945-1950"],
    correctIndex: 0,
    explanation:
      "Du 1er septembre 1939 (invasion de la Pologne) au 8 mai 1945 (capitulation allemande) en Europe.",
  },
  {
    id: "off-csp-122",
    category: "CSP",
    theme: "histoire",
    text: "Quand a eu lieu la Première Guerre mondiale ?",
    choices: ["1914-1918", "1939-1945", "1870-1871", "1900-1905"],
    correctIndex: 0,
    explanation:
      "Du 28 juillet 1914 au 11 novembre 1918 (armistice de Rethondes).",
  },
  {
    id: "off-csp-123",
    category: "CSP",
    theme: "histoire",
    text: "En quelle année a été créée la Communauté Économique Européenne (CEE) ?",
    choices: ["1957", "1945", "1992", "1973"],
    correctIndex: 0,
    explanation:
      "Le traité de Rome (25 mars 1957) crée la CEE entre 6 pays. Elle deviendra l'UE en 1992 avec Maastricht.",
  },
  {
    id: "off-csp-124",
    category: "CSP",
    theme: "histoire",
    text: "Le 11 novembre est un jour férié. À quoi correspond cette date ?",
    choices: [
      "À l'armistice de 1918 (fin de la Première Guerre mondiale)",
      "À la fin de la Seconde Guerre mondiale",
      "À la Révolution française",
      "À l'élection de De Gaulle",
    ],
    correctIndex: 0,
    explanation:
      "Le 11 novembre 1918, l'armistice est signé à Rethondes, mettant fin à la Première Guerre mondiale.",
  },
  {
    id: "off-csp-125",
    category: "CSP",
    theme: "histoire",
    text: "Qui a été le premier Président élu sous la Ve République ?",
    choices: ["Charles de Gaulle", "François Mitterrand", "Georges Pompidou", "Jacques Chirac"],
    correctIndex: 0,
    explanation:
      "Charles de Gaulle, élu en 1958 par un collège électoral, puis réélu en 1965 au suffrage universel direct.",
  },
  {
    id: "off-csp-126",
    category: "CSP",
    theme: "histoire",
    text: "En quelle année l'esclavage a-t-il été aboli définitivement en France ?",
    choices: ["1848", "1789", "1944", "1981"],
    correctIndex: 0,
    explanation:
      "Décret du 27 avril 1848, sous l'impulsion de Victor Schœlcher. Première abolition en 1794, rétablie par Napoléon en 1802.",
  },
  {
    id: "off-csp-127",
    category: "CSP",
    theme: "histoire",
    text: "Depuis quelle année l'école publique est-elle gratuite ?",
    choices: ["1881", "1789", "1905", "1944"],
    correctIndex: 0,
    explanation:
      "Loi Jules Ferry du 16 juin 1881 instaurant la gratuité de l'enseignement public primaire.",
  },
  {
    id: "off-csp-128",
    category: "CSP",
    theme: "histoire",
    text: "Combien y a-t-il eu de républiques en France ?",
    choices: ["5", "3", "4", "6"],
    correctIndex: 0,
    explanation:
      "Cinq Républiques : Ire (1792), IIe (1848), IIIe (1870), IVe (1946), Ve (depuis 1958).",
  },
  {
    id: "off-csp-129",
    category: "CSP",
    theme: "histoire",
    text: "Qui était le roi de France au moment de la Révolution française ?",
    choices: ["Louis XVI", "Louis XIV", "Louis XV", "Henri IV"],
    correctIndex: 0,
    explanation:
      "Louis XVI, roi de 1774 à 1792. Exécuté à la guillotine le 21 janvier 1793.",
  },
  {
    id: "off-csp-130",
    category: "CSP",
    theme: "histoire",
    text: "Qui a fondé la Ve République ?",
    choices: ["Charles de Gaulle", "Napoléon III", "François Mitterrand", "Léon Blum"],
    correctIndex: 0,
    explanation:
      "Charles de Gaulle a fondé la Ve République en 1958 et en a été le premier président.",
  },
  {
    id: "off-csp-131",
    category: "CSP",
    theme: "histoire",
    text: "Que célèbre-t-on le 14 juillet ?",
    choices: [
      "La fête nationale (prise de la Bastille en 1789)",
      "La Saint-Jean",
      "Pâques",
      "La fin de la Seconde Guerre mondiale",
    ],
    correctIndex: 0,
    explanation:
      "Le 14 juillet 1789 : prise de la Bastille. Le 14 juillet 1790 : Fête de la Fédération. Fête nationale depuis 1880.",
  },
  {
    id: "off-csp-132",
    category: "CSP",
    theme: "histoire",
    text: "Quelle guerre a eu lieu entre 1914 et 1918 ?",
    choices: [
      "La Première Guerre mondiale",
      "La Seconde Guerre mondiale",
      "La guerre de Cent Ans",
      "La guerre de 1870",
    ],
    correctIndex: 0,
    explanation:
      "La Première Guerre mondiale (1914-1918), aussi appelée Grande Guerre. Armistice le 11 novembre 1918.",
  },
  {
    id: "off-csp-133",
    category: "CSP",
    theme: "histoire",
    text: "Pourquoi l'année 1958 est importante pour la France ?",
    choices: [
      "C'est la fondation de la Ve République",
      "C'est la fin de la guerre",
      "C'est la création de l'euro",
      "C'est l'abolition de la peine de mort",
    ],
    correctIndex: 0,
    explanation:
      "La Constitution de la Ve République est adoptée par référendum le 28 septembre 1958, promulguée le 4 octobre.",
  },
  {
    id: "off-csp-134",
    category: "CSP",
    theme: "geographie",
    text: "Quel fleuve coule en France ?",
    choices: ["La Seine", "Le Nil", "L'Amazone", "Le Mississippi"],
    correctIndex: 0,
    explanation:
      "La Seine traverse Paris. Autres grands fleuves français : Loire, Rhône, Garonne, Rhin.",
  },
  {
    id: "off-csp-135",
    category: "CSP",
    theme: "geographie",
    text: "Quelle ville est française ?",
    choices: ["Marseille", "Madrid", "Berlin", "Rome"],
    correctIndex: 0,
    explanation:
      "Marseille est la deuxième plus grande ville française et un grand port méditerranéen.",
  },
  {
    id: "off-csp-136",
    category: "CSP",
    theme: "geographie",
    text: "Quel océan borde la côte ouest française ?",
    choices: ["L'océan Atlantique", "L'océan Pacifique", "L'océan Indien", "L'océan Arctique"],
    correctIndex: 0,
    explanation:
      "La façade ouest de la France métropolitaine est bordée par l'océan Atlantique.",
  },
  {
    id: "off-csp-137",
    category: "CSP",
    theme: "geographie",
    text: "Qu'est-ce que Paris ?",
    choices: [
      "La capitale de la France",
      "Une région d'Allemagne",
      "Une île méditerranéenne",
      "Un pays voisin",
    ],
    correctIndex: 0,
    explanation:
      "Paris est la capitale de la France et le siège des principales institutions politiques.",
  },
  {
    id: "off-csp-138",
    category: "CSP",
    theme: "geographie",
    text: "Quelle est la capitale de la France ?",
    choices: ["Paris", "Lyon", "Marseille", "Bordeaux"],
    correctIndex: 0,
    explanation:
      "Paris est la capitale de la France depuis le Xe siècle, siège du pouvoir politique national.",
  },
  {
    id: "off-csp-139",
    category: "CSP",
    theme: "geographie",
    text: "Sur quel continent se situe la France métropolitaine ?",
    choices: ["L'Europe", "L'Afrique", "L'Asie", "L'Amérique"],
    correctIndex: 0,
    explanation:
      "La France métropolitaine se situe en Europe occidentale. Les territoires d'outre-mer sont répartis sur plusieurs continents.",
  },
  {
    id: "off-csp-140",
    category: "CSP",
    theme: "geographie",
    text: "Quelle île est un département d'outre-mer français ?",
    choices: ["La Réunion", "Madagascar", "Cuba", "Malte"],
    correctIndex: 0,
    explanation:
      "Cinq DROM : Guadeloupe, Martinique, Guyane, La Réunion (océan Indien), Mayotte.",
  },
  {
    id: "off-csp-141",
    category: "CSP",
    theme: "geographie",
    text: "Combien y a-t-il de régions en France métropolitaine ?",
    choices: ["13", "22", "10", "15"],
    correctIndex: 0,
    explanation:
      "13 régions métropolitaines depuis la réforme territoriale de 2016. Plus 5 régions d'outre-mer = 18 au total.",
  },
  {
    id: "off-csp-142",
    category: "CSP",
    theme: "geographie",
    text: "Quelle ville est un grand port maritime ?",
    choices: ["Marseille", "Toulouse", "Strasbourg", "Lille"],
    correctIndex: 0,
    explanation:
      "Marseille est le premier port français en tonnage. Autres grands ports : Le Havre, Dunkerque, Bordeaux, Nantes.",
  },
  {
    id: "off-csp-143",
    category: "CSP",
    theme: "geographie",
    text: "Quelle est la mer au sud de la France métropolitaine ?",
    choices: ["La mer Méditerranée", "La mer du Nord", "La mer Baltique", "La mer Noire"],
    correctIndex: 0,
    explanation:
      "La mer Méditerranée borde le sud de la France métropolitaine (Provence, Languedoc, Côte d'Azur, Corse).",
  },
  {
    id: "off-csp-144",
    category: "CSP",
    theme: "geographie",
    text: "Quelle ville est située au bord de la mer Méditerranée ?",
    choices: ["Nice", "Lille", "Strasbourg", "Brest"],
    correctIndex: 0,
    explanation:
      "Nice est sur la Côte d'Azur (Méditerranée). Autres villes méditerranéennes : Marseille, Montpellier, Toulon, Perpignan.",
  },
  {
    id: "off-csp-145",
    category: "CSP",
    theme: "geographie",
    text: "Où se situe la Corse ?",
    choices: [
      "En mer Méditerranée, au sud-est de la France",
      "En mer du Nord",
      "Dans l'océan Atlantique",
      "Dans l'océan Indien",
    ],
    correctIndex: 0,
    explanation:
      "La Corse est une île française située en mer Méditerranée, au sud-est du continent et à l'ouest de l'Italie.",
  },
  {
    id: "off-csp-146",
    category: "CSP",
    theme: "geographie",
    text: "Quelle chaîne de montagnes est située entre la France et l'Italie ?",
    choices: ["Les Alpes", "Les Pyrénées", "Les Vosges", "Le Jura"],
    correctIndex: 0,
    explanation:
      "Les Alpes forment la frontière entre la France et l'Italie. Mont Blanc (4 809 m) : sommet le plus haut d'Europe occidentale.",
  },
  {
    id: "off-csp-147",
    category: "CSP",
    theme: "culture",
    text: "Qui était Molière ?",
    choices: [
      "Un grand écrivain et dramaturge français du XVIIe siècle",
      "Un peintre impressionniste",
      "Un compositeur baroque",
      "Un philosophe des Lumières",
    ],
    correctIndex: 0,
    explanation:
      "Jean-Baptiste Poquelin dit Molière (1622-1673), auteur de comédies (Le Misanthrope, Tartuffe, Le Malade imaginaire).",
  },
  {
    id: "off-csp-148",
    category: "CSP",
    theme: "culture",
    text: "Qui était Charles Baudelaire ?",
    choices: [
      "Un poète français du XIXe siècle",
      "Un peintre du XXe siècle",
      "Un homme politique",
      "Un explorateur",
    ],
    correctIndex: 0,
    explanation:
      "Baudelaire (1821-1867), poète français majeur, auteur des « Fleurs du mal » (1857).",
  },
  {
    id: "off-csp-149",
    category: "CSP",
    theme: "culture",
    text: "Qui était George Sand ?",
    choices: [
      "Une grande romancière française du XIXe siècle",
      "Une chanteuse contemporaine",
      "Une révolutionnaire",
      "Une philosophe antique",
    ],
    correctIndex: 0,
    explanation:
      "Aurore Dupin dite George Sand (1804-1876), romancière, figure du romantisme et féministe.",
  },
  {
    id: "off-csp-150",
    category: "CSP",
    theme: "culture",
    text: "Qui était Simone de Beauvoir ?",
    choices: [
      "Une philosophe et écrivaine féministe française",
      "Une cantatrice italienne",
      "Une reine de France",
      "Une scientifique",
    ],
    correctIndex: 0,
    explanation:
      "Simone de Beauvoir (1908-1986), auteure du « Deuxième Sexe » (1949), figure majeure de l'existentialisme et du féminisme.",
  },
  {
    id: "off-csp-151",
    category: "CSP",
    theme: "culture",
    text: "Qui était Albert Camus ?",
    choices: [
      "Un écrivain et philosophe français, prix Nobel de littérature",
      "Un peintre",
      "Un homme politique",
      "Un compositeur",
    ],
    correctIndex: 0,
    explanation:
      "Albert Camus (1913-1960), Prix Nobel de littérature 1957. Auteur de « L'Étranger », « La Peste », « Le Mythe de Sisyphe ».",
  },
  {
    id: "off-csp-152",
    category: "CSP",
    theme: "culture",
    text: "Qui était Paul Cézanne ?",
    choices: [
      "Un peintre français post-impressionniste",
      "Un écrivain réaliste",
      "Un sculpteur antique",
      "Un musicien classique",
    ],
    correctIndex: 0,
    explanation:
      "Cézanne (1839-1906), peintre français, précurseur du cubisme. Œuvres majeures : « Les Joueurs de cartes », la montagne Sainte-Victoire.",
  },
  {
    id: "off-csp-153",
    category: "CSP",
    theme: "culture",
    text: "Qui était Marc Chagall ?",
    choices: [
      "Un peintre français d'origine biélorusse, figure de l'École de Paris",
      "Un compositeur classique",
      "Un philosophe",
      "Un sculpteur grec",
    ],
    correctIndex: 0,
    explanation:
      "Chagall (1887-1985), peintre naturalisé français en 1937, célèbre pour le plafond de l'Opéra Garnier (1964).",
  },
  {
    id: "off-csp-154",
    category: "CSP",
    theme: "culture",
    text: "Qui était Joséphine Baker ?",
    choices: [
      "Une artiste franco-américaine, résistante, entrée au Panthéon",
      "Une reine de France",
      "Une scientifique",
      "Une actrice italienne",
    ],
    correctIndex: 0,
    explanation:
      "Joséphine Baker (1906-1975), chanteuse, danseuse, résistante. Entrée au Panthéon en 2021.",
  },
  {
    id: "off-csp-155",
    category: "CSP",
    theme: "culture",
    text: "Qui était une chanteuse française célèbre ?",
    choices: ["Édith Piaf", "Maria Callas", "Madonna", "Whitney Houston"],
    correctIndex: 0,
    explanation:
      "Édith Piaf (1915-1963), icône de la chanson française. « La Vie en rose », « Non, je ne regrette rien ».",
  },
  {
    id: "off-csp-156",
    category: "CSP",
    theme: "culture",
    text: "Qu'est-ce que le Louvre ?",
    choices: [
      "L'un des plus grands musées d'art au monde, situé à Paris",
      "Une cathédrale gothique",
      "Un palais en Allemagne",
      "Une université",
    ],
    correctIndex: 0,
    explanation:
      "Ancien palais royal devenu musée en 1793. Abrite la Joconde, la Vénus de Milo et 500 000 œuvres.",
  },
  {
    id: "off-csp-157",
    category: "CSP",
    theme: "culture",
    text: "Qui était Jean de la Fontaine ?",
    choices: [
      "Un fabuliste et poète français du XVIIe siècle",
      "Un explorateur",
      "Un roi",
      "Un peintre",
    ],
    correctIndex: 0,
    explanation:
      "La Fontaine (1621-1695), auteur des célèbres « Fables » (« Le Corbeau et le Renard », « La Cigale et la Fourmi »).",
  },
  {
    id: "off-csp-158",
    category: "CSP",
    theme: "culture",
    text: "Quel écrivain est français ?",
    choices: ["Victor Hugo", "William Shakespeare", "Goethe", "Cervantès"],
    correctIndex: 0,
    explanation:
      "Victor Hugo (1802-1885), poète, romancier, dramaturge. « Les Misérables », « Notre-Dame de Paris ».",
  },
  {
    id: "off-csp-159",
    category: "CSP",
    theme: "culture",
    text: "Dans quelle ville se trouve la tour Eiffel ?",
    choices: ["Paris", "Londres", "Rome", "Berlin"],
    correctIndex: 0,
    explanation:
      "Tour Eiffel construite par Gustave Eiffel pour l'Exposition universelle de 1889 à Paris. 330 m de haut.",
  },
  {
    id: "off-csp-160",
    category: "CSP",
    theme: "culture",
    text: "Quand célèbre-t-on Noël ?",
    choices: ["Le 25 décembre", "Le 24 novembre", "Le 1er janvier", "Le 6 janvier"],
    correctIndex: 0,
    explanation:
      "Noël est célébré le 25 décembre. Jour férié en France, fête chrétienne devenue tradition culturelle.",
  },

  // ─── §5 Vivre dans la société française (161-191, 1 dedup → 30) ─────
  {
    id: "off-csp-161",
    category: "CSP",
    theme: "culture",
    text: "Quel numéro d'urgence permet d'appeler le SAMU ?",
    choices: ["15", "17", "18", "112"],
    correctIndex: 0,
    explanation:
      "Le 15 = SAMU (urgences médicales). 17 = police, 18 = pompiers, 112 = numéro d'urgence européen.",
  },
  {
    id: "off-csp-162",
    category: "CSP",
    theme: "culture",
    text: "Quel numéro d'urgence permet d'appeler les pompiers ?",
    choices: ["18", "15", "17", "115"],
    correctIndex: 0,
    explanation:
      "Le 18 est le numéro des pompiers (incendies, accidents, secours d'urgence).",
  },
  {
    id: "off-csp-163",
    category: "CSP",
    theme: "culture",
    text: "Après avoir obtenu le permis de conduire, que faut-il faire pour pouvoir conduire sa voiture ?",
    choices: [
      "Souscrire une assurance et faire immatriculer le véhicule",
      "Rien, le permis suffit",
      "Faire une déclaration à la mairie",
      "Passer un test médical chaque année",
    ],
    correctIndex: 0,
    explanation:
      "Tout véhicule doit être immatriculé (carte grise) et assuré au minimum au tiers (responsabilité civile).",
  },
  {
    id: "off-csp-164",
    category: "CSP",
    theme: "culture",
    text: "À quelles conditions un mariage est-il reconnu juridiquement ?",
    choices: [
      "Il doit être célébré à la mairie par un officier d'état civil",
      "Il suffit qu'il soit célébré religieusement",
      "Il suffit d'un document signé entre les époux",
      "Il faut au moins 10 témoins",
    ],
    correctIndex: 0,
    explanation:
      "En France, seul le mariage civil célébré en mairie a une valeur juridique. Le mariage religieux ne peut avoir lieu qu'après le civil.",
  },
  {
    id: "off-csp-165",
    category: "CSP",
    theme: "culture",
    text: "Quand faut-il déclarer son enfant au service d'état civil de la mairie ?",
    choices: [
      "Dans les 5 jours suivant la naissance",
      "Dans le mois",
      "Dans les 3 mois",
      "À la majorité de l'enfant",
    ],
    correctIndex: 0,
    explanation:
      "La déclaration de naissance doit être faite dans les 5 jours suivant l'accouchement à la mairie du lieu de naissance.",
  },
  {
    id: "off-csp-166",
    category: "CSP",
    theme: "culture",
    text: "Le travail non déclaré est :",
    choices: [
      "Interdit et puni par la loi",
      "Toléré pour les petits travaux",
      "Légal le week-end",
      "Légal pour les étrangers",
    ],
    correctIndex: 0,
    explanation:
      "Le travail dissimulé (« au noir ») est interdit. Sanctions pour l'employeur et le salarié : amendes et prison.",
  },
  {
    id: "off-csp-167",
    category: "CSP",
    theme: "culture",
    text: "Que doit faire un employeur pour fixer un salaire ?",
    choices: [
      "Respecter le SMIC et la convention collective applicable",
      "Fixer ce qu'il veut",
      "Demander à la mairie",
      "Suivre les indications du salarié",
    ],
    correctIndex: 0,
    explanation:
      "Le salaire ne peut être inférieur au SMIC ni au minimum prévu par la convention collective de la branche.",
  },
  {
    id: "off-csp-168",
    category: "CSP",
    theme: "culture",
    text: "Qu'est-ce que le SMIC ?",
    choices: [
      "Le salaire minimum interprofessionnel de croissance",
      "Une aide au logement",
      "Un impôt sur les salaires",
      "Une assurance chômage",
    ],
    correctIndex: 0,
    explanation:
      "Salaire horaire minimum légal en dessous duquel un employeur ne peut pas rémunérer un salarié majeur.",
  },
  {
    id: "off-csp-169",
    category: "CSP",
    theme: "culture",
    text: "Quelle est la première démarche à réaliser pour chercher un emploi ?",
    choices: [
      "S'inscrire à France Travail (ex-Pôle emploi)",
      "Quitter son logement",
      "Aller à la mairie",
      "Acheter un costume",
    ],
    correctIndex: 0,
    explanation:
      "France Travail (anciennement Pôle emploi) accompagne les demandeurs d'emploi : inscription, formation, allocations.",
  },
  {
    id: "off-csp-170",
    category: "CSP",
    theme: "culture",
    text: "Quelle est la durée légale du temps de travail par semaine ?",
    choices: ["35 heures", "32 heures", "40 heures", "45 heures"],
    correctIndex: 0,
    explanation:
      "Durée légale fixée à 35 heures hebdomadaires depuis 2000. Au-delà : heures supplémentaires majorées.",
  },
  {
    id: "off-csp-171",
    category: "CSP",
    theme: "culture",
    text: "Qui est aidé par France Travail ?",
    choices: [
      "Les demandeurs d'emploi et les employeurs",
      "Les retraités uniquement",
      "Les enfants",
      "Les touristes",
    ],
    correctIndex: 0,
    explanation:
      "France Travail accompagne les chercheurs d'emploi (allocations, formation) et aide les entreprises à recruter.",
  },
  {
    id: "off-csp-172",
    category: "CSP",
    theme: "culture",
    text: "Une personne étrangère en situation régulière peut créer son entreprise :",
    choices: [
      "Oui, dans les mêmes conditions qu'un Français (selon son titre de séjour)",
      "Non, c'est interdit",
      "Uniquement dans le tourisme",
      "Uniquement avec un associé français",
    ],
    correctIndex: 0,
    explanation:
      "Les étrangers en situation régulière peuvent créer une entreprise en France, sous réserve que leur titre de séjour le permette.",
  },
  {
    id: "off-csp-173",
    category: "CSP",
    theme: "valeurs",
    text: "Une femme peut-elle créer son entreprise ?",
    choices: [
      "Oui, dans les mêmes conditions qu'un homme",
      "Non, c'est réservé aux hommes",
      "Oui, mais uniquement avec l'accord de son mari",
      "Oui, mais uniquement après 30 ans",
    ],
    correctIndex: 0,
    explanation:
      "L'égalité entre les femmes et les hommes est garantie. Aucune restriction de genre dans la création d'entreprise.",
  },
  {
    id: "off-csp-174",
    category: "CSP",
    theme: "culture",
    text: "À partir de quel âge un mineur peut-il travailler ?",
    choices: [
      "16 ans (avec dérogations pour l'apprentissage à 15 ans)",
      "12 ans",
      "14 ans",
      "18 ans",
    ],
    correctIndex: 0,
    explanation:
      "Travail autorisé à partir de 16 ans. Dérogations pour l'apprentissage dès 15 ans, ou 14-16 ans pendant les vacances.",
  },
  {
    id: "off-csp-175",
    category: "CSP",
    theme: "culture",
    text: "Auprès de quel organisme faut-il demander le remboursement des frais de santé ?",
    choices: [
      "L'Assurance Maladie (CPAM)",
      "La mairie",
      "France Travail",
      "Le ministère",
    ],
    correctIndex: 0,
    explanation:
      "La Caisse Primaire d'Assurance Maladie (CPAM) gère les remboursements de santé via la carte Vitale.",
  },
  {
    id: "off-csp-176",
    category: "CSP",
    theme: "culture",
    text: "Qu'est-ce qu'un numéro d'urgence ?",
    choices: [
      "Un numéro gratuit à appeler en cas de danger ou d'urgence",
      "Un numéro à composer pour avoir des informations",
      "Un numéro réservé aux pompiers",
      "Un numéro payant",
    ],
    correctIndex: 0,
    explanation:
      "Numéros gratuits 24h/24 : 15 (SAMU), 17 (police), 18 (pompiers), 112 (urgence européen), 114 (sourds/malentendants).",
  },
  {
    id: "off-csp-177",
    category: "CSP",
    theme: "culture",
    text: "Concernant l'accès aux soins, quelle proposition est correcte ?",
    choices: [
      "Toute personne résidant régulièrement en France a droit à la couverture maladie",
      "Seuls les Français peuvent se faire soigner",
      "Il faut payer chaque consultation à 100 %",
      "Les soins sont uniquement payants",
    ],
    correctIndex: 0,
    explanation:
      "L'accès aux soins est un droit. Tous les résidents légaux bénéficient de l'Assurance Maladie. Aide Médicale d'État pour les sans-papiers.",
  },
  {
    id: "off-csp-178",
    category: "CSP",
    theme: "culture",
    text: "En cas de problème de santé non urgent, à qui faut-il s'adresser en premier ?",
    choices: [
      "À son médecin traitant",
      "Aux urgences de l'hôpital",
      "Aux pompiers",
      "À la mairie",
    ],
    correctIndex: 0,
    explanation:
      "Le médecin traitant est le premier recours. Le « parcours de soins coordonnés » assure de meilleurs remboursements.",
  },
  {
    id: "off-csp-179",
    category: "CSP",
    theme: "culture",
    text: "Quel est le rôle du médecin traitant ?",
    choices: [
      "Suivre votre santé et vous orienter dans le système de soins",
      "Remplacer l'hôpital",
      "Délivrer des médicaments uniquement",
      "Faire de la chirurgie",
    ],
    correctIndex: 0,
    explanation:
      "Le médecin traitant coordonne vos soins, oriente vers les spécialistes et tient votre dossier médical.",
  },
  {
    id: "off-csp-180",
    category: "CSP",
    theme: "culture",
    text: "Dans quelles situations doit-on se rendre aux urgences de l'hôpital ?",
    choices: [
      "En cas de risque vital ou de blessure grave",
      "Pour un rhume",
      "Pour un certificat médical",
      "Pour acheter des médicaments",
    ],
    correctIndex: 0,
    explanation:
      "Les urgences sont réservées aux situations graves : malaise, accident, hémorragie, douleur intense.",
  },
  {
    id: "off-csp-181",
    category: "CSP",
    theme: "culture",
    text: "Quel est l'objectif des vaccinations obligatoires ?",
    choices: [
      "Protéger la population contre des maladies graves",
      "Faire payer les familles",
      "Tester de nouveaux médicaments",
      "Sélectionner les enfants à l'école",
    ],
    correctIndex: 0,
    explanation:
      "11 vaccins obligatoires en France pour les enfants nés depuis 2018, afin de prévenir les épidémies.",
  },
  {
    id: "off-csp-182",
    category: "CSP",
    theme: "culture",
    text: "À quoi sert la carte Vitale ?",
    choices: [
      "À justifier ses droits à l'Assurance Maladie et accélérer les remboursements",
      "À voter aux élections",
      "À conduire",
      "À ouvrir un compte bancaire",
    ],
    correctIndex: 0,
    explanation:
      "La carte Vitale est gratuite, personnelle et délivrée à partir de 16 ans. Elle facilite la prise en charge des soins.",
  },
  {
    id: "off-csp-183",
    category: "CSP",
    theme: "culture",
    text: "À quoi sert une mutuelle santé ?",
    choices: [
      "À compléter les remboursements de l'Assurance Maladie",
      "À remplacer la sécurité sociale",
      "À payer le loyer",
      "À financer les vacances",
    ],
    correctIndex: 0,
    explanation:
      "Les complémentaires santé (mutuelles) prennent en charge le reste à charge non couvert par l'Assurance Maladie.",
  },
  {
    id: "off-csp-184",
    category: "CSP",
    theme: "culture",
    text: "Jusqu'à quel âge l'école est-elle obligatoire ?",
    choices: ["Jusqu'à 16 ans", "Jusqu'à 18 ans", "Jusqu'à 14 ans", "Jusqu'à 12 ans"],
    correctIndex: 0,
    explanation:
      "Instruction obligatoire de 3 à 16 ans (depuis 2019). Formation obligatoire jusqu'à 18 ans.",
  },
  {
    id: "off-csp-185",
    category: "CSP",
    theme: "culture",
    text: "L'autorité parentale prévoit l'obligation :",
    choices: [
      "De protéger, éduquer et instruire ses enfants",
      "De donner de l'argent uniquement",
      "De choisir leur métier",
      "De les marier",
    ],
    correctIndex: 0,
    explanation:
      "L'autorité parentale est un ensemble de droits et devoirs des parents : protection, santé, éducation, instruction.",
  },
  {
    id: "off-csp-186",
    category: "CSP",
    theme: "culture",
    text: "Pour qui l'école est-elle obligatoire ?",
    choices: [
      "Pour tous les enfants de 3 à 16 ans résidant en France",
      "Pour les enfants français uniquement",
      "Pour les garçons uniquement",
      "Pour les enfants de plus de 6 ans uniquement",
    ],
    correctIndex: 0,
    explanation:
      "L'instruction est obligatoire pour tous les enfants de 3 à 16 ans, quelle que soit leur nationalité.",
  },
  {
    id: "off-csp-187",
    category: "CSP",
    theme: "culture",
    text: "Quel diplôme obtient-on à la fin du lycée ?",
    choices: ["Le baccalauréat", "Le brevet", "Le BTS", "Le CAP"],
    correctIndex: 0,
    explanation:
      "Le baccalauréat, examen national de fin de lycée. Trois voies : générale, technologique, professionnelle.",
  },
  {
    id: "off-csp-188",
    category: "CSP",
    theme: "culture",
    text: "Dans quels établissements scolaires vont les élèves après l'école élémentaire ?",
    choices: ["Au collège", "Directement au lycée", "À l'université", "À l'école maternelle"],
    correctIndex: 0,
    explanation:
      "Cycle scolaire : maternelle → élémentaire (CP-CM2) → collège (6e à 3e) → lycée (2nde à terminale).",
  },
  {
    id: "off-csp-189",
    category: "CSP",
    theme: "culture",
    text: "Un enfant inscrit à l'école :",
    choices: [
      "Doit y aller régulièrement (assiduité obligatoire)",
      "Peut y aller quand il veut",
      "Y va uniquement le lundi",
      "Peut être absent sans justification",
    ],
    correctIndex: 0,
    explanation:
      "L'assiduité est obligatoire. Les absences doivent être justifiées. Les sanctions vont jusqu'à des amendes pour les parents.",
  },
  {
    id: "off-csp-190",
    category: "CSP",
    theme: "culture",
    text: "Les enfants qui ne parlent pas français :",
    choices: [
      "Sont accueillis dans des dispositifs spécifiques (UPE2A) pour apprendre le français",
      "Ne peuvent pas être scolarisés",
      "Sont placés en classe spéciale isolée",
      "Doivent rester chez eux",
    ],
    correctIndex: 0,
    explanation:
      "Les Unités Pédagogiques pour Élèves Allophones Arrivants (UPE2A) permettent une intégration progressive avec apprentissage du français.",
  },
];
