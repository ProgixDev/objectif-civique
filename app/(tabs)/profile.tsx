import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  Bell,
  ChevronRight,
  FileText,
  Globe,
  LifeBuoy,
  LogOut,
  Share2,
  Shield,
  Sparkles,
  Star,
  User,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { GlassCard } from "@/components/ui/GlassCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { QuitModal } from "@/components/QuitModal";
import { useUserStore } from "@/store/userStore";
import { useProgressStore, getSuccessRate } from "@/store/progressStore";
import { GOAL_LABELS } from "@/data/questions";
import { PLAN_LABELS } from "@/data/plans";
import { toast } from "@/store/toastStore";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const progress = useProgressStore();
  const [showLogout, setShowLogout] = useState(false);

  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : "—";
  const successRate = getSuccessRate({
    questionsAnswered: progress.questionsAnswered,
    correctCount: progress.correctCount,
  });
  const planLabel = user ? PLAN_LABELS[user.subscriptionPlan] : "Gratuit";
  const planSub =
    user?.subscriptionPlan === "lifetime"
      ? "Sans expiration"
      : user?.subscriptionPlan === "free"
        ? "Aucun abonnement actif"
        : "Renouvellement automatique";

  const initials = (user?.firstName?.[0] ?? "?").toUpperCase();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
        paddingTop: insets.top + 12,
        paddingBottom: 120,
      }}
    >
      <GlassCard padding={14} style={{ marginBottom: 14 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Avatar initials={initials} size={48} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user?.firstName ?? "Vous"}</Text>
            <Text style={styles.email} numberOfLines={1}>
              {user?.email ?? "—"}
            </Text>
            <View style={{ marginTop: 5 }}>
              <Badge label={goalLabel} variant="gold" />
            </View>
          </View>
          <GhostButton
            label="Modifier"
            size="sm"
            onPress={() => router.push("/settings")}
          />
        </View>
      </GlassCard>

      <View style={styles.statsRow}>
        <MiniStat value={progress.questionsAnswered.toString()} label="Questions" />
        <MiniStat value={`${successRate}%`} label="Réussite" />
        <MiniStat value={`${progress.currentStreak}`} label="Série" />
      </View>

      <Pressable
        onPress={() => router.push("/subscription")}
        style={[styles.subCard]}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryContainer]}
          style={StyleSheet.absoluteFill}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.subLabel}>ABONNEMENT</Text>
          <Text style={styles.subPlan}>{planLabel}</Text>
          <Text style={styles.subSub}>{planSub}</Text>
        </View>
        <View style={styles.manageBtn}>
          <Text style={styles.manageLabel}>Gérer</Text>
        </View>
      </Pressable>

      <View style={{ gap: 6, marginTop: 16 }}>
        <Row
          icon={<User size={16} color={Colors.primary} />}
          label="Mon compte"
          onPress={() => router.push("/settings")}
        />
        <Row
          icon={<Bell size={16} color={Colors.primary} />}
          label="Notifications"
          onPress={() => router.push("/settings")}
        />
        <Row
          icon={<Globe size={16} color={Colors.primary} />}
          label="Langue (Français)"
          onPress={() => toast.info("Multilingue à venir")}
        />
        <Row
          icon={<LifeBuoy size={16} color={Colors.primary} />}
          label="Aide & FAQ"
          onPress={() => router.push("/settings")}
        />
        <Row
          icon={<FileText size={16} color={Colors.primary} />}
          label="Conditions d'utilisation"
          onPress={() => router.push("/settings")}
        />
        <Row
          icon={<Shield size={16} color={Colors.primary} />}
          label="Politique de confidentialité"
          onPress={() => router.push("/settings")}
        />
        <Row
          icon={<Sparkles size={16} color={Colors.primary} />}
          label="Coaching humain"
          onPress={() => router.push("/coaching")}
        />
        <Row
          icon={<Star size={16} color={Colors.primary} />}
          label="Noter l'application"
          onPress={() => toast.success("Merci !")}
        />
        <Row
          icon={<Share2 size={16} color={Colors.primary} />}
          label="Partager Objectif Civique"
          onPress={() =>
            Share.share({
              message:
                "Préparez votre examen civique avec Objectif Civique — https://objectifcivique.fr",
            }).catch(() => {})
          }
        />
      </View>

      <View style={{ gap: 6, marginTop: 14 }}>
        <Pressable onPress={() => setShowLogout(true)} style={styles.row}>
          <View style={styles.rowIconErr}>
            <LogOut size={16} color={Colors.error} />
          </View>
          <Text style={[styles.rowLabel, { color: Colors.error }]}>
            Se déconnecter
          </Text>
          <ChevronRight size={16} color={Colors.textTertiary} />
        </Pressable>
      </View>

      <Text
        style={[
          Typography.caption,
          { color: Colors.textTertiary, textAlign: "center", marginTop: 16 },
        ]}
      >
        Objectif Civique v1.0.0
      </Text>

      <QuitModal
        visible={showLogout}
        title="Se déconnecter ?"
        message="Vos données restent sauvegardées."
        onCancel={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          clearUser();
          router.replace("/(onboarding)/welcome");
        }}
        confirmLabel="Se déconnecter"
      />
    </ScrollView>
  );
}

function Row({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={[styles.rowLabel, { flex: 1 }]}>{label}</Text>
      <ChevronRight size={16} color={Colors.textTertiary} />
    </Pressable>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.mini}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.onSurface,
  },
  email: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  mini: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    alignItems: "center",
  },
  miniValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.primary,
  },
  miniLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  subCard: {
    padding: 14,
    borderRadius: Radius.lg,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  subLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1,
  },
  subPlan: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.white,
    marginTop: 2,
  },
  subSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginTop: 1,
  },
  manageBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  manageLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.white,
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
  },
  rowIconErr: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "rgba(183,16,42,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.onSurface,
  },
});
