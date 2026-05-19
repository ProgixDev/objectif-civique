import React from "react";
import { SimulationsCatalog } from "@/components/SimulationsCatalog";

/**
 * Onglet Simulation — point d'entrée permanent vers le catalogue de simulations.
 * Pas de bouton retour (navigation par onglets).
 */
export default function SimulationTab() {
  return <SimulationsCatalog />;
}
