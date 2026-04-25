import { Question } from "@/types";

/**
 * OFFICIAL_QUESTIONS — questions apparues lors de la session libre gratuite
 * de l'examen civique 2026 (source : qcmcivique.fr). Les intitulés, options et
 * réponses correctes reprennent ce qui a été rencontré lors du test officiel.
 *
 * Les thèmes du référentiel ont été mappés vers les thèmes de l'application :
 *   - Système institutionnel          → institutions
 *   - Principes et valeurs            → valeurs
 *   - Droits et devoirs               → valeurs
 *   - Histoire et culture (histoire)  → histoire
 *   - Histoire et culture (culture)   → culture
 *   - Géographie                      → geographie
 *   - Vivre en France                 → culture
 */
export const OFFICIAL_QUESTIONS: Question[] = [
  // ============================================================
  // GÉOGRAPHIE
  // ============================================================
  {
    id: "off-001",
    category: "NAT",
    theme: "geographie",
    text: "Quelle chaîne de montagnes marque principalement la frontière entre la France et l'Italie ?",
    choices: ["Les Vosges", "Les Pyrénées", "Le Massif central", "Les Alpes"],
    correctIndex: 3,
    explanation:
      "Les Alpes s'étendent sur environ 1 200 km de la mer Méditerranée jusqu'à l'Autriche, et forment la frontière naturelle entre la France et l'Italie. Les Pyrénées séparent la France de l'Espagne, tandis que les Vosges et le Massif central sont entièrement situés en France.",
  },

  // ============================================================
  // HISTOIRE & CULTURE
  // ============================================================
  {
    id: "off-002",
    category: "CR",
    theme: "histoire",
    text: "Quel grand monument parisien a été inauguré pour l'Exposition universelle de 1889 ?",
    choices: ["Le Sacré-Cœur", "L'Arc de Triomphe", "Notre-Dame", "La Tour Eiffel"],
    correctIndex: 3,
    explanation:
      "La Tour Eiffel, conçue par l'ingénieur Gustave Eiffel, a été inaugurée le 31 mars 1889 pour l'Exposition universelle célébrant le centenaire de la Révolution française. Elle mesure 330 m et reste le monument payant le plus visité au monde.",
  },
  {
    id: "off-003",
    category: "NAT",
    theme: "histoire",
    text: "En quelle année l'esclavage a-t-il été définitivement aboli en France ?",
    choices: ["1848", "1789", "1794", "1905"],
    correctIndex: 0,
    explanation:
      "L'esclavage a été définitivement aboli le 27 avril 1848 par un décret de la IIᵉ République, sous l'impulsion de Victor Schœlcher. Une première abolition avait eu lieu en 1794 pendant la Révolution, mais Napoléon l'avait rétablie en 1802.",
  },
  {
    id: "off-004",
    category: "NAT",
    theme: "histoire",
    text: "Environ combien de pièces le Château de Versailles compte-t-il ?",
    choices: ["2 300 pièces", "1 200 pièces", "1 800 pièces", "500 pièces"],
    correctIndex: 0,
    explanation:
      "Le Château de Versailles compte environ 2 300 pièces réparties sur 63 154 m². Ancienne résidence des rois de France (Louis XIV, Louis XV, Louis XVI), il est classé au patrimoine mondial de l'UNESCO depuis 1979.",
  },
  {
    id: "off-005",
    category: "NAT",
    theme: "histoire",
    text: "Qui est l'auteur de Candide ?",
    choices: ["Montesquieu", "Diderot", "Rousseau", "Voltaire"],
    correctIndex: 3,
    explanation:
      "Voltaire (1694-1778), de son vrai nom François-Marie Arouet, a publié Candide ou l'Optimisme en 1759. Ce conte philosophique critique avec ironie l'optimisme de Leibniz à travers la célèbre formule « il faut cultiver notre jardin ».",
  },
  {
    id: "off-006",
    category: "NAT",
    theme: "culture",
    text: "Quelle est la comédie musicale française la plus célèbre dans le monde ?",
    choices: ["Les Misérables", "Cyrano", "Moulin Rouge", "Notre-Dame de Paris"],
    correctIndex: 0,
    explanation:
      "Les Misérables, adaptation du roman de Victor Hugo par Claude-Michel Schönberg et Alain Boublil, a été créée à Paris en 1980. Traduite en plus de 22 langues et jouée dans 40 pays, c'est la comédie musicale française la plus vue au monde avec plus de 70 millions de spectateurs.",
  },
  {
    id: "off-007",
    category: "NAT",
    theme: "culture",
    text: "Parmi les cinéastes suivants, lequel est considéré comme l'un des plus récompensés de la Nouvelle Vague française ?",
    choices: ["Jacques Rivette", "François Truffaut", "Jacques Tati", "Jean-Luc Godard"],
    correctIndex: 1,
    explanation:
      "François Truffaut (1932-1984), figure majeure de la Nouvelle Vague, a reçu l'Oscar du meilleur film étranger pour La Nuit américaine (1974), le Prix Louis-Delluc et de nombreux César. Ses films Les 400 Coups, Jules et Jim ou La Nuit américaine sont des classiques du cinéma mondial.",
  },

  // ============================================================
  // DROITS & DEVOIRS
  // ============================================================
  {
    id: "off-008",
    category: "CSP",
    theme: "valeurs",
    text: "Peut-on être expulsé de son logement sans décision de justice ?",
    choices: [
      "Non",
      "Seulement en été",
      "Oui",
      "Seulement si on ne paie pas son loyer",
    ],
    correctIndex: 0,
    explanation:
      "Nul ne peut être expulsé de son logement sans une décision de justice rendue par un juge. La procédure passe obligatoirement par un commandement de payer, une assignation au tribunal, puis un jugement d'expulsion. La trêve hivernale (1er novembre - 31 mars) interdit par ailleurs les expulsions.",
  },
  {
    id: "off-009",
    category: "CSP",
    theme: "valeurs",
    text: "Peut-on refuser l'accès à un service public en raison de l'origine d'une personne ?",
    choices: [
      "Oui, si l'origine est connue",
      "Oui, c'est le droit du service",
      "Non, c'est interdit par la loi",
      "Seulement dans certains services",
    ],
    correctIndex: 2,
    explanation:
      "La discrimination fondée sur l'origine (réelle ou supposée), l'ethnie, la nationalité ou la race est strictement interdite par l'article 225-1 du Code pénal et punie jusqu'à 3 ans d'emprisonnement et 45 000 € d'amende. Le principe d'égalité devant le service public est une valeur constitutionnelle.",
  },
  {
    id: "off-010",
    category: "CSP",
    theme: "valeurs",
    text: "Peut-on entrer au domicile d'une personne sans sa permission ?",
    choices: [
      "Toujours",
      "Non, sauf cas légaux",
      "Oui",
      "Jamais, en aucun cas",
    ],
    correctIndex: 1,
    explanation:
      "Le domicile est inviolable (article 9 de la Déclaration des droits de l'homme et du citoyen). On ne peut y entrer qu'avec l'accord de l'occupant ou dans les cas strictement prévus par la loi : perquisition judiciaire sur commission rogatoire, flagrant délit, danger imminent (incendie, fuite de gaz), ou décision de justice.",
  },

  // ============================================================
  // NUMÉROS D'URGENCE
  // ============================================================
  {
    id: "off-011",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est le numéro d'appel des pompiers en France ?",
    choices: ["17", "15", "112", "18"],
    correctIndex: 3,
    explanation:
      "Le 18 est le numéro des sapeurs-pompiers, à composer pour tout incendie, accident, secours à personne ou risque technologique. Les autres numéros essentiels : 15 SAMU (urgences médicales), 17 Police/Gendarmerie, 112 numéro d'urgence européen, 114 pour les personnes sourdes/malentendantes, 119 enfance en danger, 3919 violences conjugales.",
  },
  {
    id: "off-012",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est le numéro d'appel du SAMU (urgences médicales) ?",
    choices: ["15", "17", "18", "112"],
    correctIndex: 0,
    explanation:
      "Le 15 est le numéro du SAMU (Service d'aide médicale urgente), à composer en cas de malaise, arrêt cardiaque, détresse respiratoire ou toute urgence médicale vitale. Un médecin régulateur évalue l'urgence et décide de l'intervention appropriée.",
  },
  {
    id: "off-013",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est le numéro d'appel de la Police et de la Gendarmerie ?",
    choices: ["15", "17", "18", "112"],
    correctIndex: 1,
    explanation:
      "Le 17 est le numéro de la Police nationale (en ville) et de la Gendarmerie (en zone rurale). À composer en cas de crime, délit flagrant, agression, vol en cours ou atteinte à la sécurité des personnes.",
  },
  {
    id: "off-014",
    category: "CSP",
    theme: "valeurs",
    text: "Quel est le numéro d'urgence européen unique, accessible dans tous les pays de l'UE ?",
    choices: ["15", "17", "18", "112"],
    correctIndex: 3,
    explanation:
      "Le 112 est le numéro d'urgence européen, gratuit et accessible depuis n'importe quel téléphone (même sans carte SIM) dans les 27 États membres de l'Union européenne. Il permet de joindre les services de secours dans la langue de son choix.",
  },

  // ============================================================
  // SYSTÈME INSTITUTIONNEL
  // ============================================================
  {
    id: "off-015",
    category: "CR",
    theme: "institutions",
    text: "Qui a le droit de dissoudre l'Assemblée nationale ?",
    choices: [
      "Un droit du Sénat",
      "Aucun droit ne le permet",
      "Le Président de la République",
      "Un droit de l'Assemblée nationale",
    ],
    correctIndex: 2,
    explanation:
      "Selon l'article 12 de la Constitution, le Président de la République peut prononcer la dissolution de l'Assemblée nationale après consultation du Premier ministre et des présidents des deux assemblées. De nouvelles élections législatives doivent alors se tenir dans les 20 à 40 jours suivants. Une nouvelle dissolution ne peut avoir lieu dans l'année qui suit.",
  },
  {
    id: "off-016",
    category: "NAT",
    theme: "institutions",
    text: "Quel est traditionnellement le premier acte symbolique d'un nouveau Président de la République ?",
    choices: [
      "Dissoudre le Parlement",
      "Remonter les Champs-Élysées et raviver la flamme du Soldat inconnu",
      "Nommer immédiatement ses ministres",
      "Modifier la Constitution",
    ],
    correctIndex: 1,
    explanation:
      "Le jour de sa passation de pouvoirs, le nouveau Président remonte les Champs-Élysées jusqu'à l'Arc de Triomphe pour raviver la flamme du Soldat inconnu, geste symbolique d'hommage aux morts pour la France. Il dépose ensuite une gerbe sur la tombe du Soldat inconnu qui repose sous l'Arc depuis 1921.",
  },
  {
    id: "off-017",
    category: "CR",
    theme: "institutions",
    text: "Qu'est-ce qu'une motion de censure ?",
    choices: [
      "Un vote des députés pour renverser le gouvernement",
      "Une interdiction de parole au Parlement",
      "Un vote de confiance demandé par le gouvernement",
      "Une interdiction de publication pour la presse",
    ],
    correctIndex: 0,
    explanation:
      "La motion de censure, prévue par l'article 49 de la Constitution, permet à l'Assemblée nationale de renverser le gouvernement. Elle doit être déposée par au moins un dixième des députés (58) et adoptée à la majorité absolue (289 voix). Si elle est votée, le Premier ministre doit remettre la démission du gouvernement au Président.",
  },
  {
    id: "off-018",
    category: "NAT",
    theme: "institutions",
    text: "Qu'est-ce que la souveraineté nationale ?",
    choices: [
      "Un concept historique inexistant aujourd'hui",
      "Le principe selon lequel le pouvoir appartient à la Nation (au peuple)",
      "Une obligation imposée aux citoyens",
      "Une décision de justice",
    ],
    correctIndex: 1,
    explanation:
      "La souveraineté nationale signifie que le pouvoir politique appartient à la Nation — c'est-à-dire au peuple français — qui l'exerce par ses représentants élus et par la voie du référendum (article 3 de la Constitution). C'est l'un des fondements de la démocratie républicaine française depuis 1789.",
  },
  {
    id: "off-019",
    category: "CR",
    theme: "institutions",
    text: "Quelle est la durée du mandat d'un sénateur français ?",
    choices: ["9 ans", "3 ans", "4 ans", "6 ans"],
    correctIndex: 3,
    explanation:
      "Les sénateurs sont élus pour un mandat de 6 ans au suffrage universel indirect par environ 162 000 grands électeurs (députés, conseillers régionaux, départementaux, municipaux). Le Sénat est renouvelé par moitié tous les 3 ans. Il compte 348 sénateurs et siège au Palais du Luxembourg à Paris.",
  },

  // ============================================================
  // PRINCIPES & VALEURS
  // ============================================================
  {
    id: "off-020",
    category: "NAT",
    theme: "valeurs",
    text: "Que garantit le principe de laïcité en France ?",
    choices: [
      "Un système théocratique",
      "L'absence totale de religion dans la société",
      "La neutralité de l'État et le respect de toutes les croyances",
      "Une religion obligatoire pour tous",
    ],
    correctIndex: 2,
    explanation:
      "La laïcité, consacrée par la loi du 9 décembre 1905 de séparation des Églises et de l'État, garantit la neutralité de la puissance publique et la liberté de conscience. L'État ne reconnaît, ne salarie ni ne subventionne aucun culte, mais protège la liberté de chacun de croire ou de ne pas croire et de pratiquer le culte de son choix.",
  },
  {
    id: "off-021",
    category: "NAT",
    theme: "valeurs",
    text: "La laïcité garantit-elle la liberté de conscience ?",
    choices: [
      "Non, elle l'interdit",
      "Seulement pour les chrétiens",
      "Oui, pour tous",
      "Seulement pour les athées",
    ],
    correctIndex: 2,
    explanation:
      "La laïcité garantit la liberté de conscience à tous, sans distinction. L'article 1er de la loi de 1905 dispose : « La République assure la liberté de conscience. Elle garantit le libre exercice des cultes. » Chacun est donc libre de croire ou de ne pas croire, et de changer de conviction à tout moment.",
  },
  {
    id: "off-022",
    category: "CR",
    theme: "valeurs",
    text: "Quels sont les principes fondamentaux du service public en France ?",
    choices: [
      "La continuité uniquement",
      "L'adaptabilité uniquement",
      "L'égalité uniquement",
      "La continuité, l'adaptabilité et l'égalité",
    ],
    correctIndex: 3,
    explanation:
      "Les trois grands principes du service public, dits « lois de Rolland », sont : la continuité (le service ne peut être interrompu), l'égalité (tous les usagers doivent être traités pareillement) et l'adaptabilité ou mutabilité (le service doit évoluer avec les besoins). Ces principes sont à valeur constitutionnelle.",
  },
  {
    id: "off-023",
    category: "NAT",
    theme: "valeurs",
    text: "Qu'est-ce que le bien commun ?",
    choices: [
      "Une obligation légale individuelle",
      "Un bien appartenant à une personne privée",
      "Un concept philosophique inexistant",
      "Ce qui est bénéfique à l'ensemble de la communauté",
    ],
    correctIndex: 3,
    explanation:
      "Le bien commun désigne ce qui profite à l'ensemble de la communauté et non à des intérêts particuliers : la santé publique, l'éducation, la sécurité, l'environnement, les libertés fondamentales. C'est un principe philosophique et politique central de la République, hérité de la pensée d'Aristote et de Thomas d'Aquin, puis repris par les Lumières.",
  },
  {
    id: "off-024",
    category: "NAT",
    theme: "valeurs",
    text: "La Charte de l'environnement a-t-elle une valeur constitutionnelle en France ?",
    choices: [
      "Seulement dans les zones rurales",
      "Oui, elle a valeur constitutionnelle depuis 2004",
      "Seulement dans les parcs naturels",
      "Non, elle est facultative",
    ],
    correctIndex: 1,
    explanation:
      "La Charte de l'environnement a été adossée à la Constitution par la loi constitutionnelle du 1er mars 2005. Elle consacre notamment le droit de chacun de vivre dans un environnement équilibré et respectueux de la santé, ainsi que les principes de précaution et de prévention. Ses 10 articles ont pleine valeur constitutionnelle.",
  },

  // ============================================================
  // VIVRE EN FRANCE
  // ============================================================
  {
    id: "off-025",
    category: "CSP",
    theme: "culture",
    text: "Combien de copies d'un acte de naissance peut-on demander en France ?",
    choices: ["3 maximum", "1 seule", "2 maximum", "Autant qu'on le souhaite"],
    correctIndex: 3,
    explanation:
      "Il n'y a aucune limite au nombre de copies d'acte de naissance que l'on peut demander. Les actes sont délivrés gratuitement par la mairie du lieu de naissance (ou le service central de l'état civil à Nantes pour les Français nés à l'étranger). Trois formats existent : copie intégrale, extrait avec filiation, extrait sans filiation.",
  },
  {
    id: "off-026",
    category: "CSP",
    theme: "culture",
    text: "Qui finance principalement la Sécurité sociale en France ?",
    choices: [
      "Une police d'assurance spéciale",
      "Un impôt unique",
      "Une association caritative",
      "Les cotisations sociales et les impôts (dont la CSG)",
    ],
    correctIndex: 3,
    explanation:
      "La Sécurité sociale est financée principalement par les cotisations sociales prélevées sur les salaires (part salariale + part patronale) et par des impôts affectés comme la CSG (Contribution sociale généralisée) et la CRDS. Elle couvre 5 risques : maladie, accidents du travail, vieillesse, famille et autonomie.",
  },
  {
    id: "off-027",
    category: "CSP",
    theme: "culture",
    text: "Qui peut bénéficier de l'Aide personnalisée au logement (APL) ?",
    choices: [
      "Seulement les propriétaires",
      "Les locataires remplissant les conditions de ressources",
      "Les entreprises uniquement",
      "Toute personne, sans condition",
    ],
    correctIndex: 1,
    explanation:
      "L'APL est versée par la CAF (ou la MSA) aux locataires (et parfois aux accédants à la propriété) dont les ressources ne dépassent pas certains plafonds. Le montant dépend des revenus, de la composition du foyer, du loyer payé et de la zone géographique. La demande se fait en ligne sur caf.fr.",
  },
  {
    id: "off-028",
    category: "CSP",
    theme: "culture",
    text: "Qu'est-ce que le prélèvement à la source de l'impôt sur le revenu ?",
    choices: [
      "L'impôt est prélevé directement sur le salaire ou la pension chaque mois",
      "Une remise accordée aux nouveaux contribuables",
      "Une facture reçue une fois par an",
      "Une décision de justice fiscale",
    ],
    correctIndex: 0,
    explanation:
      "Mis en place le 1er janvier 2019, le prélèvement à la source consiste à retenir directement l'impôt sur le revenu au moment du versement du salaire, de la pension ou des indemnités. Le taux est calculé par l'administration fiscale à partir de la déclaration. Il permet d'adapter l'impôt aux variations de revenus en temps réel.",
  },
  {
    id: "off-029",
    category: "NAT",
    theme: "culture",
    text: "Qu'est-ce que la protection subsidiaire ?",
    choices: [
      "Un statut pour les immigrants économiques",
      "Un statut de demandeur d'asile en attente",
      "Une protection accordée à qui ne remplit pas les critères de réfugié mais encourt une menace grave dans son pays",
      "Un concept juridique inexistant en France",
    ],
    correctIndex: 2,
    explanation:
      "La protection subsidiaire, instituée par la loi du 10 décembre 2003, est accordée par l'OFPRA aux personnes qui ne remplissent pas les critères de la Convention de Genève (réfugié) mais qui encourent dans leur pays d'origine une menace grave : peine de mort, torture, traitements inhumains, violences liées à un conflit armé. Elle ouvre droit à une carte de séjour de 4 ans.",
  },
];
