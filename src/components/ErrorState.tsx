import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlertTriangle } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { PillButton } from "./ui/PillButton";

type Props = {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Une erreur est survenue",
  subtitle = "Veuillez réessayer dans un instant.",
  onRetry,
}: Props) {
  return (
    <View style={styles.container}>
      <AlertTriangle size={40} color={Colors.error} />
      <Text style={[Typography.h2, { color: Colors.onSurface, marginTop: 10, textAlign: "center" }]}>
        {title}
      </Text>
      <Text style={[Typography.body, { color: Colors.textSecondary, marginTop: 6, textAlign: "center" }]}>
        {subtitle}
      </Text>
      {onRetry ? (
        <PillButton
          label="Réessayer"
          onPress={onRetry}
          variant="primary"
          size="md"
          style={{ marginTop: 16 }}
        />
      ) : null}
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
