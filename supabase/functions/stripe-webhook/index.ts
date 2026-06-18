// Edge Function : webhook Stripe. SOURCE DE VÉRITÉ des abonnements.
//
// Stripe appelle cette URL après chaque événement de paiement. On vérifie la
// signature, on déduplique, puis on met à jour `profiles.subscription_*`.
//
// ⚠️ Cette fonction doit être déployée SANS vérification de JWT :
//     supabase functions deploy stripe-webhook --no-verify-jwt
//   (Stripe ne fournit pas de JWT Supabase ; c'est la signature Stripe qui
//    authentifie l'appel.)

import Stripe from "npm:stripe@^17";
import { createClient } from "npm:@supabase/supabase-js@2";
import { PLAN_CONFIG, STRIPE_API_VERSION } from "../_shared/plans.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: STRIPE_API_VERSION,
  httpClient: Stripe.createFetchHttpClient(),
});
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

type ProfilePatch = {
  subscription_plan?: string;
  subscription_status?: string | null;
  subscription_expires_at?: string | null;
};

async function updateProfile(userId: string, patch: ProfilePatch) {
  const clean: ProfilePatch = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v !== undefined) (clean as Record<string, unknown>)[k] = v;
  }
  if (Object.keys(clean).length === 0) return;
  await admin.from("profiles").update(clean).eq("id", userId);
}

async function userIdFromCustomer(
  customerId: string
): Promise<string | null> {
  const { data } = await admin
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data?.id ?? null;
}

/** Applique l'état d'un abonnement Stripe au profil. */
async function applySubscription(sub: Stripe.Subscription) {
  const userId =
    sub.metadata?.user_id ??
    (await userIdFromCustomer(sub.customer as string));
  if (!userId) return;

  const plan = sub.metadata?.plan;
  const status = sub.status;
  const isDead =
    status === "canceled" ||
    status === "incomplete_expired" ||
    status === "unpaid";

  if (isDead) {
    // Avant de rétrograder en gratuit, vérifier qu'aucun autre abonnement
    // n'est actif (cas du changement de formule : l'ancien est annulé alors
    // que le nouveau vient d'être activé).
    const actives = await stripe.subscriptions.list({
      customer: sub.customer as string,
      status: "active",
      limit: 1,
    });
    if (actives.data.length > 0) return;
    await updateProfile(userId, {
      subscription_plan: "free",
      subscription_status: status,
      subscription_expires_at: null,
    });
    return;
  }

  const periodEnd = sub.current_period_end
    ? new Date(sub.current_period_end * 1000).toISOString()
    : null;
  await updateProfile(userId, {
    subscription_plan: plan,
    subscription_status: status,
    subscription_expires_at: periodEnd,
  });
}

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, webhookSecret);
  } catch (e) {
    return new Response(`bad signature: ${(e as Error).message}`, {
      status: 400,
    });
  }

  // Idempotence : si l'event est déjà enregistré, on ne le retraite pas.
  const { error: insErr } = await admin
    .from("stripe_events")
    .insert({ id: event.id, type: event.type });
  if (insErr) return new Response("duplicate", { status: 200 });

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        // Paiements uniques uniquement (Découverte / VIP). Les paiements
        // d'abonnement sont traités via invoice.* (pour la période).
        const pi = event.data.object as Stripe.PaymentIntent;
        const plan = pi.metadata?.plan;
        const userId = pi.metadata?.user_id;
        if (plan && userId && PLAN_CONFIG[plan]?.mode === "payment") {
          const cfg = PLAN_CONFIG[plan];
          const expires =
            cfg.accessDays != null
              ? new Date(
                  Date.now() + cfg.accessDays * 86_400_000
                ).toISOString()
              : null;
          await updateProfile(userId, {
            subscription_plan: plan,
            subscription_status: "active",
            subscription_expires_at: expires,
          });
        }
        break;
      }

      case "invoice.paid":
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = invoice.subscription as string | null;
        if (subId) {
          const sub = await stripe.subscriptions.retrieve(subId);
          await applySubscription(sub);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await applySubscription(event.data.object as Stripe.Subscription);
        break;
      }
    }
  } catch (e) {
    console.error("[stripe-webhook] handler error", e);
    // 500 → Stripe réessaiera. L'event n'ayant pas été marqué traité… or si,
    // il l'a été plus haut. On le retire pour autoriser un nouvel essai.
    await admin.from("stripe_events").delete().eq("id", event.id);
    return new Response("handler error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
});
