import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart3, BookOpen, Home, Timer, User } from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Colors } from "@/constants/colors";
import { useHaptics } from "@/hooks/useHaptics";

const ICONS: Record<string, React.ComponentType<any>> = {
  index: Home,
  revise: BookOpen,
  simulation: Timer,
  progress: BarChart3,
  profile: User,
};
const LABELS: Record<string, string> = {
  index: "Accueil",
  revise: "Réviser",
  simulation: "Simulation",
  progress: "Progrès",
  profile: "Profil",
};

const BAR_HEIGHT = 68;
const BUBBLE_SIZE = 50;
const BUBBLE_LIFT = 18;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();

  const bottomOffset = Math.max(insets.bottom, 16);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        { bottom: bottomOffset, height: BAR_HEIGHT + BUBBLE_LIFT + 8 },
      ]}
    >
      {/* Shadow-only layer behind everything (so shadow isn't clipped) */}
      <View style={styles.shadowLayer} />

      {/* Glass surface — overflow clipped to pill */}
      <View style={styles.barSurface}>
        <BlurView
          intensity={Platform.OS === "android" ? 0 : 90}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={[
            "rgba(255,255,255,0.9)",
            "rgba(255,255,255,0.55)",
            "rgba(255,255,255,0.28)",
          ]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Inner top highlight */}
        <View style={styles.innerHighlight} pointerEvents="none" />
      </View>

      {/* Tabs layer — sits ON TOP of the bar, NOT clipped, so bubble can lift */}
      <View style={styles.tabsLayer} pointerEvents="box-none">
        {state.routes.map((route, i) => {
          const Icon = ICONS[route.name] ?? Home;
          const label = LABELS[route.name] ?? route.name;
          const focused = state.index === i;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                if (!focused) {
                  haptics.light();
                  navigation.navigate(route.name);
                }
              }}
              style={styles.tab}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected: focused }}
            >
              <View style={styles.bubbleSlot} pointerEvents="box-none">
                <MotiView
                  animate={{
                    translateY: focused ? -BUBBLE_LIFT : 0,
                    scale: focused ? 1 : 0.86,
                  }}
                  transition={{
                    type: "spring",
                    damping: 14,
                    stiffness: 220,
                    mass: 0.6,
                  }}
                  style={styles.bubble}
                >
                  {focused ? (
                    <>
                      <View style={styles.bubbleGlow} />
                      <View style={styles.bubbleFill}>
                        <LinearGradient
                          colors={[Colors.primary, "#003a75"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.bubbleRing} pointerEvents="none" />
                      </View>
                    </>
                  ) : null}
                  <Icon
                    size={focused ? 22 : 20}
                    color={focused ? Colors.white : Colors.textSecondary}
                    strokeWidth={focused ? 2.5 : 2}
                  />
                </MotiView>
              </View>

              <Text
                style={[
                  styles.label,
                  focused ? styles.labelActive : styles.labelInactive,
                ]}
                numberOfLines={1}
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
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
  shadowLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: BAR_HEIGHT,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    shadowColor: "#0A0F1E",
    shadowOpacity: 0.2,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
  barSurface: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: BAR_HEIGHT,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.72)",
    overflow: "hidden",
  },
  innerHighlight: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  tabsLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: BAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 4,
  },
  bubbleSlot: {
    width: BUBBLE_SIZE,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  bubbleGlow: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    opacity: 0.18,
  },
  bubbleFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    overflow: "hidden",
  },
  bubbleRing: {
    position: "absolute",
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  label: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 10.5,
    letterSpacing: 0.15,
  },
  labelActive: {
    color: Colors.primary,
    fontFamily: "Satoshi_700Bold",
  },
  labelInactive: {
    color: Colors.textTertiary,
  },
});
