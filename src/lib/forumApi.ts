import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { FORUM_THREADS, ForumReply, ForumThread } from "@/data/forum";
import {
  BANNED_CONTENT_MESSAGE,
  containsBannedWords,
} from "@/lib/contentFilter";

/**
 * Couche data du forum « Communauté des candidats ».
 *
 * Source de vérité : Supabase (tables forum_threads / forum_replies, cf.
 * supabase/migrations/20260706_forum.sql). Si le backend n'est pas configuré
 * ou est hors-ligne, on retombe sur les discussions d'exemple statiques
 * (lecture seule) pour ne jamais afficher un forum vide.
 */

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase() || "?";
}

function normGoal(goal: unknown): "NAT" | "CSP" | "CR" {
  return goal === "CSP" || goal === "CR" ? goal : "NAT";
}

function rowToReply(r: any): ForumReply {
  return {
    id: r.id,
    userId: r.user_id ?? null,
    author: r.author,
    authorInitials: r.author_initials,
    authorGoal: normGoal(r.author_goal),
    body: r.body,
    createdAt: r.created_at,
    helpful: r.helpful ?? 0,
  };
}

function rowToThread(t: any): ForumThread {
  return {
    id: t.id,
    userId: t.user_id ?? null,
    author: t.author,
    authorInitials: t.author_initials,
    authorGoal: normGoal(t.author_goal),
    topic: t.topic,
    title: t.title,
    body: t.body,
    createdAt: t.created_at,
    views: t.views ?? 0,
    replies: Array.isArray(t.forum_replies) ? t.forum_replies.map(rowToReply) : [],
  };
}

/**
 * Identifiants des utilisateurs bloqués par l'utilisateur courant.
 * Renvoie un ensemble vide si le backend est absent ou la requête échoue :
 * le forum reste consultable, simplement sans filtrage.
 */
export async function fetchBlockedUserIds(): Promise<Set<string>> {
  if (!isSupabaseConfigured) return new Set();
  try {
    const { data, error } = await supabase
      .from("forum_blocks")
      .select("blocked_id");
    if (error || !data) return new Set();
    return new Set(data.map((r: any) => r.blocked_id as string));
  } catch {
    return new Set();
  }
}

/** Liste des discussions, avec le nombre de réponses (sans charger le détail). */
export async function fetchThreads(): Promise<ForumThread[]> {
  if (!isSupabaseConfigured) return FORUM_THREADS;
  try {
    const [{ data, error }, blocked] = await Promise.all([
      supabase
        .from("forum_threads")
        .select("*, forum_replies(count)")
        .order("created_at", { ascending: false }),
      fetchBlockedUserIds(),
    ]);
    if (error || !data) return FORUM_THREADS;
    return data
      .map((t: any) => ({
        ...rowToThread(t),
        replies: [],
        replyCount: t.forum_replies?.[0]?.count ?? 0,
      }))
      .filter((t) => !(t.userId && blocked.has(t.userId)));
  } catch {
    return FORUM_THREADS;
  }
}

/** Détail d'une discussion + ses réponses (triées de la plus ancienne). */
export async function fetchThread(id: string): Promise<ForumThread | null> {
  const fallback = FORUM_THREADS.find((t) => t.id === id) ?? null;
  if (!isSupabaseConfigured) return fallback;
  try {
    const [{ data, error }, blocked] = await Promise.all([
      supabase
        .from("forum_threads")
        .select("*, forum_replies(*)")
        .eq("id", id)
        .maybeSingle(),
      fetchBlockedUserIds(),
    ]);
    if (error || !data) return fallback;
    const thread = rowToThread(data);
    // Discussion d'un utilisateur bloqué : elle n'existe plus pour lui.
    if (thread.userId && blocked.has(thread.userId)) return null;
    thread.replies = thread.replies.filter(
      (r) => !(r.userId && blocked.has(r.userId))
    );
    thread.replies.sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
    );
    return thread;
  } catch {
    return fallback;
  }
}

/** Publie une nouvelle discussion sous le compte de l'utilisateur courant. */
export async function createThread(input: {
  title: string;
  body: string;
  topic: string;
}): Promise<ForumThread> {
  const user = useUserStore.getState().user;
  if (!isSupabaseConfigured || !user) {
    throw new Error("Connectez-vous pour publier une discussion.");
  }
  if (containsBannedWords(`${input.title} ${input.body}`)) {
    throw new Error(BANNED_CONTENT_MESSAGE);
  }
  const author = user.firstName?.trim() || "Candidat";
  const { data, error } = await supabase
    .from("forum_threads")
    .insert({
      user_id: user.id,
      author,
      author_initials: initialsFrom(author),
      author_goal: normGoal(user.goal),
      topic: input.topic,
      title: input.title.trim(),
      body: input.body.trim(),
    })
    .select("*")
    .single();
  if (error || !data) {
    throw new Error(error?.message ?? "Publication impossible pour le moment.");
  }
  return { ...rowToThread(data), replies: [] };
}

/** Répond à une discussion sous le compte de l'utilisateur courant. */
export async function createReply(
  threadId: string,
  body: string
): Promise<ForumReply> {
  const user = useUserStore.getState().user;
  if (!isSupabaseConfigured || !user) {
    throw new Error("Connectez-vous pour répondre.");
  }
  if (containsBannedWords(body)) {
    throw new Error(BANNED_CONTENT_MESSAGE);
  }
  const author = user.firstName?.trim() || "Candidat";
  const { data, error } = await supabase
    .from("forum_replies")
    .insert({
      thread_id: threadId,
      user_id: user.id,
      author,
      author_initials: initialsFrom(author),
      author_goal: normGoal(user.goal),
      body: body.trim(),
    })
    .select("*")
    .single();
  if (error || !data) {
    throw new Error(error?.message ?? "Réponse impossible pour le moment.");
  }
  return rowToReply(data);
}

// ───────────────────────────── Modération ─────────────────────────────
// Signalement + blocage : les deux mécanismes exigés par l'App Store
// (guideline 1.2) pour tout contenu généré par les utilisateurs.

export type ReportKind = "thread" | "reply";

export const REPORT_REASONS = [
  "Spam ou publicité",
  "Contenu offensant ou haineux",
  "Harcèlement",
  "Information trompeuse",
  "Autre",
] as const;

/**
 * Signale un contenu. Le signalement part en file d'attente (`status =
 * 'pending'`) pour revue côté back-office.
 *
 * Un même utilisateur ne peut signaler deux fois le même contenu : la
 * contrainte d'unicité renvoie l'erreur 23505, qu'on traite comme un succès
 * pour ne pas dérouter l'utilisateur.
 */
export async function reportContent(input: {
  kind: ReportKind;
  contentId: string;
  authorId: string | null;
  reason: string;
}): Promise<void> {
  const user = useUserStore.getState().user;
  if (!isSupabaseConfigured || !user) {
    throw new Error("Connectez-vous pour signaler un contenu.");
  }
  const { error } = await supabase.from("forum_reports").insert({
    reporter_id: user.id,
    content_kind: input.kind,
    content_id: input.contentId,
    author_id: input.authorId,
    reason: input.reason,
  });
  if (error && error.code !== "23505") {
    throw new Error("Signalement impossible pour le moment.");
  }
}

/**
 * Bloque un utilisateur : ses discussions et réponses disparaissent
 * immédiatement de la vue de l'utilisateur courant.
 */
export async function blockUser(
  blockedId: string,
  blockedName: string
): Promise<void> {
  const user = useUserStore.getState().user;
  if (!isSupabaseConfigured || !user) {
    throw new Error("Connectez-vous pour bloquer un utilisateur.");
  }
  if (blockedId === user.id) {
    throw new Error("Vous ne pouvez pas vous bloquer vous-même.");
  }
  const { error } = await supabase.from("forum_blocks").insert({
    blocker_id: user.id,
    blocked_id: blockedId,
    blocked_name: blockedName,
  });
  if (error && error.code !== "23505") {
    throw new Error("Blocage impossible pour le moment.");
  }
}

export type BlockedUser = { id: string; name: string };

/** Liste des utilisateurs bloqués, pour l'écran de réglages. */
export async function fetchBlockedUsers(): Promise<BlockedUser[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from("forum_blocks")
      .select("blocked_id, blocked_name")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.blocked_id as string,
      name: (r.blocked_name as string) || "Utilisateur",
    }));
  } catch {
    return [];
  }
}

/** Débloque un utilisateur précédemment bloqué. */
export async function unblockUser(blockedId: string): Promise<void> {
  const user = useUserStore.getState().user;
  if (!isSupabaseConfigured || !user) return;
  const { error } = await supabase
    .from("forum_blocks")
    .delete()
    .eq("blocker_id", user.id)
    .eq("blocked_id", blockedId);
  if (error) throw new Error("Déblocage impossible pour le moment.");
}
