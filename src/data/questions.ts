import { Category, Question, QuestionType, ThemeId } from "@/types";
import rawAllQuestions from "../../FULL-DATA/1-questions/_all.json";

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
function adaptQuestion(raw: RawQuestion): Question | null {
  if (!isThemeId(raw.theme)) return null;

  const choices = raw.choices ?? [];
  const correctIndex = choices.findIndex((c) => c.isCorrect);

  const categories: Category[] = (raw.levels ?? [])
    .map((l) => LEVEL_TO_CATEGORY[l])
    .filter((c): c is Category => Boolean(c));

  return {
    id: raw.id,
    shortId: raw.shortId,
    categories,
    theme: raw.theme,
    text: raw.statement,
    choices: choices.map((c) => c.text),
    correctIndex,
    explanation: raw.explanation ?? "",
    type: isQuestionType(raw.type) ? raw.type : "qcm",
    isOfficial: Boolean(raw.isOfficial),
  };
}

const ALL_RAW_QUESTIONS = rawAllQuestions as RawQuestion[];

/**
 * Questions complètes (QCM + mise-en-situation) avec choix exploitables.
 * Les flashcards sans choix sont exclues de ce pool — voir `FLASHCARD_QUESTIONS`.
 */
export const QUESTIONS: Question[] = ALL_RAW_QUESTIONS.map(adaptQuestion)
  .filter((q): q is Question => q !== null)
  .filter((q) => q.choices.length >= 2 && q.correctIndex >= 0);

/**
 * Flashcards uniquement (questions sans choix, format question/réponse).
 */
export const FLASHCARD_QUESTIONS: Question[] = ALL_RAW_QUESTIONS.map(adaptQuestion)
  .filter((q): q is Question => q !== null)
  .filter((q) => q.type === "flashcard");

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
