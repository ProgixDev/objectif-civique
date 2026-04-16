import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { Shadows } from "@/constants/shadows";

type Props = {
  value: string | number;
  label: string;
  accessory?: React.ReactNode;
  style?: ViewStyle;
};

export function StatCard({ value, label, accessory, style }: Props) {
  return (
    <View style={[styles.card, Shadows.card, style]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={styles.value}>{value}</Text>
        {accessory}
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: Colors.primary,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
