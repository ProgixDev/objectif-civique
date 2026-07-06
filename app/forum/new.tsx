import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { createThread } from "@/lib/forumApi";
import { toast } from "@/store/toastStore";

const TOPICS = [
  { key: "NAT", label: "Naturalisation" },
  { key: "CSP", label: "CSP" },
  { key: "CR", label: "CR" },
  { key: "general", label: "Général" },
] as const;

export default function NewThread() {
  const insets = useSafeAreaInsets();
  const [topic, setTopic] = useState<(typeof TOPICS)[number]["key"]>("general");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const canPost = title.trim().length >= 5 && body.trim().length >= 10 && !busy;

  const onPublish = async () => {
    if (!canPost) {
      toast.error("Ajoutez un titre (5+) et un message (10+ caractères).");
      return;
    }
    setBusy(true);
    try {
      const thread = await createThread({ title, body, topic });
      toast.success("Discussion publiée.");
      router.replace({
        pathname: "/forum/[threadId]",
        params: { threadId: thread.id },
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Publication impossible.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={6}>
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h2, { color: Colors.onSurface, flex: 1 }]}>
          Nouvelle discussion
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
          <Text style={styles.label}>Catégorie</Text>
          <View style={styles.topicsRow}>
            {TOPICS.map((t) => {
              const active = topic === t.key;
              return (
                <Pressable
                  key={t.key}
                  onPress={() => setTopic(t.key)}
                  style={[styles.topic, active && styles.topicActive]}
                >
                  <Text
                    style={[styles.topicLabel, active && { color: Colors.white }]}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Titre</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex. : Entretien d'assimilation, à quoi s'attendre ?"
            placeholderTextColor={Colors.textTertiary}
            style={styles.input}
            maxLength={140}
          />

          <Text style={styles.label}>Votre message</Text>
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Décrivez votre question ou partagez votre expérience…"
            placeholderTextColor={Colors.textTertiary}
            style={[styles.input, styles.textarea]}
            multiline
            textAlignVertical="top"
          />

          <Pressable
            onPress={onPublish}
            disabled={!canPost}
            style={({ pressed }) => [
              styles.publishBtn,
              !canPost && { opacity: 0.5 },
              pressed && canPost && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.publishLabel}>
              {busy ? "Publication…" : "Publier"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
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
  label: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.onSurface,
    marginBottom: 8,
    marginTop: 8,
  },
  topicsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  topic: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  topicActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  topicLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.onSurface,
  },
  input: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.onSurface,
    marginBottom: 8,
  },
  textarea: { minHeight: 140 },
  publishBtn: {
    marginTop: 16,
    height: 52,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  publishLabel: { ...Typography.button, color: Colors.white, fontSize: 16 },
});
