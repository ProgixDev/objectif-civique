import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft, MapPin, Search } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { EXAM_CENTERS, ExamCenter } from "@/data/examCenters";

const SEARCH_DEBOUNCE_MS = 250;

export default function ExamCentersScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return EXAM_CENTERS;
    return EXAM_CENTERS.filter(
      (c) =>
        c.cityLabel.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.postalCode.includes(q)
    );
  }, [debouncedQuery]);

  const renderItem = useCallback(
    ({ item }: { item: ExamCenter }) => <CenterCard center={item} />,
    []
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
          Centres d'examen
        </Text>
      </View>

      <View style={styles.searchWrap}>
        <Search size={16} color={Colors.textTertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Rechercher une ville, un centre ou un code postal"
          placeholderTextColor={Colors.textTertiary}
          style={styles.searchInput}
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 40,
        }}
        ListHeaderComponent={
          <Text style={styles.hint}>
            {filtered.length} centre{filtered.length > 1 ? "s" : ""}{" "}
            {debouncedQuery ? "correspondant" : "agréés en France"}
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aucun centre ne correspond à votre recherche.
          </Text>
        }
        initialNumToRender={10}
        maxToRenderPerBatch={12}
        windowSize={7}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const CenterCard = React.memo(function CenterCard({
  center,
}: {
  center: ExamCenter;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{center.name}</Text>
      <Text style={styles.city}>
        {center.cityLabel} · {center.postalCode}
      </Text>

      <View style={styles.row}>
        <MapPin size={14} color={Colors.primary} />
        <Text style={styles.rowText}>{center.address}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.onSurface,
    padding: 0,
  },
  hint: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.35)",
  },
  name: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: Colors.onSurface,
  },
  city: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  rowText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
  },
  empty: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 30,
  },
});
