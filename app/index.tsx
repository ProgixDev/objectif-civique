import React from "react";
import { Redirect } from "expo-router";
import { useUserStore, isPersoComplete } from "@/store/userStore";

export default function Index() {
  const user = useUserStore((s) => s.user);
  const hydrated = useUserStore((s) => s.hydrated);

  if (!hydrated) {
    return <Redirect href="/splash" />;
  }

  if (!user) {
    return <Redirect href="/splash" />;
  }

  if (!isPersoComplete(user)) {
    return <Redirect href="/(onboarding)/perso/step-1" />;
  }

  return <Redirect href="/(tabs)" />;
}
