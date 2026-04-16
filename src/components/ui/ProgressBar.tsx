import React, { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";

type Props = {
  value: number; // 0..1
  height?: number;
  trackColor?: string;
  fillColors?: [string, string];
  style?: ViewStyle;
};

export function ProgressBar({
  value,
  height = 6,
  trackColor = Colors.primaryFixed,
  fillColors = [Colors.tertiary, Colors.tertiary],
  style,
}: Props) {
  const width = useSharedValue(Math.max(0, Math.min(1, value)));

  useEffect(() => {
    width.value = withSpring(Math.max(0, Math.min(1, value)), {
      damping: 18,
      stiffness: 140,
    });
  }, [value, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View
      style={[
        {
          height,
          backgroundColor: trackColor,
          borderRadius: Radius.pill,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={fillColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}
