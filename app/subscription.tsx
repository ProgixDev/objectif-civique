import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, Stack } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { PaywallPlanCard } from "@/components/PaywallPlanCard";
import { QuitModal } from "@/components/QuitModal";
import { useUserStore } from "@/store/userStore";
import { PLANS, PLAN_LABELS } from "@/data/plans";
import { toast } from "@/store/toastStore";
import { SubscriptionPlan } from "@/types";

const FAQ = [
  {
    q: "Comment annuler mon abonnement ?",
    a: "Vous pouvez annuler depuis cet écran, en bas de page. L'annulation prend effet immédiatement, vos données restent sauvegardées.",
  },
  {
    q: "Suis-je remboursé en cas d'annulation ?",
    a: "Aucun remboursement prorata temporis n'est effectué, mais votre accès reste actif jusqu'à la fin de la période payée.",
  },
  {
    q: "Puis-je changer de formule à tout moment ?",
    a: "Oui. Le changement de formule est immédiat et la différence est calculée automatiquement.",
  },
];

export default function Subscription() {
  const insets = useSafeAreaInsets();
  const user = useUserStore((s) => s.user);
  const updateUser = useUserStore((s) => s.updateUser);
  const currentPlan: SubscriptionPlan = user?.subscriptionPlan ?? "free";

  const [selected, setSelected] = useState<SubscriptionPlan>(currentPlan);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showCancel, setShowCancel] = useState(false);

  const planLabel = PLAN_LABELS[currentPlan];
  const features = PLANS.find((p) => p.id === currentPlan)?.features ?? [
    "Accès aux questions de base",
    "Pas de simulation illimitée",
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h1, { color: Colors.onSurface, flex: 1 }]}>
          Mon abonnement
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <View style={styles.current}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryContainer]}
            style={StyleSheet.absoluteFill}
          />
          <Text
            style={[
              Typography.caption,
              { color: "rgba(255,255,255,0.7)", letterSpacing: 1 },
            ]}
          >
            PLAN ACTUEL
          </Text>
          <Text
            style={[
              Typography.display,
              { color: Colors.white, marginTop: 4 },
            ]}
          >
            {planLabel}
          </Text>
          <Text style={[Typography.caption, { color: "rgba(255,255,255,0.7)" }]}>
            {currentPlan === "lifetime"
              ? "Sans expiration"
              : currentPlan === "free"
                ? "Version gratuite limitée"
                : "Renouvellement automatique"}
          </Text>
          <View style={{ marginTop: 16, gap: 6 }}>
            {features.map((f) => (
              <View key={f} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Check size={14} color={Colors.white} />
                <Text style={[Typography.body, { color: Colors.white }]}>{f}</Text>
              </View>
            ))}
          </View>
          {currentPlan === "free" ? (
            <Text
              style={[
                Typography.caption,
                { color: "rgba(255,255,255,0.9)", marginTop: 12 },
              ]}
            >
              Vous utilisez la version gratuite limitée.
            </Text>
          ) : null}
        </View>

        <Text style={[Typography.h2, { color: Colors.onSurface, marginTop: 24, marginBottom: 12 }]}>
          Changer de formule
        </Text>
        <View style={{ gap: 22 }}>
          {PLANS.map((p) => (
            <PaywallPlanCard
              key={p.id}
              title={p.title}
              price={p.price}
              period={p.period}
              features={p.features}
              highlight={p.id === currentPlan}
              currentBadge={p.id === currentPlan ? "PLAN ACTUEL" : undefined}
              badge={p.id !== currentPlan ? p.badge : undefined}
              selected={selected === p.id}
              onSelect={() => setSelected(p.id)}
            />
          ))}
        </View>

        <PillButton
          label="Confirmer le changement"
          size="md"
          variant="primary"
          fullWidth
          disabled={selected === currentPlan}
          onPress={() => {
            updateUser({ subscriptionPlan: selected });
            toast.success("Plan mis à jour (mode démo)");
          }}
          style={{ marginTop: 16 }}
        />

        <View style={{ gap: 10, marginTop: 16 }}>
          <GhostButton
            label="Restaurer mes achats"
            fullWidth
            onPress={() => toast.info("Bientôt disponible")}
          />
          <Pressable onPress={() => setShowCancel(true)}>
            <Text
              style={[
                Typography.button,
                { color: Colors.error, textAlign: "center", padding: 12 },
              ]}
            >
              Annuler mon abonnement
            </Text>
          </Pressable>
        </View>

        <Text style={[Typography.h2, { color: Colors.onSurface, marginTop: 16, marginBottom: 10 }]}>
          Questions fréquentes
        </Text>
        <View style={{ gap: 8 }}>
          {FAQ.map((f, i) => (
            <Pressable
              key={i}
              onPress={() => setExpanded(expanded === i ? null : i)}
              style={styles.faq}
            >
              <Text
                style={[Typography.bodyLarge, { color: Colors.onSurface, fontFamily: "Inter_600SemiBold" }]}
              >
                {f.q}
              </Text>
              {expanded === i ? (
                <MotiView
                  from={{ opacity: 0, translateY: -4 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "spring", damping: 18 }}
                >
                  <Text
                    style={[
                      Typography.body,
                      { color: Colors.textSecondary, marginTop: 6 },
                    ]}
                  >
                    {f.a}
                  </Text>
                </MotiView>
              ) : null}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <QuitModal
        visible={showCancel}
        title="Annuler l'abonnement ?"
        message="Vous repasserez sur la version gratuite. Vos données restent conservées."
        onCancel={() => setShowCancel(false)}
        onConfirm={() => {
          setShowCancel(false);
          updateUser({ subscriptionPlan: "free" });
          toast.success("Abonnement annulé (mode démo)");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
  },
  current: {
    padding: 20,
    borderRadius: 24,
    overflow: "hidden",
  },
  faq: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
  },
});
