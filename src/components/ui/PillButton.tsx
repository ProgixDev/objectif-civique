import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { useHaptics } from "@/hooks/useHaptics";

export type PillButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "gold";

export type PillButtonSize = "sm" | "md" | "lg";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: PillButtonVariant;
  size?: PillButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
};

const sizeHeight: Record<PillButtonSize, number> = { sm: 40, md: 48, lg: 56 };

export function PillButton({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  leftIcon,
  rightIcon,
  style,
  fullWidth,
}: Props) {
  const haptics = useHaptics();
  const height = sizeHeight[size];
  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (isDisabled) return;
    haptics.light();
    onPress?.();
  };

  const textColor =
    variant === "primary" || variant === "destructive"
      ? Colors.white
      : variant === "gold"
        ? Colors.primary
        : variant === "secondary"
          ? Colors.primary
          : Colors.primary;

  const content = (
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Text style={[Typography.button, { color: textColor }]}>{label}</Text>
          {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
        </>
      )}
    </View>
  );

  const baseStyle: ViewStyle = {
    height,
    borderRadius: Radius.pill,
    paddingHorizontal: size === "sm" ? 14 : size === "md" ? 18 : 22,
    alignItems: "center",
    justifyContent: "center",
    opacity: isDisabled ? 0.5 : 1,
    alignSelf: fullWidth ? "stretch" : "flex-start",
  };

  if (variant === "primary") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[{ alignSelf: fullWidth ? "stretch" : "flex-start" }, style]}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={baseStyle}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  const bg =
    variant === "destructive"
      ? Colors.error
      : variant === "gold"
        ? Colors.tertiary
        : variant === "secondary"
          ? Colors.surfaceContainerLowest
          : "transparent";
  const border =
    variant === "secondary"
      ? { borderWidth: 1.5, borderColor: Colors.outlineVariant }
      : undefined;

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[baseStyle, { backgroundColor: bg }, border, style]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
