import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function Header({ title, onBack, right }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        style={styles.backBtn}
        accessibilityRole="button"
        accessibilityLabel="Retour"
      >
        <ChevronLeft size={22} color={Colors.primary} />
      </Pressable>
      <View style={{ flex: 1, alignItems: "center" }}>
        {title ? (
          <Text style={[Typography.h2, { color: Colors.onSurface }]} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
      <View style={{ width: 40, alignItems: "flex-end" }}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
  },
});
