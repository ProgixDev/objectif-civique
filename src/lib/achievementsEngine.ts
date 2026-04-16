import { ACHIEVEMENTS } from "@/data/achievements";

type State = {
  questionsAnswered: number;
  currentStreak: number;
  bestSessionScore: number;
  bestThemeProgress: number;
  simulationsCompleted: number;
  unlocked: string[];
  lastHourLaunched?: number;
};

export function evaluate(state: State): string[] {
  const unlocked: string[] = [];

  if (state.questionsAnswered >= 1 && !state.unlocked.includes("first_step"))
    unlocked.push("first_step");

  if (state.currentStreak >= 7 && !state.unlocked.includes("streak_7"))
    unlocked.push("streak_7");

  if (state.questionsAnswered >= 100 && !state.unlocked.includes("centurion"))
    unlocked.push("centurion");

  if (state.bestSessionScore >= 90 && !state.unlocked.includes("excellence"))
    unlocked.push("excellence");

  if (
    state.bestThemeProgress >= 100 &&
    !state.unlocked.includes("perfect_theme")
  )
    unlocked.push("perfect_theme");

  if (
    state.lastHourLaunched !== undefined &&
    state.lastHourLaunched < 8 &&
    !state.unlocked.includes("early_bird")
  )
    unlocked.push("early_bird");

  if (
    state.lastHourLaunched !== undefined &&
    state.lastHourLaunched >= 22 &&
    !state.unlocked.includes("night_owl")
  )
    unlocked.push("night_owl");

  if (
    state.simulationsCompleted >= 1 &&
    !state.unlocked.includes("marathon")
  )
    unlocked.push("marathon");

  return unlocked;
}

export function getAchievementById(id: string) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
