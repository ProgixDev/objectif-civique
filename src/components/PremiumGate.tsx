import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Check, ChevronLeft, Crown, Lock, Sparkles } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { useUserStore } from "@/store/userStore";
import { Category } from "@/types";

/**
 * Écran de verrouillage premium. Affiché à la place de tout contenu payant tant
 * que l'utilisateur n'a pas d'accès actif. Seule exception dans l'app : la
 * simulation gratuite de 40 questions officielles (bouton ci-dessous).
 */
const INCLUDED = [
  "3 500+ questions officielles & mises en situation réelles",
  "Simulations d'examen chronométrées, comme le jour J",
  "Tests par thème pour cibler et corriger vos lacunes",
  "Flashcards, guides et articles rédigés par des experts",
  "Suivi de progression détaillé pour rester motivé",
];

const STATS = [
  { value: "3 500+", label: "questions" },
  { value: "100+", label: "simulations" },
  { value: "40", label: "thèmes" },
];

export function PremiumGate({ showFreeTrial = true }: { showFreeTrial?: boolean }) {
  const insets = useSafeAreaInsets();
  const user = useUserStore((s) => s.user);
  const category = (user?.goal as Category) ?? "NAT";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)"))}
          style={styles.backBtn}
          accessibilityLabel="Retour"
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View style={styles.lockCircle}>
          <Lock size={30} color={Colors.primary} strokeWidth={2.2} />
        </View>

        <Text style={[Typography.display, styles.title]}>
          Mettez toutes les chances de votre côté
        </Text>
        <Text style={[Typography.bodyLarge, styles.subtitle]}>
          Débloquez l'intégralité d'Objectif Civique et préparez votre examen
          civique et entretien de naturalisation sereinement — en un seul
          paiement, sans abonnement.
        </Text>

        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          {INCLUDED.map((f) => (
            <View key={f} style={styles.row}>
              <Check size={16} color={Colors.success} strokeWidth={2.6} />
              <Text style={[Typography.body, { color: Colors.onSurface, flex: 1 }]}>
                {f}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => router.push("/subscription")}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
          accessibilityRole="button"
          accessibilityLabel="Débloquer l'accès"
        >
          <Crown size={18} color={Colors.white} strokeWidth={2.3} />
          <Text style={styles.ctaLabel}>Débloquer l'accès</Text>
        </Pressable>

        <Text style={styles.reassure}>
          Paiement unique · Aucun abonnement · Aucun renouvellement
        </Text>

        {showFreeTrial ? (
          <Pressable
            onPress={() =>
              router.replace({
                pathname: "/practice/[category]",
                params: { category, freeOfficial: "1" },
              })
            }
            style={({ pressed }) => [styles.freeBtn, pressed && { opacity: 0.85 }]}
            accessibilityRole="button"
            accessibilityLabel="Simuler 40 questions gratuitement"
          >
            <Sparkles size={16} color={Colors.primary} />
            <Text style={styles.freeLabel}>Simuler 40 questions gratuitement</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 4,
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
  lockCircle: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: Colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: { color: Colors.onSurface, marginBottom: 8 },
  subtitle: { color: Colors.textSecondary, marginBottom: 20 },
  statsRow: {
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: Colors.primaryContainer,
    paddingVertical: 14,
    marginBottom: 20,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: {
    ...Typography.h2,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  reassure: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    padding: 18,
    gap: 12,
    marginBottom: 24,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  cta: {
    height: 52,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  ctaLabel: { ...Typography.button, color: Colors.white, fontSize: 16 },
  freeBtn: {
    marginTop: 14,
    height: 48,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  freeLabel: { ...Typography.button, color: Colors.primary, fontSize: 15 },
});
