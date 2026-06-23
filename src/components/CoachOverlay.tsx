import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight, X } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";

export type CoachStep = {
  title: string;
  text: string;
};

type Props = {
  steps: CoachStep[];
  /** Appelé à chaque changement d'étape (pour piloter l'UI dessous). */
  onStepChange?: (index: number) => void;
  /** Fin du guide (terminé ou passé). */
  onFinish: () => void;
};

/**
 * Guide interactif au 1er lancement : fond semi-transparent (on voit l'écran
 * changer dessous) + carte d'explication en bas, navigable étape par étape.
 */
export function CoachOverlay({ steps, onStepChange, onFinish }: Props) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  useEffect(() => {
    onStepChange?.(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (steps.length === 0) return null;
  const current = steps[step];
  const isLast = step >= steps.length - 1;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {/* Voile léger : on garde l'écran visible pour montrer où ça se passe. */}
      <Pressable style={styles.scrim} onPress={onFinish} />

      <View style={[styles.cardWrap, { paddingBottom: insets.bottom + 90 }]}>
        <MotiView
          key={step}
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 220 }}
          style={styles.card}
        >
          <View style={styles.headerRow}>
            <View style={styles.dots}>
              {steps.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === step && styles.dotActive]}
                />
              ))}
            </View>
            <Pressable onPress={onFinish} hitSlop={8} accessibilityLabel="Passer">
              <X size={18} color={Colors.textTertiary} />
            </Pressable>
          </View>

          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.text}>{current.text}</Text>

          <View style={styles.actions}>
            {step > 0 ? (
              <Pressable
                onPress={() => setStep((s) => Math.max(0, s - 1))}
                style={styles.prevBtn}
              >
                <ChevronLeft size={18} color={Colors.primary} />
                <Text style={styles.prevLabel}>Précédent</Text>
              </Pressable>
            ) : (
              <Pressable onPress={onFinish} style={styles.prevBtn}>
                <Text style={styles.prevLabel}>Passer</Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => (isLast ? onFinish() : setStep((s) => s + 1))}
              style={styles.nextBtn}
            >
              <Text style={styles.nextLabel}>
                {isLast ? "Compris !" : "Suivant"}
              </Text>
              {!isLast ? <ChevronRight size={18} color={Colors.white} /> : null}
            </Pressable>
          </View>
        </MotiView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    justifyContent: "flex-end",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,15,30,0.45)",
  },
  cardWrap: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 18,
    shadowColor: "#0A0F1E",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: Colors.outlineVariant,
  },
  dotActive: {
    width: 18,
    backgroundColor: Colors.primary,
  },
  title: {
    ...Typography.h2,
    color: Colors.onSurface,
    marginBottom: 6,
  },
  text: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: 18,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  prevBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  prevLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.primary,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  nextLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.white,
  },
});
