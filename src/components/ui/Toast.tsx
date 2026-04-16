import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/radius";
import { Typography } from "@/constants/typography";
import { Shadows } from "@/constants/shadows";
import { useToastStore, ToastVariant } from "@/store/toastStore";

const color: Record<ToastVariant, string> = {
  success: Colors.tertiary,
  error: Colors.error,
  info: Colors.primary,
};

export function ToastHost() {
  const insets = useSafeAreaInsets();
  const toasts = useToastStore((s) => s.toasts);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.host, { top: insets.top + 8 }]}
    >
      {toasts.map((t) => (
        <MotiView
          key={t.id}
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          transition={{ type: "spring", damping: 22 }}
          style={[styles.toast, { borderLeftColor: color[t.variant] }, Shadows.card]}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 13,
              lineHeight: 18,
              color: Colors.onSurface,
            }}
          >
            {t.message}
          </Text>
        </MotiView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: "absolute",
    left: 12,
    right: 12,
    gap: 8,
    zIndex: 1000,
  },
  toast: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.lg,
    padding: 14,
    borderLeftWidth: 4,
  },
});
