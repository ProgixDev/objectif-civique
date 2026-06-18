import React, { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  Award,
  ChevronLeft,
  Clock,
  EyeOff,
  ListChecks,
  Lock,
  Pause,
  Play,
  Sparkles,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { useSessionStore } from "@/store/sessionStore";
import { useUserStore } from "@/store/userStore";
import { isPaid } from "@/lib/entitlements";
import { useHaptics } from "@/hooks/useHaptics";
import {
  buildSimulations,
  FREE_SIM_KEYS,
  SimConfig,
} from "@/lib/simulations";
import { SIMULATION_PACKS, SimulationPack } from "@/data/extraContent";

const TONE: Record<
  SimConfig["tone"],
  { bg: string; fg: string; shadow: string }
> = {
  navy: { bg: Colors.primary, fg: Colors.white, shadow: Colors.primary },
  red: { bg: Colors.secondary, fg: Colors.white, shadow: Colors.secondary },
  deep: { bg: "#0A0F1E", fg: Colors.white, shadow: "#0A0F1E" },
  violet: { bg: "#7a4ae0", fg: Colors.white, shadow: "#7a4ae0" },
};

type Props = {
  /** Affiche un bouton retour dans la top bar (false depuis un onglet) */
  showBackButton?: boolean;
};

export function SimulationsCatalog({ showBackButton = false }: Props) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const startSimulation = useSessionStore((s) => s.startSimulation);
  const userGoal = useUserStore((s) => s.user?.goal) ?? null;
  const user = useUserStore((s) => s.user);
  const isLockedForUser = !isPaid(user);

  const simulations = useMemo(
    () => buildSimulations(userGoal),
    [userGoal]
  );

  const onStart = (cfg: SimConfig) => {
    haptics.medium();
    const isLocked = isLockedForUser && !FREE_SIM_KEYS.has(cfg.key);
    if (isLocked) {
      router.push("/subscription");
      return;
    }
    startSimulation({
      category: cfg.category,
      themes: cfg.themes,
      label: cfg.title,
      simKey: cfg.key,
    });
    router.push("/simulation/run");
  };

  /** Lance un pack pré-construit avec ses questions explicites. */
  const onStartPack = (pack: SimulationPack) => {
    haptics.medium();
    const packKey = `pack-${pack.slug}`;
    const isLocked = isLockedForUser && !FREE_SIM_KEYS.has(packKey);
    if (isLocked) {
      router.push("/subscription");
      return;
    }
    startSimulation({
      label: pack.title,
      simKey: packKey,
      questions: pack.questions,
    });
    router.push("/simulation/run");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          {showBackButton ? (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && { opacity: 0.8 },
              ]}
              accessibilityLabel="Retour"
              hitSlop={6}
            >
              <ChevronLeft size={22} color={Colors.onSurface} />
            </Pressable>
          ) : (
            <View style={{ width: 40 }} />
          )}
          <Text style={styles.topTitle}>Simulations</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Sparkles size={22} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>
            Simulation en conditions réelles
          </Text>
          <Text style={styles.heroTagline}>
            Comme le jour J : 40 questions officielles, 45 minutes chronométrées,
            correction uniquement à la fin.
          </Text>

          <View style={styles.rulesGrid}>
            <Rule icon={<Clock size={15} color={Colors.white} />} text="45 min" />
            <Rule
              icon={<ListChecks size={15} color={Colors.white} />}
              text="40 questions"
            />
            <Rule
              icon={<Award size={15} color={Colors.white} />}
              text="80 % requis"
            />
            <Rule
              icon={<EyeOff size={15} color={Colors.white} />}
              text="Correction à la fin"
            />
            <Rule icon={<Pause size={15} color={Colors.white} />} text="Pas de pause" />
          </View>
        </View>

        {/* Packs pré-construits — Examens blancs officiels */}
        {SIMULATION_PACKS.length > 0 ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>Examens blancs officiels</Text>
              <Text style={styles.sectionSub}>
                {SIMULATION_PACKS.length} packs sélectionnés — questions
                soigneusement choisies
              </Text>
            </View>

            <View style={styles.simList}>
              {SIMULATION_PACKS.map((pack) => {
                const packKey = `pack-${pack.slug}`;
                const locked =
                  isLockedForUser && !FREE_SIM_KEYS.has(packKey);
                const tone = TONE.deep;
                return (
                  <Pressable
                    key={pack.id}
                    onPress={() => onStartPack(pack)}
                    style={({ pressed }) => [
                      styles.simCard,
                      locked && styles.simCardLocked,
                      pressed && {
                        transform: [{ scale: 0.99 }],
                        opacity: 0.96,
                      },
                    ]}
                    accessibilityLabel={
                      locked
                        ? `${pack.title} — verrouillée, débloquer avec un abonnement`
                        : pack.title
                    }
                  >
                    <View
                      style={[
                        styles.simNumber,
                        {
                          backgroundColor: locked
                            ? Colors.outlineVariant
                            : tone.bg,
                          shadowColor: locked ? "transparent" : tone.shadow,
                        },
                      ]}
                    >
                      {locked ? (
                        <Lock size={20} color={Colors.white} />
                      ) : (
                        <Award size={20} color={Colors.white} />
                      )}
                    </View>

                    <View style={{ flex: 1 }}>
                      <View style={styles.simTopRow}>
                        <Text
                          style={[
                            styles.simTitle,
                            locked && styles.simTitleLocked,
                          ]}
                          numberOfLines={1}
                        >
                          {pack.title}
                        </Text>
                        {locked ? (
                          <View style={styles.lockedTag}>
                            <Lock size={9} color={Colors.white} />
                            <Text style={styles.lockedTagText}>PREMIUM</Text>
                          </View>
                        ) : (
                          <View
                            style={[
                              styles.simTag,
                              { backgroundColor: `${tone.bg}1A` },
                            ]}
                          >
                            <Text
                              style={[styles.simTagText, { color: tone.bg }]}
                            >
                              PACK
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.simSub} numberOfLines={2}>
                        {locked
                          ? "Débloquez avec un abonnement pour accéder à ce pack."
                          : `${pack.questions.length} questions — pack officiel curé`}
                      </Text>
                      <View style={styles.simMeta}>
                        <Clock size={11} color={Colors.textTertiary} />
                        <Text style={styles.simMetaText}>45 min</Text>
                        <Text style={styles.simMetaDot}>·</Text>
                        <ListChecks size={11} color={Colors.textTertiary} />
                        <Text style={styles.simMetaText}>
                          {pack.questions.length} questions
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.playBtn,
                        {
                          backgroundColor: locked
                            ? Colors.outlineVariant
                            : tone.bg,
                        },
                      ]}
                    >
                      {locked ? (
                        <Lock size={14} color={Colors.white} />
                      ) : (
                        <Play
                          size={14}
                          color={Colors.white}
                          fill={Colors.white}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : null}

        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionLabel}>
            {simulations.length} simulations dynamiques
          </Text>
          <Text style={styles.sectionSub}>
            Tirage aléatoire — adapté à votre cas + séries par thème
          </Text>
        </View>

        <View style={styles.simList}>
          {simulations.map((cfg) => {
            const tone = TONE[cfg.tone];
            const locked = isLockedForUser && !FREE_SIM_KEYS.has(cfg.key);
            return (
              <Pressable
                key={cfg.key}
                onPress={() => onStart(cfg)}
                style={({ pressed }) => [
                  styles.simCard,
                  cfg.recommended && styles.simCardRecommended,
                  locked && styles.simCardLocked,
                  pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
                ]}
                accessibilityLabel={
                  locked
                    ? `${cfg.title} — verrouillée, débloquer avec un abonnement`
                    : cfg.title
                }
              >
                <View
                  style={[
                    styles.simNumber,
                    {
                      backgroundColor: locked ? Colors.outlineVariant : tone.bg,
                      shadowColor: locked ? "transparent" : tone.shadow,
                    },
                  ]}
                >
                  {locked ? (
                    <Lock size={20} color={Colors.white} />
                  ) : (
                    <Text style={[styles.simNumberText, { color: tone.fg }]}>
                      {String(cfg.number).padStart(2, "0")}
                    </Text>
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.simTopRow}>
                    <Text
                      style={[styles.simTitle, locked && styles.simTitleLocked]}
                      numberOfLines={1}
                    >
                      {cfg.title}
                    </Text>
                    {cfg.recommended ? (
                      <View style={styles.recoTag}>
                        <Sparkles size={9} color={Colors.white} />
                        <Text style={styles.recoTagText}>POUR VOUS</Text>
                      </View>
                    ) : locked ? (
                      <View style={styles.lockedTag}>
                        <Lock size={9} color={Colors.white} />
                        <Text style={styles.lockedTagText}>PREMIUM</Text>
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.simTag,
                          { backgroundColor: `${tone.bg}1A` },
                        ]}
                      >
                        <Text style={[styles.simTagText, { color: tone.bg }]}>
                          {cfg.tag}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.simSub} numberOfLines={2}>
                    {locked
                      ? "Débloquez avec un abonnement pour accéder à cette simulation."
                      : cfg.subtitle}
                  </Text>
                  <View style={styles.simMeta}>
                    <Clock size={11} color={Colors.textTertiary} />
                    <Text style={styles.simMetaText}>45 min</Text>
                    <Text style={styles.simMetaDot}>·</Text>
                    <ListChecks size={11} color={Colors.textTertiary} />
                    <Text style={styles.simMetaText}>40 questions</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.playBtn,
                    {
                      backgroundColor: locked
                        ? Colors.outlineVariant
                        : tone.bg,
                    },
                  ]}
                >
                  {locked ? (
                    <Lock size={14} color={Colors.white} />
                  ) : (
                    <Play size={14} color={Colors.white} fill={Colors.white} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function Rule({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={styles.rule}>
      {icon}
      <Text style={styles.ruleText}>{text}</Text>
    </View>
  );
}

const cardShadow = {
  shadowColor: "#0A0F1E",
  shadowOpacity: 0.09,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
} as const;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    ...cardShadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  topTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
    letterSpacing: -0.2,
  },
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
  },
  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 20,
    lineHeight: 26,
    color: Colors.white,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  heroTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.88)",
    marginBottom: 14,
  },
  rulesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  ruleText: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11.5,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  sectionHeader: { marginBottom: 12 },
  sectionLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  simList: { gap: 10 },
  simCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  simCardRecommended: {
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.18,
  },
  recoTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  recoTagText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 9,
    color: Colors.white,
    letterSpacing: 0.6,
  },
  simCardLocked: {
    opacity: 0.85,
  },
  simTitleLocked: {
    color: Colors.textSecondary,
  },
  lockedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#0A0F1E",
  },
  lockedTagText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 9,
    color: Colors.white,
    letterSpacing: 0.6,
  },
  simNumber: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  simNumberText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 16,
    letterSpacing: -0.2,
  },
  simTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  simTitle: {
    flexShrink: 1,
    fontFamily: "Satoshi_700Bold",
    fontSize: 14.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  simTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  simTagText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 9.5,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  simSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  simMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  simMetaText: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 10.5,
    color: Colors.textTertiary,
    letterSpacing: 0.2,
  },
  simMetaDot: {
    color: Colors.textTertiary,
    marginHorizontal: 3,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
