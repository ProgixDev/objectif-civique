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
import { Category } from "@/types";
import { useSessionStore } from "@/store/sessionStore";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AnswerOption, AnswerState } from "@/components/AnswerOption";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { useHaptics } from "@/hooks/useHaptics";
import { QuitModal } from "@/components/QuitModal";
import { THEME_LABELS } from "@/data/themes";
import { GOAL_LABELS } from "@/data/questions";

const LETTERS = ["A", "B", "C", "D"];
const VALID: Category[] = ["NAT", "CSP", "CR"];

export default function Practice() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category?: string; themeId?: string }>();
  const user = useUserStore((s) => s.user);

  const session = useSessionStore((s) => s.current);
  const currentIndex = useSessionStore((s) => s.currentIndex);
  const startPractice = useSessionStore((s) => s.startPractice);
  const answerCurrent = useSessionStore((s) => s.answerCurrent);
  const goNext = useSessionStore((s) => s.goNext);
  const goPrev = useSessionStore((s) => s.goPrev);
  const endSession = useSessionStore((s) => s.endSession);
  const setCurrentIndex = useSessionStore((s) => s.setCurrentIndex);

  const bookmarks = useProgressStore((s) => s.bookmarks);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const recordAnswer = useProgressStore((s) => s.recordAnswer);
  const recordSession = useProgressStore((s) => s.recordSession);

  const haptics = useHaptics();
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showQuit, setShowQuit] = useState(false);

  const initCategory: Category = useMemo(() => {
    const raw = params.category?.toString();
    if (raw && VALID.includes(raw as Category)) return raw as Category;
    return (user?.goal as Category) ?? "NAT";
  }, [params.category, user?.goal]);

  useEffect(() => {
    if (!session || session.type !== "practice") {
      startPractice(initCategory, 20);
    }
  }, [session, startPractice, initCategory]);

  useEffect(() => {
    if (!session) return;
    const existing = session.answers.find(
      (a) => a.questionId === session.questions[currentIndex]?.id
    );
    if (existing && existing.selectedIndex !== null) {
      setPicked(existing.selectedIndex);
      setRevealed(true);
    } else {
      setPicked(null);
      setRevealed(false);
    }
  }, [currentIndex, session]);

  const question = session?.questions[currentIndex];
  const total = session?.questions.length ?? 0;
  const isLast = currentIndex >= total - 1;

  if (!session || !question) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={Typography.bodyLarge}>Préparation…</Text>
      </View>
    );
  }

  const isBookmarked = bookmarks.includes(question.id);
  const themeLabel = THEME_LABELS[question.theme] ?? "";

  const pickAnswer = (i: number) => {
    if (revealed) return;
    setPicked(i);
    haptics.light();
  };

  const confirm = () => {
    if (picked === null) return;
    answerCurrent(picked);
    const correct = picked === question.correctIndex;
    correct ? haptics.success() : haptics.warning();
    recordAnswer(correct);
    setRevealed(true);
  };

  const onNext = () => {
    if (!revealed && picked === null) {
      answerCurrent(null);
    }
    if (isLast) {
      const end = endSession();
      if (end) {
        recordSession(session.id, "practice", end.recap.percent);
      }
      router.replace({
        pathname: "/results/[sessionId]",
        params: { sessionId: session.id, mode: "practice", category: initCategory },
      });
    } else {
      goNext();
    }
  };

  const onPrev = () => {
    if (currentIndex === 0) return;
    goPrev();
  };

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
        <View style={styles.categoryChip}>
          <Text style={styles.categoryChipText} numberOfLines={1}>
            Questions officielles · {GOAL_LABELS[initCategory]}
          </Text>
        </View>
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
            {currentIndex + 1} / {total}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
      >
        <GlassCard padding={14} style={{ marginBottom: 12 }}>
          <Badge label={themeLabel.toUpperCase()} variant="gold" />
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
          {question.choices.map((c, i) => {
            let state: AnswerState = "idle";
            if (revealed) {
              if (i === question.correctIndex)
                state = picked === i ? "correct" : "missed";
              else if (i === picked) state = "wrong";
            } else if (picked === i) state = "selected";
            return (
              <AnswerOption
                key={i}
                letter={LETTERS[i]}
                text={c}
                state={state}
                onPress={() => pickAnswer(i)}
                disabled={revealed}
              />
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
            style={styles.explain}
          >
            <Text
              style={[
                Typography.caption,
                {
                  color: Colors.primary,
                  fontFamily: "Inter_700Bold",
                  marginBottom: 6,
                },
              ]}
            >
              EXPLICATION
            </Text>
            <Text
              style={[
                Typography.body,
                { color: Colors.onSurface, lineHeight: 22 },
              ]}
            >
              {question.explanation}
            </Text>
          </MotiView>
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.navBar,
          { paddingBottom: insets.bottom + 12 },
        ]}
      >
        <GhostButton
          label="Précédent"
          leftIcon={<ChevronLeft size={18} color={Colors.primary} />}
          onPress={onPrev}
          disabled={currentIndex === 0}
          style={{ flex: 1 }}
        />
        <PillButton
          label={isLast ? "Voir le récap" : "Suivant"}
          variant="primary"
          rightIcon={<ArrowRight size={18} color={Colors.white} />}
          onPress={onNext}
          style={{ flex: 2 }}
        />
      </View>

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
  categoryChip: {
    flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
  },
  categoryChipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11.5,
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  explain: {
    padding: 16,
    backgroundColor: Colors.primaryFixed,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginTop: 16,
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
});
