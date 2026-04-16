import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Colors } from "@/constants/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  value: number; // 0..1
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  gradient?: [string, string];
  children?: React.ReactNode;
};

export function ProgressCircle({
  value,
  size = 120,
  strokeWidth = 12,
  trackColor = Colors.primaryFixed,
  gradient = [Colors.primary, Colors.tertiary],
  children,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = useSharedValue(circumference);

  useEffect(() => {
    const clamped = Math.max(0, Math.min(1, value));
    offset.value = withTiming(circumference * (1 - clamped), {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  }, [value, circumference, offset]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: offset.value,
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgGradient id="pcgrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={gradient[0]} />
            <Stop offset="1" stopColor={gradient[1]} />
          </SvgGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#pcgrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={{ position: "absolute", alignItems: "center", justifyContent: "center" }}>
        {children}
      </View>
    </View>
  );
}
