import { Category, Question, ThemeId } from "@/types";
import rawExtra from "./extraContent.json";
import rawAllQuestions from "../../FULL-DATA/1-questions/_all.json";
import { resolveExplanation } from "./explanationLookup";

function isThemeId(v: string): v is ThemeId {
  return (
    v === "principes-valeurs-republique" ||
    v === "droits-et-devoirs" ||
    v === "systeme-institutionnel" ||
    v === "histoire-geographie-culture" ||
    v === "vivre-en-societe"
  );
}

/** Normalise un énoncé pour le matching (minuscules, sans HTML ni ponctuation). */
function normStatement(s: string): string {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9àâäéèêëïîôöùûüç]+/gi, " ")
    .trim();
}

/**
 * Index énoncé → thème, construit depuis le pool principal. Sert à récupérer le
 * thème des questions des Tests/Simulations (qui arrivent sans thème) pour que
 * le "détail par thème" reste correct.
 */
const THEME_BY_STATEMENT: Map<string, ThemeId> = (() => {
  const map = new Map<string, ThemeId>();
  for (const q of rawAllQuestions as { statement?: string; theme?: string }[]) {
    if (q?.statement && q.theme && isThemeId(q.theme)) {
      const key = normStatement(q.statement);
      if (!map.has(key)) map.set(key, q.theme);
    }
  }
  return map;
})();

/** Thème de repli quand l'énoncé n'est pas retrouvé dans le pool. */
const FALLBACK_THEME: ThemeId = "principes-valeurs-republique";

/**
 * Contenu additionnel compilé depuis les nouveaux dossiers FULL-DATA :
 *   - APPRENDRE, PREPA-INTENSE, REFERENTIEL, REFERENTIEL-OFFICIEL, SITUATION
 *     → Flashcards (Q&A sans choix QCM)
 *   - Tests : 20 sous-thèmes ciblés (QCM par sous-thème)
 *   - Simulations : 12 packs pré-construits (QCM)
 *
 * Compilé par `scripts/merge-new-data.mjs` — relancer si le client met à jour
 * FULL-DATA.
 */

type RawQuestion = {
  id: string;
  shortId?: string;
  categories: Category[];
  theme: ThemeId | null;
  statement: string;
  choices: { text: string; isCorrect: boolean }[];
  correctIndex: number;
  explanation: string;
  source?: string;
};

type RawExtraContent = {
  flashcards: RawQuestion[];
  testsBySubTheme: {
    id: string;
    title: string;
    questions: RawQuestion[];
  }[];
  simulationPacks: {
    id: string;
    slug: string;
    title: string;
    questions: RawQuestion[];
  }[];
  counts: {
    flashcards: number;
    testsBySubTheme: number;
    simulationPacks: number;
  };
};

const raw = rawExtra as RawExtraContent;

/**
 * Adapte une question brute au format `Question` de l'app.
 *
 * `keepWithoutTheme` : pour les Tests/Simulations dont les questions n'ont pas
 * de thème en source, on tente de récupérer le thème via l'énoncé, sinon on
 * applique un thème de repli (au lieu de jeter la question → évite les séries
 * à 0 question). Pour les flashcards, on garde le comportement strict.
 */
function adapt(
  q: RawQuestion,
  opts?: { keepWithoutTheme?: boolean }
): Question | null {
  let theme = q.theme;
  if (!theme) {
    theme = THEME_BY_STATEMENT.get(normStatement(q.statement)) ?? null;
    if (!theme) {
      if (!opts?.keepWithoutTheme) return null;
      theme = FALLBACK_THEME;
    }
  }
  const hasChoices = q.choices.length > 0;
  return {
    id: q.id,
    shortId: q.shortId,
    categories: q.categories,
    theme,
    text: q.statement,
    choices: q.choices.map((c) => c.text),
    correctIndex: q.correctIndex,
    // Les questions des dossiers Tests/ et Simulations/ ont des `id` distincts
    // et un `explanation` vide : on récupère l'explication par énoncé depuis le
    // pool officiel/IA. Voir `explanationLookup.ts`.
    explanation: resolveExplanation({
      id: q.id,
      statement: q.statement,
      explanation: q.explanation,
    }),
    type: hasChoices ? "qcm" : "flashcard",
    isOfficial: false,
    // Conserve la provenance FULL-DATA (PREPA-INTENSE, SITUATION, APPRENDRE, …)
    // pour pouvoir organiser et filtrer par banque dans l'app.
    source: q.source,
  };
}

/**
 * Contenu additionnel adapté, dédupliqué par id (déjà fait au merge).
 * On sépare ensuite selon la présence de choix QCM.
 */
const EXTRA_ALL: Question[] = raw.flashcards
  .map((q) => adapt(q))
  .filter((q): q is Question => q !== null);

/**
 * Questions QCM additionnelles (mises en situation de la source SITUATION) —
 * elles ont de vrais choix et doivent être jouables comme des QCM, pas
 * seulement affichées en flashcards. Réinjectées dans le pool `QUESTIONS`.
 */
export const EXTRA_QCM: Question[] = EXTRA_ALL.filter(
  (q) => q.choices.length >= 2 && q.correctIndex >= 0
);

/**
 * Vraies flashcards Q/R additionnelles (APPRENDRE + PREPA-INTENSE +
 * REFERENTIEL) — sans choix QCM, pour réviser en mode cartes.
 */
export const EXTRA_FLASHCARDS: Question[] = EXTRA_ALL.filter(
  (q) => q.choices.length === 0
);

/**
 * Tests ciblés par sous-thème (acces-aux-soins, devise-symboles, etc.).
 * Chaque sous-thème contient ses propres questions QCM exploitables.
 */
export type TargetedTest = {
  id: string;
  /** Libellé propre à afficher (ex: "Acces Aux Soins" → "Accès aux soins"). */
  title: string;
  questions: Question[];
};

const SUBTHEME_LABELS: Record<string, string> = {
  "acces-aux-soins": "Accès aux soins",
  "autorite-parentale-et-ecole": "Autorité parentale & école",
  demo: "Démonstration",
  "democratie-et-droit-de-vote": "Démocratie & droit de vote",
  "devise-et-symboles": "Devise & symboles",
  droits: "Droits",
  "droits-fondamentaux": "Droits fondamentaux",
  histoire: "Histoire",
  institutions: "Institutions",
  laicite: "Laïcité",
  "obligations-et-devoirs": "Obligations & devoirs",
  "organisation-de-la-republique": "Organisation de la République",
  "patrimoine-francais": "Patrimoine français",
  "periodes-et-personnages": "Périodes & personnages",
  republique: "République",
  "s-installer-et-resider": "S'installer et résider",
  "territoires-et-geographie": "Territoires & géographie",
  "travailler-en-france": "Travailler en France",
  "union-europeenne": "Union européenne",
  vivre: "Vivre en France",
};

export const TARGETED_TESTS: TargetedTest[] = raw.testsBySubTheme.map((t) => ({
  id: t.id,
  title: SUBTHEME_LABELS[t.id] ?? t.title,
  questions: t.questions
    .map((q) => adapt(q, { keepWithoutTheme: true }))
    .filter((q): q is Question => q !== null),
}));

/**
 * Packs de simulations pré-construits par le client.
 * Chaque pack contient ses propres questions (40 environ).
 * Affichés dans le catalogue à côté des simulations dynamiques.
 */
export type SimulationPack = {
  id: string;
  slug: string;
  title: string;
  questions: Question[];
};

const PACK_LABELS: Record<string, string> = {
  "examen-civique-1": "Examen blanc #1",
  "examen-civique-2": "Examen blanc #2",
  "examen-civique-3": "Examen blanc #3",
  "examen-civique-4": "Examen blanc #4",
  "examen-civique-5": "Examen blanc #5",
  "examen-civique-carte-resident": "Spécial Carte de Résident",
  "examen-civique-carte-sejour-pluriannuelle":
    "Spécial Carte de Séjour Pluriannuelle",
  "examen-civique-challenge": "Challenge",
  "examen-civique-gratuit": "Examen blanc gratuit",
  "examen-civique-mise-en-situation-1": "Mise en situation #1",
  "examen-civique-mise-en-situation-2": "Mise en situation #2",
  "examen-civique-naturalisation": "Spécial Naturalisation",
};

export const SIMULATION_PACKS: SimulationPack[] = raw.simulationPacks.map(
  (p) => ({
    id: p.id,
    slug: p.slug,
    title: PACK_LABELS[p.slug] ?? p.title,
    questions: p.questions
      .map((q) => adapt(q, { keepWithoutTheme: true }))
      .filter((q): q is Question => q !== null),
  })
);
