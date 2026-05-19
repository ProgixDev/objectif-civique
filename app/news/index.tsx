import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ChevronLeft, Newspaper, ArrowRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import {
  NEWS_ARTICLES,
  NEWS_CATEGORY_LABELS,
  categorizeArticle,
} from "@/data/news";

function formatDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsList() {
  const insets = useSafeAreaInsets();
  const sorted = [...NEWS_ARTICLES].sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
          Actualités
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 40,
        }}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Newspaper size={20} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>Immigration & naturalisation</Text>
          <Text style={styles.heroSub}>
            Les dernières évolutions législatives et administratives.
          </Text>
        </View>

        {sorted.map((a) => (
          <Pressable
            key={a.id}
            onPress={() =>
              router.push({ pathname: "/news/[id]", params: { id: a.id } })
            }
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View style={styles.catPill}>
                <Text style={styles.catPillText}>
                  {NEWS_CATEGORY_LABELS[categorizeArticle(a)]}
                </Text>
              </View>
              <Text style={styles.date}>{formatDate(a.publishedAt)}</Text>
            </View>
            <Text style={styles.title} numberOfLines={3}>
              {a.title}
            </Text>
            <Text style={styles.excerpt} numberOfLines={3}>
              {a.excerpt}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.source}>{a.source}</Text>
              <ArrowRight size={14} color={Colors.primary} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
    backgroundColor: Colors.surface,
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
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 20,
    marginBottom: 16,
  },
  heroIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.white,
    marginBottom: 4,
  },
  heroSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
  },
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.35)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  catPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: Colors.primaryFixed,
  },
  catPillText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  date: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    lineHeight: 20,
    color: Colors.onSurface,
    marginBottom: 6,
  },
  excerpt: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  source: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: Colors.primary,
  },
});
