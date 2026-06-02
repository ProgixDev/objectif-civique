import { Answer, Category, Question, Recap, ThemeId } from "@/types";
import { QUESTIONS } from "@/data/questions";

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Mélange l'ordre des choix d'une question et remappe `correctIndex`.
 *
 * Les données sources sont fortement biaisées (la bonne réponse est en position
 * A ou B dans ~85 % des cas) — sans ce mélange, un candidat pourrait tricher en
 * cochant toujours A. Appliqué à la création de chaque session : l'ordre reste
 * stable pendant la session mais varie d'une session à l'autre.
 */
export function shuffleChoices(q: Question): Question {
  if (q.choices.length < 2 || q.correctIndex < 0) return q;
  const order = shuffleArray(q.choices.map((_, i) => i));
  return {
    ...q,
    choices: order.map((i) => q.choices[i]),
    correctIndex: order.indexOf(q.correctIndex),
  };
}

/**
 * Texte d'explication à afficher pour une question. Beaucoup de questions
 * officielles n'ont pas d'explication rédigée (`explanation` vide) — on génère
 * alors un repli indiquant la bonne réponse, pour ne jamais montrer un bloc vide.
 */
export function getExplanation(q: {
  choices: string[];
  correctIndex: number;
  explanation?: string;
}): string {
  const written = (q.explanation ?? "").trim();
  if (written) return written;
  const correct = q.correctIndex >= 0 ? q.choices[q.correctIndex] : undefined;
  if (correct) return `La bonne réponse est : « ${correct} ».`;
  return "";
}

type PickOpts = {
  category?: Category | "Tous";
  theme?: ThemeId;
  themes?: ThemeId[];
  /** Filtre par banque de provenance (voir `Question.source`). */
  source?: string | string[];
  count: number;
};

export function pickQuestions({
  category,
  theme,
  themes,
  source,
  count,
}: PickOpts): Question[] {
  let pool = QUESTIONS;
  if (theme) pool = pool.filter((q) => q.theme === theme);
  if (themes && themes.length)
    pool = pool.filter((q) => themes.includes(q.theme));
  if (category && category !== "Tous")
    pool = pool.filter((q) => q.categories.includes(category));
  if (source) {
    const allowed = Array.isArray(source) ? source : [source];
    pool = pool.filter((q) => q.source != null && allowed.includes(q.source));
  }
  const shuffled = shuffleArray(pool).map(shuffleChoices);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function scoreSession(
  answers: Answer[],
  questions: Question[]
): Recap {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  for (const q of questions) {
    const ans = answers.find((a) => a.questionId === q.id);
    if (!ans || ans.selectedIndex === null) skipped++;
    else if (ans.selectedIndex === q.correctIndex) correct++;
    else wrong++;
  }
  const total = questions.length || 1;
  const percent = Math.round((correct / total) * 100);
  return { correct, wrong, skipped, percent, total: questions.length };
}

export function isPass(percent: number, threshold = 80): boolean {
  return percent >= threshold;
}
