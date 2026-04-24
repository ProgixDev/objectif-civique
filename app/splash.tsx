import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MotiView, MotiImage } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Assets } from "@/constants/assets";
import { useUserStore, isPersoComplete } from "@/store/userStore";

export default function Splash() {
  const user = useUserStore((s) => s.user);
  const hydrated = useUserStore((s) => s.hydrated);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!hydrated) {
        router.replace("/(onboarding)/welcome");
        return;
      }
      if (!user) {
        router.replace("/(onboarding)/welcome");
      } else if (!isPersoComplete(user)) {
        router.replace("/(onboarding)/perso/step-1");
      } else {
        router.replace("/(tabs)");
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [hydrated, user]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(255,255,255,0.04)", "transparent"]}
        style={StyleSheet.absoluteFill}
      />
      <MotiView
        from={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 14, stiffness: 120 }}
        style={{ alignItems: "center" }}
      >
        <MotiImage
          source={Assets.branding.logoMonoWhite}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text
          style={[
            Typography.h1,
            { color: Colors.white, marginTop: 16, fontFamily: "Inter_700Bold" },
          ]}
        >
          Objectif Civique
        </Text>
        <Text
          style={[
            Typography.body,
            { color: "rgba(255,255,255,0.7)", marginTop: 4 },
          ]}
        >
          {`Examen civique & naturalisation ${new Date().getFullYear()}`}
        </Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
