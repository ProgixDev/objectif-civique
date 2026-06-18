// Edge Function : annule l'abonnement récurrent de l'utilisateur courant.
//
// Annulation EN FIN DE PÉRIODE (cancel_at_period_end) : l'accès reste actif
// jusqu'à l'échéance déjà payée, conformément à la FAQ in-app. Le webhook
// `customer.subscription.deleted` rétrogradera le profil en gratuit le moment
// venu.

import Stripe from "npm:stripe@^17";
import { createClient } from "npm:@supabase/supabase-js@2";
import { STRIPE_API_VERSION } from "../_shared/plans.ts";
import { corsHeaders, json } from "../_shared/http.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: STRIPE_API_VERSION,
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();
    if (userErr || !user) return json({ error: "unauthorized" }, 401);

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    const customerId = profile?.stripe_customer_id;
    if (!customerId) return json({ error: "no_customer" }, 400);

    const subs = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 10,
    });
    for (const sub of subs.data) {
      await stripe.subscriptions.update(sub.id, {
        cancel_at_period_end: true,
      });
    }

    return json({ canceled: subs.data.length });
  } catch (e) {
    console.error("[cancel-subscription]", e);
    return json({ error: "server_error" }, 500);
  }
});
