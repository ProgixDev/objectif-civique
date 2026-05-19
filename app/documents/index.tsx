import React, { useState, useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  Check,
  ChevronLeft,
  FileText,
  Info,
  Languages,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useUserStore } from "@/store/userStore";
import { useHaptics } from "@/hooks/useHaptics";
import { DOSSIERS } from "@/data/documents";
import { GOAL_LABELS } from "@/data/questions";
import { Category } from "@/types";

export default function DocumentsScreen() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const userGoal = useUserStore((s) => s.user?.goal) ?? "NAT";
  const goal = userGoal as Category;
  const dossier = DOSSIERS[goal];

  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    haptics.light();
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const requiredItems = useMemo(
    () => dossier.items.filter((i) => i.status === "required"),
    [dossier]
  );
  const requiredCheckedCount = useMemo(
    () => requiredItems.filter((i) => checked.has(i.id)).length,
    [requiredItems, checked]
  );
  const completion =
    requiredItems.length > 0
      ? requiredCheckedCount / requiredItems.length
      : 0;

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtn}
            accessibilityLabel="Retour"
            hitSlop={6}
          >
            <ChevronLeft size={22} color={Colors.onSurface} />
          </Pressable>
          <Text style={styles.topTitle}>Pièces du dossier</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconRow}>
            <View style={styles.heroIcon}>
              <FileText size={20} color={Colors.white} />
            </View>
            <View style={styles.goalBadge}>
              <Text style={styles.goalBadgeText}>
                {GOAL_LABELS[goal].toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Préparez votre dossier</Text>
          <Text style={styles.heroTagline}>{dossier.intro}</Text>

          <View style={styles.heroFooter}>
            <View style={styles.langPill}>
              <Languages size={12} color={Colors.white} />
              <Text style={styles.langPillText}>
                Langue requise : {dossier.languageLevel}
              </Text>
            </View>
          </View>
        </View>

        {/* Progression */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>Dossier complété</Text>
            <Text style={styles.progressValue}>
              {requiredCheckedCount}/{requiredItems.length}
            </Text>
          </View>
          <ProgressBar
            value={completion}
            height={6}
            trackColor="rgba(25,28,30,0.06)"
            fillColors={[Colors.primary, Colors.primaryContainer]}
          />
          <Text style={styles.progressHint}>
            Cochez chaque pièce au fur et à mesure que vous la rassemblez.
          </Text>
        </View>

        {/* Sections */}
        {dossier.sections.map((section) => {
          const sectionItems = dossier.items.filter(
            (i) => i.sectionId === section.id
          );
          if (sectionItems.length === 0) return null;

          return (
            <View key={section.id} style={{ marginTop: 18 }}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>{section.title}</Text>
                <Text style={styles.sectionSub}>{section.description}</Text>
              </View>

              <View style={styles.sectionCard}>
                {sectionItems.map((item, i) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <React.Fragment key={item.id}>
                      {i > 0 ? <View style={styles.divider} /> : null}
                      <Pressable
                        onPress={() => toggleItem(item.id)}
                        style={({ pressed }) => [
                          styles.row,
                          pressed && { opacity: 0.85 },
                        ]}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: isChecked }}
                        accessibilityLabel={item.label}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            isChecked && styles.checkboxChecked,
                          ]}
                        >
                          {isChecked ? (
                            <Check
                              size={14}
                              color={Colors.white}
                              strokeWidth={3}
                            />
                          ) : null}
                        </View>
                        <View style={{ flex: 1 }}>
                          <View style={styles.rowTitleLine}>
                            <Text
                              style={[
                                styles.rowTitle,
                                isChecked && styles.rowTitleChecked,
                              ]}
                            >
                              {item.label}
                            </Text>
                            {item.status === "conditional" ? (
                              <View style={styles.condPill}>
                                <Text style={styles.condPillText}>
                                  Selon votre cas
                                </Text>
                              </View>
                            ) : null}
                          </View>
                          {item.detail ? (
                            <Text style={styles.rowDetail}>{item.detail}</Text>
                          ) : null}
                        </View>
                      </Pressable>
                    </React.Fragment>
                  );
                })}
              </View>
            </View>
          );
        })}

        <View style={styles.tipCard}>
          <Info size={16} color={Colors.primary} />
          <Text style={styles.tipText}>
            Cette liste est indicative. La préfecture peut demander des pièces
            complémentaires selon votre situation personnelle.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const cardShadow = {
  shadowColor: "#0A0F1E",
  shadowOpacity: 0.09,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
} as const;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    ...cardShadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  topTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
    letterSpacing: -0.2,
  },
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
  },
  heroIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  heroIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  goalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  goalBadgeText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 10,
    color: Colors.white,
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 20,
    lineHeight: 26,
    color: Colors.white,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  heroTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.88)",
  },
  heroFooter: {
    marginTop: 14,
  },
  langPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  langPillText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11,
    color: Colors.white,
    letterSpacing: 0.3,
  },

  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    ...cardShadow,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  progressValue: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.primary,
  },
  progressHint: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textSecondary,
    marginTop: 8,
  },

  sectionHeader: {
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 14,
    ...cardShadow,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    backgroundColor: Colors.white,
  },
  checkboxChecked: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  rowTitleLine: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  rowTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  rowTitleChecked: {
    color: Colors.textTertiary,
    textDecorationLine: "line-through",
  },
  rowDetail: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  condPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "rgba(245,158,11,0.10)",
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.25)",
  },
  condPillText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 9,
    color: Colors.warning,
    letterSpacing: 0.3,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },

  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "rgba(0,85,164,0.06)",
    borderWidth: 1,
    borderColor: "rgba(0,85,164,0.15)",
    marginTop: 18,
  },
  tipText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
});
