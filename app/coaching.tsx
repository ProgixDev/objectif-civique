import React, { useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import {
  BadgeCheck,
  Brain,
  ChevronDown,
  ChevronLeft,
  Clock,
  FileCheck,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { CoachCard } from "@/components/CoachCard";
import { PillButton } from "@/components/ui/PillButton";
import { Input } from "@/components/ui/Input";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { COACH_OFFERS } from "@/data/coachOffers";
import { TESTIMONIALS } from "@/data/testimonials";
import { toast } from "@/store/toastStore";

const TESTIMONIAL_AVATAR = {
  avatar1: Assets.coaching.avatar1,
  avatar2: Assets.coaching.avatar2,
  avatar3: Assets.coaching.avatar3,
};

const FAQ = [
  {
    q: "À quoi sert un coach humain ?",
    a: "Il vous aide à structurer votre préparation, comprendre les subtilités des questions et gérer les démarches administratives.",
  },
  {
    q: "Combien de temps avant l'examen dois-je commencer ?",
    a: "Idéalement 4 à 8 semaines avant, mais un coup de main ponctuel est efficace même à quelques jours de l'examen.",
  },
  {
    q: "Comment se passe une séance ?",
    a: "45 minutes en visioconférence avec un coach certifié, un plan d'action écrit et un suivi entre les séances.",
  },
];

export default function Coaching() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sheetOffer, setSheetOffer] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", date: "" });

  const heroHeight = 260;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrolled(e.nativeEvent.contentOffset.y > 200);
  };

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Veuillez remplir votre nom et email");
      return;
    }
    setSheetOffer(null);
    setForm({ name: "", email: "", date: "" });
    toast.success("Demande envoyée — un coach vous contactera sous 24h.");
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
        <View style={[styles.hero, { height: heroHeight }]}>
          <Image
            source={Assets.coaching.hero}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,18,69,0.15)", "rgba(0,18,69,0.88)"]}
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
            <Text style={styles.heroKicker}>ACCOMPAGNEMENT HUMAIN</Text>
            <Text style={styles.heroTitle} numberOfLines={2}>
              Un coach humain à vos côtés
            </Text>
            <Text style={styles.heroSub} numberOfLines={2}>
              Préparation, démarches, suivi personnalisé.
            </Text>
          </View>
        </View>

        <View style={styles.trustCard}>
          <TrustItem
            icon={<BadgeCheck size={14} color={Colors.primary} />}
            label="Certifiés"
          />
          <View style={styles.trustDivider} />
          <TrustItem
            icon={<Clock size={14} color={Colors.primary} />}
            label="< 24h"
          />
          <View style={styles.trustDivider} />
          <TrustItem
            icon={
              <Star size={14} color={Colors.tertiary} fill={Colors.tertiary} />
            }
            label="4.8/5 (612)"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pourquoi un coach ?</Text>
          <View style={{ gap: 8 }}>
            <ReasonCard
              icon={<FileCheck size={16} color={Colors.primary} />}
              title="Démarches administratives"
              subtitle="Constitution du dossier, courriers, RDV préfecture."
            />
            <ReasonCard
              icon={<Brain size={16} color={Colors.primary} />}
              title="Préparation ciblée"
              subtitle="Analyse de vos faiblesses, plan personnalisé."
            />
            <ReasonCard
              icon={<MessageCircle size={16} color={Colors.primary} />}
              title="Disponibilité humaine"
              subtitle="Vos questions, une réponse rapide et claire."
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisissez votre formule</Text>
          <View style={{ gap: 12 }}>
            {COACH_OFFERS.map((o) => (
              <CoachCard
                key={o.id}
                title={o.title}
                price={o.price}
                period={o.period}
                features={o.features}
                highlight={o.highlight}
                badge={o.badge}
                onChoose={() => setSheetOffer(o.id)}
              />
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
            Ils ont réussi
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={width - 40}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
          >
            {TESTIMONIALS.map((t) => (
              <View
                key={t.id}
                style={[styles.testimonialCard, { width: width - 48 }]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={TESTIMONIAL_AVATAR[t.avatarKey]}
                    style={{ width: 36, height: 36, borderRadius: 999 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.testimonialName}>{t.name}</Text>
                    <Text style={styles.testimonialMeta}>
                      {t.origin} — {t.goal}
                    </Text>
                  </View>
                </View>
                <Text style={styles.testimonialQuote}>« {t.quote} »</Text>
                <View style={{ flexDirection: "row", gap: 2, marginTop: 6 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      color={Colors.tertiary}
                      fill={Colors.tertiary}
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          <View style={{ gap: 6 }}>
            {FAQ.map((f, i) => (
              <Pressable
                key={i}
                onPress={() => setExpanded(expanded === i ? null : i)}
                style={styles.faq}
              >
                <View style={styles.faqHead}>
                  <Text style={styles.faqQ}>{f.q}</Text>
                  <ChevronDown
                    size={16}
                    color={Colors.textSecondary}
                    style={{
                      transform: [
                        { rotate: expanded === i ? "180deg" : "0deg" },
                      ],
                    }}
                  />
                </View>
                {expanded === i ? (
                  <MotiView
                    from={{ opacity: 0, translateY: -4 }}
                    animate={{ opacity: 1, translateY: 0 }}
                  >
                    <Text style={styles.faqA}>{f.a}</Text>
                  </MotiView>
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {scrolled ? (
        <View
          style={[styles.stickyCta, { paddingBottom: insets.bottom + 10 }]}
        >
          <PillButton
            label="Réserver mon coach"
            variant="primary"
            size="md"
            fullWidth
            onPress={() => setSheetOffer("pack3")}
          />
        </View>
      ) : null}

      <BottomSheet
        visible={sheetOffer !== null}
        onClose={() => setSheetOffer(null)}
      >
        <View style={{ paddingBottom: 16 }}>
          <Text style={styles.sheetTitle}>Réserver un coach</Text>
          <Text style={styles.sheetDesc}>
            Laissez-nous vos coordonnées, un coach vous contactera sous 24h.
          </Text>
          <View style={{ gap: 10, marginTop: 12 }}>
            <Input
              label="Nom complet"
              placeholder="Ex: Ibrahima Diallo"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
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
              label="Date souhaitée"
              placeholder="Ex: 15 mai, après-midi"
              value={form.date}
              onChangeText={(v) => setForm({ ...form, date: v })}
            />
          </View>
          <PillButton
            label="Envoyer la demande"
            size="md"
            variant="primary"
            fullWidth
            onPress={submit}
            style={{ marginTop: 14 }}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

function TrustItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <View style={styles.trustItem}>
      {icon}
      <Text style={styles.trustLabel}>{label}</Text>
    </View>
  );
}

function ReasonCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.reason}>
      <View style={styles.reasonIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.reasonTitle}>{title}</Text>
        <Text style={styles.reasonSub}>{subtitle}</Text>
      </View>
    </View>
  );
}

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
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.2,
    color: "rgba(255,255,255,0.75)",
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    lineHeight: 26,
    color: Colors.white,
    marginTop: 4,
    letterSpacing: -0.3,
  },
  heroSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  trustCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: -18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.4)",
    shadowColor: "#191c1e",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
    justifyContent: "center",
  },
  trustLabel: {
    fontFamily: "Inter_600SemiBold",
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
    marginTop: 22,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    color: Colors.onSurface,
    marginBottom: 10,
  },
  reason: {
    padding: 12,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  reasonIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
  },
  reasonTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  reasonSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 15,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  testimonialCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
  },
  testimonialName: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  testimonialMeta: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  testimonialQuote: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: Colors.onSurface,
    fontStyle: "italic",
    marginTop: 10,
  },
  faq: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
  },
  faqHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  faqQ: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.onSurface,
    flex: 1,
  },
  faqA: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: 6,
  },
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
  sheetTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
  },
  sheetDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
