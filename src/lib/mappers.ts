import {
  Category,
  Deadline,
  LanguageCertLevel,
  LanguageTestStatus,
  Level,
  SubscriptionPlan,
  User,
} from "@/types";

/**
 * Conversions entre les types de l'app (camelCase) et les lignes Postgres
 * (snake_case). Centralisé ici pour que le reste du code ignore le mapping.
 */

// ───────────────────────── profiles ──────────────────────────

export type ProfileRow = {
  id: string;
  first_name: string | null;
  email: string | null;
  goal: string | null;
  deadline: string | null;
  level: string | null;
  channel: string | null;
  companion: string | null;
  subscription_plan: string | null;
  civic_test_passed: boolean | null;
  language_test_status: string | null;
  language_cert_level: string | null;
  created_at: string;
};

export function rowToUser(row: ProfileRow): User {
  return {
    id: row.id,
    firstName: row.first_name ?? "",
    email: row.email ?? "",
    goal: (row.goal as Category | null) ?? null,
    deadline: (row.deadline as Deadline | null) ?? null,
    level: (row.level as Level | null) ?? null,
    channel: row.channel ?? null,
    companion: row.companion ?? null,
    createdAt: row.created_at,
    subscriptionPlan: (row.subscription_plan as SubscriptionPlan) ?? "free",
    civicTestPassed: row.civic_test_passed ?? null,
    languageTestStatus:
      (row.language_test_status as LanguageTestStatus | null) ?? null,
    languageCertLevel:
      (row.language_cert_level as LanguageCertLevel | null) ?? null,
  };
}

/** Champs profil modifiables (l'id et created_at ne se mettent pas à jour). */
export function userToProfilePatch(user: User) {
  return {
    id: user.id,
    first_name: user.firstName,
    email: user.email,
    goal: user.goal,
    deadline: user.deadline,
    level: user.level,
    channel: user.channel,
    companion: user.companion,
    subscription_plan: user.subscriptionPlan,
    civic_test_passed: user.civicTestPassed,
    language_test_status: user.languageTestStatus,
    language_cert_level: user.languageCertLevel,
  };
}

// ───────────────────────── progress ──────────────────────────

/** Forme du `progressStore` réellement synchronisée (sans les actions). */
export type ProgressSnapshot = {
  questionsAnswered: number;
  correctCount: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  bestSessionScore: number;
  simulationsCompleted: number;
  themeProgress: Record<string, number>;
  dailyStats: unknown[];
  achievementsUnlocked: string[];
  sessionsHistory: unknown[];
  bookmarks: string[];
};

export type ProgressRow = {
  user_id: string;
  questions_answered: number;
  correct_count: number;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
  best_session_score: number;
  simulations_completed: number;
  theme_progress: Record<string, number> | null;
  daily_stats: unknown[] | null;
  achievements_unlocked: string[] | null;
  sessions_history: unknown[] | null;
  bookmarks: string[] | null;
};

export function rowToProgress(row: ProgressRow): ProgressSnapshot {
  return {
    questionsAnswered: row.questions_answered ?? 0,
    correctCount: row.correct_count ?? 0,
    currentStreak: row.current_streak ?? 0,
    longestStreak: row.longest_streak ?? 0,
    lastActiveDate: row.last_active_date ?? null,
    bestSessionScore: row.best_session_score ?? 0,
    simulationsCompleted: row.simulations_completed ?? 0,
    themeProgress: row.theme_progress ?? {},
    dailyStats: row.daily_stats ?? [],
    achievementsUnlocked: row.achievements_unlocked ?? [],
    sessionsHistory: row.sessions_history ?? [],
    bookmarks: row.bookmarks ?? [],
  };
}

export function progressToRow(userId: string, p: ProgressSnapshot) {
  return {
    user_id: userId,
    questions_answered: p.questionsAnswered,
    correct_count: p.correctCount,
    current_streak: p.currentStreak,
    longest_streak: p.longestStreak,
    last_active_date: p.lastActiveDate,
    best_session_score: p.bestSessionScore,
    simulations_completed: p.simulationsCompleted,
    theme_progress: p.themeProgress,
    daily_stats: p.dailyStats,
    achievements_unlocked: p.achievementsUnlocked,
    sessions_history: p.sessionsHistory,
    bookmarks: p.bookmarks,
  };
}
