import React, { useState } from "react";
import { router } from "expo-router";
import { Calendar, Clock, HelpCircle, Hourglass } from "lucide-react-native";
import {
  PersoCarouselShell,
  CarouselOption,
} from "@/components/PersoCarouselShell";
import { useUserStore } from "@/store/userStore";
import { Deadline } from "@/types";

const OPTIONS: CarouselOption[] = [
  {
    key: "lt1m",
    title: "Moins d'1 mois",
    description: "Objectif proche — cadence soutenue recommandée.",
    Icon: Hourglass,
  },
  {
    key: "1to3m",
    title: "1 à 3 mois",
    description: "Un rythme régulier pour être prêt le jour J.",
    Icon: Clock,
  },
  {
    key: "3to6m",
    title: "3 à 6 mois",
    description: "Préparation en profondeur, maîtrise de tous les thèmes.",
    Icon: Calendar,
  },
  {
    key: "undecided",
    title: "Pas encore décidé",
    description: "Nous construirons un plan flexible à adapter.",
    Icon: HelpCircle,
  },
];

export default function Step2() {
  const updateUser = useUserStore((s) => s.updateUser);
  const existing = useUserStore((s) => s.user?.deadline);
  const goal = useUserStore((s) => s.user?.goal);
  const [selected, setSelected] = useState<Deadline | null>(existing ?? null);

  const isNat = goal === "NAT";

  return (
    <PersoCarouselShell
      step={isNat ? 3 : 2}
      total={isNat ? 5 : 4}
      title="Dans combien de temps passez-vous votre examen ?"
      subtitle="Cela nous permet de calibrer votre rythme d'apprentissage."
      options={OPTIONS}
      selectedKey={selected}
      onSelect={(k) => setSelected(k as Deadline)}
      onConfirm={() => {
        if (!selected) return;
        updateUser({ deadline: selected });
        router.push("/(onboarding)/perso/step-3");
      }}
    />
  );
}
