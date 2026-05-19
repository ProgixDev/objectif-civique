import React, { useState } from "react";
import { router } from "expo-router";
import { User, UserPlus, Users } from "lucide-react-native";
import {
  PersoCarouselShell,
  CarouselOption,
} from "@/components/PersoCarouselShell";
import { useUserStore } from "@/store/userStore";

type Key = "alone" | "family" | "friend";

const OPTIONS: CarouselOption[] = [
  {
    key: "alone",
    title: "Seul(e)",
    description: "Mon parcours en autonomie, à mon rythme.",
    Icon: User,
  },
  {
    key: "family",
    title: "Avec ma famille",
    description: "Pour se soutenir et célébrer les progrès ensemble.",
    Icon: Users,
  },
  {
    key: "friend",
    title: "Avec un(e) ami(e)",
    description: "S'entraîner à deux augmente vos chances de réussite.",
    Icon: UserPlus,
  },
];

export default function Step4() {
  const updateUser = useUserStore((s) => s.updateUser);
  const existing = useUserStore((s) => s.user?.companion);
  const goal = useUserStore((s) => s.user?.goal);
  const [selected, setSelected] = useState<Key | null>(
    (existing as Key | null) ?? null
  );

  const isNat = goal === "NAT";

  return (
    <PersoCarouselShell
      step={isNat ? 6 : 5}
      total={isNat ? 6 : 5}
      title="Préparez-vous seul ou avec un proche ?"
      subtitle="S'entraîner à plusieurs augmente vos chances de réussite."
      options={OPTIONS}
      selectedKey={selected}
      onSelect={(k) => setSelected(k as Key)}
      onConfirm={() => {
        if (!selected) return;
        updateUser({ companion: selected });
        router.replace("/(onboarding)/assessment/intro");
      }}
      confirmLabel="Terminer"
    />
  );
}
