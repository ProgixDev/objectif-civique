import React from "react";
import {
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Shadows } from "@/constants/shadows";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PillButton } from "@/components/ui/PillButton";
import { useHaptics } from "@/hooks/useHaptics";

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
  confirmLabel = "Continuer",
}: Props) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();

  const handleSelect = (key: string) => {
    haptics.light();
    onSelect(key);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={onBack ?? (() => router.back())}
          style={({ pressed }) => [
            styles.backBtn,
            pressed && { opacity: 0.75 },
          ]}
          accessibilityLabel="Retour"
          hitSlop={8}
        >
          <ChevronLeft size={22} color={Colors.onSurface} />
        </Pressable>
        <View style={styles.progressWrap}>
          <ProgressBar
            value={step / total}
            height={6}
            trackColor="#E8EAEF"
            fillColors={[Colors.primary, Colors.primary]}
          />
        </View>
        <Text style={styles.stepCounter}>
          {step}
          <Text style={styles.stepCounterMuted}>/{total}</Text>
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            ÉTAPE {step} SUR {total}
          </Text>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {/* Options */}
        <View style={styles.options}>
          {options.map((option, i) => (
            <OptionCard
              key={option.key}
              option={option}
              selected={option.key === selectedKey}
              index={i}
              onPress={() => handleSelect(option.key)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: Math.max(insets.bottom + 12, 20),
          },
        ]}
      >
        <PillButton
          label={confirmLabel}
          variant="primary"
          size="lg"
          disabled={!selectedKey}
          onPress={onConfirm}
          fullWidth
        />
      </View>
    </View>
  );
}

function OptionCard({
  option,
  selected,
  index,
  onPress,
}: {
  option: CarouselOption;
  selected: boolean;
  index: number;
  onPress: () => void;
}) {
  const Icon = option.Icon;
  const hasImage = !!option.image;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 320,
        delay: 80 + index * 60,
      }}
    >
      <Pressable
        onPress={onPress}
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        accessibilityLabel={option.title}
        style={({ pressed }) => [
          styles.card,
          selected && styles.cardSelected,
          pressed && { opacity: 0.9, transform: [{ scale: 0.995 }] },
        ]}
      >
        <View
          style={[
            styles.iconTile,
            selected && styles.iconTileSelected,
            hasImage && styles.iconTileImage,
          ]}
        >
          {hasImage ? (
            <Image
              source={option.image}
              style={styles.iconImage}
              contentFit="contain"
            />
          ) : Icon ? (
            <Icon
              size={26}
              color={selected ? Colors.primary : Colors.onSurface}
            />
          ) : null}
        </View>

        <View style={styles.cardText}>
          <Text
            style={[styles.cardTitle, selected && { color: Colors.primary }]}
          >
            {option.title}
          </Text>
          {option.description ? (
            <Text style={styles.cardDescription}>{option.description}</Text>
          ) : null}
        </View>

        <View
          style={[
            styles.radio,
            selected && styles.radioSelected,
          ]}
        >
          {selected ? (
            <Check size={14} color={Colors.white} strokeWidth={3} />
          ) : null}
        </View>
      </Pressable>
    </MotiView>
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
    gap: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.outlineVariant,
  },
  progressWrap: {
    flex: 1,
  },
  stepCounter: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    minWidth: 32,
    textAlign: "right",
  },
  stepCounterMuted: {
    color: Colors.textTertiary,
    fontFamily: "Satoshi_600SemiBold",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 24,
  },
  eyebrow: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.primary,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  options: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: "#E8EAEF",
    ...Shadows.soft,
  },
  cardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: "rgba(0,85,164,0.04)",
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4F7",
  },
  iconTileSelected: {
    backgroundColor: "rgba(0,85,164,0.12)",
  },
  iconTileImage: {
    backgroundColor: "transparent",
  },
  iconImage: {
    width: 56,
    height: 56,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 16,
    lineHeight: 22,
    color: Colors.onSurface,
    marginBottom: 2,
  },
  cardDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  radioSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
});
