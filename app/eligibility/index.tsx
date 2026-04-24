import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ChevronLeft, ShieldQuestion } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { PillButton } from "@/components/ui/PillButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  ELIGIBILITY_QUESTIONS,
  computeEligibility,
  EligibilityAnswer,
} from "@/data/eligibility";

export default function EligibilityFlow() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, EligibilityAnswer>>({});
  const [verdictVisible, setVerdictVisible] = useState(false);

  if (verdictVisible) {
    const verdict = computeEligibility(answers);
    const accent =
      verdict.status === "required"
        ? Colors.primary
        : verdict.status === "needs_cert"
          ? Colors.warning
          : Colors.success;

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
            Résultat
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: insets.bottom + 40,
          }}
        >
          <View style={[styles.verdict, { borderLeftColor: accent }]}>
            <Text style={[styles.verdictTitle, { color: accent }]}>
              {verdict.title}
            </Text>
            <Text style={styles.verdictDesc}>{verdict.description}</Text>
          </View>

          {verdict.status === "required" ? (
            <PillButton
              label="Commencer la préparation"
              variant="primary"
              size="md"
              fullWidth
              onPress={() => router.replace("/(tabs)")}
            />
          ) : (
            <PillButton
              label="Retour à l'accueil"
              variant="secondary"
              size="md"
              fullWidth
              onPress={() => router.replace("/(tabs)")}
            />
          )}
        </ScrollView>
      </View>
    );
  }

  const q = ELIGIBILITY_QUESTIONS[step];
  const selected = answers[q.id];
  const isLast = step === ELIGIBILITY_QUESTIONS.length - 1;
  const progress = (step + 1) / ELIGIBILITY_QUESTIONS.length;

  const onConfirm = () => {
    if (!selected) return;
    if (isLast) {
      setVerdictVisible(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => (step > 0 ? setStep((s) => s - 1) : router.back())}
          style={styles.backBtn}
          accessibilityLabel="Retour"
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <ProgressBar value={progress} />
        </View>
        <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
          {step + 1}/{ELIGIBILITY_QUESTIONS.length}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
        }}
      >
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <ShieldQuestion size={20} color={Colors.primary} />
          </View>
          <Text style={styles.introLabel}>Test d'éligibilité</Text>
        </View>
        <Text style={styles.prompt}>{q.prompt}</Text>

        <View style={{ gap: 10, marginTop: 18 }}>
          {q.choices.map((c) => {
            const isSelected = selected === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() =>
                  setAnswers((prev) => ({ ...prev, [q.id]: c.key }))
                }
                style={[styles.choice, isSelected && styles.choiceSelected]}
              >
                <View
                  style={[
                    styles.radio,
                    isSelected && styles.radioSelected,
                  ]}
                >
                  {isSelected ? <View style={styles.radioDot} /> : null}
                </View>
                <Text
                  style={[
                    styles.choiceLabel,
                    isSelected && { color: Colors.primary },
                  ]}
                >
                  {c.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <PillButton
          label={isLast ? "Voir le résultat" : "Continuer"}
          variant="primary"
          size="md"
          fullWidth
          disabled={!selected}
          onPress={onConfirm}
        />
      </View>
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
  intro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  introIcon: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: Colors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
  },
  introLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.primary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  prompt: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    lineHeight: 28,
    color: Colors.onSurface,
  },
  choice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
  },
  choiceSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryFixed,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  choiceLabel: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.onSurface,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  verdict: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    padding: 20,
    borderLeftWidth: 4,
    marginBottom: 20,
  },
  verdictTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 8,
  },
  verdictDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
});
