import { Theme } from "@/types";

export const THEMES: Theme[] = [
  {
    id: "institutions",
    name: "Institutions de la République",
    icon: "Landmark",
    questionCount: 0,
  },
  {
    id: "histoire",
    name: "Histoire de France",
    icon: "Scroll",
    questionCount: 0,
  },
  {
    id: "valeurs",
    name: "Valeurs républicaines",
    icon: "Heart",
    questionCount: 0,
  },
  {
    id: "geographie",
    name: "Géographie",
    icon: "Map",
    questionCount: 0,
  },
  {
    id: "culture",
    name: "Culture & société",
    icon: "Theater",
    questionCount: 0,
  },
];

export const THEME_LABELS: Record<string, string> = {
  institutions: "Institutions de la République",
  histoire: "Histoire de France",
  valeurs: "Valeurs républicaines",
  geographie: "Géographie",
  culture: "Culture & société",
};
