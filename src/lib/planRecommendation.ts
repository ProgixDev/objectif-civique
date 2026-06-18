import { User, Recap, SubscriptionPlan } from "@/types";

export type FocusArea =
  | "language"
  | "civic"
  | "assimilation"
  | "general"
  | "urgent";

export type PlanRecommendation = {
  /** Plan ID recommandé (discovery/premium/silver/gold/diamond/vip) */
  planId: Exclude<SubscriptionPlan, "free">;
  /** Pourquoi ce plan est recommandé (2 à 4 raisons personnalisées) */
  reasons: string[];
  /** Axe prioritaire de travail à mettre en avant */
  focus: FocusArea;
  focusLabel: string;
  focusDescription: string;
};

/**
 * Calcule un forfait recommandé et un axe de travail prioritaire en fonction :
 *  - du profil utilisateur (cas, échéance, tests passés)
 *  - du score obtenu au mini-assessment
 *
 * Logique :
 *  - Si pas de test de langue passé → focus "language"
 *  - Sinon, si NAT et test civique non passé → focus "civic"
 *  - Sinon, si NAT et test civique passé → focus "assimilation"
 *  - Sinon → focus "general"
 *  - Si échéance < 1 mois → bascule en focus "urgent" (peu importe le reste)
 *
 *  - Plan : on cale la durée du forfait sur l'échéance — < 1 mois → Premium
 *    (1 mois), 1-3 mois → Argent (3 mois), 3-6 mois → Or (6 mois), échéance
 *    indéterminée → Diamant (1 an, le plus rentable). Défaut → Or (recommandé).
 */
export function recommendPlan(
  user: User | null,
  recap: Recap
): PlanRecommendation {
  const goal = user?.goal ?? null;
  const languagePassed = user?.languageTestStatus === "passed";
  const civicPassed = user?.civicTestPassed === true;
  const deadline = user?.deadline ?? null;
  const urgent = deadline === "lt1m";

  // --- Focus (axe prioritaire de travail) ---
  let focus: FocusArea;
  let focusLabel: string;
  let focusDescription: string;

  if (urgent) {
    focus = "urgent";
    focusLabel = "Mode intensif";
    focusDescription =
      "Votre examen approche : cadence soutenue pour couvrir tous les thèmes.";
  } else if (!languagePassed) {
    focus = "language";
    focusLabel = "Préparation au test de langue";
    focusDescription =
      "Le test de langue est exigé pour votre dossier — révisez d'abord ce volet.";
  } else if (goal === "NAT" && !civicPassed) {
    focus = "civic";
    focusLabel = "Préparation au test civique";
    focusDescription =
      "Le test civique est obligatoire avant le dépôt de votre dossier de naturalisation.";
  } else if (goal === "NAT" && civicPassed) {
    focus = "assimilation";
    focusLabel = "Entretien d'assimilation";
    focusDescription =
      "Votre test civique est validé : préparez maintenant l'entretien en préfecture.";
  } else {
    focus = "general";
    focusLabel = "Programme civique complet";
    focusDescription =
      "Révisez l'ensemble du programme avec simulations et entraînement ciblé.";
  }

  // --- Plan ---
  let planId: PlanRecommendation["planId"];
  if (urgent) {
    planId = "premium";
  } else if (deadline === "1to3m") {
    planId = "silver";
  } else if (deadline === "3to6m") {
    planId = "gold";
  } else if (deadline === "undecided") {
    planId = "diamond";
  } else {
    planId = "gold";
  }

  // --- Raisons personnalisées ---
  const reasons: string[] = [];

  if (goal) {
    const goalLabel =
      goal === "NAT"
        ? "votre dossier de naturalisation"
        : goal === "CR"
          ? "votre Carte de Résident"
          : "votre Carte de Séjour Pluriannuelle";
    reasons.push(`Adapté à ${goalLabel}.`);
  }

  if (urgent) {
    reasons.push(
      "Échéance dans moins d'1 mois : il vous faut un accès complet immédiat."
    );
  } else if (deadline === "1to3m") {
    reasons.push("Échéance dans 1 à 3 mois — le forfait Argent (3 mois) suffit.");
  } else if (deadline === "3to6m") {
    reasons.push(
      "Échéance dans 3 à 6 mois — le forfait Or (6 mois) couvre toute la préparation."
    );
  } else if (deadline === "undecided") {
    reasons.push(
      "Pas d'échéance fixée : le forfait Diamant (1 an) vous laisse le temps de bien préparer."
    );
  }

  if (!languagePassed) {
    reasons.push(
      "Vous n'avez pas encore passé le test de langue : la préparation linguistique est incluse."
    );
  }

  if (goal === "NAT" && !civicPassed) {
    reasons.push(
      "Votre test civique reste à passer — accès illimité aux questions officielles."
    );
  }

  if (recap.total > 0 && recap.percent < 60) {
    reasons.push(
      `Score actuel : ${recap.percent}%. Un plan complet vous aidera à monter au-dessus du seuil de 80%.`
    );
  } else if (recap.total > 0 && recap.percent >= 80) {
    reasons.push(
      `Excellent score (${recap.percent}%) — entretenez votre niveau jusqu'au jour J.`
    );
  }

  // Garde au maximum 4 raisons pour rester lisible
  return {
    planId,
    reasons: reasons.slice(0, 4),
    focus,
    focusLabel,
    focusDescription,
  };
}
