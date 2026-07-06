import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { RotateCw, Shield, Sparkles, X, XCircle } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { PaywallPlanCard } from "@/components/PaywallPlanCard";
import { PillButton } from "@/components/ui/PillButton";
import { Badge } from "@/components/ui/Badge";
import { PLANS } from "@/data/plans";
import { usePurchase } from "@/hooks/usePurchase";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/store/toastStore";
import { PaidPlanId } from "@/types";

export default function Paywall() {
  const insets = useSafeAreaInsets();
  const { purchase, loading } = usePurchase();
  const [selected, setSelected] = useState<PaidPlanId | null>("gold");
  const goal = useUserStore((s) => s.user?.goal);
  const freeCategory = (goal as string) ?? "NAT";

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={styles.closeBtn}
          accessibilityLabel="Ignorer"
        >
          <X size={18} color={Colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Sparkles size={14} color={Colors.tertiaryOnSoft} />
            <Badge label="VOTRE PLAN EST PRÊT" variant="gold" />
          </View>
          <Text style={[Typography.display, { color: Colors.onSurface }]}>
            Choisissez votre formule
          </Text>
          <Text style={[Typography.bodyLarge, { color: Colors.textSecondary, marginTop: 6 }]}>
            Accédez à 3 500+ questions, aux simulations et à tout le contenu —
            en un seul paiement, sans abonnement.
          </Text>
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/practice/[category]",
              params: { category: freeCategory, freeOfficial: "1" },
            })
          }
          style={({ pressed }) => [styles.freeTrial, pressed && { opacity: 0.9 }]}
          accessibilityRole="button"
          accessibilityLabel="Simuler 40 questions gratuitement"
        >
          <Sparkles size={16} color={Colors.success} />
          <Text style={styles.freeTrialText}>
            Simuler 40 questions gratuitement
          </Text>
        </Pressable>

        <View style={{ gap: 18, marginTop: 24, paddingHorizontal: 20 }}>
          {PLANS.map((p) => (
            <PaywallPlanCard
              key={p.id}
              title={p.title}
              price={p.price}
              period={p.period}
              features={p.features}
              highlight={p.highlight}
              badge={p.badge}
              selected={selected === p.id}
              onSelect={() => setSelected(p.id)}
            />
          ))}
        </View>

        <View style={styles.trustRow}>
          <TrustItem icon={<Shield size={16} color={Colors.primary} />} label="Paiement sécurisé" />
          <TrustItem icon={<XCircle size={16} color={Colors.primary} />} label="Sans renouvellement" />
          <TrustItem icon={<RotateCw size={16} color={Colors.primary} />} label="Annulable" />
        </View>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
        <PillButton
          label={loading ? "Paiement en cours…" : "Continuer"}
          size="md"
          variant="primary"
          fullWidth
          disabled={!selected || loading}
          onPress={async () => {
            if (!selected || loading) return;
            const result = await purchase(selected);
            if (result.status === "success") {
              toast.success("Forfait activé. Bienvenue !");
              router.replace("/(tabs)");
            } else if (result.status === "error") {
              toast.error(result.message ?? "Le paiement a échoué.");
            }
            // "canceled" : l'utilisateur a fermé la feuille, on ne fait rien.
          }}
        />
        <Pressable
          style={{ marginTop: 12 }}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text
            style={[
              Typography.button,
              {
                color: Colors.textTertiary,
                textAlign: "center",
                textDecorationLine: "underline",
              },
            ]}
          >
            Continuer en version gratuite limitée
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={{ alignItems: "center", gap: 4 }}>
      {icon}
      <Text style={[Typography.caption, { color: Colors.textSecondary }]}>{label}</Text>
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
  trustRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: "rgba(204,199,208,0.25)",
  },
  freeTrial: {
    marginTop: 16,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.success,
  },
  freeTrialText: {
    ...Typography.button,
    color: Colors.success,
    fontSize: 15,
  },
});
