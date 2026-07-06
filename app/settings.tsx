import React, { useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight, X } from "lucide-react-native";
import { z } from "zod";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";
import { Input } from "@/components/ui/Input";
import { PillButton } from "@/components/ui/PillButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { QuitModal } from "@/components/QuitModal";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { usePrefsStore } from "@/store/prefsStore";
import { scheduleDailyReminder, cancelDailyReminder } from "@/lib/notifications";
import { toast } from "@/store/toastStore";

const emailSchema = z.string().email();

export default function Settings() {
  const insets = useSafeAreaInsets();
  const user = useUserStore((s) => s.user);
  const updateUser = useUserStore((s) => s.updateUser);
  const resetProgress = useProgressStore((s) => s.reset);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const remindersEnabled = usePrefsStore((s) => s.remindersEnabled);
  const reminderHour = usePrefsStore((s) => s.reminderHour);
  const setRemindersEnabled = usePrefsStore((s) => s.setRemindersEnabled);
  const [notifStreak, setNotifStreak] = useState(true);
  const [soundHaptic, setSoundHaptic] = useState(true);

  const onToggleReminders = async (v: boolean) => {
    if (v) {
      const ok = await scheduleDailyReminder(reminderHour);
      if (!ok) {
        toast.error(
          "Autorise les notifications dans les réglages du téléphone pour activer les rappels."
        );
        return;
      }
      setRemindersEnabled(true);
      toast.success(`Rappel quotidien activé à ${reminderHour}h`);
    } else {
      await cancelDailyReminder();
      setRemindersEnabled(false);
    }
  };
  const [modal, setModal] = useState<"faq" | "cgu" | "privacy" | "legal" | null>(null);
  const [showReset, setShowReset] = useState(false);

  const changed = firstName !== user?.firstName || email !== user?.email;

  const save = () => {
    if (!firstName.trim()) {
      toast.error("Prénom requis");
      return;
    }
    if (!emailSchema.safeParse(email.trim()).success) {
      toast.error("Email invalide");
      return;
    }
    updateUser({ firstName: firstName.trim(), email: email.trim().toLowerCase() });
    toast.success("Modifications enregistrées");
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Retour"
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>
        <Text style={[Typography.h1, { color: Colors.onSurface, flex: 1 }]}>
          Paramètres
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Section title="Mon compte">
          <View style={{ gap: 12 }}>
            <Input label="Prénom" value={firstName} onChangeText={setFirstName} />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <GhostButton
              label="Sauvegarder"
              onPress={save}
              disabled={!changed}
              fullWidth
            />
          </View>
        </Section>

        <Section title="Préférences">
          <ToggleRow
            label="Rappel quotidien de révision"
            value={remindersEnabled}
            onChange={onToggleReminders}
          />
          <ToggleRow
            label="Rappel de série"
            value={notifStreak}
            onChange={setNotifStreak}
          />
          <ToggleRow
            label="Sons et vibrations"
            value={soundHaptic}
            onChange={setSoundHaptic}
          />
          <ToggleRow
            label="Mode sombre (bientôt)"
            value={false}
            onChange={() => {}}
            disabled
          />
        </Section>

        <Section title="Données">
          <Row
            label="Réinitialiser ma progression"
            onPress={() => setShowReset(true)}
          />
          <Row
            label="Exporter mes données"
            onPress={() => toast.info("Bientôt disponible")}
          />
        </Section>

        <Section title="Aide">
          <Row label="FAQ" onPress={() => setModal("faq")} />
          <Row
            label="Contacter le support"
            onPress={() => Linking.openURL("mailto:contact@objectifcivique.fr")}
          />
        </Section>

        <Section title="Légal">
          <Row label="Conditions Générales d'Utilisation" onPress={() => setModal("cgu")} />
          <Row label="Politique de confidentialité" onPress={() => setModal("privacy")} />
          <Row label="Mentions légales" onPress={() => setModal("legal")} />
        </Section>
      </ScrollView>

      <QuitModal
        visible={showReset}
        title="Réinitialiser ma progression ?"
        message="Toutes vos statistiques seront effacées. Cette action est irréversible."
        onCancel={() => setShowReset(false)}
        onConfirm={() => {
          setShowReset(false);
          resetProgress();
          toast.success("Progression réinitialisée");
        }}
      />

      <Modal
        visible={modal !== null}
        animationType="slide"
        onRequestClose={() => setModal(null)}
      >
        <View style={{ flex: 1, backgroundColor: Colors.surface }}>
          <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <Pressable onPress={() => setModal(null)} style={styles.backBtn}>
              <X size={20} color={Colors.primary} />
            </Pressable>
            <Text style={[Typography.h1, { color: Colors.onSurface, flex: 1 }]}>
              {modal === "faq"
                ? "FAQ"
                : modal === "cgu"
                  ? "CGU"
                  : modal === "privacy"
                    ? "Confidentialité"
                    : "Mentions légales"}
            </Text>
          </View>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {modal === "faq" ? (
              <View style={{ gap: 16 }}>
                <FaqItem
                  q="Comment commencer ?"
                  a="Lancez un entraînement depuis l'accueil pour explorer les questions."
                />
                <FaqItem
                  q="Les questions sont-elles officielles ?"
                  a="Oui, les 2500+ questions s'inspirent du bank officiel des examens civiques."
                />
                <FaqItem
                  q="Puis-je utiliser l'application hors-ligne ?"
                  a="Toutes les questions sont disponibles hors-ligne après installation."
                />
                <FaqItem
                  q="Comment changer de langue ?"
                  a="Pour l'instant, la version 1 est uniquement disponible en français."
                />
                <FaqItem
                  q="Comment contacter le support ?"
                  a="Depuis Paramètres > Aide > Contacter le support."
                />
              </View>
            ) : (
              <Text style={[Typography.body, { color: Colors.onSurface, lineHeight: 22 }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ce contenu
                est un placeholder pour la version de démonstration d'Objectif Civique.
              </Text>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={[Typography.h2, { color: Colors.onSurface, marginBottom: 10 }]}>
        {title}
      </Text>
      <View style={{ gap: 8 }}>{children}</View>
    </View>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text
        style={[
          Typography.body,
          { color: disabled ? Colors.textTertiary : Colors.onSurface, flex: 1 },
        ]}
      >
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ true: Colors.primary, false: Colors.outlineVariant }}
        thumbColor={Colors.white}
      />
    </View>
  );
}

function Row({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={[Typography.body, { color: Colors.onSurface, flex: 1 }]}>
        {label}
      </Text>
      <ChevronRight size={18} color={Colors.textTertiary} />
    </Pressable>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <View>
      <Text style={[Typography.bodyLarge, { color: Colors.onSurface, fontFamily: "Inter_600SemiBold" }]}>
        {q}
      </Text>
      <Text style={[Typography.body, { color: Colors.textSecondary, marginTop: 4 }]}>
        {a}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
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
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(204,199,208,0.25)",
    flexDirection: "row",
    alignItems: "center",
  },
});
