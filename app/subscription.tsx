import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, Stack } from "expo-router";
import { Check, ChevronLeft, Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { PaywallPlanCard } from "@/components/PaywallPlanCard";
import { useUserStore } from "@/store/userStore";
import { PLANS, PLAN_LABELS } from "@/data/plans";
import { usePurchase } from "@/hooks/usePurchase";
import { effectivePlan } from "@/lib/entitlements";
import { pullAll } from "@/lib/sync";
import { toast } from "@/store/toastStore";
import { PaidPlanId, SubscriptionPlan } from "@/types";

const FAQ = [
  {
    q: "Vais-je être prélevé à nouveau ?",
    a: "Non. Toutes les formules sont en paiement unique : vous payez une seule fois pour la durée choisie, sans aucun renouvellement automatique.",
  },
  {
    q: "Que se passe-t-il à la fin de mon accès ?",
    a: "À la fin de la période, votre accès revient en version gratuite. Vous décidez librement si vous souhaitez reprendre un accès.",
  },
  {
    q: "Puis-je prendre une formule plus longue ?",
    a: "Oui, à tout moment. Choisissez simplement la durée qui vous convient ci-dessous.",
  },
];

export default function Subscription() {
  const insets = useSafeAreaInsets();
  const user = useUserStore((s) => s.user);
  const { purchase, loading } = usePurchase();
  const currentPlan: SubscriptionPlan = effectivePlan(user);
  const freeCategory = (user?.goal as string) ?? "NAT";

  const [selected, setSelected] = useState<PaidPlanId>(
    currentPlan === "free" ? "gold" : currentPlan
  );
  const [expanded, setExpanded] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

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
          Mon accès
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
            {currentPlan === "vip"
              ? "Accès à vie, sans expiration"
              : currentPlan === "free"
                ? "Version gratuite limitée"
                : user?.subscriptionExpiresAt
                  ? `Accès jusqu'au ${new Date(
                      user.subscriptionExpiresAt
                    ).toLocaleDateString("fr-FR")} · paiement unique`
                  : "Paiement unique, sans renouvellement"}
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

        {currentPlan === "free" ? (
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
        ) : null}

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
          label={
            loading
              ? "Paiement en cours…"
              : currentPlan === "free"
                ? "Souscrire"
                : "Changer de formule"
          }
          size="md"
          variant="primary"
          fullWidth
          disabled={selected === currentPlan || loading || busy}
          onPress={async () => {
            if (selected === currentPlan || loading) return;
            const result = await purchase(selected);
            if (result.status === "success") {
              toast.success("Forfait mis à jour.");
            } else if (result.status === "error") {
              toast.error(result.message ?? "Le paiement a échoué.");
            }
          }}
          style={{ marginTop: 16 }}
        />

        <View style={{ gap: 10, marginTop: 16 }}>
          <GhostButton
            label="Restaurer mes achats"
            fullWidth
            onPress={async () => {
              if (!user) return;
              setBusy(true);
              const refreshed = await pullAll(user.id);
              setBusy(false);
              if (refreshed && refreshed.subscriptionPlan !== "free") {
                toast.success("Achats restaurés.");
              } else {
                toast.info("Aucun achat actif trouvé pour ce compte.");
              }
            }}
          />
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
  freeTrial: {
    marginTop: 16,
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
