import { Theme } from "@/types";

/**
 * Les 5 thématiques officielles de l'examen civique français.
 * IDs alignés avec la structure FULL-DATA fournie par le client.
 */
export const THEMES: Theme[] = [
  {
    id: "principes-valeurs-republique",
    name: "Principes & valeurs",
    icon: "Heart",
    questionCount: 0,
  },
  {
    id: "droits-et-devoirs",
    name: "Droits & devoirs",
    icon: "Scale",
    questionCount: 0,
  },
  {
    id: "systeme-institutionnel",
    name: "Système institutionnel",
    icon: "Landmark",
    questionCount: 0,
  },
  {
    id: "histoire-geographie-culture",
    name: "Histoire, géographie & culture",
    icon: "BookOpen",
    questionCount: 0,
  },
  {
    id: "vivre-en-societe",
    name: "Vivre en société",
    icon: "Users",
    questionCount: 0,
  },
];

export const THEME_LABELS: Record<string, string> = {
  "principes-valeurs-republique": "Principes & valeurs",
  "droits-et-devoirs": "Droits & devoirs",
  "systeme-institutionnel": "Système institutionnel",
  "histoire-geographie-culture": "Histoire, géographie & culture",
  "vivre-en-societe": "Vivre en société",
};

/** Mapping des anciens IDs de thèmes (avant migration FULL-DATA) vers les nouveaux. */
export const LEGACY_THEME_MAP: Record<string, string> = {
  institutions: "systeme-institutionnel",
  histoire: "histoire-geographie-culture",
  valeurs: "principes-valeurs-republique",
  geographie: "histoire-geographie-culture",
  culture: "histoire-geographie-culture",
};
