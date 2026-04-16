import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check, X } from "lucide-react-native";
import { MotiView } from "moti";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { useHaptics } from "@/hooks/useHaptics";

export type AnswerState =
  | "idle"
  | "selected"
  | "correct"
  | "wrong"
  | "missed";

type Props = {
  letter: string;
  text: string;
  state: AnswerState;
  onPress: () => void;
  disabled?: boolean;
};

export const AnswerOption = React.memo(function AnswerOption({
  letter,
  text,
  state,
  onPress,
  disabled,
}: Props) {
  const haptics = useHaptics();

  const borderColor =
    state === "correct"
      ? Colors.success
      : state === "wrong"
        ? Colors.error
        : state === "missed"
          ? Colors.success
          : state === "selected"
            ? Colors.primary
            : Colors.outlineVariant;

  const bg =
    state === "correct"
      ? Colors.successSoft
      : state === "wrong"
        ? Colors.errorSoft
        : state === "missed"
          ? "rgba(16,185,129,0.05)"
          : Colors.surfaceContainerLowest;

  const letterBg =
    state === "correct"
      ? Colors.success
      : state === "wrong"
        ? Colors.error
        : state === "selected"
          ? Colors.primary
          : state === "missed"
            ? Colors.primaryFixed
            : Colors.surfaceContainerLow;

  const letterFg =
    state === "correct" || state === "wrong" || state === "selected"
      ? Colors.white
      : state === "missed"
        ? Colors.primary
        : Colors.onSurface;

  const Icon =
    state === "correct" || state === "missed"
      ? Check
      : state === "wrong"
        ? X
        : null;

  return (
    <MotiView
      from={{ scale: 1 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 18, stiffness: 220 }}
    >
      <Pressable
        onPress={() => {
          if (disabled) return;
          haptics.light();
          onPress();
        }}
        disabled={
          disabled ||
          state === "correct" ||
          state === "wrong" ||
          state === "missed"
        }
        style={[
          styles.container,
          { borderColor, backgroundColor: bg },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Option ${letter}: ${text}`}
      >
        <View style={[styles.letter, { backgroundColor: letterBg }]}>
          {Icon ? (
            <Icon size={16} color={letterFg} />
          ) : (
            <Text style={[Typography.button, { color: letterFg }]}>{letter}</Text>
          )}
        </View>
        <Text
          style={[
            Typography.bodyLarge,
            { color: Colors.onSurface, flex: 1, lineHeight: 22 },
          ]}
        >
          {text}
        </Text>
      </Pressable>
    </MotiView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 44,
    borderWidth: 1.5,
  },
  letter: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
