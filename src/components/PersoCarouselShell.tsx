import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { router } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PillButton } from "@/components/ui/PillButton";
import { useHaptics } from "@/hooks/useHaptics";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export type CarouselOption = {
  key: string;
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  Icon?: React.ComponentType<{ size?: number; color?: string }>;
};

type Props = {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  options: CarouselOption[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  onConfirm: () => void;
  onBack?: () => void;
  confirmLabel?: string;
};

export function PersoCarouselShell({
  step,
  total,
  title,
  subtitle,
  options,
  selectedKey,
  onSelect,
  onConfirm,
  onBack,
  confirmLabel = "Confirmer",
}: Props) {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const haptics = useHaptics();
  const listRef = useRef<FlatList<CarouselOption>>(null);

  const pageWidth = screenWidth;
  const scrollX = useSharedValue(0);

  const initialIndex = useMemo(() => {
    if (!selectedKey) return 0;
    const i = options.findIndex((o) => o.key === selectedKey);
    return i >= 0 ? i : 0;
  }, [options, selectedKey]);

  const [index, setIndex] = useState(initialIndex);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (options.length < 2) {
      setReady(true);
      return;
    }
    const lastOffset = (options.length - 1) * pageWidth;
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: lastOffset,
        animated: false,
      });
      scrollX.value = lastOffset;
      setTimeout(() => {
        const duration = 900;
        const startTime = Date.now();
        const step = () => {
          const elapsed = Date.now() - startTime;
          const t = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = lastOffset * (1 - eased);
          listRef.current?.scrollToOffset({
            offset: current,
            animated: false,
          });
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            setReady(true);
          }
        };
        requestAnimationFrame(step);
      }, 200);
    });
  }, [options.length, pageWidth, scrollX]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / pageWidth);
    if (next !== index) setIndex(next);
  };

  const visibleKey = options[index]?.key;
  const isVisibleSelected = visibleKey === selectedKey;

  const selectVisible = () => {
    const o = options[index];
    if (!o) return;
    haptics.light();
    onSelect(o.key);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={onBack ?? (() => router.back())}
          style={styles.backBtn}
          accessibilityLabel="Retour"
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <ProgressBar value={step / total} />
        </View>
        <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
          {step}/{total}
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={[Typography.h1, { color: Colors.onSurface }]}>{title}</Text>
        {subtitle ? (
          <Text
            style={[
              Typography.body,
              { color: Colors.textSecondary, marginTop: 6 },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <AnimatedFlatList
        ref={listRef as any}
        data={options}
        keyExtractor={(o) => (o as CarouselOption).key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumEnd}
        scrollEventThrottle={16}
        style={[styles.list, !ready && { opacity: 0.95 }]}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, i) => ({
          length: pageWidth,
          offset: pageWidth * i,
          index: i,
        })}
        renderItem={({ item, index: i }) => (
          <OptionPage
            option={item as CarouselOption}
            index={i}
            pageWidth={pageWidth}
            scrollX={scrollX}
          />
        )}
      />

      <View style={styles.dots}>
        {options.map((o, i) => (
          <MotiView
            key={o.key}
            animate={{
              width: i === index ? 22 : 6,
              backgroundColor:
                i === index ? Colors.primary : Colors.outlineVariant,
            }}
            transition={{ type: "spring", damping: 18, stiffness: 200 }}
            style={styles.dot}
          />
        ))}
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          onPress={selectVisible}
          accessibilityRole="button"
          accessibilityLabel={
            isVisibleSelected ? "Option sélectionnée" : "Sélectionner"
          }
          style={({ pressed }) => [
            styles.selectBtn,
            isVisibleSelected && styles.selectBtnActive,
            pressed && { opacity: 0.9 },
          ]}
        >
          {isVisibleSelected ? (
            <Check size={16} color={Colors.primary} />
          ) : null}
          <Text
            style={[
              styles.selectLabel,
              isVisibleSelected && { color: Colors.primary },
            ]}
          >
            {isVisibleSelected ? "Sélectionné" : "Sélectionner"}
          </Text>
        </Pressable>

        <PillButton
          label={confirmLabel}
          variant="primary"
          size="md"
          disabled={!selectedKey}
          onPress={onConfirm}
          style={{ flex: 1 }}
          fullWidth
        />
      </View>
    </View>
  );
}

function OptionPage({
  option,
  index,
  pageWidth,
  scrollX,
}: {
  option: CarouselOption;
  index: number;
  pageWidth: number;
  scrollX: SharedValue<number>;
}) {
  const Icon = option.Icon;

  const pageStyle = useAnimatedStyle(() => {
    const input = [
      (index - 1) * pageWidth,
      index * pageWidth,
      (index + 1) * pageWidth,
    ];
    const rotateY = interpolate(
      scrollX.value,
      input,
      [55, 0, -55],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollX.value,
      input,
      [0.78, 1, 0.78],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      input,
      [0.35, 1, 0.35],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      scrollX.value,
      input,
      [-60, 0, 60],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [
        { perspective: 1000 },
        { translateX },
        { rotateY: `${rotateY}deg` },
        { scale },
      ],
    };
  });

  return (
    <View style={[pageStyles.wrap, { width: pageWidth }]}>
      <Animated.View style={[pageStyles.inner, pageStyle]}>
        <View style={pageStyles.iconArea}>
          <LinearGradient
            colors={[
              "rgba(250, 189, 13, 0.35)",
              "rgba(250, 189, 13, 0.08)",
              "rgba(250, 189, 13, 0)",
            ]}
            locations={[0, 0.55, 1]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={pageStyles.glowOuter}
          />
          <View style={pageStyles.glowMid} />
          <Image
            source={Assets.decorative.blobYellow}
            style={pageStyles.blob}
            resizeMode="contain"
          />
          <View style={pageStyles.iconInner}>
            {option.image ? (
              <Image
                source={option.image}
                style={pageStyles.iconImage}
                resizeMode="contain"
              />
            ) : Icon ? (
              <Icon size={96} color={Colors.primary} />
            ) : null}
          </View>
        </View>

        <Text style={pageStyles.title}>{option.title}</Text>
        {option.description ? (
          <Text style={pageStyles.description}>{option.description}</Text>
        ) : null}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
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
  header: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  dot: { height: 6, borderRadius: 999 },
  bottom: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  selectBtn: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  selectBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryFixed,
  },
  selectLabel: {
    ...Typography.button,
    color: Colors.onSurface,
    fontSize: 14,
  },
});

const pageStyles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconArea: {
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  glowOuter: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 999,
  },
  glowMid: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 999,
    backgroundColor: "rgba(250, 189, 13, 0.22)",
  },
  blob: {
    position: "absolute",
    width: 260,
    height: 260,
    opacity: 0.6,
  },
  iconInner: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 160,
    height: 160,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    lineHeight: 30,
    color: Colors.onSurface,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 12,
  },
});
