import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { useHaptics } from "@/hooks/useHaptics";

type Props = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  leftIcon?: React.ReactNode;
};

export function PersoChipOption({
  label,
  description,
  selected,
  onPress,
  leftIcon,
}: Props) {
  const haptics = useHaptics();
  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress();
      }}
      style={[
        styles.chip,
        selected && styles.selected,
        description ? { minHeight: 76, paddingVertical: 14 } : undefined,
      ]}
    >
      {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
      <View style={{ flex: 1 }}>
        <Text style={[Typography.bodyLarge, { color: Colors.onSurface }]}>
          {label}
        </Text>
        {description ? (
          <Text
            style={[
              Typography.caption,
              { color: Colors.textSecondary, marginTop: 2 },
            ]}
          >
            {description}
          </Text>
        ) : null}
      </View>
      {selected ? (
        <Check size={18} color={Colors.tertiary} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 56,
    paddingHorizontal: 18,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainerLowest,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selected: {
    backgroundColor: Colors.primaryFixed,
    borderColor: Colors.primary,
  },
  icon: { width: 22, alignItems: "center" },
});
