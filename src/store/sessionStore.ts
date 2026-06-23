import { create } from "zustand";
import { Answer, Category, Question, Session, ThemeId, Recap } from "@/types";
import { pickQuestions, scoreSession, shuffleChoices } from "@/lib/quizEngine";
import { QUESTIONS } from "@/data/questions";
import { createId } from "@/lib/id";
import { seriesSlice } from "@/lib/series";

/** Filtre d'origine commun aux écrans Thème et Entraînement. */
export type ThemeFilter = Category | "Tous";

/**
 * Questions d'un thème pour un cas donné, dans l'ordre naturel du pool.
 * Partagé par l'écran de détail du thème et la session de révision, afin que
 * l'index de la question touchée corresponde exactement à la session.
 */
export function themeQuestions(
  themeId: ThemeId,
  category: ThemeFilter
): Question[] {
  return QUESTIONS.filter(
    (q) =>
      q.theme === themeId &&
      (category === "Tous" || q.categories.includes(category))
  );
}

type SessionState = {
  current: Session | null;
  currentIndex: number;
  startPractice: (
    category: Category,
    count?: number,
    source?: string | string[],
    originKey?: string
  ) => void;
  startTheme: (themeId: ThemeId, count?: number) => void;
  /**
   * Révision d'un thème : les questions du thème (pour le cas donné), découpées
   * en séries de 40 max. `seriesIndex` choisit la tranche (0 = questions 1-40,
   * 1 = 41-80, …). `startIndex` positionne sur une question DANS la série.
   * Type "practice" pour réutiliser l'écran d'entraînement.
   */
  startThemeReview: (
    themeId: ThemeId,
    category: ThemeFilter,
    startIndex?: number,
    seriesIndex?: number
  ) => void;
  /**
   * Démarre une session "test ciblé" avec un set de questions explicite
   * (sous-thèmes du dossier `Tests/` du client).
   */
  startTargetedTest: (
    label: string,
    questions: Question[],
    originKey?: string
  ) => void;
  startSimulation: (opts?: {
    category?: Category;
    themes?: ThemeId[];
    label?: string;
    simKey?: string;
    /**
     * Pour démarrer un pack pré-construit avec ses propres questions
     * (pas de tirage aléatoire depuis le pool).
     */
    questions?: Question[];
  }) => void;
  startAssessment: (questions: Question[]) => void;
  answerCurrent: (selectedIndex: number | null) => void;
  setCurrentIndex: (i: number) => void;
  goNext: () => void;
  goPrev: () => void;
  endSession: () => { recap: Recap; durationMs: number } | null;
  reset: () => void;
  resumeTimer: () => number;
};

export const useSessionStore = create<SessionState>((set, get) => ({
  current: null,
  currentIndex: 0,

  startPractice: (category, count = 20, source, originKey) => {
    const questions = pickQuestions({ category, count, source });
    set({
      current: {
        id: createId("sess"),
        type: "practice",
        category,
        questions,
        answers: [],
        startedAt: new Date().toISOString(),
        originKey,
      },
      currentIndex: 0,
    });
  },

  startTheme: (themeId, count = 20) => {
    const questions = pickQuestions({ theme: themeId, count });
    set({
      current: {
        id: createId("sess"),
        type: "theme",
        themeId,
        questions,
        answers: [],
        startedAt: new Date().toISOString(),
      },
      currentIndex: 0,
    });
  },

  startThemeReview: (themeId, category, startIndex = 0, seriesIndex = 0) => {
    // Pool complet du thème, puis on isole la série de 40 demandée.
    const all = themeQuestions(themeId, category).map(shuffleChoices);
    const questions = seriesSlice(all, seriesIndex);
    const safeIndex =
      questions.length === 0
        ? 0
        : Math.max(0, Math.min(startIndex, questions.length - 1));
    set({
      current: {
        id: createId("theme"),
        type: "practice",
        category: category === "Tous" ? undefined : category,
        themeId,
        questions,
        answers: [],
        startedAt: new Date().toISOString(),
        // `startIndex`/`seriesIndex` (et non `safeIndex`) pour coller à la clé
        // calculée par l'écran d'entraînement et éviter une reconstruction.
        originKey: `theme:${themeId}:${category}:${seriesIndex}:${startIndex}`,
      },
      currentIndex: safeIndex,
    });
  },

  startTargetedTest: (label, questions, originKey) => {
    set({
      current: {
        id: createId("test"),
        type: "practice",
        questions: questions.map(shuffleChoices),
        answers: [],
        startedAt: new Date().toISOString(),
        originKey,
      },
      currentIndex: 0,
    });
  },

  startSimulation: (opts) => {
    // Si des questions sont passées explicitement (pack pré-construit),
    // on les utilise telles quelles. Sinon tirage aléatoire dans le pool.
    const questions =
      opts?.questions && opts.questions.length > 0
        ? opts.questions.slice(0, 40).map(shuffleChoices)
        : pickQuestions({
            count: 40,
            category: opts?.category,
            themes: opts?.themes,
          });
    const timerInitialSeconds = 45 * 60;
    set({
      current: {
        id: createId("sim"),
        type: "simulation",
        category: opts?.category,
        themeId: opts?.themes?.[0],
        questions,
        answers: [],
        startedAt: new Date().toISOString(),
        startedAtMs: Date.now(),
        timerInitialSeconds,
        simKey: opts?.simKey,
      },
      currentIndex: 0,
    });
  },

  startAssessment: (questions) => {
    set({
      current: {
        id: createId("assess"),
        type: "assessment",
        questions: questions.map(shuffleChoices),
        answers: [],
        startedAt: new Date().toISOString(),
      },
      currentIndex: 0,
    });
  },

  answerCurrent: (selectedIndex) => {
    const state = get();
    if (!state.current) return;
    const q = state.current.questions[state.currentIndex];
    if (!q) return;
    const isCorrect =
      selectedIndex === null ? null : selectedIndex === q.correctIndex;
    const existing = state.current.answers.findIndex(
      (a) => a.questionId === q.id
    );
    const answers = [...state.current.answers];
    const newAnswer: Answer = {
      questionId: q.id,
      selectedIndex,
      isCorrect,
    };
    if (existing >= 0) answers[existing] = newAnswer;
    else answers.push(newAnswer);
    set({ current: { ...state.current, answers } });
  },

  setCurrentIndex: (i) => set({ currentIndex: i }),

  goNext: () => {
    const state = get();
    if (!state.current) return;
    const next = Math.min(
      state.current.questions.length - 1,
      state.currentIndex + 1
    );
    set({ currentIndex: next });
  },

  goPrev: () => {
    const state = get();
    if (!state.current) return;
    const prev = Math.max(0, state.currentIndex - 1);
    set({ currentIndex: prev });
  },

  endSession: () => {
    const state = get();
    if (!state.current) return null;
    const recap = scoreSession(state.current.answers, state.current.questions);
    const endedAt = new Date().toISOString();
    const durationMs =
      new Date(endedAt).getTime() - new Date(state.current.startedAt).getTime();
    set({
      current: { ...state.current, endedAt, durationMs },
    });
    return { recap, durationMs };
  },

  reset: () => set({ current: null, currentIndex: 0 }),

  resumeTimer: () => {
    const state = get();
    if (!state.current?.startedAtMs || !state.current?.timerInitialSeconds)
      return 0;
    const elapsed = (Date.now() - state.current.startedAtMs) / 1000;
    return Math.max(0, state.current.timerInitialSeconds - Math.floor(elapsed));
  },
}));
