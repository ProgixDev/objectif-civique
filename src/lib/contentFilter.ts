/**
 * Filtrage des contenus manifestement inappropriés avant publication au forum.
 *
 * C'est le premier des quatre garde-fous exigés par l'App Store (guideline 1.2)
 * pour le contenu généré par les utilisateurs : filtrage, signalement, blocage,
 * contact. Il reste volontairement simple — le rattrapage se fait par les
 * signalements, revus côté back-office.
 */

/**
 * Termes bloqués (insultes et propos haineux les plus courants en français).
 * Liste à compléter au fil des signalements reçus.
 */
const BANNED = [
  "connard",
  "connasse",
  "encule",
  "salope",
  "pute",
  "putain",
  "batard",
  "nique ta",
  "ntm",
  "fdp",
  "pd",
  "tapette",
  "bougnoule",
  "negre",
  "youpin",
  "sale arabe",
  "sale juif",
  "sale noir",
  "sale blanc",
  "sale musulman",
];

/**
 * Retire tout caractère non-ASCII.
 *
 * Appliqué juste après `normalize("NFD")`, qui a décomposé « é » en « e » +
 * signe diacritique : le signe disparaît et il reste « e ». Sans cette étape,
 * « énculé » deviendrait « e ncul e » et échapperait au filtre.
 */
function stripNonAscii(text: string): string {
  let out = "";
  for (const ch of text) {
    if (ch.charCodeAt(0) < 128) out += ch;
  }
  return out;
}

/**
 * Normalise pour déjouer les contournements simples : casse, accents,
 * caractères de substitution (0 → o, 3 → e…) et lettres répétées.
 *
 * Les répétitions sont réduites à **une** lettre, et la liste de référence
 * subit exactement le même traitement : « coooonnard » et « connard » se
 * ramènent tous deux à « conard », donc ils correspondent.
 */
function normalize(text: string): string {
  return stripNonAscii(text.toLowerCase().normalize("NFD"))
    .replace(/0/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/3/g, "e")
    .replace(/[4@]/g, "a")
    .replace(/[5$]/g, "s")
    .replace(/[^a-z ]/g, " ")
    .replace(/(.)\1+/g, "$1")
    .replace(/ +/g, " ")
    .trim();
}

/** Vrai si le texte contient un terme interdit. */
export function containsBannedWords(text: string): boolean {
  const normalized = normalize(text);
  return BANNED.some((word) => {
    const w = normalize(word);
    // Expressions et mots longs : recherche en sous-chaîne.
    if (w.includes(" ") || w.length > 4) return normalized.includes(w);
    // Mots courts : mot entier uniquement, sinon « pd » matcherait « rapide ».
    return new RegExp(`(^| )${w}( |$)`).test(normalized);
  });
}

/** Message affiché à l'auteur quand sa publication est refusée. */
export const BANNED_CONTENT_MESSAGE =
  "Votre message contient des termes inappropriés. Merci de le reformuler dans le respect des autres candidats.";
