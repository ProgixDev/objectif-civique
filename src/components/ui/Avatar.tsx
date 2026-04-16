import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

type Props = {
  initials?: string;
  size?: number;
};

export function Avatar({ initials = "?", size = 56 }: Props) {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryContainer]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text
        style={{
          color: Colors.white,
          fontSize: size * 0.35,
          fontFamily: "Inter_700Bold",
        }}
      >
        {initials.slice(0, 2).toUpperCase()}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
