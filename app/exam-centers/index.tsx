import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
} from "react-native";
import { router } from "expo-router";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Search,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { EXAM_CENTERS } from "@/data/examCenters";

export default function ExamCentersScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EXAM_CENTERS;
    return EXAM_CENTERS.filter(
      (c) =>
        c.city.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }, [query]);

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
          placeholder="Rechercher une ville ou un département"
          placeholderTextColor={Colors.textTertiary}
          style={styles.searchInput}
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 40,
        }}
      >
        <Text style={styles.hint}>
          {filtered.length} centre{filtered.length > 1 ? "s" : ""} agréé
          {filtered.length > 1 ? "s" : ""} {query ? "correspondant" : "en France"}
        </Text>

        {filtered.map((c) => (
          <View key={c.id} style={styles.card}>
            <Text style={styles.name}>{c.name}</Text>
            <Text style={styles.dept}>{c.department}</Text>

            <View style={styles.row}>
              <MapPin size={14} color={Colors.primary} />
              <Text style={styles.rowText}>{c.address}</Text>
            </View>

            <Pressable
              style={styles.row}
              onPress={() => Linking.openURL(`tel:${c.phone.replace(/\s/g, "")}`)}
            >
              <Phone size={14} color={Colors.primary} />
              <Text style={[styles.rowText, styles.link]}>{c.phone}</Text>
            </Pressable>

            {c.email ? (
              <Pressable
                style={styles.row}
                onPress={() => Linking.openURL(`mailto:${c.email}`)}
              >
                <Mail size={14} color={Colors.primary} />
                <Text style={[styles.rowText, styles.link]}>{c.email}</Text>
              </Pressable>
            ) : null}

            <View style={styles.servicesRow}>
              {c.services.map((s) => (
                <View key={s} style={styles.servicePill}>
                  <Text style={styles.servicePillText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {filtered.length === 0 ? (
          <Text style={styles.empty}>
            Aucun centre ne correspond à votre recherche.
          </Text>
        ) : null}
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
  dept: {
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
  link: {
    color: Colors.primary,
    fontFamily: "Inter_500Medium",
  },
  servicesRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },
  servicePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: Colors.primaryFixed,
  },
  servicePillText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 0.4,
  },
  empty: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 30,
  },
});
