import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors";
import { CustomTabBar } from "@/components/CustomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        sceneStyle: { backgroundColor: Colors.surface },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil" }} />
      <Tabs.Screen name="revise" options={{ title: "Entraînement" }} />
      <Tabs.Screen name="progress" options={{ title: "Progrès" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
