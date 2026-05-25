import { Category, ThemeId } from "@/types";

/**
 * Construction du catalogue de simulations utilisé dans :
 *   - l'onglet Simulation (`SimulationsCatalog`)
 *   - l'écran de résultats (calcule la "simu suivante")
 */

export type SimTone = "navy" | "red" | "deep" | "violet";

export type SimConfig = {
  key: string;
  number: number;
  title: string;
  subtitle: string;
  category?: Category;
  themes?: ThemeId[];
  tag: string;
  tone: SimTone;
  /** Adapté au cas de l'utilisateur courant */
  recommended?: boolean;
};

type ThemeSetup = {
  id: ThemeId;
  label: string;
  short: string;
  subtitle: string;
  tone: SimTone;
};

const THEME_SETUPS: ThemeSetup[] = [
  {
    id: "principes-valeurs-republique",
    label: "Principes & valeurs",
    short: "Valeurs",
    subtitle: "Liberté, Égalité, Fraternité, laïcité",
    tone: "violet",
  },
  {
    id: "droits-et-devoirs",
    label: "Droits & devoirs",
    short: "Droits",
    subtitle: "Droits fondamentaux et devoirs civiques",
    tone: "red",
  },
  {
    id: "systeme-institutionnel",
    label: "Système institutionnel",
    short: "Institutions",
    subtitle: "Président, Parlement, Constitution",
    tone: "navy",
  },
  {
    id: "histoire-geographie-culture",
    label: "Histoire, géographie & culture",
    short: "Hist./Géo.",
    subtitle: "Révolution, régions, patrimoine",
    tone: "deep",
  },
  {
    id: "vivre-en-societe",
    label: "Vivre en société",
    short: "Société",
    subtitle: "École, santé, démarches, travail",
    tone: "navy",
  },
];

const CATEGORY_BLUEPRINTS: Record<
  Category,
  Omit<SimConfig, "number" | "recommended">
> = {
  NAT: {
    key: "nat",
    title: "Naturalisation",
    subtitle: "Questions orientées NAT — niveau approfondi",
    category: "NAT",
    tag: "NAT",
    tone: "red",
  },
  CR: {
    key: "cr",
    title: "Carte de Résident",
    subtitle: "Questions orientées CR — niveau intermédiaire",
    category: "CR",
    tag: "CR",
    tone: "deep",
  },
  CSP: {
    key: "csp",
    title: "Carte de Séjour Pluriannuelle",
    subtitle: "Questions orientées CSP — niveau fondamental",
    category: "CSP",
    tag: "CSP",
    tone: "navy",
  },
};

const RUNS_PER_THEME = 5;

/**
 * Construit la liste des simulations. Le cas de l'utilisateur courant
 * est placé en première position avec le drapeau `recommended: true`.
 */
export function buildSimulations(userGoal: Category | null): SimConfig[] {
  const out: SimConfig[] = [];

  const orderedCats: Category[] = ["NAT", "CR", "CSP"];
  if (userGoal && orderedCats.includes(userGoal)) {
    orderedCats.splice(orderedCats.indexOf(userGoal), 1);
    orderedCats.unshift(userGoal);
  }

  let n = 1;
  for (const cat of orderedCats) {
    out.push({
      ...CATEGORY_BLUEPRINTS[cat],
      number: n++,
      recommended: cat === userGoal,
    });
  }

  out.push({
    key: "mix",
    number: n++,
    title: "Mix général",
    subtitle: "Toutes catégories, tous thèmes — 40 questions tirées au sort",
    tag: "Mix",
    tone: "navy",
  });

  for (const theme of THEME_SETUPS) {
    for (let run = 1; run <= RUNS_PER_THEME; run++) {
      out.push({
        key: `${theme.id}-${run}`,
        number: n++,
        title: `${theme.label} — Série ${run}`,
        subtitle: theme.subtitle,
        themes: [theme.id],
        tag: theme.short,
        tone: theme.tone,
      });
    }
  }

  return out;
}

/**
 * Retourne la simulation suivante par rapport à `currentKey`.
 * Pour les séries thématiques (ex: "histoire-geographie-culture-1") :
 *   - prend la série suivante du même thème (`-2`, `-3`...)
 *   - boucle au début de la série quand on dépasse la dernière (1 → 2 → … → 5 → 1)
 * Pour les autres simulations (NAT, CR, CSP, mix) : retourne `null`.
 */
export function getNextSimulation(
  currentKey: string | null | undefined,
  userGoal: Category | null
): SimConfig | null {
  if (!currentKey) return null;
  const sims = buildSimulations(userGoal);

  // Cas série thématique : "<themeId>-<run>"
  const match = currentKey.match(/^(.*)-(\d+)$/);
  if (match) {
    const themeBase = match[1];
    const currentRun = parseInt(match[2], 10);
    if (
      currentRun >= 1 &&
      THEME_SETUPS.some((t) => t.id === themeBase)
    ) {
      const nextRun = currentRun >= RUNS_PER_THEME ? 1 : currentRun + 1;
      const nextKey = `${themeBase}-${nextRun}`;
      return sims.find((s) => s.key === nextKey) ?? null;
    }
  }

  // Pas de simu suivante évidente pour NAT/CR/CSP/mix
  return null;
}

export const SIM_TONES: Record<
  SimTone,
  { bg: string; fg: string; shadow: string }
> = {
  navy: { bg: "#0055A4", fg: "#FFFFFF", shadow: "#0055A4" },
  red: { bg: "#EF4135", fg: "#FFFFFF", shadow: "#EF4135" },
  deep: { bg: "#0A0F1E", fg: "#FFFFFF", shadow: "#0A0F1E" },
  violet: { bg: "#7a4ae0", fg: "#FFFFFF", shadow: "#7a4ae0" },
};

/**
 * Simulations gratuites pour les utilisateurs sans abonnement :
 *   - 3 cas (NAT, CR, CSP)
 *   - 1ʳᵉ série de chacun des 5 thèmes
 *
 * Toutes les autres simulations (Mix + séries 2-5 par thème) nécessitent
 * un abonnement payant.
 */
export const FREE_SIM_KEYS = new Set<string>([
  // Sims dynamiques par cas
  "nat",
  "cr",
  "csp",
  // Premières séries thématiques
  "principes-valeurs-republique-1",
  "droits-et-devoirs-1",
  "systeme-institutionnel-1",
  "histoire-geographie-culture-1",
  "vivre-en-societe-1",
  // Pack pré-construit "gratuit" du client
  "pack-examen-civique-gratuit",
]);

/**
 * Détermine si une simulation est verrouillée pour cet utilisateur :
 *   - Plan gratuit + clé hors `FREE_SIM_KEYS` → verrouillée
 *   - Plan payant (monthly/quarterly/lifetime) → toutes accessibles
 */
export function isSimLocked(
  simKey: string | null | undefined,
  subscriptionPlan: string | null | undefined
): boolean {
  if (!simKey) return false;
  const plan = subscriptionPlan ?? "free";
  if (plan !== "free") return false;
  return !FREE_SIM_KEYS.has(simKey);
}
