import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { useHaptics } from "@/hooks/useHaptics";

type Variant = "default" | "selected" | "goldOutline";

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: Variant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
};

export function Chip({
  label,
  selected,
  onPress,
  variant,
  leftIcon,
  rightIcon,
  style,
}: Props) {
  const haptics = useHaptics();
  const isSelected = selected ?? variant === "selected";
  const isGold = variant === "goldOutline";

  const bg = isSelected
    ? Colors.primary
    : isGold
      ? "transparent"
      : Colors.surfaceContainerLowest;
  const border = isSelected
    ? Colors.primary
    : isGold
      ? Colors.tertiary
      : Colors.outlineVariant;
  const fg = isSelected
    ? Colors.white
    : isGold
      ? Colors.tertiaryOnSoft
      : Colors.textSecondary;

  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress?.();
      }}
      style={[
        styles.chip,
        { backgroundColor: bg, borderColor: border },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {leftIcon ? <View>{leftIcon}</View> : null}
      <Text style={[Typography.caption, { color: fg, fontSize: 12 }]}>
        {label}
      </Text>
      {rightIcon ? <View>{rightIcon}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
