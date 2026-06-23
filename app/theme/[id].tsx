import React, { useMemo, useState } from "react";
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
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PillButton } from "@/components/ui/PillButton";
import { THEMES } from "@/data/themes";
import { QUESTIONS } from "@/data/questions";
import { LESSONS } from "@/data/lessons";
import { getExplanation } from "@/lib/quizEngine";
import { SERIES_SIZE, seriesCount, seriesRange } from "@/lib/series";
import { useProgressStore } from "@/store/progressStore";
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

  // Question dépliée (accordéon) : afficher la réponse directement au clic.
  const [openId, setOpenId] = useState<string | null>(null);

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

  /**
   * Ouvre la révision du thème, positionnée sur la question touchée. L'écran
   * d'entraînement reconstruit une session contenant toutes les questions du
   * thème (pour ce cas), dans le même ordre que la liste affichée ici — d'où
   * la correspondance exacte de `startIndex`.
   */
  /** Ouvre une série donnée (0-based) au début. */
  const openSeries = (seriesIndex: number) => {
    if (filtered.length === 0) {
      toast.info("Aucune question dans ce thème pour ce filtre.");
      return;
    }
    router.push({
      pathname: "/practice/[category]",
      params: {
        category: cat === "Tous" ? "NAT" : cat,
        themeId,
        themeCat: cat,
        series: String(seriesIndex),
        startIndex: "0",
      },
    });
  };

  /**
   * Ouvre la révision positionnée sur la question d'index global `index`
   * (depuis la liste). On déduit la série (paquet de 40) et l'index local.
   */
  const openThemeAt = (index: number) => {
    if (filtered.length === 0) {
      toast.info("Aucune question dans ce thème pour ce filtre.");
      return;
    }
    const seriesIndex = Math.floor(index / SERIES_SIZE);
    const local = index % SERIES_SIZE;
    router.push({
      pathname: "/practice/[category]",
      params: {
        category: cat === "Tous" ? "NAT" : cat,
        themeId,
        themeCat: cat,
        series: String(seriesIndex),
        startIndex: String(local),
      },
    });
  };

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

          {filtered.length <= SERIES_SIZE ? (
            <PillButton
              label="Commencer la révision"
              size="md"
              variant="primary"
              fullWidth
              onPress={() => openSeries(0)}
              style={{ marginTop: 12 }}
            />
          ) : (
            <View style={{ marginTop: 12, gap: 8 }}>
              <Text style={styles.seriesHint}>
                {filtered.length} questions · {seriesCount(filtered.length)} séries
                de {SERIES_SIZE} max
              </Text>
              {Array.from({ length: seriesCount(filtered.length) }).map((_, s) => {
                const { start, end } = seriesRange(s, filtered.length);
                return (
                  <PillButton
                    key={s}
                    label={`Série ${s + 1} · Q${start + 1}–${end}`}
                    size="md"
                    variant={s === 0 ? "primary" : "secondary"}
                    fullWidth
                    onPress={() => openSeries(s)}
                  />
                );
              })}
            </View>
          )}
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

        <View style={styles.questionsHeader}>
          <Text style={styles.sectionTitle}>Questions</Text>
          <Text style={styles.sectionCount}>{filtered.length}</Text>
        </View>
        <Text style={styles.sectionSub}>
          Touchez une question pour voir la réponse.
        </Text>

        <View style={{ gap: 8 }}>
          {filtered.map((q, i) => {
            const open = openId === q.id;
            return (
              <View key={q.id} style={styles.qRow}>
                <Pressable
                  onPress={() => setOpenId(open ? null : q.id)}
                  style={({ pressed }) => [
                    styles.qHeader,
                    pressed && { opacity: 0.85 },
                  ]}
                  accessibilityRole="button"
                >
                  <View style={styles.numBadge}>
                    <Text
                      style={[
                        Typography.caption,
                        {
                          color: Colors.onSurface,
                          fontFamily: "Inter_600SemiBold",
                        },
                      ]}
                    >
                      {i + 1}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={open ? undefined : 2}
                    style={[Typography.body, { color: Colors.onSurface, flex: 1 }]}
                  >
                    {q.text}
                  </Text>
                  {open ? (
                    <ChevronDown size={18} color={Colors.textTertiary} />
                  ) : (
                    <ChevronRight size={18} color={Colors.textTertiary} />
                  )}
                </Pressable>

                {open ? (
                  <View style={styles.answerBlock}>
                    {q.correctIndex >= 0 ? (
                      q.choices.map((choice, ci) => {
                        const isCorrect = ci === q.correctIndex;
                        return (
                          <View
                            key={ci}
                            style={[
                              styles.choiceRow,
                              isCorrect && styles.choiceCorrect,
                            ]}
                          >
                            {isCorrect ? (
                              <Check size={15} color={Colors.success} />
                            ) : (
                              <View style={styles.choiceDot} />
                            )}
                            <Text
                              style={[
                                styles.choiceText,
                                isCorrect && {
                                  color: Colors.success,
                                  fontFamily: "Inter_600SemiBold",
                                },
                              ]}
                            >
                              {choice}
                            </Text>
                          </View>
                        );
                      })
                    ) : null}

                    {getExplanation(q) ? (
                      <View style={styles.explainBox}>
                        <Text style={styles.explainLabel}>Explication</Text>
                        <Text style={styles.explainText}>
                          {getExplanation(q)}
                        </Text>
                      </View>
                    ) : null}

                    <Pressable
                      onPress={() => openThemeAt(i)}
                      style={styles.reviseLink}
                    >
                      <Text style={styles.reviseLinkText}>
                        Réviser cette question →
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
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
  questionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  sectionCount: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.primary,
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
  seriesHint: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.textSecondary,
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
  },
  qHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  answerBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(204,199,208,0.3)",
    gap: 6,
  },
  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainerLow,
  },
  choiceCorrect: {
    backgroundColor: "rgba(34,197,94,0.12)",
  },
  choiceDot: {
    width: 15,
    height: 15,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
  },
  choiceText: {
    ...Typography.body,
    color: Colors.onSurface,
    flex: 1,
    fontSize: 13,
  },
  explainBox: {
    marginTop: 4,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.primaryFixed,
  },
  explainLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  explainText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.onSurface,
  },
  reviseLink: {
    marginTop: 4,
    alignSelf: "flex-start",
  },
  reviseLinkText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.primary,
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
