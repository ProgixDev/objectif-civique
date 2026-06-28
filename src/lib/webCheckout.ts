import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useUserStore } from "@/store/userStore";
import { pullAll } from "@/lib/sync";
import { SubscriptionPlan } from "@/types";

/**
 * Paiement par « lien d'achat externe » (conforme aux règles Apple/Google
 * dans l'UE) : l'achat se fait sur le SITE WEB via Stripe, ce qui réduit très
 * fortement la commission des stores. Le webhook Stripe met à jour le profil
 * Supabase ; l'app débloque le contenu au retour du navigateur.
 *
 * URL publique du site Objectif Civique. Surchargée via EXPO_PUBLIC_WEB_URL.
 */
export const WEB_BASE_URL =
  process.env.EXPO_PUBLIC_WEB_URL ?? "https://objectifcivique.fr";

/**
 * Écran d'avertissement avant de quitter l'app pour payer à l'extérieur.
 *
 * Les règles Apple (« External Purchase Link ») et Google (« external offers »)
 * imposent d'informer clairement l'utilisateur qu'il quitte l'app et que le
 * paiement n'est PAS géré par le store. On affiche cette divulgation ; côté iOS,
 * elle sera complétée par l'écran système natif une fois l'entitlement activé.
 *
 * @returns true si l'utilisateur confirme, false s'il annule.
 */
function confirmLeaveForWeb(): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(
      "Paiement sur notre site",
      "Vous allez quitter l'application pour finaliser votre achat en toute " +
        "sécurité sur le site Objectif Civique (paiement géré par Stripe, pas " +
        "par le store). Votre accès se débloquera automatiquement à votre retour.",
      [
        { text: "Annuler", style: "cancel", onPress: () => resolve(false) },
        { text: "Continuer", onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) }
    );
  });
}

/**
 * Affiche l'avertissement puis ouvre la page d'abonnement du site dans le
 * navigateur système. Pré-remplit l'e-mail du compte (et le forfait choisi)
 * pour réduire la friction — l'utilisateur paie avec le MÊME compte que dans
 * l'app.
 *
 * @returns true si le navigateur a été ouvert, false si l'utilisateur a annulé.
 */
export async function openWebSubscription(planId?: string): Promise<boolean> {
  const confirmed = await confirmLeaveForWeb();
  if (!confirmed) return false;

  const email = useUserStore.getState().user?.email;
  const params: string[] = [];
  if (email) params.push(`email=${encodeURIComponent(email)}`);
  if (planId) params.push(`plan=${encodeURIComponent(planId)}`);
  const query = params.length ? `?${params.join("&")}` : "";
  await WebBrowser.openBrowserAsync(`${WEB_BASE_URL}/abonnement${query}`);
  return true;
}

/**
 * À appeler après le retour du navigateur : retire le profil du backend
 * plusieurs fois (le webhook Stripe peut arriver avec un léger délai) jusqu'à
 * voir le forfait payant apparaître. Renvoie le nouveau plan (ou null).
 */
export async function refreshAfterWebCheckout(): Promise<SubscriptionPlan | null> {
  const userId = useUserStore.getState().user?.id;
  if (!userId) return null;
  for (let attempt = 0; attempt < 4; attempt++) {
    const u = await pullAll(userId);
    if (u && u.subscriptionPlan !== "free") return u.subscriptionPlan;
    await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
  }
  return useUserStore.getState().user?.subscriptionPlan ?? null;
}
