import { Question } from "@/types";

/**
 * LIVRET_QUESTIONS — questions dérivées directement du Livret du Citoyen
 * (édition février 2022, Ministère de l'Intérieur).
 *
 * Source officielle :
 * https://www.immigration.interieur.gouv.fr/Integration-et-Acces-a-la-nationalite/La-nationalite-francaise/Le-livret-du-citoyen
 *
 * Chaque question a été rédigée à partir du contenu exact du livret afin
 * de correspondre aux attentes de l'entretien de naturalisation et du
 * nouvel examen civique 2026.
 */
export const LIVRET_QUESTIONS: Question[] = [
  // ==========================================================
  // VALEURS & PRINCIPES DE LA RÉPUBLIQUE
  // ==========================================================
  {
    id: "liv-001",
    category: "CSP",
    theme: "valeurs",
    text: "Avez-vous le droit de tout dire et de tout exprimer publiquement ?",
    choices: [
      "Oui, sans aucune limite",
      "Oui, mais avec des limites définies par la loi",
      "Non, jamais",
      "Seulement dans sa langue maternelle",
    ],
    correctIndex: 1,
    explanation:
      "La liberté d'expression est un droit fondamental garanti par l'article 11 de la Déclaration des droits de l'homme et du citoyen de 1789. Elle a néanmoins des limites fixées par la loi pour respecter les droits d'autrui : sont interdits les injures, la diffamation, la provocation à la haine raciale ou religieuse, et l'apologie de crimes contre l'humanité. Ces infractions sont punies par la loi du 29 juillet 1881 sur la liberté de la presse et le Code pénal.",
  },
  {
    id: "liv-002",
    category: "CSP",
    theme: "valeurs",
    text: "Quelle est la devise de la République française ?",
    choices: [
      "Travail, Famille, Patrie",
      "Liberté, Égalité, Fraternité",
      "Unité, Démocratie, Justice",
      "Dieu, Roi, Patrie",
    ],
    correctIndex: 1,
    explanation:
      "La devise « Liberté, Égalité, Fraternité » est inscrite à l'article 2 de la Constitution de 1958. Ces trois mots résument les valeurs essentielles de la République, héritées de la Révolution française de 1789. On les trouve gravés sur les frontons des mairies, des écoles publiques et des tribunaux. « Travail, Famille, Patrie » était la devise du régime de Vichy (1940-1944), aujourd'hui reniée.",
  },
  {
    id: "liv-003",
    category: "CR",
    theme: "valeurs",
    text: "À quel âge peut-on voter en France ?",
    choices: ["16 ans", "18 ans", "21 ans", "25 ans"],
    correctIndex: 1,
    explanation:
      "Le droit de vote est ouvert à tout citoyen français âgé de 18 ans révolus, disposant de ses droits civils et politiques et inscrit sur les listes électorales. La majorité civile a été abaissée de 21 à 18 ans par la loi du 5 juillet 1974, sous la présidence de Valéry Giscard d'Estaing. Depuis 1997, l'inscription sur les listes est automatique pour les jeunes de 18 ans recensés à la mairie.",
  },
  {
    id: "liv-004",
    category: "NAT",
    theme: "valeurs",
    text: "L'administration peut-elle refuser la nationalité française à une personne ne respectant pas l'égalité femmes-hommes ?",
    choices: [
      "Non, jamais",
      "Oui, même si elle est mariée à un(e) Français(e)",
      "Seulement si elle n'est pas mariée",
      "Seulement si elle est de nationalité étrangère",
    ],
    correctIndex: 1,
    explanation:
      "Oui, l'administration peut refuser la naturalisation pour ce motif, même à une personne mariée à un Français ou à une Française. L'égalité entre les femmes et les hommes fait partie des valeurs essentielles de la République. L'adhésion à ces valeurs est évaluée au cours de l'entretien réglementaire en préfecture. Ce principe est affirmé par la loi et par la jurisprudence du Conseil d'État.",
  },
  {
    id: "liv-005",
    category: "CR",
    theme: "valeurs",
    text: "Quel texte fondateur date de la Révolution française et garantit la liberté et l'égalité des citoyens ?",
    choices: [
      "La Charte de l'environnement",
      "La Déclaration des droits de l'homme et du citoyen",
      "Le Code Napoléon",
      "La Constitution de 1958",
    ],
    correctIndex: 1,
    explanation:
      "La Déclaration des droits de l'homme et du citoyen du 26 août 1789, adoptée par l'Assemblée nationale constituante au début de la Révolution française, proclame les principes de liberté, d'égalité, de propriété, de sûreté et de résistance à l'oppression. Elle a valeur constitutionnelle depuis la décision du Conseil constitutionnel du 16 juillet 1971 et fait partie du bloc de constitutionnalité français.",
  },
  {
    id: "liv-006",
    category: "NAT",
    theme: "valeurs",
    text: "Un employeur peut-il refuser d'embaucher une personne en raison de ses origines ou de sa religion ?",
    choices: [
      "Oui, c'est son droit",
      "Oui, si c'est dans l'intérêt de l'entreprise",
      "Non, c'est une discrimination interdite par la loi",
      "Seulement pour les emplois publics",
    ],
    correctIndex: 2,
    explanation:
      "Toute décision d'embauche, de promotion ou de licenciement doit être fondée sur des critères professionnels, jamais personnels. Refuser un salarié en raison de ses origines, de son âge, de son handicap, de son appartenance à une ethnie, à une religion, de son sexe ou de son orientation sexuelle est une discrimination interdite. L'article 225-1 du Code pénal punit la discrimination jusqu'à 3 ans d'emprisonnement et 45 000 € d'amende.",
  },
  {
    id: "liv-007",
    category: "CSP",
    theme: "valeurs",
    text: "Sur quoi repose le système de Sécurité sociale en France ?",
    choices: [
      "Les dons privés",
      "Les cotisations sociales et les impôts",
      "Les assurances privées uniquement",
      "Le mécénat d'entreprise",
    ],
    correctIndex: 1,
    explanation:
      "Créée en 1945 par l'ordonnance du 4 octobre, la Sécurité sociale est financée par les cotisations sociales (versées par les employeurs, les salariés et les non-salariés) ainsi que par des impôts affectés comme la CSG (Contribution sociale généralisée). Elle incarne le principe de fraternité républicaine et couvre 5 risques : maladie, accidents du travail, vieillesse, famille et autonomie. C'est la traduction concrète de la solidarité nationale.",
  },
  {
    id: "liv-008",
    category: "NAT",
    theme: "valeurs",
    text: "Pourquoi les élèves ne peuvent-ils pas porter de signes religieux ostensibles dans les écoles publiques ?",
    choices: [
      "Car la religion est interdite en France",
      "Car l'école publique doit rester neutre face aux religions",
      "Car c'est un choix des professeurs",
      "Car seuls les adultes peuvent pratiquer une religion",
    ],
    correctIndex: 1,
    explanation:
      "La loi du 15 mars 2004 interdit le port de signes religieux ostensibles dans les écoles, collèges et lycées publics. L'école étant une institution publique qui forme tous les citoyens, elle doit rester neutre face aux religions. Cette règle protège également les mineurs contre d'éventuelles pressions de leurs camarades. Le principe de laïcité distingue nettement les affaires religieuses (privées) et les affaires publiques.",
  },
  {
    id: "liv-009",
    category: "CR",
    theme: "valeurs",
    text: "Quelle loi fondatrice pose le principe de la laïcité en France ?",
    choices: [
      "La loi de 1881",
      "La loi de 1905",
      "La loi de 1958",
      "La loi de 2004",
    ],
    correctIndex: 1,
    explanation:
      "La loi du 9 décembre 1905 concernant la séparation des Églises et de l'État est le texte fondateur de la laïcité française. Son article 1er affirme que « la République assure la liberté de conscience » et garantit « le libre exercice des cultes ». Son article 2 dispose que « la République ne reconnaît, ne salarie ni ne subventionne aucun culte ». La laïcité est également inscrite à l'article 1er de la Constitution de 1958.",
  },
  {
    id: "liv-010",
    category: "NAT",
    theme: "valeurs",
    text: "Chacun est-il libre de croire ou de ne pas croire en France ?",
    choices: [
      "Oui, la liberté de conscience est garantie",
      "Non, on doit choisir une religion",
      "Seulement pour les Français de naissance",
      "Seulement pour certaines religions reconnues",
    ],
    correctIndex: 0,
    explanation:
      "L'État garantit la liberté religieuse et la liberté de conscience : chacun est libre de croire ou de ne pas croire, et d'adopter la religion de son choix. Cette liberté, inscrite dans la loi de 1905 et dans la Constitution, est l'un des piliers de la laïcité. Toutefois, pour préserver l'ordre public, l'État peut restreindre certaines manifestations publiques de la religion (décision du Conseil constitutionnel du 19 novembre 2004).",
  },
  {
    id: "liv-011",
    category: "CR",
    theme: "valeurs",
    text: "Où trouver toutes les lois françaises en vigueur ?",
    choices: [
      "Uniquement à la préfecture",
      "Sur le site www.legifrance.gouv.fr",
      "Dans les journaux quotidiens",
      "À la mairie uniquement",
    ],
    correctIndex: 1,
    explanation:
      "Le site officiel legifrance.gouv.fr, service public de la diffusion du droit, publie l'ensemble des lois, codes, décrets, arrêtés et décisions de justice en vigueur en France. Il est gratuit et accessible à tous. Le site vie-publique.fr, quant à lui, présente de façon pédagogique les principales règles et le fonctionnement des institutions. Nul n'est censé ignorer la loi.",
  },
  {
    id: "liv-012",
    category: "CSP",
    theme: "valeurs",
    text: "Quel code définit les règles essentielles entre les personnes (mariage, filiation, contrats…) ?",
    choices: [
      "Le code pénal",
      "Le code civil",
      "Le code du travail",
      "Le code de la route",
    ],
    correctIndex: 1,
    explanation:
      "Le Code civil (dit aussi « Code Napoléon ») promulgué en 1804 régit les relations entre particuliers : droit de la famille (mariage, divorce, filiation, adoption), droit des contrats, droit des biens, droit des successions. Le Code pénal, lui, définit les infractions (contraventions, délits, crimes) et les peines correspondantes (amendes, emprisonnement, réclusion criminelle).",
  },
  {
    id: "liv-013",
    category: "CR",
    theme: "valeurs",
    text: "Quels sont les principaux devoirs du citoyen français ?",
    choices: [
      "Voter uniquement",
      "Respecter la loi et contribuer au financement des services publics",
      "Travailler pour l'État",
      "Appartenir à un parti politique",
    ],
    correctIndex: 1,
    explanation:
      "Les principaux devoirs du citoyen sont : respecter la loi (« nul n'est censé ignorer la loi »), contribuer au financement des services publics par l'impôt (à hauteur de ses moyens), participer au financement de la protection sociale via les cotisations prélevées sur le salaire, et contribuer à la défense nationale (en cas de guerre, ou par le recensement à 16 ans suivi de la Journée défense et citoyenneté).",
  },
  {
    id: "liv-014",
    category: "CSP",
    theme: "valeurs",
    text: "À quel âge les Français doivent-ils se faire recenser à la mairie ?",
    choices: ["14 ans", "16 ans", "18 ans", "20 ans"],
    correctIndex: 1,
    explanation:
      "Depuis la loi du 28 octobre 1997, les jeunes Françaises et Français doivent se faire recenser à la mairie à partir de l'âge de 16 ans. Le recensement permet leur convocation à la Journée défense et citoyenneté (JDC), obligatoire pour obtenir le permis de conduire, passer des examens ou concours publics. Il participe aussi à l'inscription automatique sur les listes électorales.",
  },
  {
    id: "liv-015",
    category: "NAT",
    theme: "valeurs",
    text: "Que signifie le principe selon lequel « le Gouvernement est du peuple, par le peuple et pour le peuple » ?",
    choices: [
      "Que la France est une monarchie",
      "Que la France est une démocratie et un État de droit",
      "Que le pouvoir appartient au Président seul",
      "Que seuls les riches peuvent gouverner",
    ],
    correctIndex: 1,
    explanation:
      "Cette formule, empruntée à Abraham Lincoln (discours de Gettysburg, 1863), résume le principe démocratique français : le peuple est la source du pouvoir, le pouvoir s'exerce par ses représentants élus, et au service de l'intérêt général. La France est aussi un État de droit : le pouvoir politique est soumis à la Constitution et à la loi, l'indépendance de la justice est garantie, les partis politiques se forment et exercent librement.",
  },

  // ==========================================================
  // INSTITUTIONS DE LA RÉPUBLIQUE
  // ==========================================================
  {
    id: "liv-016",
    category: "CSP",
    theme: "institutions",
    text: "Pour combien d'années est élu le Président de la République ?",
    choices: ["3 ans", "5 ans", "7 ans", "10 ans"],
    correctIndex: 1,
    explanation:
      "Le Président de la République est élu pour 5 ans au suffrage universel direct (élection présidentielle), depuis la réforme constitutionnelle du 2 octobre 2000. Auparavant, le mandat était de 7 ans (septennat). Depuis la révision du 23 juillet 2008, il ne peut pas exercer plus de deux mandats consécutifs. Il nomme le Premier ministre et, sur sa proposition, les autres membres du Gouvernement.",
  },
  {
    id: "liv-017",
    category: "CR",
    theme: "institutions",
    text: "Quelles sont les deux chambres du Parlement français ?",
    choices: [
      "L'Assemblée et la Cour",
      "L'Assemblée nationale et le Sénat",
      "Le Conseil et le Sénat",
      "Le Parlement et le Gouvernement",
    ],
    correctIndex: 1,
    explanation:
      "Le Parlement français est bicaméral : l'Assemblée nationale (577 députés élus pour 5 ans au suffrage universel direct, siégeant au Palais Bourbon) et le Sénat (348 sénateurs élus pour 6 ans au suffrage universel indirect, siégeant au Palais du Luxembourg). Le Parlement vote les lois, contrôle l'action du Gouvernement et vote le budget de l'État. En cas de désaccord, c'est l'Assemblée nationale qui a le dernier mot (article 45).",
  },
  {
    id: "liv-018",
    category: "CR",
    theme: "institutions",
    text: "Combien de temps dure le mandat d'un sénateur ?",
    choices: ["4 ans", "5 ans", "6 ans", "9 ans"],
    correctIndex: 2,
    explanation:
      "Les sénateurs sont élus pour un mandat de 6 ans, renouvelé par moitié tous les 3 ans. Ils sont élus au suffrage universel indirect par environ 162 000 grands électeurs (députés, conseillers régionaux, départementaux et municipaux). Le Sénat compte 348 sénateurs et représente les collectivités territoriales de la République. Il siège au Palais du Luxembourg, à Paris.",
  },
  {
    id: "liv-019",
    category: "NAT",
    theme: "institutions",
    text: "En quelle année la Constitution actuelle (Ve République) a-t-elle été adoptée ?",
    choices: ["1945", "1946", "1958", "1968"],
    correctIndex: 2,
    explanation:
      "La Constitution de la Vᵉ République a été adoptée par référendum le 28 septembre 1958 (79 % de oui) et promulguée le 4 octobre 1958. Rédigée principalement sous l'impulsion du général Charles de Gaulle, elle renforce considérablement le pouvoir exécutif par rapport aux Constitutions précédentes. La Vᵉ République a succédé à la IVᵉ République (1946-1958), affaiblie par l'instabilité gouvernementale et la guerre d'Algérie.",
  },
  {
    id: "liv-020",
    category: "CSP",
    theme: "institutions",
    text: "Qui dirige le Gouvernement ?",
    choices: [
      "Le Président de la République",
      "Le Premier ministre",
      "Le Président de l'Assemblée nationale",
      "Le Président du Sénat",
    ],
    correctIndex: 1,
    explanation:
      "Le Premier ministre dirige l'action du Gouvernement (article 21 de la Constitution). Il est nommé par le Président de la République, généralement au sein de la majorité parlementaire. Il réside à l'Hôtel Matignon et propose au Président la nomination des autres ministres. Le Président de la République, lui, est chef de l'État et préside le Conseil des ministres — il ne dirige pas le Gouvernement au jour le jour.",
  },
  {
    id: "liv-021",
    category: "CR",
    theme: "institutions",
    text: "Qui rend la justice en France ?",
    choices: [
      "Le Président de la République",
      "Les juges, de manière indépendante",
      "Le Parlement",
      "Les maires",
    ],
    correctIndex: 1,
    explanation:
      "La justice est rendue par les juges, et son indépendance est garantie par la Constitution (article 64). Elle règle les litiges entre particuliers ou entreprises, ainsi qu'entre les citoyens et l'administration. Elle sanctionne les infractions par des peines prévues par la loi (amendes, emprisonnement, réclusion). Le Conseil supérieur de la magistrature veille à l'indépendance des magistrats. On distingue la justice judiciaire (civile et pénale) et la justice administrative.",
  },
  {
    id: "liv-022",
    category: "CSP",
    theme: "institutions",
    text: "Qui administre une commune en France ?",
    choices: [
      "Le préfet",
      "Le maire et le conseil municipal",
      "Le président de région",
      "L'État seul",
    ],
    correctIndex: 1,
    explanation:
      "Les 34 965 communes françaises (au 1er janvier 2021) sont administrées par un maire assisté d'adjoints et d'un conseil municipal, tous élus pour 6 ans au suffrage universel direct. La commune gère les écoles maternelles et primaires, les activités sportives et culturelles, l'entretien de la voirie communale, et tient l'état civil (naissances, mariages, décès). Les communes se regroupent souvent en intercommunalités (communautés de communes, métropoles).",
  },
  {
    id: "liv-023",
    category: "CR",
    theme: "institutions",
    text: "Combien de départements compte la France ?",
    choices: ["82", "96", "101", "120"],
    correctIndex: 2,
    explanation:
      "La France compte 101 départements : 96 en métropole (numérotés de 01 à 95, plus la Corse divisée en 2A et 2B), et 5 départements d'outre-mer (971 Guadeloupe, 972 Martinique, 973 Guyane, 974 La Réunion, 976 Mayotte depuis 2011). Les départements sont administrés par les conseils départementaux, chargés notamment des collèges, de la protection de l'enfance et de l'aide aux personnes âgées.",
  },
  {
    id: "liv-024",
    category: "CR",
    theme: "institutions",
    text: "Combien de régions métropolitaines compte la France ?",
    choices: ["11", "13", "18", "22"],
    correctIndex: 1,
    explanation:
      "Depuis la loi du 16 janvier 2015 entrée en vigueur le 1er janvier 2016, la France métropolitaine compte 13 régions (contre 22 auparavant). Elles sont administrées par les conseils régionaux et sont chargées notamment des transports publics, de la formation professionnelle, de la construction et de l'entretien des lycées. En ajoutant les 5 régions d'outre-mer, le total est de 18 régions pour la France entière.",
  },
  {
    id: "liv-025",
    category: "NAT",
    theme: "institutions",
    text: "Qui représente l'État dans les départements et les régions ?",
    choices: [
      "Le maire",
      "Le président du conseil départemental",
      "Le préfet",
      "Le juge",
    ],
    correctIndex: 2,
    explanation:
      "Le préfet, nommé par le Président de la République en Conseil des ministres, représente l'État dans le département et dans la région. Il a la charge des intérêts nationaux, du contrôle administratif et du respect des lois. Dans certaines collectivités d'outre-mer (Nouvelle-Calédonie, Polynésie française, Wallis-et-Futuna), l'État est représenté par un haut-commissaire. La fonction de préfet a été créée par Napoléon Bonaparte en 1800.",
  },
  {
    id: "liv-026",
    category: "NAT",
    theme: "institutions",
    text: "Combien de territoires d'outre-mer compte la France ?",
    choices: ["5", "8", "12", "15"],
    correctIndex: 2,
    explanation:
      "La France compte 12 territoires d'outre-mer : 5 sont à la fois départements et régions (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte), et 7 sont des collectivités d'outre-mer au statut particulier (Nouvelle-Calédonie, Polynésie française, Saint-Barthélemy, Saint-Martin, Saint-Pierre-et-Miquelon, Terres australes et antarctiques françaises — TAAF, Wallis-et-Futuna). Ces territoires donnent à la France la deuxième zone économique exclusive maritime au monde.",
  },
  {
    id: "liv-027",
    category: "CSP",
    theme: "institutions",
    text: "Qui enregistre les naissances, mariages et décès ?",
    choices: [
      "Le tribunal",
      "La mairie (état civil)",
      "La préfecture",
      "La gendarmerie",
    ],
    correctIndex: 1,
    explanation:
      "La mairie tient l'état civil : elle enregistre les naissances, mariages, décès, reconnaissances de filiation, changements de nom, divorces, et délivre les copies et extraits d'actes. L'état civil est un service public gratuit, accessible à tout citoyen. Les Français nés à l'étranger s'adressent au Service central d'état civil (SCEC) de Nantes, rattaché au ministère de l'Europe et des Affaires étrangères.",
  },

  // ==========================================================
  // HISTOIRE DE FRANCE
  // ==========================================================
  {
    id: "liv-028",
    category: "NAT",
    theme: "histoire",
    text: "Quel célèbre site préhistorique français abrite des peintures rupestres d'environ 18 000 ans ?",
    choices: [
      "Carnac",
      "Alésia",
      "Lascaux",
      "Les arènes de Nîmes",
    ],
    correctIndex: 2,
    explanation:
      "La grotte de Lascaux, découverte le 12 septembre 1940 par quatre adolescents en Dordogne, est l'une des plus importantes grottes ornées du Paléolithique supérieur (env. 17 000 ans). Elle abrite près de 2 000 représentations d'animaux (taureaux, chevaux, cerfs). Fermée au public en 1963 pour préserver les peintures, elle est reproduite à l'identique dans plusieurs fac-similés (Lascaux II, IV). Elle est classée au patrimoine mondial de l'UNESCO.",
  },
  {
    id: "liv-029",
    category: "NAT",
    theme: "histoire",
    text: "Vers quelle époque les Romains se sont-ils installés durablement en Gaule ?",
    choices: [
      "50 av. J.-C.",
      "500 ap. J.-C.",
      "1000 ap. J.-C.",
      "1500 ap. J.-C.",
    ],
    correctIndex: 0,
    explanation:
      "Les Romains se sont installés en Gaule à partir des années 50 avant J.-C., après la conquête menée par Jules César (guerre des Gaules, 58-52 av. J.-C., victoire à Alésia). Leur installation a eu une influence durable : les populations locales adoptent leur mode de vie et la culture latine, d'où vient le français. Les vestiges gallo-romains sont encore visibles (théâtre d'Orange, pont du Gard, arènes de Nîmes et d'Arles).",
  },
  {
    id: "liv-030",
    category: "CR",
    theme: "histoire",
    text: "Qui est Clovis, roi important du 5e siècle ?",
    choices: [
      "Un empereur romain",
      "Le roi qui a unifié les royaumes francs et adopté le christianisme",
      "Un héros de la Révolution",
      "Un philosophe des Lumières",
    ],
    correctIndex: 1,
    explanation:
      "Clovis Ier (v. 466-511), roi des Francs saliens à partir de 481, a unifié les royaumes francs et étendu son pouvoir sur une grande partie de la Gaule. Son baptême à Reims (vers 496 ou 498) par l'évêque saint Remi marque l'adoption du christianisme comme religion du royaume franc, un choix politique majeur qui inscrit la France dans la civilisation chrétienne occidentale. Clovis est considéré comme l'un des fondateurs de l'unité territoriale française.",
  },
  {
    id: "liv-031",
    category: "NAT",
    theme: "histoire",
    text: "Qui est Jeanne d'Arc, héroïne française du 15e siècle ?",
    choices: [
      "Une reine de France",
      "Une paysanne qui a conduit les troupes françaises contre les Anglais",
      "Une femme philosophe",
      "Une peintre célèbre",
    ],
    correctIndex: 1,
    explanation:
      "Jeanne d'Arc (1412-1431), jeune paysanne lorraine, a mené les armées du roi Charles VII à plusieurs victoires décisives pendant la guerre de Cent Ans contre l'Angleterre, notamment la libération d'Orléans en 1429. Capturée puis jugée par un tribunal ecclésiastique pro-anglais, elle a été brûlée vive à Rouen le 30 mai 1431 à l'âge de 19 ans. Réhabilitée en 1456, canonisée en 1920, elle incarne le courage et le patriotisme français.",
  },
  {
    id: "liv-032",
    category: "NAT",
    theme: "histoire",
    text: "Quel roi a signé l'édit de Nantes en 1598 accordant la liberté religieuse aux protestants ?",
    choices: [
      "Louis XIV",
      "François Iᵉʳ",
      "Henri IV",
      "Charles IX",
    ],
    correctIndex: 2,
    explanation:
      "Henri IV (1553-1610), premier roi Bourbon, a signé l'édit de Nantes le 13 avril 1598. Ce texte accordait aux protestants (huguenots) la liberté de conscience et le libre exercice du culte dans certaines conditions, mettant fin aux guerres de religion qui déchiraient la France depuis 1562. Né protestant, Henri IV s'était converti au catholicisme en 1593 (« Paris vaut bien une messe »). L'édit a été révoqué par son petit-fils Louis XIV en 1685.",
  },
  {
    id: "liv-033",
    category: "CR",
    theme: "histoire",
    text: "Quel roi a marqué le 17ᵉ siècle par une monarchie absolue et la construction du château de Versailles ?",
    choices: [
      "Louis IX",
      "Louis XIII",
      "Louis XIV",
      "Louis XVI",
    ],
    correctIndex: 2,
    explanation:
      "Louis XIV (1638-1715), surnommé le « Roi-Soleil », a régné pendant 72 ans (1643-1715), le plus long règne de l'histoire de France. Il a incarné l'absolutisme royal (« L'État, c'est moi »), centralisé le pouvoir à Versailles (construction du château à partir de 1661) et développé la puissance française en Europe. Son règne est aussi celui du rayonnement culturel (Molière, Racine, Corneille, La Fontaine, Le Brun, Lully).",
  },
  {
    id: "liv-034",
    category: "NAT",
    theme: "histoire",
    text: "Qui est Molière, figure majeure du 17ᵉ siècle ?",
    choices: [
      "Un roi",
      "Un peintre",
      "Le plus célèbre auteur de théâtre français",
      "Un philosophe",
    ],
    correctIndex: 2,
    explanation:
      "Molière (1622-1673), de son vrai nom Jean-Baptiste Poquelin, est le plus grand auteur de théâtre français. Comédien, dramaturge et chef de troupe, il a écrit des comédies intemporelles comme « L'Avare », « Tartuffe », « Le Misanthrope », « Le Malade imaginaire ». Protégé de Louis XIV, il est mort sur scène. Le français est souvent appelé « la langue de Molière » en son honneur. Il repose au cimetière du Père-Lachaise à Paris.",
  },
  {
    id: "liv-035",
    category: "CR",
    theme: "histoire",
    text: "Quels philosophes du 18ᵉ siècle ont défendu la tolérance et la liberté de pensée ?",
    choices: [
      "Descartes, Pascal et Montaigne",
      "Rousseau, Voltaire et Diderot",
      "Sartre, Camus et Beauvoir",
      "Mirabeau, Danton et Robespierre",
    ],
    correctIndex: 1,
    explanation:
      "Les philosophes des Lumières ont combattu à travers leurs œuvres pour la tolérance, la raison et la liberté de pensée. Voltaire (1694-1778) a défendu la liberté d'expression et combattu le fanatisme. Jean-Jacques Rousseau (1712-1778) a écrit « Du Contrat social » (1762), fondateur de la pensée démocratique. Denis Diderot (1713-1784) a dirigé l'Encyclopédie (1751-1772), somme des connaissances de son temps. Leurs idées ont inspiré la Révolution française.",
  },
  {
    id: "liv-036",
    category: "CSP",
    theme: "histoire",
    text: "Quelle est la date de la prise de la Bastille ?",
    choices: [
      "4 août 1789",
      "14 juillet 1789",
      "21 septembre 1792",
      "18 mars 1871",
    ],
    correctIndex: 1,
    explanation:
      "Le 14 juillet 1789, le peuple parisien s'empare de la prison royale de la Bastille, symbole de l'arbitraire monarchique. Cet événement marque le début de la Révolution française et la fin de l'Ancien Régime. Un an plus tard, la Fête de la Fédération (14 juillet 1790) célèbre l'unité nationale. Depuis la loi du 6 juillet 1880, le 14 juillet est la fête nationale française, marquée par le défilé militaire sur les Champs-Élysées et des feux d'artifice.",
  },
  {
    id: "liv-037",
    category: "NAT",
    theme: "histoire",
    text: "Quand la première République française a-t-elle été proclamée ?",
    choices: ["1789", "1792", "1870", "1958"],
    correctIndex: 1,
    explanation:
      "La Première République a été proclamée le 21 septembre 1792 par la Convention nationale, après la suspension de Louis XVI le 10 août 1792 et sa chute définitive. Elle instaure un régime sans roi pour la première fois dans l'histoire de France. Louis XVI est jugé et guillotiné le 21 janvier 1793. La Première République dure jusqu'en 1804 (avènement du Premier Empire). Elle est suivie par les IIᵉ (1848-1852), IIIᵉ (1870-1940), IVᵉ (1946-1958) et Vᵉ Républiques (depuis 1958).",
  },
  {
    id: "liv-038",
    category: "CR",
    theme: "histoire",
    text: "Qui est Napoléon Iᵉʳ et quelle œuvre majeure a-t-il laissée ?",
    choices: [
      "Un roi de France, créateur du franc",
      "Un empereur, créateur du Code civil",
      "Un président, fondateur de la Ve République",
      "Un philosophe, auteur du Contrat social",
    ],
    correctIndex: 1,
    explanation:
      "Napoléon Bonaparte (1769-1821), général puis empereur des Français de 1804 à 1814/1815, a dirigé la France pendant près de 15 ans. Il a mené de nombreuses guerres en Europe (Austerlitz 1805, Iéna 1806, Waterloo 1815) et créé un vaste empire. Son œuvre durable : le Code civil de 1804 (encore appelé « Code Napoléon »), qui organise le droit privé français, et qui a influencé de nombreux pays. Il a aussi créé le baccalauréat, la Légion d'honneur, le franc et la Banque de France.",
  },
  {
    id: "liv-039",
    category: "NAT",
    theme: "histoire",
    text: "En quelle année l'esclavage a-t-il été définitivement aboli en France ?",
    choices: ["1789", "1794", "1848", "1905"],
    correctIndex: 2,
    explanation:
      "L'esclavage a été définitivement aboli par le décret du 27 avril 1848 de la IIᵉ République, sous l'impulsion de Victor Schœlcher, sous-secrétaire d'État à la Marine et aux Colonies. Ce décret a immédiatement affranchi environ 250 000 esclaves dans les colonies françaises. Une première abolition avait été votée par la Convention en 1794, mais Napoléon l'avait rétablie en 1802. Victor Schœlcher repose au Panthéon depuis 1949.",
  },
  {
    id: "liv-040",
    category: "CR",
    theme: "histoire",
    text: "Qui est Jules Ferry et quelle grande réforme a-t-il initiée ?",
    choices: [
      "Un roi, à l'origine de Versailles",
      "Un empereur, à l'origine du Code civil",
      "Un ministre, à l'origine de l'école publique, gratuite et laïque",
      "Un général, à l'origine de la Ve République",
    ],
    correctIndex: 2,
    explanation:
      "Jules Ferry (1832-1893), ministre de l'Instruction publique au début des années 1880, est à l'origine des grandes lois scolaires qui ont transformé la France : loi du 16 juin 1881 (gratuité de l'école primaire publique), loi du 28 mars 1882 (obligation scolaire de 6 à 13 ans, laïcité de l'enseignement public). Ces « lois Ferry » ont posé les fondements de l'école républicaine française : publique, gratuite, obligatoire et laïque.",
  },
  {
    id: "liv-041",
    category: "NAT",
    theme: "histoire",
    text: "Qui est Victor Hugo ?",
    choices: [
      "Un peintre impressionniste",
      "L'un des plus grands écrivains français, auteur des Misérables",
      "Un philosophe des Lumières",
      "Un général de Napoléon",
    ],
    correctIndex: 1,
    explanation:
      "Victor Hugo (1802-1885) est l'un des plus grands écrivains français. Figure majeure du romantisme, il a écrit des romans (« Les Misérables » 1862, « Notre-Dame de Paris » 1831), des poèmes (« Les Contemplations », « Les Châtiments ») et des pièces de théâtre. Engagé politiquement, il a combattu les inégalités sociales et la peine de mort, siégé à l'Assemblée puis au Sénat. Exilé sous le Second Empire (Jersey, Guernesey), il repose au Panthéon depuis 1885.",
  },
  {
    id: "liv-042",
    category: "CSP",
    theme: "histoire",
    text: "Quelle date commémore la fin de la Première Guerre mondiale en France ?",
    choices: ["1ᵉʳ mai", "8 mai", "14 juillet", "11 novembre"],
    correctIndex: 3,
    explanation:
      "Le 11 novembre 1918 a été signé l'armistice à Rethondes (forêt de Compiègne) entre les Alliés et l'Allemagne, mettant fin à la Première Guerre mondiale (1914-1918). Cette guerre totale a fait plus de 9 millions de morts et 20 millions de blessés. Le 11 novembre est jour férié en France depuis la loi du 24 octobre 1922. Une cérémonie officielle se tient chaque année à l'Arc de Triomphe à Paris, autour de la tombe du Soldat inconnu.",
  },
  {
    id: "liv-043",
    category: "CSP",
    theme: "histoire",
    text: "Quelle date commémore la fin de la Seconde Guerre mondiale en Europe ?",
    choices: ["8 mai 1945", "6 juin 1944", "11 novembre 1918", "14 juillet 1789"],
    correctIndex: 0,
    explanation:
      "Le 8 mai 1945 marque la capitulation sans condition de l'Allemagne nazie (signée à Reims le 7 mai, ratifiée à Berlin le 8 mai), mettant fin à la Seconde Guerre mondiale en Europe. Cette guerre a fait plus de 50 millions de morts, dont une majorité de civils, et a été marquée par l'extermination de 6 millions de Juifs (Shoah), ainsi que de Tziganes, d'homosexuels et d'handicapés. Le 8 mai est jour férié en France depuis 1953 (aboli 1975-1981, puis rétabli par Mitterrand).",
  },
  {
    id: "liv-044",
    category: "CR",
    theme: "histoire",
    text: "Quelle date symbolise le début de la libération de la France en 1944 ?",
    choices: [
      "25 août 1944 (libération de Paris)",
      "6 juin 1944 (Débarquement en Normandie)",
      "11 novembre 1918",
      "18 juin 1940",
    ],
    correctIndex: 1,
    explanation:
      "Le 6 juin 1944, appelé « Jour J » (D-Day), les troupes alliées (américaines, britanniques, canadiennes, françaises libres) débarquent sur les plages de Normandie (Utah, Omaha, Gold, Juno, Sword) dans le cadre de l'opération Overlord — la plus grande opération amphibie de l'histoire. Ce débarquement marque le début de la libération de la France et de l'Europe de l'Ouest du joug nazi. Paris est libérée le 25 août 1944.",
  },
  {
    id: "liv-045",
    category: "NAT",
    theme: "histoire",
    text: "Qui a fondé la Vᵉ République en 1958 ?",
    choices: [
      "Léon Blum",
      "Charles de Gaulle",
      "François Mitterrand",
      "Georges Pompidou",
    ],
    correctIndex: 1,
    explanation:
      "Charles de Gaulle (1890-1970), chef historique de la Résistance française pendant la Seconde Guerre mondiale (Appel du 18 juin 1940 depuis Londres), est le fondateur de la Vᵉ République. Rappelé au pouvoir en juin 1958 face à la crise algérienne, il fait adopter par référendum la nouvelle Constitution (28 septembre 1958). Premier président élu en décembre 1958, réélu en 1965 (première élection présidentielle au suffrage universel direct), il démissionne en 1969.",
  },
  {
    id: "liv-046",
    category: "NAT",
    theme: "histoire",
    text: "Qu'est-ce que le régime de Vichy (1940-1944) ?",
    choices: [
      "Un régime démocratique",
      "Un régime non démocratique qui a collaboré avec l'Allemagne nazie",
      "Le nom de la Ve République",
      "Un gouvernement colonial",
    ],
    correctIndex: 1,
    explanation:
      "Le régime de Vichy a été instauré par le maréchal Philippe Pétain après la défaite française de juin 1940. Installé à Vichy, il a remplacé la IIIᵉ République par un régime autoritaire fondé sur la devise « Travail, Famille, Patrie ». Il a collaboré avec l'Allemagne nazie, notamment par la participation de l'administration française à la déportation d'environ 76 000 Juifs, dont 11 000 enfants. Sa responsabilité a été officiellement reconnue par la République française le 16 juillet 1995 (discours de Jacques Chirac).",
  },
  {
    id: "liv-047",
    category: "CR",
    theme: "histoire",
    text: "En quelle année la majorité a-t-elle été abaissée à 18 ans en France ?",
    choices: ["1945", "1968", "1974", "1981"],
    correctIndex: 2,
    explanation:
      "La loi du 5 juillet 1974, promulguée sous la présidence de Valéry Giscard d'Estaing, a abaissé l'âge de la majorité civile et électorale de 21 à 18 ans. Cette réforme a permis aux jeunes Français de voter dès 18 ans lors de l'élection présidentielle de 1974. Elle s'inscrit dans un mouvement de modernisation sociale amorcé après Mai 68. Autres réformes de l'époque : loi Veil sur l'IVG (1975), divorce par consentement mutuel (1975).",
  },
  {
    id: "liv-048",
    category: "NAT",
    theme: "histoire",
    text: "Qui a porté la loi légalisant l'interruption volontaire de grossesse (IVG) en 1975 ?",
    choices: [
      "Édith Cresson",
      "Simone Veil",
      "Martine Aubry",
      "Ségolène Royal",
    ],
    correctIndex: 1,
    explanation:
      "Simone Veil (1927-2017), ministre de la Santé sous la présidence de Valéry Giscard d'Estaing, a porté la loi du 17 janvier 1975 dépénalisant l'interruption volontaire de grossesse (IVG). Son discours à l'Assemblée nationale est resté historique. Rescapée de la Shoah (déportée à Auschwitz en 1944), elle a également présidé le Parlement européen (1979-1982, première femme à ce poste). Elle repose au Panthéon depuis 2018. Le droit à l'IVG a été inscrit dans la Constitution le 8 mars 2024.",
  },
  {
    id: "liv-049",
    category: "CR",
    theme: "histoire",
    text: "En quelle année la peine de mort a-t-elle été abolie en France ?",
    choices: ["1958", "1968", "1981", "1993"],
    correctIndex: 2,
    explanation:
      "La peine de mort a été abolie en France par la loi du 9 octobre 1981, à l'initiative du garde des Sceaux Robert Badinter, sous la présidence de François Mitterrand. Son discours à l'Assemblée nationale le 17 septembre 1981 est devenu un texte de référence. La France a été le 36ᵉ État à abolir la peine de mort. En 2007, l'abolition a été inscrite dans la Constitution (article 66-1). La France a aussi contribué au 2ᵉ Protocole facultatif du Pacte international (1989) visant l'abolition universelle.",
  },
  {
    id: "liv-050",
    category: "NAT",
    theme: "histoire",
    text: "Qu'est-ce que Mai 68 ?",
    choices: [
      "Une guerre coloniale",
      "Un grand mouvement social étudiant et ouvrier",
      "Un coup d'État militaire",
      "Une révolution religieuse",
    ],
    correctIndex: 1,
    explanation:
      "Mai 68 est un vaste mouvement social qui a secoué la France en mai-juin 1968. Initié par les étudiants (occupation de la Sorbonne, barricades au Quartier latin), il s'est étendu aux salariés avec une grève générale touchant 7 à 10 millions de travailleurs (record mondial à l'époque). Il s'est soldé par les accords de Grenelle (augmentation du SMIG de 35 %, reconnaissance des sections syndicales d'entreprise), puis par la dissolution de l'Assemblée et la victoire électorale du camp gaulliste.",
  },

  // ==========================================================
  // GÉOGRAPHIE
  // ==========================================================
  {
    id: "liv-051",
    category: "CSP",
    theme: "geographie",
    text: "Quelle est la capitale de la France ?",
    choices: ["Lyon", "Marseille", "Paris", "Bordeaux"],
    correctIndex: 2,
    explanation:
      "Paris est la capitale de la France depuis le Moyen Âge (installation durable des rois capétiens à partir de 987). Avec 2,1 millions d'habitants intra-muros et plus de 12 millions en Île-de-France, c'est la ville la plus peuplée du pays. Elle abrite toutes les grandes institutions : Élysée, Matignon, Palais Bourbon, Palais du Luxembourg, Conseil constitutionnel, ministères, et constitue la première destination touristique mondiale.",
  },
  {
    id: "liv-052",
    category: "CSP",
    theme: "geographie",
    text: "Quel est le plus long fleuve de France ?",
    choices: ["La Seine", "La Loire", "Le Rhône", "La Garonne"],
    correctIndex: 1,
    explanation:
      "La Loire est le plus long fleuve de France avec 1 006 km. Elle prend sa source au mont Gerbier-de-Jonc en Ardèche (1 408 m d'altitude) et se jette dans l'océan Atlantique à Saint-Nazaire. Son bassin couvre un cinquième du territoire français. La vallée de la Loire, avec ses célèbres châteaux (Chambord, Chenonceau, Amboise, Blois), est classée au patrimoine mondial de l'UNESCO depuis 2000. Les autres grands fleuves : Seine (776 km), Rhône (812 km dont 522 en France), Garonne (647 km), Rhin (1 233 km dont 190 en France).",
  },
  {
    id: "liv-053",
    category: "CR",
    theme: "geographie",
    text: "Quel est le plus haut sommet des Alpes et d'Europe occidentale ?",
    choices: [
      "Le Mont Ventoux",
      "Le Mont Blanc",
      "Le Puy de Dôme",
      "L'Aiguille du Midi",
    ],
    correctIndex: 1,
    explanation:
      "Le mont Blanc culmine à 4 805 m (altitude officielle 2023) à la frontière franco-italienne, dans le massif des Alpes. C'est le plus haut sommet d'Europe occidentale. La première ascension a été réalisée le 8 août 1786 par Jacques Balmat et le docteur Michel Paccard. La souveraineté du sommet est partagée entre la France (Haute-Savoie) et l'Italie (Val d'Aoste) depuis le traité de Turin de 1860. Il attire chaque année plus de 30 000 alpinistes.",
  },
  {
    id: "liv-054",
    category: "NAT",
    theme: "geographie",
    text: "Combien d'habitants la France compte-t-elle environ en 2021 ?",
    choices: ["45 millions", "55 millions", "67,4 millions", "85 millions"],
    correctIndex: 2,
    explanation:
      "En 2021, la France compte environ 67,4 millions d'habitants (source INSEE), dont environ 65 millions en France métropolitaine et 2,7 millions dans les territoires d'outre-mer. Son territoire s'étend sur 675 000 km². La France est la 2ᵉ population de l'Union européenne après l'Allemagne. Elle compte 17 agglomérations de plus de 500 000 habitants, dont les dix métropoles principales : Paris, Lyon, Marseille, Toulouse, Lille, Bordeaux, Nice, Nantes, Strasbourg et Rennes.",
  },
  {
    id: "liv-055",
    category: "NAT",
    theme: "geographie",
    text: "Combien de communes compte la France au 1er janvier 2021 ?",
    choices: ["environ 3 000", "environ 10 000", "environ 34 965", "environ 100 000"],
    correctIndex: 2,
    explanation:
      "La France compte 34 965 communes au 1er janvier 2021, soit environ 40 % des communes de l'Union européenne à elle seule. Chaque commune est administrée par un maire et un conseil municipal élus pour 6 ans. Cette densité exceptionnelle s'explique par la tradition historique française. De nombreuses communes se regroupent en intercommunalités (communautés de communes, communautés d'agglomération, métropoles) pour mutualiser leurs moyens.",
  },
  {
    id: "liv-056",
    category: "NAT",
    theme: "geographie",
    text: "Quel îlot rocheux normand abrite une célèbre abbaye classée à l'UNESCO ?",
    choices: [
      "L'île d'Oléron",
      "Le Mont-Saint-Michel",
      "L'île de Ré",
      "Belle-Île-en-Mer",
    ],
    correctIndex: 1,
    explanation:
      "Le Mont-Saint-Michel, îlot rocheux situé dans une baie entre la Normandie et la Bretagne (département de la Manche), est surmonté d'une abbaye bénédictine dont la construction a débuté au VIIIᵉ siècle (966 pour l'abbaye actuelle). Classé au patrimoine mondial de l'UNESCO depuis 1979 (et sa baie depuis 1979 également), c'est l'un des sites les plus visités de France, surnommé « la Merveille de l'Occident ». Sa baie connaît les plus grandes marées d'Europe continentale.",
  },

  // ==========================================================
  // CULTURE, SOCIÉTÉ, FRANCE DANS LE MONDE
  // ==========================================================
  {
    id: "liv-057",
    category: "CSP",
    theme: "culture",
    text: "Quel monument parisien a été construit pour l'Exposition universelle de 1889 ?",
    choices: [
      "L'Arc de Triomphe",
      "La Tour Eiffel",
      "Le Sacré-Cœur",
      "L'Opéra Garnier",
    ],
    correctIndex: 1,
    explanation:
      "La Tour Eiffel, construite par l'ingénieur Gustave Eiffel pour l'Exposition universelle de 1889 (centenaire de la Révolution), a été inaugurée le 31 mars 1889. Haute de 330 m (avec antennes), elle est restée le plus haut édifice du monde jusqu'en 1930. Initialement prévue pour une durée de 20 ans, elle a été sauvée grâce à son rôle d'antenne radio. C'est aujourd'hui le monument payant le plus visité au monde, avec plus de 7 millions de visiteurs par an.",
  },
  {
    id: "liv-058",
    category: "NAT",
    theme: "culture",
    text: "Quel château royal a été construit par Louis XIV près de Paris ?",
    choices: ["Fontainebleau", "Chambord", "Versailles", "Chenonceau"],
    correctIndex: 2,
    explanation:
      "Le château de Versailles, situé à une vingtaine de kilomètres à l'ouest de Paris, a été construit sous l'impulsion de Louis XIV à partir de 1661 autour d'un ancien pavillon de chasse. Résidence officielle des rois de France (Louis XIV, Louis XV, Louis XVI) de 1682 à 1789, il compte environ 2 300 pièces réparties sur 63 154 m². La Galerie des Glaces est l'une de ses pièces les plus célèbres. Classé à l'UNESCO depuis 1979, il accueille chaque année plus de 8 millions de visiteurs.",
  },
  {
    id: "liv-059",
    category: "CR",
    theme: "culture",
    text: "Depuis 1992, les citoyens français sont aussi citoyens de quelle union politique ?",
    choices: [
      "L'Union africaine",
      "L'Union européenne",
      "L'OTAN",
      "L'Organisation des Nations Unies",
    ],
    correctIndex: 1,
    explanation:
      "Le traité de Maastricht, signé le 7 février 1992 et entré en vigueur le 1er novembre 1993, a créé l'Union européenne et instauré la citoyenneté européenne. Tout Français est automatiquement citoyen européen. Cette citoyenneté donne droit : à circuler et séjourner librement dans l'UE, à voter et être éligible aux élections européennes et municipales dans le pays de résidence, à la protection consulaire dans les pays tiers, et à pétitionner auprès du Parlement européen.",
  },
  {
    id: "liv-060",
    category: "CR",
    theme: "culture",
    text: "Combien d'États membres compte l'Union européenne aujourd'hui ?",
    choices: ["15", "19", "27", "32"],
    correctIndex: 2,
    explanation:
      "L'Union européenne compte 27 États membres depuis le retrait du Royaume-Uni (Brexit) le 31 janvier 2020. Fondée à l'origine par 6 pays (Traité de Rome, 25 mars 1957 : France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg), elle s'est progressivement élargie. La France est l'un des membres fondateurs. L'Union européenne partage des principes démocratiques communs et garantit les droits des personnes via la Charte des droits fondamentaux adoptée en 2000.",
  },
  {
    id: "liv-061",
    category: "CSP",
    theme: "culture",
    text: "Quelle est la monnaie unique partagée par 19 pays européens, dont la France, depuis 2000 ?",
    choices: ["Le franc", "Le deutschemark", "L'euro", "La livre"],
    correctIndex: 2,
    explanation:
      "L'euro (€) est la monnaie unique de l'Union économique et monétaire européenne. Il est entré en circulation fiduciaire le 1er janvier 2002 (après une période de transition scripturale depuis 1999) et a remplacé le franc français. Aujourd'hui, 20 États membres de l'UE utilisent l'euro (la Croatie a rejoint la zone en 2023). Les billets sont identiques dans toute la zone, mais chaque pays frappe ses propres pièces avec une face nationale. L'euro est la 2ᵉ monnaie mondiale après le dollar.",
  },
  {
    id: "liv-062",
    category: "NAT",
    theme: "culture",
    text: "La France est-elle membre permanent du Conseil de sécurité de l'ONU ?",
    choices: [
      "Non",
      "Oui, avec droit de veto",
      "Seulement depuis 2000",
      "Oui, mais sans droit de veto",
    ],
    correctIndex: 1,
    explanation:
      "La France est l'un des 5 membres permanents du Conseil de sécurité de l'Organisation des Nations Unies (ONU), avec les États-Unis, la Russie, la Chine et le Royaume-Uni. Ce statut lui confère le droit de veto sur les résolutions du Conseil. L'ONU, fondée le 24 octobre 1945 après la Seconde Guerre mondiale, a pour mission de maintenir la paix et la sécurité internationales. La France y est représentée par un ambassadeur permanent à New York.",
  },
  {
    id: "liv-063",
    category: "NAT",
    theme: "culture",
    text: "Par combien de personnes le français est-il parlé couramment dans le monde ?",
    choices: [
      "Environ 60 millions",
      "Environ 100 millions",
      "Environ 200 millions",
      "Environ 500 millions",
    ],
    correctIndex: 2,
    explanation:
      "Le français est parlé couramment par environ 200 millions de personnes dans le monde, réparties dans plus de 70 pays (Europe, Afrique, Amérique, Océanie). C'est la 5ᵉ langue la plus parlée au monde et la 2ᵉ langue étrangère la plus apprise après l'anglais. L'Organisation internationale de la Francophonie (OIF), créée en 1970, regroupe 88 États et gouvernements partageant la langue française. Le français est langue officielle de l'ONU, de l'UE et des Jeux Olympiques.",
  },
  {
    id: "liv-064",
    category: "CR",
    theme: "culture",
    text: "La France est-elle la première destination touristique mondiale ?",
    choices: [
      "Non, c'est l'Espagne",
      "Non, ce sont les États-Unis",
      "Oui",
      "Non, c'est la Chine",
    ],
    correctIndex: 2,
    explanation:
      "La France est la première destination touristique mondiale depuis plusieurs décennies, avec environ 90 millions de visiteurs internationaux par an avant la crise sanitaire. Le tourisme représente environ 8 % du PIB français et plus de 2 millions d'emplois directs et indirects. Les sites les plus visités : Disneyland Paris, Tour Eiffel, Château de Versailles, Musée du Louvre, Cathédrale Notre-Dame, Arc de Triomphe, Mont-Saint-Michel, Côte d'Azur et les plages normandes.",
  },
  {
    id: "liv-065",
    category: "NAT",
    theme: "culture",
    text: "Que symbolisent les 12 étoiles du drapeau européen ?",
    choices: [
      "Les 12 pays fondateurs",
      "Les 12 mois de l'année",
      "Les idéaux d'unité et d'harmonie entre les Européens",
      "Les 12 apôtres",
    ],
    correctIndex: 2,
    explanation:
      "Le drapeau européen, constitué de 12 étoiles dorées disposées en cercle sur un fond bleu azur, symbolise les idéaux d'unité, de solidarité et d'harmonie entre les peuples européens. Créé en 1955 par le Conseil de l'Europe, il a été adopté en 1985 par la Communauté européenne. Le nombre 12 ne correspond pas au nombre d'États membres mais est un symbole traditionnel de perfection et de plénitude (12 mois, 12 signes du zodiaque). Il accompagne les drapeaux nationaux sur les bâtiments publics et les documents officiels de l'UE.",
  },
  {
    id: "liv-066",
    category: "NAT",
    theme: "culture",
    text: "Qui est Marie Curie, personnalité scientifique célèbre naturalisée française ?",
    choices: [
      "Une physicienne née en Pologne, découvreuse de la radioactivité",
      "Une chanteuse italienne",
      "Une actrice allemande",
      "Une philosophe grecque",
    ],
    correctIndex: 0,
    explanation:
      "Marie Curie (1867-1934), née Maria Skłodowska à Varsovie (Pologne), est une physicienne et chimiste naturalisée française en 1895 (par mariage avec Pierre Curie). Elle a découvert le polonium et le radium, fondé la science de la radioactivité et a reçu deux prix Nobel : physique en 1903 (avec son mari et Henri Becquerel) et chimie en 1911. Elle est la première femme à recevoir un prix Nobel et la seule à en avoir reçu deux dans deux disciplines différentes. Elle repose au Panthéon depuis 1995.",
  },
  {
    id: "liv-067",
    category: "NAT",
    theme: "culture",
    text: "Qui est Romain Gary, écrivain naturalisé français ?",
    choices: [
      "Le seul écrivain à avoir reçu le prix Goncourt deux fois",
      "Un philosophe naturalisé espagnol",
      "Un peintre naturalisé allemand",
      "Un musicien naturalisé américain",
    ],
    correctIndex: 0,
    explanation:
      "Romain Gary (1914-1980), né Roman Kacew à Vilnius (alors Empire russe), est le seul écrivain à avoir reçu deux fois le prix Goncourt : en 1956 pour « Les Racines du ciel » sous son nom, et en 1975 pour « La Vie devant soi » sous le pseudonyme d'Émile Ajar. Aviateur des Forces françaises libres pendant la Seconde Guerre mondiale, diplomate, écrivain, il a eu plusieurs vies. Son geste était unique car le Goncourt ne peut être attribué qu'une seule fois à un même auteur.",
  },
  {
    id: "liv-068",
    category: "CR",
    theme: "culture",
    text: "Qui est Dalida, célèbre chanteuse naturalisée française ?",
    choices: [
      "D'origine italienne",
      "D'origine égyptienne",
      "D'origine espagnole",
      "D'origine russe",
    ],
    correctIndex: 1,
    explanation:
      "Dalida (1933-1987), née Iolanda Cristina Gigliotti au Caire (Égypte) de parents italiens, est une chanteuse naturalisée française qui a connu une carrière internationale exceptionnelle. Elle a vendu plus de 170 millions de disques en 35 ans de carrière. Ses succès les plus célèbres : « Bambino » (1956), « Il venait d'avoir 18 ans » (1974), « Gigi l'amoroso » (1974), « Laissez-moi danser » (1979), « Mourir sur scène » (1983). Figure incontournable de la chanson française, elle chantait en 10 langues.",
  },
  {
    id: "liv-069",
    category: "NAT",
    theme: "culture",
    text: "Dans quels secteurs économiques la France est-elle particulièrement leader mondial ?",
    choices: [
      "Informatique et technologie uniquement",
      "Aéronautique et luxe",
      "Agriculture biologique uniquement",
      "Industrie minière",
    ],
    correctIndex: 1,
    explanation:
      "La France est la 6ᵉ puissance économique mondiale et l'un des leaders dans plusieurs secteurs d'excellence : l'aéronautique (Airbus, Safran, Dassault), le luxe (LVMH, Kering, L'Oréal, Hermès, Chanel), l'agroalimentaire, la pharmacie (Sanofi), le nucléaire civil (EDF, Framatome), l'automobile (Stellantis, Renault), les transports maritime et ferroviaire (CMA CGM, SNCF, Alstom). Le quartier d'affaires de Paris La Défense, le premier d'Europe, regroupe 500 entreprises dont les sièges sociaux du CAC 40.",
  },
  {
    id: "liv-070",
    category: "NAT",
    theme: "culture",
    text: "Quel texte européen, adopté en 2000, garantit les droits fondamentaux des personnes dans l'UE ?",
    choices: [
      "Le traité de Rome",
      "La Charte des droits fondamentaux de l'Union européenne",
      "La Convention de Schengen",
      "Le Code pénal européen",
    ],
    correctIndex: 1,
    explanation:
      "La Charte des droits fondamentaux de l'Union européenne, proclamée le 7 décembre 2000 à Nice, rassemble dans un texte unique l'ensemble des droits civils, politiques, économiques et sociaux des citoyens européens. Elle est divisée en 7 chapitres : Dignité, Libertés, Égalité, Solidarité, Citoyenneté, Justice, Dispositions générales. Depuis le traité de Lisbonne (entré en vigueur le 1er décembre 2009), elle a la même valeur juridique que les traités européens — donc force contraignante sur les institutions et les États membres.",
  },
];
