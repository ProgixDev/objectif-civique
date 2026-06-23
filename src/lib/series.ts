/**
 * Découpage en "séries" de taille fixe.
 *
 * Règle métier (demande client) : une série ne doit jamais dépasser 40
 * questions/cartes. Un pool de 80 → 2 séries de 40, etc. Utilisé par la
 * révision par thème, les tests par catégorie et les flashcards.
 */
export const SERIES_SIZE = 40;

/** Nombre de séries nécessaires pour couvrir `total` éléments. */
export function seriesCount(total: number): number {
  if (total <= 0) return 0;
  return Math.ceil(total / SERIES_SIZE);
}

/** Bornes [start, end) de la série `index` (0-based) dans un pool de `total`. */
export function seriesRange(
  index: number,
  total: number
): { start: number; end: number } {
  const start = index * SERIES_SIZE;
  return { start, end: Math.min(start + SERIES_SIZE, total) };
}

/** Découpe un tableau en sa série `index`. */
export function seriesSlice<T>(items: T[], index: number): T[] {
  const { start, end } = seriesRange(index, items.length);
  return items.slice(start, end);
}
