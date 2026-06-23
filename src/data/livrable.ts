import raw from "./livrable.json";
import { Category, Question, ThemeId } from "@/types";

/**
 * 2ᵉ base de données client — contenu prepacivique.fr.
 * Compilé par `scripts/merge-livrable.mjs` → `src/data/livrable.json`.
 *
 * Fusionné au runtime avec le contenu FULL-DATA :
 *   - questions → injectées dans le pool (dédupliquées par énoncé, cf. questions.ts)
 *   - tests/examens → tests ciblés / packs de simulation
 *   - articles → /news ; guides + préparation → /guide ; pages → /pages/[slug]
 */

export type LivrableTest = {
  id: string;
  title: string;
  level: Category;
  questions: Question[];
};

export type LivrableExam = {
  id: string;
  slug: string;
  title: string;
  level: Category;
  questions: Question[];
};

export type LivrableArticle = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string | null;
  source: string;
  excerpt: string;
  body: string;
};

export type LivrableGuide = {
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string;
};

export type LivrablePreparation = {
  id: string;
  themeId: ThemeId;
  title: string;
  body: string;
  excerpt: string;
};

export type LivrablePage = {
  id: string;
  slug: string;
  title: string;
  body: string;
  group: "info" | "legal";
};

type RawLivrable = {
  questions: Question[];
  tests: LivrableTest[];
  exams: LivrableExam[];
  articles: LivrableArticle[];
  guides: LivrableGuide[];
  preparation: LivrablePreparation[];
  pages: LivrablePage[];
};

const data = raw as unknown as RawLivrable;

export const LIVRABLE_QUESTIONS: Question[] = data.questions;
export const LIVRABLE_TESTS: LivrableTest[] = data.tests;
export const LIVRABLE_EXAMS: LivrableExam[] = data.exams;
export const LIVRABLE_ARTICLES: LivrableArticle[] = data.articles;
export const LIVRABLE_GUIDES: LivrableGuide[] = data.guides;
export const LIVRABLE_PREPARATION: LivrablePreparation[] = data.preparation;
export const LIVRABLE_PAGES: LivrablePage[] = data.pages;
