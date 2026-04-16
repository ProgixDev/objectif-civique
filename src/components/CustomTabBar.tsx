import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { BarChart3, BookOpen, Home, User } from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { useHaptics } from "@/hooks/useHaptics";

const ICONS: Record<string, React.ComponentType<any>> = {
  index: Home,
  revise: BookOpen,
  progress: BarChart3,
  profile: User,
};
const LABELS: Record<string, string> = {
  index: "Accueil",
  revise: "Réviser",
  progress: "Progrès",
  profile: "Profil",
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 4,
        },
      ]}
    >
      <BlurView
        intensity={Platform.OS === "android" ? 0 : 60}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.tabs}>
        {state.routes.map((route, i) => {
          const Icon = ICONS[route.name] ?? Home;
          const label = LABELS[route.name] ?? route.name;
          const focused = state.index === i;
          const color = focused ? Colors.primary : Colors.textTertiary;
          return (
            <Pressable
              key={route.key}
              onPress={() => {
                haptics.light();
                navigation.navigate(route.name);
              }}
              style={styles.tab}
              accessibilityRole="button"
              accessibilityLabel={label}
            >
              <View style={[styles.iconWrap, focused && styles.iconActive]}>
                <Icon size={20} color={color} />
              </View>
              <Text
                style={[
                  Typography.caption,
                  { color, marginTop: 2, fontSize: 10 },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 6,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    width: 72,
    alignItems: "center",
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  iconActive: {
    backgroundColor: Colors.surfaceContainerLow,
  },
});
