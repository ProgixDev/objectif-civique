import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { useHaptics } from "@/hooks/useHaptics";

type Props = {
  label: string;
  onPress?: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
  textColor?: string;
};

const sizeHeight = { sm: 40, md: 48, lg: 56 };

export function GhostButton({
  label,
  onPress,
  size = "md",
  disabled,
  leftIcon,
  rightIcon,
  style,
  fullWidth,
  textColor,
}: Props) {
  const haptics = useHaptics();
  const handlePress = () => {
    if (disabled) return;
    haptics.light();
    onPress?.();
  };
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        {
          height: sizeHeight[size],
          borderRadius: Radius.pill,
          paddingHorizontal: 18,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1.5,
          borderColor: Colors.outlineVariant,
          backgroundColor: Colors.surfaceContainerLowest,
          opacity: disabled ? 0.5 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {leftIcon ? <View>{leftIcon}</View> : null}
        <Text
          style={[Typography.button, { color: textColor ?? Colors.primary }]}
        >
          {label}
        </Text>
        {rightIcon ? <View>{rightIcon}</View> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
});
