import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Path, Stop } from "react-native-svg";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { DailyStat } from "@/types";

const LABELS = ["L", "M", "M", "J", "V", "S", "D"];

type Props = {
  data: DailyStat[];
  width: number;
  height?: number;
};

export function WeeklyChart({ data, width, height = 140 }: Props) {
  const last7 = useMemo(() => {
    const result: number[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
      const entry = data.find((x) => x.date === key);
      result.push(entry?.successRate ?? 0);
    }
    return result;
  }, [data]);

  const paddingX = 20;
  const paddingY = 16;
  const chartW = Math.max(50, width - paddingX * 2);
  const chartH = height - paddingY * 2;
  const stepX = chartW / 6;

  const max = 100;

  const points = last7.map((v, i) => ({
    x: paddingX + i * stepX,
    y: paddingY + chartH - (v / max) * chartH,
  }));

  const path = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ");

  return (
    <View>
      <Svg width={width} height={height}>
        <Defs>
          <SvgGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={Colors.primary} />
            <Stop offset="1" stopColor={Colors.tertiary} />
          </SvgGradient>
        </Defs>
        <Path
          d={path}
          stroke="url(#chartGrad)"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <Circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={Colors.primary}
            stroke={Colors.white}
            strokeWidth={2}
          />
        ))}
      </Svg>
      <View style={styles.labels}>
        {LABELS.map((l, i) => (
          <Text
            key={i}
            style={[Typography.caption, { color: Colors.textTertiary }]}
          >
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: -8,
  },
});
