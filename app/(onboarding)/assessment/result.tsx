import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { Calendar, Target, TrendingUp, X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { PillButton } from "@/components/ui/PillButton";
import { IconTilePattern } from "@/components/IconTilePattern";
import { useSessionStore } from "@/store/sessionStore";
import { useUserStore } from "@/store/userStore";
import { DEADLINE_LABELS, GOAL_LABELS, LEVEL_LABELS } from "@/data/questions";
import { scoreSession } from "@/lib/quizEngine";

export default function AssessmentResult() {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const session = useSessionStore((s) => s.current);
  const user = useUserStore((s) => s.user);

  const recap = session
    ? scoreSession(session.answers, session.questions)
    : { correct: 0, wrong: 0, skipped: 0, percent: 0, total: 5 };

  const title =
    recap.correct >= 4
      ? "Excellent niveau !"
      : recap.correct >= 2
        ? "Bon début !"
        : "Le travail va payer";

  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : "—";
  const deadlineLabel = user?.deadline ? DEADLINE_LABELS[user.deadline] : "—";
  const levelLabel = user?.level ? LEVEL_LABELS[user.level] : "—";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <IconTilePattern
        height={screenHeight}
        iconSize={28}
        tileOpacity={0.05}
        tintColor="#1a1c1e"
        style={styles.patternLayer}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => router.replace("/(onboarding)/paywall")}
          style={styles.closeBtn}
          accessibilityLabel="Fermer"
        >
          <X size={18} color={Colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={styles.hero}>
          <ProgressCircle
            value={recap.correct / 5}
            size={180}
            strokeWidth={14}
            gradient={[Colors.primary, Colors.tertiary]}
          >
            <Text
              style={{
                fontSize: 40,
                color: Colors.primary,
                fontFamily: "Inter_700Bold",
              }}
            >
              {recap.correct}/5
            </Text>
          </ProgressCircle>

          <Text style={[Typography.display, { color: Colors.onSurface, marginTop: 16, textAlign: "center" }]}>
            {title}
          </Text>
          <Text style={[Typography.bodyLarge, { color: Colors.textSecondary, marginTop: 6, textAlign: "center" }]}>
            {recap.correct} bonnes réponses sur 5 — voici votre plan personnalisé.
          </Text>
        </View>

        <GlassCard style={{ marginTop: 24 }}>
          <View style={{ gap: 10 }}>
            <Row icon={<Target size={18} color={Colors.tertiary} />}>
              Objectif : {goalLabel}
            </Row>
            <Row icon={<Calendar size={18} color={Colors.primary} />}>
              Échéance : {deadlineLabel}
            </Row>
            <Row icon={<TrendingUp size={18} color={Colors.primary} />}>
              Niveau estimé : {levelLabel}
            </Row>
          </View>
        </GlassCard>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginTop: 16 }}
        >
          <Badge label="Programme intensif" variant="info" />
          <Badge label="Révision quotidienne" variant="gold" />
          <Badge label="Coaching humain" variant="success" />
        </ScrollView>

        <PillButton
          label="Voir mon plan personnalisé"
          size="md"
          variant="primary"
          fullWidth
          onPress={() => router.replace("/(onboarding)/paywall")}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      {icon}
      <Text style={[Typography.body, { color: Colors.onSurface, flex: 1 }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 4,
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
  hero: { alignItems: "center", marginTop: 8 },
  patternLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
