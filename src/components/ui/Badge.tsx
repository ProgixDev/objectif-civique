import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";

type Variant = "success" | "warning" | "error" | "info" | "gold" | "neutral";

type Props = {
  label: string;
  variant?: Variant;
  style?: ViewStyle;
};

const map: Record<Variant, { bg: string; fg: string }> = {
  success: { bg: "rgba(16,185,129,0.15)", fg: Colors.success },
  warning: { bg: "rgba(245,158,11,0.15)", fg: Colors.warning },
  error: { bg: "rgba(183,16,42,0.12)", fg: Colors.error },
  info: { bg: Colors.primaryFixed, fg: Colors.primary },
  gold: { bg: Colors.tertiarySoft, fg: Colors.tertiaryOnSoft },
  neutral: { bg: Colors.surfaceContainerLow, fg: Colors.textSecondary },
};

export function Badge({ label, variant = "neutral", style }: Props) {
  const colors = map[variant];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }, style]}>
      <Text
        style={[
          Typography.caption,
          {
            color: colors.fg,
            fontFamily: "Inter_600SemiBold",
            letterSpacing: 0.5,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    alignSelf: "flex-start",
  },
});
