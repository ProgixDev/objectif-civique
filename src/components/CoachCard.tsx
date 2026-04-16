import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { Badge } from "@/components/ui/Badge";
import { PillButton } from "@/components/ui/PillButton";

type Props = {
  title: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  onChoose: () => void;
};

export function CoachCard({
  title,
  price,
  period,
  features,
  highlight,
  badge,
  onChoose,
}: Props) {
  return (
    <View style={[styles.card, highlight && styles.highlight]}>
      {highlight ? (
        <LinearGradient
          colors={[Colors.surfaceContainerLowest, Colors.primaryFixed]}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {badge ? (
        <View style={styles.badgeWrap}>
          <Badge label={badge} variant="gold" />
        </View>
      ) : null}
      <View style={styles.topRow}>
        <Text style={[Typography.h2, { color: Colors.onSurface }]}>{title}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 22, color: Colors.primary }}>
            {price}
          </Text>
          <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
            {period}
          </Text>
        </View>
      </View>
      <View style={{ gap: 6, marginTop: 12 }}>
        {features.map((f) => (
          <View key={f} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Check size={14} color={Colors.success} />
            <Text style={[Typography.body, { color: Colors.onSurface }]}>{f}</Text>
          </View>
        ))}
      </View>
      <PillButton
        label="Choisir"
        size="md"
        variant="primary"
        fullWidth
        onPress={onChoose}
        style={{ marginTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    overflow: "hidden",
  },
  highlight: {
    borderColor: Colors.primary,
  },
  badgeWrap: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
