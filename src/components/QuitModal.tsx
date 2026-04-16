import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

export function QuitModal({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel = "Quitter",
  cancelLabel = "Annuler",
  destructive = true,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.bg}>
        <View style={styles.card}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: Colors.onSurface,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              lineHeight: 18,
              color: Colors.textSecondary,
              marginTop: 4,
            }}
          >
            {message}
          </Text>
          <View style={styles.actions}>
            <GhostButton
              label={cancelLabel}
              onPress={onCancel}
              size="sm"
              style={{ flex: 1 }}
            />
            <PillButton
              label={confirmLabel}
              variant={destructive ? "destructive" : "primary"}
              onPress={onConfirm}
              size="sm"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "rgba(25,28,30,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 18,
    padding: 16,
    width: "100%",
    maxWidth: 340,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
});
