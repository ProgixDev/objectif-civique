import { SubscriptionPlan, User } from "@/types";

/**
 * Forfait réellement actif pour cet utilisateur, en tenant compte de
 * l'expiration. C'est CETTE valeur (et pas `user.subscriptionPlan` brut) qui
 * doit piloter le gating premium dans l'app.
 *
 * Règles :
 *   - VIP : à vie, ne s'expire jamais.
 *   - Découverte : paiement unique avec `subscriptionExpiresAt` = +7 jours.
 *   - Abonnements : `subscriptionExpiresAt` = fin de période courante, mis à
 *     jour par le webhook Stripe à chaque renouvellement. Si la date est
 *     passée (renouvellement échoué / annulation effective), on retombe en
 *     gratuit.
 */
export function effectivePlan(user: User | null | undefined): SubscriptionPlan {
  if (!user) return "free";
  const plan = user.subscriptionPlan ?? "free";
  if (plan === "free") return "free";
  if (plan === "vip") return "vip";

  const exp = user.subscriptionExpiresAt;
  if (exp && Date.parse(exp) <= Date.now()) return "free";
  return plan;
}

/** True si l'utilisateur a un accès payant actif (quel que soit le palier). */
export function isPaid(user: User | null | undefined): boolean {
  return effectivePlan(user) !== "free";
}
