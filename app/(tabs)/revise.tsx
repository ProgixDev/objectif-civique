import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import {
  Bookmark,
  BookOpenCheck,
  ChevronRight,
  Flame,
  Sparkles,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EmptyState } from "@/components/EmptyState";
import { THEMES } from "@/data/themes";
import { QUESTIONS } from "@/data/questions";
import { useProgressStore, getSuccessRate } from "@/store/progressStore";
import { useHaptics } from "@/hooks/useHaptics";
import { Category } from "@/types";

type FilterKey = "Tous" | Category;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "Tous", label: "Tous" },
  { key: "NAT", label: "Naturalisation" },
  { key: "CSP", label: "CSP" },
  { key: "CR", label: "Résident" },
];

export default function Revise() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const [selected, setSelected] = useState<FilterKey>("Tous");

  const themeProgress = useProgressStore((s) => s.themeProgress);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const questionsAnswered = useProgressStore((s) => s.questionsAnswered);
  const correctCount = useProgressStore((s) => s.correctCount);
  const currentStreak = useProgressStore((s) => s.currentStreak);

  const themeCounts = useMemo(() => {
    return THEMES.reduce<Record<string, number>>((acc, t) => {
      acc[t.id] = QUESTIONS.filter(
        (q) =>
          q.theme === t.id && (selected === "Tous" || q.category === selected)
      ).length;
      return acc;
    }, {});
  }, [selected]);

  const totalQuestions = useMemo(
    () =>
      QUESTIONS.filter((q) => selected === "Tous" || q.category === selected)
        .length,
    [selected]
  );

  const avgProgress = useMemo(
    () =>
      THEMES.reduce((sum, t) => sum + (themeProgress[t.id] ?? 0), 0) /
      Math.max(THEMES.length, 1),
    [themeProgress]
  );

  const successRate = getSuccessRate({ questionsAnswered, correctCount });

  const bookmarkedQuestions = QUESTIONS.filter((q) => bookmarks.includes(q.id));

  const onSelectFilter = (key: FilterKey) => {
    haptics.light();
    setSelected(key);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconTile}>
            <BookOpenCheck size={22} color={Colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Entraînement</Text>
            <Text style={styles.subtitle}>
              Choisissez un thème pour vous entraîner.
            </Text>
          </View>
        </View>

        {/* Summary card */}
        <View style={styles.summary}>
          <View style={styles.summaryCol}>
            <Text style={styles.summaryValue}>{Math.round(avgProgress)}%</Text>
            <Text style={styles.summaryLabel}>Progression</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryCol}>
            <Text style={styles.summaryValue}>{successRate}%</Text>
            <Text style={styles.summaryLabel}>Réussite</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryCol}>
            <View style={styles.streakRow}>
              <Text style={styles.summaryValue}>{currentStreak}</Text>
              <Flame size={14} color={Colors.secondary} />
            </View>
            <Text style={styles.summaryLabel}>Série</Text>
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
          style={styles.filtersScroll}
        >
          {FILTERS.map((f) => {
            const isActive = selected === f.key;
            return (
              <Pressable
                key={f.key}
                onPress={() => onSelectFilter(f.key)}
                style={[styles.filter, isActive && styles.filterActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                {isActive ? (
                  <Sparkles size={12} color={Colors.white} />
                ) : null}
                <Text
                  style={[
                    styles.filterLabel,
                    isActive && styles.filterLabelActive,
                  ]}
                >
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Section label */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Thèmes</Text>
          <Text style={styles.sectionCount}>{totalQuestions} questions</Text>
        </View>

        {/* Theme cards */}
        <View style={styles.themeList}>
          {THEMES.map((t, i) => (
            <ThemeCard
              key={t.id}
              iconName={t.icon}
              title={t.name}
              questionCount={themeCounts[t.id] ?? 0}
              progress={themeProgress[t.id] ?? 0}
              index={i}
              onPress={() => {
                haptics.light();
                router.push({
                  pathname: "/theme/[id]",
                  params: { id: t.id, category: selected },
                });
              }}
            />
          ))}
        </View>

        {/* Bookmarks */}
        <View style={[styles.sectionHeader, { marginTop: 26 }]}>
          <Text style={styles.sectionLabel}>Marqués pour révision</Text>
          <View style={styles.bookmarksBadge}>
            <Bookmark size={11} color={Colors.primary} />
            <Text style={styles.bookmarksBadgeText}>
              {bookmarkedQuestions.length}
            </Text>
          </View>
        </View>

        {bookmarkedQuestions.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="Bookmark"
              title="Aucune question marquée"
              subtitle="Touchez l'icône signet pendant un entraînement pour les retrouver ici."
              cta="Commencer un entraînement"
              onCta={() => router.push("/(tabs)")}
            />
          </View>
        ) : (
          <View style={styles.bookmarksCard}>
            {bookmarkedQuestions.slice(0, 5).map((q, i) => (
              <React.Fragment key={q.id}>
                {i > 0 ? <View style={styles.bookmarkDivider} /> : null}
                <Pressable
                  onPress={() => {
                    haptics.light();
                    router.push({
                      pathname: "/theme/[id]",
                      params: { id: q.theme },
                    });
                  }}
                  style={styles.bookmarkRow}
                >
                  <View style={styles.numBadge}>
                    <Text style={styles.numBadgeText}>{i + 1}</Text>
                  </View>
                  <Text numberOfLines={2} style={styles.bookmarkText}>
                    {q.text}
                  </Text>
                  <ChevronRight size={16} color={Colors.textTertiary} />
                </Pressable>
              </React.Fragment>
            ))}
            {bookmarkedQuestions.length > 5 ? (
              <Pressable
                onPress={() => router.push("/(tabs)")}
                style={styles.bookmarkViewAll}
              >
                <Text style={styles.bookmarkViewAllText}>
                  Voir tous ({bookmarkedQuestions.length})
                </Text>
                <ChevronRight size={14} color={Colors.primary} />
              </Pressable>
            ) : null}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* ---------- ThemeCard ---------- */

function ThemeCard({
  iconName,
  title,
  questionCount,
  progress,
  index,
  onPress,
}: {
  iconName: string;
  title: string;
  questionCount: number;
  progress: number;
  index: number;
  onPress: () => void;
}) {
  const Icon =
    (LucideIcons as any)[iconName] ?? (LucideIcons as any).Folder;
  const palettes: [string, string][] = [
    [Colors.primary, Colors.primaryContainer],
    [Colors.secondary, "#ff6b5f"],
    [Colors.primaryContainer, Colors.primary],
    ["#7a4ae0", "#9a72f0"],
    [Colors.primary, Colors.secondary],
  ];
  const [from, to] = palettes[index % palettes.length];
  const pct = Math.round(progress);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.themeCard,
        pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
      ]}
    >
      <View
        style={[
          styles.themeIcon,
          { backgroundColor: from, shadowColor: from },
        ]}
      >
        <Icon size={20} color={Colors.white} strokeWidth={2.2} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.themeTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.themeMeta}>{questionCount} questions</Text>
        <View style={styles.themeProgressRow}>
          <View style={{ flex: 1 }}>
            <ProgressBar
              value={progress / 100}
              height={5}
              trackColor="rgba(25,28,30,0.06)"
              fillColors={[from, to]}
            />
          </View>
          <Text style={[styles.themePercent, { color: from }]}>{pct}%</Text>
        </View>
      </View>
      <ChevronRight size={16} color={Colors.textTertiary} />
    </Pressable>
  );
}

/* ---------- styles ---------- */

const cardShadow = {
  shadowColor: "#0A0F1E",
  shadowOpacity: 0.09,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
} as const;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },
  headerIconTile: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.4,
    color: Colors.onSurface,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 20,
    ...cardShadow,
  },
  summaryCol: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: "rgba(25,28,30,0.12)",
  },
  summaryValue: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 20,
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  summaryLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  filtersScroll: {
    marginHorizontal: -20,
    marginBottom: 16,
  },
  filtersRow: {
    gap: 8,
    paddingHorizontal: 20,
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: Colors.white,
    ...cardShadow,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  filterActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  filterLabel: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12.5,
    color: Colors.textSecondary,
    letterSpacing: 0.1,
  },
  filterLabelActive: {
    color: Colors.white,
    fontFamily: "Satoshi_700Bold",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionCount: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11.5,
    color: Colors.textTertiary,
    letterSpacing: 0.2,
  },

  themeList: {
    gap: 10,
  },
  themeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  themeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  themeTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14.5,
    lineHeight: 18,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  themeMeta: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  themeProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  themePercent: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    minWidth: 34,
    textAlign: "right",
  },

  bookmarksBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(0,85,164,0.10)",
  },
  bookmarksBadgeText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 0.2,
  },

  bookmarksCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    ...cardShadow,
  },
  bookmarkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  bookmarkDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },
  numBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  numBadgeText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.primary,
  },
  bookmarkText: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.onSurface,
  },
  bookmarkViewAll: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(25,28,30,0.08)",
  },
  bookmarkViewAllText: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12.5,
    color: Colors.primary,
    letterSpacing: 0.1,
  },

  emptyWrap: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    ...cardShadow,
  },
});
