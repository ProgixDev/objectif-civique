import React, { useRef, useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { OnboardingSlide } from "@/components/OnboardingSlide";
import { useHaptics } from "@/hooks/useHaptics";
import { Shadows } from "@/constants/shadows";

const SLIDES = [
  {
    key: "exam",
    image: Assets.onboarding.exam,
    bg: "#e8c8e5",
    title: "Préparez votre Examen Civique",
    subtitle:
      "Révisez les valeurs et institutions de la République française à votre rythme.",
  },
  {
    key: "questions",
    image: Assets.onboarding.questions,
    bg: "#e6dcf7",
    title: "2500+ Questions Officielles",
    subtitle:
      "Des questions officielles et des mises en situation pour vous entraîner dans les meilleures conditions.",
  },
  {
    key: "progress",
    image: Assets.onboarding.progress,
    bg: "#e6dcf7",
    title: "Suivez votre Progression",
    subtitle:
      "Statistiques détaillées, simulations chronométrées et révision par thème pour maximiser vos chances.",
  },
];

export default function Welcome() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const gradientHeight = Math.round(height * 0.3);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / width);
    if (newIndex !== index) setIndex(newIndex);
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

  const current = SLIDES[index];
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
            height={height}
            backgroundColor={item.bg}
          />
        )}
      />

      <View style={[styles.topBar, { top: insets.top + 12 }]} pointerEvents="box-none">
        <View style={{ width: 56 }} />
        <Image
          source={Assets.branding.logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Pressable
          onPress={() => router.replace("/(onboarding)/auth-landing")}
          accessibilityRole="button"
          accessibilityLabel="Ignorer"
          hitSlop={8}
        >
          <Text style={[Typography.button, styles.skip]}>Ignorer</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.textTop,
          { top: insets.top + 72, paddingHorizontal: 24 },
        ]}
        pointerEvents="none"
      >
        <Text style={styles.title}>{current.title}</Text>
      </View>

      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)", "#FFFFFF"]}
        locations={[0, 0.6, 1]}
        style={[styles.gradient, { height: gradientHeight }]}
        pointerEvents="none"
      />

      <View
        style={[styles.navRow, { paddingBottom: insets.bottom + 20 }]}
        pointerEvents="box-none"
      >
        <View style={styles.dots}>
          {SLIDES.map((s, i) => (
            <MotiView
              key={s.key}
              animate={{
                width: i === index ? 24 : 8,
                backgroundColor:
                  i === index ? Colors.primary : Colors.outlineVariant,
              }}
              transition={{ type: "spring", damping: 18, stiffness: 200 }}
              style={styles.dot}
            />
          ))}
        </View>

        <Pressable
          onPress={onNext}
          style={({ pressed }) => [
            styles.nextBtn,
            Shadows.card,
            pressed && { opacity: 0.9 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={isLast ? "Commencer" : "Suivant"}
        >
          <ArrowRight size={22} color={Colors.white} />
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
  logo: { width: 40, height: 40 },
  skip: {
    color: Colors.white,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  textTop: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "flex-start",
  },
  title: {
    color: "#000000",
    textAlign: "left",
    marginBottom: 12,
    fontFamily: "Inter_700Bold",
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.white,
    textAlign: "left",
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    lineHeight: 24,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  navRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  dot: { height: 8, borderRadius: 999 },
  nextBtn: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
