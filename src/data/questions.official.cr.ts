import { Question } from "@/types";

/**
 * OFFICIAL_CR_QUESTIONS — 209 questions officielles publiées par le
 * Ministère de l'Intérieur pour le niveau Carte de Résident (CR).
 *
 * Source : formation-civique.interieur.gouv.fr/examen-civique/liste-officielle-des-questions-de-connaissance-cr/
 *
 * Format examen : QCM 40 questions / 45 min / seuil 80 % (32/40).
 * Niveau plus exigeant que la CSP : davantage de questions sur les libertés,
 * les institutions européennes et le fonctionnement de l'État.
 *
 * Mapping vers nos thèmes :
 *   §1 Principes et valeurs       → "valeurs" / "culture" (symboles)
 *   §2 Système institutionnel     → "institutions"
 *   §3 Droits et devoirs          → "valeurs"
 *   §4 Histoire / Géo / Culture   → "histoire" | "geographie" | "culture"
 *   §5 Vivre en société           → "culture"
 */

export const OFFICIAL_CR_QUESTIONS: Question[] = [
  // ─── §1 Principes et valeurs de la République (1-40) ─────────────────
  {
    id: "off-cr-001",
    category: "CR",
    theme: "valeurs",
    text: "Parmi les propositions suivantes, laquelle constitue une participation citoyenne ?",
    choices: [
      "S'engager dans une association",
      "Refuser de payer ses impôts",
      "Ne pas voter aux élections",
      "Ignorer les lois",
    ],
    correctIndex: 0,
    explanation:
      "La participation citoyenne inclut le vote, l'engagement associatif, le bénévolat, le syndicalisme, la participation aux débats publics.",
  },
  {
    id: "off-cr-002",
    category: "CR",
    theme: "valeurs",
    text: "Que garantit la liberté d'expression ?",
    choices: [
      "Le droit d'exprimer ses opinions, dans le respect de la loi",
      "Le droit de tout dire sans limite",
      "Le droit de mentir",
      "Le droit d'insulter autrui",
    ],
    correctIndex: 0,
    explanation:
      "Article 11 de la DDHC. La liberté d'expression a des limites : incitation à la haine, diffamation, injure, apologie du terrorisme.",
  },
  {
    id: "off-cr-003",
    category: "CR",
    theme: "valeurs",
    text: "À quoi sert un titre de séjour ?",
    choices: [
      "À autoriser un étranger à résider en France",
      "À voter aux élections",
      "À conduire une voiture",
      "À s'inscrire à l'université",
    ],
    correctIndex: 0,
    explanation:
      "Le titre de séjour autorise un ressortissant étranger non-européen à résider en France pour une durée définie.",
  },
  {
    id: "off-cr-004",
    category: "CR",
    theme: "valeurs",
    text: "La liberté de circulation permet à toute personne de :",
    choices: [
      "Se déplacer librement sur le territoire et de le quitter",
      "Conduire sans permis",
      "Entrer dans tous les bâtiments",
      "Voyager sans aucun document",
    ],
    correctIndex: 0,
    explanation:
      "La liberté d'aller et venir est un droit fondamental, sous réserve de respecter les lois (frontières, ordre public).",
  },
  {
    id: "off-cr-005",
    category: "CR",
    theme: "culture",
    text: "Sur quel site internet peut-on retrouver le symbole de la République française ?",
    choices: [
      "elysee.fr",
      "wikipedia.fr",
      "google.fr",
      "amazon.fr",
    ],
    correctIndex: 0,
    explanation:
      "Le site officiel de la Présidence (elysee.fr) présente les symboles, valeurs et institutions de la République.",
  },
  {
    id: "off-cr-006",
    category: "CR",
    theme: "culture",
    text: "Complétez ces paroles de la Marseillaise : « Aux armes […] ! Formez vos bataillons »",
    choices: ["citoyens", "soldats", "patriotes", "Français"],
    correctIndex: 0,
    explanation:
      "« Aux armes citoyens, formez vos bataillons, marchons, marchons, qu'un sang impur abreuve nos sillons. »",
  },
  {
    id: "off-cr-007",
    category: "CR",
    theme: "culture",
    text: "Complétez les paroles de la Marseillaise : « Allons enfants de la patrie […] »",
    choices: [
      "Le jour de gloire est arrivé",
      "Liberté, liberté chérie",
      "Marchons, marchons",
      "Aux armes citoyens",
    ],
    correctIndex: 0,
    explanation:
      "« Allons enfants de la Patrie, le jour de gloire est arrivé ! Contre nous de la tyrannie l'étendard sanglant est levé. »",
  },
  {
    id: "off-cr-008",
    category: "CR",
    theme: "valeurs",
    text: "En application de la liberté individuelle, quelle proposition est correcte ? Une personne peut :",
    choices: [
      "Choisir librement sa religion ou ne pas en avoir",
      "Conduire en état d'ivresse",
      "Frapper qui elle veut",
      "Voler dans les magasins",
    ],
    correctIndex: 0,
    explanation:
      "La liberté individuelle inclut la liberté de conscience, de circulation, d'association, dans les limites posées par la loi.",
  },
  {
    id: "off-cr-009",
    category: "CR",
    theme: "valeurs",
    text: "Concernant la pratique de la religion, quelle proposition est correcte ?",
    choices: [
      "Chacun est libre de pratiquer sa religion ou de ne pas en avoir",
      "Une seule religion est autorisée",
      "Toute religion est interdite",
      "L'État impose la religion",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de culte est garantie. La laïcité protège ce droit en assurant la neutralité de l'État.",
  },
  {
    id: "off-cr-010",
    category: "CR",
    theme: "valeurs",
    text: "En tant que parent, peut-on refuser que son enfant participe aux cours de sport à l'école car ils sont mixtes ?",
    choices: [
      "Non, la mixité scolaire est obligatoire",
      "Oui, sur demande écrite",
      "Oui, pour des raisons religieuses",
      "Oui, le vendredi",
    ],
    correctIndex: 0,
    explanation:
      "La mixité est un principe fondamental de l'école républicaine. Aucune dispense religieuse n'est possible.",
  },
  {
    id: "off-cr-011",
    category: "CR",
    theme: "valeurs",
    text: "Quelle est la devise de la France ?",
    choices: [
      "Liberté, Égalité, Fraternité",
      "Travail, Famille, Patrie",
      "Honneur et Patrie",
      "Paix, Amour, Justice",
    ],
    correctIndex: 0,
    explanation:
      "Devise de la République inscrite à l'article 2 de la Constitution.",
  },
  {
    id: "off-cr-012",
    category: "CR",
    theme: "valeurs",
    text: "La répudiation de sa femme est :",
    choices: [
      "Interdite en France",
      "Autorisée selon la religion",
      "Autorisée si l'épouse accepte",
      "Autorisée après 10 ans de mariage",
    ],
    correctIndex: 0,
    explanation:
      "La répudiation est interdite. Seul le divorce, prononcé par un juge, met fin au mariage en France.",
  },
  {
    id: "off-cr-013",
    category: "CR",
    theme: "valeurs",
    text: "Les impôts permettent de financer les dépenses publiques. Quelle proposition est correcte ?",
    choices: [
      "Tous les résidents (Français ou étrangers) doivent déclarer leurs revenus",
      "Seuls les Français paient des impôts",
      "Les impôts sont facultatifs",
      "Les étrangers ne paient jamais d'impôts",
    ],
    correctIndex: 0,
    explanation:
      "Toute personne fiscalement domiciliée en France doit déclarer ses revenus, quelle que soit sa nationalité.",
  },
  {
    id: "off-cr-014",
    category: "CR",
    theme: "valeurs",
    text: "Peut-on brûler publiquement un drapeau français ?",
    choices: [
      "Non, c'est un outrage interdit et sanctionné",
      "Oui, c'est la liberté d'expression",
      "Oui, le 14 juillet uniquement",
      "Oui, après autorisation",
    ],
    correctIndex: 0,
    explanation:
      "L'outrage public au drapeau ou à l'hymne est puni d'une amende (jusqu'à 7 500 €) ou d'un emprisonnement.",
  },
  {
    id: "off-cr-015",
    category: "CR",
    theme: "valeurs",
    text: "Que fait l'État pour lutter contre les discriminations ?",
    choices: [
      "Il les sanctionne et soutient les victimes (HALDE, Défenseur des droits)",
      "Rien, c'est une affaire privée",
      "Il les autorise",
      "Il les ignore",
    ],
    correctIndex: 0,
    explanation:
      "Plusieurs lois et institutions luttent contre les discriminations (origine, sexe, handicap, orientation sexuelle, religion).",
  },
  {
    id: "off-cr-016",
    category: "CR",
    theme: "culture",
    text: "Que représente Marianne ?",
    choices: [
      "L'allégorie de la République française",
      "La femme du Président",
      "Une chanteuse populaire",
      "Une héroïne de guerre",
    ],
    correctIndex: 0,
    explanation:
      "Marianne incarne la République et ses valeurs : liberté, égalité, fraternité. Bonnet phrygien sur la tête.",
  },
  {
    id: "off-cr-017",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que la liberté d'association ?",
    choices: [
      "Le droit de s'unir librement avec d'autres personnes pour défendre une cause",
      "L'obligation d'adhérer à une association",
      "Le droit de gérer son entreprise",
      "Le droit de voyager",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 1er juillet 1901 : toute personne peut créer ou rejoindre une association sans autorisation préalable.",
  },
  {
    id: "off-cr-018",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que la liberté ?",
    choices: [
      "Le droit de faire tout ce qui ne nuit pas à autrui",
      "Le droit de tout faire sans limite",
      "Le droit de ne pas travailler",
      "Le droit de ne pas voter",
    ],
    correctIndex: 0,
    explanation:
      "Article 4 de la DDHC : « La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui. »",
  },
  {
    id: "off-cr-019",
    category: "CR",
    theme: "culture",
    text: "Qu'est-ce que la Marseillaise ?",
    choices: [
      "L'hymne national de la France",
      "Une danse traditionnelle",
      "Un plat régional",
      "Une fête religieuse",
    ],
    correctIndex: 0,
    explanation:
      "Composée par Rouget de Lisle en 1792, hymne officiel depuis 1879.",
  },
  {
    id: "off-cr-020",
    category: "CR",
    theme: "culture",
    text: "Sur quel document peut-on voir Marianne ?",
    choices: [
      "Sur les pièces de monnaie en euro et les timbres",
      "Uniquement sur les billets",
      "Uniquement à la télévision",
      "Sur les passeports étrangers",
    ],
    correctIndex: 0,
    explanation:
      "Marianne figure sur les pièces de 1, 2, 5, 10, 20 et 50 centimes d'euro émises par la France, ainsi que sur les timbres.",
  },
  {
    id: "off-cr-021",
    category: "CR",
    theme: "valeurs",
    text: "Un employeur refuse d'embaucher des femmes dans son entreprise. Que dit la loi ?",
    choices: [
      "C'est une discrimination interdite et punie",
      "C'est légal selon le métier",
      "C'est légal si l'employeur le déclare",
      "C'est une décision privée",
    ],
    correctIndex: 0,
    explanation:
      "La discrimination à l'embauche en raison du sexe est punie de 3 ans de prison et 45 000 € d'amende.",
  },
  {
    id: "off-cr-022",
    category: "CR",
    theme: "valeurs",
    text: "Une des valeurs de la devise républicaine est l'égalité. Qu'est-ce que cela signifie ?",
    choices: [
      "Tous les citoyens sont égaux devant la loi",
      "Tout le monde a le même salaire",
      "Tout le monde porte les mêmes vêtements",
      "Tout le monde a le même travail",
    ],
    correctIndex: 0,
    explanation:
      "L'égalité républicaine = même traitement légal pour tous, sans distinction d'origine, de sexe, de fortune, de religion.",
  },
  {
    id: "off-cr-023",
    category: "CR",
    theme: "culture",
    text: "Quelle est la place de la langue française dans la République ?",
    choices: [
      "C'est la langue officielle inscrite dans la Constitution",
      "C'est une langue parmi d'autres",
      "Une langue régionale",
      "Aucun statut particulier",
    ],
    correctIndex: 0,
    explanation:
      "Article 2 de la Constitution depuis 1992 : « La langue de la République est le français. »",
  },
  {
    id: "off-cr-024",
    category: "CR",
    theme: "culture",
    text: "Quels sont des symboles officiels de la République française ?",
    choices: [
      "Le drapeau tricolore, La Marseillaise, Marianne et la devise",
      "Le coq, le lion et l'aigle",
      "Paris, Lyon et Marseille",
      "Le pain, le vin et le fromage",
    ],
    correctIndex: 0,
    explanation:
      "Symboles officiels : drapeau tricolore, hymne (La Marseillaise), Marianne, devise « Liberté, Égalité, Fraternité ».",
  },
  {
    id: "off-cr-025",
    category: "CR",
    theme: "valeurs",
    text: "A-t-on le droit d'insulter publiquement quelqu'un parce qu'il est différent (handicap, apparence physique, sexe…) ?",
    choices: [
      "Non, c'est interdit et sévèrement puni",
      "Oui, c'est la liberté d'expression",
      "Oui, sauf devant un juge",
      "Oui, sauf à l'école",
    ],
    correctIndex: 0,
    explanation:
      "Les injures discriminatoires sont punies par la loi (jusqu'à 1 an de prison et 45 000 € d'amende).",
  },
  {
    id: "off-cr-026",
    category: "CR",
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
      "La France est une République démocratique selon l'article 1 de la Constitution.",
  },
  {
    id: "off-cr-027",
    category: "CR",
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
      "La laïcité scolaire protège les élèves de toute pression religieuse et garantit la liberté de conscience.",
  },
  {
    id: "off-cr-028",
    category: "CR",
    theme: "valeurs",
    text: "En quelle année la loi de séparation des Églises et de l'État a-t-elle été votée ?",
    choices: ["1905", "1789", "1958", "1881"],
    correctIndex: 0,
    explanation:
      "Loi du 9 décembre 1905 — fondement de la laïcité française.",
  },
  {
    id: "off-cr-029",
    category: "CR",
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
      "La liberté de conscience inclut le droit de ne pas croire (athéisme, agnosticisme).",
  },
  {
    id: "off-cr-030",
    category: "CR",
    theme: "valeurs",
    text: "Quel droit est garanti par la laïcité ?",
    choices: [
      "La liberté de conscience",
      "Le droit de propriété",
      "Le droit au logement",
      "Le droit de grève",
    ],
    correctIndex: 0,
    explanation:
      "La laïcité garantit la liberté de croire, de ne pas croire ou de changer de religion.",
  },
  {
    id: "off-cr-031",
    category: "CR",
    theme: "valeurs",
    text: "À l'école publique, qui peut porter des signes religieux très visibles ?",
    choices: [
      "Personne, c'est interdit (loi de 2004)",
      "Les enseignants uniquement",
      "Les parents en visite",
      "Tout le monde",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 15 mars 2004 : interdiction des signes religieux ostensibles à l'école publique pour les élèves et les agents.",
  },
  {
    id: "off-cr-032",
    category: "CR",
    theme: "valeurs",
    text: "Selon le principe de laïcité, que signifie la neutralité de l'État ?",
    choices: [
      "L'État ne favorise et ne reconnaît aucune religion",
      "L'État impose une religion",
      "L'État interdit toutes les religions",
      "L'État finance toutes les religions",
    ],
    correctIndex: 0,
    explanation:
      "Article 2 de la loi de 1905 : « La République ne reconnaît, ne salarie, ni ne subventionne aucun culte. »",
  },
  {
    id: "off-cr-033",
    category: "CR",
    theme: "valeurs",
    text: "Que peut faire un usager du service public dans une mairie ?",
    choices: [
      "Manifester ses convictions, sans porter atteinte au fonctionnement du service",
      "Imposer ses convictions",
      "Refuser d'être servi par certains agents",
      "Demander à choisir le sexe de son interlocuteur",
    ],
    correctIndex: 0,
    explanation:
      "Les usagers ne sont pas tenus à la neutralité (contrairement aux agents). Ils ne doivent pas troubler le service.",
  },
  {
    id: "off-cr-034",
    category: "CR",
    theme: "valeurs",
    text: "Qui doit respecter le principe de neutralité religieuse dans une préfecture ?",
    choices: [
      "Les agents publics",
      "Les usagers",
      "Les visiteurs",
      "Personne",
    ],
    correctIndex: 0,
    explanation:
      "Tous les agents du service public sont tenus à la neutralité religieuse dans l'exercice de leurs fonctions.",
  },
  {
    id: "off-cr-035",
    category: "CR",
    theme: "valeurs",
    text: "La laïcité impose-t-elle aux agents publics d'être neutres vis-à-vis des usagers ?",
    choices: [
      "Oui, c'est une obligation pour tous les agents",
      "Non, ils sont libres",
      "Seulement les enseignants",
      "Seulement les policiers",
    ],
    correctIndex: 0,
    explanation:
      "L'obligation de neutralité s'impose à tous les agents publics, dans tous les services publics.",
  },
  {
    id: "off-cr-036",
    category: "CR",
    theme: "valeurs",
    text: "Que garantit le principe de laïcité ?",
    choices: [
      "La liberté de conscience et la neutralité de l'État",
      "L'interdiction de toutes les religions",
      "L'obligation de pratiquer une religion",
      "La supériorité d'une religion",
    ],
    correctIndex: 0,
    explanation:
      "La laïcité garantit la liberté de croire, ne pas croire ou changer de religion, et la neutralité de l'État.",
  },
  {
    id: "off-cr-037",
    category: "CR",
    theme: "valeurs",
    text: "A-t-on le droit de changer de religion ?",
    choices: [
      "Oui, c'est la liberté de conscience",
      "Non, c'est interdit",
      "Seulement après 30 ans",
      "Seulement avec l'accord d'un juge",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de conscience permet à toute personne de choisir, changer ou abandonner sa religion librement.",
  },
  {
    id: "off-cr-038",
    category: "CR",
    theme: "valeurs",
    text: "Que représente la laïcité ?",
    choices: [
      "Un principe fondamental de neutralité religieuse de l'État",
      "Une religion",
      "Un parti politique",
      "Une association",
    ],
    correctIndex: 0,
    explanation:
      "Loi de 1905 : la laïcité organise la séparation des religions et de l'État, garantissant la liberté de conscience.",
  },
  {
    id: "off-cr-039",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce qui est interdit par la Charte de la laïcité à l'école ?",
    choices: [
      "Le port de signes religieux ostensibles et le prosélytisme",
      "L'enseignement de l'histoire des religions",
      "La discussion sur la religion en cours d'histoire",
      "Le port d'un foulard à l'extérieur de l'école",
    ],
    correctIndex: 0,
    explanation:
      "La Charte de la laïcité à l'école (2013) rappelle l'interdiction des signes religieux ostensibles et du prosélytisme.",
  },
  {
    id: "off-cr-040",
    category: "CR",
    theme: "valeurs",
    text: "Que dit l'article 1er de la Constitution française ?",
    choices: [
      "« La France est une République indivisible, laïque, démocratique et sociale »",
      "« La France est une monarchie »",
      "« Le Président est tout-puissant »",
      "« La religion est obligatoire »",
    ],
    correctIndex: 0,
    explanation:
      "Article 1 : « La France est une République indivisible, laïque, démocratique et sociale. Elle assure l'égalité devant la loi de tous les citoyens sans distinction d'origine, de race ou de religion. »",
  },

  // ─── §2 Système institutionnel et politique (41-90) ─────────────────
  {
    id: "off-cr-041",
    category: "CR",
    theme: "institutions",
    text: "Qu'est-ce que l'État de droit ?",
    choices: [
      "Un système où tout le monde, y compris les dirigeants, est soumis à la loi",
      "Un État sans lois",
      "Un État où le roi décide de tout",
      "Un État où seuls les juges décident",
    ],
    correctIndex: 0,
    explanation:
      "L'État de droit garantit que les actions de l'État sont encadrées par la loi et le respect des libertés fondamentales.",
  },
  {
    id: "off-cr-042",
    category: "CR",
    theme: "institutions",
    text: "Le président de la République a commis un crime. Quelle proposition est correcte ?",
    choices: [
      "Il peut être jugé après destitution par le Parlement",
      "Il ne peut jamais être jugé",
      "Il est jugé immédiatement comme un citoyen ordinaire",
      "Il est gracié automatiquement",
    ],
    correctIndex: 0,
    explanation:
      "Le Président bénéficie d'une immunité pendant son mandat (sauf devant la CPI). Il peut être destitué par le Parlement réuni en Haute Cour.",
  },
  {
    id: "off-cr-043",
    category: "CR",
    theme: "institutions",
    text: "La loi est l'expression de :",
    choices: [
      "La volonté générale",
      "La volonté du Président",
      "La volonté du Premier ministre",
      "La volonté des juges",
    ],
    correctIndex: 0,
    explanation:
      "Article 6 de la DDHC : « La loi est l'expression de la volonté générale », votée par les représentants du peuple.",
  },
  {
    id: "off-cr-044",
    category: "CR",
    theme: "institutions",
    text: "Quelle est la durée du mandat du conseil municipal et du maire ?",
    choices: ["6 ans", "5 ans", "7 ans", "3 ans"],
    correctIndex: 0,
    explanation:
      "Les conseillers municipaux sont élus pour 6 ans. Le maire, élu en leur sein, exerce le même mandat.",
  },
  {
    id: "off-cr-045",
    category: "CR",
    theme: "institutions",
    text: "Que garantit l'État de droit ?",
    choices: [
      "Le respect des lois et la protection des libertés",
      "Le pouvoir absolu d'un dirigeant",
      "L'arbitraire",
      "La suppression des contre-pouvoirs",
    ],
    correctIndex: 0,
    explanation:
      "L'État de droit assure la primauté du droit, la séparation des pouvoirs et la protection des droits fondamentaux.",
  },
  {
    id: "off-cr-046",
    category: "CR",
    theme: "institutions",
    text: "Une personne peut-elle voter à la place d'une autre ?",
    choices: [
      "Non, sauf en cas de procuration prévue par la loi",
      "Oui, dans tous les cas",
      "Oui, pour un membre de sa famille",
      "Oui, si elle a une carte d'identité",
    ],
    correctIndex: 0,
    explanation:
      "Le vote par procuration est encadré : il faut un mandataire de confiance et une démarche officielle.",
  },
  {
    id: "off-cr-047",
    category: "CR",
    theme: "institutions",
    text: "Est-ce que le vote est obligatoire ?",
    choices: [
      "Non, le vote est un droit, pas une obligation",
      "Oui, c'est obligatoire",
      "Oui, sauf le 1er tour",
      "Oui, sous peine d'amende",
    ],
    correctIndex: 0,
    explanation:
      "En France, le vote est un droit civique mais n'est pas obligatoire (sauf pour les sénateurs grands électeurs).",
  },
  {
    id: "off-cr-048",
    category: "CR",
    theme: "institutions",
    text: "À la fin de son mandat, le président de la République peut-il décider de rester au pouvoir ?",
    choices: [
      "Non, il doit organiser une nouvelle élection",
      "Oui, s'il le souhaite",
      "Oui, en demandant au Sénat",
      "Oui, en cas d'urgence",
    ],
    correctIndex: 0,
    explanation:
      "Le mandat est strictement encadré (5 ans, renouvelable une fois). Aucun dépassement n'est légal.",
  },
  {
    id: "off-cr-049",
    category: "CR",
    theme: "institutions",
    text: "Qui dirige l'action du Gouvernement ?",
    choices: [
      "Le Premier ministre",
      "Le Président du Sénat",
      "Le ministre de l'Intérieur",
      "Le Président de l'Assemblée",
    ],
    correctIndex: 0,
    explanation:
      "Article 21 : « Le Premier ministre dirige l'action du Gouvernement. »",
  },
  {
    id: "off-cr-050",
    category: "CR",
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
      "Article 8 : le Premier ministre est nommé par le Président de la République.",
  },
  {
    id: "off-cr-051",
    category: "CR",
    theme: "institutions",
    text: "Quelle est l'organisation administrative de la France ?",
    choices: [
      "Communes, départements, régions, État",
      "Uniquement l'État",
      "Uniquement les régions",
      "Communes uniquement",
    ],
    correctIndex: 0,
    explanation:
      "La France est organisée en plusieurs niveaux : 35 000 communes, 101 départements, 18 régions, l'État central.",
  },
  {
    id: "off-cr-052",
    category: "CR",
    theme: "institutions",
    text: "Qu'est-ce que le pouvoir législatif ? Le pouvoir :",
    choices: [
      "De voter les lois",
      "D'appliquer les lois",
      "De juger les criminels",
      "De diriger l'armée",
    ],
    correctIndex: 0,
    explanation:
      "Le pouvoir législatif vote les lois. Il est exercé par le Parlement (Assemblée nationale + Sénat).",
  },
  {
    id: "off-cr-053",
    category: "CR",
    theme: "institutions",
    text: "Pourquoi séparer les trois pouvoirs dans une démocratie ?",
    choices: [
      "Pour éviter qu'une seule personne ou institution ait tous les pouvoirs",
      "Pour ralentir les décisions",
      "Pour rendre les décisions plus chères",
      "Pour favoriser le Président",
    ],
    correctIndex: 0,
    explanation:
      "La séparation des pouvoirs (Montesquieu) protège les libertés en évitant la concentration des pouvoirs.",
  },
  {
    id: "off-cr-054",
    category: "CR",
    theme: "institutions",
    text: "Qui sanctionne l'auteur d'un vol ?",
    choices: ["Un juge", "Le maire", "Le préfet", "Un député"],
    correctIndex: 0,
    explanation:
      "Seul un juge peut prononcer une sanction pénale. La justice est rendue au nom du peuple français.",
  },
  {
    id: "off-cr-055",
    category: "CR",
    theme: "institutions",
    text: "Quel est le rôle du gouvernement ?",
    choices: [
      "Conduire la politique de la Nation et appliquer les lois",
      "Voter les lois",
      "Juger les criminels",
      "Élire le Président",
    ],
    correctIndex: 0,
    explanation:
      "Article 20 : « Le Gouvernement détermine et conduit la politique de la Nation. »",
  },
  {
    id: "off-cr-056",
    category: "CR",
    theme: "valeurs",
    text: "Que se passe-t-il si un ministre ne respecte pas la loi ?",
    choices: [
      "Il est jugé par la Cour de justice de la République",
      "Rien, il a une immunité totale",
      "Il est seulement renvoyé",
      "Il est gracié automatiquement",
    ],
    correctIndex: 0,
    explanation:
      "La Cour de justice de la République juge les actes commis par les ministres dans l'exercice de leurs fonctions.",
  },
  {
    id: "off-cr-057",
    category: "CR",
    theme: "institutions",
    text: "Combien de députés composent l'Assemblée nationale ?",
    choices: ["577", "348", "1000", "200"],
    correctIndex: 0,
    explanation:
      "577 députés élus au suffrage universel direct pour 5 ans.",
  },
  {
    id: "off-cr-058",
    category: "CR",
    theme: "institutions",
    text: "Qui peut voter aux élections en France ?",
    choices: [
      "Les citoyens français majeurs (et les Européens aux municipales/européennes)",
      "Toutes les personnes vivant en France",
      "Seulement les hommes",
      "Seulement les retraités",
    ],
    correctIndex: 0,
    explanation:
      "Tout citoyen français majeur jouissant de ses droits civiques. Les ressortissants UE peuvent voter aux européennes et municipales.",
  },
  {
    id: "off-cr-059",
    category: "CR",
    theme: "institutions",
    text: "Pour combien de temps sont élus les sénateurs ?",
    choices: ["6 ans", "5 ans", "9 ans", "4 ans"],
    correctIndex: 0,
    explanation:
      "Mandat de 6 ans, renouvelable. Le Sénat est renouvelé par moitié tous les 3 ans.",
  },
  {
    id: "off-cr-060",
    category: "CR",
    theme: "institutions",
    text: "La séparation des pouvoirs est un principe fondamental. Quels sont les trois pouvoirs concernés ?",
    choices: [
      "Exécutif, législatif, judiciaire",
      "État, Régions, Communes",
      "Président, Premier ministre, ministres",
      "Police, Justice, Armée",
    ],
    correctIndex: 0,
    explanation:
      "Théorie de Montesquieu : exécutif (gouverner), législatif (faire les lois), judiciaire (juger).",
  },
  {
    id: "off-cr-061",
    category: "CR",
    theme: "institutions",
    text: "Est-ce que le président de la République a tous les pouvoirs ?",
    choices: [
      "Non, ses pouvoirs sont définis par la Constitution",
      "Oui, tous les pouvoirs",
      "Oui, sauf en temps de paix",
      "Oui, sauf le pouvoir de juger",
    ],
    correctIndex: 0,
    explanation:
      "Le Président est encadré par la Constitution et soumis à la séparation des pouvoirs.",
  },
  {
    id: "off-cr-062",
    category: "CR",
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
      "Le préfet est nommé par décret du Président pris en Conseil des ministres. Il représente l'État dans le département.",
  },
  {
    id: "off-cr-063",
    category: "CR",
    theme: "institutions",
    text: "Quelle condition est nécessaire pour voter aux élections ?",
    choices: [
      "Être inscrit sur les listes électorales et jouir de ses droits civiques",
      "Payer un impôt spécial",
      "Avoir un emploi",
      "Habiter Paris",
    ],
    correctIndex: 0,
    explanation:
      "Conditions : nationalité française (ou UE pour certaines élections), majorité, jouissance des droits civiques, inscription.",
  },
  {
    id: "off-cr-064",
    category: "CR",
    theme: "institutions",
    text: "Qui dirige la commune ?",
    choices: [
      "Le maire, élu par le conseil municipal",
      "Le préfet",
      "Le député local",
      "Le Premier ministre",
    ],
    correctIndex: 0,
    explanation:
      "Le maire est élu par les conseillers municipaux pour 6 ans. Il dirige les services de la commune.",
  },
  {
    id: "off-cr-065",
    category: "CR",
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
      "La Ve République, fondée en 1958, est en vigueur. Régime semi-présidentiel.",
  },
  {
    id: "off-cr-066",
    category: "CR",
    theme: "institutions",
    text: "Qu'est-ce que l'Hôtel de Matignon ?",
    choices: [
      "La résidence et le lieu de travail du Premier ministre",
      "La résidence du Président",
      "Le siège du Sénat",
      "Le siège de l'Assemblée nationale",
    ],
    correctIndex: 0,
    explanation:
      "Hôtel particulier parisien (rue de Varenne, VIIe arrondissement), résidence officielle du Premier ministre depuis 1959.",
  },
  {
    id: "off-cr-067",
    category: "CR",
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
      "Parlement bicaméral : Assemblée nationale (577 députés) + Sénat (348 sénateurs).",
  },
  {
    id: "off-cr-068",
    category: "CR",
    theme: "institutions",
    text: "Quel est le rôle du président de la République ?",
    choices: [
      "Garant de la Constitution, chef des armées, représentant de la France",
      "Voter les lois",
      "Juger les criminels",
      "Diriger les communes",
    ],
    correctIndex: 0,
    explanation:
      "Article 5 : le Président veille au respect de la Constitution et assure la continuité de l'État.",
  },
  {
    id: "off-cr-069",
    category: "CR",
    theme: "institutions",
    text: "Quel est le rôle du Premier ministre ?",
    choices: [
      "Diriger l'action du Gouvernement et conduire la politique nationale",
      "Voter les lois",
      "Juger les criminels",
      "Présider le Conseil constitutionnel",
    ],
    correctIndex: 0,
    explanation:
      "Article 21 : le Premier ministre dirige l'action du Gouvernement, est responsable de la défense nationale et exécute les lois.",
  },
  {
    id: "off-cr-070",
    category: "CR",
    theme: "institutions",
    text: "Qui est le chef du Gouvernement ?",
    choices: ["Le Premier ministre", "Le Président", "Le maire", "Le préfet"],
    correctIndex: 0,
    explanation:
      "Le Premier ministre est le chef du Gouvernement. Il coordonne l'action des ministres.",
  },
  {
    id: "off-cr-071",
    category: "CR",
    theme: "geographie",
    text: "Combien y a-t-il de régions en France ?",
    choices: ["18 (13 métropolitaines + 5 outre-mer)", "22", "13", "10"],
    correctIndex: 0,
    explanation:
      "Depuis 2016 : 13 régions métropolitaines + 5 régions d'outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte).",
  },
  {
    id: "off-cr-072",
    category: "CR",
    theme: "institutions",
    text: "Quel est le rôle du Défenseur des droits ?",
    choices: [
      "Protéger les droits des citoyens face à l'administration",
      "Voter les lois",
      "Élire le Président",
      "Diriger la police",
    ],
    correctIndex: 0,
    explanation:
      "Autorité indépendante créée en 2008. Veille au respect des droits et lutte contre les discriminations.",
  },
  {
    id: "off-cr-073",
    category: "CR",
    theme: "institutions",
    text: "Depuis quand l'euro est-il la monnaie unique ?",
    choices: [
      "1999 (compte) / 2002 (billets et pièces)",
      "1992",
      "2010",
      "1986",
    ],
    correctIndex: 0,
    explanation:
      "L'euro est introduit en compte en 1999. Les billets et pièces circulent dans la zone euro depuis le 1er janvier 2002.",
  },
  {
    id: "off-cr-074",
    category: "CR",
    theme: "institutions",
    text: "Quel est le rôle principal du département ?",
    choices: [
      "Gérer les solidarités, les collèges, les routes départementales",
      "Voter les lois",
      "Diriger l'armée",
      "Élire le Président",
    ],
    correctIndex: 0,
    explanation:
      "Conseil départemental : action sociale, RSA, collèges, routes, services d'incendie et de secours.",
  },
  {
    id: "off-cr-075",
    category: "CR",
    theme: "institutions",
    text: "Quel est le rôle principal des communes ?",
    choices: [
      "Gérer les services de proximité (état civil, écoles primaires, urbanisme)",
      "Diriger la police nationale",
      "Voter les lois nationales",
      "Élire le Président",
    ],
    correctIndex: 0,
    explanation:
      "La commune gère l'état civil, les écoles maternelles et primaires, l'urbanisme, la voirie locale.",
  },
  {
    id: "off-cr-076",
    category: "CR",
    theme: "institutions",
    text: "Combien de communes environ existe-t-il en France ?",
    choices: ["Environ 35 000", "Environ 1 000", "Environ 100 000", "Environ 500"],
    correctIndex: 0,
    explanation:
      "La France compte environ 35 000 communes — l'un des plus grands maillages communaux d'Europe.",
  },
  {
    id: "off-cr-077",
    category: "CR",
    theme: "institutions",
    text: "Quel traité concerne la construction de l'Union européenne ?",
    choices: [
      "Le traité de Maastricht (1992)",
      "Le traité de Versailles (1919)",
      "Le traité de Rome (1648)",
      "Le traité de Yalta (1945)",
    ],
    correctIndex: 0,
    explanation:
      "Le traité de Maastricht, signé le 7 février 1992, fonde l'Union européenne (UE) et institue la citoyenneté européenne.",
  },
  {
    id: "off-cr-078",
    category: "CR",
    theme: "institutions",
    text: "Quel État a quitté l'Union européenne en 2020 ?",
    choices: ["Le Royaume-Uni", "La Suisse", "La Norvège", "L'Islande"],
    correctIndex: 0,
    explanation:
      "Brexit : sortie effective du Royaume-Uni de l'UE le 31 janvier 2020.",
  },
  {
    id: "off-cr-079",
    category: "CR",
    theme: "institutions",
    text: "Quelle est la devise de l'Union européenne ?",
    choices: [
      "« Unie dans la diversité »",
      "« Liberté, Égalité, Fraternité »",
      "« Travail et Patrie »",
      "« Paix et Justice »",
    ],
    correctIndex: 0,
    explanation:
      "Devise officielle de l'UE adoptée en 2000 : « Unie dans la diversité » (« In varietate concordia » en latin).",
  },
  {
    id: "off-cr-080",
    category: "CR",
    theme: "institutions",
    text: "Quel est l'hymne de l'Union européenne ?",
    choices: [
      "L'Ode à la joie (Beethoven)",
      "La Marseillaise",
      "L'Internationale",
      "Le Chant des partisans",
    ],
    correctIndex: 0,
    explanation:
      "L'Ode à la joie, extraite de la 9e Symphonie de Beethoven, est l'hymne européen depuis 1985.",
  },
  {
    id: "off-cr-081",
    category: "CR",
    theme: "institutions",
    text: "De quoi est composé le drapeau européen ?",
    choices: [
      "12 étoiles dorées sur fond bleu",
      "10 étoiles blanches sur fond rouge",
      "Une croix dorée sur fond bleu",
      "27 étoiles sur fond bleu",
    ],
    correctIndex: 0,
    explanation:
      "12 étoiles dorées disposées en cercle (symbole d'unité, de plénitude). Le nombre 12 ne correspond pas au nombre d'États membres.",
  },
  {
    id: "off-cr-082",
    category: "CR",
    theme: "institutions",
    text: "De quelle couleur est le drapeau européen ?",
    choices: ["Bleu", "Rouge", "Vert", "Blanc"],
    correctIndex: 0,
    explanation:
      "Drapeau bleu (azur) avec 12 étoiles dorées disposées en cercle.",
  },
  {
    id: "off-cr-083",
    category: "CR",
    theme: "institutions",
    text: "En quelle année le traité de Maastricht, qui marque la fondation de l'Union européenne, a-t-il été signé ?",
    choices: ["1992", "1957", "1986", "2002"],
    correctIndex: 0,
    explanation:
      "Signé le 7 février 1992 à Maastricht (Pays-Bas), le traité institue l'UE et la citoyenneté européenne.",
  },
  {
    id: "off-cr-084",
    category: "CR",
    theme: "institutions",
    text: "Où est le siège du Parlement européen ?",
    choices: ["Strasbourg (France)", "Bruxelles", "Paris", "Berlin"],
    correctIndex: 0,
    explanation:
      "Siège officiel à Strasbourg. Sessions à Bruxelles. Secrétariat à Luxembourg.",
  },
  {
    id: "off-cr-085",
    category: "CR",
    theme: "institutions",
    text: "Où est le siège de la Commission européenne ?",
    choices: ["Bruxelles (Belgique)", "Strasbourg", "Francfort", "Luxembourg"],
    correctIndex: 0,
    explanation:
      "La Commission européenne, organe exécutif de l'UE, siège à Bruxelles.",
  },
  {
    id: "off-cr-086",
    category: "CR",
    theme: "institutions",
    text: "Quel État n'est pas membre de l'Union européenne ?",
    choices: ["La Suisse", "La France", "L'Allemagne", "La Belgique"],
    correctIndex: 0,
    explanation:
      "La Suisse n'est pas membre de l'UE, mais a signé des accords bilatéraux. Idem pour la Norvège et l'Islande.",
  },
  {
    id: "off-cr-087",
    category: "CR",
    theme: "institutions",
    text: "Quand célèbre-t-on la journée de l'Europe ?",
    choices: ["Le 9 mai", "Le 1er mai", "Le 8 mai", "Le 14 juillet"],
    correctIndex: 0,
    explanation:
      "Le 9 mai commémore la déclaration Schuman de 1950, considérée comme l'acte fondateur de la construction européenne.",
  },
  {
    id: "off-cr-088",
    category: "CR",
    theme: "institutions",
    text: "À quelle fréquence les élections européennes sont-elles organisées ?",
    choices: ["Tous les 5 ans", "Tous les 3 ans", "Tous les 7 ans", "Tous les 4 ans"],
    correctIndex: 0,
    explanation:
      "Les députés européens sont élus pour 5 ans au suffrage universel direct.",
  },
  {
    id: "off-cr-089",
    category: "CR",
    theme: "institutions",
    text: "Quelle condition est nécessaire pour voter aux élections européennes ?",
    choices: [
      "Être citoyen d'un État membre et inscrit sur les listes",
      "Avoir 21 ans minimum",
      "Habiter à Bruxelles",
      "Parler plusieurs langues",
    ],
    correctIndex: 0,
    explanation:
      "Tout citoyen UE majeur, inscrit sur les listes électorales du pays de résidence, peut voter aux européennes.",
  },
  {
    id: "off-cr-090",
    category: "CR",
    theme: "institutions",
    text: "Quel pays est un pays fondateur de l'Union européenne ?",
    choices: ["L'Allemagne", "La Pologne", "La Grèce", "L'Espagne"],
    correctIndex: 0,
    explanation:
      "Six fondateurs en 1957 (CEE, traité de Rome) : Allemagne, France, Italie, Belgique, Pays-Bas, Luxembourg.",
  },

  // ─── §3 Droits et devoirs (91-128) ──────────────────────────────────
  {
    id: "off-cr-091",
    category: "CR",
    theme: "valeurs",
    text: "À quelle liberté la PMA fait-elle référence ?",
    choices: [
      "À la liberté individuelle (procréation médicalement assistée)",
      "À la liberté de circulation",
      "À la liberté d'expression",
      "À la liberté d'association",
    ],
    correctIndex: 0,
    explanation:
      "PMA = procréation médicalement assistée. Loi de bioéthique de 2021 : ouverte aux couples de femmes et aux femmes seules.",
  },
  {
    id: "off-cr-092",
    category: "CR",
    theme: "valeurs",
    text: "Au nom de quoi l'État justifie-t-il la restriction des droits ?",
    choices: [
      "L'ordre public et la protection des droits d'autrui",
      "Le caprice du Président",
      "La rentabilité économique",
      "L'arbitraire",
    ],
    correctIndex: 0,
    explanation:
      "Les libertés peuvent être limitées par la loi pour des motifs d'ordre public, sécurité, santé, droits d'autrui.",
  },
  {
    id: "off-cr-093",
    category: "CR",
    theme: "valeurs",
    text: "Concernant le droit de se marier, quelle proposition est correcte ?",
    choices: [
      "Le mariage est ouvert à tous les couples (même sexe ou non) majeurs et consentants",
      "Réservé aux couples de sexe différent",
      "Réservé aux Français",
      "Possible dès 12 ans",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 17 mai 2013 : le mariage est ouvert aux couples de même sexe. Conditions : majorité, consentement, monogamie.",
  },
  {
    id: "off-cr-094",
    category: "CR",
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
      "Le divorce est légal depuis 1884. Plusieurs procédures : consentement mutuel, faute, altération définitive du lien conjugal.",
  },
  {
    id: "off-cr-095",
    category: "CR",
    theme: "valeurs",
    text: "La peine de mort est :",
    choices: [
      "Abolie en France depuis 1981",
      "Encore appliquée pour les crimes graves",
      "Suspendue temporairement",
      "Réservée aux mineurs",
    ],
    correctIndex: 0,
    explanation:
      "Peine de mort abolie le 9 octobre 1981 sous François Mitterrand, à l'initiative de Robert Badinter.",
  },
  {
    id: "off-cr-096",
    category: "CR",
    theme: "valeurs",
    text: "Laquelle de ces citations est inscrite dans la Déclaration des Droits de l'Homme et du Citoyen de 1789 ?",
    choices: [
      "« Les hommes naissent et demeurent libres et égaux en droits »",
      "« Travailler plus pour gagner plus »",
      "« La famille est sacrée »",
      "« Le Roi est tout-puissant »",
    ],
    correctIndex: 0,
    explanation:
      "Article 1 de la DDHC : « Les hommes naissent et demeurent libres et égaux en droits. »",
  },
  {
    id: "off-cr-097",
    category: "CR",
    theme: "valeurs",
    text: "Le recours à l'avortement est-il autorisé ?",
    choices: [
      "Oui, c'est un droit garanti par la loi (depuis 1975)",
      "Non, c'est interdit",
      "Seulement avec l'accord du mari",
      "Seulement après 30 ans",
    ],
    correctIndex: 0,
    explanation:
      "IVG légale depuis la loi Veil (1975). La liberté d'avorter est inscrite dans la Constitution depuis le 8 mars 2024.",
  },
  {
    id: "off-cr-098",
    category: "CR",
    theme: "valeurs",
    text: "Que contient la Constitution ?",
    choices: [
      "Les règles fondamentales de fonctionnement de l'État et les droits fondamentaux",
      "Les recettes de cuisine traditionnelle",
      "Les codes de la route",
      "Les tarifs des services publics",
    ],
    correctIndex: 0,
    explanation:
      "La Constitution organise l'État, sépare les pouvoirs, garantit les droits fondamentaux (préambule + DDHC + Charte de l'environnement).",
  },
  {
    id: "off-cr-099",
    category: "CR",
    theme: "valeurs",
    text: "Que garantit la liberté de la presse ?",
    choices: [
      "Le droit pour les journalistes d'informer librement",
      "Le droit de tout dire sans vérification",
      "L'obligation de publier ce que demande l'État",
      "Le contrôle gouvernemental des médias",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 29 juillet 1881. La presse est libre dans le respect des limites légales (diffamation, injure, vie privée).",
  },
  {
    id: "off-cr-100",
    category: "CR",
    theme: "valeurs",
    text: "Que prévoit la Charte de l'environnement ?",
    choices: [
      "Le droit à un environnement sain et le devoir de le préserver",
      "L'obligation de produire plus",
      "L'interdiction des parcs naturels",
      "La privatisation des forêts",
    ],
    correctIndex: 0,
    explanation:
      "Charte de l'environnement (2004) intégrée à la Constitution. Reconnaît le droit à un environnement équilibré.",
  },
  {
    id: "off-cr-101",
    category: "CR",
    theme: "valeurs",
    text: "Que signifie la dignité humaine ?",
    choices: [
      "Le respect dû à toute personne en raison de sa qualité d'être humain",
      "Le statut social",
      "La fortune accumulée",
      "Le titre nobiliaire",
    ],
    correctIndex: 0,
    explanation:
      "Principe fondamental garanti par la Constitution. Toute personne doit être traitée avec respect, sans discrimination.",
  },
  {
    id: "off-cr-102",
    category: "CR",
    theme: "valeurs",
    text: "Que signifie le droit de manifester ?",
    choices: [
      "Le droit de se rassembler pour exprimer ses idées",
      "Le droit d'occuper les bâtiments publics",
      "Le droit de bloquer les routes sans accord",
      "Le droit de violer la loi",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de manifester découle de la liberté d'expression et de réunion. Encadrée : déclaration préalable nécessaire.",
  },
  {
    id: "off-cr-103",
    category: "CR",
    theme: "valeurs",
    text: "Que signifie PMA ?",
    choices: [
      "Procréation médicalement assistée",
      "Programme militaire actif",
      "Plan municipal d'aménagement",
      "Police municipale d'agglomération",
    ],
    correctIndex: 0,
    explanation:
      "PMA : ensemble de techniques médicales (FIV, insémination) permettant la procréation. Loi bioéthique 2021.",
  },
  {
    id: "off-cr-104",
    category: "CR",
    theme: "valeurs",
    text: "Quel texte est le plus difficile à modifier ?",
    choices: [
      "La Constitution",
      "Une loi ordinaire",
      "Un décret",
      "Un règlement intérieur",
    ],
    correctIndex: 0,
    explanation:
      "La révision constitutionnelle nécessite un vote en termes identiques par les deux chambres + référendum ou Congrès aux 3/5e.",
  },
  {
    id: "off-cr-105",
    category: "CR",
    theme: "valeurs",
    text: "Quelle liberté permet à une personne de croire en la religion de son choix ?",
    choices: [
      "La liberté de conscience",
      "La liberté de circulation",
      "La liberté de la presse",
      "La liberté du travail",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de conscience inclut la liberté de croire, de ne pas croire et de changer de religion.",
  },
  {
    id: "off-cr-106",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que le droit de grève ?",
    choices: [
      "Le droit pour les salariés de cesser collectivement le travail pour défendre leurs revendications",
      "Le droit de ne pas travailler quand on veut",
      "Une vacance supplémentaire",
      "Une autorisation patronale",
    ],
    correctIndex: 0,
    explanation:
      "Garanti par le préambule de la Constitution de 1946. Droit collectif d'arrêt concerté du travail pour des revendications professionnelles.",
  },
  {
    id: "off-cr-107",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que la Constitution ?",
    choices: [
      "Le texte fondamental qui organise l'État",
      "Une loi ordinaire",
      "Un programme politique",
      "Une charte associative",
    ],
    correctIndex: 0,
    explanation:
      "La Constitution est la loi suprême : organise les pouvoirs publics, garantit les droits fondamentaux. Actuelle : 4 octobre 1958.",
  },
  {
    id: "off-cr-108",
    category: "CR",
    theme: "valeurs",
    text: "Qui peut demander à avorter ?",
    choices: [
      "Toute femme qui le souhaite, dans les délais légaux",
      "Uniquement les femmes mariées",
      "Uniquement les Françaises",
      "Uniquement après accord du conjoint",
    ],
    correctIndex: 0,
    explanation:
      "Toute femme majeure ou mineure peut demander une IVG dans les 14 semaines de grossesse (depuis 2022).",
  },
  {
    id: "off-cr-109",
    category: "CR",
    theme: "valeurs",
    text: "Une femme majeure de nationalité française a-t-elle le droit de voter aux élections ?",
    choices: [
      "Oui, depuis 1944",
      "Non",
      "Uniquement aux municipales",
      "Seulement avec l'accord de son mari",
    ],
    correctIndex: 0,
    explanation:
      "Droit de vote des femmes accordé par ordonnance du 21 avril 1944. Premières votes en 1945 (élections municipales).",
  },
  {
    id: "off-cr-110",
    category: "CR",
    theme: "valeurs",
    text: "Concernant l'utilisation des réseaux sociaux, quelle proposition est correcte ?",
    choices: [
      "On y exerce sa liberté d'expression dans le respect des lois (haine, diffamation)",
      "Tout est permis sur Internet",
      "Aucune loi ne s'y applique",
      "On peut publier des images sans accord",
    ],
    correctIndex: 0,
    explanation:
      "La loi française s'applique aussi sur Internet. Cyberharcèlement, injures, diffamation et apologie de la haine sont punis.",
  },
  {
    id: "off-cr-111",
    category: "CR",
    theme: "culture",
    text: "Jeter un mégot par terre est :",
    choices: [
      "Interdit et passible d'une amende",
      "Autorisé partout",
      "Toléré dans les villes",
      "Légal après 21h",
    ],
    correctIndex: 0,
    explanation:
      "Le dépôt sauvage de déchets est une contravention de 4e classe. Amende forfaitaire de 135 €.",
  },
  {
    id: "off-cr-112",
    category: "CR",
    theme: "valeurs",
    text: "L'État peut-il limiter les droits et libertés ?",
    choices: [
      "Oui, dans certains cas définis par la loi (ordre public, droits d'autrui)",
      "Non, jamais",
      "Oui, sans aucun encadrement",
      "Uniquement les députés",
    ],
    correctIndex: 0,
    explanation:
      "Les libertés peuvent être limitées par la loi (et non par décret) pour des motifs précis. Le Conseil constitutionnel veille à l'équilibre.",
  },
  {
    id: "off-cr-113",
    category: "CR",
    theme: "culture",
    text: "Parmi ces actions, laquelle permet d'adopter une attitude respectueuse de l'environnement ?",
    choices: [
      "Trier ses déchets",
      "Brûler ses déchets dans son jardin",
      "Jeter ses déchets dans la rue",
      "Utiliser plus de plastique",
    ],
    correctIndex: 0,
    explanation:
      "Le tri sélectif, la réduction des déchets, l'économie d'énergie sont des gestes respectueux de l'environnement.",
  },
  {
    id: "off-cr-114",
    category: "CR",
    theme: "valeurs",
    text: "Quelle proposition constitue une obligation ?",
    choices: [
      "Payer ses impôts",
      "Adhérer à un parti politique",
      "Aller à la messe le dimanche",
      "S'inscrire à une association",
    ],
    correctIndex: 0,
    explanation:
      "Le paiement des impôts est une obligation légale pour tous les contribuables (article 13 DDHC).",
  },
  {
    id: "off-cr-115",
    category: "CR",
    theme: "valeurs",
    text: "Pour quel motif peut-on limiter la liberté d'expression ?",
    choices: [
      "Incitation à la haine, diffamation, atteinte à la vie privée, apologie du terrorisme",
      "Pour faire taire un opposant politique",
      "Pour interdire une religion",
      "Pour favoriser un parti politique",
    ],
    correctIndex: 0,
    explanation:
      "Les limites sont strictement définies par la loi pour protéger l'ordre public et les droits d'autrui.",
  },
  {
    id: "off-cr-116",
    category: "CR",
    theme: "culture",
    text: "Pourquoi doit-on trier ses déchets ?",
    choices: [
      "Pour faciliter le recyclage et protéger l'environnement",
      "Pour gagner de l'argent",
      "Parce que c'est joli",
      "Parce que la mairie l'achète",
    ],
    correctIndex: 0,
    explanation:
      "Le tri permet de recycler les matériaux (papier, verre, plastique, métal), de réduire les déchets enfouis et l'empreinte carbone.",
  },
  {
    id: "off-cr-117",
    category: "CR",
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
    id: "off-cr-118",
    category: "CR",
    theme: "valeurs",
    text: "Que doit-on faire face aux ordres des policiers ou gendarmes ?",
    choices: [
      "Les respecter, sauf s'ils sont manifestement illégaux",
      "Les ignorer",
      "Les contester sur place avec violence",
      "Fuir systématiquement",
    ],
    correctIndex: 0,
    explanation:
      "Le refus d'obtempérer est un délit. Toute contestation doit passer par les voies légales (plainte, recours).",
  },
  {
    id: "off-cr-119",
    category: "CR",
    theme: "institutions",
    text: "Quel est le rôle de la police ?",
    choices: [
      "Faire respecter la loi et assurer la sécurité publique",
      "Voter les lois",
      "Diriger les écoles",
      "Décider des impôts",
    ],
    correctIndex: 0,
    explanation:
      "La police nationale fait respecter la loi, lutte contre la délinquance et protège les citoyens, surtout en zone urbaine.",
  },
  {
    id: "off-cr-120",
    category: "CR",
    theme: "valeurs",
    text: "Quel est un exemple d'assistance à personne en danger ?",
    choices: [
      "Appeler les secours (15, 17, 18, 112) en cas d'accident",
      "Filmer la scène",
      "Continuer son chemin",
      "Prévenir uniquement la famille",
    ],
    correctIndex: 0,
    explanation:
      "Le défaut d'assistance à personne en danger est puni jusqu'à 5 ans de prison et 75 000 € d'amende (article 223-6 Code pénal).",
  },
  {
    id: "off-cr-121",
    category: "CR",
    theme: "valeurs",
    text: "Quel exemple illustre une limitation de liberté pour protéger l'intérêt général ?",
    choices: [
      "L'obligation du port de la ceinture en voiture",
      "L'interdiction de se promener",
      "L'obligation de croire en une religion",
      "L'interdiction de voter",
    ],
    correctIndex: 0,
    explanation:
      "Limitations courantes pour la sécurité ou la santé publique : ceinture, casque, vaccinations obligatoires, code de la route.",
  },
  {
    id: "off-cr-122",
    category: "CR",
    theme: "valeurs",
    text: "Quelle est l'attitude à avoir lorsqu'on est témoin de violences ?",
    choices: [
      "Appeler les secours et tenter de protéger la victime sans se mettre en danger",
      "Filmer pour publier sur les réseaux",
      "Continuer son chemin",
      "Ne rien faire",
    ],
    correctIndex: 0,
    explanation:
      "Témoigner et appeler les secours sont des devoirs civiques. Le défaut d'assistance est sanctionné par la loi.",
  },
  {
    id: "off-cr-123",
    category: "CR",
    theme: "valeurs",
    text: "Quelle est l'infraction la plus grave ?",
    choices: ["Le crime", "Le délit", "La contravention", "L'infraction routière"],
    correctIndex: 0,
    explanation:
      "Hiérarchie des infractions : contravention (la moins grave), délit, crime (la plus grave, jugé en cour d'assises).",
  },
  {
    id: "off-cr-124",
    category: "CR",
    theme: "valeurs",
    text: "Quelle obligation concerne toutes les personnes résidant en France quelle que soit leur nationalité ?",
    choices: [
      "Respecter la loi française",
      "Voter aux élections",
      "Faire le service militaire",
      "Apprendre toutes les langues régionales",
    ],
    correctIndex: 0,
    explanation:
      "La loi française s'applique à toute personne sur le territoire (citoyens, résidents étrangers, touristes).",
  },
  {
    id: "off-cr-125",
    category: "CR",
    theme: "valeurs",
    text: "Quelle proposition représente un exemple de crime ?",
    choices: [
      "Un meurtre",
      "Un excès de vitesse",
      "Un vol simple",
      "Un défaut d'assurance",
    ],
    correctIndex: 0,
    explanation:
      "Le meurtre, le viol, l'enlèvement, le terrorisme sont des crimes jugés en cour d'assises (peines > 10 ans).",
  },
  {
    id: "off-cr-126",
    category: "CR",
    theme: "valeurs",
    text: "Quelle proposition représente un exemple de délit ?",
    choices: ["Un vol", "Un meurtre", "Un excès de vitesse simple", "Un divorce"],
    correctIndex: 0,
    explanation:
      "Vol, escroquerie, conduite sans permis, violences légères sont des délits jugés en tribunal correctionnel.",
  },
  {
    id: "off-cr-127",
    category: "CR",
    theme: "institutions",
    text: "Qui veille au maintien de l'ordre public ?",
    choices: [
      "La police et la gendarmerie",
      "Les députés",
      "Les juges uniquement",
      "Les associations",
    ],
    correctIndex: 0,
    explanation:
      "Police nationale (zone urbaine) et gendarmerie (zone rurale) assurent le maintien de l'ordre, sous l'autorité du préfet.",
  },
  {
    id: "off-cr-128",
    category: "CR",
    theme: "culture",
    text: "S'agissant des déchets, quelle proposition est correcte ?",
    choices: [
      "Il faut les trier et les déposer aux endroits prévus",
      "On peut les jeter n'importe où",
      "Ils peuvent être brûlés au jardin",
      "Aucune règle ne s'applique",
    ],
    correctIndex: 0,
    explanation:
      "Tri sélectif obligatoire. Les encombrants vont en déchetterie. Le brûlage à l'air libre est interdit.",
  },

  // ─── §4 Histoire, géographie et culture (129-177) ────────────────────
  {
    id: "off-cr-129",
    category: "CR",
    theme: "histoire",
    text: "Quel était le surnom de Louis XIV ?",
    choices: ["Le Roi-Soleil", "Le Bien-Aimé", "Le Conquérant", "Le Sage"],
    correctIndex: 0,
    explanation:
      "Louis XIV (1638-1715), surnommé le Roi-Soleil. Règne le plus long de l'histoire de France (72 ans).",
  },
  {
    id: "off-cr-130",
    category: "CR",
    theme: "histoire",
    text: "Quel roi de France a été exécuté pendant la Révolution française ?",
    choices: ["Louis XVI", "Louis XIV", "Louis XV", "Henri IV"],
    correctIndex: 0,
    explanation:
      "Louis XVI a été guillotiné le 21 janvier 1793 sur la place de la Révolution (actuelle place de la Concorde).",
  },
  {
    id: "off-cr-131",
    category: "CR",
    theme: "histoire",
    text: "En quelle année Napoléon Ier est-il devenu empereur ?",
    choices: ["1804", "1789", "1815", "1799"],
    correctIndex: 0,
    explanation:
      "Sacré empereur le 2 décembre 1804 à Notre-Dame de Paris par le pape Pie VII.",
  },
  {
    id: "off-cr-132",
    category: "CR",
    theme: "histoire",
    text: "Lequel de ces personnages a un lien avec la République française ?",
    choices: [
      "Charles de Gaulle",
      "Louis XIV",
      "Napoléon Ier",
      "Charlemagne",
    ],
    correctIndex: 0,
    explanation:
      "Charles de Gaulle (1890-1970), fondateur de la Ve République en 1958, premier président élu sous ce régime.",
  },
  {
    id: "off-cr-133",
    category: "CR",
    theme: "histoire",
    text: "De quand date l'appel à la résistance du général de Gaulle ?",
    choices: [
      "Le 18 juin 1940",
      "Le 14 juillet 1789",
      "Le 8 mai 1945",
      "Le 11 novembre 1918",
    ],
    correctIndex: 0,
    explanation:
      "Appel du 18 juin 1940, lancé depuis Londres sur les ondes de la BBC. Acte fondateur de la France libre.",
  },
  {
    id: "off-cr-134",
    category: "CR",
    theme: "histoire",
    text: "Pourquoi la Shoah est-elle étudiée à l'école ?",
    choices: [
      "Pour comprendre le génocide des Juifs et lutter contre l'antisémitisme",
      "Pour glorifier le nazisme",
      "Pour relativiser les crimes",
      "Pour condamner uniquement l'Allemagne",
    ],
    correctIndex: 0,
    explanation:
      "L'enseignement de la Shoah est un devoir de mémoire pour comprendre et prévenir le racisme et l'antisémitisme.",
  },
  {
    id: "off-cr-135",
    category: "CR",
    theme: "histoire",
    text: "Quel pays a été colonisé par la France ?",
    choices: ["L'Algérie", "L'Allemagne", "Le Royaume-Uni", "Le Japon"],
    correctIndex: 0,
    explanation:
      "Algérie colonisée de 1830 à 1962. La France a aussi colonisé le Maghreb, l'Afrique de l'Ouest, l'Indochine.",
  },
  {
    id: "off-cr-136",
    category: "CR",
    theme: "histoire",
    text: "Depuis quand les Français élisent-ils le président de la République au suffrage universel direct ?",
    choices: ["1962", "1958", "1944", "1981"],
    correctIndex: 0,
    explanation:
      "Référendum du 28 octobre 1962 instaurant le suffrage universel direct. Première application : 1965 (réélection de De Gaulle).",
  },
  {
    id: "off-cr-137",
    category: "CR",
    theme: "histoire",
    text: "Quelle est la première étape de la construction européenne en 1951 ?",
    choices: [
      "La CECA (Communauté Européenne du Charbon et de l'Acier)",
      "L'OTAN",
      "L'ONU",
      "Le Conseil de l'Europe",
    ],
    correctIndex: 0,
    explanation:
      "Traité de Paris (18 avril 1951) créant la CECA entre 6 pays. Première étape de la construction européenne.",
  },
  {
    id: "off-cr-138",
    category: "CR",
    theme: "histoire",
    text: "Durant le mandat de quel président la peine de mort a-t-elle été abolie ?",
    choices: [
      "François Mitterrand",
      "Charles de Gaulle",
      "Jacques Chirac",
      "Georges Pompidou",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 9 octobre 1981, sous François Mitterrand, à l'initiative du garde des Sceaux Robert Badinter.",
  },
  {
    id: "off-cr-139",
    category: "CR",
    theme: "histoire",
    text: "Quel régime politique a été mis en place pendant la Révolution française en 1792 ?",
    choices: ["La Ire République", "La monarchie absolue", "Un empire", "La IIe République"],
    correctIndex: 0,
    explanation:
      "Proclamation de la Ire République le 22 septembre 1792, après l'abolition de la monarchie.",
  },
  {
    id: "off-cr-140",
    category: "CR",
    theme: "histoire",
    text: "Qui était une figure de la Résistance française pendant la Seconde Guerre mondiale ?",
    choices: ["Jean Moulin", "Louis XIV", "Napoléon", "Voltaire"],
    correctIndex: 0,
    explanation:
      "Jean Moulin (1899-1943), unificateur de la Résistance intérieure française. Mort sous la torture.",
  },
  {
    id: "off-cr-141",
    category: "CR",
    theme: "histoire",
    text: "En 1944, qu'est-ce qui a changé pour les femmes ?",
    choices: [
      "Elles ont obtenu le droit de vote",
      "Elles ont eu le droit d'aller à l'école",
      "Elles ont été autorisées à conduire",
      "Elles ont obtenu la majorité à 21 ans",
    ],
    correctIndex: 0,
    explanation:
      "Ordonnance du 21 avril 1944 accordant le droit de vote et d'éligibilité aux femmes.",
  },
  {
    id: "off-cr-142",
    category: "CR",
    theme: "histoire",
    text: "Quelle organisation internationale a été créée en 1945 après la Seconde Guerre mondiale ?",
    choices: [
      "L'ONU (Organisation des Nations Unies)",
      "L'OTAN",
      "L'Union européenne",
      "Le Conseil de l'Europe",
    ],
    correctIndex: 0,
    explanation:
      "ONU fondée le 24 octobre 1945 à San Francisco. Vise à maintenir la paix et la sécurité internationale.",
  },
  {
    id: "off-cr-143",
    category: "CR",
    theme: "histoire",
    text: "Quelle peine a été supprimée en 1981 ?",
    choices: ["La peine de mort", "Le travail forcé", "La prison à perpétuité", "L'amende"],
    correctIndex: 0,
    explanation:
      "Abolition de la peine de mort, loi du 9 octobre 1981.",
  },
  {
    id: "off-cr-144",
    category: "CR",
    theme: "histoire",
    text: "En quelle année l'euro est-il devenu la monnaie utilisée en France ?",
    choices: ["2002", "1992", "1999", "1986"],
    correctIndex: 0,
    explanation:
      "Pièces et billets en euro circulent depuis le 1er janvier 2002. Auparavant : franc.",
  },
  {
    id: "off-cr-145",
    category: "CR",
    theme: "histoire",
    text: "En quelle année a commencé la Première Guerre mondiale ?",
    choices: ["1914", "1939", "1918", "1900"],
    correctIndex: 0,
    explanation:
      "Première Guerre mondiale : 1914-1918. Déclenchée par l'attentat de Sarajevo (28 juin 1914).",
  },
  {
    id: "off-cr-146",
    category: "CR",
    theme: "histoire",
    text: "Où a eu lieu le débarquement en 1944 ?",
    choices: ["En Normandie", "En Provence", "En Bretagne", "En Corse"],
    correctIndex: 0,
    explanation:
      "Débarquement du 6 juin 1944 (D-Day) sur les plages de Normandie. Début de la libération de la France.",
  },
  {
    id: "off-cr-147",
    category: "CR",
    theme: "histoire",
    text: "Quel continent a été le plus concerné par la décolonisation française après la Seconde Guerre mondiale ?",
    choices: ["L'Afrique", "L'Europe", "L'Amérique", "L'Océanie"],
    correctIndex: 0,
    explanation:
      "Décolonisation massive en Afrique dans les années 1950-1960 : Algérie, Maroc, Tunisie, AOF, AEF.",
  },
  {
    id: "off-cr-148",
    category: "CR",
    theme: "histoire",
    text: "Que fête-t-on le 8 mai ?",
    choices: [
      "La victoire des Alliés sur l'Allemagne nazie en 1945",
      "La fête nationale",
      "L'armistice de 1918",
      "L'abolition de l'esclavage",
    ],
    correctIndex: 0,
    explanation:
      "Le 8 mai 1945 : capitulation allemande, fin de la Seconde Guerre mondiale en Europe. Jour férié.",
  },
  {
    id: "off-cr-149",
    category: "CR",
    theme: "geographie",
    text: "Quelle mer ou océan borde la France métropolitaine ?",
    choices: [
      "L'océan Atlantique, la Manche, la mer du Nord, la mer Méditerranée",
      "Uniquement la mer Noire",
      "Uniquement la Baltique",
      "Aucun (la France est enclavée)",
    ],
    correctIndex: 0,
    explanation:
      "La France métropolitaine a quatre façades maritimes : Manche au nord, mer du Nord, Atlantique à l'ouest, Méditerranée au sud.",
  },
  {
    id: "off-cr-150",
    category: "CR",
    theme: "geographie",
    text: "Quel pays a une frontière terrestre avec la France métropolitaine ?",
    choices: ["L'Allemagne", "La Russie", "La Suède", "Le Portugal"],
    correctIndex: 0,
    explanation:
      "8 voisins terrestres : Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne, Andorre.",
  },
  {
    id: "off-cr-151",
    category: "CR",
    theme: "geographie",
    text: "Quelle ville française est un port maritime ?",
    choices: ["Marseille", "Toulouse", "Strasbourg", "Lille"],
    correctIndex: 0,
    explanation:
      "Marseille est le premier port français en tonnage. Autres grands ports : Le Havre, Dunkerque, Bordeaux, Nantes.",
  },
  {
    id: "off-cr-152",
    category: "CR",
    theme: "geographie",
    text: "Quelle mer se situe entre la France et l'Angleterre ?",
    choices: ["La Manche", "La mer du Nord", "L'Atlantique", "La Méditerranée"],
    correctIndex: 0,
    explanation:
      "La Manche sépare la France et le Royaume-Uni. Tunnel sous la Manche depuis 1994.",
  },
  {
    id: "off-cr-153",
    category: "CR",
    theme: "geographie",
    text: "Qu'est-ce que la France d'outre-mer ?",
    choices: [
      "Les territoires français hors d'Europe (Antilles, Guyane, Réunion, Mayotte, Pacifique...)",
      "Une région de Bretagne",
      "Un département du nord",
      "Une organisation diplomatique",
    ],
    correctIndex: 0,
    explanation:
      "DROM-COM : Guadeloupe, Martinique, Guyane, La Réunion, Mayotte, Saint-Pierre-et-Miquelon, Polynésie, Nouvelle-Calédonie, etc.",
  },
  {
    id: "off-cr-154",
    category: "CR",
    theme: "geographie",
    text: "Quelle chaîne de montagnes est située entre la France et l'Espagne ?",
    choices: ["Les Pyrénées", "Les Alpes", "Le Jura", "Les Vosges"],
    correctIndex: 0,
    explanation:
      "Les Pyrénées forment la frontière naturelle entre la France et l'Espagne, sur 430 km.",
  },
  {
    id: "off-cr-155",
    category: "CR",
    theme: "geographie",
    text: "Quelle île française se trouve dans l'océan Indien ?",
    choices: ["La Réunion", "La Corse", "La Guadeloupe", "Tahiti"],
    correctIndex: 0,
    explanation:
      "La Réunion est un département d'outre-mer situé dans l'océan Indien, près de Madagascar et de Maurice.",
  },
  {
    id: "off-cr-156",
    category: "CR",
    theme: "geographie",
    text: "Quelle est la population approximative de la France en 2025 ?",
    choices: [
      "Environ 68 millions",
      "Environ 30 millions",
      "Environ 100 millions",
      "Environ 45 millions",
    ],
    correctIndex: 0,
    explanation:
      "Population France en 2025 : environ 68 millions d'habitants (métropole + outre-mer).",
  },
  {
    id: "off-cr-157",
    category: "CR",
    theme: "geographie",
    text: "Quel fleuve traverse Paris ?",
    choices: ["La Seine", "La Loire", "Le Rhône", "La Garonne"],
    correctIndex: 0,
    explanation:
      "La Seine traverse Paris d'est en ouest, sur 13 km, avec 37 ponts.",
  },
  {
    id: "off-cr-158",
    category: "CR",
    theme: "geographie",
    text: "Lequel de ces pays partage des frontières terrestres avec la France ?",
    choices: ["L'Italie", "Le Portugal", "Les Pays-Bas", "La Suède"],
    correctIndex: 0,
    explanation:
      "La France est frontalière de l'Italie via les Alpes (488 km de frontière commune).",
  },
  {
    id: "off-cr-159",
    category: "CR",
    theme: "geographie",
    text: "Quel pays a une frontière avec la France métropolitaine au nord-est ?",
    choices: ["La Belgique", "L'Espagne", "L'Italie", "Le Portugal"],
    correctIndex: 0,
    explanation:
      "La Belgique est au nord-est. Frontière de 620 km. Capitale : Bruxelles.",
  },
  {
    id: "off-cr-160",
    category: "CR",
    theme: "geographie",
    text: "Où se trouvent les principales activités économiques en France ?",
    choices: [
      "Dans les grandes métropoles (Paris, Lyon, Marseille, Toulouse, etc.)",
      "Uniquement à la campagne",
      "Uniquement dans les ports",
      "Uniquement en montagne",
    ],
    correctIndex: 0,
    explanation:
      "L'activité économique se concentre dans les grandes aires urbaines, notamment l'Île-de-France (30 % du PIB national).",
  },
  {
    id: "off-cr-161",
    category: "CR",
    theme: "geographie",
    text: "Parmi ces pays, lequel attire le plus de visiteurs chaque année ?",
    choices: ["La France", "L'Allemagne", "Le Royaume-Uni", "L'Italie"],
    correctIndex: 0,
    explanation:
      "La France est la première destination touristique mondiale (≈ 90 millions de visiteurs étrangers par an).",
  },
  {
    id: "off-cr-162",
    category: "CR",
    theme: "geographie",
    text: "Où habite la majorité des Français ?",
    choices: ["En ville (zone urbaine)", "À la campagne", "En montagne", "Sur le littoral"],
    correctIndex: 0,
    explanation:
      "Plus de 80 % des Français vivent en zone urbaine (villes ou périphérie).",
  },
  {
    id: "off-cr-163",
    category: "CR",
    theme: "geographie",
    text: "Quelle région est la plus peuplée ?",
    choices: ["L'Île-de-France", "La Bretagne", "La Corse", "Les Hauts-de-France"],
    correctIndex: 0,
    explanation:
      "Île-de-France : environ 12 millions d'habitants, soit 18 % de la population française.",
  },
  {
    id: "off-cr-164",
    category: "CR",
    theme: "geographie",
    text: "Quelle ville française fait partie des 10 plus grandes métropoles du pays ?",
    choices: ["Lyon", "Lourdes", "Avignon", "Annecy"],
    correctIndex: 0,
    explanation:
      "Top métropoles : Paris, Lyon, Marseille, Toulouse, Lille, Bordeaux, Nice, Nantes, Strasbourg, Rennes.",
  },
  {
    id: "off-cr-165",
    category: "CR",
    theme: "geographie",
    text: "Lequel de ces départements de France est le plus touristique ?",
    choices: [
      "Paris (75)",
      "L'Aisne (02)",
      "La Creuse (23)",
      "La Lozère (48)",
    ],
    correctIndex: 0,
    explanation:
      "Paris (75) attire le plus grand nombre de visiteurs : monuments, musées, gastronomie.",
  },
  {
    id: "off-cr-166",
    category: "CR",
    theme: "culture",
    text: "Quand peut-on visiter gratuitement des lieux culturels en France ?",
    choices: [
      "Lors des Journées européennes du patrimoine (3e week-end de septembre)",
      "Tous les jours",
      "Le 14 juillet uniquement",
      "Jamais",
    ],
    correctIndex: 0,
    explanation:
      "Journées du patrimoine : 3e week-end de septembre. Beaucoup de musées sont aussi gratuits le 1er dimanche du mois.",
  },
  {
    id: "off-cr-167",
    category: "CR",
    theme: "culture",
    text: "Combien de personnes parlent français dans le monde ?",
    choices: [
      "Environ 320 millions",
      "Environ 100 millions",
      "Environ 1 milliard",
      "Environ 50 millions",
    ],
    correctIndex: 0,
    explanation:
      "Le français est parlé par environ 320 millions de personnes dans le monde (OIF, 2024).",
  },
  {
    id: "off-cr-168",
    category: "CR",
    theme: "culture",
    text: "Qui était Marguerite Yourcenar ?",
    choices: [
      "La première femme élue à l'Académie française",
      "Une chanteuse",
      "Une scientifique",
      "Une révolutionnaire",
    ],
    correctIndex: 0,
    explanation:
      "Marguerite Yourcenar (1903-1987), première femme élue à l'Académie française en 1980. Auteure de « Mémoires d'Hadrien ».",
  },
  {
    id: "off-cr-169",
    category: "CR",
    theme: "culture",
    text: "Quel peintre est français ?",
    choices: ["Claude Monet", "Pablo Picasso", "Vincent van Gogh", "Léonard de Vinci"],
    correctIndex: 0,
    explanation:
      "Claude Monet (1840-1926), peintre impressionniste français. « Impression, soleil levant », « Les Nymphéas ».",
  },
  {
    id: "off-cr-170",
    category: "CR",
    theme: "culture",
    text: "Quel musée est situé à Paris ?",
    choices: [
      "Le Louvre",
      "Le British Museum",
      "Le Prado",
      "Les Galeries Tretiakov",
    ],
    correctIndex: 0,
    explanation:
      "Le Louvre, ancien palais royal, est l'un des plus grands musées d'art au monde. Plus de 9 millions de visiteurs/an.",
  },
  {
    id: "off-cr-171",
    category: "CR",
    theme: "culture",
    text: "Qui était Auguste Rodin ?",
    choices: [
      "Un sculpteur français du XIXe siècle",
      "Un peintre cubiste",
      "Un compositeur classique",
      "Un philosophe",
    ],
    correctIndex: 0,
    explanation:
      "Rodin (1840-1917), sculpteur français. Œuvres célèbres : « Le Penseur », « Le Baiser », « Les Bourgeois de Calais ».",
  },
  {
    id: "off-cr-172",
    category: "CR",
    theme: "culture",
    text: "Quel est le classement de la langue française parmi les langues les plus parlées dans le monde ?",
    choices: ["5e", "1re", "10e", "20e"],
    correctIndex: 0,
    explanation:
      "Le français est la 5e langue la plus parlée au monde (locuteurs natifs + apprenants), après le mandarin, l'anglais, l'espagnol, l'hindi.",
  },
  {
    id: "off-cr-173",
    category: "CR",
    theme: "culture",
    text: "Quelle cathédrale célèbre a été en partie détruite par un incendie en 2019 ?",
    choices: [
      "Notre-Dame de Paris",
      "La cathédrale de Chartres",
      "La cathédrale de Reims",
      "La basilique de Saint-Denis",
    ],
    correctIndex: 0,
    explanation:
      "Incendie de Notre-Dame de Paris le 15 avril 2019, détruisant la flèche et la charpente. Restaurée et rouverte en décembre 2024.",
  },
  {
    id: "off-cr-174",
    category: "CR",
    theme: "culture",
    text: "Qui était une écrivaine française célèbre ?",
    choices: [
      "Simone de Beauvoir",
      "Jane Austen",
      "Virginia Woolf",
      "Agatha Christie",
    ],
    correctIndex: 0,
    explanation:
      "Simone de Beauvoir (1908-1986), philosophe et écrivaine, auteure du « Deuxième Sexe » (1949).",
  },
  {
    id: "off-cr-175",
    category: "CR",
    theme: "culture",
    text: "Qui était un célèbre musicien français ?",
    choices: ["Claude Debussy", "Mozart", "Beethoven", "Bach"],
    correctIndex: 0,
    explanation:
      "Claude Debussy (1862-1918), compositeur impressionniste français. « Clair de lune », « La Mer », « Prélude à l'après-midi d'un faune ».",
  },
  {
    id: "off-cr-176",
    category: "CR",
    theme: "culture",
    text: "Qui était Auguste Renoir ?",
    choices: [
      "Un peintre impressionniste français",
      "Un compositeur",
      "Un sculpteur antique",
      "Un explorateur",
    ],
    correctIndex: 0,
    explanation:
      "Auguste Renoir (1841-1919), peintre impressionniste. « Le Bal du moulin de la Galette », « Les Grandes Baigneuses ».",
  },
  {
    id: "off-cr-177",
    category: "CR",
    theme: "culture",
    text: "Quelle fête est française ?",
    choices: [
      "La fête de la musique (21 juin)",
      "Thanksgiving",
      "Halloween",
      "Saint-Patrick",
    ],
    correctIndex: 0,
    explanation:
      "Fête de la Musique créée en France en 1982 (Jack Lang, ministre de la Culture). Désormais célébrée dans plus de 120 pays.",
  },

  // ─── §5 Vivre dans la société française (178-209) ────────────────────
  {
    id: "off-cr-178",
    category: "CR",
    theme: "culture",
    text: "Quel mariage est reconnu par l'État ?",
    choices: [
      "Le mariage civil célébré en mairie",
      "Le mariage religieux uniquement",
      "Le mariage par contrat privé",
      "Le mariage forcé",
    ],
    correctIndex: 0,
    explanation:
      "Seul le mariage civil a une valeur juridique. Le mariage religieux ne peut avoir lieu qu'après le civil.",
  },
  {
    id: "off-cr-179",
    category: "CR",
    theme: "culture",
    text: "Auprès de quelle institution les parents peuvent-ils inscrire leur enfant à l'école publique ?",
    choices: ["La mairie", "La préfecture", "Le ministère", "Pôle emploi"],
    correctIndex: 0,
    explanation:
      "La mairie gère les inscriptions scolaires (écoles maternelles et primaires) et la carte scolaire.",
  },
  {
    id: "off-cr-180",
    category: "CR",
    theme: "culture",
    text: "En cas de divorce, qui exerce l'autorité parentale ?",
    choices: [
      "Les deux parents conjointement (sauf décision contraire du juge)",
      "Uniquement la mère",
      "Uniquement le père",
      "L'État",
    ],
    correctIndex: 0,
    explanation:
      "L'autorité parentale conjointe est la règle, même après le divorce. Le juge tranche en cas de désaccord.",
  },
  {
    id: "off-cr-181",
    category: "CR",
    theme: "culture",
    text: "Quelle aide permet aux personnes qui ont des difficultés financières d'avoir un avocat ?",
    choices: [
      "L'aide juridictionnelle",
      "Le RSA",
      "Les APL",
      "L'allocation chômage",
    ],
    correctIndex: 0,
    explanation:
      "L'aide juridictionnelle prend en charge tout ou partie des frais de justice (avocat, huissier) pour les personnes aux revenus modestes.",
  },
  {
    id: "off-cr-182",
    category: "CR",
    theme: "culture",
    text: "Où faut-il déclarer la naissance d'un enfant ?",
    choices: [
      "À la mairie du lieu de naissance, dans les 5 jours",
      "À la préfecture, dans le mois",
      "À l'hôpital uniquement",
      "Aucune déclaration n'est obligatoire",
    ],
    correctIndex: 0,
    explanation:
      "Déclaration obligatoire dans les 5 jours suivant la naissance, à la mairie du lieu de naissance.",
  },
  {
    id: "off-cr-183",
    category: "CR",
    theme: "culture",
    text: "Quelle est l'une des conditions pour passer l'examen du permis de conduire ?",
    choices: [
      "Avoir au moins 17 ans (conduite accompagnée 15 ans) et être apte médicalement",
      "Posséder une voiture",
      "Habiter Paris",
      "Avoir le baccalauréat",
    ],
    correctIndex: 0,
    explanation:
      "Permis B : 18 ans (17 en conduite accompagnée). Code de la route + examen pratique.",
  },
  {
    id: "off-cr-184",
    category: "CR",
    theme: "culture",
    text: "Un bail locatif est valide s'il est :",
    choices: [
      "Écrit, signé par les deux parties et conforme à la loi",
      "Verbal entre amis",
      "Signé uniquement par le propriétaire",
      "Sans aucun document",
    ],
    correctIndex: 0,
    explanation:
      "Le bail doit être écrit, mentionner les éléments obligatoires (loyer, durée, surface, dépôt de garantie) et signé par les deux parties.",
  },
  {
    id: "off-cr-185",
    category: "CR",
    theme: "culture",
    text: "Où peut-on déposer un lave-vaisselle cassé ?",
    choices: [
      "À la déchetterie ou via un service d'enlèvement des encombrants",
      "Sur le trottoir",
      "Dans les poubelles ordinaires",
      "Dans la rivière",
    ],
    correctIndex: 0,
    explanation:
      "Les déchets encombrants vont en déchetterie ou sont collectés sur rendez-vous. Le dépôt sauvage est puni d'amende.",
  },
  {
    id: "off-cr-186",
    category: "CR",
    theme: "culture",
    text: "Quel numéro d'urgence permet d'appeler la police ?",
    choices: ["17", "15", "18", "112"],
    correctIndex: 0,
    explanation:
      "Le 17 = police-secours/gendarmerie. 15 = SAMU, 18 = pompiers, 112 = numéro européen.",
  },
  {
    id: "off-cr-187",
    category: "CR",
    theme: "culture",
    text: "Concernant l'accès aux soins, quelle proposition est correcte ?",
    choices: [
      "Toute personne résidant régulièrement en France a droit à la couverture maladie",
      "Seuls les Français peuvent se faire soigner",
      "Il faut payer chaque consultation à 100 %",
      "Les soins sont totalement payants",
    ],
    correctIndex: 0,
    explanation:
      "L'accès aux soins est un droit. Tous les résidents légaux bénéficient de l'Assurance Maladie. AME pour les sans-papiers.",
  },
  {
    id: "off-cr-188",
    category: "CR",
    theme: "culture",
    text: "À qui est accessible la contraception ?",
    choices: [
      "À toute personne, mineure incluse, gratuitement et confidentiellement (jusqu'à 26 ans)",
      "Uniquement aux femmes mariées",
      "Uniquement après 30 ans",
      "Uniquement avec l'accord parental",
    ],
    correctIndex: 0,
    explanation:
      "Contraception gratuite jusqu'à 26 ans depuis 2022. Confidentialité garantie pour les mineurs.",
  },
  {
    id: "off-cr-189",
    category: "CR",
    theme: "culture",
    text: "Qu'est-ce que le principe de confidentialité dans le domaine de la santé ?",
    choices: [
      "Le secret médical : le professionnel de santé ne peut révéler les informations du patient",
      "L'obligation de partager toutes les données",
      "Le contrôle public des dossiers médicaux",
      "L'absence de toute règle",
    ],
    correctIndex: 0,
    explanation:
      "Le secret médical s'impose à tous les professionnels de santé. Les violations sont punies par la loi.",
  },
  {
    id: "off-cr-190",
    category: "CR",
    theme: "culture",
    text: "L'inscription à l'Assurance maladie est :",
    choices: [
      "Obligatoire pour toute personne résidant régulièrement en France",
      "Facultative",
      "Réservée aux Français",
      "Payante chaque mois sans cotisation",
    ],
    correctIndex: 0,
    explanation:
      "L'affiliation à la sécurité sociale est obligatoire. Tous les résidents légaux peuvent en bénéficier.",
  },
  {
    id: "off-cr-191",
    category: "CR",
    theme: "culture",
    text: "Qui peut demander un congé parental d'éducation ?",
    choices: [
      "Le père ou la mère, après une naissance ou une adoption",
      "Uniquement la mère",
      "Uniquement le père",
      "Aucun parent",
    ],
    correctIndex: 0,
    explanation:
      "Le congé parental est ouvert aux deux parents, après naissance ou adoption, sous condition d'ancienneté (1 an).",
  },
  {
    id: "off-cr-192",
    category: "CR",
    theme: "culture",
    text: "Quelles sont les affaires traitées par le conseil de prud'hommes ?",
    choices: [
      "Les litiges entre employeurs et salariés (contrat, licenciement, salaire)",
      "Les divorces",
      "Les crimes",
      "Les contraventions",
    ],
    correctIndex: 0,
    explanation:
      "Les prud'hommes jugent les conflits individuels du travail. Composé de juges élus (employeurs et salariés).",
  },
  {
    id: "off-cr-193",
    category: "CR",
    theme: "culture",
    text: "Travailler sans être déclaré est :",
    choices: [
      "Interdit et puni par la loi (travail dissimulé)",
      "Légal pour les petits travaux",
      "Toléré le week-end",
      "Permis pour les étrangers",
    ],
    correctIndex: 0,
    explanation:
      "Le travail au noir est puni d'amende et de prison pour l'employeur (3 ans, 45 000 €) et prive le salarié de droits sociaux.",
  },
  {
    id: "off-cr-194",
    category: "CR",
    theme: "culture",
    text: "Lorsqu'un employeur veut qu'un salarié travaille plus longtemps que la durée prévue dans le contrat de travail :",
    choices: [
      "Il doit payer des heures supplémentaires majorées",
      "Il peut imposer sans rien payer en plus",
      "Il peut supprimer les congés",
      "Il peut diminuer le salaire",
    ],
    correctIndex: 0,
    explanation:
      "Les heures supplémentaires (au-delà de 35h/semaine) sont majorées : +25 % les 8 premières, +50 % au-delà.",
  },
  {
    id: "off-cr-195",
    category: "CR",
    theme: "culture",
    text: "Quelle est la mission de France Travail ?",
    choices: [
      "Accompagner les demandeurs d'emploi et aider les entreprises à recruter",
      "Verser les retraites",
      "Gérer la sécurité sociale",
      "Délivrer les permis de conduire",
    ],
    correctIndex: 0,
    explanation:
      "France Travail (ex-Pôle emploi depuis 2024) gère l'inscription des chômeurs, les allocations, les formations et le placement.",
  },
  {
    id: "off-cr-196",
    category: "CR",
    theme: "culture",
    text: "Dans une entreprise, le droit syndical permet :",
    choices: [
      "De créer ou d'adhérer librement à un syndicat pour défendre les salariés",
      "D'imposer un syndicat unique",
      "D'interdire les associations",
      "De licencier un salarié",
    ],
    correctIndex: 0,
    explanation:
      "Liberté syndicale garantie par la Constitution. Tout salarié peut créer un syndicat ou y adhérer librement.",
  },
  {
    id: "off-cr-197",
    category: "CR",
    theme: "culture",
    text: "Dans une entreprise, le droit de grève autorise :",
    choices: [
      "L'arrêt collectif et concerté du travail pour des revendications professionnelles",
      "L'absence individuelle non motivée",
      "La destruction du matériel",
      "Le refus du dialogue",
    ],
    correctIndex: 0,
    explanation:
      "Le droit de grève est un droit constitutionnel. Doit être collectif, concerté et lié à des revendications professionnelles.",
  },
  {
    id: "off-cr-198",
    category: "CR",
    theme: "culture",
    text: "Quelles sont les conditions pour toucher les allocations chômage ?",
    choices: [
      "Avoir travaillé suffisamment et être inscrit à France Travail",
      "Ne jamais avoir travaillé",
      "Habiter à Paris",
      "Être propriétaire",
    ],
    correctIndex: 0,
    explanation:
      "Conditions principales : être involontairement privé d'emploi, avoir travaillé un minimum (6 mois sur 24), et être inscrit.",
  },
  {
    id: "off-cr-199",
    category: "CR",
    theme: "culture",
    text: "Qu'est-ce que l'école maternelle ?",
    choices: [
      "L'école pour les enfants de 3 à 6 ans, devenue obligatoire depuis 2019",
      "Une garderie privée",
      "Une école pour les adultes",
      "Une école technique",
    ],
    correctIndex: 0,
    explanation:
      "L'école maternelle accueille les enfants de 3 à 6 ans. Obligatoire depuis 2019.",
  },
  {
    id: "off-cr-200",
    category: "CR",
    theme: "culture",
    text: "Comment s'appelle le diplôme passé par les élèves à la fin du collège ?",
    choices: ["Le brevet (DNB)", "Le baccalauréat", "Le BTS", "Le CAP"],
    correctIndex: 0,
    explanation:
      "Diplôme National du Brevet (DNB), passé en fin de 3e. Premier diplôme du parcours scolaire.",
  },
  {
    id: "off-cr-201",
    category: "CR",
    theme: "culture",
    text: "Les parents d'élève ont le droit de :",
    choices: [
      "Participer à la vie scolaire et être informés des résultats de leur enfant",
      "Décider du programme scolaire",
      "Choisir les enseignants",
      "Imposer leurs convictions religieuses",
    ],
    correctIndex: 0,
    explanation:
      "Les parents sont membres de la communauté éducative, peuvent siéger au conseil d'école et être informés régulièrement.",
  },
  {
    id: "off-cr-202",
    category: "CR",
    theme: "culture",
    text: "Qui peut manger à la cantine scolaire ?",
    choices: [
      "Tous les élèves inscrits, sans discrimination",
      "Uniquement les enfants français",
      "Uniquement les boursiers",
      "Aucun élève",
    ],
    correctIndex: 0,
    explanation:
      "L'accès à la cantine est ouvert à tous les élèves inscrits. Loi Égalité et Citoyenneté (2017) interdit toute discrimination.",
  },
  {
    id: "off-cr-203",
    category: "CR",
    theme: "culture",
    text: "À quel âge commence l'instruction obligatoire des enfants ?",
    choices: ["3 ans", "6 ans", "5 ans", "4 ans"],
    correctIndex: 0,
    explanation:
      "Depuis la rentrée 2019, l'instruction est obligatoire à partir de 3 ans (auparavant 6 ans).",
  },
  {
    id: "off-cr-204",
    category: "CR",
    theme: "valeurs",
    text: "Quel est l'âge de la majorité ?",
    choices: ["18 ans", "16 ans", "21 ans", "25 ans"],
    correctIndex: 0,
    explanation:
      "Majorité civile : 18 ans (loi du 5 juillet 1974, abaissée de 21 à 18 ans). Pleine capacité juridique.",
  },
  {
    id: "off-cr-205",
    category: "CR",
    theme: "culture",
    text: "À l'école, il est interdit aux parents de :",
    choices: [
      "Imposer leurs convictions religieuses ou refuser certains enseignements",
      "Aider aux devoirs",
      "Rencontrer les enseignants",
      "Participer aux sorties scolaires",
    ],
    correctIndex: 0,
    explanation:
      "L'école publique est laïque. Les parents ne peuvent pas exiger de dispenses pour motif religieux (sport, biologie, mixité).",
  },
  {
    id: "off-cr-206",
    category: "CR",
    theme: "culture",
    text: "Quel motif d'absence est accepté par l'école ?",
    choices: [
      "Maladie attestée par certificat médical",
      "Vacances en cours d'année scolaire",
      "Mauvaise humeur",
      "Mauvais temps",
    ],
    correctIndex: 0,
    explanation:
      "Motifs valables : maladie, problème familial grave, absence du transport scolaire. Justification écrite obligatoire.",
  },
  {
    id: "off-cr-207",
    category: "CR",
    theme: "culture",
    text: "Des parents ne respectent pas l'obligation d'instruction pour leurs enfants. Quelle sanction maximale risquent-ils ?",
    choices: [
      "Jusqu'à 6 mois de prison et 7 500 € d'amende",
      "Aucune sanction",
      "Une interdiction de voter",
      "L'expulsion du territoire",
    ],
    correctIndex: 0,
    explanation:
      "Le défaut d'instruction est puni de 6 mois d'emprisonnement et 7 500 € d'amende (article 227-17-1 du Code pénal).",
  },
  {
    id: "off-cr-208",
    category: "CR",
    theme: "culture",
    text: "Quand ont lieu les vacances scolaires de Noël ?",
    choices: [
      "Fin décembre, environ deux semaines",
      "En septembre",
      "En juin",
      "En mars",
    ],
    correctIndex: 0,
    explanation:
      "Vacances de Noël : 2 semaines à cheval sur fin décembre et début janvier (commun aux trois zones).",
  },
  {
    id: "off-cr-209",
    category: "CR",
    theme: "culture",
    text: "À l'école, un enfant en situation de handicap :",
    choices: [
      "A le droit d'être scolarisé avec un accompagnement adapté (AESH, PAI, PPS)",
      "Doit aller dans une école spéciale obligatoirement",
      "Ne peut pas être scolarisé",
      "Doit rester chez lui",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 11 février 2005 : droit à la scolarisation en milieu ordinaire avec aménagements (AESH, matériel adapté, PPS).",
  },
];
