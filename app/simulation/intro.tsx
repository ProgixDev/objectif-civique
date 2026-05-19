import React from "react";
import { SimulationsCatalog } from "@/components/SimulationsCatalog";

/**
 * Deep-link / route empilée : on conserve cet écran pour les anciens liens
 * `router.push("/simulation/intro")`. Il rend le même catalogue avec un
 * bouton retour. La version onglet est dans `app/(tabs)/simulation.tsx`.
 */
export default function SimulationIntro() {
  return <SimulationsCatalog showBackButton />;
}
