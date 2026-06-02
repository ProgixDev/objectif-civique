import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Check,
  ChevronLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Input } from "@/components/ui/Input";
import { PillButton } from "@/components/ui/PillButton";
import { AppleIcon, GoogleIcon } from "@/components/SocialIcons";
import { signUpWithEmail } from "@/lib/auth";
import { useHaptics } from "@/hooks/useHaptics";
import { toast } from "@/store/toastStore";

const schema = z.object({
  firstName: z.string().min(2, "Prénom trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
  acceptCgu: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les CGU" }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors }, setValue, watch } =
    useForm<FormData>({
      resolver: zodResolver(schema) as any,
      defaultValues: {
        firstName: "",
        email: "",
        password: "",
        acceptCgu: false as unknown as true,
      },
    });
  const acceptCgu = watch("acceptCgu");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // 1) Crée le compte côté backend (auth + profil + progression) — bloquant.
      await signUpWithEmail({
        firstName: data.firstName,
        email: data.email,
        password: data.password,
      });

      // 2) Haptique en fire-and-forget — ne doit jamais bloquer la navigation.
      Promise.resolve(haptics.success()).catch(() => {});

      // 3) Navigation vers le 1er écran de perso.
      router.replace("/(onboarding)/perso/step-1");
    } catch (err) {
      // Message d'erreur traduit renvoyé par lib/auth.
      const msg =
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer.";
      toast.error(msg);
      console.warn("[sign-up] onSubmit failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.ivory }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 12 }]}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Retour"
          hitSlop={6}
        >
          <ChevronLeft size={22} color={Colors.primary} />
        </Pressable>

        <View style={{ marginBottom: 28 }}>
          <Text style={[Typography.display, { color: Colors.onSurface }]}>
            Créer un compte
          </Text>
          <Text
            style={[
              Typography.bodyLarge,
              { color: Colors.textSecondary, marginTop: 4 },
            ]}
          >
            Quelques infos pour personnaliser votre parcours.
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Prénom"
                placeholder="Ex: Ibrahima"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                leftIcon={<User size={18} color={Colors.primary} />}
                error={errors.firstName?.message}
                autoCapitalize="words"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Email"
                placeholder="vous@email.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                leftIcon={<Mail size={18} color={Colors.primary} />}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Mot de passe"
                placeholder="Au moins 6 caractères"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                leftIcon={<Lock size={18} color={Colors.primary} />}
                secureTextEntry={!showPwd}
                rightIcon={
                  <Pressable
                    onPress={() => setShowPwd((v) => !v)}
                    hitSlop={8}
                    accessibilityLabel="Afficher le mot de passe"
                  >
                    {showPwd ? (
                      <EyeOff size={18} color={Colors.textSecondary} />
                    ) : (
                      <Eye size={18} color={Colors.textSecondary} />
                    )}
                  </Pressable>
                }
                error={errors.password?.message}
              />
            )}
          />
        </View>

        <Pressable
          onPress={() => setValue("acceptCgu", !acceptCgu as any)}
          style={styles.cguRow}
          hitSlop={6}
        >
          <View
            style={[
              styles.checkbox,
              acceptCgu && { backgroundColor: Colors.primary, borderColor: Colors.primary },
            ]}
          >
            {acceptCgu ? <Check size={14} color={Colors.white} /> : null}
          </View>
          <Text style={[Typography.body, { color: Colors.onSurface, flex: 1 }]}>
            J'accepte les{" "}
            <Text
              style={{
                color: Colors.tertiary,
                textDecorationLine: "underline",
              }}
            >
              Conditions Générales d'Utilisation
            </Text>
          </Text>
        </Pressable>
        {errors.acceptCgu ? (
          <Text style={[Typography.caption, { color: Colors.error, marginTop: 4 }]}>
            {errors.acceptCgu.message as string}
          </Text>
        ) : null}

        <PillButton
          label="Créer mon compte"
          size="md"
          variant="primary"
          fullWidth
          onPress={handleSubmit(onSubmit)}
          loading={submitting}
          style={{ marginTop: 24 }}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={[Typography.caption, styles.dividerLabel]}>
            Ou continuer avec
          </Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={{ gap: 12 }}>
          <Pressable
            onPress={() => {
              haptics.light();
              // TODO: wire Google OAuth
            }}
            accessibilityRole="button"
            accessibilityLabel="Continuer avec Google"
            style={({ pressed }) => [
              styles.socialBtn,
              pressed && { opacity: 0.85 },
            ]}
          >
            <GoogleIcon size={20} />
            <Text style={styles.socialLabel}>Continuer avec Google</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              haptics.light();
              // TODO: wire Apple Sign-In
            }}
            accessibilityRole="button"
            accessibilityLabel="Continuer avec Apple"
            style={({ pressed }) => [
              styles.socialBtn,
              styles.appleBtn,
              pressed && { opacity: 0.85 },
            ]}
          >
            <AppleIcon size={20} color={Colors.white} />
            <Text style={[styles.socialLabel, { color: Colors.white }]}>
              Continuer avec Apple
            </Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          <Text style={[Typography.body, { color: Colors.textSecondary }]}>
            Déjà un compte ?{" "}
          </Text>
          <Pressable onPress={() => router.replace("/(onboarding)/sign-in")}>
            <Text
              style={[
                Typography.button,
                {
                  color: Colors.tertiary,
                  textDecorationLine: "underline",
                },
              ]}
            >
              Se connecter
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.white,
    marginBottom: 24,
  },
  cguRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    marginBottom: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.outlineVariant,
  },
  dividerLabel: {
    color: Colors.textSecondary,
  },
  socialBtn: {
    height: 48,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
  },
  appleBtn: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  socialLabel: {
    ...Typography.button,
    color: Colors.onSurface,
    fontSize: 15,
  },
});
