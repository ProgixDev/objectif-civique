import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  ChevronDown,
  ChevronLeft,
  MessageSquareQuote,
  User,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { useHaptics } from "@/hooks/useHaptics";
import {
  ENTRETIEN_100,
  ENTRETIEN_THEME_LABELS,
  ENTRETIEN_THEMES_ORDER,
  EntretienTheme,
  getEntretienByTheme,
} from "@/data/entretien100";

type Filter = EntretienTheme | "all";

export default function EntretienFiches() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();

  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const questions = useMemo(
    () => (filter === "all" ? ENTRETIEN_100 : getEntretienByTheme(filter)),
    [filter]
  );

  const onToggle = (id: string) => {
    haptics.light();
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onFilter = (next: Filter) => {
    haptics.light();
    setFilter(next);
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
          <Text style={styles.topTitle}>Les 100 questions</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <MessageSquareQuote size={22} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>
            100 questions de l'entretien de naturalisation
          </Text>
          <Text style={styles.heroTagline}>
            Les questions ouvertes que l'agent peut poser en préfecture, avec une
            réponse modèle pour chacune. Touchez une question pour révéler la
            réponse.
          </Text>
        </View>

        {/* Filtres par thème */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          style={{ marginHorizontal: -20 }}
        >
          <Chip
            label="Tous"
            active={filter === "all"}
            onPress={() => onFilter("all")}
          />
          {ENTRETIEN_THEMES_ORDER.map((t) => (
            <Chip
              key={t}
              label={ENTRETIEN_THEME_LABELS[t]}
              active={filter === t}
              onPress={() => onFilter(t)}
            />
          ))}
        </ScrollView>

        <Text style={styles.countLabel}>
          {questions.length} question{questions.length > 1 ? "s" : ""}
        </Text>

        <View style={styles.list}>
          {questions.map((q, i) => {
            const isOpen = !!open[q.id];
            return (
              <Pressable
                key={q.id}
                onPress={() => onToggle(q.id)}
                style={({ pressed }) => [
                  styles.card,
                  pressed && { opacity: 0.97 },
                ]}
              >
                <View style={styles.cardHead}>
                  <Text style={styles.num}>{String(i + 1).padStart(2, "0")}</Text>
                  <Text style={styles.question}>{q.question}</Text>
                  <ChevronDown
                    size={18}
                    color={Colors.textTertiary}
                    style={{
                      transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
                    }}
                  />
                </View>

                {isOpen && (
                  <View style={styles.answerBox}>
                    {q.personnel && (
                      <View style={styles.personnelTag}>
                        <User size={11} color={Colors.secondary} />
                        <Text style={styles.personnelTagText}>
                          Réponse personnelle — à adapter à votre situation
                        </Text>
                      </View>
                    )}
                    <Text style={styles.answer}>{q.answer}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
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
  },

  chipsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "rgba(10,15,30,0.08)",
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12.5,
    color: Colors.textSecondary,
    letterSpacing: -0.1,
  },
  chipTextActive: {
    color: Colors.white,
  },

  countLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11,
    color: Colors.textTertiary,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginTop: 14,
    marginBottom: 10,
  },

  list: { gap: 10 },
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: Colors.white,
    ...cardShadow,
    shadowOpacity: 0.07,
    shadowRadius: 14,
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  num: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.primary,
    marginTop: 1,
    minWidth: 22,
  },
  question: {
    flex: 1,
    fontFamily: "Satoshi_700Bold",
    fontSize: 14.5,
    lineHeight: 20,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  answerBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(10,15,30,0.07)",
  },
  answer: {
    fontFamily: "Inter_400Regular",
    fontSize: 13.5,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  personnelTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,107,95,0.10)",
    marginBottom: 8,
  },
  personnelTagText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 10.5,
    color: Colors.secondary,
    letterSpacing: -0.1,
  },
});
