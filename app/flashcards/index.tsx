import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ChevronLeft, Layers, ArrowRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { GOAL_LABELS } from "@/data/questions";
import { THEMES } from "@/data/themes";
import { Category } from "@/types";

const CATEGORIES: { key: Category; desc: string }[] = [
  { key: "NAT", desc: "Questions d'assimilation pour la naturalisation" },
  { key: "CSP", desc: "Questions pour la carte de séjour pluriannuelle" },
  { key: "CR", desc: "Questions pour la carte de résident de 10 ans" },
];

export default function FlashcardsHome() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Retour"
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
          Flashcards
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 40,
        }}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Layers size={22} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>Révisez en mode cartes</Text>
          <Text style={styles.heroSub}>
            Parcourez rapidement les questions, retournez la carte pour voir la
            réponse et l'explication.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Par catégorie</Text>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.key}
            onPress={() =>
              router.push({
                pathname: "/flashcards/[slug]",
                params: { slug: c.key },
              })
            }
            style={styles.row}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{GOAL_LABELS[c.key]}</Text>
              <Text style={styles.rowSub}>{c.desc}</Text>
            </View>
            <ArrowRight size={16} color={Colors.textTertiary} />
          </Pressable>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Par thème</Text>
        {THEMES.map((t) => (
          <Pressable
            key={t.id}
            onPress={() =>
              router.push({
                pathname: "/flashcards/[slug]",
                params: { slug: `theme-${t.id}` },
              })
            }
            style={styles.row}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{t.name}</Text>
            </View>
            <ArrowRight size={16} color={Colors.textTertiary} />
          </Pressable>
        ))}
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
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 20,
    marginBottom: 20,
  },
  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.white,
    marginBottom: 4,
  },
  heroSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "rgba(255,255,255,0.85)",
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    marginBottom: 8,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.35)",
  },
  rowTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.onSurface,
  },
  rowSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
