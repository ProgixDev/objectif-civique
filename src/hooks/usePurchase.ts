import { useCallback, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { pullAll } from "@/lib/sync";
import { isRevenueCatConfigured, purchasePlan } from "@/lib/revenuecat";
import { getPlan } from "@/data/plans";
import { PaidPlanId } from "@/types";

export type PurchaseStatus = "success" | "canceled" | "error";

export type PurchaseResult = {
  status: PurchaseStatus;
  /** Message d'erreur lisible (présent si status === "error"). */
  message?: string;
};

/**
 * Réponse attendue de l'Edge Function `create-payment-sheet`.
 * `paymentIntent` = client secret du PaymentIntent (paiement unique) OU du
 * PaymentIntent de la première facture (abonnement `default_incomplete`).
 */
type PaymentSheetParams = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
};

const MERCHANT_NAME = "Objectif Civique";

/**
 * Réconcilie le forfait local avec le backend après un paiement réussi.
 *
 * La source de vérité est le webhook Stripe (service role) qui écrit
 * `subscription_plan` dans `profiles`. Comme le webhook peut arriver une
 * fraction de seconde après le retour du PaymentSheet, on retire le profil
 * plusieurs fois jusqu'à voir le plan payant apparaître.
 */
async function reconcileAfterPayment(userId: string): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const user = await pullAll(userId);
    if (user && user.subscriptionPlan !== "free") return;
    // Petit backoff le temps que le webhook soit traité.
    await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
  }
}

/**
 * Hook d'achat d'un forfait via Stripe PaymentSheet (UI native).
 *
 * Flux :
 *   1. Demande à l'Edge Function de préparer client + (PaymentIntent | abonnement).
 *   2. Initialise et présente le PaymentSheet natif.
 *   3. En cas de succès, réconcilie le forfait depuis le backend.
 */
export function usePurchase() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const purchase = useCallback(
    async (planId: PaidPlanId): Promise<PurchaseResult> => {
      if (!isSupabaseConfigured) {
        return {
          status: "error",
          message: "Le backend n'est pas configuré (Supabase manquant).",
        };
      }
      const plan = getPlan(planId);
      if (!plan) {
        return { status: "error", message: "Forfait inconnu." };
      }

      const userId = useUserStore.getState().user?.id;
      if (!userId) {
        return {
          status: "error",
          message: "Vous devez être connecté pour souscrire.",
        };
      }

      // Paiement in-app CONFORME via RevenueCat (Google Play Billing / Apple
      // IAP) dès qu'une clé RevenueCat est configurée. Le webhook RevenueCat met
      // à jour le forfait dans Supabase ; on réconcilie ensuite comme pour Stripe.
      if (isRevenueCatConfigured) {
        setLoading(true);
        try {
          const res = await purchasePlan(planId);
          if (res.outcome === "canceled") return { status: "canceled" };
          if (res.outcome === "error") {
            return { status: "error", message: res.message };
          }
          await reconcileAfterPayment(userId);
          return { status: "success" };
        } finally {
          setLoading(false);
        }
      }

      setLoading(true);
      try {
        // 1. Préparation côté serveur (customer + intent/abonnement).
        const { data, error } = await supabase.functions.invoke<
          PaymentSheetParams
        >("create-payment-sheet", { body: { planId } });

        if (error || !data?.paymentIntent || !data.customer) {
          return {
            status: "error",
            message:
              "Impossible de préparer le paiement. Réessayez plus tard.",
          };
        }

        // 2. Initialisation du PaymentSheet.
        const init = await initPaymentSheet({
          merchantDisplayName: MERCHANT_NAME,
          customerId: data.customer,
          customerEphemeralKeySecret: data.ephemeralKey,
          paymentIntentClientSecret: data.paymentIntent,
          allowsDelayedPaymentMethods: false,
        });
        if (init.error) {
          return {
            status: "error",
            message: init.error.message ?? "Erreur d'initialisation.",
          };
        }

        // 3. Présentation : l'utilisateur saisit sa carte / valide.
        const present = await presentPaymentSheet();
        if (present.error) {
          // L'utilisateur a fermé la feuille de paiement.
          if (present.error.code === "Canceled") {
            return { status: "canceled" };
          }
          return {
            status: "error",
            message: present.error.message ?? "Paiement refusé.",
          };
        }

        // 4. Paiement accepté → réconcilie le forfait depuis le backend.
        await reconcileAfterPayment(userId);
        return { status: "success" };
      } catch (e) {
        return {
          status: "error",
          message: e instanceof Error ? e.message : "Erreur inattendue.",
        };
      } finally {
        setLoading(false);
      }
    },
    [initPaymentSheet, presentPaymentSheet]
  );

  return { purchase, loading };
}
