import { ThemeId } from "@/types";
import rawAllQuestions from "../../FULL-DATA/1-questions/_all.json";
import rawGeneratedExplanations from "./explanations.generated.json";

/**
 * Résolution unifiée des explications.
 *
 * Problème résolu : les dossiers `FULL-DATA/Tests/` et `FULL-DATA/Simulations/`
 * réutilisent les mêmes énoncés officiels MAIS avec d'autres `id` et un champ
 * `explanation` vide. Sans rapprochement, ces questions affichaient le repli
 * « La bonne réponse est : … » alors qu'une vraie explication (source ou
 * générée par IA) existe pour le même énoncé dans `1-questions/_all.json`.
 *
 * On indexe donc toutes les explications connues par `id` ET par énoncé
 * normalisé, puis on résout dans cet ordre :
 *   1. explication rédigée portée par la question elle-même ;
 *   2. explication connue pour le même `id` (source ou IA) ;
 *   3. explication connue pour le même énoncé (cas Tests/ et Simulations/).
 */

const GENERATED = rawGeneratedExplanations as Record<string, string>;

type RawQ = {
  id: string;
  statement?: string;
  explanation?: string | null;
  theme?: string | null;
};

const THEME_IDS: ThemeId[] = [
  "principes-valeurs-republique",
  "droits-et-devoirs",
  "systeme-institutionnel",
  "histoire-geographie-culture",
  "vivre-en-societe",
];
function isThemeId(v: string | null | undefined): v is ThemeId {
  return !!v && (THEME_IDS as string[]).includes(v);
}

/** Normalise un énoncé pour l'indexation : retire le HTML, compacte les espaces. */
function normStatement(s: string | undefined | null): string {
  return (s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const byId = new Map<string, string>();
const byStatement = new Map<string, string>();
const themeById = new Map<string, ThemeId>();
const themeByStatement = new Map<string, ThemeId>();

for (const q of rawAllQuestions as RawQ[]) {
  const expl = (q.explanation && q.explanation.trim()) || GENERATED[q.id] || "";
  const key = normStatement(q.statement);
  if (expl) {
    byId.set(q.id, expl);
    if (key && !byStatement.has(key)) byStatement.set(key, expl);
  }
  if (isThemeId(q.theme)) {
    themeById.set(q.id, q.theme);
    if (key && !themeByStatement.has(key)) themeByStatement.set(key, q.theme);
  }
}

// Explications IA indexées même si leur question d'origine a disparu du pool.
for (const [id, expl] of Object.entries(GENERATED)) {
  if (expl && expl.trim() && !byId.has(id)) byId.set(id, expl);
}

export function resolveExplanation(opts: {
  id?: string;
  statement?: string;
  explanation?: string | null;
}): string {
  const written = (opts.explanation ?? "").trim();
  if (written) return written;
  if (opts.id) {
    const hit = byId.get(opts.id);
    if (hit) return hit;
  }
  const key = normStatement(opts.statement);
  if (key) {
    const hit = byStatement.get(key);
    if (hit) return hit;
  }
  return "";
}

/**
 * Thème officiel (parmi les 5) d'une question, retrouvé par `id` puis par
 * énoncé. Utilisé pour classer les questions des dossiers Tests_*_civique qui
 * ne portent pas de champ `theme`. Renvoie `undefined` si introuvable.
 */
export function resolveTheme(opts: {
  id?: string;
  statement?: string;
}): ThemeId | undefined {
  if (opts.id) {
    const hit = themeById.get(opts.id);
    if (hit) return hit;
  }
  const key = normStatement(opts.statement);
  if (key) {
    const hit = themeByStatement.get(key);
    if (hit) return hit;
  }
  return undefined;
}
