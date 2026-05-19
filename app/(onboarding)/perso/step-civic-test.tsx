import React, { useState } from "react";
import { router } from "expo-router";
import { Award, HelpCircle } from "lucide-react-native";
import {
  PersoCarouselShell,
  CarouselOption,
} from "@/components/PersoCarouselShell";
import { useUserStore } from "@/store/userStore";

const OPTIONS: CarouselOption[] = [
  {
    key: "yes",
    title: "Oui, je l'ai déjà passé",
    description:
      "Vous préparerez uniquement l'entretien d'assimilation (questions vrai/faux + explications).",
    Icon: Award,
  },
  {
    key: "no",
    title: "Non, pas encore",
    description:
      "Vous préparerez d'abord le test civique (QCM officiel), puis l'entretien d'assimilation.",
    Icon: HelpCircle,
  },
];

export default function StepCivicTest() {
  const updateUser = useUserStore((s) => s.updateUser);
  const existing = useUserStore((s) => s.user?.civicTestPassed);
  const [selected, setSelected] = useState<"yes" | "no" | null>(
    existing === true ? "yes" : existing === false ? "no" : null
  );

  return (
    <PersoCarouselShell
      step={2}
      total={6}
      title="Avez-vous déjà passé le test civique ?"
      subtitle="Le test civique est obligatoire avant de déposer une demande de naturalisation."
      options={OPTIONS}
      selectedKey={selected}
      onSelect={(k) => setSelected(k as "yes" | "no")}
      onConfirm={() => {
        if (!selected) return;
        updateUser({ civicTestPassed: selected === "yes" });
        router.push("/(onboarding)/perso/step-language-test");
      }}
    />
  );
}
