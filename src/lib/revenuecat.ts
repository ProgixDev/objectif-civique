import { Platform } from "react-native";
import Purchases, { PurchasesPackage } from "react-native-purchases";

/**
 * Intégration RevenueCat (paiement in-app conforme : Google Play Billing /
 * Apple In-App Purchase).
 *
 * RevenueCat n'est activé QUE si une clé d'API publique est fournie via les
 * variables d'env (`EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` / `_IOS_KEY`). Tant
 * qu'elles sont absentes, `isRevenueCatConfigured` est faux et l'app conserve
 * son comportement actuel — aucun risque de crash.
 *
 * Source de vérité des accès : le webhook RevenueCat écrit `subscription_plan`
 * dans Supabase `profiles` (comme le webhook Stripe pour le web). L'app lit
 * toujours le forfait depuis Supabase via `effectivePlan`.
 */

const ANDROID_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
const IOS_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;

const API_KEY = Platform.OS === "ios" ? IOS_KEY : ANDROID_KEY;

/** True si une clé RevenueCat est disponible pour la plateforme courante. */
export const isRevenueCatConfigured = Boolean(API_KEY);

let configured = false;

/** Initialise le SDK (idempotent). No-op si non configuré. */
export function configureRevenueCat(appUserId?: string): void {
  if (configured || !isRevenueCatConfigured) return;
  Purchases.configure({ apiKey: API_KEY as string, appUserID: appUserId });
  configured = true;
}

/** Associe l'achat au compte Supabase (app_user_id = user.id). */
export async function loginRevenueCat(appUserId: string): Promise<void> {
  if (!isRevenueCatConfigured) return;
  configureRevenueCat(appUserId);
  try {
    await Purchases.logIn(appUserId);
  } catch (err) {
    console.warn("[revenuecat] logIn", err);
  }
}

/** Repasse en utilisateur anonyme (à la déconnexion). */
export async function logoutRevenueCat(): Promise<void> {
  if (!isRevenueCatConfigured || !configured) return;
  try {
    await Purchases.logOut();
  } catch (err) {
    // Déjà anonyme : RevenueCat lève une erreur bénigne, on l'ignore.
  }
}

/**
 * Retrouve le package RevenueCat correspondant à un forfait de l'app.
 * Convention : configurer dans RevenueCat des packages dont l'identifiant (ou
 * l'identifiant produit) correspond à l'id du forfait (discovery, premium, …).
 */
export async function findPackageForPlan(
  planId: string
): Promise<PurchasesPackage | null> {
  const offerings = await Purchases.getOfferings();
  const current = offerings.current;
  if (!current) return null;
  return (
    current.availablePackages.find(
      (p) => p.identifier === planId || p.product.identifier === planId
    ) ?? null
  );
}

export type RevenueCatPurchaseOutcome = "success" | "canceled" | "error";

/**
 * Lance l'achat natif (feuille Google Play / App Store) pour un forfait.
 * Renvoie l'issue ; la mise à jour du forfait Supabase est faite ensuite par le
 * webhook RevenueCat (réconciliée côté app via `pullAll`).
 */
export async function purchasePlan(
  planId: string
): Promise<{ outcome: RevenueCatPurchaseOutcome; message?: string }> {
  // Étape 1 — récupération du catalogue.
  //
  // `getOfferings()` échoue tant que la boutique n'est pas complètement
  // configurée (accord Paid Applications, clé App Store Connect côté
  // RevenueCat, produits rattachés à l'offering). Le SDK renvoie alors un texte
  // technique en anglais, avec des liens de dépannage : il ne doit jamais
  // remonter jusqu'à l'utilisateur.
  let pkg: PurchasesPackage | null = null;
  try {
    pkg = await findPackageForPlan(planId);
  } catch (err) {
    console.warn("[revenuecat] getOfferings a échoué", err);
    return {
      outcome: "error",
      message:
        "Les forfaits sont momentanément indisponibles. Réessayez dans quelques minutes.",
    };
  }

  if (!pkg) {
    return {
      outcome: "error",
      message: "Ce forfait n'est pas disponible pour le moment.",
    };
  }

  // Étape 2 — achat natif.
  try {
    await Purchases.purchasePackage(pkg);
    return { outcome: "success" };
  } catch (err) {
    // Le SDK expose `userCancelled` quand l'utilisateur ferme la feuille.
    if (err && typeof err === "object" && (err as any).userCancelled) {
      return { outcome: "canceled" };
    }
    console.warn("[revenuecat] purchasePackage a échoué", err);
    return {
      outcome: "error",
      message: "Le paiement n'a pas abouti. Réessayez ou contactez le support.",
    };
  }
}
