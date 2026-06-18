import React, { useState } from "react";
import {
  Image,
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
  Handshake,
  LifeBuoy,
  LogOut,
  Share2,
  Shield,
  Sparkles,
  Star,
  Trash2,
  User,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { QuitModal } from "@/components/QuitModal";
import { useUserStore } from "@/store/userStore";
import { useProgressStore, getSuccessRate } from "@/store/progressStore";
import { GOAL_LABELS } from "@/data/questions";
import { PLAN_LABELS } from "@/data/plans";
import { toast } from "@/store/toastStore";
import { useHaptics } from "@/hooks/useHaptics";
import { getPresentation } from "@/lib/goalPresentation";
import { effectivePlan } from "@/lib/entitlements";
import { signOut, deleteAccount } from "@/lib/auth";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const user = useUserStore((s) => s.user);
  const progress = useProgressStore();
  const [showLogout, setShowLogout] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onDeleteAccount = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await deleteAccount();
      setShowDelete(false);
      router.replace("/(onboarding)/welcome");
    } catch (err) {
      setShowDelete(false);
      toast.error(
        err instanceof Error ? err.message : "Échec de la suppression."
      );
    } finally {
      setDeleting(false);
    }
  };

  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : "—";
  const presentation = getPresentation(user?.goal ?? null);
  const successRate = getSuccessRate({
    questionsAnswered: progress.questionsAnswered,
    correctCount: progress.correctCount,
  });
  const activePlan = effectivePlan(user);
  const planLabel = PLAN_LABELS[activePlan];
  const planSub =
    activePlan === "vip"
      ? "Accès à vie"
      : activePlan === "free"
        ? "Aucun abonnement actif"
        : activePlan === "discovery"
          ? "Accès Découverte (7 jours)"
          : "Renouvellement automatique";

  const initials = (user?.firstName?.[0] ?? "?").toUpperCase();

  const go = (fn: () => void) => () => {
    haptics.light();
    fn();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 12,
          paddingBottom: 140,
        }}
      >
        {/* Identity card */}
        <View style={styles.identityCard}>
          <View style={styles.identityTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.identityText}>
              <Text style={styles.name} numberOfLines={1}>
                {user?.firstName ?? "Vous"}
              </Text>
              <Text style={styles.email} numberOfLines={1}>
                {user?.email ?? "—"}
              </Text>
            </View>
            <Pressable
              onPress={go(() => router.push("/settings"))}
              style={({ pressed }) => [
                styles.editBtn,
                pressed && { opacity: 0.85 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Modifier le profil"
            >
              <Text style={styles.editBtnText}>Modifier</Text>
            </Pressable>
          </View>

        </View>

        {/* Carte de parcours — communique clairement le cas */}
        {user?.goal ? (
          <View style={styles.goalCard}>
            <LinearGradient
              colors={[Colors.primary, "#003a75"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.goalCardBlob} pointerEvents="none" />

            {presentation.illustration ? (
              <Image
                source={presentation.illustration}
                style={styles.goalCardIllustration}
                resizeMode="contain"
              />
            ) : null}

            <View style={styles.goalCardContent}>
              <Text style={styles.goalCardLabel}>{presentation.banner}</Text>
              <Text style={styles.goalCardTitle}>
                {presentation.longLabel}
              </Text>
              <View style={styles.goalCardRow}>
                <View style={styles.goalCardChip}>
                  <Sparkles size={11} color={Colors.white} />
                  <Text style={styles.goalCardChipText}>
                    Niveau requis · {presentation.languageLevel}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {/* Stats strip */}
        <View style={styles.statsRow}>
          <MiniStat
            value={progress.questionsAnswered.toString()}
            label="Questions"
          />
          <View style={styles.statsDivider} />
          <MiniStat value={`${successRate}%`} label="Réussite" />
          <View style={styles.statsDivider} />
          <MiniStat
            value={`${progress.currentStreak}`}
            label="Série"
          />
        </View>

        {/* Subscription card */}
        <Pressable
          onPress={go(() => router.push("/subscription"))}
          style={({ pressed }) => [
            styles.subCard,
            pressed && { opacity: 0.95 },
          ]}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.subBlob} pointerEvents="none" />
          <View style={{ flex: 1 }}>
            <Text style={styles.subLabel}>ABONNEMENT</Text>
            <Text style={styles.subPlan}>{planLabel}</Text>
            <Text style={styles.subSub}>{planSub}</Text>
          </View>
          <View style={styles.manageBtn}>
            <Text style={styles.manageLabel}>Gérer</Text>
            <ChevronRight size={14} color={Colors.white} />
          </View>
        </Pressable>

        {/* Settings groups */}
        <Text style={styles.sectionLabel}>Compte</Text>
        <View style={styles.group}>
          <Row
            icon={<User size={16} color={Colors.primary} />}
            label="Mon compte"
            onPress={go(() => router.push("/settings"))}
          />
          <Row
            icon={<Bell size={16} color={Colors.primary} />}
            label="Notifications"
            onPress={go(() => router.push("/settings"))}
          />
          <Row
            icon={<Globe size={16} color={Colors.primary} />}
            label="Langue (Français)"
            onPress={go(() => toast.info("Multilingue à venir"))}
            last
          />
        </View>

        <Text style={styles.sectionLabel}>Support</Text>
        <View style={styles.group}>
          <Row
            icon={<LifeBuoy size={16} color={Colors.primary} />}
            label="Aide & FAQ"
            onPress={go(() => router.push("/settings"))}
          />
          <Row
            icon={<Sparkles size={16} color={Colors.primary} />}
            label="Accompagnement"
            onPress={go(() => router.push("/coaching"))}
          />
          <Row
            icon={<Handshake size={16} color={Colors.primary} />}
            label="Programme partenaire"
            onPress={go(() => router.push("/partnership" as any))}
          />
          <Row
            icon={<Star size={16} color={Colors.primary} />}
            label="Noter l'application"
            onPress={go(() => toast.success("Merci !"))}
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
            last
          />
        </View>

        <Text style={styles.sectionLabel}>Légal</Text>
        <View style={styles.group}>
          <Row
            icon={<FileText size={16} color={Colors.primary} />}
            label="Conditions d'utilisation"
            onPress={go(() => router.push("/settings"))}
          />
          <Row
            icon={<Shield size={16} color={Colors.primary} />}
            label="Politique de confidentialité"
            onPress={go(() => router.push("/settings"))}
            last
          />
        </View>

        {/* Logout */}
        <Pressable
          onPress={() => setShowLogout(true)}
          style={({ pressed }) => [
            styles.logoutRow,
            pressed && { opacity: 0.9 },
          ]}
        >
          <View style={styles.logoutIcon}>
            <LogOut size={16} color={Colors.error} />
          </View>
          <Text style={styles.logoutLabel}>Se déconnecter</Text>
          <ChevronRight size={16} color={Colors.error} />
        </Pressable>

        {/* Suppression de compte (RGPD) */}
        <Pressable
          onPress={() => setShowDelete(true)}
          style={({ pressed }) => [
            styles.deleteRow,
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Supprimer mon compte"
        >
          <Trash2 size={14} color={Colors.textTertiary} />
          <Text style={styles.deleteLabel}>Supprimer mon compte</Text>
        </Pressable>

        <Text style={styles.versionText}>Objectif Civique · v1.0.0</Text>

        <QuitModal
          visible={showLogout}
          title="Se déconnecter ?"
          message="Vos données restent sauvegardées."
          onCancel={() => setShowLogout(false)}
          onConfirm={() => {
            setShowLogout(false);
            void signOut();
            router.replace("/(onboarding)/welcome");
          }}
          confirmLabel="Se déconnecter"
        />

        <QuitModal
          visible={showDelete}
          title="Supprimer le compte ?"
          message="Cette action est définitive : votre compte, votre profil et toute votre progression seront effacés. Impossible d'annuler."
          onCancel={() => setShowDelete(false)}
          onConfirm={onDeleteAccount}
          confirmLabel={deleting ? "Suppression…" : "Supprimer définitivement"}
        />
      </ScrollView>
    </View>
  );
}

/* ---------- helpers ---------- */

function Row({
  icon,
  label,
  onPress,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
      <ChevronRight size={16} color={Colors.textTertiary} />
      {!last ? <View style={styles.rowDivider} /> : null}
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

/* ---------- styles ---------- */

const cardShadow = {
  shadowColor: "#0A0F1E",
  shadowOpacity: 0.09,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
} as const;

const styles = StyleSheet.create({
  identityCard: {
    padding: 16,
    borderRadius: 22,
    backgroundColor: Colors.white,
    marginBottom: 14,
    ...cardShadow,
  },
  identityTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  identityText: {
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  avatarText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 20,
    color: Colors.white,
  },
  name: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  email: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  editBtn: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,85,164,0.10)",
  },
  editBtnText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12.5,
    color: Colors.primary,
    letterSpacing: 0.2,
  },
  goalPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(0,85,164,0.08)",
    marginTop: 14,
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  goalPillText: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12,
    color: Colors.primary,
    letterSpacing: 0.2,
    flexShrink: 1,
  },

  goalCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    minHeight: 140,
  },
  goalCardIllustration: {
    position: "absolute",
    top: 10,
    right: 6,
    width: 92,
    height: 92,
  },
  goalCardContent: {
    paddingRight: 86,
  },
  goalCardBlob: {
    position: "absolute",
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  goalCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  goalCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  goalCardLabel: {
    flex: 1,
    fontFamily: "Satoshi_700Bold",
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1.6,
  },
  goalCardTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    lineHeight: 23,
    color: Colors.white,
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  goalCardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalCardChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  goalCardChipText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11,
    color: Colors.white,
    letterSpacing: 0.3,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 14,
    ...cardShadow,
  },
  statsDivider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: "rgba(25,28,30,0.12)",
  },
  mini: {
    flex: 1,
    alignItems: "center",
  },
  miniValue: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  miniLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  subCard: {
    padding: 16,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  subBlob: {
    position: "absolute",
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  subLabel: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1.3,
  },
  subPlan: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 17,
    color: Colors.white,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  subSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: "rgba(255,255,255,0.78)",
    marginTop: 2,
  },
  manageBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 14,
    paddingRight: 12,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  manageLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12.5,
    color: Colors.white,
    letterSpacing: 0.2,
  },

  sectionLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11.5,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 18,
  },
  group: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 14,
    ...cardShadow,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  rowDivider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },

  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderRadius: 18,
    marginTop: 18,
    shadowColor: "#B7102A",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  logoutIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(239,65,53,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutLabel: {
    flex: 1,
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.error,
    letterSpacing: -0.1,
  },

  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    marginTop: 6,
  },
  deleteLabel: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12.5,
    color: Colors.textTertiary,
    letterSpacing: 0.1,
  },

  versionText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textTertiary,
    textAlign: "center",
    marginTop: 20,
  },
});
