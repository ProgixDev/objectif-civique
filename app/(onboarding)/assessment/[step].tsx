import React, { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AnswerOption, AnswerState } from "@/components/AnswerOption";
import { useSessionStore } from "@/store/sessionStore";
import { useHaptics } from "@/hooks/useHaptics";
import { THEME_LABELS } from "@/data/themes";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";

const LETTERS = ["A", "B", "C", "D"];

export default function AssessmentStep() {
  const insets = useSafeAreaInsets();
  const { step } = useLocalSearchParams<{ step: string }>();
  const stepIndex = Math.max(0, parseInt(step ?? "0", 10) || 0);
  const total = 5;

  const session = useSessionStore((s) => s.current);
  const answerCurrent = useSessionStore((s) => s.answerCurrent);
  const setCurrentIndex = useSessionStore((s) => s.setCurrentIndex);
  const haptics = useHaptics();

  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showQuit, setShowQuit] = useState(false);

  const question = session?.questions[stepIndex];

  useMemo(() => {
    setCurrentIndex(stepIndex);
    setPicked(null);
    setRevealed(false);
  }, [stepIndex, setCurrentIndex]);

  if (!question) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={Typography.bodyLarge}>Chargement…</Text>
      </View>
    );
  }

  const themeLabel = THEME_LABELS[question.theme] ?? "";

  const onPick = (i: number) => {
    if (revealed) return;
    setPicked(i);
    const correct = i === question.correctIndex;
    correct ? haptics.success() : haptics.warning();
    answerCurrent(i);
    setRevealed(true);
    setTimeout(() => {
      const next = stepIndex + 1;
      if (next >= total) {
        router.replace("/(onboarding)/assessment/result");
      } else {
        router.replace(`/(onboarding)/assessment/${next}`);
      }
    }, 1200);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.topBar}>
        <View style={{ flex: 1 }}>
          <ProgressBar value={(stepIndex + 1) / total} />
        </View>
        <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
          {stepIndex + 1}/{total}
        </Text>
        <Pressable
          onPress={() => setShowQuit(true)}
          style={styles.closeBtn}
          accessibilityLabel="Fermer"
        >
          <X size={18} color={Colors.primary} />
        </Pressable>
      </View>

      <GlassCard style={{ marginTop: 20 }} padding={20}>
        <Badge label={themeLabel.toUpperCase()} variant="gold" />
        <Text
          style={[
            Typography.h2,
            { color: Colors.onSurface, marginTop: 12, lineHeight: 26 },
          ]}
        >
          {question.text}
        </Text>
      </GlassCard>

      <View style={{ gap: 8, marginTop: 16 }}>
        {question.choices.map((c, i) => {
          let state: AnswerState = "idle";
          if (revealed) {
            if (i === question.correctIndex)
              state = picked === i ? "correct" : "missed";
            else if (i === picked) state = "wrong";
            else state = "idle";
          } else if (picked === i) state = "selected";
          return (
            <AnswerOption
              key={i}
              letter={LETTERS[i]}
              text={c}
              state={state}
              onPress={() => onPick(i)}
              disabled={revealed}
            />
          );
        })}
      </View>

      <Modal transparent visible={showQuit} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={[Typography.h2, { color: Colors.onSurface }]}>
              Quitter le test ?
            </Text>
            <Text style={[Typography.body, { color: Colors.textSecondary, marginTop: 8 }]}>
              Votre progression sera perdue.
            </Text>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
              <GhostButton
                label="Annuler"
                fullWidth
                onPress={() => setShowQuit(false)}
                style={{ flex: 1 }}
              />
              <PillButton
                label="Quitter"
                variant="destructive"
                fullWidth
                onPress={() => router.replace("/(tabs)")}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(25,28,30,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 360,
  },
});
