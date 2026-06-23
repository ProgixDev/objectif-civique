import rawArticles from "./articles.json";
import { LIVRABLE_ARTICLES } from "./livrable";

/**
 * 37 articles longs format markdown — base de connaissances autour de
 * l'examen civique, la naturalisation, les titres de séjour.
 *
 * Source : FULL-DATA/3-articles/<slug>/lesson.md
 * Compilés en JSON par `scripts/merge-articles.mjs` (relancer si maj).
 */
export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  /** Date ISO "AAAA-MM-JJ". Peut être null si non trouvée dans l'article. */
  publishedAt: string | null;
  source: string;
  /** Résumé court (≤ 240 caractères) extrait automatiquement du body. */
  excerpt: string;
  /** Corps complet en markdown. */
  body: string;
};

// Articles FULL-DATA + articles de la 2ᵉ base (prepacivique), dédupliqués par
// slug (les articles existants priment).
const baseArticles = rawArticles as NewsArticle[];
const seenSlugs = new Set(baseArticles.map((a) => a.slug));
const livArticles = (LIVRABLE_ARTICLES as NewsArticle[]).filter(
  (a) => !seenSlugs.has(a.slug)
);

export const NEWS_ARTICLES: NewsArticle[] = [...baseArticles, ...livArticles];

/**
 * Catégorisation simple basée sur le slug. Utilisée pour afficher un pill
 * "naturalisation / titre de séjour / examen / général" sur la carte.
 */
export type NewsCategory =
  | "examen"
  | "naturalisation"
  | "titre-sejour"
  | "general";

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  examen: "Examen civique",
  naturalisation: "Naturalisation",
  "titre-sejour": "Titre de séjour",
  general: "Général",
};

export function categorizeArticle(a: NewsArticle): NewsCategory {
  const s = a.slug.toLowerCase();
  const t = a.title.toLowerCase();
  if (
    s.includes("naturalisation") ||
    s.includes("entretien") ||
    t.includes("naturalisation")
  )
    return "naturalisation";
  if (
    s.includes("titre-sejour") ||
    s.includes("carte-sejour") ||
    s.includes("carte-resident") ||
    t.includes("titre de séjour") ||
    t.includes("carte de résident")
  )
    return "titre-sejour";
  if (s.includes("examen") || t.includes("examen civique")) return "examen";
  return "general";
}
