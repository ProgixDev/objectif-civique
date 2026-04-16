import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";

export function LoadingState({ label = "Chargement…" }: { label?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} />
      <Text style={[Typography.body, { color: Colors.textSecondary, marginTop: 10 }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});
