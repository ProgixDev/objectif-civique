import React, { useState } from "react";
import {
  Image,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as LucideIcons from "lucide-react-native";
import {
  ChevronLeft,
  Mail,
  MessageCircle,
  Phone,
  Share2,
  Sparkles,
  Video,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { PillButton } from "@/components/ui/PillButton";
import { Input } from "@/components/ui/Input";
import { BottomSheet } from "@/components/ui/BottomSheet";
import {
  COACH_SERVICES,
  COACH_STEPS,
  COACH_GUARANTEES,
  COACH_CONTACT,
} from "@/data/coachOffers";
import { toast } from "@/store/toastStore";
import { useHaptics } from "@/hooks/useHaptics";

export default function Coaching() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const [scrolled, setScrolled] = useState(false);
  const [sheetService, setSheetService] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
  });

  const heroHeight = 260;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrolled(e.nativeEvent.contentOffset.y > 200);
  };

  const openSheet = (serviceTitle: string) => {
    haptics.medium();
    setForm((f) => ({ ...f, service: serviceTitle }));
    setSheetService(serviceTitle);
  };

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Veuillez renseigner votre nom et email");
      return;
    }
    setSheetService(null);
    setForm({ name: "", email: "", service: "" });
    toast.success(
      "Demande envoyée — un juriste vous contactera sous 24h ouvrées."
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.hero, { height: heroHeight }]}>
          <Image
            source={Assets.coaching.hero}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,18,69,0.15)", "rgba(0,18,69,0.92)"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.heroTop, { paddingTop: insets.top + 10 }]}>
            <Pressable
              onPress={() => router.back()}
              style={styles.iconBtn}
              accessibilityLabel="Retour"
            >
              <ChevronLeft size={18} color={Colors.white} />
            </Pressable>
            <Pressable
              onPress={() => toast.info("Bientôt partageable")}
              style={styles.iconBtn}
              accessibilityLabel="Partager"
            >
              <Share2 size={16} color={Colors.white} />
            </Pressable>
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroKicker}>SERVICE D'ACCOMPAGNEMENT</Text>
            <Text style={styles.heroTitle} numberOfLines={2}>
              Accompagnement d'excellence pour vos démarches en France
            </Text>
            <Text style={styles.heroSub} numberOfLines={2}>
              Expertise juridique et administrative — 100 % à distance.
            </Text>
          </View>
        </View>

        {/* Trust strip */}
        <View style={styles.trustCard}>
          <TrustItem icon="ShieldCheck" label="Juristes certifiés" />
          <View style={styles.trustDivider} />
          <TrustItem icon="Clock" label="Réponse < 24h" />
          <View style={styles.trustDivider} />
          <TrustItem icon="MapPin" label="France & Canada" />
        </View>

        {/* 6 services */}
        <View style={styles.section}>
          <Text style={styles.sectionKicker}>SERVICES</Text>
          <Text style={styles.sectionTitle}>Nos pôles d'intervention</Text>
          <Text style={styles.sectionDesc}>
            Une ingénierie juridique rigoureuse pour sécuriser et accélérer
            chaque étape de vos démarches.
          </Text>

          <View style={styles.servicesGrid}>
            {COACH_SERVICES.map((s, i) => {
              const Icon =
                (LucideIcons as any)[s.icon] ?? (LucideIcons as any).FileText;
              return (
                <Pressable
                  key={s.id}
                  onPress={() => openSheet(s.title)}
                  style={({ pressed }) => [
                    styles.serviceCard,
                    pressed && { opacity: 0.92 },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={s.title}
                >
                  <View style={styles.serviceTop}>
                    <View style={styles.serviceIconWrap}>
                      <Icon size={20} color={Colors.primary} />
                    </View>
                    <Text style={styles.serviceNumber}>
                      [ {String(i + 1).padStart(2, "0")} ]
                    </Text>
                  </View>
                  <Text style={styles.serviceTitle}>{s.title}</Text>
                  <Text style={styles.serviceDesc} numberOfLines={3}>
                    {s.description}
                  </Text>
                  <Text style={styles.serviceCta}>Découvrir le pôle →</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Méthode 4 étapes */}
        <View style={styles.section}>
          <Text style={styles.sectionKicker}>MÉTHODOLOGIE</Text>
          <Text style={styles.sectionTitle}>Notre processus d'accompagnement</Text>
          <Text style={styles.sectionDesc}>
            Une méthode rigoureuse en quatre étapes pour garantir la clarté, la
            sérénité et l'efficacité de vos démarches.
          </Text>

          <View style={styles.stepsList}>
            {COACH_STEPS.map((step, i) => {
              const Icon =
                (LucideIcons as any)[step.icon] ??
                (LucideIcons as any).ArrowRight;
              return (
                <View key={step.number} style={styles.stepRow}>
                  <View style={styles.stepLeft}>
                    <Text style={styles.stepNumber}>
                      {String(step.number).padStart(2, "0")}
                    </Text>
                    {i < COACH_STEPS.length - 1 ? (
                      <View style={styles.stepConnector} />
                    ) : null}
                  </View>
                  <View style={styles.stepContent}>
                    <View style={styles.stepHeader}>
                      <View style={styles.stepIconWrap}>
                        <Icon size={16} color={Colors.primary} />
                      </View>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                    </View>
                    <Text style={styles.stepDesc}>{step.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Garanties */}
        <View style={styles.section}>
          <Text style={styles.sectionKicker}>GARANTIES & DÉONTOLOGIE</Text>
          <Text style={styles.sectionTitle}>Un cadre rigoureux</Text>

          <View style={{ gap: 10, marginTop: 10 }}>
            {COACH_GUARANTEES.map((g) => {
              const Icon =
                (LucideIcons as any)[g.icon] ?? (LucideIcons as any).Shield;
              return (
                <View key={g.id} style={styles.guaranteeCard}>
                  <View style={styles.guaranteeIcon}>
                    <Icon size={18} color={Colors.white} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.guaranteeTitle}>{g.title}</Text>
                    <Text style={styles.guaranteeDesc}>{g.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Couverture & distance */}
        <View style={styles.section}>
          <View style={styles.coverageCard}>
            <Text style={styles.coverageKicker}>100 % À DISTANCE</Text>
            <Text style={styles.coverageTitle}>
              Nous vous accompagnons partout
            </Text>
            <Text style={styles.coverageDesc}>
              Pas de cabinet physique. Un accompagnement entièrement à distance,
              adapté à votre rythme — depuis la France métropolitaine ou le
              Canada.
            </Text>
            <View style={styles.coverageList}>
              {[
                "Couverture toutes préfectures",
                "OFPRA & CNDA à Paris",
                "Demandes Campus France",
                "Régularisation et naturalisation",
              ].map((item) => (
                <View key={item} style={styles.coverageItem}>
                  <Sparkles size={12} color={Colors.primary} />
                  <Text style={styles.coverageItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionKicker}>NOUS CONTACTER</Text>
          <Text style={styles.sectionTitle}>
            Choisissez le canal qui vous convient
          </Text>
          <Text style={styles.sectionDesc}>Réponse sous 24h ouvrées.</Text>

          <View style={styles.contactGrid}>
            <ContactCard
              icon={<Phone size={18} color={Colors.primary} />}
              label="Téléphone"
              value={COACH_CONTACT.phone}
              onPress={() =>
                Linking.openURL(`tel:${COACH_CONTACT.phoneTel}`).catch(() => {})
              }
            />
            <ContactCard
              icon={<Mail size={18} color={Colors.primary} />}
              label="Email"
              value={COACH_CONTACT.email}
              onPress={() =>
                Linking.openURL(`mailto:${COACH_CONTACT.email}`).catch(
                  () => {}
                )
              }
            />
            <ContactCard
              icon={<MessageCircle size={18} color={Colors.primary} />}
              label="WhatsApp"
              value="Messages urgents"
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/${COACH_CONTACT.whatsapp.replace("+", "")}`
                ).catch(() => {})
              }
            />
            <ContactCard
              icon={<Video size={18} color={Colors.primary} />}
              label="Visioconférence"
              value="Sur rendez-vous"
              onPress={() => openSheet("Visioconférence")}
            />
          </View>

          <Text style={styles.hoursText}>{COACH_CONTACT.hours}</Text>
        </View>
      </ScrollView>

      {scrolled ? (
        <View
          style={[styles.stickyCta, { paddingBottom: insets.bottom + 10 }]}
        >
          <PillButton
            label="Demander un examen de situation"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => openSheet("Examen de situation")}
          />
        </View>
      ) : null}

      <BottomSheet
        visible={sheetService !== null}
        onClose={() => setSheetService(null)}
      >
        <View style={{ paddingBottom: 16 }}>
          <Text style={styles.sheetTitle}>
            {sheetService ?? "Demande d'accompagnement"}
          </Text>
          <Text style={styles.sheetDesc}>
            Un juriste vous recontactera sous 24h ouvrées.
          </Text>
          <View style={{ gap: 10, marginTop: 14 }}>
            <Input
              label="Nom et prénom"
              placeholder="Ex : Jean Dupont"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
              autoCapitalize="words"
            />
            <Input
              label="Email"
              placeholder="vous@email.com"
              value={form.email}
              onChangeText={(v) => setForm({ ...form, email: v })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Nature de votre demande"
              placeholder="Précisez votre situation"
              value={form.service}
              onChangeText={(v) => setForm({ ...form, service: v })}
            />
          </View>
          <PillButton
            label="Demander un premier échange"
            size="md"
            variant="primary"
            fullWidth
            onPress={submit}
            style={{ marginTop: 16 }}
          />
          <Text style={styles.rgpdNotice}>
            Conformément au règlement RGPD, vos informations restent strictement
            confidentielles et sont protégées par le secret professionnel.
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
}

/* ───── helpers ───── */

function TrustItem({ icon, label }: { icon: string; label: string }) {
  const Icon =
    (LucideIcons as any)[icon] ?? (LucideIcons as any).BadgeCheck;
  return (
    <View style={styles.trustItem}>
      <Icon size={14} color={Colors.primary} />
      <Text style={styles.trustLabel}>{label}</Text>
    </View>
  );
}

function ContactCard({
  icon,
  label,
  value,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.contactCard,
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.contactIconWrap}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </Pressable>
  );
}

/* ───── styles ───── */

const cardShadow = {
  shadowColor: "#0A0F1E",
  shadowOpacity: 0.09,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 8 },
  elevation: 5,
} as const;

const styles = StyleSheet.create({
  hero: {
    overflow: "hidden",
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  heroText: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
  },
  heroKicker: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 10,
    letterSpacing: 1.4,
    color: "rgba(255,255,255,0.78)",
  },
  heroTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 22,
    lineHeight: 27,
    color: Colors.white,
    marginTop: 6,
    letterSpacing: -0.3,
  },
  heroSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "rgba(255,255,255,0.85)",
    marginTop: 6,
  },

  trustCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: -18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    ...cardShadow,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  trustLabel: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11,
    color: Colors.onSurface,
  },
  trustDivider: {
    width: 1,
    height: 18,
    backgroundColor: Colors.outlineVariant,
  },

  section: {
    paddingHorizontal: 16,
    marginTop: 26,
  },
  sectionKicker: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11,
    letterSpacing: 1.4,
    color: Colors.primary,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 19,
    lineHeight: 24,
    color: Colors.onSurface,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  sectionDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 14,
  },

  /* Services grid */
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  serviceCard: {
    flexBasis: "47%",
    flexGrow: 1,
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  serviceTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  serviceIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceNumber: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 10,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
  },
  serviceTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
    marginBottom: 4,
  },
  serviceDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    lineHeight: 16,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  serviceCta: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11.5,
    color: Colors.primary,
    letterSpacing: 0.2,
  },

  /* Steps */
  stepsList: {
    marginTop: 6,
  },
  stepRow: {
    flexDirection: "row",
    gap: 14,
  },
  stepLeft: {
    width: 36,
    alignItems: "center",
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
    backgroundColor: "rgba(0,85,164,0.2)",
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 20,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  stepIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  stepDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: 6,
    marginLeft: 36,
  },

  /* Guarantees */
  guaranteeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  guaranteeIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  guaranteeTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13.5,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  guaranteeDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  /* Coverage */
  coverageCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "rgba(0,85,164,0.06)",
    borderWidth: 1,
    borderColor: "rgba(0,85,164,0.18)",
  },
  coverageKicker: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  coverageTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 16,
    color: Colors.onSurface,
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  coverageDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 18,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  coverageList: {
    gap: 6,
  },
  coverageItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  coverageItemText: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12.5,
    color: Colors.onSurface,
  },

  /* Contact */
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contactCard: {
    flexBasis: "47%",
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  contactIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  contactLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
  contactValue: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 12,
    color: Colors.onSurface,
    marginTop: 2,
  },
  hoursText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: "center",
    marginTop: 14,
  },

  /* Sticky CTA */
  stickyCta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: "rgba(204,199,208,0.25)",
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
  rgpdNotice: {
    fontFamily: "Inter_400Regular",
    fontSize: 10.5,
    lineHeight: 14,
    color: Colors.textTertiary,
    marginTop: 12,
    textAlign: "center",
  },
});
