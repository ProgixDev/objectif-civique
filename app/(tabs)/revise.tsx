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
  Layers,
  MessageCircle,
  Sparkles,
  Target,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EmptyState } from "@/components/EmptyState";
import { THEMES } from "@/data/themes";
import { QUESTIONS, GOAL_LABELS } from "@/data/questions";
import { useProgressStore, getSuccessRate } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { useHaptics } from "@/hooks/useHaptics";
import { getPresentation } from "@/lib/goalPresentation";
import { Category } from "@/types";

type FilterKey = "Tous" | Category;
type SubTab = "officielles" | "themes" | "flashcards" | "assimilation";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "NAT", label: "Naturalisation" },
  { key: "CSP", label: "CSP" },
  { key: "CR", label: "Résident" },
  { key: "Tous", label: "Tous" },
];

export default function Revise() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const userGoal = useUserStore((s) => s.user?.goal);
  const [selected, setSelected] = useState<FilterKey>(
    (userGoal as FilterKey) ?? "Tous"
  );
  const [subTab, setSubTab] = useState<SubTab>("officielles");

  const themeProgress = useProgressStore((s) => s.themeProgress);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const questionsAnswered = useProgressStore((s) => s.questionsAnswered);
  const correctCount = useProgressStore((s) => s.correctCount);
  const currentStreak = useProgressStore((s) => s.currentStreak);

  const themeCounts = useMemo(() => {
    return THEMES.reduce<Record<string, number>>((acc, t) => {
      acc[t.id] = QUESTIONS.filter(
        (q) =>
          q.theme === t.id && (selected === "Tous" || q.categories.includes(selected as any))
      ).length;
      return acc;
    }, {});
  }, [selected]);

  const totalQuestions = useMemo(
    () =>
      QUESTIONS.filter((q) => selected === "Tous" || q.categories.includes(selected as any))
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

  const onSelectSubTab = (key: SubTab) => {
    haptics.light();
    setSubTab(key);
  };

  // Sous-onglets — "assimilation" affiché uniquement aux candidats NAT
  const subTabs: { key: SubTab; label: string }[] = [
    { key: "officielles", label: "Officielles" },
    { key: "themes", label: "Thèmes" },
    { key: "flashcards", label: "Flashcards" },
    ...(userGoal === "NAT"
      ? [{ key: "assimilation" as SubTab, label: "Assimilation" }]
      : []),
  ];

  const activeCategory: Category =
    selected === "Tous" ? (userGoal as Category) ?? "NAT" : selected;

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
            <Text style={styles.title}>Réviser</Text>
            <Text style={styles.subtitle}>
              {(() => {
                const p = getPresentation(userGoal ?? null);
                return `Préparation ${p.shortLabel} — tous les modes regroupés.`;
              })()}
            </Text>
          </View>
        </View>

        {/* Bandeau de cas — rappel visuel constant */}
        {userGoal ? (
          <View style={styles.caseBadge}>
            <Text style={styles.caseBadgeLabel}>EN COURS</Text>
            <Text style={styles.caseBadgeText}>
              {GOAL_LABELS[userGoal].toUpperCase()}
            </Text>
          </View>
        ) : null}

        {/* Summary card — toujours visible */}
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

        {/* Sous-onglets */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subTabsRow}
          style={styles.subTabsScroll}
        >
          {subTabs.map((t) => {
            const active = subTab === t.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => onSelectSubTab(t.key)}
                style={[styles.subTab, active && styles.subTabActive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
              >
                <Text
                  style={[
                    styles.subTabLabel,
                    active && styles.subTabLabelActive,
                  ]}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {subTab === "officielles" ? (
          <OfficiellesSection
            selected={selected}
            onSelectFilter={onSelectFilter}
            totalQuestions={totalQuestions}
            activeCategory={activeCategory}
            bookmarkedQuestions={bookmarkedQuestions}
            onStartPractice={() =>
              router.push({
                pathname: "/practice/[category]",
                params: { category: activeCategory },
              })
            }
          />
        ) : null}

        {subTab === "themes" ? (
          <ThemesSection
            themeCounts={themeCounts}
            themeProgress={themeProgress}
            selected={selected}
            onSelectFilter={onSelectFilter}
            totalQuestions={totalQuestions}
          />
        ) : null}

        {subTab === "flashcards" ? <FlashcardsSection /> : null}

        {subTab === "assimilation" ? <AssimilationSection /> : null}
      </ScrollView>
    </View>
  );
}

/* ---------- Sections ---------- */

function OfficiellesSection({
  selected,
  onSelectFilter,
  totalQuestions,
  activeCategory,
  bookmarkedQuestions,
  onStartPractice,
}: {
  selected: FilterKey;
  onSelectFilter: (k: FilterKey) => void;
  totalQuestions: number;
  activeCategory: Category;
  bookmarkedQuestions: typeof QUESTIONS;
  onStartPractice: () => void;
}) {
  return (
    <View>
      {/* Filtres cas */}
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
              {isActive ? <Sparkles size={12} color={Colors.white} /> : null}
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

      {/* Programme officiel banner — affiche le cas sélectionné */}
      <View style={styles.programmeBanner}>
        <View style={styles.programmeBadge}>
          <Text style={styles.programmeBadgeText}>
            QUESTIONS OFFICIELLES ·{" "}
            {selected === "Tous"
              ? "TOUS LES CAS"
              : GOAL_LABELS[selected].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.programmeTitle}>
          {totalQuestions} questions disponibles
        </Text>
        <Text style={styles.programmeSub}>
          Programme rédigé par l'équipe Objectif Civique, adapté à chaque
          parcours (NAT, CSP, CR).
        </Text>
        <Pressable
          onPress={onStartPractice}
          style={({ pressed }) => [
            styles.programmeCta,
            pressed && { opacity: 0.92 },
          ]}
        >
          <Text style={styles.programmeCtaText}>
            Commencer l'entraînement
          </Text>
          <ChevronRight size={14} color={Colors.primary} />
        </Pressable>
      </View>

      {/* Marqués pour révision */}
      <View style={[styles.sectionHeader, { marginTop: 22 }]}>
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
            onCta={onStartPractice}
          />
        </View>
      ) : (
        <View style={styles.bookmarksCard}>
          {bookmarkedQuestions.slice(0, 5).map((q, i) => (
            <React.Fragment key={q.id}>
              {i > 0 ? <View style={styles.bookmarkDivider} /> : null}
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/theme/[id]",
                    params: { id: q.theme },
                  })
                }
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
        </View>
      )}
    </View>
  );
}

function ThemesSection({
  themeCounts,
  themeProgress,
  selected,
  onSelectFilter,
  totalQuestions,
}: {
  themeCounts: Record<string, number>;
  themeProgress: Record<string, number>;
  selected: FilterKey;
  onSelectFilter: (k: FilterKey) => void;
  totalQuestions: number;
}) {
  return (
    <View>
      {/* Filtres cas */}
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
            >
              {isActive ? <Sparkles size={12} color={Colors.white} /> : null}
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

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Par thème</Text>
        <Text style={styles.sectionCount}>{totalQuestions} questions</Text>
      </View>

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
              router.push({
                pathname: "/theme/[id]",
                params: { id: t.id, category: selected },
              });
            }}
          />
        ))}
      </View>
    </View>
  );
}

function FlashcardsSection() {
  return (
    <View>
      <View style={styles.flashIntro}>
        <View style={styles.flashIcon}>
          <Layers size={20} color={Colors.white} />
        </View>
        <Text style={styles.flashTitle}>Révisez en mode cartes</Text>
        <Text style={styles.flashSub}>
          Parcourez rapidement les questions et retournez la carte pour voir la
          réponse et l'explication.
        </Text>
        <Pressable
          onPress={() => router.push("/flashcards")}
          style={({ pressed }) => [
            styles.flashCta,
            pressed && { opacity: 0.92 },
          ]}
        >
          <Text style={styles.flashCtaText}>Lancer les flashcards</Text>
          <ChevronRight size={14} color={Colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

function AssimilationSection() {
  return (
    <View>
      <View style={styles.assimIntro}>
        <View style={styles.assimIcon}>
          <MessageCircle size={20} color={Colors.white} />
        </View>
        <Text style={styles.assimTitle}>Entretien d'assimilation</Text>
        <Text style={styles.assimSub}>
          Préparez l'entretien en préfecture : questions vrai/faux et choix
          multiples sur 6 thématiques.
        </Text>
        <Pressable
          onPress={() => router.push("/assimilation")}
          style={({ pressed }) => [
            styles.assimCta,
            pressed && { opacity: 0.92 },
          ]}
        >
          <Text style={styles.assimCtaText}>Accéder à l'entretien</Text>
          <ChevronRight size={14} color={Colors.white} />
        </Pressable>
      </View>
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
        <Text style={styles.themeCardTitle} numberOfLines={1}>
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
  caseBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    marginBottom: 14,
  },
  caseBadgeLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 9.5,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1.2,
  },
  caseBadgeText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.white,
    letterSpacing: 0.4,
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    ...cardShadow,
  },
  summaryCol: { flex: 1, alignItems: "center" },
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

  /* Sous-onglets */
  subTabsScroll: {
    marginHorizontal: -20,
    marginBottom: 14,
  },
  subTabsRow: {
    gap: 6,
    paddingHorizontal: 20,
  },
  subTab: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderWidth: 1,
    borderColor: "rgba(25,28,30,0.08)",
  },
  subTabActive: {
    backgroundColor: Colors.onSurface,
    borderColor: Colors.onSurface,
  },
  subTabLabel: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12.5,
    color: Colors.textSecondary,
    letterSpacing: 0.1,
  },
  subTabLabelActive: {
    color: Colors.white,
    fontFamily: "Satoshi_700Bold",
  },

  /* Filtres cas */
  filtersScroll: {
    marginHorizontal: -20,
    marginBottom: 14,
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

  /* Programme banner */
  programmeBanner: {
    borderRadius: 20,
    backgroundColor: Colors.primary,
    padding: 16,
    marginBottom: 6,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  programmeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 10,
  },
  programmeBadgeText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 10,
    color: Colors.white,
    letterSpacing: 1.1,
  },
  programmeTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 17,
    color: Colors.white,
    letterSpacing: -0.2,
  },
  programmeSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.82)",
    marginTop: 4,
    lineHeight: 16,
    marginBottom: 14,
  },
  programmeCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 40,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },
  programmeCtaText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.primary,
    letterSpacing: 0.2,
  },

  /* Section header générique */
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

  /* Themes */
  themeList: { gap: 10 },
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
  themeCardTitle: {
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

  /* Bookmarks */
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
  emptyWrap: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    ...cardShadow,
  },

  /* Flashcards section */
  flashIntro: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: Colors.white,
    ...cardShadow,
    alignItems: "flex-start",
  },
  flashIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#7a4ae0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#7a4ae0",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  flashTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  flashSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  flashCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#7a4ae0",
  },
  flashCtaText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.white,
    letterSpacing: 0.2,
  },

  /* Assimilation section */
  assimIntro: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: Colors.white,
    ...cardShadow,
    alignItems: "flex-start",
  },
  assimIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  assimTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  assimSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  assimCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 999,
    backgroundColor: Colors.secondary,
  },
  assimCtaText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.white,
    letterSpacing: 0.2,
  },
});
