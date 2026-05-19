import rawCenters from "./examCenters.json";

/**
 * 216 centres d'examen civique en France (180 villes).
 *
 * Source : FULL-DATA/4-centres-examen/par-ville/*.json (data client)
 * Fusionnés en un seul fichier par `scripts/merge-exam-centers.mjs` —
 * relancer ce script si la base client est mise à jour.
 */
export type ExamCenter = {
  id: string;
  shortId: string;
  name: string;
  address: string;
  postalCode: string;
  /** Nom de la ville en majuscules (tel que dans la source) */
  city: string;
  /** Slug en minuscules sans accent (pour recherche/url) */
  citySlug: string;
  /** Nom de la ville avec accents et casse propre */
  cityLabel: string;
};

export const EXAM_CENTERS: ExamCenter[] = rawCenters as ExamCenter[];
