import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";
import { ThemeListItem } from "@/components/ThemeListItem";
import { EmptyState } from "@/components/EmptyState";
import { THEMES } from "@/data/themes";
import { QUESTIONS } from "@/data/questions";
import { useProgressStore } from "@/store/progressStore";
import { Category } from "@/types";

const FILTERS: ("Tous" | Category)[] = ["Tous", "CR", "CSP", "NAT"];

export default function Revise() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<"Tous" | Category>("Tous");
  const themeProgress = useProgressStore((s) => s.themeProgress);
  const bookmarks = useProgressStore((s) => s.bookmarks);

  const themeCounts = useMemo(() => {
    return THEMES.reduce<Record<string, number>>((acc, t) => {
      acc[t.id] = QUESTIONS.filter(
        (q) =>
          q.theme === t.id && (selected === "Tous" || q.category === selected)
      ).length;
      return acc;
    }, {});
  }, [selected]);

  const bookmarkedQuestions = QUESTIONS.filter((q) => bookmarks.includes(q.id));

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        padding: 16,
        paddingBottom: 110,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.screenTitle}>Réviser</Text>
        <Text style={styles.screenSub}>
          Choisissez un thème pour vous entraîner.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, marginBottom: 14 }}
      >
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            selected={selected === f}
            onPress={() => setSelected(f)}
          />
        ))}
      </ScrollView>

      <View style={{ gap: 8, marginBottom: 20 }}>
        {THEMES.map((t) => (
          <ThemeListItem
            key={t.id}
            icon={t.icon}
            title={t.name}
            questionCount={themeCounts[t.id] ?? 0}
            progress={themeProgress[t.id] ?? 0}
            onPress={() =>
              router.push({
                pathname: "/theme/[id]",
                params: { id: t.id, category: selected },
              })
            }
          />
        ))}
      </View>

      <View style={styles.bookmarkHeader}>
        <Text style={styles.sectionTitle}>Marqués pour révision</Text>
        <Badge label={`${bookmarkedQuestions.length}`} variant="info" />
      </View>

      {bookmarkedQuestions.length === 0 ? (
        <EmptyState
          icon="Bookmark"
          title="Aucune question marquée"
          subtitle="Touchez l'icône signet pendant un entraînement pour les retrouver ici."
          cta="Commencer un entraînement"
          onCta={() => router.push("/(tabs)")}
        />
      ) : (
        <View style={{ gap: 8 }}>
          {bookmarkedQuestions.slice(0, 5).map((q, i) => (
            <Pressable
              key={q.id}
              onPress={() =>
                router.push({
                  pathname: "/theme/[id]",
                  params: { id: q.theme },
                })
              }
              style={styles.bookmarkRow}
            >
              <View style={styles.numBadge}>
                <Text
                  style={[
                    Typography.caption,
                    {
                      color: Colors.onSurface,
                      fontFamily: "Inter_600SemiBold",
                    },
                  ]}
                >
                  {i + 1}
                </Text>
              </View>
              <Text
                numberOfLines={2}
                style={[Typography.body, { color: Colors.onSurface, flex: 1 }]}
              >
                {q.text}
              </Text>
              <ChevronRight size={16} color={Colors.textTertiary} />
            </Pressable>
          ))}
          {bookmarkedQuestions.length > 5 ? (
            <Text
              style={[
                Typography.caption,
                { color: Colors.textTertiary, textAlign: "center", marginTop: 8 },
              ]}
            >
              Voir tous ({bookmarkedQuestions.length})
            </Text>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    lineHeight: 26,
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  screenSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.onSurface,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  bookmarkHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 4,
  },
  bookmarkRow: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  numBadge: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
});
