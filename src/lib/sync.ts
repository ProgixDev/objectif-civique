import { AppState } from "react-native";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import {
  ProfileRow,
  ProgressRow,
  ProgressSnapshot,
  progressToRow,
  rowToProgress,
  rowToUser,
  userToProfilePatch,
} from "@/lib/mappers";
import { User } from "@/types";

/**
 * Couche de synchronisation offline-first.
 *
 * - Les stores Zustand (persistés en AsyncStorage) restent le cache local et la
 *   source d'affichage : l'app marche hors-ligne.
 * - On TIRE (pull) les données du backend au login / restauration de session.
 * - On POUSSE (push) les changements locaux vers Supabase, en débounce, en
 *   best-effort (un échec réseau est ignoré : le prochain changement re-pousse).
 * - Stratégie de conflit v1 : last-write-wins via `updated_at` (mono-appareil).
 */

/** Vrai pendant l'application de données distantes → évite l'écho pull→push. */
let applyingRemote = false;

function currentProgressSnapshot(): ProgressSnapshot {
  const s = useProgressStore.getState();
  return {
    questionsAnswered: s.questionsAnswered,
    correctCount: s.correctCount,
    currentStreak: s.currentStreak,
    longestStreak: s.longestStreak,
    lastActiveDate: s.lastActiveDate,
    bestSessionScore: s.bestSessionScore,
    simulationsCompleted: s.simulationsCompleted,
    themeProgress: s.themeProgress,
    dailyStats: s.dailyStats,
    achievementsUnlocked: s.achievementsUnlocked,
    sessionsHistory: s.sessionsHistory,
    bookmarks: s.bookmarks,
  };
}

/**
 * Tire profil + progression du backend et hydrate les stores.
 * Renvoie l'utilisateur chargé (ou null si introuvable / hors-ligne).
 */
export async function pullAll(userId: string): Promise<User | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const [{ data: profile }, { data: progress }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase
        .from("progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(),
    ]);

    applyingRemote = true;
    let user: User | null = null;
    if (profile) {
      user = rowToUser(profile as ProfileRow);
      useUserStore.getState().setUser(user);
    }
    if (progress) {
      useProgressStore
        .getState()
        .hydrateRemote(rowToProgress(progress as ProgressRow));
    }
    applyingRemote = false;
    return user;
  } catch (err) {
    applyingRemote = false;
    console.warn("[sync] pullAll a échoué (offline ?)", err);
    return null;
  }
}

export async function pushProfile(user: User): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from("profiles").upsert(userToProfilePatch(user));
  } catch (err) {
    console.warn("[sync] pushProfile a échoué (offline ?)", err);
  }
}

export async function pushProgress(userId: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await supabase
      .from("progress")
      .upsert(progressToRow(userId, currentProgressSnapshot()));
  } catch (err) {
    console.warn("[sync] pushProgress a échoué (offline ?)", err);
  }
}

// ────────────────────────── abonnements live ──────────────────────────

function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
  debounced.flush = (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    fn(...args);
  };
  return debounced;
}

let teardown: (() => void) | null = null;

/**
 * Démarre la synchronisation continue pour un utilisateur connecté :
 * pousse (debounced) tout changement de profil ou de progression, et flush au
 * retour au premier plan. Idempotent : ré-appelle stoppe la précédente.
 */
export function startSync(userId: string): void {
  stopSync();
  if (!isSupabaseConfigured) return;

  const pushProfileDebounced = debounce(() => {
    const u = useUserStore.getState().user;
    if (u) pushProfile(u);
  }, 1500);

  const pushProgressDebounced = debounce(() => pushProgress(userId), 1500);

  const unsubUser = useUserStore.subscribe((state, prev) => {
    if (applyingRemote || !state.user || state.user.id !== userId) return;
    if (state.user === prev.user) return;
    pushProfileDebounced();
  });

  const unsubProgress = useProgressStore.subscribe(() => {
    if (applyingRemote) return;
    pushProgressDebounced();
  });

  const appStateSub = AppState.addEventListener("change", (next) => {
    if (next === "active" || next === "background") {
      const u = useUserStore.getState().user;
      if (u && u.id === userId) {
        pushProfileDebounced.flush();
        pushProgressDebounced.flush();
      }
    }
  });

  teardown = () => {
    unsubUser();
    unsubProgress();
    appStateSub.remove();
  };
}

export function stopSync(): void {
  if (teardown) {
    teardown();
    teardown = null;
  }
}
