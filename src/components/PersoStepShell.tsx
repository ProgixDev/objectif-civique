import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { PillButton } from "@/components/ui/PillButton";
import { ProgressBar } from "@/components/ui/ProgressBar";

type Props = {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  canContinue: boolean;
  onContinue: () => void;
  onBack?: () => void;
  children: React.ReactNode;
  continueLabel?: string;
};

export function PersoStepShell({
  step,
  total,
  title,
  subtitle,
  canContinue,
  onContinue,
  onBack,
  children,
  continueLabel = "Continuer",
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={onBack ?? (() => router.back())}
          style={styles.backBtn}
          accessibilityLabel="Retour"
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <ProgressBar value={step / total} />
        </View>
        <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
          {step}/{total}
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={[Typography.h1, { color: Colors.onSurface }]}>{title}</Text>
        {subtitle ? (
          <Text
            style={[
              Typography.body,
              { color: Colors.textSecondary, marginTop: 6 },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={{ flex: 1 }}>{children}</View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
        <PillButton
          label={continueLabel}
          variant="primary"
          size="lg"
          fullWidth
          disabled={!canContinue}
          onPress={onContinue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
  },
  header: {
    marginBottom: 20,
  },
  bottom: {
    paddingTop: 10,
  },
});
