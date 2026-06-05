import { Category, Question, QuestionType, ThemeId } from "@/types";
import rawAllQuestions from "../../FULL-DATA/1-questions/_all.json";
import { EXTRA_FLASHCARDS, EXTRA_QCM } from "./extraContent";
import rawGeneratedExplanations from "./explanations.generated.json";

/**
 * Explications générées par IA (Groq), ancrées sur la bonne réponse connue,
 * pour les questions officielles qui n'en avaient pas. Utilisées UNIQUEMENT en
 * complément, jamais en remplacement d'une explication source.
 * Voir `scripts/generate-explanations.mjs`.
 */
const GENERATED_EXPLANATIONS = rawGeneratedExplanations as Record<
  string,
  string
>;

/**
 * Pool de questions de l'app — chargé depuis FULL-DATA (data client).
 *
 * Source : `FULL-DATA/1-questions/_all.json` — banque unifiée dédupliquée par `id`.
 *
 * Schéma JSON source (par question) :
 * ```
 * {
 *   id, shortId, statement, choices: [{text, isCorrect}],
 *   explanation, theme, levels: ["nat" | "cr" | "csp"],
 *   type: "qcm" | "flashcard" | "mise-en-situation",
 *   isOfficial: boolean
 * }
 * ```
 *
 * Adapté ici au type `Question` de l'app (`text`, `categories[]`, `correctIndex`).
 */

type RawChoice = { text: string; isCorrect: boolean };

type RawQuestion = {
  id: string;
  shortId?: string;
  statement: string;
  choices?: RawChoice[] | null;
  explanation?: string | null;
  theme: string;
  levels?: string[] | null;
  type?: string | null;
  isOfficial?: boolean;
};

const LEVEL_TO_CATEGORY: Record<string, Category> = {
  nat: "NAT",
  cr: "CR",
  csp: "CSP",
};

function isThemeId(value: string): value is ThemeId {
  return (
    value === "principes-valeurs-republique" ||
    value === "droits-et-devoirs" ||
    value === "systeme-institutionnel" ||
    value === "histoire-geographie-culture" ||
    value === "vivre-en-societe"
  );
}

function isQuestionType(value: string | null | undefined): value is QuestionType {
  return value === "qcm" || value === "flashcard" || value === "mise-en-situation";
}

/**
 * Convertit une question du format FULL-DATA vers le format attendu par l'app.
 * Retourne `null` si la question n'est pas exploitable (thème inconnu, etc.).
 */
/**
 * Banque de provenance dérivée pour les questions de `_all.json` (qui n'ont pas
 * de champ `source`) :
 *   - "officielles"       → questions officielles du gouvernement
 *   - "mise-en-situation" → scénarios d'entretien
 *   - "entrainement"      → QCM d'entraînement non officiels
 */
function deriveSource(type: QuestionType, isOfficial: boolean): string {
  if (type === "mise-en-situation") return "mise-en-situation";
  if (isOfficial) return "officielles";
  return "entrainement";
}

function adaptQuestion(raw: RawQuestion): Question | null {
  if (!isThemeId(raw.theme)) return null;

  const choices = raw.choices ?? [];
  const correctIndex = choices.findIndex((c) => c.isCorrect);

  const categories: Category[] = (raw.levels ?? [])
    .map((l) => LEVEL_TO_CATEGORY[l])
    .filter((c): c is Category => Boolean(c));

  const type: QuestionType = isQuestionType(raw.type) ? raw.type : "qcm";
  const isOfficial = Boolean(raw.isOfficial);

  return {
    id: raw.id,
    shortId: raw.shortId,
    categories,
    theme: raw.theme,
    text: raw.statement,
    choices: choices.map((c) => c.text),
    correctIndex,
    // Explication source si présente, sinon explication IA générée (overlay),
    // sinon vide → le runtime affichera le fallback « La bonne réponse est… ».
    explanation:
      (raw.explanation && raw.explanation.trim()) ||
      GENERATED_EXPLANATIONS[raw.id] ||
      "",
    type,
    isOfficial,
    source: deriveSource(type, isOfficial),
  };
}

const ALL_RAW_QUESTIONS = rawAllQuestions as RawQuestion[];

/**
 * Questions complètes (QCM + mise-en-situation) avec choix exploitables.
 * Les flashcards sans choix sont exclues de ce pool — voir `FLASHCARD_QUESTIONS`.
 *
 * On y ajoute `EXTRA_QCM` : les mises en situation de la source SITUATION qui
 * ont de vrais choix et étaient auparavant bloquées en flashcards (donc jamais
 * jouables). Déduplication par `id` par sécurité.
 */
const BASE_QUESTIONS: Question[] = ALL_RAW_QUESTIONS.map(adaptQuestion)
  .filter((q): q is Question => q !== null)
  .filter((q) => q.choices.length >= 2 && q.correctIndex >= 0);

const questionSeen = new Set<string>();
const questionAll: Question[] = [];
for (const q of [...BASE_QUESTIONS, ...EXTRA_QCM]) {
  if (questionSeen.has(q.id)) continue;
  questionSeen.add(q.id);
  questionAll.push(q);
}
export const QUESTIONS: Question[] = questionAll;

/**
 * Flashcards = celles déjà présentes dans `1-questions/_all.json` (32 issues
 * du livret officiel) + les nouvelles sources APPRENDRE / PREPA-INTENSE /
 * REFERENTIEL / REFERENTIEL-OFFICIEL / SITUATION (~899 questions Q/A).
 *
 * Déduplication par `id` au cas où une même flashcard apparaîtrait dans les
 * deux sources.
 */
const BASE_FLASHCARDS: Question[] = ALL_RAW_QUESTIONS.map(adaptQuestion)
  .filter((q): q is Question => q !== null)
  .filter((q) => q.type === "flashcard");

const flashSeen = new Set<string>();
const flashAll: Question[] = [];
for (const q of [...BASE_FLASHCARDS, ...EXTRA_FLASHCARDS]) {
  if (flashSeen.has(q.id)) continue;
  flashSeen.add(q.id);
  flashAll.push(q);
}
export const FLASHCARD_QUESTIONS: Question[] = flashAll;

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
