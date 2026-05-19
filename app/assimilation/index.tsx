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
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Landmark,
  Mic,
  MessageCircle,
  Scroll,
  Sparkles,
  User,
  Users,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { useHaptics } from "@/hooks/useHaptics";
import {
  ASSIMILATION_QUESTIONS,
  ASSIMILATION_TOPIC_LABELS,
  ASSIMILATION_TOPICS_ORDER,
  getAssimilationByTopic,
} from "@/data/questions.assimilation";
import { AssimilationTopic } from "@/types";

const TOPIC_ICONS: Record<
  AssimilationTopic,
  React.ComponentType<{ size?: number; color?: string }>
> = {
  motivation: MessageCircle,
  valeurs: Heart,
  histoire: Scroll,
  institutions: Landmark,
  "vie-quotidienne": Users,
  personnel: User,
};

const TOPIC_DESCRIPTIONS: Record<AssimilationTopic, string> = {
  motivation: "Pourquoi devenir français ? Vos motivations et votre parcours.",
  valeurs: "Liberté, égalité, fraternité, laïcité — l'adhésion aux principes.",
  histoire: "Dates clés, figures historiques, événements marquants.",
  institutions: "Président, Parlement, élections, organisation de l'État.",
  "vie-quotidienne":
    "École, travail, santé, démarches administratives en France.",
  personnel: "Vie de famille, profession, parcours — questions personnelles.",
};

const TOPIC_TONES: Record<AssimilationTopic, [string, string]> = {
  motivation: [Colors.secondary, "#ff6b5f"],
  valeurs: ["#7a4ae0", "#9a72f0"],
  histoire: [Colors.primary, Colors.primaryContainer],
  institutions: [Colors.primaryContainer, Colors.primary],
  "vie-quotidienne": [Colors.primary, Colors.secondary],
  personnel: ["#0A0F1E", Colors.primary],
};

export default function AssimilationIndex() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();

  const total = ASSIMILATION_QUESTIONS.length;

  const onPickTopic = (topic: AssimilationTopic) => {
    haptics.light();
    router.push({
      pathname: "/assimilation/run",
      params: { topic },
    });
  };

  const onPickAll = () => {
    haptics.medium();
    router.push("/assimilation/run");
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
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtn}
            accessibilityLabel="Retour"
            hitSlop={6}
          >
            <ChevronLeft size={22} color={Colors.onSurface} />
          </Pressable>
          <Text style={styles.topTitle}>Entretien d'assimilation</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Sparkles size={22} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>
            Préparez l'entretien en préfecture
          </Text>
          <Text style={styles.heroTagline}>
            Questions vrai/faux et choix multiples avec explications. Étape
            indispensable après le dépôt du dossier de naturalisation.
          </Text>

          <View style={styles.statsRow}>
            <Stat icon={<BookOpen size={14} color={Colors.white} />} value={`${total}`} label="questions" />
            <View style={styles.statDivider} />
            <Stat icon={<Award size={14} color={Colors.white} />} value="B2" label="niveau oral" />
          </View>
        </View>

        {/* Teaser : entretien oral IA — fonctionnalité à venir */}
        <View style={styles.comingSoonCard}>
          <View style={styles.comingSoonIcon}>
            <Mic size={18} color={Colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.comingSoonRow}>
              <Text style={styles.comingSoonTitle}>
                Entretien oral avec IA
              </Text>
              <View style={styles.comingSoonBadge}>
                <Clock size={10} color={Colors.primary} />
                <Text style={styles.comingSoonBadgeText}>BIENTÔT</Text>
              </View>
            </View>
            <Text style={styles.comingSoonSub}>
              Simulation d'entretien à l'oral avec une IA : questions, évaluation
              de vos réponses et rapport personnalisé.
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onPickAll}
          style={({ pressed }) => [
            styles.fullCard,
            pressed && { opacity: 0.96, transform: [{ scale: 0.99 }] },
          ]}
        >
          <View style={[styles.fullIcon, { backgroundColor: Colors.primary }]}>
            <Sparkles size={18} color={Colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.fullTitle}>Session complète</Text>
            <Text style={styles.fullSub}>
              Toutes les thématiques mélangées — recommandé après quelques
              révisions par thème.
            </Text>
          </View>
          <ChevronRight size={18} color={Colors.textTertiary} />
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Par thème</Text>
          <Text style={styles.sectionSub}>
            Choisissez un sujet pour cibler votre révision
          </Text>
        </View>

        <View style={styles.list}>
          {ASSIMILATION_TOPICS_ORDER.map((topic) => {
            const Icon = TOPIC_ICONS[topic];
            const [from] = TOPIC_TONES[topic];
            const count = getAssimilationByTopic(topic).length;

            return (
              <Pressable
                key={topic}
                onPress={() => onPickTopic(topic)}
                style={({ pressed }) => [
                  styles.card,
                  pressed && { opacity: 0.96, transform: [{ scale: 0.99 }] },
                ]}
              >
                <View
                  style={[
                    styles.cardIcon,
                    { backgroundColor: from, shadowColor: from },
                  ]}
                >
                  <Icon size={18} color={Colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    {ASSIMILATION_TOPIC_LABELS[topic]}
                  </Text>
                  <Text style={styles.cardSub} numberOfLines={2}>
                    {TOPIC_DESCRIPTIONS[topic]}
                  </Text>
                  <Text style={[styles.cardCount, { color: from }]}>
                    {count} question{count > 1 ? "s" : ""}
                  </Text>
                </View>
                <ChevronRight size={16} color={Colors.textTertiary} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {icon}
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
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
    fontSize: 17,
    color: Colors.onSurface,
    letterSpacing: -0.2,
  },
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
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
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stat: { gap: 2 },
  statValue: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.75)",
  },
  statDivider: {
    width: 1,
    height: 22,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  comingSoonCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: "rgba(0,85,164,0.06)",
    borderWidth: 1.5,
    borderColor: "rgba(0,85,164,0.18)",
    borderStyle: "dashed",
    marginBottom: 14,
  },
  comingSoonIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  comingSoonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  comingSoonTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  comingSoonBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "rgba(0,85,164,0.25)",
  },
  comingSoonBadgeText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 9.5,
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  comingSoonSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  fullCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginBottom: 18,
    ...cardShadow,
  },
  fullIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: Colors.primary,
    elevation: 4,
  },
  fullTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  fullSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginTop: 2,
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

  list: { gap: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  cardIcon: {
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
  cardTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  cardSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cardCount: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginTop: 6,
  },
});
