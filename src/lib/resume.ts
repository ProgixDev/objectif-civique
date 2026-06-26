import { Session } from "@/types";

/**
 * Reprise "là où on s'est arrêté".
 *
 * À partir d'une session non terminée, reconstruit la route d'entraînement à
 * rouvrir. Les params reproduisent EXACTEMENT l'`originKey` de la session pour
 * que l'écran d'entraînement conserve la session persistée (et sa position)
 * au lieu d'en recréer une.
 *
 * Ne s'applique pas aux simulations (chronométrées) ni aux sessions terminées.
 */
export type ResumeTarget = {
  pathname: "/practice/[category]";
  params: Record<string, string>;
  /** Libellé court pour la bannière "Reprendre". */
  label: string;
};

export function getResumeTarget(
  session: Session | null | undefined
): ResumeTarget | null {
  if (!session || session.endedAt) return null;
  if (session.type === "simulation") return null;
  // Session sans aucune réponse ET sur la 1re question : rien d'utile à reprendre.
  const key = session.originKey ?? "";
  const parts = key.split(":");

  switch (parts[0]) {
    case "practice":
      return {
        pathname: "/practice/[category]",
        params: { category: parts[1] || "NAT" },
        label: "Reprendre l'entraînement",
      };
    case "bank":
      return {
        pathname: "/practice/[category]",
        params: { category: parts[2] || "NAT", bank: parts[1] },
        label: "Reprendre la révision",
      };
    case "theme": {
      // theme:themeId:themeCat:series:focusId
      const params: Record<string, string> = {
        category: parts[2] === "Tous" ? "NAT" : parts[2] || "NAT",
        themeId: parts[1],
        themeCat: parts[2] || "Tous",
        series: parts[3] ?? "0",
      };
      if (parts[4]) params.focusId = parts[4];
      return {
        pathname: "/practice/[category]",
        params,
        label: "Reprendre la série",
      };
    }
    case "test":
      // test:testKind:subTheme:series
      return {
        pathname: "/practice/[category]",
        params: {
          category: "test",
          testKind: parts[1],
          subTheme: parts[2],
          series: parts[3] ?? "0",
        },
        label: "Reprendre la série",
      };
    default:
      return null;
  }
}
