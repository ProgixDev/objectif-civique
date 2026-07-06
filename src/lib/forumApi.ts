import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { FORUM_THREADS, ForumReply, ForumThread } from "@/data/forum";

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

/** Liste des discussions, avec le nombre de réponses (sans charger le détail). */
export async function fetchThreads(): Promise<ForumThread[]> {
  if (!isSupabaseConfigured) return FORUM_THREADS;
  try {
    const { data, error } = await supabase
      .from("forum_threads")
      .select("*, forum_replies(count)")
      .order("created_at", { ascending: false });
    if (error || !data) return FORUM_THREADS;
    return data.map((t: any) => ({
      ...rowToThread(t),
      replies: [],
      replyCount: t.forum_replies?.[0]?.count ?? 0,
    }));
  } catch {
    return FORUM_THREADS;
  }
}

/** Détail d'une discussion + ses réponses (triées de la plus ancienne). */
export async function fetchThread(id: string): Promise<ForumThread | null> {
  const fallback = FORUM_THREADS.find((t) => t.id === id) ?? null;
  if (!isSupabaseConfigured) return fallback;
  try {
    const { data, error } = await supabase
      .from("forum_threads")
      .select("*, forum_replies(*)")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return fallback;
    const thread = rowToThread(data);
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
