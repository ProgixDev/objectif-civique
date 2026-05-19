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

type PickOpts = {
  category?: Category | "Tous";
  theme?: ThemeId;
  themes?: ThemeId[];
  count: number;
};

export function pickQuestions({
  category,
  theme,
  themes,
  count,
}: PickOpts): Question[] {
  let pool = QUESTIONS;
  if (theme) pool = pool.filter((q) => q.theme === theme);
  if (themes && themes.length)
    pool = pool.filter((q) => themes.includes(q.theme));
  if (category && category !== "Tous")
    pool = pool.filter((q) => q.categories.includes(category));
  const shuffled = shuffleArray(pool);
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
