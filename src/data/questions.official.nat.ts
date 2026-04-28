import { Question } from "@/types";

/**
 * OFFICIAL_NAT_QUESTIONS — questions officielles publiées par le
 * Ministère de l'Intérieur pour le niveau Naturalisation / Réintégration
 * dans la nationalité française.
 *
 * Source : immigration.interieur.gouv.fr — PDF officiel du 12/01/2026.
 * Format examen : QCM 40 questions / 45 min / seuil 80 % (32/40).
 *
 * ⚠️ COUVERTURE PARTIELLE : Cette première version contient 92 questions
 * (sections 1 « Principes et valeurs » + 2 « Système institutionnel »).
 * Le PDF officiel en compte 258 au total. Les sections 3 « Droits et devoirs »,
 * 4 « Histoire, géographie et culture » et 5 « Vivre en société » restent
 * à intégrer une fois la deuxième moitié du scraping fournie.
 *
 * Doublon supprimé : « Qui peut se présenter aux élections présidentielles ? »
 * apparaissait deux fois dans la source (positions ~40 et ~48 de §2).
 *
 * Mapping vers nos thèmes :
 *   §1 Principes et valeurs       → "valeurs" / "culture"
 *   §2 Système institutionnel     → "institutions"
 */

export const OFFICIAL_NAT_QUESTIONS: Question[] = [
  // ─── §1 Principes et valeurs de la République (1-38) ─────────────────
  {
    id: "off-nat-001",
    category: "NAT",
    theme: "culture",
    text: "Complétez les paroles de la Marseillaise « Allons enfants de la patrie... »",
    choices: [
      "Le jour de gloire est arrivé",
      "Liberté, liberté chérie",
      "Marchons, marchons",
      "Aux armes, citoyens",
    ],
    correctIndex: 0,
    explanation:
      "Premier couplet : « Allons enfants de la Patrie, le jour de gloire est arrivé ! »",
  },
  {
    id: "off-nat-002",
    category: "NAT",
    theme: "valeurs",
    text: "Dans le cadre d'un entretien d'embauche, que peut-on demander au candidat ?",
    choices: [
      "Des informations en lien direct avec le poste à pourvoir",
      "Sa religion",
      "Son orientation sexuelle",
      "Son projet familial",
    ],
    correctIndex: 0,
    explanation:
      "Le recruteur ne peut poser que des questions ayant un lien direct et nécessaire avec l'emploi. Toute question discriminatoire est interdite.",
  },
  {
    id: "off-nat-003",
    category: "NAT",
    theme: "valeurs",
    text: "Déclarer ses revenus aux services fiscaux est :",
    choices: [
      "Une obligation légale pour tous les résidents",
      "Facultatif",
      "Réservé aux Français",
      "Demandé une fois tous les 5 ans",
    ],
    correctIndex: 0,
    explanation:
      "Toute personne fiscalement domiciliée en France doit déclarer ses revenus chaque année, quelle que soit sa nationalité.",
  },
  {
    id: "off-nat-004",
    category: "NAT",
    theme: "valeurs",
    text: "En France, les impôts permettent de financer les dépenses publiques. Quelle proposition est correcte ?",
    choices: [
      "Tous les résidents (Français ou étrangers) doivent payer leurs impôts",
      "Seuls les Français paient",
      "Les impôts sont facultatifs",
      "Seuls les fonctionnaires paient",
    ],
    correctIndex: 0,
    explanation:
      "Article 13 DDHC : « Pour l'entretien de la force publique, une contribution commune est indispensable. » L'impôt est une obligation citoyenne.",
  },
  {
    id: "off-nat-005",
    category: "NAT",
    theme: "valeurs",
    text: "La liberté d'association est :",
    choices: [
      "Le droit de créer ou d'adhérer à une association sans autorisation préalable",
      "L'obligation d'adhérer à un parti",
      "Réservée aux citoyens français",
      "Soumise à autorisation préfectorale",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 1er juillet 1901 : la liberté d'association est garantie. Pas d'autorisation préalable nécessaire.",
  },
  {
    id: "off-nat-006",
    category: "NAT",
    theme: "valeurs",
    text: "La liberté d'expression sur les réseaux sociaux en France est :",
    choices: [
      "Garantie, mais avec les mêmes limites légales qu'ailleurs (haine, diffamation)",
      "Sans aucune limite",
      "Totalement interdite",
      "Réservée aux journalistes",
    ],
    correctIndex: 0,
    explanation:
      "La liberté d'expression s'applique en ligne, mais incitation à la haine, diffamation, harcèlement et apologie du terrorisme y sont punis.",
  },
  {
    id: "off-nat-007",
    category: "NAT",
    theme: "culture",
    text: "Lequel de ces prénoms évoque un symbole de la République ?",
    choices: ["Marianne", "Jeanne", "Sophie", "Catherine"],
    correctIndex: 0,
    explanation:
      "Marianne est la figure allégorique de la République française, présente dans toutes les mairies.",
  },
  {
    id: "off-nat-008",
    category: "NAT",
    theme: "culture",
    text: "Lequel de ces symboles représente la République française ?",
    choices: [
      "Le drapeau tricolore",
      "L'aigle royal",
      "Le sceptre",
      "La fleur de lys",
    ],
    correctIndex: 0,
    explanation:
      "Drapeau tricolore (bleu, blanc, rouge), Marianne, La Marseillaise et la devise « Liberté, Égalité, Fraternité » sont les symboles officiels.",
  },
  {
    id: "off-nat-009",
    category: "NAT",
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
    id: "off-nat-010",
    category: "NAT",
    theme: "valeurs",
    text: "Lesquels sont des symboles officiels de la République française ?",
    choices: [
      "Drapeau tricolore, La Marseillaise, Marianne, devise",
      "Église, État, Justice",
      "Liberté, Égalité, Fraternité",
      "Paris, Lyon, Marseille",
    ],
    correctIndex: 0,
    explanation:
      "Symboles officiels : drapeau tricolore, hymne (La Marseillaise), Marianne, devise « Liberté, Égalité, Fraternité ».",
  },
  {
    id: "off-nat-011",
    category: "NAT",
    theme: "valeurs",
    text: "Peut-on brûler publiquement un drapeau français ?",
    choices: [
      "Non, c'est un outrage interdit et sanctionné",
      "Oui, c'est la liberté d'expression",
      "Oui, le 14 juillet uniquement",
      "Oui, avec autorisation",
    ],
    correctIndex: 0,
    explanation:
      "L'outrage public au drapeau ou à l'hymne est puni d'une amende (jusqu'à 7 500 €) ou d'un emprisonnement.",
  },
  {
    id: "off-nat-012",
    category: "NAT",
    theme: "histoire",
    text: "Quand la sécurité sociale a-t-elle été établie en France ?",
    choices: ["1945", "1789", "1958", "1981"],
    correctIndex: 0,
    explanation:
      "Sécurité sociale créée par les ordonnances des 4 et 19 octobre 1945, à l'initiative du Conseil national de la Résistance.",
  },
  {
    id: "off-nat-013",
    category: "NAT",
    theme: "culture",
    text: "Que commémore la fête nationale ?",
    choices: [
      "La prise de la Bastille (1789) et la Fête de la Fédération (1790)",
      "La fin de la Seconde Guerre mondiale",
      "La signature de la Constitution",
      "Le sacre de Napoléon",
    ],
    correctIndex: 0,
    explanation:
      "Le 14 juillet : prise de la Bastille en 1789 et Fête de la Fédération en 1790. Fête nationale depuis 1880.",
  },
  {
    id: "off-nat-014",
    category: "NAT",
    theme: "culture",
    text: "Que porte Marianne sur la tête ?",
    choices: ["Un bonnet phrygien", "Une couronne", "Un casque", "Un voile"],
    correctIndex: 0,
    explanation:
      "Le bonnet phrygien, symbole de liberté hérité de l'Antiquité, est porté par Marianne.",
  },
  {
    id: "off-nat-015",
    category: "NAT",
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
    id: "off-nat-016",
    category: "NAT",
    theme: "culture",
    text: "Quel symbole de la République peut-on voir sur les maillots de l'équipe de France de football ?",
    choices: ["Le coq gaulois", "Le lion", "L'aigle", "La fleur de lys"],
    correctIndex: 0,
    explanation:
      "Le coq gaulois, symbole national, figure sur les maillots des équipes sportives françaises.",
  },
  {
    id: "off-nat-017",
    category: "NAT",
    theme: "valeurs",
    text: "Quelle est la devise de la République française ?",
    choices: [
      "Liberté, Égalité, Fraternité",
      "Travail, Famille, Patrie",
      "Honneur, Patrie",
      "Paix, Amour, Espoir",
    ],
    correctIndex: 0,
    explanation:
      "Devise inscrite à l'article 2 de la Constitution, héritée de la Révolution française.",
  },
  {
    id: "off-nat-018",
    category: "NAT",
    theme: "valeurs",
    text: "Qu'est-ce que la liberté d'association ?",
    choices: [
      "Le droit de s'unir librement avec d'autres pour défendre une cause",
      "L'obligation d'adhérer à une association",
      "Le droit de gérer son entreprise",
      "Le droit de voyager",
    ],
    correctIndex: 0,
    explanation:
      "Loi 1901 : toute personne peut créer ou rejoindre une association sans autorisation préalable.",
  },
  {
    id: "off-nat-019",
    category: "NAT",
    theme: "valeurs",
    text: "Qu'est-ce qu'une liberté ?",
    choices: [
      "Le droit de faire ce qui ne nuit pas à autrui",
      "Le droit de tout faire sans limite",
      "Le droit de ne pas travailler",
      "Le droit de ne pas voter",
    ],
    correctIndex: 0,
    explanation:
      "Article 4 de la DDHC : « La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui. »",
  },
  {
    id: "off-nat-020",
    category: "NAT",
    theme: "valeurs",
    text: "Selon la Constitution, la France est une République...",
    choices: [
      "indivisible, laïque, démocratique et sociale",
      "monarchique et religieuse",
      "fédérale et impériale",
      "indépendante et neutre",
    ],
    correctIndex: 0,
    explanation:
      "Article 1 : « La France est une République indivisible, laïque, démocratique et sociale. »",
  },
  {
    id: "off-nat-021",
    category: "NAT",
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
      "Marianne figure sur les pièces de 1 à 50 centimes d'euro émises par la France et sur les timbres.",
  },
  {
    id: "off-nat-022",
    category: "NAT",
    theme: "valeurs",
    text: "Une des valeurs de la devise républicaine est l'Égalité. Qu'est-ce que cela signifie ?",
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
    id: "off-nat-023",
    category: "NAT",
    theme: "valeurs",
    text: "Une personne peut-elle changer librement de religion en France ?",
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
    id: "off-nat-024",
    category: "NAT",
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
    id: "off-nat-025",
    category: "NAT",
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
    id: "off-nat-026",
    category: "NAT",
    theme: "valeurs",
    text: "En France, il est possible pour l'État de financer :",
    choices: [
      "L'entretien des édifices religieux antérieurs à 1905",
      "Tout culte religieux",
      "Aucun bâtiment religieux",
      "Uniquement les églises",
    ],
    correctIndex: 0,
    explanation:
      "Loi de 1905 : l'État ne finance pas les cultes, mais peut entretenir les édifices construits avant 1905 (qui sont propriété publique).",
  },
  {
    id: "off-nat-027",
    category: "NAT",
    theme: "valeurs",
    text: "En quelle année la loi de séparation des Églises et de l'État a-t-elle été votée ?",
    choices: ["1905", "1789", "1958", "1881"],
    correctIndex: 0,
    explanation:
      "Loi du 9 décembre 1905, fondement de la laïcité française.",
  },
  {
    id: "off-nat-028",
    category: "NAT",
    theme: "valeurs",
    text: "Que dit la loi de 1905 ?",
    choices: [
      "L'État garantit la liberté de conscience et la séparation des Églises et de l'État",
      "L'État impose une religion",
      "L'État interdit les religions",
      "L'État finance toutes les religions",
    ],
    correctIndex: 0,
    explanation:
      "Article 1 : « La République assure la liberté de conscience. » Article 2 : séparation des Églises et de l'État.",
  },
  {
    id: "off-nat-029",
    category: "NAT",
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
    id: "off-nat-030",
    category: "NAT",
    theme: "valeurs",
    text: "Quel jour célèbre-t-on officiellement la laïcité en France ?",
    choices: ["Le 9 décembre", "Le 14 juillet", "Le 1er mai", "Le 8 mai"],
    correctIndex: 0,
    explanation:
      "Journée nationale de la laïcité : 9 décembre, anniversaire de la loi de 1905.",
  },
  {
    id: "off-nat-031",
    category: "NAT",
    theme: "valeurs",
    text: "Quel symbole religieux peut être porté dans une école publique dans le respect de la laïcité ?",
    choices: [
      "Aucun signe religieux ostensible (loi de 2004)",
      "Tous les signes",
      "Uniquement la croix",
      "Uniquement le voile",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 15 mars 2004 : interdiction des signes religieux ostensibles à l'école publique pour les élèves.",
  },
  {
    id: "off-nat-032",
    category: "NAT",
    theme: "valeurs",
    text: "Quel terme désigne précisément la haine ou les préjugés contre les Juifs ?",
    choices: ["L'antisémitisme", "La xénophobie", "Le racisme", "L'islamophobie"],
    correctIndex: 0,
    explanation:
      "Antisémitisme : haine, hostilité ou préjugés visant spécifiquement les Juifs. Puni par la loi.",
  },
  {
    id: "off-nat-033",
    category: "NAT",
    theme: "valeurs",
    text: "Quel texte est considéré comme le texte fondateur de la laïcité ?",
    choices: [
      "La loi du 9 décembre 1905",
      "La Déclaration des Droits de l'Homme",
      "La Constitution de 1958",
      "Le Code civil",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 9 décembre 1905 sur la séparation des Églises et de l'État — pierre angulaire de la laïcité française.",
  },
  {
    id: "off-nat-034",
    category: "NAT",
    theme: "valeurs",
    text: "Quelle institution française doit rester neutre en matière de religion ?",
    choices: [
      "L'État et tous ses services publics",
      "Les associations privées",
      "Les entreprises privées",
      "Les médias privés",
    ],
    correctIndex: 0,
    explanation:
      "L'obligation de neutralité religieuse s'impose à l'État et à tous les agents publics (mairies, écoles, hôpitaux, préfectures).",
  },
  {
    id: "off-nat-035",
    category: "NAT",
    theme: "valeurs",
    text: "Qu'est-ce que la laïcité ?",
    choices: [
      "Un principe garantissant la liberté de conscience et la neutralité de l'État",
      "L'interdiction de toutes les religions",
      "Une religion d'État",
      "L'obligation de croire",
    ],
    correctIndex: 0,
    explanation:
      "La laïcité (loi de 1905) sépare les religions et l'État, garantissant la liberté de conscience.",
  },
  {
    id: "off-nat-036",
    category: "NAT",
    theme: "valeurs",
    text: "À l'école, la charte de la laïcité permet de :",
    choices: [
      "Rappeler les règles de neutralité et de respect mutuel à l'école publique",
      "Imposer une religion",
      "Interdire les enseignements scientifiques",
      "Sélectionner les élèves selon leur religion",
    ],
    correctIndex: 0,
    explanation:
      "Charte de la laïcité à l'école (2013) : 15 articles rappelant les principes de neutralité et de vivre-ensemble.",
  },
  {
    id: "off-nat-037",
    category: "NAT",
    theme: "valeurs",
    text: "Qui doit respecter et veiller à la neutralité religieuse dans les services publics ?",
    choices: [
      "Tous les agents publics",
      "Uniquement le maire",
      "Uniquement les enseignants",
      "Personne",
    ],
    correctIndex: 0,
    explanation:
      "L'obligation de neutralité s'impose à tous les agents du service public dans l'exercice de leurs fonctions.",
  },
  {
    id: "off-nat-038",
    category: "NAT",
    theme: "valeurs",
    text: "Une personne déclare ne croire en aucun dieu. On peut dire :",
    choices: [
      "Qu'elle est athée — c'est sa liberté garantie par la laïcité",
      "Qu'elle commet une infraction",
      "Qu'elle doit obligatoirement choisir une religion",
      "Qu'elle perd ses droits civiques",
    ],
    correctIndex: 0,
    explanation:
      "L'athéisme est une conviction personnelle protégée par la liberté de conscience. Aucune obligation religieuse en France.",
  },

  // ─── §2 Système institutionnel et politique (39-93, dédoublonné) ────
  {
    id: "off-nat-039",
    category: "NAT",
    theme: "institutions",
    text: "Comment est désigné le Premier ministre ?",
    choices: [
      "Il est nommé par le Président de la République",
      "Il est élu au suffrage universel",
      "Il est élu par les députés",
      "Il est désigné par tirage au sort",
    ],
    correctIndex: 0,
    explanation:
      "Article 8 : le Premier ministre est nommé par le Président de la République.",
  },
  {
    id: "off-nat-040",
    category: "NAT",
    theme: "institutions",
    text: "Qui peut se présenter aux élections présidentielles ?",
    choices: [
      "Tout citoyen français de 18 ans révolus, jouissant de ses droits civiques, avec 500 parrainages d'élus",
      "Uniquement les ministres en exercice",
      "Uniquement les députés",
      "Uniquement les Français de naissance",
    ],
    correctIndex: 0,
    explanation:
      "Conditions : nationalité française, majorité, jouissance des droits civiques, 500 parrainages d'élus dans 30 départements minimum.",
  },
  {
    id: "off-nat-041",
    category: "NAT",
    theme: "institutions",
    text: "À qui appartient la souveraineté nationale ?",
    choices: [
      "Au peuple français",
      "Au Président de la République",
      "Au Parlement",
      "Au Conseil constitutionnel",
    ],
    correctIndex: 0,
    explanation:
      "Article 3 : « La souveraineté nationale appartient au peuple qui l'exerce par ses représentants et par la voie du référendum. »",
  },
  {
    id: "off-nat-042",
    category: "NAT",
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
      "Les habitants élisent les conseillers municipaux pour 6 ans ; ceux-ci élisent ensuite le maire en leur sein.",
  },
  {
    id: "off-nat-043",
    category: "NAT",
    theme: "institutions",
    text: "L'inscription sur les listes électorales est :",
    choices: [
      "Nécessaire pour pouvoir voter (automatique à la majorité depuis 2018)",
      "Facultative",
      "Réservée aux propriétaires",
      "Payante",
    ],
    correctIndex: 0,
    explanation:
      "Inscription automatique à 18 ans pour les Français. Démarche manuelle si déménagement ou autre situation.",
  },
  {
    id: "off-nat-044",
    category: "NAT",
    theme: "institutions",
    text: "Quelle condition est nécessaire pour voter aux élections présidentielles ?",
    choices: [
      "Être citoyen français majeur, jouir de ses droits civiques et être inscrit sur les listes",
      "Posséder un véhicule",
      "Habiter Paris",
      "Avoir le baccalauréat",
    ],
    correctIndex: 0,
    explanation:
      "Conditions : nationalité française, 18 ans révolus, jouissance des droits civiques, inscription sur les listes électorales.",
  },
  {
    id: "off-nat-045",
    category: "NAT",
    theme: "institutions",
    text: "Quelle condition faut-il remplir pour être candidat aux élections municipales ?",
    choices: [
      "Avoir 18 ans, jouir de ses droits civiques (et être citoyen UE pour résidents)",
      "Habiter dans la commune depuis 30 ans",
      "Être propriétaire",
      "Avoir un casier vierge depuis 50 ans",
    ],
    correctIndex: 0,
    explanation:
      "Conditions : 18 ans, droits civiques. Les ressortissants UE résidents peuvent se présenter (sauf comme maire).",
  },
  {
    id: "off-nat-046",
    category: "NAT",
    theme: "institutions",
    text: "Parmi ces autorités, laquelle est élue ?",
    choices: ["Le maire", "Le préfet", "Le procureur", "Le recteur"],
    correctIndex: 0,
    explanation:
      "Le maire est élu par le conseil municipal (lui-même élu par les habitants). Préfet, procureur et recteur sont nommés.",
  },
  {
    id: "off-nat-047",
    category: "NAT",
    theme: "institutions",
    text: "Quelles sont les fonctions du maire ?",
    choices: [
      "Officier d'état civil, officier de police judiciaire, gestion communale",
      "Voter les lois nationales",
      "Diriger l'armée",
      "Juger les criminels",
    ],
    correctIndex: 0,
    explanation:
      "Le maire célèbre les mariages, dresse les actes d'état civil, gère la commune et dispose de pouvoirs de police.",
  },
  {
    id: "off-nat-048",
    category: "NAT",
    theme: "institutions",
    text: "Une personne, n'ayant pas d'accès à internet, veut s'inscrire sur les listes électorales pour pouvoir voter aux prochaines élections politiques. Où peut-elle s'inscrire ?",
    choices: [
      "À la mairie de son domicile",
      "À la préfecture uniquement",
      "Au commissariat",
      "Au tribunal",
    ],
    correctIndex: 0,
    explanation:
      "L'inscription se fait à la mairie de la commune de domicile, ou en ligne sur service-public.fr.",
  },
  {
    id: "off-nat-049",
    category: "NAT",
    theme: "institutions",
    text: "À quel âge peut-on devenir électeur ?",
    choices: ["18 ans", "16 ans", "21 ans", "25 ans"],
    correctIndex: 0,
    explanation:
      "Le droit de vote est ouvert à tout citoyen français majeur, soit à partir de 18 ans.",
  },
  {
    id: "off-nat-050",
    category: "NAT",
    theme: "institutions",
    text: "En France, est-ce obligatoire de voter ?",
    choices: [
      "Non, le vote est un droit, pas une obligation",
      "Oui, c'est obligatoire",
      "Oui, sauf au 1er tour",
      "Oui, sous peine d'amende",
    ],
    correctIndex: 0,
    explanation:
      "Le vote est un droit civique mais n'est pas obligatoire (sauf pour les sénateurs grands électeurs).",
  },
  {
    id: "off-nat-051",
    category: "NAT",
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
    id: "off-nat-052",
    category: "NAT",
    theme: "institutions",
    text: "Comment sont désignés les députés ?",
    choices: [
      "Élus au suffrage universel direct pour 5 ans",
      "Nommés par le Président",
      "Tirés au sort",
      "Désignés par les maires",
    ],
    correctIndex: 0,
    explanation:
      "Les députés sont élus au suffrage universel direct, dans 577 circonscriptions, pour un mandat de 5 ans.",
  },
  {
    id: "off-nat-053",
    category: "NAT",
    theme: "institutions",
    text: "Qui vote les lois ?",
    choices: ["Le Parlement", "Le Président", "Le Gouvernement", "Les préfets"],
    correctIndex: 0,
    explanation:
      "Les lois sont votées par le Parlement (Assemblée nationale + Sénat) et promulguées par le Président.",
  },
  {
    id: "off-nat-054",
    category: "NAT",
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
      "Théorie de Montesquieu : exécutif (gouverner), législatif (faire les lois), judiciaire (juger).",
  },
  {
    id: "off-nat-055",
    category: "NAT",
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
    id: "off-nat-056",
    category: "NAT",
    theme: "institutions",
    text: "Quelles sont les durées du mandat du conseil municipal et du maire ?",
    choices: ["6 ans", "5 ans", "7 ans", "3 ans"],
    correctIndex: 0,
    explanation:
      "Conseillers municipaux et maire élus pour 6 ans.",
  },
  {
    id: "off-nat-057",
    category: "NAT",
    theme: "institutions",
    text: "Qui est élu lors des élections législatives ?",
    choices: ["Les députés", "Le président", "Les sénateurs", "Le maire"],
    correctIndex: 0,
    explanation:
      "Les élections législatives élisent les députés à l'Assemblée nationale (577 députés pour 5 ans).",
  },
  {
    id: "off-nat-058",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est la durée du mandat du Président de la République française ?",
    choices: ["5 ans", "7 ans", "4 ans", "10 ans"],
    correctIndex: 0,
    explanation:
      "Quinquennat depuis 2000 (référendum). Mandat renouvelable une fois consécutivement.",
  },
  {
    id: "off-nat-059",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est la durée du mandat des députés ?",
    choices: ["5 ans", "6 ans", "7 ans", "3 ans"],
    correctIndex: 0,
    explanation:
      "Mandat des députés : 5 ans, sauf dissolution de l'Assemblée nationale par le Président.",
  },
  {
    id: "off-nat-060",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est la durée du mandat des sénateurs ?",
    choices: ["6 ans", "5 ans", "9 ans", "4 ans"],
    correctIndex: 0,
    explanation:
      "Mandat des sénateurs : 6 ans, renouvelable par moitié tous les 3 ans.",
  },
  {
    id: "off-nat-061",
    category: "NAT",
    theme: "institutions",
    text: "Qui dirige l'action du gouvernement ?",
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
    id: "off-nat-062",
    category: "NAT",
    theme: "institutions",
    text: "En France, est-ce possible d'adhérer à un parti politique ?",
    choices: [
      "Oui, c'est garanti par la Constitution",
      "Non, c'est interdit",
      "Oui, mais seulement à un seul parti officiel",
      "Oui, mais payant",
    ],
    correctIndex: 0,
    explanation:
      "Article 4 de la Constitution : les partis politiques se forment et exercent leur activité librement.",
  },
  {
    id: "off-nat-063",
    category: "NAT",
    theme: "institutions",
    text: "Qui sanctionne l'auteur d'un vol ?",
    choices: ["Un juge", "Le maire", "Le préfet", "Un député"],
    correctIndex: 0,
    explanation:
      "Seul un juge peut prononcer une sanction pénale. La justice est rendue au nom du peuple français.",
  },
  {
    id: "off-nat-064",
    category: "NAT",
    theme: "institutions",
    text: "Qui gère les collèges publics ?",
    choices: [
      "Les départements (conseil départemental)",
      "Les régions",
      "L'État seul",
      "Les communes",
    ],
    correctIndex: 0,
    explanation:
      "Le département a la compétence des collèges (bâtiments, restauration, transports). L'État gère le pédagogique.",
  },
  {
    id: "off-nat-065",
    category: "NAT",
    theme: "institutions",
    text: "Qui gère les écoles primaires et maternelles publiques ?",
    choices: [
      "Les communes",
      "Les départements",
      "Les régions",
      "L'État seul",
    ],
    correctIndex: 0,
    explanation:
      "La commune gère les écoles maternelles et élémentaires (bâtiments, agents, cantine). L'État gère le pédagogique.",
  },
  {
    id: "off-nat-066",
    category: "NAT",
    theme: "institutions",
    text: "Quelle collectivité territoriale est responsable des transports régionaux ?",
    choices: [
      "La région",
      "La commune",
      "Le département",
      "L'État seul",
    ],
    correctIndex: 0,
    explanation:
      "La région est responsable des TER (trains express régionaux) et des transports routiers interurbains.",
  },
  {
    id: "off-nat-067",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est l'une des voies possibles pour modifier la Constitution ?",
    choices: [
      "Vote en termes identiques par les deux chambres puis Congrès aux 3/5e ou référendum",
      "Décret du Président seul",
      "Vote des seuls députés",
      "Décision du Conseil constitutionnel",
    ],
    correctIndex: 0,
    explanation:
      "Article 89 : la révision est adoptée si elle est votée en termes identiques par les deux chambres, puis approuvée par référendum ou par le Congrès aux 3/5e.",
  },
  {
    id: "off-nat-068",
    category: "NAT",
    theme: "institutions",
    text: "Qui assure l'intérim du président de la République en cas de décès ?",
    choices: [
      "Le Président du Sénat",
      "Le Premier ministre",
      "Le Président de l'Assemblée",
      "Le doyen du Conseil constitutionnel",
    ],
    correctIndex: 0,
    explanation:
      "Article 7 : en cas de vacance de la présidence, l'intérim est assuré par le Président du Sénat.",
  },
  {
    id: "off-nat-069",
    category: "NAT",
    theme: "institutions",
    text: "Quel est le rôle du Conseil constitutionnel ?",
    choices: [
      "Veiller à la conformité des lois à la Constitution",
      "Voter les lois",
      "Élire le Président",
      "Diriger la police",
    ],
    correctIndex: 0,
    explanation:
      "9 membres nommés pour 9 ans. Vérifie la constitutionnalité des lois et veille à la régularité des élections.",
  },
  {
    id: "off-nat-070",
    category: "NAT",
    theme: "institutions",
    text: "Quelle condition est obligatoire pour se présenter à l'élection présidentielle ?",
    choices: [
      "Obtenir 500 parrainages d'élus dans 30 départements minimum",
      "Avoir été ministre",
      "Habiter Paris",
      "Avoir 50 ans minimum",
    ],
    correctIndex: 0,
    explanation:
      "500 parrainages d'élus (maires, parlementaires) issus d'au moins 30 départements ou collectivités, sans qu'un département dépasse 50.",
  },
  {
    id: "off-nat-071",
    category: "NAT",
    theme: "geographie",
    text: "Combien y a-t-il de départements en France ?",
    choices: ["101", "96", "100", "120"],
    correctIndex: 0,
    explanation:
      "101 départements : 96 en métropole + 5 d'outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte).",
  },
  {
    id: "off-nat-072",
    category: "NAT",
    theme: "institutions",
    text: "Comment est organisé le découpage administratif de la France ?",
    choices: [
      "Communes, départements, régions, État",
      "Uniquement l'État central",
      "Uniquement les régions",
      "Uniquement les communes",
    ],
    correctIndex: 0,
    explanation:
      "Trois niveaux de collectivités territoriales : communes (≈ 35 000), départements (101), régions (18) + l'État.",
  },
  {
    id: "off-nat-073",
    category: "NAT",
    theme: "institutions",
    text: "Qui représente l'État dans un département ?",
    choices: ["Le préfet", "Le maire", "Le sénateur", "Le député"],
    correctIndex: 0,
    explanation:
      "Le préfet, nommé par le Président en Conseil des ministres, représente l'État dans le département.",
  },
  {
    id: "off-nat-074",
    category: "NAT",
    theme: "institutions",
    text: "Quel est le rôle du Président de la République ?",
    choices: [
      "Garant de la Constitution, chef des armées, représentant de la France",
      "Voter les lois",
      "Juger les criminels",
      "Diriger les communes",
    ],
    correctIndex: 0,
    explanation:
      "Article 5 : le Président veille au respect de la Constitution et assure la continuité de l'État. Chef des armées.",
  },
  {
    id: "off-nat-075",
    category: "NAT",
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
    id: "off-nat-076",
    category: "NAT",
    theme: "institutions",
    text: "Quel est le rôle du Défenseur des droits ?",
    choices: [
      "Protéger les droits des citoyens face à l'administration et lutter contre les discriminations",
      "Voter les lois",
      "Élire le Président",
      "Diriger la police",
    ],
    correctIndex: 0,
    explanation:
      "Autorité indépendante créée en 2008. Veille au respect des droits et lutte contre les discriminations.",
  },
  {
    id: "off-nat-077",
    category: "NAT",
    theme: "institutions",
    text: "En quelle année la citoyenneté européenne a-t-elle été créée ?",
    choices: ["1992", "1957", "2007", "1986"],
    correctIndex: 0,
    explanation:
      "Le traité de Maastricht (7 février 1992) institue la citoyenneté européenne pour tous les ressortissants des États membres.",
  },
  {
    id: "off-nat-078",
    category: "NAT",
    theme: "institutions",
    text: "Quel est le dernier État à avoir intégré l'Union Européenne en 2013 ?",
    choices: ["La Croatie", "La Roumanie", "La Bulgarie", "La Slovénie"],
    correctIndex: 0,
    explanation:
      "La Croatie a rejoint l'UE le 1er juillet 2013, devenant le 28e État membre (avant le Brexit).",
  },
  {
    id: "off-nat-079",
    category: "NAT",
    theme: "institutions",
    text: "Qui a composé l'hymne de l'Union européenne ?",
    choices: ["Ludwig van Beethoven", "Wolfgang Mozart", "Johann Bach", "Frédéric Chopin"],
    correctIndex: 0,
    explanation:
      "L'Ode à la Joie est extraite de la 9e symphonie de Beethoven (1824). Hymne européen depuis 1985.",
  },
  {
    id: "off-nat-080",
    category: "NAT",
    theme: "institutions",
    text: "Quand est célébrée la journée de l'Europe ?",
    choices: ["Le 9 mai", "Le 1er mai", "Le 14 juillet", "Le 8 mai"],
    correctIndex: 0,
    explanation:
      "Le 9 mai commémore la déclaration Schuman de 1950, considérée comme l'acte fondateur de la construction européenne.",
  },
  {
    id: "off-nat-081",
    category: "NAT",
    theme: "institutions",
    text: "Où est le siège de la Banque centrale européenne ?",
    choices: ["Francfort (Allemagne)", "Bruxelles", "Strasbourg", "Paris"],
    correctIndex: 0,
    explanation:
      "La BCE, créée en 1998, est basée à Francfort-sur-le-Main. Elle conduit la politique monétaire de la zone euro.",
  },
  {
    id: "off-nat-082",
    category: "NAT",
    theme: "institutions",
    text: "Où est le siège de la Commission européenne ?",
    choices: ["Bruxelles (Belgique)", "Strasbourg", "Francfort", "Luxembourg"],
    correctIndex: 0,
    explanation:
      "La Commission européenne, organe exécutif de l'UE, siège à Bruxelles.",
  },
  {
    id: "off-nat-083",
    category: "NAT",
    theme: "institutions",
    text: "Qui siège au Parlement européen ?",
    choices: [
      "Les députés européens élus par les citoyens des États membres",
      "Les chefs d'État",
      "Les ministres nationaux",
      "Les ambassadeurs",
    ],
    correctIndex: 0,
    explanation:
      "720 députés européens (depuis 2024) élus pour 5 ans au suffrage universel direct dans chaque État membre.",
  },
  {
    id: "off-nat-084",
    category: "NAT",
    theme: "institutions",
    text: "Les citoyens de l'Union européenne peuvent-ils voter aux élections locales dans un autre État de l'Union ?",
    choices: [
      "Oui, aux élections municipales et européennes de leur pays de résidence",
      "Non, jamais",
      "Uniquement aux présidentielles",
      "Uniquement aux législatives",
    ],
    correctIndex: 0,
    explanation:
      "La citoyenneté européenne permet de voter et d'être élu aux municipales et européennes dans le pays de résidence (sauf maire en France).",
  },
  {
    id: "off-nat-085",
    category: "NAT",
    theme: "institutions",
    text: "Combien d'États font partie de l'Union européenne au 1er janvier 2025 ?",
    choices: ["27", "28", "25", "30"],
    correctIndex: 0,
    explanation:
      "L'UE compte 27 États membres depuis le retrait du Royaume-Uni (Brexit, 31 janvier 2020).",
  },
  {
    id: "off-nat-086",
    category: "NAT",
    theme: "institutions",
    text: "En quelle année le traité de Maastricht, qui marque la fondation de l'Union européenne, a-t-il été signé ?",
    choices: ["1992", "1957", "1986", "2002"],
    correctIndex: 0,
    explanation:
      "Signé le 7 février 1992 à Maastricht (Pays-Bas), le traité institue l'UE et la citoyenneté européenne.",
  },
  {
    id: "off-nat-087",
    category: "NAT",
    theme: "institutions",
    text: "Quel traité concerne la construction de l'Union européenne ?",
    choices: [
      "Le traité de Maastricht (1992)",
      "Le traité de Versailles (1919)",
      "Le traité de Yalta (1945)",
      "Le traité de l'Atlantique Nord (1949)",
    ],
    correctIndex: 0,
    explanation:
      "Le traité de Maastricht fonde l'Union européenne et institue la citoyenneté européenne.",
  },
  {
    id: "off-nat-088",
    category: "NAT",
    theme: "institutions",
    text: "Quel État a quitté l'Union Européenne en 2020 ?",
    choices: ["Le Royaume-Uni", "La Suisse", "La Norvège", "L'Islande"],
    correctIndex: 0,
    explanation:
      "Brexit : sortie effective du Royaume-Uni de l'UE le 31 janvier 2020.",
  },
  {
    id: "off-nat-089",
    category: "NAT",
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
      "Devise officielle de l'UE adoptée en 2000 : « Unie dans la diversité » (« In varietate concordia »).",
  },
  {
    id: "off-nat-090",
    category: "NAT",
    theme: "institutions",
    text: "Quel est l'hymne de l'Union Européenne ?",
    choices: [
      "L'Ode à la joie (Beethoven)",
      "La Marseillaise",
      "L'Internationale",
      "Le Chant des partisans",
    ],
    correctIndex: 0,
    explanation:
      "L'Ode à la Joie, extraite de la 9e Symphonie de Beethoven, est l'hymne européen depuis 1985.",
  },
  {
    id: "off-nat-091",
    category: "NAT",
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
    id: "off-nat-092",
    category: "NAT",
    theme: "institutions",
    text: "Où est le siège du Parlement européen ?",
    choices: ["Strasbourg (France)", "Bruxelles", "Paris", "Berlin"],
    correctIndex: 0,
    explanation:
      "Siège officiel à Strasbourg. Sessions à Bruxelles. Secrétariat à Luxembourg.",
  },
];
