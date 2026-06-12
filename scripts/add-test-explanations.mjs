#!/usr/bin/env node
/**
 * Explications rédigées à la main pour les 93 questions présentes UNIQUEMENT
 * dans les dossiers de test (Tests_test_civique / Tests_examen_civique) et qui
 * n'avaient aucune explication (ni source, ni IA, ni par énoncé). Faits civiques
 * de base, ancrés sur la bonne réponse connue — aucune invention.
 *
 * Fusionne ces textes dans src/data/explanations.generated.json (clé = id de la
 * question), exactement comme le ferait `generate-explanations.mjs`. Idempotent.
 *
 *   node scripts/add-test-explanations.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "src", "data", "explanations.generated.json");

const EXPLANATIONS = {
  // ── Symboles, valeurs, laïcité ──
  cf99043ec2a7b6ea57f1cf47:
    "Le drapeau tricolore se lit de gauche à droite : bleu près de la hampe, blanc au centre, rouge à l'extérieur. Le bleu et le rouge sont les couleurs de Paris, le blanc celle de la royauté ; réunis, ils symbolisent la Nation depuis la Révolution.",
  df9153d6daba685325aa88ac:
    "La laïcité repose sur la séparation des Églises et de l'État : l'État est neutre, ne reconnaît ni ne finance aucune religion, et garantit à chacun la liberté de croire ou de ne pas croire.",
  "99ca711347936f12c470de84":
    "« Laïque » signifie que l'État est indépendant de toute religion : il reste neutre en matière religieuse et garantit à chaque citoyen la liberté de conscience.",
  c79889f987b57c0c689c1493:
    "C'est le principe d'égalité : la loi est la même pour tous et chaque citoyen est traité de façon identique, sans distinction d'origine, de sexe ou de religion.",
  "71ebb91f79f7d7623166c307":
    "Marianne est la figure allégorique de la République française. Coiffée du bonnet phrygien, elle incarne la liberté et les valeurs républicaines ; son buste est présent dans les mairies.",
  e5ed3790c4fb000024f9f3d6:
    "La solidarité nationale est le devoir collectif d'aider les plus fragiles. Elle fonde la protection sociale française (santé, retraites, aides aux plus démunis), financée par les cotisations et les impôts.",

  // ── Institutions et fonctionnement de la République ──
  e9d1d379173cd779185b264a:
    "Emmanuel Macron est le Président de la République française en exercice, élu en 2017 puis réélu en 2022 au suffrage universel direct.",
  "1cc9144de9271cd2dc87d31b":
    "Le mandat présidentiel dure 5 ans (quinquennat) depuis la réforme de 2000. Le Président est élu au suffrage universel direct.",
  "14af076d81c06eb7b602c700":
    "Depuis la révision de 2008, nul ne peut exercer plus de deux mandats présidentiels consécutifs.",
  "1ddfa98ee7060337299048d6":
    "Le Parlement français est composé de deux chambres : l'Assemblée nationale et le Sénat. Il vote la loi et contrôle l'action du gouvernement.",
  e7a6c54fb18621a02fa74c8a:
    "L'Assemblée nationale compte 577 députés, élus au suffrage universel direct pour cinq ans dans chaque circonscription.",
  "0bffa0d17e689ac6c0010eeb":
    "L'Assemblée nationale a pour fonction principale de voter les lois et de contrôler l'action du gouvernement, qui est responsable devant elle.",
  df5e52835689270756e53d8d:
    "Le Sénat représente les collectivités territoriales. Il examine et vote les lois avec l'Assemblée nationale ; ses membres sont élus au suffrage indirect.",
  b17cff496dcb045a88c22a73:
    "Le Conseil constitutionnel vérifie la conformité des lois à la Constitution. Il veille aussi à la régularité des élections nationales et des référendums.",
  e8dd6aebca061e5fc37c686d:
    "Le Conseil constitutionnel comprend neuf membres nommés pour neuf ans, renouvelés par tiers ; les anciens présidents de la République en sont membres de droit.",
  "6f2385883e3a01c277fcb828":
    "La Cour de cassation est la plus haute juridiction de l'ordre judiciaire : elle ne rejuge pas les faits mais vérifie que le droit a été correctement appliqué par les tribunaux.",
  "6c58648cdb5c33cd6d59133b":
    "Le Conseil d'État est la juridiction suprême de l'ordre administratif : il tranche les litiges entre les citoyens et l'administration et conseille le gouvernement.",
  "3bbd1cd20fa2d6b9ae69b893":
    "La Cour des comptes contrôle l'emploi de l'argent public et la régularité des comptes de l'État et des administrations.",
  ad5b9be721405294e661158d:
    "Le Conseil économique, social et environnemental (CESE) est une assemblée consultative qui représente la société civile et donne des avis sur les projets de loi.",
  "51c000c4c9016a4a9ce7b003":
    "Le Président de la République réside au Palais de l'Élysée, à Paris.",
  "329d892b6845375d4eb4b7e5":
    "Le gouvernement, dirigé par le Premier ministre, siège à l'Hôtel de Matignon, à Paris.",
  a595d10fa154a940a5baed3d:
    "Le maire administre la commune (état civil, écoles, voirie, sécurité) et représente l'État au niveau local. Il est élu par le conseil municipal.",
  "38106f16dd56ed490af51339":
    "La Banque de France met en œuvre la politique monétaire dans le cadre de la Banque centrale européenne et supervise le bon fonctionnement des banques.",

  // ── Droits, principes constitutionnels ──
  "16d3599cc43902792a0f5bde":
    "La Déclaration des droits de l'homme et du citoyen a été adoptée en 1789, pendant la Révolution française. Elle proclame la liberté et l'égalité des citoyens.",
  "8e178757c09b7bd4feba6581":
    "L'article 1er de la Constitution de 1958 énonce que « la France est une République indivisible, laïque, démocratique et sociale ».",
  "35cfb3f4a8f2c6f53eb339c2":
    "La Constitution de 1958 organise les pouvoirs et garantit les droits fondamentaux, avec la Déclaration de 1789 et le préambule de 1946 qui forment le bloc de constitutionnalité.",
  "76d89d7bd71c6bdd2b9bed08":
    "La Déclaration des droits de l'homme et du citoyen de 1789 est intégrée au bloc de constitutionnalité : elle a donc valeur constitutionnelle aujourd'hui encore.",
  b5a9b7775636a6cc3f07ce8c:
    "L'article 1er de la Déclaration de 1789 proclame que « les hommes naissent et demeurent libres et égaux en droits ».",
  "97ce3c46f99090b2ac8a9ed4":
    "L'article 1er de la Constitution garantit l'égalité devant la loi de tous les citoyens et favorise l'égal accès des femmes et des hommes aux responsabilités.",
  ae3174af5f6fd81512848fb6:
    "La séparation des pouvoirs distingue le pouvoir législatif (faire la loi), exécutif (l'appliquer) et judiciaire (juger), afin qu'aucun ne domine les autres.",
  "245f631103ae013c16df5d9f":
    "Le principe de légalité impose à l'administration de toujours agir dans le respect de la loi ; ses décisions peuvent être contrôlées par le juge.",
  af4fa353f0a9c4f90e0e03d5:
    "Le suffrage universel accorde le droit de vote à tous les citoyens majeurs, sans condition de fortune ni de sexe.",
  "760af9985bc06487cc723e73":
    "Le référendum permet au peuple de se prononcer directement, par oui ou par non, sur une question ou un projet de loi.",
  ce64176bd9ee1113b5f9b136:
    "Au scrutin proportionnel, les sièges sont répartis entre les listes en fonction du nombre de voix obtenues, ce qui reflète la diversité des opinions.",
  a2b1c0c33aab911f1c66e192:
    "Le droit de grève est reconnu par la Constitution : il permet aux salariés de cesser collectivement le travail pour défendre leurs revendications.",
  "9befbaa10913d5c1d280bd1c":
    "Dans la fonction publique, l'égalité se traduit par le recrutement sur concours, qui garantit l'accès aux emplois publics sans discrimination.",
  "0abfafb3efa9ed3b746e0e26":
    "Le mandat impératif obligerait l'élu à suivre les instructions de ses électeurs ; il est interdit en France, car un élu représente la Nation tout entière.",
  "936c2a8e507d9162a3a77431":
    "L'article 16 de la Constitution confère au Président des pouvoirs exceptionnels lorsque les institutions ou l'indépendance de la nation sont gravement menacées.",
  "5ae567db7335517c88d2e544":
    "L'état d'urgence est un régime exceptionnel qui élargit temporairement les pouvoirs des autorités pour faire face à un péril grave (attentats, troubles).",
  "98786ffe8e8606f1409afeb5":
    "Une ordonnance est une mesure prise par le gouvernement dans des domaines qui relèvent normalement de la loi, après y avoir été autorisé par le Parlement.",
  "8e634405ca06c302b6e0c8de":
    "La Charte de l'environnement de 2004 a valeur constitutionnelle : elle reconnaît à chacun le droit de vivre dans un environnement équilibré et respectueux de la santé.",

  // ── Vie en société, santé, travail, numéros d'urgence ──
  d306876f6933828b5aaaaf14:
    "Le 15 est le numéro du SAMU, à appeler en cas d'urgence médicale.",
  "06df739d27992806d73912f0":
    "Le 17 est le numéro de la police et de la gendarmerie, à appeler en cas d'urgence de sécurité.",
  "80880963748e25c4f3cd835c":
    "Le 115 est le numéro d'urgence sociale (Samu social), gratuit, qui vient en aide aux personnes sans abri.",
  "17c2f3d76e4f98c27235d86f":
    "Tout salarié a droit à au moins cinq semaines de congés payés par an, acquises en travaillant au cours de l'année.",
  "6f8e58f971451a14bc96a32e":
    "La durée légale du travail est fixée à 35 heures par semaine ; au-delà, les heures effectuées sont des heures supplémentaires.",
  "5c79a821cd81b32c0738f991":
    "La CPAM (Caisse primaire d'assurance maladie) gère le remboursement des soins et les prestations de l'Assurance maladie au niveau local.",
  "80d8188ad003a63a62e9c894":
    "L'URSSAF collecte les cotisations et contributions sociales qui financent la Sécurité sociale (santé, retraites, allocations).",
  "54d90278afd04bb99f8c5baa":
    "France Travail (ex-Pôle emploi) accompagne les demandeurs d'emploi : inscription, aide à la recherche, formation et versement des allocations chômage.",
  "2ea45f5829bda3f949b7af0a":
    "Le RSA (Revenu de Solidarité Active) est une aide qui garantit un revenu minimum aux personnes sans ressources ou aux faibles revenus.",
  "80d36c5c3bed8a86fdc6efe9":
    "Un titre de séjour est le document officiel qui autorise un étranger à résider légalement en France pour une durée déterminée.",
  "6e1c883883fcd6eccc578fb4":
    "La monnaie officielle de la France est l'euro, partagé avec les autres pays de la zone euro.",
  "61f8a51ed928e8aff2a61fbc":
    "Les pièces et billets en euros circulent en France depuis le 1er janvier 2002, remplaçant le franc.",
  "80a52ab3897f7f3ff9d0986b":
    "L'école publique française repose sur trois principes : elle est gratuite, laïque et obligatoire.",
  f1f4b1ad8fc1883a0f0651a3:
    "L'instruction est obligatoire de 3 à 16 ans en France, et une obligation de formation s'applique jusqu'à 18 ans.",
  "4a27ce65b82a65233d291a04":
    "La loi DALO (droit au logement opposable) reconnaît le droit à un logement décent et permet à certaines personnes de le faire valoir devant l'État.",

  // ── Territoire, Europe, géographie ──
  "39f375e7a54be1e703c6764e":
    "La France métropolitaine compte 13 régions depuis la réforme territoriale de 2016.",
  bf74e1028b33fb69ba2b5e82:
    "Les collectivités territoriales s'organisent principalement en trois niveaux : les communes, les départements et les régions.",
  fe6eacd19659fe3e556684f8:
    "Les principaux départements et régions d'outre-mer sont la Guadeloupe, la Martinique, la Guyane, La Réunion et Mayotte.",
  "1e6328f8bff60fa20ed0fe2f":
    "L'Union européenne compte 27 États membres depuis le retrait du Royaume-Uni (Brexit) en 2020.",
  "205d735211abd9fbb0c202b6":
    "Le traité de Maastricht, signé en 1992, a créé l'Union européenne et posé les bases de la monnaie unique, l'euro.",
  "5810bb69bcb7a242d77848f8":
    "Le Parlement européen représente les citoyens de l'Union ; ses députés sont élus au suffrage universel direct par les habitants des États membres.",
  c454d2ab0a87690ce4f23e3f:
    "L'hymne européen est l'« Ode à la joie », tirée de la Neuvième Symphonie de Beethoven.",
  "524c2f1fb5fd9425fe7d5e0c":
    "La Cour pénale internationale, siégeant à La Haye, juge les personnes accusées de génocide, de crimes de guerre et de crimes contre l'humanité.",
  a0c98a24affbe21f9407a772:
    "La Déclaration universelle des droits de l'homme a été adoptée par l'ONU en 1948 ; elle proclame les droits fondamentaux de tous les êtres humains.",
  c874a0477af563fecb10453e:
    "Le français est parlé par environ 320 millions de personnes dans le monde, ce qui en fait l'une des grandes langues internationales.",
  "792b9a19cfae5fcc663a2422":
    "Le français compte environ 320 millions de locuteurs dans le monde, répartis sur les cinq continents.",

  // ── Histoire et personnages ──
  b36ce35f1ef8f8e491a44231:
    "La monarchie est abolie et la Ire République proclamée en 1792, durant la Révolution française.",
  "27131122924465decd418544":
    "La loi de séparation des Églises et de l'État, qui fonde la laïcité, a été votée en 1905.",
  b2c139212839944dea691cea:
    "Le droit de vote a été accordé aux femmes en 1944 par ordonnance ; elles ont voté pour la première fois en 1945.",
  "035ec0ad7b4f964e18df3b96":
    "Le 14 juillet 1789, le peuple parisien prend la Bastille, prison symbole de l'absolutisme royal : c'est l'événement fondateur de la Révolution.",
  fbdc9df4803165f296d3439a:
    "La fête nationale française est le 14 juillet, en mémoire de la prise de la Bastille de 1789 et de la Fête de la Fédération de 1790.",
  "1d0d9bce5f04f116f63b34f5":
    "La France compte 11 jours fériés légaux dans l'année, dont le 14 juillet, fête nationale.",
  "64b5c8e77638af6d772edba4":
    "Napoléon Bonaparte fut général puis Empereur des Français. On lui doit notamment le Code civil, qui unifie le droit français.",
  "9d0dcf335f656fec3eda52b6":
    "Jules Ferry a fait voter en 1881-1882 les lois rendant l'école primaire gratuite, laïque et obligatoire.",
  "22754651c1b56df83e1cf4a9":
    "La Première Guerre mondiale éclate en 1914, déclenchée par l'assassinat de l'archiduc François-Ferdinand à Sarajevo.",
  "42d33f56d71a803003365076":
    "La Résistance désigne l'ensemble des mouvements qui ont lutté contre l'occupation nazie et le régime de Vichy pendant la Seconde Guerre mondiale.",
  "090593ed4e04bbddcd6a8162":
    "Le débarquement allié en Normandie a eu lieu le 6 juin 1944 ; il marque le début de la libération de la France.",
  a60182d1dd151bc79128ad1d:
    "Le « roman national » désigne le récit partagé de l'histoire de France qui contribue à forger le sentiment d'appartenance à la nation.",
  "802b28d143bbe014e5fc294c":
    "Les Lumières sont un mouvement intellectuel du XVIIIe siècle qui prône la raison, la liberté, la tolérance et l'égalité ; il a inspiré la Révolution.",
  b4e5b0151a79c53d5d6a64e3:
    "« Les Misérables » est un roman de Victor Hugo, grand écrivain français du XIXe siècle et défenseur de la République.",
  "11fe3faa275c829d5367be9a":
    "L'esclavage a été aboli définitivement en France en 1848, sous l'impulsion notamment de Victor Schœlcher.",
  f4b37adc2ee5acdeb907339c:
    "« La Liberté guidant le peuple » est le tableau d'Eugène Delacroix qui symbolise la Révolution de 1830 ; on y voit Marianne brandir le drapeau tricolore.",
  "5b98df2ba921136070227c99":
    "Le traité de Versailles, signé en 1919, met officiellement fin à la Première Guerre mondiale.",
  "2e3ebc3168ea7e388b64f0fc":
    "Louis Pasteur est un scientifique français du XIXe siècle, pionnier de la microbiologie et inventeur du vaccin contre la rage.",
  dc40e575670c35f6f4793562:
    "Le château de Versailles a été construit sous Louis XIV, le « Roi-Soleil », qui en fit le siège de la monarchie absolue.",
  "2130b592de1f88731ecafe88":
    "L'Institut Pasteur, fondé par Louis Pasteur, est un centre de recherche de renommée mondiale sur les maladies infectieuses et les vaccins.",
  "7edda56c4512f549b9866d59":
    "Montesquieu, philosophe des Lumières, a écrit « De l'esprit des lois », où il théorise la séparation des pouvoirs.",
  "26217daf3f811c3aa499c433":
    "L'Algérie a accédé à l'indépendance en 1962, à l'issue des accords d'Évian.",
  e9e6564b2d2962c0e8914725:
    "L'impressionnisme est un courant pictural français de la fin du XIXe siècle, illustré par Monet, Renoir ou Degas, qui privilégie la lumière et l'instant.",
  "3f90c07f28b5b2861700bb02":
    "En fondant la Ve République en 1958, le général de Gaulle instaure un régime semi-présidentiel doté d'un Président aux pouvoirs renforcés.",
  "195c7c02014c9cd567cc2737":
    "François Mitterrand, président élu en 1981, a fait abolir la peine de mort la même année, sur proposition du garde des Sceaux Robert Badinter.",
  "328ce347e9e3301480770368":
    "Simone Veil, ministre de la Santé, a porté la loi de 1975 légalisant l'IVG. Rescapée de la Shoah, elle est entrée au Panthéon en 2018.",
};

const overlay = fs.existsSync(OUT)
  ? JSON.parse(fs.readFileSync(OUT, "utf-8"))
  : {};

let added = 0;
for (const [id, text] of Object.entries(EXPLANATIONS)) {
  if (!overlay[id]) added++;
  overlay[id] = text.trim();
}

fs.writeFileSync(OUT, JSON.stringify(overlay, null, 0), "utf-8");
console.log(
  `✅ ${Object.keys(EXPLANATIONS).length} explications fusionnées (${added} nouvelles). Total overlay : ${Object.keys(overlay).length}.`
);
