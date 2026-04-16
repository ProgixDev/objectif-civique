import React, { useState } from "react";
import { router } from "expo-router";
import { Assets } from "@/constants/assets";
import {
  PersoCarouselShell,
  CarouselOption,
} from "@/components/PersoCarouselShell";
import { useUserStore } from "@/store/userStore";
import { Category } from "@/types";

const OPTIONS: CarouselOption[] = [
  {
    key: "NAT",
    image: Assets.perso.naturalisation,
    title: "Naturalisation",
    description:
      "Devenir français — questions d'assimilation et culture nationale.",
  },
  {
    key: "CSP",
    image: Assets.perso.csp,
    title: "Carte de Séjour Pluriannuelle",
    description: "Renouveler ou obtenir un titre de séjour pluriannuel.",
  },
  {
    key: "CR",
    image: Assets.perso.cr,
    title: "Carte de Résident",
    description: "Obtenir une carte de résident de 10 ans.",
  },
];

export default function Step1() {
  const updateUser = useUserStore((s) => s.updateUser);
  const existing = useUserStore((s) => s.user?.goal);
  const [selected, setSelected] = useState<Category | null>(existing ?? null);

  return (
    <PersoCarouselShell
      step={1}
      total={4}
      title="Quel examen visez-vous ?"
      subtitle="Nous adapterons les questions à votre objectif."
      options={OPTIONS}
      selectedKey={selected}
      onSelect={(k) => setSelected(k as Category)}
      onConfirm={() => {
        if (!selected) return;
        updateUser({ goal: selected });
        router.push("/(onboarding)/perso/step-2");
      }}
    />
  );
}
