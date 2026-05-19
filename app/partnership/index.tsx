import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import {
  ChevronLeft,
  Handshake,
  Mail,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { PillButton } from "@/components/ui/PillButton";
import { Input } from "@/components/ui/Input";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { toast } from "@/store/toastStore";
import { useHaptics } from "@/hooks/useHaptics";
import {
  PARTNER_INTRO,
  PARTNER_PROFILES,
  PARTNER_BENEFITS,
  PARTNER_STEPS,
} from "@/data/partnership";

export default function PartnershipScreen() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    profileType: "",
    audience: "",
  });

  const onSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Veuillez renseigner votre nom et email.");
      return;
    }
    haptics.success();
    setSheetOpen(false);
    setForm({ name: "", email: "", profileType: "", audience: "" });
    toast.success(
      "Candidature envoyée — l'équipe vous contactera sous 48h."
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backBtn,
              pressed && { opacity: 0.8 },
            ]}
            accessibilityLabel="Retour"
            hitSlop={6}
          >
            <ChevronLeft size={22} color={Colors.onSurface} />
          </Pressable>
          <Text style={styles.topTitle}>Programme partenaire</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Handshake size={22} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>{PARTNER_INTRO.title}</Text>
          <Text style={styles.heroTagline}>{PARTNER_INTRO.tagline}</Text>
        </View>

        {/* Qui peut devenir partenaire */}
        <Text style={styles.blockHeader}>Qui peut nous rejoindre ?</Text>
        <View style={styles.profilesGrid}>
          {PARTNER_PROFILES.map((p) => {
            const Icon =
              (LucideIcons as any)[p.icon] ?? (LucideIcons as any).User;
            return (
              <View key={p.id} style={styles.profileCard}>
                <View style={styles.profileIconWrap}>
                  <Icon size={18} color={Colors.primary} />
                </View>
                <Text style={styles.profileTitle}>{p.title}</Text>
                <Text style={styles.profileDesc} numberOfLines={3}>
                  {p.description}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Avantages */}
        <Text style={styles.blockHeader}>Vos avantages</Text>
        <View style={styles.benefitsCard}>
          {PARTNER_BENEFITS.map((b, i) => {
            const Icon =
              (LucideIcons as any)[b.icon] ?? (LucideIcons as any).Star;
            return (
              <React.Fragment key={b.id}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <View style={styles.benefitRow}>
                  <View style={styles.benefitIcon}>
                    <Icon size={18} color={Colors.white} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.benefitTitle}>{b.title}</Text>
                    <Text style={styles.benefitDesc}>{b.description}</Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        {/* Comment devenir partenaire */}
        <Text style={styles.blockHeader}>Comment nous rejoindre ?</Text>
        <View style={styles.stepsList}>
          {PARTNER_STEPS.map((s, i) => (
            <View key={s.number} style={styles.stepRow}>
              <View style={styles.stepNumberWrap}>
                <Text style={styles.stepNumber}>
                  {String(s.number).padStart(2, "0")}
                </Text>
                {i < PARTNER_STEPS.length - 1 ? (
                  <View style={styles.stepConnector} />
                ) : null}
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact */}
        <View style={styles.contactCard}>
          <View style={styles.contactIconWrap}>
            <Mail size={16} color={Colors.primary} />
          </View>
          <Text style={styles.contactText}>
            Une question ?{" "}
            <Text style={styles.contactEmail}>partenaires@objectifcivique.fr</Text>
          </Text>
        </View>
      </ScrollView>

      {/* CTA fixe */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom + 12, 20) },
        ]}
      >
        <PillButton
          label="Devenir partenaire"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => {
            haptics.medium();
            setSheetOpen(true);
          }}
        />
      </View>

      {/* Formulaire candidature */}
      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
        <View style={{ paddingBottom: 16 }}>
          <Text style={styles.sheetTitle}>Candidature partenaire</Text>
          <Text style={styles.sheetDesc}>
            Présentez votre activité — l'équipe vous contacte sous 48h.
          </Text>
          <View style={{ gap: 10, marginTop: 14 }}>
            <Input
              label="Nom / Structure"
              placeholder="Votre nom ou nom de votre organisation"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
            />
            <Input
              label="Email"
              placeholder="contact@exemple.fr"
              value={form.email}
              onChangeText={(v) => setForm({ ...form, email: v })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Type de profil"
              placeholder="YouTubeur, Association, Organisme de formation..."
              value={form.profileType}
              onChangeText={(v) => setForm({ ...form, profileType: v })}
            />
            <Input
              label="Votre audience / activité (facultatif)"
              placeholder="Ex: 15 000 abonnés YouTube, 200 apprenants/an..."
              value={form.audience}
              onChangeText={(v) => setForm({ ...form, audience: v })}
            />
          </View>
          <PillButton
            label="Envoyer ma candidature"
            variant="primary"
            size="md"
            fullWidth
            onPress={onSubmit}
            style={{ marginTop: 16 }}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const cardShadow = {
  shadowColor: "#0A0F1E",
  shadowOpacity: 0.09,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
} as const;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    ...cardShadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  topTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
    letterSpacing: -0.2,
  },
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
  },
  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 22,
    lineHeight: 28,
    color: Colors.white,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  heroTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13.5,
    lineHeight: 20,
    color: "rgba(255,255,255,0.88)",
  },

  blockHeader: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 12,
    marginTop: 10,
  },

  /* Profiles grid */
  profilesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  profileCard: {
    flexBasis: "47%",
    flexGrow: 1,
    padding: 14,
    borderRadius: 18,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  profileIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  profileTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
    marginBottom: 4,
  },
  profileDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    lineHeight: 16,
    color: Colors.textSecondary,
  },

  /* Benefits */
  benefitsCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 12,
    ...cardShadow,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
  },
  benefitIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  benefitTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  benefitDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },

  /* Steps */
  stepsList: {
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: "row",
    gap: 14,
  },
  stepNumberWrap: {
    alignItems: "center",
    width: 36,
  },
  stepNumber: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.white,
    width: 36,
    height: 36,
    borderRadius: 999,
    textAlign: "center",
    lineHeight: 36,
    backgroundColor: Colors.primary,
    overflow: "hidden",
  },
  stepConnector: {
    width: 2,
    flex: 1,
    backgroundColor: "rgba(0,85,164,0.18)",
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 18,
  },
  stepTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
    marginTop: 6,
  },
  stepDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  /* Contact */
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "rgba(0,85,164,0.06)",
    borderWidth: 1,
    borderColor: "rgba(0,85,164,0.15)",
    marginTop: 6,
  },
  contactIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  contactText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
  contactEmail: {
    fontFamily: "Satoshi_700Bold",
    color: Colors.primary,
  },

  /* Bottom CTA */
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "rgba(243,246,251,0.95)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
  },

  /* Sheet */
  sheetTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 19,
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  sheetDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
});
