import { Category, Question, ThemeId } from "@/types";
import { resolveExplanation, resolveTheme } from "./explanationLookup";
import { LIVRABLE_TESTS } from "./livrable";

// ── Test par chapitre — FULL-DATA/Tests_test_civique (14 chapitres fins) ──
import accesAuxSoins from "../../FULL-DATA/Tests_test_civique/acces-aux-soins-all.json";
import autoriteParentale from "../../FULL-DATA/Tests_test_civique/autorite-parentale-et-ecole-all.json";
import democratieVote from "../../FULL-DATA/Tests_test_civique/democratie-et-droit-de-vote-all.json";
import deviseSymboles from "../../FULL-DATA/Tests_test_civique/devise-et-symboles-all.json";
import droitsFondamentaux from "../../FULL-DATA/Tests_test_civique/droits-fondamentaux-all.json";
import laicite from "../../FULL-DATA/Tests_test_civique/laicite-all.json";
import obligationsDevoirs from "../../FULL-DATA/Tests_test_civique/obligations-et-devoirs-all.json";
import organisationRepublique from "../../FULL-DATA/Tests_test_civique/organisation-de-la-republique-all.json";
import patrimoineFrancais from "../../FULL-DATA/Tests_test_civique/patrimoine-francais-all.json";
import periodesPersonnages from "../../FULL-DATA/Tests_test_civique/periodes-et-personnages-all.json";
import sInstallerResider from "../../FULL-DATA/Tests_test_civique/s-installer-et-resider-all.json";
import territoiresGeographie from "../../FULL-DATA/Tests_test_civique/territoires-et-geographie-all.json";
import travaillerEnFrance from "../../FULL-DATA/Tests_test_civique/travailler-en-france-all.json";
import unionEuropeenne from "../../FULL-DATA/Tests_test_civique/union-europeenne-all.json";

// ── Test par catégories — FULL-DATA/Tests_examen_civique (6 catégories) ──
import catDemo from "../../FULL-DATA/Tests_examen_civique/demo-all.json";
import catDroits from "../../FULL-DATA/Tests_examen_civique/droits-all.json";
import catHistoire from "../../FULL-DATA/Tests_examen_civique/histoire-all.json";
import catInstitutions from "../../FULL-DATA/Tests_examen_civique/institutions-all.json";
import catRepublique from "../../FULL-DATA/Tests_examen_civique/republique-all.json";
import catVivre from "../../FULL-DATA/Tests_examen_civique/vivre-all.json";

/**
 * Tests issus des deux dossiers FULL-DATA fournis par le client :
 *   - `Tests_test_civique`   → « Test par chapitre »  (14 chapitres fins)
 *   - `Tests_examen_civique` → « Test par catégories » (6 catégories)
 *
 * Schéma source par entrée : `{ question: { id, shortId, category, statement,
 * choices: [{text,isCorrect}], explanation } }`. Les énoncés/explications sont
 * en HTML (nettoyés ici) et beaucoup d'explications sont vides → récupérées par
 * énoncé via `explanationLookup`. Le `theme` (parmi les 5) est lui aussi
 * retrouvé par énoncé, avec repli par fichier.
 */

type RawTestItem = {
  question: {
    id: string;
    shortId?: string;
    category?: string | string[] | null;
    statement: string;
    choices?: { text: string; isCorrect: boolean }[] | null;
    explanation?: string | null;
  };
};

export type CivicTest = {
  id: string;
  title: string;
  questions: Question[];
};

const CAT_MAP: Record<string, Category> = {
  nat: "NAT",
  cr: "CR",
  csp: "CSP",
};

/** Retire les balises HTML et compacte les espaces. */
function stripHtml(s: string | undefined | null): string {
  return (s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toCategories(raw: string | string[] | null | undefined): Category[] {
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list
    .map((c) => CAT_MAP[c.toLowerCase()])
    .filter((c): c is Category => Boolean(c));
}

function adapt(item: RawTestItem, fallbackTheme: ThemeId): Question | null {
  const q = item.question;
  if (!q) return null;
  const choices = q.choices ?? [];
  const correctIndex = choices.findIndex((c) => c.isCorrect);
  if (choices.length < 2 || correctIndex < 0) return null;

  const statement = stripHtml(q.statement);
  return {
    id: q.id,
    shortId: q.shortId,
    categories: toCategories(q.category),
    theme: resolveTheme({ id: q.id, statement }) ?? fallbackTheme,
    text: statement,
    choices: choices.map((c) => stripHtml(c.text)),
    correctIndex,
    explanation: resolveExplanation({
      id: q.id,
      statement,
      explanation: stripHtml(q.explanation),
    }),
    type: "qcm",
    isOfficial: false,
    source: "tests-civique",
  };
}

function buildTest(
  id: string,
  title: string,
  raw: unknown,
  fallbackTheme: ThemeId
): CivicTest {
  const items = (raw as RawTestItem[]) ?? [];
  const seen = new Set<string>();
  const questions: Question[] = [];
  for (const it of items) {
    const adapted = adapt(it, fallbackTheme);
    if (!adapted || seen.has(adapted.id)) continue;
    seen.add(adapted.id);
    questions.push(adapted);
  }
  return { id, title, questions };
}

/** « Test par chapitre » — 14 chapitres fins (Tests_test_civique). */
export const CHAPTER_TESTS: CivicTest[] = [
  buildTest("acces-aux-soins", "Accès aux soins", accesAuxSoins, "vivre-en-societe"),
  buildTest("autorite-parentale-et-ecole", "Autorité parentale & école", autoriteParentale, "vivre-en-societe"),
  buildTest("democratie-et-droit-de-vote", "Démocratie & droit de vote", democratieVote, "systeme-institutionnel"),
  buildTest("devise-et-symboles", "Devise & symboles", deviseSymboles, "principes-valeurs-republique"),
  buildTest("droits-fondamentaux", "Droits fondamentaux", droitsFondamentaux, "droits-et-devoirs"),
  buildTest("laicite", "Laïcité", laicite, "principes-valeurs-republique"),
  buildTest("obligations-et-devoirs", "Obligations & devoirs", obligationsDevoirs, "droits-et-devoirs"),
  buildTest("organisation-de-la-republique", "Organisation de la République", organisationRepublique, "systeme-institutionnel"),
  buildTest("patrimoine-francais", "Patrimoine français", patrimoineFrancais, "histoire-geographie-culture"),
  buildTest("periodes-et-personnages", "Périodes & personnages", periodesPersonnages, "histoire-geographie-culture"),
  buildTest("s-installer-et-resider", "S'installer & résider", sInstallerResider, "vivre-en-societe"),
  buildTest("territoires-et-geographie", "Territoires & géographie", territoiresGeographie, "histoire-geographie-culture"),
  buildTest("travailler-en-france", "Travailler en France", travaillerEnFrance, "vivre-en-societe"),
  buildTest("union-europeenne", "Union européenne", unionEuropeenne, "systeme-institutionnel"),
].filter((t) => t.questions.length > 0);

/** « Test par catégories » — 6 catégories (Tests_examen_civique). */
export const CATEGORY_TESTS: CivicTest[] = [
  buildTest("demo", "Démonstration", catDemo, "principes-valeurs-republique"),
  buildTest("droits", "Droits & devoirs", catDroits, "droits-et-devoirs"),
  buildTest("histoire", "Histoire & culture", catHistoire, "histoire-geographie-culture"),
  buildTest("institutions", "Institutions", catInstitutions, "systeme-institutionnel"),
  buildTest("republique", "République & valeurs", catRepublique, "principes-valeurs-republique"),
  buildTest("vivre", "Vivre en France", catVivre, "vivre-en-societe"),
].filter((t) => t.questions.length > 0);

export type CivicTestKind = "chapter" | "category" | "livrable";

/** Retrouve un test par sa nature et son id (pour l'écran d'entraînement). */
export function findCivicTest(
  kind: CivicTestKind,
  id: string
): CivicTest | undefined {
  if (kind === "livrable") return LIVRABLE_TESTS.find((t) => t.id === id);
  const pool = kind === "chapter" ? CHAPTER_TESTS : CATEGORY_TESTS;
  return pool.find((t) => t.id === id);
}
