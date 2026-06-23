import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Check, ChevronLeft, X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { useSessionStore } from "@/store/sessionStore";
import { getExplanation } from "@/lib/quizEngine";

/**
 * Revue complète des réponses de la dernière session (tous types : entraînement,
 * thème, simulation). Pour chaque question : choix de l'utilisateur vs bonne
 * réponse, puis explication. Lit la session courante du store.
 */
export default function ReviewAnswers() {
  const insets = useSafeAreaInsets();
  const session = useSessionStore((s) => s.current);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={6}>
          <ChevronLeft size={20} color={Colors.primary} />
        </Pressable>
        <Text style={styles.screenTitle}>Revoir mes réponses</Text>
      </View>

      {!session || session.questions.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Aucune réponse à afficher.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
          {session.questions.map((q, qi) => {
            const userPick =
              session.answers.find((a) => a.questionId === q.id)?.selectedIndex ??
              null;
            const answeredCorrectly = userPick === q.correctIndex;

            return (
              <View key={q.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.qNum}>Question {qi + 1}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      {
                        backgroundColor: answeredCorrectly
                          ? "rgba(34,197,94,0.14)"
                          : userPick === null
                            ? Colors.surfaceContainerLow
                            : "rgba(183,16,42,0.10)",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: answeredCorrectly
                            ? Colors.success
                            : userPick === null
                              ? Colors.textSecondary
                              : Colors.error,
                        },
                      ]}
                    >
                      {answeredCorrectly
                        ? "Juste"
                        : userPick === null
                          ? "Sautée"
                          : "Faux"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.qText}>{q.text}</Text>

                <View style={{ gap: 6, marginTop: 10 }}>
                  {q.choices.map((c, ci) => {
                    const isCorrect = ci === q.correctIndex;
                    const isPick = ci === userPick;
                    return (
                      <View
                        key={ci}
                        style={[
                          styles.choiceRow,
                          isCorrect && styles.choiceCorrect,
                          isPick && !isCorrect && styles.choiceWrong,
                        ]}
                      >
                        {isCorrect ? (
                          <Check size={15} color={Colors.success} />
                        ) : isPick ? (
                          <X size={15} color={Colors.error} />
                        ) : (
                          <View style={styles.choiceDot} />
                        )}
                        <Text
                          style={[
                            styles.choiceText,
                            isCorrect && {
                              color: Colors.success,
                              fontFamily: "Inter_600SemiBold",
                            },
                            isPick && !isCorrect && { color: Colors.error },
                          ]}
                        >
                          {c}
                        </Text>
                        {isPick ? (
                          <Text style={styles.tag}>Votre réponse</Text>
                        ) : null}
                      </View>
                    );
                  })}
                </View>

                {getExplanation(q) ? (
                  <View style={styles.explainBox}>
                    <Text style={styles.explainLabel}>Explication</Text>
                    <Text style={styles.explainText}>{getExplanation(q)}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
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
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
  },
  screenTitle: {
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.onSurface,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.textSecondary,
  },
  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.3)",
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  qNum: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  statusText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
  },
  qText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
    color: Colors.onSurface,
  },
  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainerLow,
  },
  choiceCorrect: {
    backgroundColor: "rgba(34,197,94,0.12)",
  },
  choiceWrong: {
    backgroundColor: "rgba(183,16,42,0.08)",
  },
  choiceDot: {
    width: 15,
    height: 15,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
  },
  choiceText: {
    ...Typography.body,
    color: Colors.onSurface,
    flex: 1,
    fontSize: 13,
  },
  tag: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: Colors.textSecondary,
  },
  explainBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.primaryFixed,
  },
  explainLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: Colors.primary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  explainText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.onSurface,
  },
});
