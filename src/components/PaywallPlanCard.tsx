import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { Shadows } from "@/constants/shadows";
import { Badge } from "@/components/ui/Badge";

type Props = {
  title: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  currentBadge?: string;
  selected: boolean;
  onSelect: () => void;
};

export function PaywallPlanCard({
  title,
  price,
  period,
  features,
  highlight,
  badge,
  currentBadge,
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.outer}>
      <Pressable
        onPress={onSelect}
        style={[styles.card, highlight && styles.highlight, Shadows.card]}
      >
        {highlight ? (
          <LinearGradient
            colors={[Colors.surfaceContainerLowest, Colors.primaryFixed]}
            style={StyleSheet.absoluteFill}
          />
        ) : null}

        <View style={styles.topRow}>
          <Text style={[Typography.h2, styles.title]}>{title}</Text>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.price}>{price}</Text>
            <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
              {period}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 8, gap: 4 }}>
          {features.map((f) => (
            <View
              key={f}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Check size={14} color={Colors.success} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        <View style={styles.radioRow}>
          <View
            style={[
              styles.radio,
              selected && {
                borderColor: Colors.tertiary,
                backgroundColor: Colors.tertiary,
              },
            ]}
          >
            {selected ? <View style={styles.radioDot} /> : null}
          </View>
        </View>
      </Pressable>

      {badge ? (
        <View style={styles.badgeFloatRight} pointerEvents="none">
          <Badge label={badge} variant="gold" />
        </View>
      ) : null}
      {currentBadge ? (
        <View style={styles.badgeFloatLeft} pointerEvents="none">
          <View style={styles.currentPill}>
            <Text style={styles.currentPillText}>{currentBadge}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: "relative",
  },
  card: {
    paddingTop: 18,
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainerLowest,
    overflow: "hidden",
  },
  highlight: {
    borderColor: Colors.primary,
  },
  badgeFloatRight: {
    position: "absolute",
    top: -14,
    right: 14,
    zIndex: 2,
  },
  badgeFloatLeft: {
    position: "absolute",
    top: -14,
    left: 14,
    zIndex: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    color: Colors.onSurface,
    fontSize: 15,
    lineHeight: 20,
  },
  price: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 22,
    color: Colors.primary,
  },
  featureText: {
    ...Typography.body,
    color: Colors.onSurface,
    fontSize: 12,
    lineHeight: 16,
  },
  radioRow: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },
  currentPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: Colors.success,
  },
  currentPillText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 0.5,
    color: "#000000",
  },
});
