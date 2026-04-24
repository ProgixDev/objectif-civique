import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, ThumbsUp, MessageCircle } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { FORUM_THREADS } from "@/data/forum";

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
  const thread = FORUM_THREADS.find((t) => t.id === threadId);

  if (!thread) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.surface }}>
        <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={6}
          >
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
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
          Discussion
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 40,
        }}
      >
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
            </View>
            <Text style={styles.body}>{r.body}</Text>
            <View style={styles.helpfulRow}>
              <ThumbsUp size={13} color={Colors.textTertiary} />
              <Text style={styles.helpfulText}>
                {r.helpful} personne{r.helpful > 1 ? "s" : ""} ont trouvé cela utile
              </Text>
            </View>
          </View>
        ))}

        {thread.replies.length === 0 ? (
          <Text style={styles.empty}>
            Soyez le premier à répondre à cette discussion.
          </Text>
        ) : null}
      </ScrollView>
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
});
