import { Question } from "@/types";

export const EXTENDED_QUESTIONS: Question[] = [
  // ============================================================
  // NAT — Naturalisation (40 questions)
  // ============================================================

  // NAT — Institutions (8)
  {
    id: "ext-nat-001",
    category: "NAT",
    theme: "institutions",
    text: "Où siège l'Assemblée nationale à Paris ?",
    choices: ["Au Palais Bourbon", "Au Palais du Luxembourg", "À l'Élysée", "À Matignon"],
    correctIndex: 0,
    explanation:
      "L'Assemblée nationale siège au Palais Bourbon, situé sur la rive gauche de la Seine dans le 7e arrondissement de Paris. Ce bâtiment, construit à partir de 1722, accueille les 577 députés de la République. Le Palais du Luxembourg, lui, abrite le Sénat, tandis que le Président réside au Palais de l'Élysée.",
  },
  {
    id: "ext-nat-002",
    category: "NAT",
    theme: "institutions",
    text: "Combien de députés siègent à l'Assemblée nationale ?",
    choices: ["348", "500", "577", "925"],
    correctIndex: 2,
    explanation:
      "L'Assemblée nationale compte 577 députés élus au suffrage universel direct pour un mandat de cinq ans, dans le cadre de circonscriptions. Le Sénat, deuxième chambre du Parlement, compte quant à lui 348 sénateurs élus au suffrage indirect. Ce bicamérisme est fixé par la Constitution de la Ve République de 1958.",
  },
  {
    id: "ext-nat-003",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est la résidence officielle du Président de la République ?",
    choices: ["L'hôtel de Matignon", "Le palais de l'Élysée", "Le palais du Luxembourg", "Le palais Bourbon"],
    correctIndex: 1,
    explanation:
      "Le Président de la République française réside au palais de l'Élysée, situé rue du Faubourg-Saint-Honoré à Paris. Ce palais est la résidence officielle du chef de l'État depuis 1848, sous la IIe République. L'hôtel de Matignon est, pour sa part, la résidence officielle du Premier ministre.",
  },
  {
    id: "ext-nat-004",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est la durée du mandat des sénateurs ?",
    choices: ["4 ans", "5 ans", "6 ans", "9 ans"],
    correctIndex: 2,
    explanation:
      "Les sénateurs sont élus pour un mandat de six ans depuis la réforme de 2003, contre neuf ans auparavant. Le Sénat est renouvelé par moitié tous les trois ans. Les sénateurs sont élus au suffrage universel indirect par un collège de « grands électeurs » composé essentiellement d'élus locaux (maires, conseillers départementaux et régionaux, députés).",
  },
  {
    id: "ext-nat-005",
    category: "NAT",
    theme: "institutions",
    text: "Quel article de la Constitution définit la France comme une République indivisible, laïque, démocratique et sociale ?",
    choices: ["L'article 1", "L'article 2", "L'article 5", "L'article 89"],
    correctIndex: 0,
    explanation:
      "L'article 1 de la Constitution du 4 octobre 1958 dispose que « la France est une République indivisible, laïque, démocratique et sociale ». Il affirme aussi l'égalité devant la loi de tous les citoyens sans distinction d'origine, de race ou de religion. L'article 2, quant à lui, définit les symboles (drapeau, hymne, devise) et la langue officielle.",
  },
  {
    id: "ext-nat-006",
    category: "NAT",
    theme: "institutions",
    text: "Qui préside le Conseil des ministres ?",
    choices: ["Le Premier ministre", "Le Président de la République", "Le président de l'Assemblée", "Le Garde des Sceaux"],
    correctIndex: 1,
    explanation:
      "Le Président de la République préside le Conseil des ministres, qui se réunit traditionnellement chaque mercredi au palais de l'Élysée. Le Premier ministre peut exceptionnellement le suppléer sur délégation expresse et pour un ordre du jour déterminé, en vertu de l'article 21 de la Constitution. Cette présidence est l'un des principaux pouvoirs propres du chef de l'État.",
  },
  {
    id: "ext-nat-007",
    category: "NAT",
    theme: "institutions",
    text: "Combien de membres compose le Conseil constitutionnel ?",
    choices: ["7", "9", "11", "15"],
    correctIndex: 1,
    explanation:
      "Le Conseil constitutionnel comprend neuf membres nommés pour neuf ans non renouvelables. Trois sont désignés par le Président de la République, trois par le président de l'Assemblée nationale et trois par le président du Sénat. Les anciens présidents de la République en sont également membres de droit à vie, conformément à l'article 56 de la Constitution.",
  },
  {
    id: "ext-nat-008",
    category: "NAT",
    theme: "institutions",
    text: "À quel âge peut-on voter en France ?",
    choices: ["16 ans", "18 ans", "21 ans", "25 ans"],
    correctIndex: 1,
    explanation:
      "L'âge de la majorité électorale est fixé à 18 ans depuis la loi du 5 juillet 1974, promulguée sous la présidence de Valéry Giscard d'Estaing. Auparavant, il fallait avoir 21 ans pour voter. Pour exercer son droit de vote, il faut être de nationalité française, majeur, jouir de ses droits civils et politiques, et être inscrit sur les listes électorales.",
  },

  // NAT — Histoire (8)
  {
    id: "ext-nat-009",
    category: "NAT",
    theme: "histoire",
    text: "En quelle année a été proclamée la Ire République ?",
    choices: ["1789", "1792", "1804", "1848"],
    correctIndex: 1,
    explanation:
      "La Ire République a été proclamée le 22 septembre 1792 par la Convention nationale, au lendemain de la victoire de Valmy contre les armées prussiennes. Elle marque l'abolition de la monarchie et l'instauration d'un régime républicain en France. Elle a duré jusqu'à la proclamation du Premier Empire par Napoléon Bonaparte en 1804.",
  },
  {
    id: "ext-nat-010",
    category: "NAT",
    theme: "histoire",
    text: "Qui a lancé l'Appel du 18 juin 1940 depuis Londres ?",
    choices: ["Philippe Pétain", "Charles de Gaulle", "Jean Moulin", "Léon Blum"],
    correctIndex: 1,
    explanation:
      "Le général Charles de Gaulle a prononcé l'Appel du 18 juin 1940 sur les ondes de la BBC à Londres, appelant les Français à poursuivre la lutte contre l'Allemagne nazie malgré la demande d'armistice du maréchal Pétain. Cet appel marque le début symbolique de la Résistance française et de la France libre. Il est aujourd'hui un texte fondateur de la mémoire républicaine.",
  },
  {
    id: "ext-nat-011",
    category: "NAT",
    theme: "histoire",
    text: "Quelle Déclaration a été adoptée le 26 août 1789 ?",
    choices: [
      "La Déclaration d'indépendance",
      "La Déclaration des droits de l'homme et du citoyen",
      "La Déclaration universelle des droits de l'homme",
      "La Charte des droits fondamentaux",
    ],
    correctIndex: 1,
    explanation:
      "La Déclaration des droits de l'homme et du citoyen a été adoptée par l'Assemblée nationale constituante le 26 août 1789. Elle proclame des droits universels et inaliénables tels que la liberté, la propriété, la sûreté et la résistance à l'oppression. Son préambule est toujours intégré au bloc de constitutionnalité de la Ve République.",
  },
  {
    id: "ext-nat-012",
    category: "NAT",
    theme: "histoire",
    text: "Quel roi de France a été guillotiné le 21 janvier 1793 ?",
    choices: ["Louis XIV", "Louis XV", "Louis XVI", "Louis XVIII"],
    correctIndex: 2,
    explanation:
      "Louis XVI a été guillotiné sur la place de la Révolution (actuelle place de la Concorde) le 21 janvier 1793, après avoir été jugé et condamné à mort par la Convention nationale. Sa femme Marie-Antoinette subira le même sort quelques mois plus tard, le 16 octobre 1793. Cet événement marque symboliquement la fin définitive de la monarchie française.",
  },
  {
    id: "ext-nat-013",
    category: "NAT",
    theme: "histoire",
    text: "Quel traité, signé en 1957, a créé la Communauté économique européenne ?",
    choices: ["Le traité de Maastricht", "Le traité de Rome", "Le traité de Paris", "Le traité de Lisbonne"],
    correctIndex: 1,
    explanation:
      "Le traité de Rome, signé le 25 mars 1957 par six pays dont la France, a institué la Communauté économique européenne (CEE) ainsi qu'Euratom. Il pose les bases du marché commun européen, ancêtre de l'actuelle Union européenne. Le traité de Maastricht, signé en 1992, a ensuite transformé la CEE en Union européenne et créé la citoyenneté européenne.",
  },
  {
    id: "ext-nat-014",
    category: "NAT",
    theme: "histoire",
    text: "Qui était le chef du gouvernement de Vichy entre 1940 et 1944 ?",
    choices: ["Pierre Laval", "Philippe Pétain", "Édouard Daladier", "Paul Reynaud"],
    correctIndex: 1,
    explanation:
      "Le maréchal Philippe Pétain a dirigé le régime de Vichy, proclamé le 10 juillet 1940 après la défaite face à l'Allemagne nazie. Ce régime, collaborationniste, a remplacé la devise républicaine par « Travail, Famille, Patrie ». À la Libération, Pétain a été jugé pour haute trahison en 1945 et condamné à mort, peine commuée par De Gaulle en réclusion à perpétuité.",
  },
  {
    id: "ext-nat-015",
    category: "NAT",
    theme: "histoire",
    text: "En quelle année la peine de mort a-t-elle été abolie en France ?",
    choices: ["1968", "1974", "1981", "1992"],
    correctIndex: 2,
    explanation:
      "La peine de mort a été abolie en France par la loi du 9 octobre 1981, portée par le garde des Sceaux Robert Badinter sous la présidence de François Mitterrand. Cette abolition a ensuite été inscrite dans la Constitution en 2007 par l'ajout de l'article 66-1. La dernière exécution en France remontait au 10 septembre 1977, celle de Hamida Djandoubi.",
  },
  {
    id: "ext-nat-016",
    category: "NAT",
    theme: "histoire",
    text: "Quel conflit marque la période 1914-1918 ?",
    choices: ["La guerre franco-prussienne", "La Première Guerre mondiale", "La Seconde Guerre mondiale", "La guerre d'Algérie"],
    correctIndex: 1,
    explanation:
      "La Première Guerre mondiale (ou Grande Guerre) s'est déroulée de 1914 à 1918 et a opposé les Alliés, dont la France, aux Empires centraux menés par l'Allemagne. Elle a fait environ 1,4 million de morts français et s'est terminée par l'armistice du 11 novembre 1918, signé à Rethondes. Le traité de Versailles de 1919 a officiellement clos le conflit.",
  },

  // NAT — Valeurs (8)
  {
    id: "ext-nat-017",
    category: "NAT",
    theme: "valeurs",
    text: "Que garantit le principe de laïcité aux citoyens ?",
    choices: [
      "L'obligation d'avoir une religion",
      "La liberté de conscience et l'égalité entre les religions",
      "L'interdiction de toute croyance personnelle",
      "Le financement public des cultes",
    ],
    correctIndex: 1,
    explanation:
      "La laïcité, consacrée par la loi du 9 décembre 1905, garantit à chacun la liberté de conscience, c'est-à-dire celle de croire, de ne pas croire ou de changer de religion. Elle assure également l'égalité de tous devant la loi sans distinction de religion, et la neutralité de l'État vis-à-vis des cultes. La République ne reconnaît, ne salarie ni ne subventionne aucun culte.",
  },
  {
    id: "ext-nat-018",
    category: "NAT",
    theme: "valeurs",
    text: "Quelle institution défend les droits des citoyens face aux administrations ?",
    choices: ["Le Conseil d'État", "Le Défenseur des droits", "La Cour de cassation", "Le Conseil constitutionnel"],
    correctIndex: 1,
    explanation:
      "Le Défenseur des droits est une autorité administrative indépendante créée par la révision constitutionnelle du 23 juillet 2008 et inscrite à l'article 71-1 de la Constitution. Il veille au respect des droits et libertés des citoyens dans leurs relations avec les administrations, lutte contre les discriminations et protège les droits de l'enfant. Il est nommé par le Président de la République pour un mandat de six ans.",
  },
  {
    id: "ext-nat-019",
    category: "NAT",
    theme: "valeurs",
    text: "Qu'est-ce que le suffrage universel ?",
    choices: [
      "Un droit réservé aux propriétaires",
      "Le droit de vote accordé à tous les citoyens majeurs",
      "Un vote réservé aux hommes",
      "Un vote indirect",
    ],
    correctIndex: 1,
    explanation:
      "Le suffrage universel désigne le droit de vote accordé à tous les citoyens majeurs sans distinction de fortune, d'origine, de sexe ou de race. Il a été instauré pour les hommes en 1848 en France, puis étendu aux femmes par l'ordonnance du 21 avril 1944. Il peut être direct (les citoyens votent eux-mêmes) ou indirect (par des grands électeurs, comme pour le Sénat).",
  },
  {
    id: "ext-nat-020",
    category: "NAT",
    theme: "valeurs",
    text: "Quel principe interdit les discriminations fondées sur le sexe ?",
    choices: [
      "La fraternité",
      "L'égalité entre les hommes et les femmes",
      "La laïcité",
      "La solidarité",
    ],
    correctIndex: 1,
    explanation:
      "L'égalité entre les femmes et les hommes est un principe fondamental inscrit dans le préambule de la Constitution de 1946, puis renforcé par la loi constitutionnelle du 8 juillet 1999 qui favorise l'égal accès aux mandats électoraux. La loi du 4 août 2014 a également renforcé cette égalité dans tous les domaines (travail, vie politique, lutte contre les violences).",
  },
  {
    id: "ext-nat-021",
    category: "NAT",
    theme: "valeurs",
    text: "Quel texte international a été signé à Paris le 10 décembre 1948 ?",
    choices: [
      "La Convention européenne des droits de l'homme",
      "La Déclaration universelle des droits de l'homme",
      "La Charte des Nations unies",
      "La Convention de Genève",
    ],
    correctIndex: 1,
    explanation:
      "La Déclaration universelle des droits de l'homme (DUDH) a été adoptée le 10 décembre 1948 par l'Assemblée générale des Nations unies réunie au palais de Chaillot à Paris. Le juriste français René Cassin, prix Nobel de la paix en 1968, a joué un rôle essentiel dans sa rédaction. La date du 10 décembre est célébrée chaque année comme la Journée internationale des droits de l'homme.",
  },
  {
    id: "ext-nat-022",
    category: "NAT",
    theme: "valeurs",
    text: "Le port de signes religieux ostensibles est-il autorisé à l'école publique ?",
    choices: [
      "Oui, sans restriction",
      "Non, il est interdit depuis la loi du 15 mars 2004",
      "Uniquement pour certaines religions",
      "Seulement dans les écoles privées",
    ],
    correctIndex: 1,
    explanation:
      "La loi du 15 mars 2004 interdit dans les écoles, collèges et lycées publics le port de signes ou de tenues manifestant ostensiblement une appartenance religieuse. Cette loi vise à garantir le principe de laïcité dans les établissements scolaires publics. Elle concerne les élèves, mais les fonctionnaires sont soumis à un devoir encore plus strict de neutralité religieuse.",
  },
  {
    id: "ext-nat-023",
    category: "NAT",
    theme: "valeurs",
    text: "Qu'est-ce qu'un droit civique ?",
    choices: [
      "Un droit uniquement économique",
      "Un droit permettant de participer à la vie politique",
      "Un droit exclusivement familial",
      "Un droit commercial",
    ],
    correctIndex: 1,
    explanation:
      "Les droits civiques sont les droits reconnus à un citoyen pour lui permettre de participer à la vie politique et publique de son pays. Ils comprennent notamment le droit de vote, le droit d'éligibilité, le droit d'accéder aux fonctions publiques et la liberté d'association. En France, ils sont accordés aux citoyens majeurs jouissant de leurs droits civils et politiques.",
  },
  {
    id: "ext-nat-024",
    category: "NAT",
    theme: "valeurs",
    text: "La liberté d'association en France est garantie par quelle loi historique ?",
    choices: [
      "La loi de 1881",
      "La loi du 1er juillet 1901",
      "La loi de 1905",
      "La loi de 1958",
    ],
    correctIndex: 1,
    explanation:
      "La loi du 1er juillet 1901, dite « loi Waldeck-Rousseau », garantit la liberté d'association en France. Elle permet à toute personne de créer librement une association à but non lucratif, sans autorisation préalable. Cette loi est considérée comme l'un des grands textes fondateurs de la République et a élevé la liberté d'association au rang de liberté fondamentale.",
  },

  // NAT — Géographie (8)
  {
    id: "ext-nat-025",
    category: "NAT",
    theme: "geographie",
    text: "Combien de départements compte la France (métropole et outre-mer) ?",
    choices: ["95", "96", "101", "110"],
    correctIndex: 2,
    explanation:
      "La France compte 101 départements, dont 96 en métropole et 5 en outre-mer : la Guadeloupe, la Martinique, la Guyane, La Réunion et Mayotte (créé en 2011). Les départements ont été créés à la Révolution française par la loi du 22 décembre 1789. Chaque département est administré par un conseil départemental dirigé par un président.",
  },
  {
    id: "ext-nat-026",
    category: "NAT",
    theme: "geographie",
    text: "Avec quel pays la France partage-t-elle la plus longue frontière terrestre ?",
    choices: ["L'Espagne", "L'Italie", "L'Allemagne", "Le Brésil"],
    correctIndex: 3,
    explanation:
      "La plus longue frontière terrestre de la France se trouve en Guyane française, avec le Brésil, sur environ 730 kilomètres. En métropole, la frontière la plus longue est avec l'Espagne (environ 650 km), suivie par la Belgique, l'Allemagne, l'Italie et la Suisse. Cette particularité vient du fait que la Guyane est un département français d'Amérique du Sud.",
  },
  {
    id: "ext-nat-027",
    category: "NAT",
    theme: "geographie",
    text: "Quelle est la superficie approximative de la France métropolitaine ?",
    choices: ["250 000 km²", "551 000 km²", "700 000 km²", "1 000 000 km²"],
    correctIndex: 1,
    explanation:
      "La France métropolitaine a une superficie d'environ 551 695 km², ce qui en fait le plus grand pays d'Europe occidentale. En incluant les territoires d'outre-mer, la France totale couvre environ 672 000 km². Cette étendue, combinée à ses vastes zones maritimes, lui confère la deuxième plus grande zone économique exclusive (ZEE) au monde après les États-Unis.",
  },
  {
    id: "ext-nat-028",
    category: "NAT",
    theme: "geographie",
    text: "Quelle mer sépare la France du Royaume-Uni ?",
    choices: ["La mer du Nord", "La Manche", "La mer Baltique", "La mer Méditerranée"],
    correctIndex: 1,
    explanation:
      "La Manche sépare la France du Royaume-Uni sur une distance d'environ 560 km. Dans sa partie la plus étroite, le pas de Calais, seulement 34 km séparent les deux pays. Un tunnel ferroviaire, le tunnel sous la Manche, a été inauguré en 1994 pour relier Coquelles en France à Folkestone au Royaume-Uni, permettant la liaison Eurostar.",
  },
  {
    id: "ext-nat-029",
    category: "NAT",
    theme: "geographie",
    text: "Quelle est la chaîne de montagnes qui sépare la France de l'Espagne ?",
    choices: ["Les Alpes", "Les Pyrénées", "Le Jura", "Le Massif central"],
    correctIndex: 1,
    explanation:
      "Les Pyrénées forment une chaîne de montagnes d'environ 430 km de long qui sépare la France de l'Espagne, de l'océan Atlantique à la mer Méditerranée. Leur point culminant côté français est le Pic Vignemale (3 298 m). La principauté d'Andorre, petit État indépendant, est nichée entre les deux pays au cœur de cette chaîne montagneuse.",
  },
  {
    id: "ext-nat-030",
    category: "NAT",
    theme: "geographie",
    text: "Dans quel océan se situe La Réunion ?",
    choices: ["Atlantique", "Pacifique", "Indien", "Arctique"],
    correctIndex: 2,
    explanation:
      "La Réunion est un département français d'outre-mer (DROM) situé dans l'océan Indien, à l'est de Madagascar. Son chef-lieu est Saint-Denis et sa superficie est d'environ 2 512 km². L'île abrite le volcan actif du Piton de la Fournaise et le Piton des Neiges (3 070 m), son point culminant. Elle est française depuis le XVIIe siècle.",
  },
  {
    id: "ext-nat-031",
    category: "NAT",
    theme: "geographie",
    text: "Quelle est la capitale de la région Nouvelle-Aquitaine ?",
    choices: ["Toulouse", "Bordeaux", "Nantes", "Poitiers"],
    correctIndex: 1,
    explanation:
      "Bordeaux est le chef-lieu de la région Nouvelle-Aquitaine, créée le 1er janvier 2016 par la fusion des anciennes régions Aquitaine, Limousin et Poitou-Charentes. Cette région est la plus vaste de France métropolitaine avec une superficie d'environ 84 000 km². Bordeaux est également connue pour son vignoble et son centre historique classé au patrimoine mondial de l'UNESCO.",
  },
  {
    id: "ext-nat-032",
    category: "NAT",
    theme: "geographie",
    text: "Quelle ville est surnommée la « capitale des Gaules » ?",
    choices: ["Paris", "Marseille", "Lyon", "Strasbourg"],
    correctIndex: 2,
    explanation:
      "Lyon, fondée en 43 av. J.-C. par les Romains sous le nom de Lugdunum, était la capitale des Trois Gaules sous l'Empire romain. Elle est aujourd'hui la troisième ville de France par sa population et le chef-lieu de la région Auvergne-Rhône-Alpes. Son centre historique (Vieux Lyon, Fourvière, Presqu'île) est inscrit au patrimoine mondial de l'UNESCO depuis 1998.",
  },

  // NAT — Culture (8)
  {
    id: "ext-nat-033",
    category: "NAT",
    theme: "culture",
    text: "Qui a composé les paroles de La Marseillaise ?",
    choices: ["Victor Hugo", "Claude Joseph Rouget de Lisle", "Hector Berlioz", "Charles Gounod"],
    correctIndex: 1,
    explanation:
      "Claude Joseph Rouget de Lisle, officier du génie et poète, a composé les paroles et la musique de La Marseillaise dans la nuit du 25 au 26 avril 1792 à Strasbourg. Elle fut d'abord appelée « Chant de guerre pour l'armée du Rhin », avant d'être popularisée par les volontaires marseillais. Elle est devenue hymne national par la loi du 14 février 1879.",
  },
  {
    id: "ext-nat-034",
    category: "NAT",
    theme: "culture",
    text: "Quelles sont les trois couleurs du drapeau français et leur ordre ?",
    choices: [
      "Rouge, blanc, bleu",
      "Bleu, blanc, rouge",
      "Blanc, bleu, rouge",
      "Bleu, rouge, blanc",
    ],
    correctIndex: 1,
    explanation:
      "Le drapeau français est un tricolore vertical composé, de la hampe au vent, de bleu, de blanc et de rouge. Le bleu et le rouge sont les couleurs de la ville de Paris, tandis que le blanc symbolise la monarchie. Adopté définitivement par la loi du 15 février 1794, il est consacré comme emblème national à l'article 2 de la Constitution de 1958.",
  },
  {
    id: "ext-nat-035",
    category: "NAT",
    theme: "culture",
    text: "Quel monument parisien a été construit pour l'Exposition universelle de 1889 ?",
    choices: ["L'Arc de Triomphe", "La tour Eiffel", "Le Sacré-Cœur", "Le Panthéon"],
    correctIndex: 1,
    explanation:
      "La tour Eiffel a été construite par l'ingénieur Gustave Eiffel pour l'Exposition universelle de 1889, qui célébrait le centenaire de la Révolution française. Haute de 330 mètres avec ses antennes, elle devait initialement être démontée après 20 ans, mais elle fut conservée grâce à son utilité comme antenne radio. Elle est aujourd'hui le monument payant le plus visité au monde.",
  },
  {
    id: "ext-nat-036",
    category: "NAT",
    theme: "culture",
    text: "Quel philosophe des Lumières a écrit « De l'esprit des lois » en 1748 ?",
    choices: ["Voltaire", "Jean-Jacques Rousseau", "Montesquieu", "Diderot"],
    correctIndex: 2,
    explanation:
      "Montesquieu (Charles-Louis de Secondat) a publié « De l'esprit des lois » en 1748, une œuvre majeure de la philosophie politique. Il y théorise notamment la séparation des pouvoirs en trois branches : législatif, exécutif et judiciaire. Cette idée a profondément influencé les constitutions démocratiques modernes, dont celle des États-Unis de 1787 et les constitutions françaises.",
  },
  {
    id: "ext-nat-037",
    category: "NAT",
    theme: "culture",
    text: "Quel prix prestigieux récompense la littérature française chaque année depuis 1903 ?",
    choices: ["Le prix Nobel", "Le prix Goncourt", "Le prix Pulitzer", "Le prix Renaudot"],
    correctIndex: 1,
    explanation:
      "Le prix Goncourt, décerné pour la première fois en 1903, est le plus prestigieux prix littéraire français. Il récompense chaque année en novembre « le meilleur ouvrage d'imagination en prose » publié dans l'année. Il est attribué par les dix membres de l'Académie Goncourt, qui se réunissent traditionnellement au restaurant Drouant à Paris. Sa récompense symbolique est de 10 euros.",
  },
  {
    id: "ext-nat-038",
    category: "NAT",
    theme: "culture",
    text: "Quel célèbre festival de cinéma se tient chaque année en mai dans le sud de la France ?",
    choices: ["Le Festival de Venise", "Le Festival de Cannes", "Le Festival de Berlin", "Le Festival de Deauville"],
    correctIndex: 1,
    explanation:
      "Le Festival de Cannes, créé en 1946, se tient chaque année au mois de mai au Palais des festivals de Cannes, sur la Côte d'Azur. Il est considéré comme le festival de cinéma le plus prestigieux au monde. Sa récompense suprême est la Palme d'or, décernée au meilleur film de la sélection officielle. Le festival accueille chaque année les plus grandes stars du cinéma international.",
  },
  {
    id: "ext-nat-039",
    category: "NAT",
    theme: "culture",
    text: "Quelle est la langue officielle de la République française selon la Constitution ?",
    choices: ["Le français", "Le français et l'anglais", "Le français et les langues régionales", "Aucune langue officielle"],
    correctIndex: 0,
    explanation:
      "L'article 2 de la Constitution, modifié par la loi constitutionnelle du 25 juin 1992, dispose que « la langue de la République est le français ». Cette disposition a été ajoutée notamment dans le contexte du traité de Maastricht. La loi Toubon du 4 août 1994 a ensuite renforcé l'usage obligatoire du français dans les documents publics, la publicité et le travail.",
  },
  {
    id: "ext-nat-040",
    category: "NAT",
    theme: "culture",
    text: "Où se trouve le tombeau de Napoléon Ier ?",
    choices: ["Au Panthéon", "Aux Invalides", "Au cimetière du Père-Lachaise", "À Fontainebleau"],
    correctIndex: 1,
    explanation:
      "Le tombeau de Napoléon Ier se trouve dans l'église du Dôme des Invalides à Paris, où ses cendres ont été transférées le 15 décembre 1840, près de vingt ans après sa mort à Sainte-Hélène. L'hôtel des Invalides, fondé par Louis XIV en 1670, abrite également un musée consacré à l'histoire militaire française. Son dôme doré est l'un des monuments emblématiques de Paris.",
  },

  // ============================================================
  // CSP — Carte de Séjour Pluriannuelle (40 questions)
  // ============================================================

  // CSP — Institutions (8)
  {
    id: "ext-csp-001",
    category: "CSP",
    theme: "institutions",
    text: "Quel est le rôle principal du Sénat ?",
    choices: [
      "Nommer le Président",
      "Voter la loi et représenter les collectivités territoriales",
      "Juger les crimes",
      "Commander l'armée",
    ],
    correctIndex: 1,
    explanation:
      "Le Sénat vote la loi conjointement avec l'Assemblée nationale et représente les collectivités territoriales de la République, comme le précise l'article 24 de la Constitution. Il est composé de 348 sénateurs élus pour six ans au suffrage universel indirect. En cas de désaccord entre les deux chambres, l'Assemblée nationale a le dernier mot sauf pour les lois constitutionnelles et organiques relatives au Sénat.",
  },
  {
    id: "ext-csp-002",
    category: "CSP",
    theme: "institutions",
    text: "Qu'est-ce qu'une motion de censure ?",
    choices: [
      "Un vote du peuple par référendum",
      "Un moyen pour l'Assemblée nationale de renverser le gouvernement",
      "Une décision du Conseil constitutionnel",
      "Un décret présidentiel",
    ],
    correctIndex: 1,
    explanation:
      "La motion de censure est prévue par l'article 49 de la Constitution et permet à l'Assemblée nationale de renverser le gouvernement. Elle doit être signée par au moins un dixième des députés et n'est adoptée qu'à la majorité absolue des membres de l'Assemblée. Si elle est votée, le Premier ministre doit remettre la démission de son gouvernement au Président de la République.",
  },
  {
    id: "ext-csp-003",
    category: "CSP",
    theme: "institutions",
    text: "Qui est le chef des armées en France ?",
    choices: ["Le Premier ministre", "Le Président de la République", "Le ministre des Armées", "Le chef d'état-major"],
    correctIndex: 1,
    explanation:
      "Le Président de la République est le chef des armées selon l'article 15 de la Constitution. Il préside les conseils et comités supérieurs de la Défense nationale et détient le feu nucléaire. Le ministre des Armées, sous son autorité et celle du Premier ministre, est chargé de la mise en œuvre de la politique de défense. Cette fonction fait du Président le garant de l'indépendance nationale.",
  },
  {
    id: "ext-csp-004",
    category: "CSP",
    theme: "institutions",
    text: "Qu'est-ce qu'un référendum ?",
    choices: [
      "Une élection parlementaire",
      "Une consultation directe des citoyens sur une question",
      "Un vote au Parlement",
      "Un sondage d'opinion",
    ],
    correctIndex: 1,
    explanation:
      "Le référendum est une procédure par laquelle les citoyens sont consultés directement pour approuver ou rejeter un texte de loi ou une décision politique majeure. En France, il est prévu par l'article 11 de la Constitution. Des référendums célèbres incluent celui de 1958 (adoption de la Constitution), 1962 (élection du Président au suffrage universel) et 2005 (rejet de la Constitution européenne).",
  },
  {
    id: "ext-csp-005",
    category: "CSP",
    theme: "institutions",
    text: "Qui nomme les ministres du gouvernement ?",
    choices: [
      "Le Premier ministre seul",
      "Le Président de la République sur proposition du Premier ministre",
      "L'Assemblée nationale",
      "Les citoyens par référendum",
    ],
    correctIndex: 1,
    explanation:
      "Selon l'article 8 de la Constitution, le Président de la République nomme les autres membres du gouvernement sur proposition du Premier ministre, et met fin à leurs fonctions dans les mêmes conditions. Le Premier ministre est lui-même nommé directement par le Président. Cette nomination est une des attributions importantes du chef de l'État dans la Ve République.",
  },
  {
    id: "ext-csp-006",
    category: "CSP",
    theme: "institutions",
    text: "Quelle est la juridiction suprême de l'ordre judiciaire en France ?",
    choices: ["Le Conseil d'État", "La Cour de cassation", "Le Conseil constitutionnel", "La Cour des comptes"],
    correctIndex: 1,
    explanation:
      "La Cour de cassation, située au palais de justice de Paris, est la plus haute juridiction de l'ordre judiciaire français. Elle veille au respect de la loi par les tribunaux et cours d'appel, mais ne rejuge pas les faits. Le Conseil d'État est, lui, la juridiction suprême de l'ordre administratif. Cette séparation des deux ordres (judiciaire et administratif) est caractéristique du droit français.",
  },
  {
    id: "ext-csp-007",
    category: "CSP",
    theme: "institutions",
    text: "Quel texte organise la décentralisation en France ?",
    choices: [
      "La loi de 1905",
      "La loi Defferre du 2 mars 1982",
      "La loi Taubira",
      "La loi Veil",
    ],
    correctIndex: 1,
    explanation:
      "La loi Defferre du 2 mars 1982, dite « loi relative aux droits et libertés des communes, des départements et des régions », marque le début de la décentralisation en France. Elle transfère des compétences de l'État aux collectivités territoriales et supprime la tutelle administrative. La révision constitutionnelle du 28 mars 2003 a ensuite inscrit l'organisation décentralisée de la République dans la Constitution.",
  },
  {
    id: "ext-csp-008",
    category: "CSP",
    theme: "institutions",
    text: "Qui peut proposer une loi en France ?",
    choices: [
      "Le Président seul",
      "Le Premier ministre et les parlementaires",
      "Les juges uniquement",
      "Les citoyens par pétition",
    ],
    correctIndex: 1,
    explanation:
      "En France, l'initiative des lois appartient au Premier ministre (on parle alors de « projet de loi ») et aux membres du Parlement, c'est-à-dire députés et sénateurs (on parle alors de « proposition de loi »), selon l'article 39 de la Constitution. Depuis la réforme de 2008, un référendum d'initiative partagée est également possible, sous des conditions strictes.",
  },

  // CSP — Histoire (8)
  {
    id: "ext-csp-009",
    category: "CSP",
    theme: "histoire",
    text: "Qui était Napoléon Bonaparte ?",
    choices: [
      "Un roi de France",
      "Un empereur des Français",
      "Un président de la République",
      "Un ministre de Louis XVI",
    ],
    correctIndex: 1,
    explanation:
      "Napoléon Bonaparte (1769-1821) s'est fait proclamer empereur des Français le 2 décembre 1804 sous le nom de Napoléon Ier, inaugurant le Premier Empire. Il a réformé profondément la France en créant notamment le Code civil (1804), les lycées et la Banque de France. Il a été définitivement vaincu à Waterloo en 1815 et exilé sur l'île de Sainte-Hélène, où il est mort.",
  },
  {
    id: "ext-csp-010",
    category: "CSP",
    theme: "histoire",
    text: "Quel événement a eu lieu le 6 juin 1944 ?",
    choices: [
      "La libération de Paris",
      "Le débarquement de Normandie",
      "L'armistice",
      "L'appel du général de Gaulle",
    ],
    correctIndex: 1,
    explanation:
      "Le 6 juin 1944, appelé « D-Day » ou « Jour J », les forces alliées ont débarqué sur les plages de Normandie (Utah, Omaha, Gold, Juno et Sword Beach). Cette opération Overlord, la plus grande opération amphibie de l'histoire, a marqué le début de la libération de l'Europe occupée. Paris a été libérée le 25 août 1944, précédant la capitulation allemande du 8 mai 1945.",
  },
  {
    id: "ext-csp-011",
    category: "CSP",
    theme: "histoire",
    text: "En quelle année la Ve République a-t-elle été instaurée ?",
    choices: ["1944", "1946", "1958", "1962"],
    correctIndex: 2,
    explanation:
      "La Ve République a été instaurée par la Constitution du 4 octobre 1958, adoptée par référendum le 28 septembre 1958 avec près de 80 % de « oui ». Elle fait suite à la crise algérienne et met fin à la IVe République (1946-1958). Elle instaure un régime semi-présidentiel qui renforce les pouvoirs du Président de la République, alors incarné par Charles de Gaulle.",
  },
  {
    id: "ext-csp-012",
    category: "CSP",
    theme: "histoire",
    text: "Quelle était la fonction de Jean Moulin pendant la Seconde Guerre mondiale ?",
    choices: [
      "Ministre de Vichy",
      "Résistant et unificateur de la Résistance intérieure",
      "Général allié",
      "Président en exil",
    ],
    correctIndex: 1,
    explanation:
      "Jean Moulin (1899-1943) fut un résistant français, envoyé par le général de Gaulle en France pour unifier les mouvements de Résistance intérieure. Il présida la première réunion du Conseil national de la Résistance (CNR) le 27 mai 1943 à Paris. Arrêté à Caluire le 21 juin 1943, il mourut sous la torture de la Gestapo. Ses cendres ont été transférées au Panthéon le 19 décembre 1964.",
  },
  {
    id: "ext-csp-013",
    category: "CSP",
    theme: "histoire",
    text: "Quelle guerre a opposé la France à l'Algérie de 1954 à 1962 ?",
    choices: [
      "La guerre d'Indochine",
      "La guerre d'Algérie",
      "La guerre du Rif",
      "La guerre de Suez",
    ],
    correctIndex: 1,
    explanation:
      "La guerre d'Algérie s'est déroulée de 1954 à 1962 entre la France et les indépendantistes algériens du FLN (Front de libération nationale). Elle s'est conclue par les accords d'Évian signés le 18 mars 1962, menant à l'indépendance de l'Algérie le 5 juillet 1962. Ce conflit a provoqué la chute de la IVe République et a marqué la fin de l'empire colonial français.",
  },
  {
    id: "ext-csp-014",
    category: "CSP",
    theme: "histoire",
    text: "Qui a été la première femme élue à l'Académie française ?",
    choices: ["Simone de Beauvoir", "Marguerite Yourcenar", "Colette", "Simone Veil"],
    correctIndex: 1,
    explanation:
      "Marguerite Yourcenar (1903-1987) fut la première femme élue à l'Académie française, le 6 mars 1980, après plus de trois siècles d'existence exclusivement masculine de l'institution fondée par Richelieu en 1635. Elle y occupait le fauteuil n°3. Auteure des célèbres « Mémoires d'Hadrien » (1951), elle a bouleversé une tradition séculaire avec son élection historique.",
  },
  {
    id: "ext-csp-015",
    category: "CSP",
    theme: "histoire",
    text: "Qui a dirigé le Gouvernement provisoire de la République française après la Libération ?",
    choices: ["Léon Blum", "Charles de Gaulle", "Vincent Auriol", "Pierre Mendès France"],
    correctIndex: 1,
    explanation:
      "Charles de Gaulle a dirigé le Gouvernement provisoire de la République française (GPRF) de juin 1944 à janvier 1946. Ce gouvernement a restauré la légalité républicaine après l'occupation nazie et le régime de Vichy. Il a notamment instauré le droit de vote des femmes en avril 1944, la Sécurité sociale en octobre 1945 et nationalisé plusieurs grandes entreprises et banques.",
  },
  {
    id: "ext-csp-016",
    category: "CSP",
    theme: "histoire",
    text: "Quelle loi a institué la Sécurité sociale en France ?",
    choices: [
      "La loi de 1898",
      "Les ordonnances d'octobre 1945",
      "La loi de 1958",
      "La loi de 1981",
    ],
    correctIndex: 1,
    explanation:
      "La Sécurité sociale a été créée par les ordonnances des 4 et 19 octobre 1945, sous le Gouvernement provisoire dirigé par Charles de Gaulle. Inspirée du programme du Conseil national de la Résistance (CNR) de 1944, elle généralise la protection contre la maladie, la vieillesse, la maternité et les accidents du travail. Ambroise Croizat, ministre communiste du Travail, en a été l'un des grands artisans.",
  },

  // CSP — Valeurs (8)
  {
    id: "ext-csp-017",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est le principe fondamental du Code civil français concernant le mariage ?",
    choices: [
      "Il est religieux obligatoirement",
      "Il est civil et laïque",
      "Il est réservé aux Français",
      "Il nécessite l'accord du maire seulement",
    ],
    correctIndex: 1,
    explanation:
      "Le mariage civil en France est un acte juridique célébré obligatoirement devant un officier d'état civil (le maire ou un adjoint) à la mairie. Institué par la loi du 20 septembre 1792, il est totalement distinct du mariage religieux. Depuis la loi Taubira du 17 mai 2013, le mariage est ouvert aux couples de même sexe. La célébration religieuse, si elle a lieu, doit toujours être postérieure au mariage civil.",
  },
  {
    id: "ext-csp-018",
    category: "CSP",
    theme: "valeurs",
    text: "Quel texte consacre le droit à l'environnement en France ?",
    choices: [
      "La Charte de l'environnement de 2004",
      "La loi de 1905",
      "La Constitution de 1946",
      "La DDHC de 1789",
    ],
    correctIndex: 0,
    explanation:
      "La Charte de l'environnement, adoptée par la loi constitutionnelle du 1er mars 2005, est intégrée au préambule de la Constitution. Elle reconnaît à chacun le droit de vivre dans un environnement équilibré et respectueux de la santé, ainsi que le devoir de prendre part à sa préservation. Elle consacre également le principe de précaution en matière environnementale à valeur constitutionnelle.",
  },
  {
    id: "ext-csp-019",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle loi a légalisé l'interruption volontaire de grossesse (IVG) en France ?",
    choices: [
      "La loi Neuwirth de 1967",
      "La loi Veil de 1975",
      "La loi Taubira de 2013",
      "La loi Badinter de 1981",
    ],
    correctIndex: 1,
    explanation:
      "La loi Veil, du 17 janvier 1975, a légalisé l'interruption volontaire de grossesse (IVG) en France. Elle a été portée par Simone Veil, alors ministre de la Santé sous la présidence de Valéry Giscard d'Estaing. En mars 2024, la France est devenue le premier pays au monde à inscrire la liberté de recourir à l'IVG dans sa Constitution (article 34).",
  },
  {
    id: "ext-csp-020",
    category: "CSP",
    theme: "valeurs",
    text: "Qu'est-ce que le PACS ?",
    choices: [
      "Un contrat de travail",
      "Un pacte civil de solidarité entre deux personnes majeures",
      "Un régime fiscal spécial",
      "Une assurance santé",
    ],
    correctIndex: 1,
    explanation:
      "Le Pacte civil de solidarité (PACS) est un contrat conclu entre deux personnes majeures, de sexe différent ou de même sexe, pour organiser leur vie commune. Il a été instauré par la loi du 15 novembre 1999. Il offre des droits intermédiaires entre le concubinage et le mariage, notamment en matière fiscale et sociale. Il peut être enregistré en mairie depuis 2017.",
  },
  {
    id: "ext-csp-021",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle est la durée légale hebdomadaire du travail en France ?",
    choices: ["32 heures", "35 heures", "39 heures", "40 heures"],
    correctIndex: 1,
    explanation:
      "La durée légale du travail en France est fixée à 35 heures hebdomadaires depuis les lois Aubry du 13 juin 1998 et du 19 janvier 2000. Cette durée est un seuil au-delà duquel s'appliquent les heures supplémentaires, majorées. Avant cette réforme, la durée légale était de 39 heures, fixée par une ordonnance du 16 janvier 1982 sous la présidence de François Mitterrand.",
  },
  {
    id: "ext-csp-022",
    category: "CSP",
    theme: "valeurs",
    text: "Qu'est-ce que le SMIC ?",
    choices: [
      "Un impôt sur le revenu",
      "Le salaire minimum interprofessionnel de croissance",
      "Un syndicat ouvrier",
      "Une aide au logement",
    ],
    correctIndex: 1,
    explanation:
      "Le SMIC (Salaire minimum interprofessionnel de croissance) est le salaire horaire minimum légal en dessous duquel aucun salarié majeur ne peut être rémunéré en France. Il a été créé par la loi du 2 janvier 1970, remplaçant le SMIG de 1950. Il est revalorisé chaque année au 1er janvier, et peut l'être en cours d'année en cas de forte inflation. Son montant est fixé par décret.",
  },
  {
    id: "ext-csp-023",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle institution française lutte contre les discriminations ?",
    choices: [
      "Le Défenseur des droits",
      "Le Conseil supérieur de l'audiovisuel",
      "La Cour des comptes",
      "Le Conseil économique, social et environnemental",
    ],
    correctIndex: 0,
    explanation:
      "Le Défenseur des droits, créé par la révision constitutionnelle du 23 juillet 2008, est chargé notamment de lutter contre les discriminations prohibées par la loi ou par les engagements internationaux de la France. Il a succédé à la HALDE (Haute Autorité de lutte contre les discriminations et pour l'égalité) en 2011. Il est saisi gratuitement et directement par toute personne.",
  },
  {
    id: "ext-csp-024",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est le principe de présomption d'innocence ?",
    choices: [
      "Tout accusé est coupable jusqu'à preuve du contraire",
      "Toute personne est présumée innocente tant que sa culpabilité n'a pas été établie",
      "Les étrangers sont présumés innocents",
      "Seuls les citoyens sont présumés innocents",
    ],
    correctIndex: 1,
    explanation:
      "La présomption d'innocence est un principe fondamental selon lequel toute personne suspectée ou poursuivie est présumée innocente tant que sa culpabilité n'a pas été établie par un jugement définitif. Ce principe figure à l'article 9 de la Déclaration des droits de l'homme et du citoyen de 1789, ainsi qu'à l'article préliminaire du Code de procédure pénale et dans la Convention européenne des droits de l'homme.",
  },

  // CSP — Géographie (8)
  {
    id: "ext-csp-025",
    category: "CSP",
    theme: "geographie",
    text: "Quelle est la deuxième ville de France par sa population ?",
    choices: ["Lyon", "Marseille", "Toulouse", "Bordeaux"],
    correctIndex: 1,
    explanation:
      "Marseille est la deuxième ville de France par sa population avec environ 870 000 habitants intra-muros. Elle est chef-lieu du département des Bouches-du-Rhône et de la région Provence-Alpes-Côte d'Azur. Fondée vers 600 avant J.-C. par les Grecs de Phocée sous le nom de Massalia, c'est la plus ancienne ville de France. Son grand port est le premier port de Méditerranée.",
  },
  {
    id: "ext-csp-026",
    category: "CSP",
    theme: "geographie",
    text: "Quel fleuve traverse Paris ?",
    choices: ["La Loire", "La Seine", "Le Rhône", "La Garonne"],
    correctIndex: 1,
    explanation:
      "La Seine traverse Paris d'est en ouest sur environ 13 km, séparant la ville en rive gauche et rive droite. Longue de 777 km, elle prend sa source en Côte-d'Or près de Dijon et se jette dans la Manche au Havre. Ses rives parisiennes sont inscrites au patrimoine mondial de l'UNESCO depuis 1991. Elle compte 37 ponts à Paris, dont le célèbre Pont-Neuf.",
  },
  {
    id: "ext-csp-027",
    category: "CSP",
    theme: "geographie",
    text: "Où se situe la Corse ?",
    choices: [
      "Dans l'océan Atlantique",
      "Dans la mer Méditerranée",
      "Dans la Manche",
      "Dans l'océan Indien",
    ],
    correctIndex: 1,
    explanation:
      "La Corse est une île française située dans la mer Méditerranée, au sud-est de la France continentale et au nord de la Sardaigne italienne. Elle est devenue française en 1768, avec le traité de Versailles signé entre la République de Gênes et le royaume de France. Napoléon Bonaparte y est né à Ajaccio en 1769. Elle constitue une collectivité territoriale à statut particulier.",
  },
  {
    id: "ext-csp-028",
    category: "CSP",
    theme: "geographie",
    text: "Quel océan borde la côte ouest de la France métropolitaine ?",
    choices: ["L'océan Pacifique", "L'océan Atlantique", "L'océan Indien", "L'océan Arctique"],
    correctIndex: 1,
    explanation:
      "L'océan Atlantique borde la façade ouest de la France métropolitaine, de la Bretagne au nord jusqu'au Pays basque au sud. Cette façade maritime s'étend sur plusieurs grandes régions : Bretagne, Pays de la Loire et Nouvelle-Aquitaine. Elle comprend notamment le golfe de Gascogne. De grands ports comme Nantes-Saint-Nazaire, La Rochelle ou Bordeaux sont situés sur cette façade.",
  },
  {
    id: "ext-csp-029",
    category: "CSP",
    theme: "geographie",
    text: "Quelle est la capitale de la région Auvergne-Rhône-Alpes ?",
    choices: ["Clermont-Ferrand", "Grenoble", "Lyon", "Saint-Étienne"],
    correctIndex: 2,
    explanation:
      "Lyon est le chef-lieu de la région Auvergne-Rhône-Alpes, créée au 1er janvier 2016 par la fusion des anciennes régions Auvergne et Rhône-Alpes. Avec environ 8 millions d'habitants, elle est la deuxième région la plus peuplée de France après l'Île-de-France. Elle borde la Suisse et l'Italie et abrite une grande partie des Alpes françaises, dont le Mont Blanc.",
  },
  {
    id: "ext-csp-030",
    category: "CSP",
    theme: "geographie",
    text: "Combien y a-t-il de fuseaux horaires en France (avec l'outre-mer) ?",
    choices: ["3", "7", "12", "15"],
    correctIndex: 2,
    explanation:
      "La France, avec ses territoires d'outre-mer, couvre 12 fuseaux horaires, ce qui en fait le pays avec le plus grand nombre de fuseaux horaires au monde. Cela s'explique par la dispersion géographique de ses territoires, allant de la Polynésie française à l'ouest jusqu'à la Nouvelle-Calédonie dans le Pacifique sud. La métropole, elle, est sur le fuseau UTC+1 (heure d'hiver).",
  },
  {
    id: "ext-csp-031",
    category: "CSP",
    theme: "geographie",
    text: "Quel massif montagneux se trouve au centre de la France ?",
    choices: ["Les Pyrénées", "Le Jura", "Le Massif central", "Les Vosges"],
    correctIndex: 2,
    explanation:
      "Le Massif central est un vaste massif montagneux situé au centre-sud de la France, couvrant environ 85 000 km² sur une quinzaine de départements. Son point culminant est le Puy de Sancy à 1 886 mètres dans le Puy-de-Dôme. Il est caractérisé par un relief volcanique ancien, notamment la chaîne des Puys, inscrite au patrimoine mondial de l'UNESCO depuis 2018.",
  },
  {
    id: "ext-csp-032",
    category: "CSP",
    theme: "geographie",
    text: "Quel département porte le numéro 75 ?",
    choices: ["Paris", "Les Hauts-de-Seine", "Le Rhône", "Les Bouches-du-Rhône"],
    correctIndex: 0,
    explanation:
      "Le département de Paris porte le numéro 75, correspondant à son rang alphabétique historique parmi les anciens départements. Paris est une collectivité à statut particulier depuis le 1er janvier 2019, exerçant à la fois les compétences d'une commune et d'un département. Elle compte environ 2,1 millions d'habitants intra-muros et constitue le cœur de la région Île-de-France.",
  },

  // CSP — Culture (8)
  {
    id: "ext-csp-033",
    category: "CSP",
    theme: "culture",
    text: "Quel écrivain français a reçu le prix Nobel de littérature en 1957 ?",
    choices: ["Jean-Paul Sartre", "Albert Camus", "André Gide", "François Mauriac"],
    correctIndex: 1,
    explanation:
      "Albert Camus a reçu le prix Nobel de littérature en 1957, à l'âge de 44 ans, ce qui en fait l'un des plus jeunes lauréats. Il est notamment l'auteur de « L'Étranger » (1942), « La Peste » (1947) et « Le Mythe de Sisyphe ». Jean-Paul Sartre a aussi obtenu le prix Nobel de littérature en 1964, mais l'a refusé, devenant le seul écrivain à avoir décliné cette distinction volontairement.",
  },
  {
    id: "ext-csp-034",
    category: "CSP",
    theme: "culture",
    text: "Quel peintre français est considéré comme l'un des fondateurs de l'impressionnisme ?",
    choices: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Salvador Dalí"],
    correctIndex: 1,
    explanation:
      "Claude Monet (1840-1926) est l'un des pères fondateurs du mouvement impressionniste. Son tableau « Impression, soleil levant » (1872), exposé en 1874, a donné son nom au mouvement. Il est également célèbre pour ses séries sur la cathédrale de Rouen, les meules de foin et surtout les Nymphéas, peintes dans son jardin de Giverny. Son œuvre est exposée notamment au musée de l'Orangerie à Paris.",
  },
  {
    id: "ext-csp-035",
    category: "CSP",
    theme: "culture",
    text: "Quel célèbre sculpteur français a réalisé « Le Penseur » ?",
    choices: ["Auguste Rodin", "Antoine Bourdelle", "Aristide Maillol", "Camille Claudel"],
    correctIndex: 0,
    explanation:
      "Auguste Rodin (1840-1917) est l'auteur de la célèbre sculpture « Le Penseur », initialement conçue comme partie de l'œuvre monumentale « La Porte de l'Enfer » commandée en 1880. L'œuvre représentait à l'origine le poète Dante Alighieri. Rodin est également connu pour « Le Baiser » et « Les Bourgeois de Calais ». Le musée Rodin à Paris, dans l'hôtel Biron, lui est entièrement consacré.",
  },
  {
    id: "ext-csp-036",
    category: "CSP",
    theme: "culture",
    text: "Quelle cathédrale parisienne, endommagée par un incendie en 2019, est un chef-d'œuvre gothique ?",
    choices: [
      "La cathédrale de Reims",
      "Notre-Dame de Paris",
      "La cathédrale de Chartres",
      "La cathédrale d'Amiens",
    ],
    correctIndex: 1,
    explanation:
      "Notre-Dame de Paris, cathédrale gothique située sur l'île de la Cité, a été construite entre 1163 et 1345. Elle a été gravement endommagée par un incendie le 15 avril 2019 qui a détruit sa flèche et sa toiture. Les travaux de restauration ont permis sa réouverture en décembre 2024. Elle est célèbre notamment grâce au roman de Victor Hugo « Notre-Dame de Paris » (1831).",
  },
  {
    id: "ext-csp-037",
    category: "CSP",
    theme: "culture",
    text: "Quel compositeur français est connu pour « Clair de lune » et « La Mer » ?",
    choices: ["Maurice Ravel", "Claude Debussy", "Hector Berlioz", "Camille Saint-Saëns"],
    correctIndex: 1,
    explanation:
      "Claude Debussy (1862-1918) est l'un des compositeurs français les plus influents, considéré comme le père de la musique impressionniste. Il a composé « Clair de lune » (extrait de la Suite bergamasque, 1905) et la célèbre œuvre orchestrale « La Mer » (1905). Son opéra « Pelléas et Mélisande » et son « Prélude à l'après-midi d'un faune » figurent parmi ses œuvres majeures.",
  },
  {
    id: "ext-csp-038",
    category: "CSP",
    theme: "culture",
    text: "Quel événement sportif annuel parcourt la France en juillet ?",
    choices: [
      "Le Tour de France cycliste",
      "Roland-Garros",
      "Le marathon de Paris",
      "Les 24 Heures du Mans",
    ],
    correctIndex: 0,
    explanation:
      "Le Tour de France cycliste est une course à étapes disputée chaque année en juillet depuis 1903, à l'initiative du journal L'Auto. Elle s'étend sur environ trois semaines et parcourt approximativement 3 500 kilomètres à travers la France. Le maillot jaune récompense le leader du classement général. L'arrivée a traditionnellement lieu sur les Champs-Élysées à Paris.",
  },
  {
    id: "ext-csp-039",
    category: "CSP",
    theme: "culture",
    text: "Quelle académie, fondée en 1635 par le cardinal de Richelieu, veille sur la langue française ?",
    choices: [
      "L'Académie des sciences",
      "L'Académie française",
      "L'Académie des beaux-arts",
      "L'Académie nationale de médecine",
    ],
    correctIndex: 1,
    explanation:
      "L'Académie française a été fondée en 1635 par le cardinal de Richelieu sous le règne de Louis XIII. Composée de 40 membres élus à vie, surnommés les « Immortels », elle a pour mission de fixer la langue française et de veiller à sa pureté. Elle publie notamment le Dictionnaire de l'Académie française. Ses membres se réunissent sous la Coupole de l'Institut de France à Paris.",
  },
  {
    id: "ext-csp-040",
    category: "CSP",
    theme: "culture",
    text: "Quel grand auteur français du XVIIe siècle est connu pour ses comédies comme « Le Malade imaginaire » ?",
    choices: ["Pierre Corneille", "Jean Racine", "Molière", "Jean de La Fontaine"],
    correctIndex: 2,
    explanation:
      "Molière, de son vrai nom Jean-Baptiste Poquelin (1622-1673), est l'un des plus grands dramaturges de la littérature française. Il est l'auteur de comédies célèbres comme « Tartuffe » (1664), « Dom Juan » (1665), « L'Avare » (1668) et « Le Malade imaginaire » (1673). Il est mort quelques heures après une représentation de cette dernière pièce. La Comédie-Française est aussi appelée « la maison de Molière ».",
  },

  // ============================================================
  // CR — Carte de Résident (40 questions)
  // ============================================================

  // CR — Institutions (8)
  {
    id: "ext-cr-001",
    category: "CR",
    theme: "institutions",
    text: "Qu'est-ce que l'Union européenne ?",
    choices: [
      "Une alliance militaire",
      "Une union économique et politique de pays européens",
      "Une entreprise multinationale",
      "Une association sportive",
    ],
    correctIndex: 1,
    explanation:
      "L'Union européenne (UE) est une union économique et politique regroupant 27 États membres depuis le retrait du Royaume-Uni en 2020. Elle a été créée par le traité de Maastricht du 7 février 1992, entré en vigueur le 1er novembre 1993. La France est membre fondateur depuis les origines en 1957. Ses institutions principales sont le Parlement européen, le Conseil européen et la Commission européenne.",
  },
  {
    id: "ext-cr-002",
    category: "CR",
    theme: "institutions",
    text: "Quelle est la monnaie officielle de la France depuis 2002 ?",
    choices: ["Le franc", "L'euro", "Le dollar", "La livre"],
    correctIndex: 1,
    explanation:
      "L'euro est la monnaie officielle de la France depuis le 1er janvier 2002 pour les pièces et billets, bien qu'il existe en monnaie scripturale depuis le 1er janvier 1999. Il a remplacé le franc au taux de 1 euro = 6,55957 francs. L'euro est la monnaie commune de 20 pays de l'Union européenne, formant la « zone euro ». La Banque centrale européenne (BCE), située à Francfort, émet la monnaie.",
  },
  {
    id: "ext-cr-003",
    category: "CR",
    theme: "institutions",
    text: "Qui élit le maire d'une commune en France ?",
    choices: [
      "Le Préfet",
      "Les habitants directement",
      "Le conseil municipal parmi ses membres",
      "Le Président de la République",
    ],
    correctIndex: 2,
    explanation:
      "Le maire est élu par les conseillers municipaux parmi eux, lors de la première séance du conseil municipal suivant les élections municipales. Les conseillers municipaux sont eux-mêmes élus par les habitants de la commune au suffrage universel direct pour six ans. Le maire est à la fois agent de l'État (officier d'état civil, officier de police judiciaire) et exécutif de la commune.",
  },
  {
    id: "ext-cr-004",
    category: "CR",
    theme: "institutions",
    text: "Qu'est-ce qu'une préfecture ?",
    choices: [
      "Une entreprise privée",
      "Une représentation de l'État dans un département",
      "Un hôpital public",
      "Une école de police",
    ],
    correctIndex: 1,
    explanation:
      "Une préfecture est le siège administratif d'un département en France, dirigé par un préfet nommé par décret du Président de la République en Conseil des ministres. Le préfet représente l'État et le gouvernement dans le département, et assure le contrôle de légalité des actes des collectivités territoriales. Les préfectures ont été créées par Napoléon Bonaparte en 1800 par la loi du 28 pluviôse an VIII.",
  },
  {
    id: "ext-cr-005",
    category: "CR",
    theme: "institutions",
    text: "Quelle est la durée d'un mandat municipal en France ?",
    choices: ["3 ans", "5 ans", "6 ans", "7 ans"],
    correctIndex: 2,
    explanation:
      "Les conseillers municipaux et les maires sont élus pour un mandat de six ans en France. Les élections municipales ont lieu la même année dans toutes les communes, simultanément. Le maire et ses adjoints sont ensuite élus par les conseillers municipaux lors de leur première séance. Ce mandat municipal est l'un des plus longs parmi les mandats électifs français.",
  },
  {
    id: "ext-cr-006",
    category: "CR",
    theme: "institutions",
    text: "Qu'est-ce que le Conseil économique, social et environnemental (CESE) ?",
    choices: [
      "Une chambre du Parlement",
      "Une assemblée consultative représentant la société civile",
      "Un tribunal administratif",
      "Une banque publique",
    ],
    correctIndex: 1,
    explanation:
      "Le Conseil économique, social et environnemental (CESE) est la troisième assemblée constitutionnelle française, prévue à l'article 69 de la Constitution. C'est une assemblée consultative qui représente la société civile organisée (syndicats, associations, entreprises) et conseille le gouvernement et le Parlement sur les projets de loi à caractère économique, social ou environnemental. Il siège au palais d'Iéna à Paris.",
  },
  {
    id: "ext-cr-007",
    category: "CR",
    theme: "institutions",
    text: "Que fait la Cour des comptes ?",
    choices: [
      "Elle juge les crimes",
      "Elle contrôle l'utilisation des fonds publics",
      "Elle nomme les ministres",
      "Elle vote les lois",
    ],
    correctIndex: 1,
    explanation:
      "La Cour des comptes est une juridiction financière française chargée de contrôler la régularité des comptes publics et le bon emploi des fonds publics. Créée par Napoléon Ier le 16 septembre 1807, elle publie chaque année un rapport public très attendu. Elle siège au palais Cambon à Paris. Son premier président est traditionnellement un haut magistrat, et le statut de ses membres garantit leur indépendance.",
  },
  {
    id: "ext-cr-008",
    category: "CR",
    theme: "institutions",
    text: "Qui peut dissoudre l'Assemblée nationale ?",
    choices: [
      "Le Premier ministre",
      "Le Président de la République",
      "Le président de l'Assemblée",
      "Le Conseil constitutionnel",
    ],
    correctIndex: 1,
    explanation:
      "Le Président de la République a le pouvoir de dissoudre l'Assemblée nationale selon l'article 12 de la Constitution, après consultation du Premier ministre et des présidents des deux chambres. Cette dissolution entraîne la tenue d'élections législatives dans les 20 à 40 jours suivants. Une nouvelle dissolution ne peut intervenir dans l'année qui suit ces élections. Charles de Gaulle a été le premier à utiliser ce pouvoir en 1962.",
  },

  // CR — Histoire (8)
  {
    id: "ext-cr-009",
    category: "CR",
    theme: "histoire",
    text: "Quel roi français est surnommé le « Roi-Soleil » ?",
    choices: ["Louis XIII", "Louis XIV", "Louis XV", "Louis XVI"],
    correctIndex: 1,
    explanation:
      "Louis XIV (1638-1715), surnommé le « Roi-Soleil », a régné sur la France pendant 72 ans, de 1643 à 1715, ce qui constitue le plus long règne de l'histoire française. Il a établi une monarchie absolue de droit divin et fait construire le château de Versailles, où la cour s'est installée en 1682. Il est notamment célèbre pour avoir révoqué l'édit de Nantes en 1685.",
  },
  {
    id: "ext-cr-010",
    category: "CR",
    theme: "histoire",
    text: "Quel roi mérovingien a unifié les royaumes francs au VIe siècle et s'est converti au christianisme ?",
    choices: ["Charlemagne", "Clovis", "Hugues Capet", "Dagobert"],
    correctIndex: 1,
    explanation:
      "Clovis Ier (466-511) est considéré comme le fondateur du royaume des Francs. Il a remporté la bataille de Soissons en 486 et a unifié les royaumes francs. Il s'est converti au christianisme et a été baptisé à Reims vers 496 par l'évêque Remi, événement fondateur qui liera durablement la France à l'Église catholique. Il a installé sa capitale à Paris en 508.",
  },
  {
    id: "ext-cr-011",
    category: "CR",
    theme: "histoire",
    text: "Quel empereur a été couronné à Reims en l'an 800 ?",
    choices: ["Clovis", "Charlemagne", "Philippe Auguste", "Saint Louis"],
    correctIndex: 1,
    explanation:
      "Charlemagne (742-814) a été couronné empereur d'Occident par le pape Léon III, non pas à Reims mais à Rome, le 25 décembre de l'an 800. Il a reconstitué un vaste empire qui préfigurait l'Europe médiévale. Il est considéré comme un des pères de l'Europe pour avoir unifié une grande partie de ce territoire. En France, il est souvent associé au développement de l'école sous son règne.",
  },
  {
    id: "ext-cr-012",
    category: "CR",
    theme: "histoire",
    text: "Qui était Jeanne d'Arc ?",
    choices: [
      "Une reine de France",
      "Une paysanne qui a libéré Orléans en 1429",
      "Une artiste de la Renaissance",
      "Une femme politique moderne",
    ],
    correctIndex: 1,
    explanation:
      "Jeanne d'Arc (vers 1412-1431), dite la « Pucelle d'Orléans », est une figure emblématique de l'histoire de France. Jeune paysanne lorraine, elle a contribué à lever le siège d'Orléans le 8 mai 1429 pendant la guerre de Cent Ans et à faire sacrer Charles VII à Reims. Capturée par les Bourguignons et livrée aux Anglais, elle a été brûlée vive à Rouen le 30 mai 1431. Elle fut canonisée en 1920.",
  },
  {
    id: "ext-cr-013",
    category: "CR",
    theme: "histoire",
    text: "Quelle bataille de 1415 fut une lourde défaite française contre les Anglais ?",
    choices: ["Bouvines", "Azincourt", "Marignan", "Austerlitz"],
    correctIndex: 1,
    explanation:
      "La bataille d'Azincourt, le 25 octobre 1415, fut une lourde défaite de la chevalerie française face aux armées anglaises d'Henri V pendant la guerre de Cent Ans. Malgré une grande supériorité numérique, les Français ont subi des pertes considérables face aux archers anglais. Cette défaite a permis aux Anglais de conquérir une grande partie de la France, avant le redressement opéré sous Charles VII et Jeanne d'Arc.",
  },
  {
    id: "ext-cr-014",
    category: "CR",
    theme: "histoire",
    text: "Quelle était la IVe République ?",
    choices: [
      "Le régime politique français de 1870 à 1940",
      "Le régime politique français de 1946 à 1958",
      "Le régime actuel de la France",
      "Un régime monarchique",
    ],
    correctIndex: 1,
    explanation:
      "La IVe République est le régime politique qui a gouverné la France du 27 octobre 1946 au 4 octobre 1958. Instaurée après la Seconde Guerre mondiale, elle a été marquée par une grande instabilité gouvernementale (24 gouvernements en 12 ans) et par les guerres de décolonisation (Indochine puis Algérie). La crise algérienne de mai 1958 a conduit à son effondrement et à la création de la Ve République par de Gaulle.",
  },
  {
    id: "ext-cr-015",
    category: "CR",
    theme: "histoire",
    text: "En quelle année la France a-t-elle reconnu l'indépendance des États-Unis ?",
    choices: ["1776", "1778", "1789", "1800"],
    correctIndex: 1,
    explanation:
      "La France a reconnu officiellement l'indépendance des États-Unis d'Amérique le 6 février 1778 par le traité d'alliance et d'amitié signé par Louis XVI et Benjamin Franklin. La France a ensuite soutenu militairement les Insurgents, notamment grâce à La Fayette et à l'amiral de Grasse. Cette intervention a été décisive dans la victoire américaine à Yorktown en 1781.",
  },
  {
    id: "ext-cr-016",
    category: "CR",
    theme: "histoire",
    text: "Qui a été le premier président de la Ve République élu au suffrage universel direct ?",
    choices: [
      "Vincent Auriol",
      "René Coty",
      "Charles de Gaulle",
      "Georges Pompidou",
    ],
    correctIndex: 2,
    explanation:
      "Charles de Gaulle a été le premier président de la République élu au suffrage universel direct, lors de l'élection présidentielle de décembre 1965. Il a été élu au second tour face à François Mitterrand avec 55,2 % des voix. Avant la révision constitutionnelle du 6 novembre 1962, adoptée par référendum, le Président était élu par un collège d'environ 80 000 grands électeurs.",
  },

  // CR — Valeurs (8)
  {
    id: "ext-cr-017",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que le droit d'asile ?",
    choices: [
      "Le droit de voter pour les étrangers",
      "Le droit pour un étranger persécuté d'être protégé en France",
      "Un régime fiscal spécial",
      "Le droit de travailler",
    ],
    correctIndex: 1,
    explanation:
      "Le droit d'asile est une protection accordée par la France à un étranger persécuté ou craignant des persécutions dans son pays d'origine en raison de sa race, sa religion, sa nationalité, ses opinions politiques ou son appartenance à un groupe social. Il est garanti par le préambule de la Constitution de 1946 et par la Convention de Genève de 1951. L'OFPRA examine les demandes d'asile en France.",
  },
  {
    id: "ext-cr-018",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que le droit de grève en France ?",
    choices: [
      "Un droit interdit",
      "Un droit constitutionnel garanti depuis 1946",
      "Un droit réservé aux fonctionnaires",
      "Un droit uniquement politique",
    ],
    correctIndex: 1,
    explanation:
      "Le droit de grève est un droit constitutionnel en France, reconnu par le préambule de la Constitution du 27 octobre 1946, lui-même intégré au bloc de constitutionnalité par la Constitution de 1958. Il s'exerce dans le cadre des lois qui le réglementent. Tous les salariés peuvent faire grève, sous réserve de certaines limitations pour les services publics essentiels (par exemple service minimum dans les transports).",
  },
  {
    id: "ext-cr-019",
    category: "CR",
    theme: "valeurs",
    text: "Quelle est la durée de l'école obligatoire en France ?",
    choices: [
      "De 6 à 14 ans",
      "De 3 à 16 ans",
      "De 7 à 18 ans",
      "De 6 à 18 ans",
    ],
    correctIndex: 1,
    explanation:
      "L'instruction est obligatoire en France de 3 à 16 ans depuis la loi du 26 juillet 2019 « pour une école de la confiance ». Auparavant, l'obligation scolaire commençait à 6 ans. Depuis 2020, une obligation de formation s'applique également jusqu'à 18 ans. L'école obligatoire a été instaurée par la loi Jules Ferry du 28 mars 1882, qui l'a aussi rendue gratuite et laïque.",
  },
  {
    id: "ext-cr-020",
    category: "CR",
    theme: "valeurs",
    text: "Que garantit l'article 1 de la DDHC de 1789 ?",
    choices: [
      "La propriété privée exclusivement",
      "Que les hommes naissent et demeurent libres et égaux en droits",
      "Le droit au travail",
      "Le droit à l'éducation",
    ],
    correctIndex: 1,
    explanation:
      "L'article 1 de la Déclaration des droits de l'homme et du citoyen du 26 août 1789 dispose : « Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune. » Ce principe fondamental affirme l'égalité de tous devant la loi. Ce texte est intégré au préambule de la Constitution de 1958 et fait partie du bloc de constitutionnalité.",
  },
  {
    id: "ext-cr-021",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que la CMU (aujourd'hui Protection Universelle Maladie) ?",
    choices: [
      "Un impôt",
      "Un dispositif garantissant l'accès à l'assurance maladie pour tous les résidents",
      "Un parti politique",
      "Un diplôme universitaire",
    ],
    correctIndex: 1,
    explanation:
      "La Couverture Maladie Universelle (CMU) a été créée par la loi du 27 juillet 1999 pour garantir l'accès à l'assurance maladie à toute personne résidant en France de manière stable et régulière. Elle a été remplacée en 2016 par la Protection Universelle Maladie (PUMA), qui simplifie les démarches. Elle illustre le principe de solidarité nationale inscrit dans le préambule de la Constitution de 1946.",
  },
  {
    id: "ext-cr-022",
    category: "CR",
    theme: "valeurs",
    text: "Qui a le droit de vote aux élections présidentielles françaises ?",
    choices: [
      "Tous les résidents en France",
      "Les citoyens français majeurs inscrits sur les listes électorales",
      "Les citoyens de l'Union européenne",
      "Uniquement les propriétaires",
    ],
    correctIndex: 1,
    explanation:
      "Seuls les citoyens français majeurs (18 ans), jouissant de leurs droits civils et politiques et inscrits sur les listes électorales, peuvent voter à l'élection présidentielle. Contrairement aux élections municipales ou européennes, les ressortissants d'autres pays de l'UE ne peuvent pas y participer. Le Président est élu au scrutin uninominal majoritaire à deux tours tous les cinq ans depuis 2000.",
  },
  {
    id: "ext-cr-023",
    category: "CR",
    theme: "valeurs",
    text: "La liberté de la presse en France est consacrée par quelle grande loi ?",
    choices: [
      "La loi du 29 juillet 1881",
      "La loi du 1er juillet 1901",
      "La loi de 1905",
      "La loi de 1958",
    ],
    correctIndex: 0,
    explanation:
      "La liberté de la presse est consacrée en France par la loi du 29 juillet 1881, encore en vigueur aujourd'hui. Elle pose le principe selon lequel « l'imprimerie et la librairie sont libres ». Elle fixe également des limites en matière de diffamation, d'injure et d'atteinte aux bonnes mœurs. Cette loi fondatrice est un pilier de la démocratie française et reste largement inchangée dans ses principes.",
  },
  {
    id: "ext-cr-024",
    category: "CR",
    theme: "valeurs",
    text: "Qu'est-ce que la séparation des pouvoirs ?",
    choices: [
      "La séparation entre Paris et la province",
      "La répartition des pouvoirs entre l'exécutif, le législatif et le judiciaire",
      "La séparation entre l'État et la religion",
      "Le fédéralisme",
    ],
    correctIndex: 1,
    explanation:
      "La séparation des pouvoirs est un principe fondamental théorisé par Montesquieu dans « De l'esprit des lois » (1748). Elle distingue trois pouvoirs : le pouvoir législatif (voter les lois, exercé par le Parlement), le pouvoir exécutif (gouverner, exercé par le Président et le Gouvernement) et le pouvoir judiciaire (juger, exercé par les tribunaux). Ce principe vise à empêcher la concentration du pouvoir et à garantir les libertés.",
  },

  // CR — Géographie (8)
  {
    id: "ext-cr-025",
    category: "CR",
    theme: "geographie",
    text: "Quelle ville est le siège du Parlement européen en France ?",
    choices: ["Paris", "Lyon", "Strasbourg", "Bruxelles"],
    correctIndex: 2,
    explanation:
      "Strasbourg, chef-lieu de la région Grand Est, est le siège officiel du Parlement européen depuis 1992. Cette fonction a été confirmée par les traités européens. Le Parlement y tient ses sessions plénières mensuelles. Strasbourg accueille également le Conseil de l'Europe (distinct de l'UE) et la Cour européenne des droits de l'homme. Cela en fait une capitale européenne majeure, symbole de la réconciliation franco-allemande.",
  },
  {
    id: "ext-cr-026",
    category: "CR",
    theme: "geographie",
    text: "La Guyane française est située :",
    choices: [
      "En Afrique",
      "En Amérique du Sud",
      "En Asie",
      "En Océanie",
    ],
    correctIndex: 1,
    explanation:
      "La Guyane est un département et région d'outre-mer (DROM) français situé en Amérique du Sud, bordé par le Suriname à l'ouest, le Brésil au sud et à l'est, et l'océan Atlantique au nord. Sa capitale est Cayenne. C'est le plus grand département français avec une superficie de 83 846 km². Elle abrite le Centre spatial guyanais à Kourou, d'où sont lancées les fusées européennes Ariane.",
  },
  {
    id: "ext-cr-027",
    category: "CR",
    theme: "geographie",
    text: "Quelle est la région la plus peuplée de France ?",
    choices: ["Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Île-de-France", "Hauts-de-France"],
    correctIndex: 2,
    explanation:
      "L'Île-de-France est la région la plus peuplée de France avec environ 12 millions d'habitants, soit près de 19 % de la population française sur seulement 2,2 % du territoire métropolitain. Elle comprend Paris et sept départements, et est le cœur économique du pays avec environ 31 % du PIB national. Son chef-lieu est Paris, et elle est dirigée par un conseil régional élu pour six ans.",
  },
  {
    id: "ext-cr-028",
    category: "CR",
    theme: "geographie",
    text: "Quel fleuve français se jette dans la mer Méditerranée ?",
    choices: ["La Seine", "La Loire", "Le Rhône", "La Meuse"],
    correctIndex: 2,
    explanation:
      "Le Rhône est un fleuve long de 812 km qui prend sa source dans les Alpes suisses et traverse la France du nord au sud avant de se jeter dans la mer Méditerranée en formant un vaste delta en Camargue. Il traverse notamment Lyon, Valence, Avignon et Arles. Il est l'un des fleuves les plus puissants d'Europe par son débit et est exploité pour son potentiel hydroélectrique.",
  },
  {
    id: "ext-cr-029",
    category: "CR",
    theme: "geographie",
    text: "Quelle est la capitale de la région Bretagne ?",
    choices: ["Brest", "Nantes", "Rennes", "Quimper"],
    correctIndex: 2,
    explanation:
      "Rennes est le chef-lieu de la région Bretagne et du département d'Ille-et-Vilaine. Elle compte environ 220 000 habitants intra-muros. Contrairement à une idée reçue, Nantes n'appartient pas à la région administrative Bretagne mais à la région Pays de la Loire depuis 1956, bien qu'elle fasse historiquement partie de la Bretagne. La Bretagne a une forte identité culturelle et linguistique.",
  },
  {
    id: "ext-cr-030",
    category: "CR",
    theme: "geographie",
    text: "Combien d'habitants compte la France environ (en 2024) ?",
    choices: ["50 millions", "68 millions", "85 millions", "100 millions"],
    correctIndex: 1,
    explanation:
      "La France compte environ 68 millions d'habitants en 2024, selon l'Institut national de la statistique et des études économiques (INSEE). Ce chiffre inclut la France métropolitaine et les cinq départements et régions d'outre-mer. La France est le troisième pays le plus peuplé de l'Union européenne, après l'Allemagne. Sa densité moyenne est d'environ 120 habitants au km² en métropole.",
  },
  {
    id: "ext-cr-031",
    category: "CR",
    theme: "geographie",
    text: "Quel territoire français est situé dans l'océan Pacifique ?",
    choices: ["La Martinique", "La Nouvelle-Calédonie", "La Guyane", "Mayotte"],
    correctIndex: 1,
    explanation:
      "La Nouvelle-Calédonie est une collectivité d'outre-mer française à statut particulier (sui generis) située dans l'océan Pacifique sud, à environ 1 500 km à l'est de l'Australie. Sa capitale est Nouméa. Elle est devenue française en 1853. La Polynésie française, Wallis-et-Futuna ainsi que l'île de Clipperton sont d'autres territoires français du Pacifique.",
  },
  {
    id: "ext-cr-032",
    category: "CR",
    theme: "geographie",
    text: "Quelle chaîne de montagnes sépare la France de l'Italie ?",
    choices: ["Les Pyrénées", "Les Alpes", "Les Vosges", "Le Massif central"],
    correctIndex: 1,
    explanation:
      "Les Alpes forment une vaste chaîne montagneuse qui s'étend sur plusieurs pays européens et sépare la France de l'Italie et de la Suisse. Leur point culminant, le Mont Blanc (4 810 m), est situé à la frontière franco-italienne. Les Alpes françaises couvrent les régions Auvergne-Rhône-Alpes et Provence-Alpes-Côte d'Azur. Elles accueillent de nombreuses stations de ski et ont abrité plusieurs Jeux olympiques d'hiver (Chamonix 1924, Grenoble 1968, Albertville 1992).",
  },

  // CR — Culture (8)
  {
    id: "ext-cr-033",
    category: "CR",
    theme: "culture",
    text: "Quel roman célèbre de Gustave Flaubert publié en 1857 raconte la vie d'une bourgeoise de province ?",
    choices: ["Germinal", "Madame Bovary", "Le Rouge et le Noir", "La Peste"],
    correctIndex: 1,
    explanation:
      "« Madame Bovary », publié en 1857, est le roman le plus célèbre de Gustave Flaubert (1821-1880). Il raconte l'histoire d'Emma Bovary, une bourgeoise normande qui cherche à échapper à l'ennui de sa vie provinciale. Lors de sa publication, il fut l'objet d'un procès pour outrage aux bonnes mœurs, dont Flaubert fut acquitté. C'est une œuvre majeure du réalisme littéraire français du XIXe siècle.",
  },
  {
    id: "ext-cr-034",
    category: "CR",
    theme: "culture",
    text: "Quel écrivain français a écrit « À la recherche du temps perdu » ?",
    choices: ["Marcel Proust", "André Gide", "Paul Valéry", "Louis Aragon"],
    correctIndex: 0,
    explanation:
      "Marcel Proust (1871-1922) est l'auteur d'« À la recherche du temps perdu », œuvre monumentale en sept tomes publiée entre 1913 et 1927 (les derniers à titre posthume). Le premier volume, « Du côté de chez Swann » (1913), contient le célèbre épisode de la madeleine. Son deuxième volume, « À l'ombre des jeunes filles en fleurs », a reçu le prix Goncourt en 1919. C'est l'une des œuvres majeures de la littérature mondiale.",
  },
  {
    id: "ext-cr-035",
    category: "CR",
    theme: "culture",
    text: "Qui a écrit « Le Petit Prince » ?",
    choices: [
      "Antoine de Saint-Exupéry",
      "Jules Verne",
      "Alexandre Dumas",
      "Charles Perrault",
    ],
    correctIndex: 0,
    explanation:
      "Antoine de Saint-Exupéry (1900-1944), aviateur et écrivain, a publié « Le Petit Prince » en 1943, d'abord à New York en anglais et en français. Cette œuvre poétique et philosophique, illustrée par l'auteur lui-même, est l'un des livres les plus traduits et vendus au monde (plus de 200 langues). Saint-Exupéry a disparu en mission au-dessus de la Méditerranée le 31 juillet 1944.",
  },
  {
    id: "ext-cr-036",
    category: "CR",
    theme: "culture",
    text: "Quel château, symbole du XVIIe siècle français, a été construit par Louis XIV ?",
    choices: ["Le château de Chambord", "Le château de Versailles", "Le château de Fontainebleau", "Le château de Chenonceau"],
    correctIndex: 1,
    explanation:
      "Le château de Versailles, ancien pavillon de chasse de Louis XIII, a été transformé par Louis XIV en un palais royal somptueux à partir de 1661. Les architectes Louis Le Vau et Jules Hardouin-Mansart, le peintre Charles Le Brun et le jardinier André Le Nôtre y ont travaillé. La cour s'y est installée en 1682. Il est classé au patrimoine mondial de l'UNESCO depuis 1979 et reçoit près de 10 millions de visiteurs par an.",
  },
  {
    id: "ext-cr-037",
    category: "CR",
    theme: "culture",
    text: "Quel écrivain du XVIIIe siècle est l'auteur de « Candide » ?",
    choices: ["Denis Diderot", "Voltaire", "Jean-Jacques Rousseau", "Montesquieu"],
    correctIndex: 1,
    explanation:
      "Voltaire, de son vrai nom François-Marie Arouet (1694-1778), est l'un des philosophes les plus célèbres du Siècle des Lumières. Il a publié « Candide ou l'Optimisme » en 1759, un conte philosophique qui critique avec ironie l'optimisme de Leibniz. Auteur prolifique, il a aussi écrit « Zadig », le « Traité sur la tolérance » et « Le Dictionnaire philosophique ». Ses cendres reposent au Panthéon depuis 1791.",
  },
  {
    id: "ext-cr-038",
    category: "CR",
    theme: "culture",
    text: "Quel grand tournoi international de tennis se déroule à Paris chaque année ?",
    choices: ["Wimbledon", "Roland-Garros", "L'US Open", "L'Open d'Australie"],
    correctIndex: 1,
    explanation:
      "Roland-Garros, l'un des quatre tournois du Grand Chelem de tennis, se déroule chaque année fin mai et début juin à Paris dans le stade du même nom, porte d'Auteuil. C'est le seul Grand Chelem disputé sur terre battue. Il a été créé en 1891 et est nommé d'après l'aviateur Roland Garros depuis 1928. Rafael Nadal en est le recordman avec 14 titres, ce qui lui a valu le surnom de « Roi de la terre battue ».",
  },
  {
    id: "ext-cr-039",
    category: "CR",
    theme: "culture",
    text: "Quelle célèbre chanteuse française est surnommée « La Môme Piaf » ?",
    choices: ["Dalida", "Édith Piaf", "Mireille Mathieu", "Juliette Gréco"],
    correctIndex: 1,
    explanation:
      "Édith Piaf (1915-1963), de son vrai nom Édith Gassion, est l'une des plus grandes chanteuses françaises du XXe siècle. Surnommée « La Môme Piaf » en raison de sa petite taille, elle a popularisé des titres intemporels comme « La Vie en rose » (1945), « Non, je ne regrette rien » (1960) et « Hymne à l'amour » (1949). Sa voix et son destin tragique en ont fait une icône mondiale de la chanson française.",
  },
  {
    id: "ext-cr-040",
    category: "CR",
    theme: "culture",
    text: "Quel monument parisien abrite les tombeaux des grandes personnalités de la République ?",
    choices: [
      "Le Louvre",
      "Le Panthéon",
      "L'Arc de Triomphe",
      "Les Invalides",
    ],
    correctIndex: 1,
    explanation:
      "Le Panthéon, situé au Quartier latin à Paris, est un monument construit à l'origine comme église Sainte-Geneviève au XVIIIe siècle par l'architecte Jacques-Germain Soufflot. Depuis la Révolution française, il accueille les cendres des grandes personnalités de la République. On peut y trouver notamment Voltaire, Rousseau, Victor Hugo, Émile Zola, Jean Jaurès, Jean Moulin, Simone Veil et Joséphine Baker. Son fronton porte l'inscription « Aux grands hommes la patrie reconnaissante ».",
  },
];
