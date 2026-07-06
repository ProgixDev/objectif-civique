import React from "react";
import { SimulationsCatalog } from "@/components/SimulationsCatalog";
import { useUserStore } from "@/store/userStore";
import { isPaid } from "@/lib/entitlements";
import { PremiumGate } from "@/components/PremiumGate";

/**
 * Onglet Simulation — point d'entrée permanent vers le catalogue de simulations.
 * Pas de bouton retour (navigation par onglets). Réservé aux membres.
 */
export default function SimulationTab() {
  const user = useUserStore((s) => s.user);
  if (!isPaid(user)) return <PremiumGate />;
  return <SimulationsCatalog />;
}
