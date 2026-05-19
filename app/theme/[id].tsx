import React, { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import {
  BookOpen,
  ChevronLeft,
  CircleDashed,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { THEMES } from "@/data/themes";
import { QUESTIONS } from "@/data/questions";
import { LESSONS } from "@/data/lessons";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { Category, ThemeId } from "@/types";
import { toast } from "@/store/toastStore";

export default function ThemeDetail() {
  const insets = useSafeAreaInsets();
  const { id, category } = useLocalSearchParams<{
    id?: string;
    category?: string;
  }>();
  const themeId = (id as ThemeId) ?? "institutions";
  const cat = (category as "Tous" | Category) ?? "Tous";

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  const Icon =
    (LucideIcons as any)[theme.icon] ?? LucideIcons.Folder;

  const themeProgress = useProgressStore((s) => s.themeProgress);
  const sessionsHistory = useProgressStore((s) => s.sessionsHistory);
  const startTheme = useSessionStore((s) => s.startTheme);

  const filtered = useMemo(
    () =>
      QUESTIONS.filter(
        (q) =>
          q.theme === themeId &&
          (cat === "Tous" || q.categories.includes(cat as Category))
      ),
    [themeId, cat]
  );

  const progress = themeProgress[themeId] ?? 0;
  const lastSession = sessionsHistory
    .filter((s) => s.type === "theme")
    .at(-1);
  const correctCount = lastSession
    ? Math.round((lastSession.percent / 100) * filtered.length)
    : 0;

  const lesson = LESSONS[themeId];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={20} color={Colors.primary} />
        </Pressable>
        <Text style={styles.screenTitle} numberOfLines={1}>
          {theme.name}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 90 }}>
        <GlassCard padding={14} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={styles.bigIcon}>
              <Icon size={24} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{theme.name}</Text>
              <View style={{ marginTop: 4 }}>
                <Badge label={cat === "Tous" ? "TOUTES CATÉGORIES" : cat} variant="info" />
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatTile label="Total" value={filtered.length.toString()} />
            <StatTile label="Justes" value={correctCount.toString()} />
            <StatTile label="Réussite" value={`${Math.round(progress)}%`} />
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <ProgressBar value={progress / 100} height={5} />
            </View>
            <Text style={styles.percentLabel}>{Math.round(progress)}%</Text>
          </View>

          <PillButton
            label="Commencer la révision"
            size="md"
            variant="primary"
            fullWidth
            onPress={() => {
              if (filtered.length === 0) {
                toast.info("Aucune question dans ce thème pour ce filtre.");
                return;
              }
              startTheme(themeId, Math.min(20, filtered.length));
              router.push({
                pathname: "/practice/[category]",
                params: { category: cat === "Tous" ? "NAT" : cat, themeId },
              });
            }}
            style={{ marginTop: 12 }}
          />
        </GlassCard>

        {lesson ? (
          <View style={styles.lessonBlock}>
            <View style={styles.lessonHeader}>
              <View style={styles.lessonIcon}>
                <BookOpen size={16} color={Colors.primary} />
              </View>
              <Text style={styles.lessonTag}>Cours didactique</Text>
            </View>
            <Text style={styles.lessonIntro}>{lesson.intro}</Text>
            {lesson.sections.map((s, i) => (
              <View key={i} style={styles.lessonSection}>
                <Text style={styles.lessonHeading}>{s.heading}</Text>
                <Text style={styles.lessonBody}>{s.body}</Text>
                {s.subTopics?.length ? (
                  <View style={styles.subTopicList}>
                    {s.subTopics.map((sub, j) => (
                      <View key={j} style={styles.subTopicCard}>
                        <Text style={styles.subTopicTitle}>{sub.title}</Text>
                        <Text style={styles.subTopicSummary}>
                          {sub.summary}
                        </Text>
                        {sub.facts?.length ? (
                          <View style={styles.subTopicFacts}>
                            {sub.facts.map((f, k) => (
                              <Text key={k} style={styles.subTopicFact}>
                                ·  {f}
                              </Text>
                            ))}
                          </View>
                        ) : null}
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
            <View style={styles.keyPointsBox}>
              <Text style={styles.keyPointsTitle}>À retenir</Text>
              {lesson.keyPoints.map((kp, i) => (
                <Text key={i} style={styles.keyPoint}>
                  •  {kp}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Questions</Text>
        <Text style={styles.sectionSub}>Aperçu</Text>

        <View style={{ gap: 8 }}>
          {filtered.slice(0, 5).map((q, i) => (
            <View key={q.id} style={styles.qRow}>
              <View style={styles.numBadge}>
                <Text
                  style={[
                    Typography.caption,
                    { color: Colors.onSurface, fontFamily: "Inter_600SemiBold" },
                  ]}
                >
                  {i + 1}
                </Text>
              </View>
              <Text
                numberOfLines={2}
                style={[Typography.body, { color: Colors.onSurface, flex: 1 }]}
              >
                {q.text}
              </Text>
              <CircleDashed size={18} color={Colors.textTertiary} />
            </View>
          ))}
        </View>

        {filtered.length > 5 ? (
          <GhostButton
            label={`Voir toutes les questions (${filtered.length})`}
            size="md"
            fullWidth
            onPress={() => toast.info("Aperçu complet bientôt disponible")}
            style={{ marginTop: 12 }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={styles.tileValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
  },
  screenTitle: {
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
  },
  cardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.onSurface,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  sectionSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 8,
  },
  percentLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.primary,
  },
  bigIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: Colors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  tile: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerLow,
  },
  tileLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: Colors.textSecondary,
  },
  tileValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    marginTop: 2,
  },
  qRow: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  numBadge: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonBlock: {
    marginBottom: 18,
    padding: 14,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.35)",
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  lessonIcon: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: Colors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonTag: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  lessonIntro: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.onSurface,
    marginBottom: 10,
  },
  lessonSection: {
    marginBottom: 10,
  },
  lessonHeading: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
    marginBottom: 4,
  },
  lessonBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  keyPointsBox: {
    marginTop: 4,
    padding: 12,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primaryFixed,
  },
  keyPointsTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  keyPoint: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.primary,
  },

  subTopicList: {
    marginTop: 10,
    gap: 8,
  },
  subTopicCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "rgba(0,85,164,0.18)",
  },
  subTopicTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 12.5,
    color: Colors.primary,
    letterSpacing: 0.1,
    marginBottom: 4,
  },
  subTopicSummary: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 18,
    color: Colors.onSurface,
  },
  subTopicFacts: {
    marginTop: 6,
    paddingLeft: 4,
    gap: 2,
  },
  subTopicFact: {
    fontFamily: "Inter_500Medium",
    fontSize: 11.5,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
});
