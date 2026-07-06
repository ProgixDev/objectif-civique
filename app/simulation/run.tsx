import React, { useEffect, useMemo, useState } from "react";
import {
  AppState,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  X,
} from "lucide-react-native";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AnswerOption } from "@/components/AnswerOption";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { QuitModal } from "@/components/QuitModal";
import { useSessionStore } from "@/store/sessionStore";
import { useProgressStore } from "@/store/progressStore";
import { useHaptics } from "@/hooks/useHaptics";
import { useUserStore } from "@/store/userStore";
import { isPaid } from "@/lib/entitlements";
import { PremiumGate } from "@/components/PremiumGate";
import { THEME_LABELS } from "@/data/themes";
import { formatSeconds } from "@/lib/formatters";

const LETTERS = ["A", "B", "C", "D"];

export default function SimulationRun() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const user = useUserStore((s) => s.user);

  const session = useSessionStore((s) => s.current);
  const currentIndex = useSessionStore((s) => s.currentIndex);
  const answerCurrent = useSessionStore((s) => s.answerCurrent);
  const goNext = useSessionStore((s) => s.goNext);
  const goPrev = useSessionStore((s) => s.goPrev);
  const endSession = useSessionStore((s) => s.endSession);
  const resumeTimer = useSessionStore((s) => s.resumeTimer);
  const resetSession = useSessionStore((s) => s.reset);

  const bookmarks = useProgressStore((s) => s.bookmarks);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const recordAnswer = useProgressStore((s) => s.recordAnswer);
  const recordSession = useProgressStore((s) => s.recordSession);

  const [secondsLeft, setSecondsLeft] = useState(() => resumeTimer() || 45 * 60);
  const [showQuit, setShowQuit] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [expired, setExpired] = useState(false);

  // Per design, timer runs even when app is backgrounded (real exam conditions).
  useEffect(() => {
    if (!session || session.type !== "simulation") return;
    const id = setInterval(() => {
      const s = resumeTimer();
      setSecondsLeft(s);
      if (s <= 0) {
        clearInterval(id);
        setExpired(true);
      }
    }, 1000);
    const sub = AppState.addEventListener("change", () => setSecondsLeft(resumeTimer()));
    return () => {
      clearInterval(id);
      sub.remove();
    };
  }, [session, resumeTimer]);

  const question = session?.questions[currentIndex];
  const total = session?.questions.length ?? 40;
  const isLast = currentIndex >= total - 1;

  const currentPick = useMemo(() => {
    if (!session || !question) return null;
    const a = session.answers.find((x) => x.questionId === question.id);
    return a?.selectedIndex ?? null;
  }, [session, question]);

  if (!isPaid(user)) {
    return <PremiumGate />;
  }

  if (!session || !question) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={Typography.bodyLarge}>Préparation de la simulation…</Text>
      </View>
    );
  }

  const isWarning = secondsLeft <= 5 * 60 && secondsLeft > 0;
  const isBookmarked = bookmarks.includes(question.id);
  const themeLabel = THEME_LABELS[question.theme] ?? "";

  const finish = () => {
    const end = endSession();
    if (end) recordSession(session.id, "simulation", end.recap.percent);
    // Record answers for streak tracking (one per simulation).
    session.answers.forEach((a) => {
      if (a.selectedIndex !== null && a.isCorrect !== null) {
        recordAnswer(a.isCorrect);
      }
    });
    router.replace({
      pathname: "/results/[sessionId]",
      params: { sessionId: session.id, mode: "simulation" },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topRow, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => setShowQuit(true)}
          style={styles.iconBtn}
          accessibilityLabel="Quitter"
        >
          <X size={18} color={Colors.primary} />
        </Pressable>

        <MotiView
          animate={{ scale: isWarning ? 1.04 : 1 }}
          transition={{ type: "timing", duration: 500, loop: isWarning }}
          style={[
            styles.timer,
            isWarning && {
              backgroundColor: "rgba(183,16,42,0.12)",
            },
          ]}
        >
          <Text
            style={[
              Typography.button,
              { color: isWarning ? Colors.error : Colors.primary, fontFamily: "Inter_700Bold" },
            ]}
          >
            {formatSeconds(secondsLeft)}
          </Text>
        </MotiView>

        <Pressable
          onPress={() => toggleBookmark(question.id)}
          style={styles.iconBtn}
          accessibilityLabel="Marquer pour révision"
        >
          {isBookmarked ? (
            <BookmarkCheck size={18} color={Colors.tertiary} />
          ) : (
            <Bookmark size={18} color={Colors.primary} />
          )}
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <ProgressBar value={(currentIndex + 1) / total} />
          </View>
          <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
            {currentIndex + 1}/{total}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>
        <GlassCard padding={20} style={{ marginBottom: 16 }}>
          {isBookmarked ? (
            <View style={{ position: "absolute", top: 10, right: 12, zIndex: 2 }}>
              <Badge label="MARQUÉE" variant="gold" />
            </View>
          ) : null}
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

        <View style={{ gap: 10 }}>
          {question.choices.map((c, i) => (
            <AnswerOption
              key={i}
              letter={LETTERS[i]}
              text={c}
              state={currentPick === i ? "selected" : "idle"}
              onPress={() => answerCurrent(i)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.navBar, { paddingBottom: insets.bottom + 12 }]}>
        <GhostButton
          label="Précédent"
          leftIcon={<ChevronLeft size={18} color={Colors.primary} />}
          onPress={goPrev}
          disabled={currentIndex === 0}
          style={{ flex: 1 }}
        />
        <PillButton
          label={isLast ? "Terminer" : "Suivant"}
          variant="primary"
          rightIcon={<ArrowRight size={18} color={Colors.white} />}
          onPress={() => (isLast ? setShowFinish(true) : goNext())}
          style={{ flex: 2 }}
        />
      </View>

      <QuitModal
        visible={showQuit}
        title="Quitter la simulation ?"
        message="Votre progression sera perdue."
        onCancel={() => setShowQuit(false)}
        onConfirm={() => {
          setShowQuit(false);
          resetSession();
          router.replace("/(tabs)");
        }}
      />

      <QuitModal
        visible={showFinish}
        title="Terminer la simulation ?"
        message="Vous ne pourrez plus revenir modifier vos réponses."
        destructive={false}
        confirmLabel="Terminer"
        onCancel={() => setShowFinish(false)}
        onConfirm={() => {
          setShowFinish(false);
          finish();
        }}
      />

      <Modal transparent visible={expired} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={[Typography.display, { color: Colors.onSurface, textAlign: "center" }]}>
              ⏱ Temps écoulé
            </Text>
            <Text
              style={[
                Typography.body,
                { color: Colors.textSecondary, textAlign: "center", marginTop: 8 },
              ]}
            >
              La simulation se termine. Découvrez vos résultats.
            </Text>
            <PillButton
              label="Voir les résultats"
              size="md"
              variant="primary"
              fullWidth
              onPress={() => {
                haptics.success();
                finish();
              }}
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </Modal>
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
  timer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.primaryFixed,
  },
  navBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: "rgba(204,199,208,0.25)",
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
    padding: 24,
    width: "100%",
    maxWidth: 360,
  },
});
