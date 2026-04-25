import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import {
  BookOpenCheck,
  ChevronLeft,
  ExternalLink,
  Star,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import {
  GUIDE_INTRO,
  GUIDE_SECTIONS,
  GUIDE_FAQ,
  GUIDE_LINKS,
  GUIDE_TESTIMONIALS,
} from "@/data/guide";

export default function GuideScreen() {
  const insets = useSafeAreaInsets();

  const openUrl = (url: string) => {
    Linking.canOpenURL(url).then((ok) => {
      if (ok) Linking.openURL(url);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
      <GrainyBackground />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 40,
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
          <Text style={styles.topTitle}>Guide</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <BookOpenCheck size={24} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>{GUIDE_INTRO.title}</Text>
          <Text style={styles.heroTagline}>{GUIDE_INTRO.tagline}</Text>
        </View>

        {/* Informational sections */}
        {GUIDE_SECTIONS.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

        {/* Official external links */}
        <Text style={styles.blockHeader}>Liens officiels</Text>
        <View style={styles.linksCard}>
          {GUIDE_LINKS.map((link, i) => (
            <React.Fragment key={link.url}>
              {i > 0 ? <View style={styles.divider} /> : null}
              <Pressable
                onPress={() => openUrl(link.url)}
                style={({ pressed }) => [
                  styles.linkRow,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <View style={styles.linkIcon}>
                  <ExternalLink size={16} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.linkTitle}>{link.title}</Text>
                  <Text style={styles.linkSub} numberOfLines={1}>
                    {link.subtitle}
                  </Text>
                </View>
              </Pressable>
            </React.Fragment>
          ))}
        </View>

        {/* Testimonials */}
        <Text style={styles.blockHeader}>Ils ont réussi leur examen</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.testimonialsRow}
          style={{ marginHorizontal: -20, marginBottom: 8 }}
        >
          {GUIDE_TESTIMONIALS.map((t, i) => (
            <View key={i} style={styles.testimonial}>
              <View style={styles.stars}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    color="#F4B400"
                    fill="#F4B400"
                    strokeWidth={1}
                  />
                ))}
              </View>
              <Text style={styles.testimonialText} numberOfLines={5}>
                « {t.text} »
              </Text>
              <View style={styles.testimonialFooter}>
                <Text style={styles.testimonialName}>{t.name}</Text>
                <Text style={styles.testimonialGoal}>{t.goal}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* FAQ */}
        <Text style={styles.blockHeader}>Questions fréquentes</Text>
        <View style={styles.faqCard}>
          {GUIDE_FAQ.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <View style={styles.divider} /> : null}
              <View style={styles.faqItem}>
                <Text style={styles.faqQ}>{item.q}</Text>
                <Text style={styles.faqA}>{item.a}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
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
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
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
  section: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    ...cardShadow,
  },
  sectionTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 15,
    color: Colors.onSurface,
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  sectionBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13.5,
    lineHeight: 21,
    color: Colors.textSecondary,
  },

  blockHeader: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 24,
    marginBottom: 12,
  },

  linksCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    ...cardShadow,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  linkIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  linkTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  linkSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },

  testimonialsRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
  testimonial: {
    width: 260,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 10,
  },
  testimonialText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.onSurface,
    marginBottom: 12,
    fontStyle: "italic",
  },
  testimonialFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  testimonialName: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
  },
  testimonialGoal: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 0.2,
  },

  faqCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 16,
    ...cardShadow,
  },
  faqItem: {
    paddingVertical: 14,
  },
  faqQ: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13.5,
    color: Colors.primary,
    marginBottom: 6,
    letterSpacing: -0.1,
  },
  faqA: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
  },
});
