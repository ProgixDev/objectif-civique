import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ShieldOff } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { BlockedUser, fetchBlockedUsers, unblockUser } from "@/lib/forumApi";
import { toast } from "@/store/toastStore";

/**
 * Liste des utilisateurs bloqués au forum, avec déblocage.
 *
 * Contrepartie indispensable du blocage : l'App Store exige le mécanisme de
 * blocage (guideline 1.2), et un blocage sans retour arrière serait un piège
 * pour l'utilisateur.
 */
export default function BlockedUsers() {
  const insets = useSafeAreaInsets();
  const [users, setUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const data = await fetchBlockedUsers();
    setUsers(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onUnblock = async (u: BlockedUser) => {
    setBusyId(u.id);
    try {
      await unblockUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
      toast.success(`${u.name} a été débloqué.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Déblocage impossible.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={6}>
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
          Utilisateurs bloqués
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {users.length === 0 ? (
            <View style={styles.empty}>
              <ShieldOff size={28} color={Colors.textTertiary} />
              <Text style={styles.emptyText}>
                Vous n'avez bloqué personne. Les utilisateurs que vous bloquez
                depuis le forum apparaîtront ici.
              </Text>
            </View>
          ) : (
            users.map((u) => (
              <View key={u.id} style={styles.row}>
                <Text style={styles.name}>{u.name}</Text>
                <Pressable
                  onPress={() => onUnblock(u)}
                  disabled={busyId === u.id}
                  style={({ pressed }) => [
                    styles.unblockBtn,
                    (pressed || busyId === u.id) && { opacity: 0.6 },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Débloquer ${u.name}`}
                >
                  <Text style={styles.unblockLabel}>Débloquer</Text>
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
      )}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 14,
    marginBottom: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfaceContainerLow,
  },
  name: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.onSurface,
    flex: 1,
  },
  unblockBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
  },
  unblockLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.primary,
  },
  empty: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
