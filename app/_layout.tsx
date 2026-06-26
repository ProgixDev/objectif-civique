import React, { useEffect } from "react";
import { Alert, View } from "react-native";
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

  // Capteur d'erreur global : transforme une erreur JS fatale (qui sinon ferme
  // l'app sans message) en alerte lisible — aide à diagnostiquer les crashs
  // signalés sur appareil réel. (Les crashs purement natifs ne passent pas ici.)
  useEffect(() => {
    const g = global as unknown as {
      ErrorUtils?: {
        getGlobalHandler: () => (e: unknown, fatal?: boolean) => void;
        setGlobalHandler: (h: (e: unknown, fatal?: boolean) => void) => void;
      };
    };
    const EU = g.ErrorUtils;
    if (!EU) return;
    // DIAGNOSTIC : on AVALE l'erreur fatale (on n'appelle PAS le handler par
    // défaut qui fermerait l'app) → l'app reste ouverte et affiche le message,
    // pour pouvoir le capturer en photo. À retirer une fois le crash identifié.
    EU.setGlobalHandler((error) => {
      try {
        const err = error as Error;
        Alert.alert(
          "Détails de l'erreur (à envoyer au développeur)",
          `${err?.message ?? String(error)}\n\n${(err?.stack ?? "").slice(0, 700)}`
        );
      } catch {
        // ignore
      }
    });
  }, []);

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
