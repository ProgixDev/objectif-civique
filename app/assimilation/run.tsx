import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  RotateCcw,
  X,
} from "lucide-react-native";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { useHaptics } from "@/hooks/useHaptics";
import { useUserStore } from "@/store/userStore";
import { isPaid } from "@/lib/entitlements";
import { PremiumGate } from "@/components/PremiumGate";
import { QuitModal } from "@/components/QuitModal";
import {
  ASSIMILATION_QUESTIONS,
  ASSIMILATION_TOPIC_LABELS,
  getAssimilationByTopic,
} from "@/data/questions.assimilation";
import { AssimilationQuestion, AssimilationTopic } from "@/types";
import { getExplanation } from "@/lib/quizEngine";

const VALID_TOPICS: AssimilationTopic[] = [
  "motivation",
  "valeurs",
  "histoire",
  "institutions",
  "vie-quotidienne",
  "personnel",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function AssimilationRun() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const user = useUserStore((s) => s.user);
  const params = useLocalSearchParams<{ topic?: string }>();

  const topic =
    params.topic && VALID_TOPICS.includes(params.topic as AssimilationTopic)
      ? (params.topic as AssimilationTopic)
      : null;

  const questions = useMemo<AssimilationQuestion[]>(() => {
    const pool = topic
      ? getAssimilationByTopic(topic)
      : ASSIMILATION_QUESTIONS;
    return shuffle(pool);
  }, [topic]);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showQuit, setShowQuit] = useState(false);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const question = questions[index];

  useEffect(() => {
    setPicked(null);
    setRevealed(false);
  }, [index]);

  if (!isPaid(user)) {
    return <PremiumGate />;
  }

  if (!question) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={Typography.bodyLarge}>Aucune question disponible.</Text>
        <PillButton
          label="Retour"
          variant="primary"
          size="md"
          onPress={() => router.back()}
          style={{ marginTop: 14 }}
        />
      </View>
    );
  }

  const pick = (i: number) => {
    if (revealed) return;
    setPicked(i);
    haptics.light();
  };

  const confirm = () => {
    if (picked === null) return;
    const correct = picked === question.correctIndex;
    if (correct) {
      setCorrectCount((c) => c + 1);
      haptics.success();
    } else {
      haptics.warning();
    }
    setRevealed(true);
  };

  const onNext = () => {
    if (index >= total - 1) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    const tone =
      pct >= 80 ? Colors.success : pct >= 60 ? Colors.tertiary : Colors.secondary;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.surface }}>
        <View
          style={[
            styles.topRow,
            { paddingTop: insets.top + 12, justifyContent: "space-between" },
          ]}
        >
          <Pressable
            onPress={() => router.back()}
            style={styles.iconBtn}
            accessibilityLabel="Fermer"
          >
            <X size={18} color={Colors.primary} />
          </Pressable>
          <Text style={[Typography.caption, { color: Colors.textTertiary }]}>
            Récapitulatif
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 24, alignItems: "center" }}>
          <View style={[styles.scoreCircle, { borderColor: tone }]}>
            <Text style={[styles.scoreValue, { color: tone }]}>{pct}%</Text>
            <Text style={styles.scoreSub}>
              {correctCount} / {total}
            </Text>
          </View>

          <Text style={styles.endTitle}>
            {pct >= 80
              ? "Excellent — vous êtes prêt(e) !"
              : pct >= 60
                ? "Bon niveau, continuez à réviser."
                : "À retravailler — reprenez les explications."}
          </Text>
          <Text style={styles.endDesc}>
            {topic
              ? `Thème : ${ASSIMILATION_TOPIC_LABELS[topic]}`
              : "Toutes thématiques confondues"}
          </Text>

          <View style={{ width: "100%", gap: 10, marginTop: 22 }}>
            <PillButton
              label="Recommencer"
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<RotateCcw size={16} color={Colors.white} />}
              onPress={restart}
            />
            <GhostButton
              label="Retour"
              size="md"
              fullWidth
              onPress={() => router.back()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  const topicLabel = topic
    ? ASSIMILATION_TOPIC_LABELS[topic]
    : "Toutes thématiques";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topRow, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => setShowQuit(true)}
          style={styles.iconBtn}
          accessibilityLabel="Fermer"
        >
          <X size={18} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.caption, { color: Colors.textTertiary }]}>
          Entretien d'assimilation
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <ProgressBar value={(index + 1) / total} />
          </View>
          <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
            {index + 1} / {total}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
      >
        <GlassCard padding={14} style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Badge label={topicLabel.toUpperCase()} variant="gold" />
            <Badge
              label={question.type === "vraiFaux" ? "VRAI / FAUX" : "QCM"}
              variant="info"
            />
          </View>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              lineHeight: 22,
              color: Colors.onSurface,
              marginTop: 10,
            }}
          >
            {question.text}
          </Text>
        </GlassCard>

        <View style={{ gap: 8 }}>
          {question.choices.map((choice, i) => {
            const isCorrect = i === question.correctIndex;
            const isPicked = i === picked;
            let bg: string = Colors.white;
            let border: string = "rgba(204,199,208,0.4)";
            let labelColor: string = Colors.onSurface;

            if (revealed) {
              if (isCorrect) {
                bg = "rgba(16,185,129,0.10)";
                border = Colors.success;
                labelColor = Colors.onSurface;
              } else if (isPicked) {
                bg = "rgba(239,68,68,0.10)";
                border = Colors.secondary;
              }
            } else if (isPicked) {
              bg = "rgba(0,85,164,0.08)";
              border = Colors.primary;
            }

            return (
              <Pressable
                key={i}
                onPress={() => pick(i)}
                disabled={revealed}
                style={[
                  styles.choice,
                  {
                    backgroundColor: bg,
                    borderColor: border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.choiceDot,
                    {
                      borderColor: border,
                      backgroundColor:
                        revealed && isCorrect
                          ? Colors.success
                          : revealed && isPicked
                            ? Colors.secondary
                            : isPicked
                              ? Colors.primary
                              : "transparent",
                    },
                  ]}
                >
                  {revealed && isCorrect ? (
                    <Check size={14} color={Colors.white} strokeWidth={3} />
                  ) : revealed && isPicked && !isCorrect ? (
                    <X size={14} color={Colors.white} strokeWidth={3} />
                  ) : null}
                </View>
                <Text style={[styles.choiceText, { color: labelColor }]}>
                  {choice}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {!revealed && picked !== null ? (
          <PillButton
            label="Confirmer"
            size="md"
            variant="primary"
            fullWidth
            onPress={confirm}
            style={{ marginTop: 16 }}
          />
        ) : null}

        {revealed ? (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", damping: 18 }}
            style={[
              styles.explain,
              {
                borderLeftColor:
                  picked === question.correctIndex
                    ? Colors.success
                    : Colors.secondary,
                backgroundColor:
                  picked === question.correctIndex
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(239,68,68,0.06)",
              },
            ]}
          >
            <Text
              style={[
                Typography.caption,
                {
                  color:
                    picked === question.correctIndex
                      ? Colors.success
                      : Colors.secondary,
                  fontFamily: "Inter_700Bold",
                  marginBottom: 6,
                },
              ]}
            >
              {picked === question.correctIndex ? "BIEN VU" : "EXPLICATION"}
            </Text>
            <Text
              style={[
                Typography.body,
                { color: Colors.onSurface, lineHeight: 22 },
              ]}
            >
              {getExplanation(question)}
            </Text>
          </MotiView>
        ) : null}
      </ScrollView>

      {revealed ? (
        <View
          style={[
            styles.navBar,
            { paddingBottom: insets.bottom + 12 },
          ]}
        >
          <PillButton
            label={index >= total - 1 ? "Voir le récap" : "Suivant"}
            variant="primary"
            rightIcon={<ArrowRight size={18} color={Colors.white} />}
            onPress={onNext}
            fullWidth
          />
        </View>
      ) : null}

      <QuitModal
        visible={showQuit}
        title="Quitter ?"
        message="Votre progression dans cette session sera perdue."
        onCancel={() => setShowQuit(false)}
        onConfirm={() => {
          setShowQuit(false);
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  choice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  choiceDot: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceText: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  explain: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginTop: 16,
  },
  navBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: "rgba(204,199,208,0.25)",
  },

  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 999,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  scoreValue: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 38,
    letterSpacing: -1,
  },
  scoreSub: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  endTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 19,
    color: Colors.onSurface,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  endDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 6,
    textAlign: "center",
  },
});
