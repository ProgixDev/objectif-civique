import React, { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Colors } from "@/constants/colors";
import { useAppFonts } from "@/hooks/useFonts";
import { ToastHost } from "@/components/ui/Toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthSyncProvider } from "@/providers/AuthSyncProvider";

SplashScreen.preventAutoHideAsync().catch(() => {});

// Clé publiable Stripe (pk_test_… ou pk_live_…). Publique par nature : elle
// n'autorise que la création de moyens de paiement côté client. Voir .env.
const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

export default function RootLayout() {
  const { loaded } = useAppFonts();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded]);

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.surface }} />;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY}
            // Schéma de l'app pour le retour après authentification 3D Secure.
            urlScheme="objectifcivique"
          >
            <AuthSyncProvider>
              <StatusBar style="dark" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: Colors.surface },
                }}
              />
              <ToastHost />
            </AuthSyncProvider>
          </StripeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
