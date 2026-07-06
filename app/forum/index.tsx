import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import {
  ChevronLeft,
  MessageSquare,
  Eye,
  MessagesSquare,
  Plus,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { ForumThread } from "@/data/forum";
import { fetchThreads } from "@/lib/forumApi";

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "NAT", label: "Naturalisation" },
  { key: "CSP", label: "CSP" },
  { key: "CR", label: "CR" },
  { key: "general", label: "Général" },
] as const;

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Hier";
  if (days < 7) return `Il y a ${days} j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function ForumList() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [allThreads, setAllThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const data = await fetchThreads();
    setAllThreads(data);
    setLoading(false);
  }, []);

  // Recharge à chaque fois qu'on revient sur l'écran (après avoir posté).
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const threads = useMemo(() => {
    if (filter === "all") return allThreads;
    return allThreads.filter((t) => t.topic === filter);
  }, [filter, allThreads]);

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
          Forum
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 96,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <MessagesSquare size={20} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>Communauté des candidats</Text>
          <Text style={styles.heroSub}>
            Posez vos questions, partagez vos expériences avec la communauté.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginBottom: 14 }}
          style={{ marginHorizontal: -4 }}
        >
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[styles.filter, active && styles.filterActive]}
              >
                <Text
                  style={[
                    styles.filterLabel,
                    active && { color: Colors.white },
                  ]}
                >
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {threads.map((t) => (
          <Pressable
            key={t.id}
            onPress={() =>
              router.push({
                pathname: "/forum/[threadId]",
                params: { threadId: t.id },
              })
            }
            style={styles.threadCard}
          >
            <View style={styles.threadHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{t.authorInitials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.author}>{t.author}</Text>
                <Text style={styles.meta}>
                  {timeAgo(t.createdAt)} · {t.authorGoal}
                </Text>
              </View>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {t.title}
            </Text>
            <Text style={styles.excerpt} numberOfLines={2}>
              {t.body}
            </Text>
            <View style={styles.footer}>
              <View style={styles.stat}>
                <MessageSquare size={12} color={Colors.textTertiary} />
                <Text style={styles.statText}>
                  {t.replyCount ?? t.replies.length}
                </Text>
              </View>
              <View style={styles.stat}>
                <Eye size={12} color={Colors.textTertiary} />
                <Text style={styles.statText}>{t.views}</Text>
              </View>
            </View>
          </Pressable>
        ))}

        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: 30 }} />
        ) : threads.length === 0 ? (
          <Text style={styles.empty}>Aucune discussion pour ce filtre.</Text>
        ) : null}
      </ScrollView>

      <Pressable
        onPress={() => router.push("/forum/new")}
        style={({ pressed }) => [
          styles.fab,
          { bottom: insets.bottom + 20 },
          pressed && { opacity: 0.9 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Nouvelle discussion"
      >
        <Plus size={20} color={Colors.white} strokeWidth={2.6} />
        <Text style={styles.fabLabel}>Nouvelle discussion</Text>
      </Pressable>
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
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 18,
    marginBottom: 14,
  },
  heroIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.white,
    marginBottom: 4,
  },
  heroSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
  },
  filter: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  filterActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.onSurface,
  },
  threadCard: {
    padding: 14,
    marginBottom: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.35)",
  },
  threadHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: Colors.white,
  },
  author: {
    fontFamily: "Inter_600SemiBold",
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
    fontSize: 15,
    lineHeight: 20,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  excerpt: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    gap: 14,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: Colors.textTertiary,
  },
  empty: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 30,
  },
  fab: {
    position: "absolute",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    height: 50,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.white,
  },
});
