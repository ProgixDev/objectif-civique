import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as LucideIcons from "lucide-react-native";
import { ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { Shadows } from "@/constants/shadows";
import { ProgressBar } from "@/components/ui/ProgressBar";

type Props = {
  icon: string;
  title: string;
  questionCount: number;
  progress: number;
  onPress: () => void;
};

export function ThemeListItem({ icon, title, questionCount, progress, onPress }: Props) {
  const Icon = (LucideIcons as any)[icon] ?? LucideIcons.Folder;
  return (
    <Pressable onPress={onPress} style={[styles.card, Shadows.card]}>
      <View style={styles.topRow}>
        <LinearGradient
          colors={[Colors.primaryFixed, Colors.white]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconWrap}
        >
          <Icon size={18} color={Colors.primary} />
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.sub}>{questionCount} questions</Text>
        </View>
        <ChevronRight size={16} color={Colors.textTertiary} />
      </View>
      <View
        style={{
          marginTop: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <ProgressBar value={progress / 100} height={4} />
        </View>
        <Text style={styles.percent}>{Math.round(progress)}%</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.onSurface,
  },
  sub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 14,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  percent: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.primary,
  },
});
