import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { NEWS_ARTICLES, NEWS_CATEGORY_LABELS } from "@/data/news";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsArticleScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = NEWS_ARTICLES.find((a) => a.id === id);

  if (!article) {
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
            Article introuvable
          </Text>
        </View>
      </View>
    );
  }

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
          Actualité
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 40,
        }}
      >
        <View style={styles.catRow}>
          <View style={styles.catPill}>
            <Text style={styles.catPillText}>
              {NEWS_CATEGORY_LABELS[article.category]}
            </Text>
          </View>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.source}>Source : {article.source}</Text>
        <Text style={styles.excerpt}>{article.excerpt}</Text>
        <Text style={styles.body}>{article.body}</Text>
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
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  catPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    fontSize: 12,
    color: Colors.textSecondary,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    lineHeight: 30,
    color: Colors.onSurface,
    marginBottom: 10,
  },
  source: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 16,
  },
  excerpt: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    lineHeight: 24,
    color: Colors.onSurface,
    marginBottom: 16,
    padding: 14,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLow,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  body: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
});
