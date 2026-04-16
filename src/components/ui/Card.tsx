import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { Shadows } from "@/constants/shadows";

type Props = ViewProps & {
  style?: ViewStyle | ViewStyle[];
  padding?: number;
  elevated?: boolean;
};

export function Card({
  children,
  style,
  padding = 16,
  elevated = true,
  ...rest
}: Props) {
  return (
    <View
      style={[
        styles.card,
        elevated ? Shadows.card : undefined,
        { padding },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
  },
});
