/**
 * Les 100 questions de l'entretien de naturalisation (entretien d'assimilation).
 *
 * Contrairement à l'examen civique (QCM), l'entretien en préfecture est un ORAL
 * à questions ouvertes. Chaque question a ici la réponse attendue.
 *
 * ⚠️ Contenu du prestataire — NE PAS réécrire à la main.
 * Source : LIVRABLE-prepacivique-fr/articles/*-entretien.md (livrés le 23/06/2026).
 * Extrait via scripts de parsing ; pour toute mise à jour, repartir des fichiers
 * du LIVRABLE plutôt que d'éditer ce fichier directement.
 *
 * Répartition (total = 100) :
 *   valeurs 20 · histoire 20 · institutions 20 · vie-en-france 15 ·
 *   geographie-culture 15 · parcours-personnel 10
 *
 * Note : la page-vitrine du prestataire annonce à tort 19 (institutions) et
 * 14 (géographie), soit 98 ; ses propres fichiers en contiennent bien 20 et 15.
 *
 * Pour « parcours-personnel », il n'y a pas de bonne réponse factuelle : la
 * réponse est un conseil de préparation (marqué `personnel: true`).
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
  /** Réponse attendue (ou conseil, pour le thème parcours-personnel). */
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

  // ---------- VALEURS ET PRINCIPES RÉPUBLICAINS (20) — valeurs-republique-entretien.md ----------
  {
    id: "ent-val-1",
    theme: "valeurs",
    question: "Qu'est-ce que la laïcité ?",
    answer:
      "La laïcité est le principe de séparation des Églises et de l'État (loi du 9 décembre 1905). Elle garantit la liberté de conscience : chacun est libre de croire ou non. L'État est neutre vis-à-vis des religions et ne les finance pas. Les agents publics sont soumis à une stricte neutralité religieuse. À l'école publique, les signes religieux ostensibles sont interdits pour les élèves (loi du 15 mars 2004).",
  },
  {
    id: "ent-val-2",
    theme: "valeurs",
    question: "Citez la devise de la République française.",
    answer:
      "« Liberté, Égalité, Fraternité ». C'est la devise inscrite dans la Constitution (article 2). Elle résume les trois piliers de la République depuis la Révolution française.",
  },
  {
    id: "ent-val-3",
    theme: "valeurs",
    question: "Quels sont les symboles officiels cités à l'article 2 de la Constitution ?",
    answer:
      "L'article 2 cite quatre éléments : la langue française, le drapeau tricolore (bleu, blanc, rouge), l'hymne national La Marseillaise, et la devise « Liberté, Égalité, Fraternité ». Marianne est le symbole allégorique de la République mais n'est pas mentionnée dans cet article.",
  },
  {
    id: "ent-val-4",
    theme: "valeurs",
    question: "Qu'est-ce que la séparation des pouvoirs ?",
    answer:
      "La séparation des pouvoirs est le principe selon lequel le pouvoir exécutif (gouvernement), le pouvoir législatif (Parlement) et le pouvoir judiciaire (tribunaux) sont exercés par des institutions indépendantes. Cela garantit qu'aucun pouvoir n'est absolu et prévient les abus.",
  },
  {
    id: "ent-val-5",
    theme: "valeurs",
    question: "Qu'est-ce que le principe d'égalité en France ?",
    answer:
      "Tous les citoyens sont égaux devant la loi, sans distinction d'origine, de race, de religion ou de sexe. L'égalité des droits est garantie par la Constitution et la DDHC de 1789. La parité en politique a été inscrite dans la Constitution par la révision de 1999 (article 1er).",
  },
  {
    id: "ent-val-6",
    theme: "valeurs",
    question: "Qu'est-ce que le principe de fraternité ?",
    answer:
      "La fraternité est le principe de solidarité entre les citoyens. Elle se traduit par le système de protection sociale, l'aide aux plus démunis, et le devoir moral d'entraide. La fraternité interdit aussi d'abandonner quelqu'un en danger (non-assistance à personne en danger est un délit).",
  },
  {
    id: "ent-val-7",
    theme: "valeurs",
    question: "Pourquoi la laïcité est-elle importante en France ?",
    answer:
      "La laïcité permet à des personnes de religions et de convictions différentes de vivre ensemble dans l'espace public en respectant des règles communes. Elle garantit que l'État ne favorise aucune religion et protège la liberté de chacun de croire ou de ne pas croire.",
  },
  {
    id: "ent-val-8",
    theme: "valeurs",
    question: "Qu'est-ce que le prosélytisme et est-il autorisé en France ?",
    answer:
      "Le prosélytisme est le fait de chercher à convertir activement d'autres personnes à sa religion. Dans l'espace public (écoles publiques, services de l'État), le prosélytisme est interdit au nom de la laïcité. Dans la sphère privée, la liberté religieuse s'applique.",
  },
  {
    id: "ent-val-9",
    theme: "valeurs",
    question: "Qu'est-ce que la liberté d'expression ?",
    answer:
      "Le droit de s'exprimer librement sans censure préalable de l'État. Elle est garantie par la DDHC de 1789. Toutefois, elle a des limites légales : incitation à la haine (racisme, antisémitisme, homophobie), diffamation, apologie du terrorisme sont des délits sanctionnés par la loi.",
  },
  {
    id: "ent-val-10",
    theme: "valeurs",
    question: "Qu'est-ce que le contrat d'intégration républicaine (CIR) ?",
    answer:
      "Signé à l'arrivée en France, il engage les étrangers à respecter les valeurs et lois françaises, à suivre une formation civique et linguistique organisée par l'OFII. Il est obligatoire pour obtenir un premier titre de séjour et sa signature est une condition pour demander une carte de résident ou la naturalisation.",
  },
  {
    id: "ent-val-11",
    theme: "valeurs",
    question: "Qu'est-ce que la Déclaration universelle des droits de l'Homme ?",
    answer:
      "Adoptée par l'ONU le 10 décembre 1948, elle proclame les droits fondamentaux de tous les êtres humains : liberté, égalité, non-discrimination, droit à la vie, droit à l'éducation... Le 10 décembre est la Journée internationale des droits de l'Homme. Elle n'est pas juridiquement contraignante mais est un socle moral mondial.",
  },
  {
    id: "ent-val-12",
    theme: "valeurs",
    question: "Que signifie « République indivisible » ?",
    answer:
      "L'État français est un et unifié : il n'y a qu'une seule loi pour tout le territoire. Cela s'oppose à tout séparatisme ou traitement différencié selon les régions ou les groupes. Cela n'empêche pas la décentralisation, mais les communes, départements et régions n'ont pas de souveraineté propre.",
  },
  {
    id: "ent-val-13",
    theme: "valeurs",
    question: "Qu'est-ce que la liberté de conscience ?",
    answer:
      "Le droit de chaque personne d'avoir ses propres croyances, qu'elles soient religieuses, philosophiques ou athées, sans contrainte de l'État ou de quiconque. C'est l'un des fondements de la laïcité française et de la liberté individuelle.",
  },
  {
    id: "ent-val-14",
    theme: "valeurs",
    question: "Que garantit l'égalité homme-femme en France ?",
    answer:
      "La Constitution interdit toute discrimination fondée sur le sexe. Les lois françaises garantissent l'égalité professionnelle (égalité salariale, parité dans les conseils d'administration), l'accès égal aux mandats électoraux, et la protection contre les violences conjugales, le harcèlement sexuel et les discriminations.",
  },
  {
    id: "ent-val-15",
    theme: "valeurs",
    question: "Que représente la Marianne ?",
    answer:
      "Marianne est l'allégorie féminine de la République française. Elle symbolise la liberté et la raison. Son buste figure dans toutes les mairies et ses traits apparaissent sur les pièces d'euro et les timbres. Elle porte le bonnet phrygien, symbole de liberté. Elle est un symbole traditionnel, pas un symbole constitutionnel.",
  },
  {
    id: "ent-val-16",
    theme: "valeurs",
    question: "Qu'est-ce que la liberté d'association ?",
    answer:
      "Le droit de se regrouper librement avec d'autres personnes pour un projet commun. La loi de 1901 régit les associations en France : toute association doit déclarer son objet en préfecture mais n'a pas besoin d'autorisation préalable de l'État. La France compte plus de 1,5 million d'associations.",
  },
  {
    id: "ent-val-17",
    theme: "valeurs",
    question: "Que commémore le 14 juillet ?",
    answer:
      "La fête nationale française, qui commémore deux événements : la prise de la Bastille le 14 juillet 1789 (symbole du début de la Révolution) et la Fête de la Fédération le 14 juillet 1790 (symbole de l'unité nationale). Il y a chaque année un défilé militaire sur les Champs-Élysées et des feux d'artifice partout en France.",
  },
  {
    id: "ent-val-18",
    theme: "valeurs",
    question: "Qu'est-ce que la discrimination et comment est-elle sanctionnée ?",
    answer:
      "Une distinction injustifiée entre des personnes en raison de leur origine, sexe, religion, handicap, orientation sexuelle, âge... La discrimination est un délit en France, passible de 3 ans d'emprisonnement et 45 000 € d'amende. Le Défenseur des droits peut être saisi gratuitement en cas de discrimination.",
  },
  {
    id: "ent-val-19",
    theme: "valeurs",
    question: "Qu'est-ce que le principe de solidarité en France ?",
    answer:
      "La solidarité est un devoir moral et juridique entre citoyens. Elle se concrétise par l'État-providence : Sécurité sociale, allocations familiales, aide au logement (APL), RSA. C'est aussi l'obligation légale de porter secours à une personne en danger (non-assistance à personne en danger est un délit).",
  },
  {
    id: "ent-val-20",
    theme: "valeurs",
    question: "Qu'est-ce que le droit d'asile en France ?",
    answer:
      "Le droit pour toute personne persécutée dans son pays (pour motifs politiques, religieux, ethniques ou d'appartenance à un groupe social) de demander protection en France. L'OFPRA (Office Français de Protection des Réfugiés et Apatrides) traite les demandes. La France a une longue tradition d'accueil des réfugiés.",
  },

  // ---------- HISTOIRE DE FRANCE (20) — histoire-france-entretien.md ----------
  {
    id: "ent-his-1",
    theme: "histoire",
    question: "Qu'est-ce que la Révolution française et quand a-t-elle commencé ?",
    answer:
      "La Révolution française a commencé en 1789 avec la prise de la Bastille le 14 juillet. Elle a mis fin à la monarchie absolue et instauré les principes de liberté, d'égalité et de souveraineté du peuple. Elle s'étend jusqu'en 1799, date du coup d'État de Napoléon Bonaparte.",
  },
  {
    id: "ent-his-2",
    theme: "histoire",
    question: "Combien de Républiques y a-t-il eu en France ?",
    answer:
      "Cinq : Ire République (1792-1804), IIe République (1848-1852), IIIe République (1870-1940), IVe République (1946-1958), Ve République depuis 1958. Entre ces républiques, la France a connu deux empires (Napoléon I et III) et deux monarchies restaurées.",
  },
  {
    id: "ent-his-3",
    theme: "histoire",
    question: "Qui a fondé la Ve République et quand ?",
    answer:
      "Le général Charles de Gaulle, en 1958, pendant la crise algérienne. Michel Debré, Premier ministre et juriste, en a été le principal rédacteur. La Constitution a été soumise à référendum le 28 septembre 1958 (79% de « Oui ») et promulguée le 4 octobre 1958.",
  },
  {
    id: "ent-his-4",
    theme: "histoire",
    question: "Que commémore le 11 novembre ?",
    answer:
      "L'armistice de la Première Guerre mondiale, signé le 11 novembre 1918 à 11h. C'est un jour férié et une journée de souvenir national pour les soldats morts pour la France. Des cérémonies ont lieu partout en France, notamment à l'Arc de Triomphe à Paris.",
  },
  {
    id: "ent-his-5",
    theme: "histoire",
    question: "Que commémore le 8 mai ?",
    answer:
      "La capitulation de l'Allemagne nazie le 8 mai 1945, marquant la fin de la Seconde Guerre mondiale en Europe. C'est un jour férié en France. La France a perdu environ 600 000 personnes durant ce conflit (militaires et civils).",
  },
  {
    id: "ent-his-6",
    theme: "histoire",
    question: "Qu'est-ce que la Déclaration des droits de l'homme et du citoyen (DDHC) ?",
    answer:
      "Un texte fondateur adopté le 26 août 1789 pendant la Révolution française. Il proclame les droits naturels et imprescriptibles : liberté, propriété, sûreté et résistance à l'oppression. Il fait partie du bloc de constitutionnalité français et s'applique encore aujourd'hui.",
  },
  {
    id: "ent-his-7",
    theme: "histoire",
    question: "Qui était Jean Moulin ?",
    answer:
      "Jean Moulin était préfet et résistant français, envoyé par de Gaulle pour unifier la Résistance intérieure. Il a créé le Conseil National de la Résistance en mai 1943. Arrêté par la Gestapo en juin 1943, il est mort en déportation. Ses cendres ont été transférées au Panthéon en 1964.",
  },
  {
    id: "ent-his-8",
    theme: "histoire",
    question: "Qu'est-ce que la Shoah ?",
    answer:
      "L'extermination systématique des Juifs d'Europe par les nazis pendant la Seconde Guerre mondiale (1941-1945). Environ 6 millions de Juifs ont été assassinés. En France, le régime de Vichy a collaboré à leur persécution, notamment lors de la rafle du Vél d'Hiv (16-17 juillet 1942) où 13 000 Juifs furent arrêtés.",
  },
  {
    id: "ent-his-9",
    theme: "histoire",
    question: "Qui était Napoléon Bonaparte et quel est son héritage ?",
    answer:
      "Général devenu Premier consul puis Empereur des Français (1804-1815). Il a réorganisé la France post-révolutionnaire : Code civil (1804), préfets, lycées, légion d'honneur, Banque de France. Son empire s'est effondré après la défaite de Waterloo (1815). Le Code civil inspire encore les droits de nombreux pays.",
  },
  {
    id: "ent-his-10",
    theme: "histoire",
    question: "Qu'est-ce que le régime de Vichy ?",
    answer:
      "Le gouvernement français collaborationniste dirigé par le maréchal Philippe Pétain de 1940 à 1944, sous l'occupation allemande. Il a participé à la déportation des Juifs de France et à la répression des résistants. En 1995, le Président Chirac a reconnu la responsabilité de l'État français dans ces crimes.",
  },
  {
    id: "ent-his-11",
    theme: "histoire",
    question: "Quand les femmes ont-elles obtenu le droit de vote en France ?",
    answer:
      "En 1944, par ordonnance du Général de Gaulle (27 octobre 1944). Elles ont voté pour la première fois aux élections municipales d'avril 1945. La France est l'un des derniers pays d'Europe occidentale à l'avoir accordé (la Suisse l'a accordé en 1971).",
  },
  {
    id: "ent-his-12",
    theme: "histoire",
    question: "Qu'est-ce que Jules Ferry a apporté à l'école ?",
    answer:
      "Ministre de l'Instruction publique dans les années 1880, Jules Ferry a instauré l'école gratuite (1881), laïque et obligatoire (1882) pour les enfants de 6 à 13 ans. Il est le père de l'école républicaine. Il a aussi retiré les crucifix des salles de classe et remplacé les religieux par des instituteurs laïcs.",
  },
  {
    id: "ent-his-13",
    theme: "histoire",
    question: "Qu'est-ce que la Résistance française ?",
    answer:
      "L'ensemble des mouvements qui ont refusé la défaite de juin 1940 et l'occupation allemande jusqu'en 1944. La Résistance extérieure (France Libre de de Gaulle à Londres) et intérieure (réseaux, maquis) ont coordonné leurs actions. Le Conseil National de la Résistance (CNR) a aussi rédigé le programme social de la Libération (Sécurité sociale, droit du travail).",
  },
  {
    id: "ent-his-14",
    theme: "histoire",
    question: "Qu'est-ce que l'affaire Dreyfus ?",
    answer:
      "Un scandale judiciaire (1894-1906) : le capitaine Alfred Dreyfus, officier juif, a été injustement condamné pour espionnage par antisémitisme. L'écrivain Émile Zola a publié « J'Accuse » en 1898 pour défendre Dreyfus. L'affaire a profondément divisé la France et contribué à faire adopter la loi de séparation des Églises et de l'État (1905).",
  },
  {
    id: "ent-his-15",
    theme: "histoire",
    question: "Qui était Victor Hugo ?",
    answer:
      "Écrivain, poète et homme politique français (1802-1885). Auteur des Misérables (1862) et de Notre-Dame de Paris (1831). Défenseur des pauvres et opposant à Napoléon III, il a vécu en exil à Guernesey. Il est enterré au Panthéon à Paris. Il reste le symbole de l'humanisme et de l'engagement républicain.",
  },
  {
    id: "ent-his-16",
    theme: "histoire",
    question: "Qu'est-ce que la décolonisation française ?",
    answer:
      "Le processus par lequel les territoires colonisés par la France ont accédé à l'indépendance après la Seconde Guerre mondiale. Les guerres d'Indochine (1946-1954) et d'Algérie (1954-1962) ont marqué cette période. L'Algérie a obtenu son indépendance par les accords d'Évian en mars 1962.",
  },
  {
    id: "ent-his-17",
    theme: "histoire",
    question: "Que s'est-il passé en mai 1968 ?",
    answer:
      "De grandes grèves et manifestations étudiantes et ouvrières ont paralysé la France (usines occupées, universités bloquées). De Gaulle a dissous l'Assemblée et obtenu une majorité aux élections de juin 1968. Mai 68 a entraîné des réformes sociales importantes : mensualisation des salaires, formation professionnelle, réforme de l'université.",
  },
  {
    id: "ent-his-18",
    theme: "histoire",
    question: "Qu'est-ce que le Code civil ?",
    answer:
      "Promulgué par Napoléon en 1804, c'est le texte fondateur du droit privé français. Il règle les relations entre personnes : mariage, propriété, héritage, contrats. Révisé de nombreuses fois depuis (mariage pour tous en 2013, réforme du droit des contrats en 2016), il a été exporté dans de nombreux pays et inspire encore des droits étrangers.",
  },
  {
    id: "ent-his-19",
    theme: "histoire",
    question: "Qui était Simone Veil et quel est son apport ?",
    answer:
      "Simone Veil (1927-2017), rescapée d'Auschwitz, est devenue ministre de la Santé sous Valéry Giscard d'Estaing. Elle a fait adopter la loi du 17 janvier 1975 légalisant l'interruption volontaire de grossesse (IVG). Elle a été la première présidente du Parlement européen élu au suffrage universel (1979). Elle est entrée au Panthéon en 2018.",
  },
  {
    id: "ent-his-20",
    theme: "histoire",
    question: "Qui était Robert Badinter et pourquoi est-il célèbre ?",
    answer:
      "Robert Badinter (1928-2024), avocat et homme politique. En tant que garde des Sceaux (ministre de la Justice) de François Mitterrand, il a fait adopter la loi du 9 octobre 1981 abolissant la peine de mort en France. Il a ensuite présidé le Conseil constitutionnel de 1986 à 1995. La France est ainsi devenue l'un des derniers pays d'Europe occidentale à abolir la peine capitale.",
  },

  // ---------- INSTITUTIONS ET POLITIQUE (20) — institutions-france-entretien.md ----------
  {
    id: "ent-ins-1",
    theme: "institutions",
    question: "Qui est le chef de l'État en France ?",
    answer:
      "Le Président de la République, élu au suffrage universel direct pour 5 ans (quinquennat, depuis 2002). Il nomme le Premier ministre, préside le Conseil des ministres, est chef des armées et garant de la Constitution. Il peut dissoudre l'Assemblée nationale.",
  },
  {
    id: "ent-ins-2",
    theme: "institutions",
    question: "Quel est le rôle du Premier ministre ?",
    answer:
      "Le Premier ministre dirige le gouvernement et coordonne l'action des ministres. Il met en œuvre les lois et est responsable devant l'Assemblée nationale (qui peut le renverser par une motion de censure). Il est nommé par le Président de la République, généralement issu de la majorité parlementaire.",
  },
  {
    id: "ent-ins-3",
    theme: "institutions",
    question: "Qu'est-ce que le Parlement en France ?",
    answer:
      "Le Parlement est bicaméral : il comprend l'Assemblée nationale (577 députés élus pour 5 ans au suffrage direct) et le Sénat (348 sénateurs élus pour 6 ans au suffrage indirect). Il vote les lois, le budget, et contrôle le gouvernement. En cas de désaccord, l'Assemblée nationale a le dernier mot.",
  },
  {
    id: "ent-ins-4",
    theme: "institutions",
    question: "Qu'est-ce que le suffrage universel direct ?",
    answer:
      "Le droit de vote accordé à tous les citoyens français majeurs (18 ans et plus), sans distinction de sexe, origine, religion ou fortune, qui votent directement pour élire leurs représentants. En France, le suffrage universel masculin date de 1848, le droit de vote des femmes de 1944.",
  },
  {
    id: "ent-ins-5",
    theme: "institutions",
    question: "Qu'est-ce que la Constitution de 1958 ?",
    answer:
      "La loi fondamentale de la Ve République, adoptée le 4 octobre 1958. Elle organise les pouvoirs de l'État (Président fort, Parlement encadré), garantit les droits des citoyens et fixe les règles de fonctionnement de la République. Le bloc de constitutionnalité inclut aussi la DDHC de 1789 et le Préambule de 1946.",
  },
  {
    id: "ent-ins-6",
    theme: "institutions",
    question: "Qu'est-ce que le Conseil constitutionnel ?",
    answer:
      "L'institution qui vérifie la conformité des lois à la Constitution avant ou après leur promulgation. Il est composé de 9 membres nommés pour 9 ans (3 par le Président de la République, 3 par le Président de l'Assemblée, 3 par le Président du Sénat). Les anciens Présidents de la République en sont membres de droit.",
  },
  {
    id: "ent-ins-7",
    theme: "institutions",
    question: "Qu'est-ce que la décentralisation ?",
    answer:
      "Le transfert de compétences de l'État central vers les collectivités territoriales (régions, départements, communes). Les lois de décentralisation de 1982-1983 (lois Defferre) ont donné une autonomie réelle aux collectivités. Elles ont leur propre budget, leurs propres élus et gèrent des domaines comme l'éducation, les transports, la culture.",
  },
  {
    id: "ent-ins-8",
    theme: "institutions",
    question: "Comment le Président de la République est-il élu ?",
    answer:
      "Au suffrage universel direct, à deux tours. Si aucun candidat n'obtient la majorité absolue au premier tour, les deux candidats arrivés en tête s'affrontent au second tour (la majorité simple suffit). Le Président est élu pour 5 ans et ne peut effectuer plus de deux mandats consécutifs.",
  },
  {
    id: "ent-ins-9",
    theme: "institutions",
    question: "Quelle est la différence entre l'Assemblée nationale et le Sénat ?",
    answer:
      "L'Assemblée nationale (577 députés) est élue au suffrage direct pour 5 ans et peut être dissoute par le Président. Le Sénat (348 sénateurs) est élu au suffrage indirect par les grands électeurs pour 6 ans et ne peut pas être dissous. En cas de désaccord persistant, l'Assemblée nationale a le dernier mot sur les lois ordinaires.",
  },
  {
    id: "ent-ins-10",
    theme: "institutions",
    question: "Qu'est-ce que le Conseil d'État ?",
    answer:
      "La plus haute juridiction administrative de France. Il a deux rôles : conseiller le gouvernement sur les projets de loi et de règlements (avis obligatoires) et juger les litiges entre les citoyens et l'administration (juridiction suprême de l'ordre administratif). À ne pas confondre avec le Conseil constitutionnel.",
  },
  {
    id: "ent-ins-11",
    theme: "institutions",
    question: "Qu'est-ce qu'un préfet ?",
    answer:
      "Représentant de l'État nommé par le Président de la République en Conseil des ministres. Il est présent dans chaque département et dans chaque région. Il veille à l'application des lois, maintient l'ordre public et coordonne les services de l'État sur son territoire. Les préfets ont été créés par Napoléon en 1800.",
  },
  {
    id: "ent-ins-12",
    theme: "institutions",
    question: "Qu'est-ce que la motion de censure ?",
    answer:
      "Un mécanisme parlementaire par lequel l'Assemblée nationale peut renverser le gouvernement. Elle doit être signée par au moins 1/10 des députés et adoptée à la majorité absolue des membres de l'Assemblée. Si adoptée, le Premier ministre remet sa démission. C'est le principal mécanisme de contrôle parlementaire du gouvernement.",
  },
  {
    id: "ent-ins-13",
    theme: "institutions",
    question: "Qu'est-ce que le Défenseur des droits ?",
    answer:
      "Une autorité constitutionnelle indépendante qui protège les droits des citoyens face aux administrations, défend les droits des enfants, lutte contre les discriminations et veille au respect de la déontologie des forces de l'ordre. Tout citoyen peut le saisir gratuitement. Il peut formuler des recommandations mais ne peut pas annuler des décisions administratives.",
  },
  {
    id: "ent-ins-14",
    theme: "institutions",
    question: "Quelle est la différence entre une loi et un décret ?",
    answer:
      "Une loi est votée par le Parlement (domaine législatif défini par l'article 34 de la Constitution). Un décret est signé par le Président ou le Premier ministre pour les domaines réglementaires (article 37) ou pour l'application des lois. Les décrets sont subordonnés aux lois, qui sont elles-mêmes subordonnées à la Constitution.",
  },
  {
    id: "ent-ins-15",
    theme: "institutions",
    question: "Qu'est-ce que la Cour de cassation ?",
    answer:
      "La plus haute juridiction de l'ordre judiciaire (droit civil et pénal). Elle ne rejuge pas les faits mais vérifie la bonne application du droit par les tribunaux inférieurs. Si la Cour de cassation casse un arrêt, l'affaire est renvoyée devant une autre cour d'appel. À ne pas confondre avec le Conseil d'État (ordre administratif).",
  },
  {
    id: "ent-ins-16",
    theme: "institutions",
    question: "Qu'est-ce que l'article 49-3 de la Constitution ?",
    answer:
      "Un article permettant au gouvernement d'adopter un texte de loi en engageant sa responsabilité, sans vote de l'Assemblée nationale. Si l'Assemblée ne vote pas une motion de censure dans les 24 heures, le texte est adopté automatiquement. Son usage est contesté car il court-circuite le débat parlementaire.",
  },
  {
    id: "ent-ins-17",
    theme: "institutions",
    question: "Comment sont élus les sénateurs ?",
    answer:
      "Au suffrage universel indirect, par environ 162 000 grands électeurs : les députés, conseillers régionaux et départementaux, et surtout les délégués des conseils municipaux. Le Sénat est renouvelé par moitié tous les 3 ans. Les sénateurs siègent pour 6 ans. Ce mode d'élection reflète la représentation des territoires.",
  },
  {
    id: "ent-ins-18",
    theme: "institutions",
    question: "Qu'est-ce que la Haute Autorité pour la transparence de la vie publique (HATVP) ?",
    answer:
      "L'instance qui contrôle les déclarations de patrimoine et d'intérêts des élus et hauts fonctionnaires. Elle prévient les conflits d'intérêts et contribue à la transparence de la vie publique. Créée en 2013 après des scandales politiques, elle publie les déclarations en ligne.",
  },
  {
    id: "ent-ins-19",
    theme: "institutions",
    question: "Qu'est-ce que le Conseil économique, social et environnemental (CESE) ?",
    answer:
      "La troisième assemblée constitutionnelle de la République. Composée de représentants de la société civile (syndicats, patronat, associations, ONG), elle émet des avis consultatifs sur les politiques économiques, sociales et environnementales. Elle ne vote pas les lois mais peut formuler des recommandations au gouvernement et au Parlement.",
  },
  {
    id: "ent-ins-20",
    theme: "institutions",
    question: "Qu'est-ce que le principe de laïcité dans les services publics ?",
    answer:
      "Les agents publics (fonctionnaires, agents contractuels) sont soumis à une stricte neutralité religieuse : ils ne peuvent porter aucun signe religieux visible dans l'exercice de leurs fonctions. Ils ne peuvent pas manifester leurs convictions religieuses au travail. Cette règle s'applique à toute la fonction publique.",
  },

  // ---------- VIE EN FRANCE (15) — vie-en-france-entretien.md ----------
  {
    id: "ent-vie-1",
    theme: "vie-en-france",
    question: "Qu'est-ce que la Sécurité sociale ?",
    answer:
      "Le système public d'assurance qui couvre les résidents contre les risques sociaux : maladie, maternité, invalidité, vieillesse, accidents du travail, allocations familiales. Elle est financée par les cotisations des employeurs et des salariés (charges sociales). La France a l'un des systèmes de protection sociale les plus complets au monde.",
  },
  {
    id: "ent-vie-2",
    theme: "vie-en-france",
    question: "Quel est le salaire minimum en France ?",
    answer:
      "Le SMIC (Salaire Minimum Interprofessionnel de Croissance). Il est revalorisé chaque 1er janvier en fonction de l'inflation et de la croissance. Il s'élève à environ 1 800 € brut mensuel pour un temps plein (montant revalorisé chaque année). Tout employeur est tenu de le respecter.",
  },
  {
    id: "ent-vie-3",
    theme: "vie-en-france",
    question: "À quel âge l'instruction est-elle obligatoire en France ?",
    answer:
      "L'instruction est obligatoire de 3 à 16 ans depuis 2019 (la loi Blanquer a abaissé l'âge de 6 à 3 ans). Les parents doivent assurer l'instruction de leurs enfants, soit dans un établissement scolaire, soit dans la famille (instruction en famille, sous contrôle de l'Éducation nationale).",
  },
  {
    id: "ent-vie-4",
    theme: "vie-en-france",
    question: "Qu'est-ce que la carte vitale ?",
    answer:
      "La carte d'assurance maladie électronique qui contient les données administratives de l'assuré. Elle permet d'être remboursé des soins médicaux, souvent sans avancer les frais (tiers payant). Tout résident en France a droit à être affilié à l'Assurance Maladie (PUMA — Protection Universelle Maladie).",
  },
  {
    id: "ent-vie-5",
    theme: "vie-en-france",
    question: "Comment fonctionne le système de retraite en France ?",
    answer:
      "La retraite française est fondée sur la répartition : les cotisations des actifs financent les pensions des retraités actuels. L'âge légal de départ est de 64 ans depuis la réforme de 2023. Le montant de la pension dépend du nombre de trimestres cotisés et du salaire moyen de carrière. Les retraites de base sont complétées par des retraites complémentaires (AGIRC-ARRCO).",
  },
  {
    id: "ent-vie-6",
    theme: "vie-en-france",
    question: "Qu'est-ce que le RSA (Revenu de Solidarité Active) ?",
    answer:
      "Une aide sociale versée par la CAF aux personnes sans ressources ou à faibles revenus pour garantir un revenu minimum. Il est d'environ 600 à 650 € par mois pour une personne seule (montant revalorisé chaque année). Il est conditionné à des démarches d'insertion professionnelle. Il a remplacé le RMI (Revenu Minimum d'Insertion) en 2009.",
  },
  {
    id: "ent-vie-7",
    theme: "vie-en-france",
    question: "Qu'est-ce qu'un CDI et un CDD ?",
    answer:
      "Le CDI (Contrat à Durée Indéterminée) est le contrat de travail standard en France, sans date de fin définie. Le CDD (Contrat à Durée Déterminée) est un contrat temporaire, limité dans le temps et réservé à des situations spécifiques (remplacement, surcroît d'activité, emploi saisonnier). Le CDI offre plus de sécurité et plus de droits à l'employé.",
  },
  {
    id: "ent-vie-8",
    theme: "vie-en-france",
    question: "Qu'est-ce que France Travail (anciennement Pôle emploi) ?",
    answer:
      "L'organisme public (renommé France Travail en 2024) qui accompagne les demandeurs d'emploi et verse les allocations chômage (ARE — Allocation de Retour à l'Emploi). Pour en bénéficier, il faut avoir cotisé pendant au moins 6 mois dans les 24 derniers mois. France Travail accompagne aussi les bénéficiaires du RSA depuis 2024.",
  },
  {
    id: "ent-vie-9",
    theme: "vie-en-france",
    question: "Qu'est-ce que la CAF (Caisse d'Allocations Familiales) ?",
    answer:
      "L'organisme qui verse les prestations familiales et sociales : allocations familiales (à partir du 2e enfant), aide personnalisée au logement (APL), RSA, prime d'activité, prestations petite enfance (PAJE). Elle dépend de la branche famille de la Sécurité sociale.",
  },
  {
    id: "ent-vie-10",
    theme: "vie-en-france",
    question: "Comment fonctionne le système scolaire français ?",
    answer:
      "L'enseignement comprend : maternelle (3-6 ans), primaire (6-11 ans, cycles 1 à 3), collège (11-15 ans, cycle 4 + 3e), lycée (15-18 ans, baccalauréat), puis l'enseignement supérieur (universités, grandes écoles, BTS...). Le baccalauréat est le diplôme national de fin de lycée qui ouvre l'accès à l'enseignement supérieur.",
  },
  {
    id: "ent-vie-11",
    theme: "vie-en-france",
    question: "Qu'est-ce que le principe de laïcité à l'école publique ?",
    answer:
      "Dans les écoles publiques, les élèves ne peuvent pas porter de signes religieux ostensibles (voile, kippa, grande croix) depuis la loi du 15 mars 2004. Les enseignants et personnels scolaires sont soumis au principe de neutralité. L'enseignement est laïc. Les élèves peuvent être dispensés de cours certains jours religieux sur demande des parents.",
  },
  {
    id: "ent-vie-12",
    theme: "vie-en-france",
    question: "Qu'est-ce que la médecine de ville et le médecin traitant ?",
    answer:
      "La médecine de ville regroupe les médecins en cabinet ou centre de santé. Le médecin traitant est le pivot du parcours de soins coordonnés : tout assuré doit en désigner un auprès de l'Assurance Maladie. Consulter un spécialiste sans passer par le médecin traitant entraîne un remboursement réduit.",
  },
  {
    id: "ent-vie-13",
    theme: "vie-en-france",
    question: "Comment déclarer ses revenus aux impôts en France ?",
    answer:
      "Les revenus doivent être déclarés chaque année (mai-juin) à l'administration fiscale. Depuis 2019, le prélèvement à la source déduit automatiquement l'impôt du salaire chaque mois. La déclaration annuelle (en ligne sur impots.gouv.fr) permet de déclarer tous les revenus et d'ajuster l'impôt. Le non-dépôt de déclaration est sanctionné.",
  },
  {
    id: "ent-vie-14",
    theme: "vie-en-france",
    question: "Qu'est-ce que le droit au logement opposable (DALO) ?",
    answer:
      "Une loi de 2007 qui reconnaît le droit au logement comme un droit justiciable pour les personnes sans logement ou mal logées qui ne peuvent y accéder par leurs propres moyens. Ces personnes peuvent déposer un recours devant une commission départementale, puis devant le tribunal administratif si l'État ne leur propose pas de logement.",
  },
  {
    id: "ent-vie-15",
    theme: "vie-en-france",
    question: "Qu'est-ce que l'OFII (Office Français de l'Immigration et de l'Intégration) ?",
    answer:
      "L'OFII est l'établissement public chargé de l'accueil et de l'intégration des étrangers en France. Il gère le contrat d'intégration républicaine (CIR), organise les formations civiques et linguistiques, et accompagne les primo-arrivants. C'est l'interlocuteur principal des étrangers pour leurs démarches d'intégration (visite médicale, entretien d'accueil, prescriptions de formation).",
  },

  // ---------- GÉOGRAPHIE ET CULTURE (15) — geographie-culture-entretien.md ----------
  {
    id: "ent-geo-1",
    theme: "geographie-culture",
    question: "Combien y a-t-il de régions en France (métropole + outre-mer) ?",
    answer:
      "18 régions au total : 13 en métropole (depuis la réforme de 2016 qui a fusionné les 22 régions) et 5 régions d'outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte). Les régions sont des collectivités territoriales ayant leurs propres élus (conseil régional) et compétences (lycées, transports, développement économique).",
  },
  {
    id: "ent-geo-2",
    theme: "geographie-culture",
    question: "Quelle est la capitale de la France et combien d'arrondissements comprend-elle ?",
    answer:
      "Paris, la plus grande ville de France. Elle est divisée en 20 arrondissements et se situe sur la Seine. Elle est le siège du gouvernement, du Parlement et des principales institutions. L'Île-de-France, dont Paris est le centre, est la région la plus peuplée de France avec 12 millions d'habitants.",
  },
  {
    id: "ent-geo-3",
    theme: "geographie-culture",
    question: "Quels sont les pays frontaliers de la France métropolitaine ?",
    answer:
      "La France partage ses frontières terrestres avec 8 pays : Belgique et Luxembourg (au nord), Allemagne et Suisse (à l'est), Italie et Monaco (au sud-est), Andorre et Espagne (au sud-ouest). Par ses territoires d'outre-mer, la France a aussi des frontières avec le Brésil, le Suriname, les Pays-Bas (Saint-Martin) et d'autres.",
  },
  {
    id: "ent-geo-4",
    theme: "geographie-culture",
    question: "Quels sont les principaux fleuves de France ?",
    answer:
      "La Loire (le plus long, 1 013 km), la Seine (qui traverse Paris, 775 km), le Rhône (qui prend sa source en Suisse), la Garonne (qui coule vers Bordeaux). Le Rhin forme la frontière avec l'Allemagne. Le Rhin et le Rhône se jettent respectivement dans la mer du Nord et la Méditerranée.",
  },
  {
    id: "ent-geo-5",
    theme: "geographie-culture",
    question: "Combien y a-t-il de départements en France (métropole + outre-mer) ?",
    answer:
      "101 départements : 96 en métropole (numérotés de 01 à 95 + 75 pour Paris) et 5 départements d'outre-mer ou DOM (Guadeloupe 971, Martinique 972, Guyane 973, La Réunion 974, Mayotte 976). Ces numéros figurent sur les codes postaux et les plaques d'immatriculation.",
  },
  {
    id: "ent-geo-6",
    theme: "geographie-culture",
    question: "Qu'est-ce que la Francophonie ?",
    answer:
      "L'ensemble des pays et personnes utilisant le français comme langue officielle, de travail ou de culture. L'Organisation Internationale de la Francophonie (OIF) compte 93 États membres. Le français est parlé par environ 320 millions de personnes dans le monde et est la 5e langue la plus parlée. Le 20 mars est la Journée internationale de la Francophonie.",
  },
  {
    id: "ent-geo-7",
    theme: "geographie-culture",
    question: "Quel est le plus haut sommet de France et d'Europe occidentale ?",
    answer:
      "Le Mont Blanc (4 807 m), dans les Alpes, à la frontière franco-italienne (les deux pays se disputent le sommet exact). C'est aussi le plus haut sommet d'Europe occidentale. Le massif alpin marque la frontière entre la France, l'Italie et la Suisse.",
  },
  {
    id: "ent-geo-8",
    theme: "geographie-culture",
    question: "Qu'est-ce que le Louvre ?",
    answer:
      "Le plus grand musée du monde par superficie, situé à Paris dans le 1er arrondissement. Il abrite environ 35 000 œuvres dont la Joconde de Léonard de Vinci et la Vénus de Milo. Ancienne résidence royale transformée en musée pendant la Révolution française (1793). Il reçoit environ 9 millions de visiteurs par an.",
  },
  {
    id: "ent-geo-9",
    theme: "geographie-culture",
    question: "Qu'est-ce que le baccalauréat et à qui s'adresse-t-il ?",
    answer:
      "Le diplôme national d'État qui sanctionne la fin des études secondaires (lycée, classe de terminale) et ouvre l'accès à l'enseignement supérieur. Il existe en trois voies : générale (Bac G), technologique (Bac T) et professionnelle (Bac Pro). La France est l'un des rares pays à avoir un examen national de fin de lycée à forte valeur symbolique.",
  },
  {
    id: "ent-geo-10",
    theme: "geographie-culture",
    question: "Quelle est la langue officielle de la France ?",
    answer:
      "Le français (article 2 de la Constitution : « La langue de la République est le français »). C'est la seule langue officielle. Les langues régionales (alsacien, breton, corse, basque, occitan, langues de la Martinique et Guadeloupe...) ne sont pas officielles mais bénéficient depuis 2008 d'une reconnaissance constitutionnelle au titre du patrimoine de la France.",
  },
  {
    id: "ent-geo-11",
    theme: "geographie-culture",
    question: "Combien y a-t-il de communes en France et quel est leur rôle ?",
    answer:
      "Environ 35 000 communes, ce qui fait de la France le pays de l'UE comptant le plus de communes. Chaque commune est administrée par un conseil municipal élu et un maire. Les communes gèrent l'état civil, les écoles maternelles et primaires, les espaces publics, l'urbanisme local.",
  },
  {
    id: "ent-geo-12",
    theme: "geographie-culture",
    question: "Qu'est-ce que la Tour Eiffel et quand a-t-elle été construite ?",
    answer:
      "Construite par Gustave Eiffel pour l'Exposition universelle de 1889 (centenaire de la Révolution française). Haute de 330 m (avec antenne), elle est le symbole de Paris et de la France dans le monde. Elle était initialement prévue pour être démontée en 1909 mais a été conservée pour ses antennes radio. Elle reçoit environ 7 millions de visiteurs par an.",
  },
  {
    id: "ent-geo-13",
    theme: "geographie-culture",
    question: "Quel est le rôle de la France dans les organisations internationales ?",
    answer:
      "La France est membre permanent du Conseil de sécurité de l'ONU (avec droit de veto). Elle est membre fondateur de l'Union européenne et de l'OTAN. Elle est membre du G7, du G20, de l'OCDE et de la Francophonie. Sa diplomatie est fondée sur le multilatéralisme et la défense du droit international.",
  },
  {
    id: "ent-geo-14",
    theme: "geographie-culture",
    question: "Qu'est-ce que la gastronomie française à l'UNESCO ?",
    answer:
      "Le repas gastronomique des Français a été inscrit au patrimoine culturel immatériel de l'UNESCO en 2010. C'est la première fois qu'une pratique culinaire nationale était ainsi reconnue. Cela inclut les pratiques sociales du repas : choix des mets, accord mets-vins, présentation de la table, progression du repas.",
  },
  {
    id: "ent-geo-15",
    theme: "geographie-culture",
    question: "Qu'est-ce que le Panthéon ?",
    answer:
      "Un mausolée républicain situé à Paris (5e arrondissement). Il accueille les dépouilles des « grands hommes » (et femmes depuis Marie Curie) auxquels la Nation souhaite rendre hommage. Parmi les personnalités inhumées : Voltaire, Rousseau, Victor Hugo, Émile Zola, Jean Jaurès, Jean Moulin, Simone Veil.",
  },

  // ---------- PARCOURS PERSONNEL (10) — questions-personnelles-entretien.md ----------
  {
    id: "ent-per-1",
    theme: "parcours-personnel",
    question: "Pourquoi souhaitez-vous devenir français ?",
    answer:
      "Question personnelle. Expliquez votre attachement sincère à la France et à ses valeurs : liberté, laïcité, solidarité. Parlez de votre vie construite ici, de votre projet d'avenir, de votre désir de participer pleinement à la vie démocratique. Montrez que c'est un choix réfléchi et non une simple démarche administrative.",
    personnel: true,
  },
  {
    id: "ent-per-2",
    theme: "parcours-personnel",
    question: "Depuis combien de temps vivez-vous en France et quel a été votre parcours ?",
    answer:
      "Question personnelle. Décrivez chronologiquement votre arrivée en France, les différents titres de séjour obtenus, votre évolution professionnelle et personnelle. Soulignez les étapes qui témoignent de votre intégration progressive dans la société française.",
    personnel: true,
  },
  {
    id: "ent-per-3",
    theme: "parcours-personnel",
    question: "Décrivez votre vie professionnelle en France.",
    answer:
      "Question personnelle. Présentez votre domaine d'activité, vos employeurs successifs, vos qualifications et votre contribution à la société française. Si vous êtes sans emploi, expliquez votre situation et vos démarches pour trouver un emploi.",
    personnel: true,
  },
  {
    id: "ent-per-4",
    theme: "parcours-personnel",
    question: "Avez-vous des liens avec votre pays d'origine ?",
    answer:
      "Question personnelle. Vous pouvez avoir des liens familiaux dans votre pays d'origine tout en vous étant pleinement intégré en France. Ce n'est pas contradictoire. La France autorise la double nationalité. Expliquez l'équilibre entre vos attaches d'origine et votre nouvelle vie en France.",
    personnel: true,
  },
  {
    id: "ent-per-5",
    theme: "parcours-personnel",
    question: "Avez-vous des enfants scolarisés en France ?",
    answer:
      "Question personnelle. Si oui, cela témoigne de votre enracinement en France. Parlez de leur scolarité, de leur intégration, de votre implication dans leur éducation républicaine. Si vous avez des enfants en bas âge, parlez de vos projets de scolarisation.",
    personnel: true,
  },
  {
    id: "ent-per-6",
    theme: "parcours-personnel",
    question: "Comment décrivez-vous votre intégration en France ?",
    answer:
      "Question personnelle. Parlez de vos relations avec les Français : voisinage, associations, amitiés, participation à la vie locale. Mentionnez votre pratique quotidienne du français, votre connaissance du quartier, de la commune, vos engagements civiques.",
    personnel: true,
  },
  {
    id: "ent-per-7",
    theme: "parcours-personnel",
    question: "Avez-vous des engagements associatifs ou bénévoles ?",
    answer:
      "Question personnelle. Si oui, décrivez-les. L'engagement associatif est très valorisé car il illustre votre participation à la vie civique française. Même de petits engagements (aide scolaire, club sportif, association culturelle) montrent votre insertion dans la société.",
    personnel: true,
  },
  {
    id: "ent-per-8",
    theme: "parcours-personnel",
    question: "Quelles valeurs républicaines vous sont personnellement importantes ?",
    answer:
      "Question personnelle. Citez des valeurs qui guident votre vie : la laïcité (le respect de la liberté de chacun de croire ou non), l'égalité (notamment hommes-femmes), la solidarité. Illustrez par des exemples concrets de votre vie quotidienne en France.",
    personnel: true,
  },
  {
    id: "ent-per-9",
    theme: "parcours-personnel",
    question: "Êtes-vous prêt à respecter toutes les lois françaises, y compris celles avec lesquelles vous n'êtes pas d'accord ?",
    answer:
      "Réponse attendue : oui. En tant que citoyen, vous vous engagez à respecter les lois démocratiquement adoptées. Si une loi vous semble injuste, la voie légitime pour la changer est la démocratie : voter, pétitionner, s'exprimer dans le cadre légal. Le respect de la loi est un devoir du citoyen.",
    personnel: true,
  },
  {
    id: "ent-per-10",
    theme: "parcours-personnel",
    question: "Que signifie pour vous devenir citoyen français ?",
    answer:
      "Question personnelle sur votre engagement. Parlez de votre désir de participer pleinement à la vie démocratique (voter, être juré d'assises si convoqué, payer vos impôts), de votre sentiment d'appartenir à la communauté nationale, et de votre adhésion sincère aux valeurs de la République française.",
    personnel: true,
  },
];

export function getEntretienByTheme(theme: EntretienTheme): EntretienQuestion[] {
  return ENTRETIEN_100.filter((q) => q.theme === theme);
}

export function countEntretienByTheme(theme: EntretienTheme): number {
  return getEntretienByTheme(theme).length;
}
