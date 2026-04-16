import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  Award,
  ChevronLeft,
  Clock,
  EyeOff,
  ListChecks,
  Pause,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { useSessionStore } from "@/store/sessionStore";

export default function SimulationIntro() {
  const insets = useSafeAreaInsets();
  const startSimulation = useSessionStore((s) => s.startSimulation);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: insets.top + 12,
          paddingBottom: 20,
        }}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={20} color={Colors.primary} />
        </Pressable>

        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Image
            source={Assets.simulation.intro}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
          <Text style={styles.heroTitle}>Simulation examen blanc</Text>
          <Text style={styles.heroDesc}>
            Conditions réelles : 40 questions, 45 minutes, sans correction
            immédiate.
          </Text>
        </View>

        <GlassCard style={{ marginTop: 18 }} padding={14}>
          <Text style={styles.sectionTitle}>Règles</Text>
          <View style={{ gap: 8, marginTop: 8 }}>
            <Rule icon={<Clock size={16} color={Colors.primary} />} text="45 minutes chronométrées" />
            <Rule icon={<ListChecks size={16} color={Colors.primary} />} text="40 questions officielles" />
            <Rule icon={<Award size={16} color={Colors.primary} />} text="Seuil de réussite : 80% (32/40)" />
            <Rule icon={<EyeOff size={16} color={Colors.primary} />} text="Correction visible à la fin" />
            <Rule icon={<Pause size={16} color={Colors.primary} />} text="Pas de pause possible" />
          </View>
        </GlassCard>

        <View style={{ gap: 8, marginTop: 18, paddingBottom: insets.bottom + 12 }}>
          <PillButton
            label="Commencer la simulation"
            size="md"
            variant="primary"
            fullWidth
            onPress={() => {
              startSimulation();
              router.replace("/simulation/run");
            }}
          />
          <GhostButton label="Plus tard" size="md" fullWidth onPress={() => router.back()} />
        </View>
      </ScrollView>
    </View>
  );
}

function Rule({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      {icon}
      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: Colors.onSurface, flex: 1 }}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    lineHeight: 26,
    color: Colors.onSurface,
    textAlign: "center",
    marginTop: 12,
    letterSpacing: -0.3,
  },
  heroDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
});
