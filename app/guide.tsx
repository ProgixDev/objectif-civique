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
  BookOpenCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { GrainyBackground } from "@/components/ui/GrainyBackground";
import { MarkdownView } from "@/components/MarkdownView";
import {
  GUIDE_INTRO,
  GUIDE_TOOLS,
  LIVRET_CHAPTERS,
  COURSES,
  FICHES,
  NOTIONS,
} from "@/data/guide";
import { THEMES, THEME_LABELS } from "@/data/themes";
import { ThemeId } from "@/types";

type Section = "livret" | "courses" | "fiches" | "notions";

const SECTION_META: Record<
  Section,
  { title: string; subtitle: string; icon: string }
> = {
  livret: {
    title: "Livret du citoyen",
    subtitle: `${LIVRET_CHAPTERS.length} chapitres officiels`,
    icon: "BookText",
  },
  courses: {
    title: "Cours",
    subtitle: `${COURSES.length} leçons par thématique`,
    icon: "GraduationCap",
  },
  fiches: {
    title: "Fiches de révision",
    subtitle: `${FICHES.length} fiches pour réviser`,
    icon: "Layers",
  },
  notions: {
    title: "Notions détaillées",
    subtitle: `${NOTIONS.length} questions-réponses`,
    icon: "Lightbulb",
  },
};

export default function GuideScreen() {
  const insets = useSafeAreaInsets();
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  if (activeSection) {
    return (
      <SectionView
        section={activeSection}
        onBack={() => setActiveSection(null)}
      />
    );
  }

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

        {/* 4 sections de contenu pédagogique */}
        <Text style={styles.blockHeader}>Contenus pédagogiques</Text>
        <View style={styles.sectionsGrid}>
          {(Object.keys(SECTION_META) as Section[]).map((key) => {
            const meta = SECTION_META[key];
            const Icon =
              (LucideIcons as any)[meta.icon] ??
              (LucideIcons as any).BookOpen;
            return (
              <Pressable
                key={key}
                onPress={() => setActiveSection(key)}
                style={({ pressed }) => [
                  styles.sectionCard,
                  pressed && { opacity: 0.92 },
                ]}
                accessibilityRole="button"
                accessibilityLabel={meta.title}
              >
                <View style={styles.sectionIconWrap}>
                  <Icon size={22} color={Colors.white} strokeWidth={2.2} />
                </View>
                <Text style={styles.sectionTitle}>{meta.title}</Text>
                <Text style={styles.sectionSub}>{meta.subtitle}</Text>
                <View style={styles.sectionCta}>
                  <Text style={styles.sectionCtaText}>Explorer</Text>
                  <ChevronRight size={14} color={Colors.primary} />
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Outils internes */}
        <Text style={styles.blockHeader}>Outils utiles</Text>
        <View style={styles.toolsCard}>
          {GUIDE_TOOLS.map((tool, i) => {
            const Icon =
              (LucideIcons as any)[tool.icon] ??
              (LucideIcons as any).ArrowRight;
            return (
              <React.Fragment key={tool.route}>
                {i > 0 ? <View style={styles.divider} /> : null}
                <Pressable
                  onPress={() => router.push(tool.route as any)}
                  style={({ pressed }) => [
                    styles.toolRow,
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <View style={styles.toolIcon}>
                    <Icon size={16} color={Colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.toolTitle}>{tool.title}</Text>
                    <Text style={styles.toolSub} numberOfLines={1}>
                      {tool.subtitle}
                    </Text>
                  </View>
                  <ChevronRight size={16} color={Colors.textTertiary} />
                </Pressable>
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

/* ───── Vue de section ───── */

function SectionView({
  section,
  onBack,
}: {
  section: Section;
  onBack: () => void;
}) {
  const insets = useSafeAreaInsets();
  const meta = SECTION_META[section];

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
        <View style={styles.topBar}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.backBtn,
              pressed && { opacity: 0.8 },
            ]}
            accessibilityLabel="Retour au guide"
            hitSlop={6}
          >
            <ChevronLeft size={22} color={Colors.onSurface} />
          </Pressable>
          <Text style={styles.topTitle}>{meta.title}</Text>
          <View style={{ width: 40 }} />
        </View>

        <Text style={styles.sectionSubHeader}>{meta.subtitle}</Text>

        {section === "livret" ? <LivretList /> : null}
        {section === "courses" ? <CoursesList /> : null}
        {section === "fiches" ? <FichesList /> : null}
        {section === "notions" ? <NotionsList /> : null}
      </ScrollView>
    </View>
  );
}

/* ───── Livret citoyen ───── */

function LivretList() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <View style={{ gap: 10 }}>
      {LIVRET_CHAPTERS.map((c) => {
        const isOpen = expanded === c.id;
        return (
          <View key={c.id} style={styles.contentCard}>
            <Pressable
              onPress={() => setExpanded(isOpen ? null : c.id)}
              style={styles.contentHeader}
            >
              <Text style={styles.contentOrder}>
                {String(c.order).padStart(2, "0")}
              </Text>
              <Text style={styles.contentTitle}>{c.title}</Text>
              <ChevronDown
                size={18}
                color={Colors.textTertiary}
                style={{
                  transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
                }}
              />
            </Pressable>
            {isOpen ? (
              <View style={styles.contentBody}>
                <MarkdownView source={c.body} />
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

/* ───── Cours groupés par thème ───── */

function CoursesList() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <View style={{ gap: 16 }}>
      {THEMES.map((theme) => {
        const themeCourses = COURSES.filter((c) => c.themeId === theme.id);
        if (themeCourses.length === 0) return null;
        return (
          <View key={theme.id}>
            <Text style={styles.themeHeader}>{theme.name}</Text>
            <View style={{ gap: 8 }}>
              {themeCourses.map((c) => {
                const isOpen = expanded === c.id;
                return (
                  <View key={c.id} style={styles.contentCard}>
                    <Pressable
                      onPress={() => setExpanded(isOpen ? null : c.id)}
                      style={styles.contentHeader}
                    >
                      <Text style={styles.contentTitle}>{c.title}</Text>
                      <ChevronDown
                        size={18}
                        color={Colors.textTertiary}
                        style={{
                          transform: [
                            { rotate: isOpen ? "180deg" : "0deg" },
                          ],
                        }}
                      />
                    </Pressable>
                    {isOpen ? (
                      <View style={styles.contentBody}>
                        <MarkdownView source={c.body} />
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

/* ───── Fiches de révision ───── */

function FichesList() {
  return (
    <View style={{ gap: 16 }}>
      {THEMES.map((theme) => {
        const themeFiches = FICHES.filter((f) => f.themeId === theme.id);
        if (themeFiches.length === 0) return null;
        return (
          <View key={theme.id}>
            <Text style={styles.themeHeader}>{theme.name}</Text>
            <View style={{ gap: 10 }}>
              {themeFiches.map((f) => (
                <View key={f.id} style={styles.ficheCard}>
                  <Text style={styles.ficheTitle}>{f.title}</Text>
                  <Text style={styles.ficheContent}>{f.content}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

/* ───── Notions détaillées (Q/R) ───── */

function NotionsList() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <View style={{ gap: 16 }}>
      {THEMES.map((theme) => {
        const themeNotions = NOTIONS.filter((n) => n.themeId === theme.id);
        if (themeNotions.length === 0) return null;
        return (
          <View key={theme.id}>
            <Text style={styles.themeHeader}>{theme.name}</Text>
            <View style={{ gap: 8 }}>
              {themeNotions.map((n) => {
                const isOpen = expanded === n.id;
                return (
                  <View key={n.id} style={styles.contentCard}>
                    <Pressable
                      onPress={() => setExpanded(isOpen ? null : n.id)}
                      style={styles.contentHeader}
                    >
                      <Text style={styles.contentTitle}>{n.question}</Text>
                      <ChevronDown
                        size={18}
                        color={Colors.textTertiary}
                        style={{
                          transform: [
                            { rotate: isOpen ? "180deg" : "0deg" },
                          ],
                        }}
                      />
                    </Pressable>
                    {isOpen ? (
                      <View style={styles.contentBody}>
                        <Text style={styles.notionAnswer}>{n.answer}</Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
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
    flex: 1,
    textAlign: "center",
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
  blockHeader: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.onSurface,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 14,
    marginBottom: 12,
  },
  sectionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  sectionCard: {
    flexBasis: "47%",
    flexGrow: 1,
    padding: 14,
    borderRadius: 18,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  sectionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sectionTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
    marginBottom: 2,
  },
  sectionSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  sectionCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sectionCtaText: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 11.5,
    color: Colors.primary,
    letterSpacing: 0.2,
  },
  sectionSubHeader: {
    fontFamily: "Inter_500Medium",
    fontSize: 12.5,
    color: Colors.textSecondary,
    marginBottom: 14,
    marginTop: -4,
  },
  toolsCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 14,
    ...cardShadow,
  },
  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  toolIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(0,85,164,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  toolTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  toolSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(25,28,30,0.08)",
  },

  themeHeader: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 13,
    color: Colors.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 4,
  },
  contentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    ...cardShadow,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
  },
  contentOrder: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 12,
    color: Colors.white,
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 999,
    textAlign: "center",
    lineHeight: 28,
    overflow: "hidden",
  },
  contentTitle: {
    flex: 1,
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.onSurface,
    letterSpacing: -0.1,
  },
  contentBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },

  ficheCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.white,
    ...cardShadow,
  },
  ficheTitle: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.primary,
    letterSpacing: -0.1,
    marginBottom: 8,
  },
  ficheContent: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.onSurface,
  },
  notionAnswer: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.onSurface,
  },
});
