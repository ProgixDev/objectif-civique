import { create } from "zustand";
import { Answer, Category, Question, Session, ThemeId, Recap } from "@/types";
import { pickQuestions, scoreSession, shuffleChoices } from "@/lib/quizEngine";
import { createId } from "@/lib/id";

type SessionState = {
  current: Session | null;
  currentIndex: number;
  startPractice: (
    category: Category,
    count?: number,
    source?: string | string[]
  ) => void;
  startTheme: (themeId: ThemeId, count?: number) => void;
  /**
   * Démarre une session "test ciblé" avec un set de questions explicite
   * (sous-thèmes du dossier `Tests/` du client).
   */
  startTargetedTest: (label: string, questions: Question[]) => void;
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

  startPractice: (category, count = 20, source) => {
    const questions = pickQuestions({ category, count, source });
    set({
      current: {
        id: createId("sess"),
        type: "practice",
        category,
        questions,
        answers: [],
        startedAt: new Date().toISOString(),
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

  startTargetedTest: (label, questions) => {
    set({
      current: {
        id: createId("test"),
        type: "practice",
        questions: questions.map(shuffleChoices),
        answers: [],
        startedAt: new Date().toISOString(),
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
