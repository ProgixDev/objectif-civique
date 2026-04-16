import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { Shadows } from "@/constants/shadows";

type Props = ViewProps & {
  padding?: number;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
};

export function GlassCard({
  children,
  padding = 16,
  style,
  intensity = 30,
  ...rest
}: Props) {
  return (
    <View
      style={[styles.container, Shadows.card, style]}
      {...rest}
    >
      <BlurView
        intensity={Platform.OS === "android" ? 0 : intensity}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.65)", "rgba(255,255,255,0.45)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ padding }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    backgroundColor: Colors.surfaceContainerLowest,
  },
});
