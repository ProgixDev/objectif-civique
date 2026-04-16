import React, { useState } from "react";
import { router } from "expo-router";
import { Award, HelpCircle, Sprout, TrendingUp } from "lucide-react-native";
import {
  PersoCarouselShell,
  CarouselOption,
} from "@/components/PersoCarouselShell";
import { useUserStore } from "@/store/userStore";
import { Level } from "@/types";

const OPTIONS: CarouselOption[] = [
  {
    key: "debutant",
    title: "Débutant",
    description: "Je comprends et j'écris des phrases simples.",
    Icon: Sprout,
  },
  {
    key: "intermediaire",
    title: "Intermédiaire",
    description: "Je peux tenir une conversation courante.",
    Icon: TrendingUp,
  },
  {
    key: "avance",
    title: "Avancé",
    description: "Je suis à l'aise dans toutes les situations.",
    Icon: Award,
  },
  {
    key: "inconnu",
    title: "Je ne sais pas",
    description: "Faites-moi passer un mini-test pour me situer.",
    Icon: HelpCircle,
  },
];

export default function Step3() {
  const updateUser = useUserStore((s) => s.updateUser);
  const existing = useUserStore((s) => s.user?.level);
  const [selected, setSelected] = useState<Level | null>(existing ?? null);

  return (
    <PersoCarouselShell
      step={3}
      total={4}
      title="Quel est votre niveau de français ?"
      subtitle="Soyez honnête — nous ajusterons la difficulté."
      options={OPTIONS}
      selectedKey={selected}
      onSelect={(k) => setSelected(k as Level)}
      onConfirm={() => {
        if (!selected) return;
        updateUser({ level: selected });
        router.push("/(onboarding)/perso/step-4");
      }}
    />
  );
}
