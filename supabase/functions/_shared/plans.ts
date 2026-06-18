// Configuration des forfaits côté serveur (Edge Functions Deno).
// DOIT rester cohérent avec src/data/plans.ts (frontend).
//
// - `subscription` : abonnement récurrent. Le price_id Stripe est lu dans la
//   variable d'environnement `priceEnv` (cf. STRIPE_SETUP.md).
// - `payment` : paiement unique. On facture `amountCents` directement (pas de
//   price_id requis). `accessDays` = durée d'accès (null = à vie).

export type PlanMode = "subscription" | "payment";

export type PlanConfig = {
  mode: PlanMode;
  amountCents: number;
  /** Nom de la variable d'env contenant le price_id (abonnements seulement). */
  priceEnv?: string;
  /** Jours d'accès pour un paiement unique limité (null = à vie / récurrent). */
  accessDays: number | null;
};

export const PLAN_CONFIG: Record<string, PlanConfig> = {
  discovery: { mode: "payment", amountCents: 599, accessDays: 7 },
  premium: {
    mode: "subscription",
    amountCents: 999,
    priceEnv: "STRIPE_PRICE_PREMIUM",
    accessDays: null,
  },
  silver: {
    mode: "subscription",
    amountCents: 1599,
    priceEnv: "STRIPE_PRICE_SILVER",
    accessDays: null,
  },
  gold: {
    mode: "subscription",
    amountCents: 1999,
    priceEnv: "STRIPE_PRICE_GOLD",
    accessDays: null,
  },
  diamond: {
    mode: "subscription",
    amountCents: 2999,
    priceEnv: "STRIPE_PRICE_DIAMOND",
    accessDays: null,
  },
  vip: { mode: "payment", amountCents: 3999, accessDays: null },
};

export const CURRENCY = "eur";

/** Version d'API Stripe figée (les champs `current_period_end` etc. en dépendent). */
export const STRIPE_API_VERSION = "2024-06-20";
