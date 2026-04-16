import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowRight,
  Bell,
  Flame,
  Sparkles,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { Shadows } from "@/constants/shadows";
import { Assets } from "@/constants/assets";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useUserStore } from "@/store/userStore";
import { useProgressStore, getSuccessRate } from "@/store/progressStore";
import { GOAL_LABELS } from "@/data/questions";
import { THEMES } from "@/data/themes";
import { useHaptics } from "@/hooks/useHaptics";

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const user = useUserStore((s) => s.user);
  const progress = useProgressStore();
  const haptics = useHaptics();
  const commencerCardWidth = screenWidth - 64;

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

  const showCoachTeaser =
    user?.subscriptionPlan !== "lifetime" ||
    (progress.bestSessionScore > 0 && progress.bestSessionScore < 70);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: insets.top + 12,
        paddingBottom: 110,
      }}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.hello}>Bonjour,</Text>
          <Text style={styles.name}>{firstName}</Text>
        </View>
        <Pressable style={styles.iconBtn} hitSlop={6}>
          <Bell size={18} color={Colors.primary} />
        </Pressable>
      </View>

      <View style={styles.goalPill}>
        <Sparkles size={12} color={Colors.tertiaryOnSoft} />
        <Text style={styles.goalPillText}>{goalLabel}</Text>
      </View>

      <Pressable
        onPress={() => {
          haptics.light();
          router.push({
            pathname: "/practice/[category]",
            params: { category: user?.goal ?? "NAT" },
          });
        }}
        style={[styles.hero, Shadows.card]}
      >
        <View style={styles.heroTopRow}>
          <View style={styles.heroChip}>
            <Sparkles size={12} color={Colors.primary} />
            <Text style={styles.heroChipText}>Prochaine session</Text>
          </View>
          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>
              {progress.questionsAnswered}/50
            </Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>Continuez votre préparation</Text>
        <Text style={styles.heroDesc}>
          Reprenez là où vous vous êtes arrêté — {goalLabel}.
        </Text>
        <View style={styles.heroCtaRow}>
          <PillButton
            label="Continuer"
            variant="primary"
            size="sm"
            onPress={() =>
              router.push({
                pathname: "/practice/[category]",
                params: { category: user?.goal ?? "NAT" },
              })
            }
          />
          <View style={styles.heroStats}>
            <MiniMetric label="Réussite" value={`${successRate}%`} />
            <MiniMetric
              label="Série"
              value={progress.currentStreak}
              icon={<Flame size={12} color={Colors.tertiaryOnSoft} />}
            />
          </View>
        </View>
      </Pressable>

      <Text style={styles.sectionTitle}>Commencer</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={commencerCardWidth + 12}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ gap: 12, paddingRight: 16 }}
        style={{ marginHorizontal: -16, paddingHorizontal: 16 }}
      >
        <BigActionCard
          width={commencerCardWidth}
          bg={Colors.primary}
          fg={Colors.white}
          subFg="rgba(255,255,255,0.75)"
          title="Entraînement"
          subtitle="Question par question à votre rythme"
          image={Assets.achievements.firstStep}
          onPress={() =>
            router.push({
              pathname: "/practice/[category]",
              params: { category: user?.goal ?? "NAT" },
            })
          }
        />
        <BigActionCard
          width={commencerCardWidth}
          bg={Colors.tertiary}
          fg={Colors.primary}
          subFg="rgba(0,18,69,0.72)"
          title="Simulation"
          subtitle="40 questions officielles · 45 min"
          image={Assets.simulation.intro}
          onPress={() => router.push("/simulation/intro")}
        />
        <BigActionCard
          width={commencerCardWidth}
          bg={Colors.secondary}
          fg={Colors.white}
          subFg="rgba(255,255,255,0.8)"
          title="Par thème"
          subtitle="Révision ciblée par catégorie"
          image={Assets.themes.institutions}
          onPress={() => router.push("/(tabs)/revise")}
        />
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Derniers thèmes</Text>
        <Pressable onPress={() => router.push("/(tabs)/progress")}>
          <Text style={styles.sectionLink}>Tout voir</Text>
        </Pressable>
      </View>
      <View style={{ gap: 8 }}>
        {sortedThemes.map((t) => (
          <Pressable
            key={t.id}
            onPress={() =>
              router.push({ pathname: "/theme/[id]", params: { id: t.id } })
            }
            style={styles.themeRow}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.themeRowTitle}>{t.name}</Text>
              <ProgressBar
                value={t.percent / 100}
                height={4}
                style={{ marginTop: 6 }}
              />
            </View>
            <Text style={styles.themePercent}>{Math.round(t.percent)}%</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => {
          haptics.medium();
          router.push("/simulation/intro");
        }}
        style={[styles.goldCta, Shadows.card]}
      >
        <LinearGradient
          colors={[Colors.tertiary, "#ffd24d"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.goldTitle}>Simulation examen blanc</Text>
          <Text style={styles.goldDesc}>40 questions officielles · Minuté</Text>
        </View>
        <View style={styles.goldCircle}>
          <ArrowRight size={18} color={Colors.primary} />
        </View>
      </Pressable>

      {showCoachTeaser ? (
        <GlassCard style={{ marginTop: 16 }} padding={12}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Image source={Assets.coaching.teaser} style={styles.coachImg} />
            <View style={{ flex: 1 }}>
              <Text style={styles.coachTitle}>Besoin d'un coup de pouce ?</Text>
              <Text style={styles.coachSub}>
                Discutez avec un coach certifié.
              </Text>
            </View>
            <PillButton
              label="Voir"
              variant="secondary"
              size="sm"
              onPress={() => router.push("/coaching")}
            />
          </View>
        </GlassCard>
      ) : null}
    </ScrollView>
  );
}

function MiniMetric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <View style={styles.miniMetric}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Text style={styles.miniMetricValue}>{value}</Text>
        {icon}
      </View>
      <Text style={styles.miniMetricLabel}>{label}</Text>
    </View>
  );
}

function BigActionCard({
  width,
  bg,
  fg,
  subFg,
  title,
  subtitle,
  image,
  onPress,
}: {
  width: number;
  bg: string;
  fg: string;
  subFg: string;
  title: string;
  subtitle: string;
  image: any;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.bigCard, { backgroundColor: bg, width }, Shadows.card]}
    >
      <View style={[styles.decorDot, styles.decorDotA, { backgroundColor: fg }]} />
      <View style={[styles.decorDot, styles.decorDotB, { backgroundColor: fg }]} />
      <View style={[styles.decorDot, styles.decorDotC, { backgroundColor: fg }]} />
      <View style={[styles.decorRing, { borderColor: fg }]} />

      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={[styles.bigCardTitle, { color: fg }]}>{title}</Text>
        <Text style={[styles.bigCardSub, { color: subFg }]} numberOfLines={2}>
          {subtitle}
        </Text>
        <View style={[styles.bigCardCta, { backgroundColor: fg }]}>
          <Text
            style={[
              styles.bigCardCtaText,
              { color: bg },
            ]}
          >
            Démarrer
          </Text>
          <ArrowRight size={14} color={bg} />
        </View>
      </View>

      <Image source={image} style={styles.bigCardImage} resizeMode="contain" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.white,
  },
  hello: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  name: {
    fontFamily: "Inter_700Bold",
    fontSize: 19,
    lineHeight: 24,
    color: Colors.onSurface,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.35)",
  },
  goalPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: Colors.tertiarySoft,
    marginBottom: 16,
  },
  goalPillText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.tertiaryOnSoft,
    letterSpacing: 0.3,
  },
  hero: {
    borderRadius: Radius.xl,
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 16,
    marginBottom: 20,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heroChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: Colors.primaryFixed,
  },
  heroChipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  progressBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: Colors.surfaceContainerLow,
  },
  progressBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: Colors.primary,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 22,
    color: Colors.onSurface,
  },
  heroDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 14,
  },
  heroCtaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroStats: {
    flexDirection: "row",
    gap: 14,
  },
  miniMetric: { alignItems: "center" },
  miniMetricValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  miniMetricLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  sectionLink: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.primary,
  },
  bigCard: {
    borderRadius: Radius.xl,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 110,
    overflow: "hidden",
    position: "relative",
  },
  bigCardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 22,
  },
  bigCardSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
    marginBottom: 10,
  },
  bigCardCta: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  bigCardCtaText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
  },
  bigCardImage: {
    width: 88,
    height: 88,
  },
  decorDot: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.18,
  },
  decorDotA: { width: 8, height: 8, top: 14, right: 96 },
  decorDotB: { width: 14, height: 14, bottom: 12, right: 110 },
  decorDotC: { width: 6, height: 6, top: 46, right: 132 },
  decorRing: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 999,
    borderWidth: 1.5,
    opacity: 0.18,
    right: -18,
    top: -18,
  },
  themeRow: {
    padding: 12,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeRowTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.onSurface,
  },
  themePercent: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.primary,
  },
  goldCta: {
    marginTop: 20,
    padding: 16,
    borderRadius: Radius.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.tertiary,
    overflow: "hidden",
  },
  goldTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: Colors.primary,
  },
  goldDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(0,18,69,0.7)",
    marginTop: 2,
  },
  goldCircle: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  coachImg: {
    width: 44,
    height: 44,
    borderRadius: 999,
  },
  coachTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  coachSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
});
