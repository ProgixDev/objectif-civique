import React, { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "@/constants/colors";
import { useAppFonts } from "@/hooks/useFonts";
import { ToastHost } from "@/components/ui/Toast";
import { useProgressStore } from "@/store/progressStore";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const { loaded } = useAppFonts();
  const seedInitial = useProgressStore((s) => s.seedInitial);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(() => {});
      seedInitial();
    }
  }, [loaded, seedInitial]);

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.surface }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.surface },
          }}
        />
        <ToastHost />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
