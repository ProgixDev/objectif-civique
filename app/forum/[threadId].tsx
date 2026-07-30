import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { ForumThread } from "@/data/forum";
import { fetchThread, createReply } from "@/lib/forumApi";
import { showContentActions } from "@/lib/moderation";
import { toast } from "@/store/toastStore";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ForumThreadScreen() {
  const insets = useSafeAreaInsets();
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const [thread, setThread] = useState<ForumThread | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!threadId) return;
    const t = await fetchThread(threadId);
    setThread(t);
    setLoading(false);
  }, [threadId]);

  useEffect(() => {
    load();
  }, [load]);

  const onSend = async () => {
    if (reply.trim().length < 2 || busy || !thread) return;
    setBusy(true);
    try {
      const newReply = await createReply(thread.id, reply);
      setThread((prev) =>
        prev ? { ...prev, replies: [...prev.replies, newReply] } : prev
      );
      setReply("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Réponse impossible.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.surface }}>
        <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={6}>
            <ChevronLeft size={22} color={Colors.primary} />
          </Pressable>
          <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
            Discussion
          </Text>
        </View>
        <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
      </View>
    );
  }

  if (!thread) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.surface }}>
        <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={6}>
            <ChevronLeft size={22} color={Colors.primary} />
          </Pressable>
          <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
            Discussion introuvable
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={6}>
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
          Discussion
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top + 60}
      >
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
          <View style={styles.threadCard}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{thread.authorInitials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.author}>{thread.author}</Text>
                <Text style={styles.meta}>
                  {formatDate(thread.createdAt)} · {thread.authorGoal}
                </Text>
              </View>
              <Pressable
                onPress={() =>
                  showContentActions({
                    kind: "thread",
                    contentId: thread.id,
                    authorId: thread.userId ?? null,
                    authorName: thread.author,
                    // L'auteur bloqué : la discussion n'a plus lieu d'être ouverte.
                    onBlocked: () => router.back(),
                  })
                }
                hitSlop={8}
                style={styles.moreBtn}
                accessibilityRole="button"
                accessibilityLabel="Signaler ou bloquer"
              >
                <MoreHorizontal size={18} color={Colors.textSecondary} />
              </Pressable>
            </View>
            <Text style={styles.title}>{thread.title}</Text>
            <Text style={styles.body}>{thread.body}</Text>
          </View>

          <View style={styles.repliesHeader}>
            <MessageCircle size={14} color={Colors.primary} />
            <Text style={styles.repliesHeaderText}>
              {thread.replies.length} réponse{thread.replies.length > 1 ? "s" : ""}
            </Text>
          </View>

          {thread.replies.map((r) => (
            <View key={r.id} style={styles.replyCard}>
              <View style={styles.header}>
                <View style={[styles.avatar, { backgroundColor: Colors.tertiary }]}>
                  <Text style={[styles.avatarText, { color: Colors.primary }]}>
                    {r.authorInitials}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.author}>{r.author}</Text>
                  <Text style={styles.meta}>
                    {formatDate(r.createdAt)} · {r.authorGoal}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    showContentActions({
                      kind: "reply",
                      contentId: r.id,
                      authorId: r.userId ?? null,
                      authorName: r.author,
                      onBlocked: load,
                    })
                  }
                  hitSlop={8}
                  style={styles.moreBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Signaler ou bloquer"
                >
                  <MoreHorizontal size={18} color={Colors.textSecondary} />
                </Pressable>
              </View>
              <Text style={styles.body}>{r.body}</Text>
              {r.helpful > 0 ? (
                <View style={styles.helpfulRow}>
                  <ThumbsUp size={13} color={Colors.textTertiary} />
                  <Text style={styles.helpfulText}>
                    {r.helpful} personne{r.helpful > 1 ? "s" : ""} ont trouvé cela utile
                  </Text>
                </View>
              ) : null}
            </View>
          ))}

          {thread.replies.length === 0 ? (
            <Text style={styles.empty}>
              Soyez le premier à répondre à cette discussion.
            </Text>
          ) : null}
        </ScrollView>

        <View style={[styles.composer, { paddingBottom: insets.bottom + 10 }]}>
          <TextInput
            value={reply}
            onChangeText={setReply}
            placeholder="Écrire une réponse…"
            placeholderTextColor={Colors.textTertiary}
            style={styles.composerInput}
            multiline
          />
          <Pressable
            onPress={onSend}
            disabled={reply.trim().length < 2 || busy}
            style={({ pressed }) => [
              styles.sendBtn,
              (reply.trim().length < 2 || busy) && { opacity: 0.4 },
              pressed && { opacity: 0.85 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Envoyer la réponse"
          >
            <Send size={18} color={Colors.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
    backgroundColor: Colors.surface,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
  },
  threadCard: {
    padding: 16,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.35)",
    marginBottom: 16,
  },
  replyCard: {
    padding: 14,
    marginBottom: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLow,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.white,
  },
  moreBtn: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  meta: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 24,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  body: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  repliesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  repliesHeaderText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.primary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  helpfulRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  helpfulText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: Colors.textTertiary,
  },
  empty: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 20,
  },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    backgroundColor: Colors.surface,
  },
  composerInput: {
    flex: 1,
    maxHeight: 120,
    minHeight: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.onSurface,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
