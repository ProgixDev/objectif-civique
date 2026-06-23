import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  SkipForward,
  X,
  XCircle,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { Assets } from "@/constants/assets";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useSessionStore } from "@/store/sessionStore";
import { useUserStore } from "@/store/userStore";
import { scoreSession, isPass, getExplanation } from "@/lib/quizEngine";
import { formatDuration } from "@/lib/formatters";
import { getNextSimulation, isSimLocked } from "@/lib/simulations";
import { effectivePlan } from "@/lib/entitlements";
import { seriesCount } from "@/lib/series";
import { themeQuestions } from "@/store/sessionStore";
import { findCivicTest, CivicTestKind } from "@/data/civicTests";
import { Category, ThemeId } from "@/types";
import { THEMES } from "@/data/themes";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function Results() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    sessionId?: string;
    mode?: string;
    category?: string;
    themeId?: string;
    themeCat?: string;
    testKind?: string;
    subTheme?: string;
    series?: string;
  }>();
  const mode = (params.mode ?? "practice") as "practice" | "simulation" | "theme";

  const session = useSessionStore((s) => s.current);
  const startPractice = useSessionStore((s) => s.startPractice);
  const startSimulation = useSessionStore((s) => s.startSimulation);
  const userGoal = useUserStore((s) => s.user?.goal) ?? null;
  const user = useUserStore((s) => s.user);
  const subscriptionPlan = effectivePlan(user);

  // Pour les simulations thématiques, calcule la simulation suivante
  // (ex: histoire-1 → histoire-2). Null si pas de suite logique.
  const nextSim = useMemo(
    () =>
      mode === "simulation" ? getNextSimulation(session?.simKey, userGoal) : null,
    [mode, session?.simKey, userGoal]
  );

  // La simulation suivante peut être verrouillée (premium uniquement) pour
  // les utilisateurs sans abonnement — on les redirige alors vers le paywall.
  const nextSimLocked = useMemo(
    () => (nextSim ? isSimLocked(nextSim.key, subscriptionPlan) : false),
    [nextSim, subscriptionPlan]
  );

  const [openDetail, setOpenDetail] = useState<number | null>(null);

  const recap = useMemo(
    () =>
      session
        ? scoreSession(session.answers, session.questions)
        : { correct: 0, wrong: 0, skipped: 0, percent: 0, total: 0 },
    [session]
  );

  const durationMs = session?.durationMs ?? 0;
  const passed = isPass(recap.percent, 80);

  // Contexte "série" (révision thème / test) → propose la série suivante.
  const series = params.series ? Number(params.series) : 0;
  const ctxThemeId = params.themeId as ThemeId | undefined;
  const ctxThemeCat = params.themeCat ?? "Tous";
  const ctxTestKind = params.testKind as CivicTestKind | undefined;
  const ctxSubTheme = params.subTheme;
  const isSeriesContext = !!ctxThemeId || (!!ctxTestKind && !!ctxSubTheme);
  const contextTotal = ctxThemeId
    ? themeQuestions(ctxThemeId, ctxThemeCat as any).length
    : ctxTestKind && ctxSubTheme
      ? findCivicTest(ctxTestKind, ctxSubTheme)?.questions.length ?? 0
      : 0;
  const hasNextSeries =
    contextTotal > 0 && series + 1 < seriesCount(contextTotal);

  const goSeries = (s: number) => {
    if (ctxThemeId) {
      router.replace({
        pathname: "/practice/[category]",
        params: {
          category: (params.category as string) ?? "NAT",
          themeId: ctxThemeId,
          themeCat: String(ctxThemeCat),
          series: String(s),
        },
      });
    } else if (ctxTestKind && ctxSubTheme) {
      router.replace({
        pathname: "/practice/[category]",
        params: {
          category: "test",
          testKind: ctxTestKind,
          subTheme: ctxSubTheme,
          series: String(s),
        },
      });
    }
  };

  const wrongQuestions =
    session?.questions
      .map((q, i) => ({ q, i }))
      .filter(({ q }) => {
        const a = session.answers.find((x) => x.questionId === q.id);
        return a && a.selectedIndex !== null && a.selectedIndex !== q.correctIndex;
      }) ?? [];

  // Per-theme breakdown: correct vs total per theme present in this session
  const themeBreakdown = useMemo(() => {
    if (!session) return [] as { id: ThemeId; name: string; correct: number; total: number }[];
    const acc = new Map<ThemeId, { correct: number; total: number }>();
    for (const q of session.questions) {
      const t = q.theme;
      const entry = acc.get(t) ?? { correct: 0, total: 0 };
      entry.total += 1;
      const a = session.answers.find((x) => x.questionId === q.id);
      if (a && a.selectedIndex === q.correctIndex) entry.correct += 1;
      acc.set(t, entry);
    }
    return THEMES.filter((t) => acc.has(t.id)).map((t) => ({
      id: t.id,
      name: t.name,
      correct: acc.get(t.id)!.correct,
      total: acc.get(t.id)!.total,
    }));
  }, [session]);

  const title =
    mode === "simulation"
      ? passed
        ? "Simulation réussie"
        : "Simulation terminée"
      : passed
        ? "Félicitations !"
        : "Continuez vos efforts";

  const subtitle =
    mode === "simulation"
      ? passed
        ? "Vous avez atteint le seuil officiel de 80%."
        : "Continuez les révisions ciblées, vous progressez."
      : passed
        ? "Vous êtes prêt(e) pour l'examen."
        : "Avec quelques révisions ciblées vous y serez bientôt.";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Image source={Assets.branding.icon} style={{ width: 28, height: 28 }} />
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={styles.closeBtn}
          accessibilityLabel="Fermer"
        >
          <X size={18} color={Colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }}>
        {mode === "simulation" ? (
          <View style={{ alignItems: "center", marginBottom: 12 }}>
            <Badge
              label={passed ? "RÉUSSI ✓" : "NON RÉUSSI"}
              variant={passed ? "success" : "error"}
            />
          </View>
        ) : null}

        <View style={{ alignItems: "center", marginTop: 8 }}>
          <ProgressCircle
            value={recap.percent / 100}
            size={200}
            strokeWidth={16}
            gradient={
              passed ? [Colors.primary, Colors.tertiary] : [Colors.secondary, Colors.primary]
            }
          >
            <Text
              style={{
                fontSize: 40,
                color: Colors.primary,
                fontFamily: "Inter_700Bold",
              }}
            >
              {recap.percent}%
            </Text>
            <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
              {recap.correct}/{recap.total}
            </Text>
          </ProgressCircle>

          <Text
            style={[Typography.display, { color: Colors.onSurface, marginTop: 16, textAlign: "center" }]}
          >
            {title}
          </Text>
          <Text
            style={[Typography.bodyLarge, { color: Colors.textSecondary, textAlign: "center", marginTop: 6 }]}
          >
            {subtitle}
          </Text>
        </View>

        {mode === "simulation" ? (
          <GlassCard style={{ marginTop: 16 }} padding={12}>
            <Text style={[Typography.body, { color: Colors.onSurface }]}>
              Vos réponses sont conservées. Touchez une question ci-dessous pour voir l'explication officielle.
            </Text>
          </GlassCard>
        ) : null}

        <View style={styles.grid}>
          <StatTile icon={<Clock size={16} color={Colors.primary} />} label="Durée" value={formatDuration(durationMs)} />
          <StatTile icon={<CheckCircle size={16} color={Colors.success} />} label="Justes" value={recap.correct.toString()} />
          <StatTile icon={<XCircle size={16} color={Colors.error} />} label="Erreurs" value={recap.wrong.toString()} />
          <StatTile icon={<SkipForward size={16} color={Colors.textSecondary} />} label="Sautées" value={recap.skipped.toString()} />
        </View>

        {themeBreakdown.length > 0 ? (
          <View style={{ marginTop: 24 }}>
            <Text
              style={[
                Typography.h2,
                { color: Colors.onSurface, marginBottom: 12 },
              ]}
            >
              Détail par thème
            </Text>
            <View style={styles.themeBreakdownCard}>
              {themeBreakdown.map((t, i) => {
                const pct = t.total ? t.correct / t.total : 0;
                const tone =
                  pct >= 0.8
                    ? Colors.success
                    : pct >= 0.5
                      ? Colors.primary
                      : Colors.secondary;
                return (
                  <React.Fragment key={t.id}>
                    {i > 0 ? <View style={styles.themeDividerBreakdown} /> : null}
                    <View style={styles.themeBreakdownRow}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.themeBreakdownTop}>
                          <Text
                            style={styles.themeBreakdownName}
                            numberOfLines={1}
                          >
                            {t.name}
                          </Text>
                          <Text
                            style={[
                              styles.themeBreakdownScore,
                              { color: tone },
                            ]}
                          >
                            {t.correct}/{t.total}
                          </Text>
                        </View>
                        <ProgressBar
                          value={pct}
                          height={5}
                          trackColor="rgba(25,28,30,0.06)"
                          fillColors={[tone, tone]}
                          style={{ marginTop: 8 }}
                        />
                      </View>
                    </View>
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        ) : null}

        {wrongQuestions.length > 0 ? (
          <View style={{ marginTop: 24 }}>
            <Text style={[Typography.h2, { color: Colors.onSurface, marginBottom: 12 }]}>
              À revoir
            </Text>
            {wrongQuestions.slice(0, 5).map(({ q, i }) => (
              <Pressable
                key={q.id}
                onPress={() => setOpenDetail(i)}
                style={styles.wrongRow}
              >
                <View style={styles.wrongIcon}>
                  <XCircle size={16} color={Colors.error} />
                </View>
                <Text
                  numberOfLines={2}
                  style={[
                    Typography.body,
                    { color: Colors.onSurface, flex: 1 },
                  ]}
                >
                  {q.text}
                </Text>
                <ChevronRight size={18} color={Colors.textTertiary} />
              </Pressable>
            ))}
            {wrongQuestions.length > 5 ? (
              <Text
                style={[
                  Typography.caption,
                  { color: Colors.textTertiary, marginTop: 8, textAlign: "center" },
                ]}
              >
                +{wrongQuestions.length - 5} autres à revoir
              </Text>
            ) : null}
          </View>
        ) : null}

        {recap.percent < 70 ? (
          <GlassCard style={{ marginTop: 24 }}>
            <Text style={[Typography.bodyLarge, { color: Colors.onSurface }]}>
              Un accompagnement humain peut vous aider
            </Text>
            <Text
              style={[
                Typography.body,
                { color: Colors.textSecondary, marginTop: 4 },
              ]}
            >
              Score &lt; 70% — découvrez nos packs d'accompagnement personnalisés.
            </Text>
            <PillButton
              label="Voir l'accompagnement"
              size="md"
              variant="primary"
              fullWidth
              onPress={() => router.push("/coaching")}
              style={{ marginTop: 12 }}
            />
          </GlassCard>
        ) : null}

        <View style={{ gap: 10, marginTop: 24 }}>
          <PillButton
            label="Voir toutes les réponses"
            size="md"
            variant="secondary"
            fullWidth
            rightIcon={<ChevronRight size={16} color={Colors.white} />}
            // Route réelle (app/review.tsx) ; les types de routes typées
            // d'expo-router se régénèrent au lancement/build.
            onPress={() => router.push("/review" as never)}
          />
          {recap.wrong > 0 ? (
            <GhostButton
              label="Voir les erreurs"
              size="md"
              fullWidth
              onPress={() =>
                router.push({
                  pathname: "/review",
                  params: { filter: "wrong" },
                } as never)
              }
            />
          ) : null}
          {mode === "simulation" ? (
            <>
              <PillButton
                label={recap.wrong > 0 ? "Revoir mes erreurs" : "Voir mes statistiques"}
                size="md"
                variant="primary"
                fullWidth
                onPress={() =>
                  recap.wrong > 0
                    ? router.replace("/(tabs)/revise")
                    : router.replace("/(tabs)/progress")
                }
              />
              {nextSim ? (
                nextSimLocked ? (
                  <PillButton
                    label={`Débloquer : ${nextSim.title}`}
                    size="md"
                    variant="secondary"
                    fullWidth
                    rightIcon={
                      <ChevronRight size={16} color={Colors.white} />
                    }
                    onPress={() => router.push("/subscription")}
                  />
                ) : (
                  <PillButton
                    label={`Suivant : ${nextSim.title}`}
                    size="md"
                    variant="secondary"
                    fullWidth
                    rightIcon={
                      <ChevronRight size={16} color={Colors.white} />
                    }
                    onPress={() => {
                      startSimulation({
                        category: nextSim.category,
                        themes: nextSim.themes,
                        label: nextSim.title,
                        simKey: nextSim.key,
                      });
                      router.replace("/simulation/run");
                    }}
                  />
                )
              ) : null}
              <GhostButton
                label="Recommencer la même simulation"
                size="md"
                fullWidth
                onPress={() => {
                  if (!session) return;
                  startSimulation({
                    category: session.category,
                    themes: session.themeId ? [session.themeId] : undefined,
                    simKey: session.simKey,
                  });
                  router.replace("/simulation/run");
                }}
              />
            </>
          ) : (
            <>
              {isSeriesContext ? (
                <PillButton
                  label={hasNextSeries ? "Série suivante" : "Recommencer la série"}
                  size="md"
                  variant="primary"
                  fullWidth
                  rightIcon={<ChevronRight size={16} color={Colors.white} />}
                  onPress={() => goSeries(hasNextSeries ? series + 1 : series)}
                />
              ) : (
                <PillButton
                  label="Questions suivantes"
                  size="md"
                  variant="primary"
                  fullWidth
                  rightIcon={<ChevronRight size={16} color={Colors.white} />}
                  onPress={() => {
                    const cat = (params.category as Category) ?? "NAT";
                    startPractice(cat, 20);
                    router.replace({
                      pathname: "/practice/[category]",
                      params: { category: cat },
                    });
                  }}
                />
              )}
              <GhostButton
                label="Voir mes statistiques"
                size="md"
                fullWidth
                onPress={() => router.replace("/(tabs)/progress")}
              />
            </>
          )}
          <GhostButton
            label="Retour à l'accueil"
            size="md"
            fullWidth
            onPress={() => router.replace("/(tabs)")}
          />
        </View>
      </ScrollView>

      <BottomSheet visible={openDetail !== null} onClose={() => setOpenDetail(null)}>
        {openDetail !== null && session ? (
          <View style={{ paddingBottom: 20 }}>
            <Text style={[Typography.h2, { color: Colors.onSurface }]}>
              Question détaillée
            </Text>
            <Text
              style={[
                Typography.bodyLarge,
                { color: Colors.onSurface, marginTop: 10, lineHeight: 22 },
              ]}
            >
              {session.questions[openDetail].text}
            </Text>
            <View style={{ gap: 8, marginTop: 12 }}>
              {session.questions[openDetail].choices.map((c, i) => {
                const userPick = session.answers.find(
                  (a) => a.questionId === session.questions[openDetail].id
                )?.selectedIndex;
                const correctIndex = session.questions[openDetail].correctIndex;
                const isCorrect = i === correctIndex;
                const isPick = i === userPick;
                const bg = isCorrect
                  ? Colors.successSoft
                  : isPick
                    ? Colors.errorSoft
                    : Colors.surfaceContainerLow;
                const border = isCorrect
                  ? Colors.success
                  : isPick
                    ? Colors.error
                    : Colors.outlineVariant;
                return (
                  <View
                    key={i}
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      backgroundColor: bg,
                      borderWidth: 1.5,
                      borderColor: border,
                    }}
                  >
                    <Text style={[Typography.body, { color: Colors.onSurface }]}>
                      {c}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                marginTop: 16,
                padding: 14,
                backgroundColor: Colors.primaryFixed,
                borderRadius: 12,
                borderLeftWidth: 4,
                borderLeftColor: Colors.primary,
              }}
            >
              <Text
                style={[
                  Typography.caption,
                  { color: Colors.primary, fontFamily: "Inter_700Bold" },
                ]}
              >
                EXPLICATION
              </Text>
              <Text
                style={[
                  Typography.body,
                  { color: Colors.onSurface, marginTop: 6 },
                ]}
              >
                {getExplanation(session.questions[openDetail])}
              </Text>
            </View>
            <PillButton
              label="Fermer"
              size="md"
              variant="primary"
              fullWidth
              onPress={() => setOpenDetail(null)}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : null}
      </BottomSheet>
    </View>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statTile}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {icon}
        <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
          {label}
        </Text>
      </View>
      <Text
        style={[
          Typography.h2,
          { color: Colors.onSurface, marginTop: 4, fontSize: 18 },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 24,
  },
  statTile: {
    width: "47%",
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
  },
  wrongRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    marginBottom: 8,
  },
  wrongIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(183,16,42,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  themeBreakdownCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    shadowColor: "#0A0F1E",
    shadowOpacity: 0.09,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  themeBreakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  themeDividerBreakdown: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },
  themeBreakdownTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  themeBreakdownName: {
    flex: 1,
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  themeBreakdownScore: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
