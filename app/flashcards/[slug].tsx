import React, { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, RotateCcw, Bookmark } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { PillButton } from "@/components/ui/PillButton";
import { QUESTIONS, GOAL_LABELS } from "@/data/questions";
import { THEMES } from "@/data/themes";
import { useProgressStore } from "@/store/progressStore";
import { useHaptics } from "@/hooks/useHaptics";
import { Category, Question, ThemeId } from "@/types";

export default function FlashcardDeck() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const haptics = useHaptics();
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);

  const { deck, title } = useMemo(() => {
    if (slug?.startsWith("theme-")) {
      const themeId = slug.replace("theme-", "") as ThemeId;
      const theme = THEMES.find((t) => t.id === themeId);
      return {
        deck: QUESTIONS.filter((q) => q.theme === themeId),
        title: theme?.name ?? "Thème",
      };
    }
    const cat = slug as Category;
    return {
      deck: QUESTIONS.filter((q) => q.categories.includes(cat)),
      title: GOAL_LABELS[cat] ?? "Flashcards",
    };
  }, [slug]);

  const [index, setIndex] = useState(0);
  const flip = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const current: Question | undefined = deck[index];

  const onFlip = () => {
    haptics.light();
    const next = flipped ? 0 : 1;
    flip.value = withTiming(next, { duration: 380 });
    setFlipped(!flipped);
  };

  const resetFlip = () => {
    flip.value = withTiming(0, { duration: 0 });
    setFlipped(false);
  };

  const onNext = () => {
    if (index < deck.length - 1) {
      resetFlip();
      setIndex(index + 1);
    }
  };
  const onPrev = () => {
    if (index > 0) {
      resetFlip();
      setIndex(index - 1);
    }
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotate = interpolate(flip.value, [0, 1], [0, 180]);
    const opacity = flip.value < 0.5 ? 1 : 0;
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
      opacity,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotate = interpolate(flip.value, [0, 1], [180, 360]);
    const opacity = flip.value >= 0.5 ? 1 : 0;
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
      opacity,
    };
  });

  if (!current) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.surface }}>
        <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={6}
          >
            <ChevronLeft size={22} color={Colors.primary} />
          </Pressable>
          <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
            Flashcards
          </Text>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            Aucune carte disponible pour cette sélection.
          </Text>
        </View>
      </View>
    );
  }

  const isBookmarked = bookmarks.includes(current.id);
  const cardWidth = screenWidth - 40;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckProgress}>
            Carte {index + 1} sur {deck.length}
          </Text>
        </View>
        <Pressable
          onPress={() => toggleBookmark(current.id)}
          style={styles.backBtn}
          hitSlop={6}
        >
          <Bookmark
            size={20}
            color={isBookmarked ? Colors.tertiary : Colors.textTertiary}
            fill={isBookmarked ? Colors.tertiary : "none"}
          />
        </Pressable>
      </View>

      <View style={styles.center}>
        <Pressable onPress={onFlip} style={{ width: cardWidth, height: 400 }}>
          <Animated.View
            style={[
              styles.card,
              styles.cardFront,
              { width: cardWidth },
              frontStyle,
            ]}
          >
            <Text style={styles.faceLabel}>Question</Text>
            <Text style={styles.faceText}>{current.text}</Text>
            <Text style={styles.hint}>Touchez pour retourner</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { width: cardWidth },
              backStyle,
            ]}
          >
            <Text style={[styles.faceLabel, { color: Colors.white }]}>
              Réponse
            </Text>
            <Text style={[styles.faceText, { color: Colors.white }]}>
              {current.choices[current.correctIndex]}
            </Text>
            <Text style={styles.explanation}>{current.explanation}</Text>
          </Animated.View>
        </Pressable>
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          onPress={onPrev}
          disabled={index === 0}
          style={[styles.navBtn, index === 0 && { opacity: 0.4 }]}
        >
          <Text style={styles.navLabel}>Précédent</Text>
        </Pressable>
        <Pressable onPress={onFlip} style={styles.flipBtn}>
          <RotateCcw size={18} color={Colors.white} />
        </Pressable>
        <PillButton
          label={index === deck.length - 1 ? "Terminer" : "Suivant"}
          variant="primary"
          size="md"
          onPress={
            index === deck.length - 1 ? () => router.back() : onNext
          }
          style={{ flex: 1 }}
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
  deckTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: Colors.onSurface,
  },
  deckProgress: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    position: "absolute",
    top: 0,
    height: 400,
    borderRadius: Radius.xl,
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  cardFront: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
  },
  cardBack: {
    backgroundColor: Colors.primary,
  },
  faceLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: Colors.tertiaryOnSoft,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  faceText: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    lineHeight: 30,
    color: Colors.onSurface,
    textAlign: "center",
  },
  hint: {
    position: "absolute",
    bottom: 20,
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textTertiary,
  },
  explanation: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  navBtn: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  flipBtn: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
