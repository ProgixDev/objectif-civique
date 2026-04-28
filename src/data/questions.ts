import { Question } from "@/types";
import { EXTENDED_QUESTIONS } from "./questions.extended";
import { OFFICIAL_QUESTIONS } from "./questions.official";
import { OFFICIAL_CSP_QUESTIONS } from "./questions.official.csp";
import { OFFICIAL_CR_QUESTIONS } from "./questions.official.cr";
import { OFFICIAL_NAT_QUESTIONS } from "./questions.official.nat";
import { LIVRET_QUESTIONS } from "./questions.livret";

const BASE_QUESTIONS: Question[] = [
  // Institutions (10)
  {
    id: "q1",
    category: "NAT",
    theme: "institutions",
    text: "Quelle est la devise de la République française ?",
    choices: [
      "Liberté, Égalité, Fraternité",
      "Liberté, Justice, Paix",
      "Travail, Famille, Patrie",
      "Unité, Force, Honneur",
    ],
    correctIndex: 0,
    explanation:
      "« Liberté, Égalité, Fraternité » est la devise officielle de la République française, inscrite à l'article 2 de la Constitution de 1958. Héritée de la Révolution française de 1789, elle a été popularisée par Maximilien Robespierre et rendue officielle sous la IIIᵉ République. On la retrouve gravée sur les frontons des mairies, des écoles et des tribunaux. « Travail, Famille, Patrie » était la devise du régime de Vichy (1940-1944), à ne pas confondre.",
  },
  {
    id: "q2",
    category: "CSP",
    theme: "institutions",
    text: "Qui est le chef de l'État en France ?",
    choices: [
      "Le Premier ministre",
      "Le Président de la République",
      "Le président du Sénat",
      "Le président de l'Assemblée nationale",
    ],
    correctIndex: 1,
    explanation:
      "Le Président de la République est le chef de l'État depuis l'instauration de la Vᵉ République en 1958. Élu au suffrage universel direct depuis la réforme de 1962, il exerce un mandat de 5 ans renouvelable une seule fois (depuis la révision constitutionnelle de 2008). Il réside au Palais de l'Élysée, nomme le Premier ministre et préside le Conseil des ministres. Le Premier ministre, lui, est chef du Gouvernement, pas chef de l'État.",
  },
  {
    id: "q3",
    category: "NAT",
    theme: "institutions",
    text: "Combien de chambres compose le Parlement français ?",
    choices: ["Une", "Deux", "Trois", "Quatre"],
    correctIndex: 1,
    explanation:
      "Le Parlement français est bicaméral : il comprend deux chambres. L'Assemblée nationale (577 députés élus au suffrage universel direct pour 5 ans) siège au Palais Bourbon. Le Sénat (348 sénateurs élus au suffrage universel indirect pour 6 ans) siège au Palais du Luxembourg. Les deux chambres votent les lois, mais en cas de désaccord c'est l'Assemblée nationale qui a le dernier mot (article 45 de la Constitution).",
  },
  {
    id: "q4",
    category: "CR",
    theme: "institutions",
    text: "Qui élit les députés de l'Assemblée nationale ?",
    choices: [
      "Les sénateurs",
      "Les maires",
      "Les citoyens au suffrage universel direct",
      "Le Président de la République",
    ],
    correctIndex: 2,
    explanation:
      "Les 577 députés sont élus au suffrage universel direct par les citoyens français majeurs inscrits sur les listes électorales. L'élection se fait au scrutin uninominal majoritaire à deux tours, dans le cadre des circonscriptions législatives. Leur mandat est de 5 ans. L'Assemblée nationale peut être dissoute par le Président (article 12 de la Constitution), ce qui entraîne de nouvelles élections.",
  },
  {
    id: "q5",
    category: "NAT",
    theme: "institutions",
    text: "Que signifie le sigle RF sur les bâtiments publics ?",
    choices: [
      "République Française",
      "Région France",
      "Royaume de France",
      "Rassemblement Français",
    ],
    correctIndex: 0,
    explanation:
      "Le sigle « RF » signifie République Française. Il figure sur les frontons des bâtiments publics (mairies, écoles, préfectures, tribunaux) aux côtés de la devise « Liberté, Égalité, Fraternité » et du drapeau tricolore. Il rappelle que l'édifice appartient à l'État républicain et au service des citoyens. On le retrouve aussi sur les pièces de monnaie en euros émises en France et sur de nombreux documents officiels.",
  },
  {
    id: "q6",
    category: "CSP",
    theme: "institutions",
    text: "Quelle est la durée du mandat présidentiel ?",
    choices: ["4 ans", "5 ans", "6 ans", "7 ans"],
    correctIndex: 1,
    explanation:
      "Le mandat présidentiel est de 5 ans depuis la réforme constitutionnelle du 2 octobre 2000 (quinquennat), entrée en vigueur avec l'élection de 2002. Auparavant, il était de 7 ans (septennat) depuis 1873. Depuis la révision constitutionnelle du 23 juillet 2008, un même président ne peut exercer plus de deux mandats consécutifs. Le président est élu au suffrage universel direct à deux tours.",
  },
  {
    id: "q7",
    category: "NAT",
    theme: "institutions",
    text: "Quel est le symbole féminin représentant la République ?",
    choices: ["Marianne", "Jeanne", "Joséphine", "Clémence"],
    correctIndex: 0,
    explanation:
      "Marianne est la figure allégorique de la République française depuis la Révolution. Coiffée du bonnet phrygien (symbole de liberté hérité des esclaves affranchis de Rome), elle incarne les valeurs républicaines : Liberté, Égalité, Fraternité. Son buste orne toutes les mairies de France, et son profil figure sur les timbres ainsi que sur les pièces et billets. Plusieurs femmes célèbres lui ont prêté leurs traits (Brigitte Bardot, Catherine Deneuve, Laetitia Casta, Sophie Marceau).",
  },
  {
    id: "q8",
    category: "CR",
    theme: "institutions",
    text: "Quelle est la capitale de la France ?",
    choices: ["Lyon", "Marseille", "Paris", "Toulouse"],
    correctIndex: 2,
    explanation:
      "Paris est la capitale de la France depuis le haut Moyen Âge (la dynastie capétienne y installe durablement le pouvoir à partir de 987 avec Hugues Capet). La ville accueille toutes les grandes institutions : Élysée (Président), Matignon (Premier ministre), Palais Bourbon (Assemblée), Palais du Luxembourg (Sénat), Palais-Royal (Conseil constitutionnel), ainsi que la plupart des ministères. Avec 2,1 millions d'habitants intra-muros et plus de 12 millions en Île-de-France, c'est la ville la plus peuplée du pays.",
  },
  {
    id: "q9",
    category: "NAT",
    theme: "institutions",
    text: "Le Conseil constitutionnel veille à la conformité des lois avec :",
    choices: [
      "Les traités européens",
      "La Constitution",
      "Le Code civil",
      "Le règlement de l'Assemblée",
    ],
    correctIndex: 1,
    explanation:
      "Le Conseil constitutionnel, créé par la Constitution de 1958, contrôle la conformité des lois à la Constitution. Il est composé de 9 membres nommés pour 9 ans (3 par le Président, 3 par le président de l'Assemblée, 3 par le président du Sénat), plus les anciens présidents de la République. Depuis 2010 et l'introduction de la QPC (Question prioritaire de constitutionnalité), tout justiciable peut contester devant lui une loi déjà en vigueur. Il siège au Palais-Royal à Paris.",
  },
  {
    id: "q10",
    category: "CSP",
    theme: "institutions",
    text: "Qui nomme le Premier ministre ?",
    choices: [
      "L'Assemblée nationale",
      "Le Sénat",
      "Le peuple par référendum",
      "Le Président de la République",
    ],
    correctIndex: 3,
    explanation:
      "Selon l'article 8 de la Constitution, le Premier ministre est nommé par le Président de la République. En pratique, il est choisi parmi la majorité parlementaire à l'Assemblée nationale — sinon le gouvernement risque immédiatement une motion de censure. Le Premier ministre dirige l'action du Gouvernement (article 21), propose la nomination des autres ministres au Président et coordonne l'administration. Il réside à l'Hôtel Matignon.",
  },

  // Histoire (6)
  {
    id: "q11",
    category: "CSP",
    theme: "histoire",
    text: "En quelle année la Marseillaise est-elle devenue l'hymne national ?",
    choices: ["1789", "1795", "1879", "1958"],
    correctIndex: 2,
    explanation:
      "La Marseillaise a été composée à Strasbourg dans la nuit du 25 au 26 avril 1792 par Claude Joseph Rouget de Lisle, officier du génie. Initialement intitulée « Chant de guerre pour l'armée du Rhin », elle prend son nom définitif après avoir été chantée par les fédérés marseillais entrant dans Paris. Proclamée chant national une première fois par la Convention en 1795, elle est définitivement adoptée comme hymne national de la République française en 1879 sous la IIIᵉ République, puis inscrite à l'article 2 de la Constitution en 1958.",
  },
  {
    id: "q12",
    category: "NAT",
    theme: "histoire",
    text: "Quelle date marque la prise de la Bastille ?",
    choices: ["14 juillet 1789", "4 août 1789", "10 août 1792", "21 septembre 1792"],
    correctIndex: 0,
    explanation:
      "Le 14 juillet 1789, le peuple parisien prend d'assaut la forteresse-prison de la Bastille, symbole de l'arbitraire royal. Cet événement marque le début de la Révolution française et de la fin de l'Ancien Régime. Le 14 juillet est la fête nationale française depuis la loi du 6 juillet 1880 — elle commémore à la fois la prise de la Bastille et la Fête de la Fédération du 14 juillet 1790 qui célébrait l'unité nationale. Les autres dates citées sont aussi révolutionnaires : 4 août 1789 (abolition des privilèges), 10 août 1792 (chute de la monarchie), 21 septembre 1792 (proclamation de la Iʳᵉ République).",
  },
  {
    id: "q13",
    category: "NAT",
    theme: "histoire",
    text: "Qui a proclamé l'abolition de l'esclavage en France en 1848 ?",
    choices: [
      "Napoléon III",
      "Victor Schœlcher",
      "Jules Ferry",
      "Léon Gambetta",
    ],
    correctIndex: 1,
    explanation:
      "Victor Schœlcher (1804-1893), sous-secrétaire d'État à la Marine et aux Colonies dans le gouvernement provisoire de la IIᵉ République, est le principal artisan du décret d'abolition définitive de l'esclavage du 27 avril 1848. Ce décret affranchit immédiatement environ 250 000 esclaves dans les colonies françaises (Antilles, Guyane, Réunion). Une première abolition avait été votée en 1794 par la Convention, mais Napoléon Bonaparte l'avait rétablie en 1802. Schœlcher repose au Panthéon depuis 1949.",
  },
  {
    id: "q14",
    category: "CR",
    theme: "histoire",
    text: "En quelle année les femmes ont-elles obtenu le droit de vote en France ?",
    choices: ["1848", "1918", "1944", "1968"],
    correctIndex: 2,
    explanation:
      "Les femmes françaises ont obtenu le droit de vote et d'éligibilité par ordonnance du 21 avril 1944, signée à Alger par le général de Gaulle, président du Gouvernement provisoire. Elles votent pour la première fois lors des élections municipales du 29 avril 1945. La France a pris du retard par rapport à d'autres démocraties : la Nouvelle-Zélande (1893), le Royaume-Uni (1918 partiellement, 1928 totalement), l'Allemagne (1919), les États-Unis (1920). En 1848, le suffrage « universel » ne concernait que les hommes.",
  },
  {
    id: "q15",
    category: "NAT",
    theme: "histoire",
    text: "Qui était le président de la République lors de la fondation de la Ve République ?",
    choices: [
      "Georges Pompidou",
      "Charles de Gaulle",
      "Vincent Auriol",
      "René Coty",
    ],
    correctIndex: 1,
    explanation:
      "Charles de Gaulle (1890-1970) est le fondateur et premier président de la Vᵉ République. Rappelé au pouvoir en juin 1958 face à la crise algérienne, il fait adopter par référendum (28 septembre 1958) une nouvelle Constitution qui renforce considérablement le pouvoir exécutif. Il est élu président le 21 décembre 1958, investi le 8 janvier 1959. Réélu en 1965 (première élection au suffrage universel direct), il démissionne en 1969 après l'échec du référendum sur la régionalisation. René Coty fut son prédécesseur, dernier président de la IVᵉ République.",
  },
  {
    id: "q16",
    category: "CSP",
    theme: "histoire",
    text: "Quel événement a marqué la fin de la Seconde Guerre mondiale en Europe ?",
    choices: [
      "Le 8 mai 1945",
      "Le 11 novembre 1918",
      "Le 6 juin 1944",
      "Le 14 juillet 1945",
    ],
    correctIndex: 0,
    explanation:
      "Le 8 mai 1945 marque la capitulation sans condition de l'Allemagne nazie à Reims (7 mai, ratifiée le 8 à Berlin), mettant fin à la Seconde Guerre mondiale en Europe. C'est jour férié en France depuis 1953, aboli par Giscard d'Estaing en 1975, puis rétabli par François Mitterrand en 1981. Les autres dates : 11 novembre 1918 (armistice de la Première Guerre mondiale), 6 juin 1944 (débarquement allié en Normandie, « Jour J »). La guerre en Asie ne s'achèvera qu'en septembre 1945 après la capitulation du Japon.",
  },

  // Valeurs (6)
  {
    id: "q17",
    category: "NAT",
    theme: "valeurs",
    text: "Que signifie la laïcité en France ?",
    choices: [
      "L'interdiction des religions",
      "La séparation des Églises et de l'État",
      "Le financement public des cultes",
      "L'obligation de pratiquer une religion",
    ],
    correctIndex: 1,
    explanation:
      "La laïcité repose sur la loi du 9 décembre 1905 de séparation des Églises et de l'État. Elle garantit la liberté de conscience (droit de croire ou de ne pas croire), la neutralité de la puissance publique (l'État ne privilégie aucun culte), et le libre exercice des cultes dans le respect de l'ordre public. Elle n'interdit donc pas les religions — au contraire, elle les protège toutes également. Elle est inscrite à l'article 1er de la Constitution : « La France est une République indivisible, laïque, démocratique et sociale. »",
  },
  {
    id: "q18",
    category: "CR",
    theme: "valeurs",
    text: "Quelle est la loi fondamentale de la laïcité en France ?",
    choices: [
      "La loi de 1881",
      "La loi de 1905",
      "La loi de 1958",
      "La loi de 2004",
    ],
    correctIndex: 1,
    explanation:
      "La loi du 9 décembre 1905 concernant la séparation des Églises et de l'État est la loi fondatrice de la laïcité française. Elle met fin au régime concordataire de 1801 (sauf en Alsace-Moselle qui conserve ce régime particulier). Son article 1er affirme la liberté de conscience et le libre exercice des cultes ; son article 2 dispose que « la République ne reconnaît, ne salarie ni ne subventionne aucun culte ». La loi de 2004 interdit les signes religieux ostensibles à l'école publique, et la loi de 1881 concerne la liberté de la presse.",
  },
  {
    id: "q19",
    category: "NAT",
    theme: "valeurs",
    text: "Les citoyens français sont égaux devant :",
    choices: [
      "L'école seulement",
      "La loi",
      "Le travail uniquement",
      "Le service public seulement",
    ],
    correctIndex: 1,
    explanation:
      "Le principe d'égalité devant la loi est proclamé par l'article 1er de la Déclaration des droits de l'homme et du citoyen de 1789 : « Les hommes naissent et demeurent libres et égaux en droits. » Il est réaffirmé à l'article 6 (« La Loi […] doit être la même pour tous, soit qu'elle protège, soit qu'elle punisse »). L'égalité s'applique aussi à l'école, au travail, au service public, au logement, à la santé — mais son fondement constitutionnel est l'égalité devant la loi. Toute discrimination fondée sur l'origine, le sexe, la religion, l'orientation sexuelle ou le handicap est strictement interdite (article 225-1 du Code pénal).",
  },
  {
    id: "q20",
    category: "CSP",
    theme: "valeurs",
    text: "La liberté d'expression est garantie par :",
    choices: [
      "La Convention européenne",
      "La Déclaration des droits de l'homme de 1789",
      "La Charte de l'environnement",
      "La loi de 1905",
    ],
    correctIndex: 1,
    explanation:
      "L'article 11 de la Déclaration des droits de l'homme et du citoyen de 1789 dispose : « La libre communication des pensées et des opinions est un des droits les plus précieux de l'Homme : tout Citoyen peut donc parler, écrire, imprimer librement, sauf à répondre de l'abus de cette liberté dans les cas déterminés par la Loi. » Cette déclaration a pleine valeur constitutionnelle depuis la décision du Conseil constitutionnel du 16 juillet 1971. La liberté d'expression est également protégée par l'article 10 de la Convention européenne des droits de l'homme, mais la réponse la plus fondamentale en droit français reste la DDHC.",
  },
  {
    id: "q21",
    category: "NAT",
    theme: "valeurs",
    text: "Le principe de fraternité implique :",
    choices: [
      "L'obligation familiale",
      "La solidarité entre citoyens",
      "L'appartenance religieuse",
      "Le service militaire",
    ],
    correctIndex: 1,
    explanation:
      "La fraternité est le troisième pilier de la devise républicaine. Elle appelle à la solidarité, à l'entraide et à l'humanité entre tous les citoyens, au-delà des différences d'origine, de religion ou de condition sociale. Le Conseil constitutionnel l'a consacrée comme principe à valeur constitutionnelle dans sa décision du 6 juillet 2018 (« affaire Cédric Herrou »), en reconnaissant notamment le « principe de fraternité » comme fondement du droit d'aider autrui, y compris une personne en situation irrégulière, dans un but humanitaire. Elle se traduit aussi concrètement par la Sécurité sociale, la solidarité nationale et l'aide aux plus démunis.",
  },
  {
    id: "q22",
    category: "CR",
    theme: "valeurs",
    text: "Qui protège les droits et libertés garantis par la Constitution ?",
    choices: [
      "Le Président",
      "Le Conseil constitutionnel",
      "Le Premier ministre",
      "Le Sénat",
    ],
    correctIndex: 1,
    explanation:
      "Le Conseil constitutionnel est le gardien des droits et libertés fondamentaux. Il vérifie que les lois votées par le Parlement respectent la Constitution et, depuis la révision de 2008, que les lois déjà en vigueur le respectent aussi (via la Question prioritaire de constitutionnalité — QPC). Il peut être saisi par le Président, le Premier ministre, les présidents des chambres, ou par 60 députés / 60 sénateurs. Il est aussi juge des élections nationales (présidentielle, législatives, sénatoriales) et des référendums. Le Défenseur des droits, créé en 2011, joue un rôle complémentaire dans la protection individuelle.",
  },

  // Géographie (4)
  {
    id: "q23",
    category: "NAT",
    theme: "geographie",
    text: "Combien de régions métropolitaines compte la France ?",
    choices: ["11", "12", "13", "18"],
    correctIndex: 2,
    explanation:
      "Depuis la loi du 16 janvier 2015 entrée en vigueur le 1ᵉʳ janvier 2016, la France métropolitaine compte 13 régions (contre 22 auparavant). La réforme a fusionné plusieurs régions : par exemple Auvergne + Rhône-Alpes, Nord-Pas-de-Calais + Picardie (Hauts-de-France), Alsace + Lorraine + Champagne-Ardenne (Grand Est). En ajoutant les 5 régions d'outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte), le total s'élève à 18 régions pour la France entière. La Corse a un statut particulier de collectivité unique.",
  },
  {
    id: "q24",
    category: "CSP",
    theme: "geographie",
    text: "Quel est le plus long fleuve de France ?",
    choices: ["La Seine", "La Loire", "Le Rhône", "La Garonne"],
    correctIndex: 1,
    explanation:
      "La Loire, avec 1 006 km, est le plus long fleuve entièrement français. Elle prend sa source au mont Gerbier-de-Jonc en Ardèche (à 1 408 m d'altitude) et se jette dans l'océan Atlantique à Saint-Nazaire. Son bassin couvre un cinquième du territoire français. Ses berges, avec les célèbres châteaux de la Loire (Chambord, Chenonceau, Amboise), sont classées au patrimoine mondial de l'UNESCO depuis 2000. La Seine (776 km), le Rhône (812 km dont 522 en France) et la Garonne (647 km) sont plus courts.",
  },
  {
    id: "q25",
    category: "CR",
    theme: "geographie",
    text: "Le point culminant de la France métropolitaine est :",
    choices: ["Le Puy de Sancy", "Le Mont Blanc", "Le Puy de Dôme", "L'Aiguille du Midi"],
    correctIndex: 1,
    explanation:
      "Le mont Blanc culmine à 4 805 m (altitude officielle mesurée en 2023) dans le massif des Alpes, à la frontière franco-italienne. C'est le plus haut sommet d'Europe occidentale. La première ascension historique a été réalisée par Jacques Balmat et le docteur Michel Paccard le 8 août 1786. La souveraineté du sommet est partagée entre la France et l'Italie depuis le traité de Turin de 1860. Les autres sommets cités sont en Auvergne : Puy de Sancy (1 886 m), Puy de Dôme (1 465 m). L'Aiguille du Midi (3 842 m) est également dans le massif du Mont Blanc mais n'est pas le point culminant.",
  },
  {
    id: "q26",
    category: "NAT",
    theme: "geographie",
    text: "La France est bordée par combien de mers et océans ?",
    choices: ["Un", "Deux", "Trois", "Quatre"],
    correctIndex: 2,
    explanation:
      "La France métropolitaine est bordée par trois étendues maritimes : la mer du Nord + la Manche (côtes normandes et de Picardie), l'océan Atlantique (côtes bretonnes, atlantique et aquitaine) et la mer Méditerranée (côtes d'Occitanie, de Provence et de Corse). Avec ses territoires d'outre-mer, la France possède le deuxième domaine maritime mondial après les États-Unis : environ 11 millions de km² de zone économique exclusive, répartis sur tous les océans (Atlantique, Pacifique, Indien, Austral).",
  },

  // Culture (4)
  {
    id: "q27",
    category: "NAT",
    theme: "culture",
    text: "Quelle est la principale fête nationale française ?",
    choices: [
      "Le 1er mai",
      "Le 8 mai",
      "Le 14 juillet",
      "Le 11 novembre",
    ],
    correctIndex: 2,
    explanation:
      "Le 14 juillet est la fête nationale française, instaurée par la loi du 6 juillet 1880. Elle commémore à la fois la prise de la Bastille (14 juillet 1789, début de la Révolution) et la Fête de la Fédération (14 juillet 1790, qui célébrait la réconciliation et l'unité nationale un an après la chute de l'Ancien Régime). Elle est marquée par le défilé militaire sur les Champs-Élysées, des bals populaires et des feux d'artifice partout en France. Les autres dates sont fériées : 1ᵉʳ mai (Fête du Travail), 8 mai (Victoire 1945), 11 novembre (Armistice 1918).",
  },
  {
    id: "q28",
    category: "CSP",
    theme: "culture",
    text: "Quel musée parisien abrite la Joconde ?",
    choices: [
      "Le musée d'Orsay",
      "Le Louvre",
      "Le Centre Pompidou",
      "Le musée Rodin",
    ],
    correctIndex: 1,
    explanation:
      "La Joconde (« Mona Lisa » en italien, « La Gioconda » en français par italianisme), peinte par Léonard de Vinci vers 1503-1519, est exposée au musée du Louvre à Paris, salle des États, aile Denon. Offerte au roi François Iᵉʳ qui l'avait installée à Fontainebleau, elle rejoint le Louvre à la Révolution. Avec environ 30 000 visiteurs par jour, c'est l'œuvre la plus célèbre du musée, protégée derrière une vitre blindée depuis son vol retentissant de 1911. Le Louvre est le plus grand musée d'art au monde avec 480 000 œuvres, dont 35 000 exposées.",
  },
  {
    id: "q29",
    category: "CR",
    theme: "culture",
    text: "Quel auteur a écrit \"Les Misérables\" ?",
    choices: [
      "Émile Zola",
      "Victor Hugo",
      "Gustave Flaubert",
      "Honoré de Balzac",
    ],
    correctIndex: 1,
    explanation:
      "Victor Hugo (1802-1885) a publié « Les Misérables » en 1862, durant son exil à Guernesey. Ce roman monumental (plus de 1 500 pages) suit le parcours de Jean Valjean, ancien forçat en quête de rédemption, et dénonce la misère sociale, l'injustice du système pénal et les inégalités du XIXᵉ siècle. Figure majeure du romantisme français, Hugo est aussi l'auteur de « Notre-Dame de Paris » (1831), des « Contemplations » (1856) et de nombreux poèmes. Député, puis sénateur, il fut un défenseur acharné des libertés républicaines. Il repose au Panthéon.",
  },
  {
    id: "q30",
    category: "NAT",
    theme: "culture",
    text: "Qui a peint les Nymphéas ?",
    choices: [
      "Claude Monet",
      "Pierre-Auguste Renoir",
      "Edgar Degas",
      "Paul Cézanne",
    ],
    correctIndex: 0,
    explanation:
      "Claude Monet (1840-1926), chef de file du mouvement impressionniste, a consacré les trente dernières années de sa vie à peindre les Nymphéas — les nénuphars de son jardin d'eau à Giverny (Eure). Cette série monumentale compte environ 250 toiles, dont huit immenses compositions offertes à l'État français et exposées depuis 1927 dans deux salles ovales au musée de l'Orangerie, à Paris. Le mouvement impressionniste, né en 1874 avec l'exposition du tableau « Impression, soleil levant » de Monet, a révolutionné la peinture moderne. Les autres artistes cités (Renoir, Degas, Cézanne) sont aussi des peintres français majeurs de la même époque.",
  },
];

export const QUESTIONS: Question[] = [
  ...LIVRET_QUESTIONS,
  ...OFFICIAL_QUESTIONS,
  ...OFFICIAL_CSP_QUESTIONS,
  ...OFFICIAL_CR_QUESTIONS,
  ...OFFICIAL_NAT_QUESTIONS,
  ...BASE_QUESTIONS,
  ...EXTENDED_QUESTIONS,
];

export const GOAL_LABELS = {
  NAT: "Naturalisation",
  CSP: "Carte de Séjour Pluriannuelle",
  CR: "Carte de Résident",
} as const;

export const DEADLINE_LABELS = {
  lt1m: "Moins d'1 mois",
  "1to3m": "1 à 3 mois",
  "3to6m": "3 à 6 mois",
  undecided: "Pas encore décidé",
} as const;

export const LEVEL_LABELS = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
  inconnu: "Non défini",
} as const;
