import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

type Props = { children: React.ReactNode };
type State = { error: Error | null };

/**
 * Capture les exceptions React non gérées et affiche un écran d'erreur
 * lisible plutôt que de fermer l'application. Utilisé en wrap du layout
 * racine pour couvrir toutes les routes.
 *
 * En dev : on garde le RedBox d'Expo, l'utilisateur peut secouer pour reload.
 * En prod : sans ce composant, une exception non gérée tuerait l'app
 * silencieusement.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // À remplacer par Sentry/Bugsnag plus tard ; pour l'instant on log au moins.
    console.warn("[ErrorBoundary] caught error:", error, info?.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Une erreur est survenue</Text>
        <Text style={styles.message}>
          Quelque chose s'est mal passé. Vous pouvez réessayer ou redémarrer
          l'application.
        </Text>
        <Text style={styles.errorDetail} numberOfLines={5}>
          {this.state.error.message}
        </Text>
        <Pressable
          onPress={this.reset}
          style={({ pressed }) => [
            styles.btn,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.btnLabel}>Réessayer</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 22,
    color: Colors.onSurface,
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  message: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 16,
  },
  errorDetail: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: Colors.error,
    textAlign: "center",
    backgroundColor: "rgba(239,65,53,0.06)",
    padding: 12,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
  },
  btn: {
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLabel: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 14,
    color: Colors.white,
    letterSpacing: 0.2,
  },
});
