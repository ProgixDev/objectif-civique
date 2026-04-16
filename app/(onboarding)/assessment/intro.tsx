import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ChevronLeft, Clock, Sparkles, Target } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { PillButton } from "@/components/ui/PillButton";
import { Card } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";
import { GOAL_LABELS } from "@/data/questions";
import { useSessionStore } from "@/store/sessionStore";
import { ASSESSMENT_QUESTIONS } from "@/data/assessmentQuestions";

export default function AssessmentIntro() {
  const insets = useSafeAreaInsets();
  const user = useUserStore((s) => s.user);
  const startAssessment = useSessionStore((s) => s.startAssessment);

  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : "votre objectif";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Retour"
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>

        <View style={styles.hero}>
          <Image source={Assets.assessment.intro} style={styles.img} resizeMode="contain" />
          <Text style={[Typography.display, styles.title]}>Faisons un point rapide</Text>
          <Text style={[Typography.bodyLarge, styles.subtitle]}>
            5 questions pour évaluer votre niveau et créer un plan adapté à vos besoins.
          </Text>
        </View>

        <Card style={{ marginTop: 24 }}>
          <View style={{ gap: 12 }}>
            <InfoRow icon={<Clock size={18} color={Colors.primary} />}>
              5 questions ~ 2 minutes
            </InfoRow>
            <InfoRow icon={<Target size={18} color={Colors.primary} />}>
              Adapté à votre objectif : {goalLabel}
            </InfoRow>
            <InfoRow icon={<Sparkles size={18} color={Colors.primary} />}>
              Plan personnalisé à la fin
            </InfoRow>
          </View>
        </Card>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
        <PillButton
          label="Commencer"
          size="md"
          variant="primary"
          fullWidth
          onPress={() => {
            startAssessment(ASSESSMENT_QUESTIONS);
            router.replace("/(onboarding)/assessment/0");
          }}
        />
      </View>
    </View>
  );
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
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
  scroll: { padding: 20 },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
    marginBottom: 12,
  },
  hero: { alignItems: "center", padding: 10 },
  img: { width: 200, height: 200 },
  title: { color: Colors.onSurface, textAlign: "center", marginTop: 16 },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  bottom: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
