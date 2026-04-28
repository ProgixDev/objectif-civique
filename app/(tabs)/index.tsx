import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowRight,
  Bell,
  BookOpenCheck,
  ChevronRight,
  Compass,
  Flame,
  Layers,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Newspaper,
  ShieldQuestion,
  Sparkles,
  Target,
  Timer,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useUserStore } from "@/store/userStore";
import { useProgressStore, getSuccessRate } from "@/store/progressStore";
import { GOAL_LABELS } from "@/data/questions";
import { THEMES } from "@/data/themes";
import { useHaptics } from "@/hooks/useHaptics";

const TOTAL_QUESTION_BANK = 2500;
const FLASHCARD_TARGET = 50;

type TileDef = {
  key: string;
  title: string;
  subtitle: string;
  value: number;
  icon: React.ReactNode;
  gradient: [string, string];
  onPress: () => void;
};

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const user = useUserStore((s) => s.user);
  const progress = useProgressStore();
  const haptics = useHaptics();

  const firstName = user?.firstName ?? "Ami";
  const initials = firstName.slice(0, 1).toUpperCase();
  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : "Naturalisation";
  const successRate = getSuccessRate({
    questionsAnswered: progress.questionsAnswered,
    correctCount: progress.correctCount,
  });

  const sortedThemes = [...THEMES]
    .map((t) => ({ ...t, percent: progress.themeProgress[t.id] ?? 0 }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  const themeAvg =
    THEMES.reduce(
      (acc, t) => acc + (progress.themeProgress[t.id] ?? 0),
      0
    ) / Math.max(THEMES.length, 1);

  const trainingPct = Math.min(
    1,
    progress.questionsAnswered / TOTAL_QUESTION_BANK
  );
  const simulationPct = Math.min(1, progress.bestSessionScore / 100);
  const flashcardsPct = Math.min(
    1,
    progress.bookmarks.length / FLASHCARD_TARGET
  );
  const themesPct = Math.min(1, themeAvg / 100);

  // Compute explicit tile width so the grid is reliably 2 per row
  const contentWidth = screenWidth - 40; // minus screen horizontal padding 20 * 2
  const tileWidth = (contentWidth - 12) / 2; // minus gap

  const go = (fn: () => void) => () => {
    haptics.light();
    fn();
  };

  const tiles: TileDef[] = [
    {
      key: "training",
      title: "Entraînement",
      subtitle: "Question par question",
      value: trainingPct,
      icon: <BookOpenCheck size={20} color={Colors.white} strokeWidth={2.2} />,
      gradient: [Colors.primary, Colors.primaryContainer],
      onPress: () =>
        router.push({
          pathname: "/practice/[category]",
          params: { category: user?.goal ?? "NAT" },
        }),
    },
    {
      key: "simulation",
      title: "Simulation",
      subtitle: "40 questions · 45 min",
      value: simulationPct,
      icon: <Timer size={20} color={Colors.white} strokeWidth={2.2} />,
      gradient: [Colors.secondary, "#ff6b5f"],
      onPress: () => router.push("/simulation/intro"),
    },
    {
      key: "flashcards",
      title: "Flashcards",
      subtitle: "Révision rapide",
      value: flashcardsPct,
      icon: <Layers size={20} color={Colors.white} strokeWidth={2.2} />,
      gradient: ["#7a4ae0", "#9a72f0"],
      onPress: () => router.push("/flashcards"),
    },
    {
      key: "themes",
      title: "Par thème",
      subtitle: "Révision ciblée",
      value: themesPct,
      icon: <Compass size={20} color={Colors.white} strokeWidth={2.2} />,
      gradient: [Colors.primaryContainer, Colors.primary],
      onPress: () => router.push("/(tabs)/revise"),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 8,
          paddingBottom: 140,
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.hello}>Bonjour,</Text>
            <Text style={styles.name}>{firstName}</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && { opacity: 0.8 },
            ]}
            hitSlop={6}
          >
            <Bell size={18} color={Colors.onSurface} />
          </Pressable>
        </View>

        {/* Goal pill */}
        <View style={styles.goalPill}>
          <Sparkles size={12} color={Colors.primary} />
          <Text style={styles.goalPillText}>{goalLabel}</Text>
        </View>

        {/* Hero — continue session */}
        <Pressable
          onPress={go(() =>
            router.push({
              pathname: "/practice/[category]",
              params: { category: user?.goal ?? "NAT" },
            })
          )}
          style={styles.hero}
        >
          {/* Decorative corner blob */}
          <LinearGradient
            colors={["rgba(0,85,164,0.14)", "rgba(0,85,164,0)"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.heroBlob}
            pointerEvents="none"
          />

          <View style={styles.heroTopRow}>
            <View style={styles.heroChip}>
              <Sparkles size={11} color={Colors.primary} />
              <Text style={styles.heroChipText}>Prochaine session</Text>
            </View>
            <Text style={styles.heroCount}>
              {progress.questionsAnswered}
              <Text style={styles.heroCountMuted}>/50</Text>
            </Text>
          </View>
          <Text style={styles.heroTitle}>Continuez votre préparation</Text>
          <Text style={styles.heroDesc}>
            Reprenez là où vous vous êtes arrêté — {goalLabel}.
          </Text>

          <View style={styles.heroFooter}>
            <View style={styles.heroCta}>
              <Text style={styles.heroCtaText}>Continuer</Text>
              <ArrowRight size={14} color={Colors.white} />
            </View>
            <View style={styles.heroStats}>
              <HeroStat label="Réussite" value={`${successRate}%`} />
              <View style={styles.heroStatDivider} />
              <HeroStat
                label="Série"
                value={`${progress.currentStreak}`}
                icon={<Flame size={12} color={Colors.secondary} />}
              />
            </View>
          </View>
        </Pressable>

        {/* Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Votre parcours</Text>
          <Text style={styles.sectionMuted}>
            {Math.round(
              (trainingPct + simulationPct + flashcardsPct + themesPct) * 25
            )}
            % global
          </Text>
        </View>

        {/* 2×2 compact tile grid */}
        <View style={styles.grid}>
          {tiles.map(({ key, ...rest }) => (
            <StudyTile key={key} {...rest} width={tileWidth} />
          ))}
        </View>

        {/* NAT-only: Entretien d'assimilation banner */}
        {user?.goal === "NAT" ? (
          <Pressable
            onPress={go(() => router.push("/assimilation"))}
            style={({ pressed }) => [
              styles.assimBanner,
              pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
            ]}
          >
            <LinearGradient
              colors={[Colors.secondary, "#ff6b5f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.assimIcon}
            >
              <MessageCircle size={20} color={Colors.white} strokeWidth={2.2} />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.assimTitle}>Entretien d'assimilation</Text>
              <Text style={styles.assimSub} numberOfLines={2}>
                {user.civicTestPassed
                  ? "Étape suivante après le test civique — questions vrai/faux."
                  : "Après le test civique, préparez l'entretien en préfecture."}
              </Text>
            </View>
            <ChevronRight size={18} color={Colors.textTertiary} />
          </Pressable>
        ) : null}

        {/* Derniers thèmes */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionLabel}>Derniers thèmes</Text>
          <Pressable onPress={go(() => router.push("/(tabs)/progress"))}>
            <Text style={styles.sectionLink}>Tout voir</Text>
          </Pressable>
        </View>
        <View style={styles.themesCard}>
          {sortedThemes.map((t, i) => (
            <React.Fragment key={t.id}>
              {i > 0 ? <View style={styles.themeDivider} /> : null}
              <Pressable
                onPress={go(() =>
                  router.push({ pathname: "/theme/[id]", params: { id: t.id } })
                )}
                style={styles.themeRow}
              >
                <View style={styles.themeDot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.themeRowTitle}>{t.name}</Text>
                  <ProgressBar
                    value={t.percent / 100}
                    height={4}
                    trackColor="rgba(25,28,30,0.06)"
                    fillColors={[Colors.primary, Colors.primary]}
                    style={{ marginTop: 8 }}
                  />
                </View>
                <Text style={styles.themePercent}>
                  {Math.round(t.percent)}%
                </Text>
              </Pressable>
            </React.Fragment>
          ))}
        </View>

        {/* Tools */}
        <Text style={[styles.sectionLabel, { marginTop: 24, marginBottom: 12 }]}>
          Outils
        </Text>
        <View style={styles.toolsGrid}>
          <ToolChip
            icon={<BookOpenCheck size={18} color={Colors.primary} />}
            label="Guide"
            onPress={go(() => router.push("/guide"))}
          />
          <ToolChip
            icon={<ShieldQuestion size={18} color={Colors.primary} />}
            label="Éligibilité"
            onPress={go(() => router.push("/eligibility"))}
          />
          <ToolChip
            icon={<MapPin size={18} color={Colors.primary} />}
            label="Centres"
            onPress={go(() => router.push("/exam-centers"))}
          />
          <ToolChip
            icon={<Newspaper size={18} color={Colors.primary} />}
            label="Actualités"
            onPress={go(() => router.push("/news"))}
          />
          <ToolChip
            icon={<MessagesSquare size={18} color={Colors.primary} />}
            label="Forum"
            onPress={go(() => router.push("/forum"))}
          />
          <ToolChip
            icon={<Target size={18} color={Colors.primary} />}
            label="Coaching"
            onPress={go(() => router.push("/coaching"))}
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* ---------- helpers ---------- */

function HeroStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <View style={styles.heroStat}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={styles.heroStatValue}>{value}</Text>
        {icon}
      </View>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

function StudyTile({
  title,
  subtitle,
  value,
  icon,
  gradient,
  onPress,
  width,
}: Omit<TileDef, "key"> & { width: number }) {
  const pct = Math.round(value * 100);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { width },
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.96 },
      ]}
    >
      <View style={styles.tileTopRow}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.tileIcon, { shadowColor: gradient[0] }]}
        >
          {icon}
        </LinearGradient>
        <ChevronRight size={16} color={Colors.textTertiary} />
      </View>

      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileSubtitle} numberOfLines={1}>
        {subtitle}
      </Text>

      <View style={styles.tileBottom}>
        <View style={{ flex: 1 }}>
          <ProgressBar
            value={value}
            height={5}
            trackColor="rgba(25,28,30,0.06)"
            fillColors={gradient}
          />
        </View>
        <Text style={[styles.tilePercent, { color: gradient[0] }]}>
          {pct}%
        </Text>
      </View>
    </Pressable>
  );
}

function ToolChip({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.toolChip,
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.toolChipIcon}>{icon}</View>
      <Text style={styles.toolChipLabel} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

/* ---------- styles ---------- */

const cardShadow = {
  shadowColor: "#0A0F1E",
  shadowOpacity: 0.1,
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
} as const;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  avatarText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.white,
  },
  hello: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
  },
  name: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 20,
    lineHeight: 24,
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    shadowColor: "#0A0F1E",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  goalPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,85,164,0.10)",
    marginBottom: 18,
  },
  goalPillText: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 0.3,
  },

  hero: {
    borderRadius: 24,
    backgroundColor: Colors.white,
    padding: 18,
    marginBottom: 24,
    overflow: "hidden",
    ...cardShadow,
  },
  heroBlob: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 999,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heroChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(0,85,164,0.10)",
  },
  heroChipText: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 10.5,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  heroCount: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 15,
    color: Colors.onSurface,
    letterSpacing: 0.2,
  },
  heroCountMuted: {
    color: Colors.textTertiary,
    fontFamily: "Satoshi_600SemiBold",
  },
  heroTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 20,
    lineHeight: 26,
    color: Colors.onSurface,
    letterSpacing: -0.4,
  },
  heroDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 16,
    paddingRight: 14,
    height: 40,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  heroCtaText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  heroStatDivider: {
    width: StyleSheet.hairlineWidth,
    height: 24,
    backgroundColor: "rgba(25,28,30,0.12)",
  },
  heroStat: { alignItems: "center" },
  heroStatValue: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
  },
  heroStatLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10.5,
    color: Colors.textSecondary,
    marginTop: 1,
  },

  sectionLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionMuted: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11,
    color: Colors.textTertiary,
    letterSpacing: 0.2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionLink: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12,
    color: Colors.primary,
    letterSpacing: 0.2,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  tile: {
    padding: 14,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  tileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tileIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  tileTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 15,
    color: Colors.onSurface,
    letterSpacing: -0.2,
  },
  tileSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  tileBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  tilePercent: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    minWidth: 30,
    textAlign: "right",
  },

  themesCard: {
    borderRadius: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    ...cardShadow,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  themeDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },
  themeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  themeRowTitle: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 14,
    color: Colors.onSurface,
  },
  themePercent: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.primary,
    minWidth: 40,
    textAlign: "right",
  },

  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolChip: {
    flexBasis: "31%",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: "#0A0F1E",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  toolChipIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,85,164,0.10)",
  },
  toolChipLabel: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 0.1,
  },

  assimBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginTop: 14,
    ...cardShadow,
  },
  assimIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.secondary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  assimTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  assimSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
