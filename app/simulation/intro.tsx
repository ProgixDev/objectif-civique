import React from "react";
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
  ChevronRight,
  Clock,
  EyeOff,
  ListChecks,
  Pause,
  Play,
  Sparkles,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { useSessionStore } from "@/store/sessionStore";
import { useHaptics } from "@/hooks/useHaptics";
import { Category, ThemeId } from "@/types";

type SimConfig = {
  key: string;
  number: number;
  title: string;
  subtitle: string;
  category?: Category;
  themes?: ThemeId[];
  tag: string;
  tone: "navy" | "red" | "deep" | "violet";
};

const SIMULATIONS: SimConfig[] = [
  {
    key: "mix",
    number: 1,
    title: "Mix général",
    subtitle: "Toutes catégories, tous thèmes",
    tag: "Recommandé",
    tone: "navy",
  },
  {
    key: "nat",
    number: 2,
    title: "Naturalisation",
    subtitle: "Questions orientées NAT — niveau approfondi",
    category: "NAT",
    tag: "NAT",
    tone: "red",
  },
  {
    key: "cr",
    number: 3,
    title: "Carte de Résident",
    subtitle: "Questions orientées CR — niveau intermédiaire",
    category: "CR",
    tag: "CR",
    tone: "deep",
  },
  {
    key: "csp",
    number: 4,
    title: "Carte de Séjour Pluriannuelle",
    subtitle: "Questions orientées CSP — niveau fondamental",
    category: "CSP",
    tag: "CSP",
    tone: "navy",
  },
  {
    key: "institutions",
    number: 5,
    title: "Institutions & pouvoirs",
    subtitle: "Président, Parlement, Constitution",
    themes: ["institutions"],
    tag: "Institutions",
    tone: "navy",
  },
  {
    key: "histoire",
    number: 6,
    title: "Histoire de France",
    subtitle: "Révolution, République, grandes dates",
    themes: ["histoire"],
    tag: "Histoire",
    tone: "red",
  },
  {
    key: "valeurs",
    number: 7,
    title: "Valeurs & laïcité",
    subtitle: "Liberté, Égalité, Fraternité, laïcité",
    themes: ["valeurs"],
    tag: "Valeurs",
    tone: "violet",
  },
  {
    key: "vivre",
    number: 8,
    title: "Vivre en France",
    subtitle: "Sécu, APL, impôts, droits du quotidien",
    themes: ["culture"],
    tag: "Société",
    tone: "deep",
  },
  {
    key: "geo-culture",
    number: 9,
    title: "Géographie & culture",
    subtitle: "Régions, monuments, artistes",
    themes: ["geographie", "culture"],
    tag: "Culture",
    tone: "navy",
  },
  {
    key: "final",
    number: 10,
    title: "Test final",
    subtitle: "Mix complet, niveau expert",
    tag: "Expert",
    tone: "red",
  },
];

const TONE: Record<
  SimConfig["tone"],
  { bg: string; fg: string; shadow: string }
> = {
  navy: { bg: Colors.primary, fg: Colors.white, shadow: Colors.primary },
  red: { bg: Colors.secondary, fg: Colors.white, shadow: Colors.secondary },
  deep: { bg: "#0A0F1E", fg: Colors.white, shadow: "#0A0F1E" },
  violet: { bg: "#7a4ae0", fg: Colors.white, shadow: "#7a4ae0" },
};

export default function SimulationIntro() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const startSimulation = useSessionStore((s) => s.startSimulation);

  const onStart = (cfg: SimConfig) => {
    haptics.medium();
    startSimulation({
      category: cfg.category,
      themes: cfg.themes,
      label: cfg.title,
    });
    router.replace("/simulation/run");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
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
          <Text style={styles.topTitle}>Simulations</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
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

        {/* Section label */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>10 simulations disponibles</Text>
          <Text style={styles.sectionSub}>Tirées aléatoirement à chaque lancement</Text>
        </View>

        {/* Simulation list */}
        <View style={styles.simList}>
          {SIMULATIONS.map((cfg) => {
            const tone = TONE[cfg.tone];
            return (
              <Pressable
                key={cfg.key}
                onPress={() => onStart(cfg)}
                style={({ pressed }) => [
                  styles.simCard,
                  pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
                ]}
              >
                <View
                  style={[
                    styles.simNumber,
                    {
                      backgroundColor: tone.bg,
                      shadowColor: tone.shadow,
                    },
                  ]}
                >
                  <Text style={[styles.simNumberText, { color: tone.fg }]}>
                    {String(cfg.number).padStart(2, "0")}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.simTopRow}>
                    <Text style={styles.simTitle} numberOfLines={1}>
                      {cfg.title}
                    </Text>
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
                  </View>
                  <Text style={styles.simSub} numberOfLines={2}>
                    {cfg.subtitle}
                  </Text>
                  <View style={styles.simMeta}>
                    <Clock size={11} color={Colors.textTertiary} />
                    <Text style={styles.simMetaText}>45 min</Text>
                    <Text style={styles.simMetaDot}>·</Text>
                    <ListChecks size={11} color={Colors.textTertiary} />
                    <Text style={styles.simMetaText}>40 questions</Text>
                  </View>
                </View>

                <View style={[styles.playBtn, { backgroundColor: tone.bg }]}>
                  <Play size={14} color={Colors.white} fill={Colors.white} />
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

  sectionHeader: {
    marginBottom: 12,
  },
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

  simList: {
    gap: 10,
  },
  simCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...cardShadow,
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
