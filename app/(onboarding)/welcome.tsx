import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { BlurView } from "expo-blur";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { OnboardingSlide } from "@/components/OnboardingSlide";
import { useHaptics } from "@/hooks/useHaptics";
import { Shadows } from "@/constants/shadows";

const CURRENT_YEAR = new Date().getFullYear();

type Slide = {
  key: string;
  image: any;
  eyebrow: string;
  title: string;
  subtitle: string;
  accent: "navy" | "red";
};

const SLIDES: Slide[] = [
  {
    key: "exam",
    image: Assets.onboarding.exam,
    eyebrow: `Naturalisation ${CURRENT_YEAR}`,
    title: `Préparez l'examen civique et l'entretien de naturalisation ${CURRENT_YEAR}.`,
    subtitle:
      "Révisez les valeurs et les institutions de la République française à votre rythme.",
    accent: "navy",
  },
  {
    key: "questions",
    image: Assets.onboarding.questions,
    eyebrow: "3 500+ questions officielles",
    title: "3 500+ questions officielles à votre rythme.",
    subtitle:
      "Des questions officielles et des mises en situation pour vous préparer dans les meilleures conditions.",
    accent: "red",
  },
  {
    key: "progress",
    image: Assets.onboarding.progress,
    eyebrow: "Votre progression",
    title: "Avancez un peu chaque jour, visiblement.",
    subtitle:
      "Statistiques détaillées, simulations chronométrées et révision par thème pour maximiser vos chances.",
    accent: "navy",
  },
];

export default function Welcome() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  // Height reserved for the white content sheet at the bottom of each slide.
  // Scales with device height so it feels balanced on both small and large screens.
  const navReserved = Math.max(insets.bottom + 20, 28) + 54 + 20;
  const sheetHeight = useMemo(
    () => Math.max(320, Math.round(height * 0.42)),
    [height],
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / width);
    if (newIndex !== index) {
      setIndex(newIndex);
      haptics.light();
    }
  };

  const scrollTo = (i: number) => {
    listRef.current?.scrollToOffset({ offset: i * width, animated: true });
  };

  const onNext = () => {
    haptics.light();
    if (index >= SLIDES.length - 1) {
      router.replace("/(onboarding)/auth-landing");
    } else {
      scrollTo(index + 1);
    }
  };

  const onSkip = () => {
    haptics.light();
    router.replace("/(onboarding)/auth-landing");
  };

  const isLast = index === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <OnboardingSlide
            imageSource={item.image}
            width={width}
            height={height}
            eyebrow={item.eyebrow}
            title={item.title}
            subtitle={item.subtitle}
            accent={item.accent}
            sheetHeight={sheetHeight}
            navReserved={navReserved}
          />
        )}
      />

      {/* Top bar — logo + skip */}
      <View
        style={[styles.topBar, { top: insets.top + 12 }]}
        pointerEvents="box-none"
      >
        <View style={styles.logoWrap}>
          <Image
            source={Assets.branding.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Pressable
          onPress={onSkip}
          accessibilityRole="button"
          accessibilityLabel="Ignorer l'introduction"
          hitSlop={12}
        >
          <BlurView intensity={40} tint="light" style={styles.skipPill}>
            <Text style={styles.skipText}>Ignorer</Text>
          </BlurView>
        </Pressable>
      </View>

      {/* Bottom nav — dots + CTA */}
      <View
        style={[
          styles.navRow,
          { paddingBottom: Math.max(insets.bottom + 20, 28) },
        ]}
        pointerEvents="box-none"
      >
        <View style={styles.dots}>
          {SLIDES.map((s, i) => (
            <MotiView
              key={s.key}
              animate={{
                width: i === index ? 28 : 8,
                backgroundColor:
                  i === index ? Colors.primary : "rgba(25,28,30,0.18)",
              }}
              transition={{ type: "spring", damping: 18, stiffness: 220 }}
              style={styles.dot}
            />
          ))}
        </View>

        <Pressable
          onPress={onNext}
          style={({ pressed }) => [
            styles.cta,
            Shadows.modal,
            pressed && { transform: [{ scale: 0.97 }], opacity: 0.95 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={isLast ? "Commencer" : "Suivant"}
        >
          <Text style={styles.ctaLabel}>
            {isLast ? "Commencer" : "Suivant"}
          </Text>
          <ArrowRight size={18} color={Colors.white} strokeWidth={2.4} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  topBar: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.soft,
  },
  logo: { width: 30, height: 30 },
  skipPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.8)",
  },
  skipText: {
    ...Typography.button,
    color: Colors.onSurface,
  },
  navRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  dot: { height: 8, borderRadius: 999 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 22,
    paddingRight: 18,
    height: 54,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  ctaLabel: {
    color: Colors.white,
    fontFamily: "Satoshi_700Bold",
    fontSize: 15,
    letterSpacing: 0.2,
  },
});
