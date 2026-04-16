import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { PillButton } from "@/components/ui/PillButton";
import { AppleIcon, GoogleIcon } from "@/components/SocialIcons";
import { IconTilePattern } from "@/components/IconTilePattern";
import { useHaptics } from "@/hooks/useHaptics";

export default function AuthLanding() {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const { height: screenHeight } = useWindowDimensions();

  const onGoogle = () => {
    haptics.light();
    // TODO: wire Google OAuth
  };
  const onApple = () => {
    haptics.light();
    // TODO: wire Apple Sign-In
  };

  return (
    <View style={styles.container}>
      <IconTilePattern
        height={screenHeight}
        iconSize={28}
        tileOpacity={0.05}
        tintColor="#1a1c1e"
        style={styles.patternLayer}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <View style={styles.brandRow}>
          <Image
            source={Assets.branding.logo}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <View style={styles.brandDivider} />
          <View>
            <Text style={styles.brandText}>Objectif</Text>
            <Text style={styles.brandText}>Civique</Text>
          </View>
        </View>
      </View>

      <View style={styles.center}>
        <Image
          source={Assets.onboarding.heroProgress}
          style={styles.hero}
          resizeMode="contain"
        />
        <Text style={[Typography.display, styles.title]}>Prêt à réussir ?</Text>
        <Text style={[Typography.bodyLarge, styles.subtitle]}>
          Créez un compte pour suivre votre progression et préparer votre
          examen civique.
        </Text>
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable
          onPress={onGoogle}
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
          onPress={onApple}
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

        <PillButton
          label="Créer un compte"
          size="md"
          variant="primary"
          fullWidth
          onPress={() => router.push("/(onboarding)/sign-up")}
        />

        <View style={styles.switchRow}>
          <Text style={[Typography.body, { color: Colors.textSecondary }]}>
            Déjà un compte ?{" "}
          </Text>
          <Pressable onPress={() => router.push("/(onboarding)/sign-in")}>
            <Text
              style={[
                Typography.button,
                {
                  color: Colors.tertiary,
                  textDecorationLine: "underline",
                  textDecorationColor: Colors.tertiary,
                },
              ]}
            >
              Se connecter
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ivory,
    paddingHorizontal: 24,
  },
  patternLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    alignItems: "center",
    paddingBottom: 12,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandLogo: {
    width: 36,
    height: 36,
  },
  brandDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.outlineVariant,
  },
  brandText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    lineHeight: 15,
    color: Colors.primary,
    letterSpacing: -0.2,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: Colors.onSurface,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  bottom: {
    gap: 12,
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
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
});
