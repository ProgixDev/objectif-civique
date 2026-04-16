import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import { DailyStat, ThemeId } from "@/types";
import { INITIAL_THEME_PROGRESS } from "@/data/mockUser";
import { todayKey } from "@/lib/formatters";
import { evaluate } from "@/lib/achievementsEngine";

type ProgressState = {
  questionsAnswered: number;
  correctCount: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  bookmarks: string[];
  themeProgress: Record<string, number>;
  dailyStats: DailyStat[];
  achievementsUnlocked: string[];
  sessionsHistory: {
    id: string;
    type: string;
    percent: number;
    endedAt: string;
  }[];
  bestSessionScore: number;
  simulationsCompleted: number;
  toggleBookmark: (id: string) => void;
  recordAnswer: (isCorrect: boolean) => void;
  recordSession: (
    id: string,
    type: string,
    percent: number,
    themeId?: ThemeId
  ) => string[];
  updateThemeProgress: (themeId: string, percent: number) => void;
  reset: () => void;
  seedInitial: () => void;
};

const initial = {
  questionsAnswered: 0,
  correctCount: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  bookmarks: [],
  themeProgress: {},
  dailyStats: [],
  achievementsUnlocked: [],
  sessionsHistory: [],
  bestSessionScore: 0,
  simulationsCompleted: 0,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initial,
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(id)
            ? s.bookmarks.filter((x) => x !== id)
            : [...s.bookmarks, id],
        })),
      recordAnswer: (isCorrect) => {
        const today = todayKey();
        set((s) => {
          const existingIndex = s.dailyStats.findIndex(
            (d) => d.date === today
          );
          let dailyStats = [...s.dailyStats];
          if (existingIndex >= 0) {
            const prev = dailyStats[existingIndex];
            const newCount = prev.questionsAnswered + 1;
            const newCorrect =
              Math.round((prev.successRate / 100) * prev.questionsAnswered) +
              (isCorrect ? 1 : 0);
            dailyStats[existingIndex] = {
              ...prev,
              questionsAnswered: newCount,
              successRate: Math.round((newCorrect / newCount) * 100),
            };
          } else {
            dailyStats.push({
              date: today,
              questionsAnswered: 1,
              successRate: isCorrect ? 100 : 0,
            });
          }
          dailyStats = dailyStats.slice(-30);

          let currentStreak = s.currentStreak;
          let longestStreak = s.longestStreak;
          if (s.lastActiveDate !== today) {
            if (s.lastActiveDate) {
              const prev = new Date(s.lastActiveDate);
              const todayD = new Date(today);
              const diff = Math.round(
                (todayD.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
              );
              currentStreak = diff === 1 ? s.currentStreak + 1 : 1;
            } else {
              currentStreak = 1;
            }
            if (currentStreak > longestStreak) longestStreak = currentStreak;
          }

          return {
            questionsAnswered: s.questionsAnswered + 1,
            correctCount: s.correctCount + (isCorrect ? 1 : 0),
            lastActiveDate: today,
            currentStreak,
            longestStreak,
            dailyStats,
          };
        });
      },
      recordSession: (id, type, percent, themeId) => {
        const s = get();
        const sessionsHistory = [
          ...s.sessionsHistory,
          { id, type, percent, endedAt: new Date().toISOString() },
        ].slice(-50);
        let bestSessionScore = Math.max(s.bestSessionScore, percent);
        let simulationsCompleted = s.simulationsCompleted;
        if (type === "simulation") simulationsCompleted += 1;

        const themeProgress = { ...s.themeProgress };
        if (themeId) {
          const prev = themeProgress[themeId] ?? 0;
          themeProgress[themeId] = Math.max(prev, Math.min(100, percent));
        }

        const newState = {
          sessionsHistory,
          bestSessionScore,
          simulationsCompleted,
          themeProgress,
        };

        const bestThemeProgress = Math.max(
          0,
          ...Object.values(themeProgress)
        );
        const hourLaunched = new Date().getHours();

        const newlyUnlocked = evaluate({
          questionsAnswered: s.questionsAnswered,
          currentStreak: s.currentStreak,
          bestSessionScore,
          bestThemeProgress,
          simulationsCompleted,
          unlocked: s.achievementsUnlocked,
          lastHourLaunched: hourLaunched,
        });

        set({
          ...newState,
          achievementsUnlocked: [
            ...s.achievementsUnlocked,
            ...newlyUnlocked,
          ],
        });
        return newlyUnlocked;
      },
      updateThemeProgress: (themeId, percent) =>
        set((s) => ({
          themeProgress: {
            ...s.themeProgress,
            [themeId]: Math.max(s.themeProgress[themeId] ?? 0, percent),
          },
        })),
      reset: () => set({ ...initial }),
      seedInitial: () =>
        set((s) => ({
          themeProgress: {
            ...INITIAL_THEME_PROGRESS,
            ...s.themeProgress,
          },
        })),
    }),
    {
      name: "objectif-civique-progress",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export function getSuccessRate(state: {
  questionsAnswered: number;
  correctCount: number;
}): number {
  if (state.questionsAnswered === 0) return 0;
  return Math.round((state.correctCount / state.questionsAnswered) * 100);
}
