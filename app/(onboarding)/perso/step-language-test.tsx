import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  CalendarClock,
  Check,
  ChevronLeft,
  Languages,
  XCircle,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Colors } from "@/constants/colors";
import { Shadows } from "@/constants/shadows";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PillButton } from "@/components/ui/PillButton";
import { useHaptics } from "@/hooks/useHaptics";
import { useUserStore } from "@/store/userStore";
import { LanguageCertLevel, LanguageTestStatus } from "@/types";

type StatusKey = LanguageTestStatus;

const STATUS_OPTIONS: Array<{
  key: StatusKey;
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}> = [
  {
    key: "passed",
    title: "Oui, je l'ai déjà passé",
    description:
      "J'ai une attestation officielle (TCF, TEF, DELF/DALF, DCL).",
    Icon: Languages,
  },
  {
    key: "not_yet",
    title: "Non, pas encore",
    description:
      "Je n'ai pas encore passé de test officiel de français.",
    Icon: XCircle,
  },
  {
    key: "planned",
    title: "Prévu prochainement",
    description: "Date de test déjà fixée ou inscription en cours.",
    Icon: CalendarClock,
  },
];

const LEVELS: LanguageCertLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function StepLanguageTest() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const updateUser = useUserStore((s) => s.updateUser);
  const goal = useUserStore((s) => s.user?.goal);
  const existingStatus = useUserStore((s) => s.user?.languageTestStatus);
  const existingLevel = useUserStore((s) => s.user?.languageCertLevel);

  const [status, setStatus] = useState<StatusKey | null>(existingStatus ?? null);
  const [level, setLevel] = useState<LanguageCertLevel | null>(
    existingLevel ?? null
  );

  const isNat = goal === "NAT";
  // NAT path: step-1 (1) → civic (2) → language (3) → deadline (4) → level (5) → companion (6)
  // Other path: step-1 (1) → language (2) → deadline (3) → level (4) → companion (5)
  const step = isNat ? 3 : 2;
  const total = isNat ? 6 : 5;

  const canConfirm =
    status === "not_yet" ||
    status === "planned" ||
    (status === "passed" && level !== null);

  const onConfirm = () => {
    if (!canConfirm || !status) return;
    updateUser({
      languageTestStatus: status,
      languageCertLevel: status === "passed" ? level : null,
    });
    router.push("/(onboarding)/perso/step-2");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Retour"
          hitSlop={8}
        >
          <ChevronLeft size={22} color={Colors.onSurface} />
        </Pressable>
        <View style={styles.progressWrap}>
          <ProgressBar
            value={step / total}
            height={6}
            trackColor="#E8EAEF"
            fillColors={[Colors.primary, Colors.primary]}
          />
        </View>
        <Text style={styles.stepCounter}>
          {step}
          <Text style={styles.stepCounterMuted}>/{total}</Text>
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            ÉTAPE {step} SUR {total}
          </Text>
          <Text style={styles.title}>
            Avez-vous passé votre test de niveau de langue française ?
          </Text>
          <Text style={styles.subtitle}>
            Un test officiel (TCF, TEF, DELF/DALF, DCL) est exigé pour valider
            votre niveau auprès de l'administration.
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {STATUS_OPTIONS.map((opt, i) => {
            const selected = status === opt.key;
            const Icon = opt.Icon;
            return (
              <MotiView
                key={opt.key}
                from={{ opacity: 0, translateY: 12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "timing",
                  duration: 320,
                  delay: 80 + i * 60,
                }}
              >
                <Pressable
                  onPress={() => {
                    haptics.light();
                    setStatus(opt.key);
                    if (opt.key !== "passed") setLevel(null);
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={opt.title}
                  style={({ pressed }) => [
                    styles.card,
                    selected && styles.cardSelected,
                    pressed && {
                      opacity: 0.9,
                      transform: [{ scale: 0.995 }],
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.iconTile,
                      selected && styles.iconTileSelected,
                    ]}
                  >
                    <Icon
                      size={24}
                      color={selected ? Colors.success : Colors.onSurface}
                    />
                  </View>
                  <View style={styles.cardText}>
                    <Text
                      style={[
                        styles.cardTitle,
                        selected && { color: Colors.success },
                      ]}
                    >
                      {opt.title}
                    </Text>
                    <Text style={styles.cardDescription}>
                      {opt.description}
                    </Text>
                  </View>
                  <View style={[styles.radio, selected && styles.radioSelected]}>
                    {selected ? (
                      <Check size={14} color={Colors.white} strokeWidth={3} />
                    ) : null}
                  </View>
                </Pressable>
              </MotiView>
            );
          })}
        </View>

        {status === "passed" ? (
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 260 }}
            style={styles.levelBlock}
          >
            <Text style={styles.levelLabel}>Niveau obtenu</Text>
            <View style={styles.chipsRow}>
              {LEVELS.map((l) => {
                const isSel = level === l;
                return (
                  <Pressable
                    key={l}
                    onPress={() => {
                      haptics.light();
                      setLevel(l);
                    }}
                    style={[styles.chip, isSel && styles.chipSelected]}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSel }}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSel && { color: Colors.white },
                      ]}
                    >
                      {l}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </MotiView>
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom + 12, 20) },
        ]}
      >
        <PillButton
          label="Continuer"
          variant="primary"
          size="lg"
          disabled={!canConfirm}
          onPress={onConfirm}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.outlineVariant,
  },
  progressWrap: { flex: 1 },
  stepCounter: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    minWidth: 32,
    textAlign: "right",
  },
  stepCounterMuted: {
    color: Colors.textTertiary,
    fontFamily: "Satoshi_600SemiBold",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: { marginBottom: 24 },
  eyebrow: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.primary,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: "#E8EAEF",
    ...Shadows.soft,
  },
  cardSelected: {
    borderColor: Colors.success,
    borderWidth: 2,
    backgroundColor: "rgba(16,185,129,0.05)",
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4F7",
  },
  iconTileSelected: {
    backgroundColor: "rgba(16,185,129,0.15)",
  },
  cardText: { flex: 1 },
  cardTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 16,
    lineHeight: 22,
    color: Colors.onSurface,
    marginBottom: 2,
  },
  cardDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  radioSelected: {
    borderColor: Colors.success,
    backgroundColor: Colors.success,
  },
  levelBlock: {
    marginTop: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: "#E8EAEF",
    ...Shadows.soft,
  },
  levelLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F2F4F7",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
    letterSpacing: 0.4,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
});
