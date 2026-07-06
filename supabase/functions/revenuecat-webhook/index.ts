// Edge Function : webhook RevenueCat. SOURCE DE VÉRITÉ des achats in-app.
//
// RevenueCat appelle cette URL après chaque événement d'achat (Google Play /
// Apple). On authentifie via un en-tête Authorization partagé, puis on met à
// jour `profiles.subscription_*` — exactement comme le webhook Stripe pour le
// web. L'app lit toujours le forfait depuis Supabase (effectivePlan).
//
// ⚠️ Déployer SANS vérification de JWT :
//     supabase functions deploy revenuecat-webhook --no-verify-jwt
//   L'authentification se fait par l'en-tête Authorization configuré dans
//   RevenueCat (secret REVENUECAT_WEBHOOK_AUTH).

import { createClient } from "npm:@supabase/supabase-js@2";
import { PLAN_CONFIG } from "../_shared/plans.ts";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Secret partagé : dans RevenueCat → Integrations → Webhooks → Authorization
// header, mettre exactement cette valeur.
const WEBHOOK_AUTH = Deno.env.get("REVENUECAT_WEBHOOK_AUTH") ?? "";

type ProfilePatch = {
  subscription_plan?: string;
  subscription_status?: string | null;
  subscription_expires_at?: string | null;
};

async function updateProfile(userId: string, patch: ProfilePatch) {
  await admin.from("profiles").update(patch).eq("id", userId);
}

/**
 * Déduit l'id de forfait (discovery, premium, …) depuis l'identifiant produit
 * RevenueCat. Convention : le product_id contient l'id du forfait.
 */
function planFromProduct(productId: string | undefined): string | null {
  if (!productId) return null;
  const id = productId.toLowerCase();
  const match = Object.keys(PLAN_CONFIG).find((plan) => id.includes(plan));
  return match ?? null;
}

// Événements qui ACCORDENT l'accès.
const GRANT = new Set([
  "INITIAL_PURCHASE",
  "NON_RENEWING_PURCHASE",
  "RENEWAL",
  "UNCANCELLATION",
  "PRODUCT_CHANGE",
]);
// Événements qui RETIRENT l'accès.
const REVOKE = new Set(["EXPIRATION", "CANCELLATION", "REFUND"]);

Deno.serve(async (req) => {
  // Authentification par en-tête partagé.
  if (!WEBHOOK_AUTH || req.headers.get("authorization") !== WEBHOOK_AUTH) {
    return new Response("unauthorized", { status: 401 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response("bad json", { status: 400 });
  }

  const event = payload?.event;
  if (!event) return new Response("no event", { status: 200 });

  const userId: string | undefined = event.app_user_id;
  const type: string = event.type;
  if (!userId) return new Response("no app_user_id", { status: 200 });

  try {
    if (REVOKE.has(type)) {
      await updateProfile(userId, {
        subscription_plan: "free",
        subscription_status: type.toLowerCase(),
        subscription_expires_at: null,
      });
      return new Response("ok", { status: 200 });
    }

    if (GRANT.has(type)) {
      const plan =
        planFromProduct(event.product_id) ??
        planFromProduct(event.new_product_id);
      if (!plan) return new Response("unknown product", { status: 200 });

      const cfg = PLAN_CONFIG[plan];
      // Expiration : celle fournie par RevenueCat si présente, sinon calculée
      // depuis la durée d'accès du forfait (null = à vie).
      let expires: string | null = null;
      if (event.expiration_at_ms) {
        expires = new Date(event.expiration_at_ms).toISOString();
      } else if (cfg?.accessDays != null) {
        expires = new Date(
          Date.now() + cfg.accessDays * 86_400_000
        ).toISOString();
      }

      await updateProfile(userId, {
        subscription_plan: plan,
        subscription_status: "active",
        subscription_expires_at: expires,
      });
      return new Response("ok", { status: 200 });
    }

    // Autres types (TEST, BILLING_ISSUE, …) : rien à faire.
    return new Response("ignored", { status: 200 });
  } catch (e) {
    console.error("[revenuecat-webhook] handler error", e);
    return new Response("handler error", { status: 500 });
  }
});
