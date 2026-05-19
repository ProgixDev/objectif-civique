import rawGuide from "./guideContent.json";
import { ThemeId } from "@/types";

/**
 * Contenu pédagogique compilé depuis FULL-DATA/2-guides-pedagogiques/.
 * Recompiler via `node scripts/merge-guide.mjs` si la base client est mise à jour.
 */

export type LivretChapter = {
  id: string;
  order: number;
  title: string;
  /** Corps en markdown (parsé par MarkdownView). */
  body: string;
};

export type Course = {
  id: string;
  themeId: ThemeId;
  subTheme: string;
  order: number;
  title: string;
  body: string;
};

export type Fiche = {
  id: string;
  shortId: string;
  title: string;
  content: string;
  themeId: ThemeId;
  subTheme: string | null;
};

export type Notion = {
  id: string;
  shortId: string;
  themeId: ThemeId;
  question: string;
  answer: string;
};

type RawGuide = {
  livret: LivretChapter[];
  courses: Course[];
  fiches: Fiche[];
  notions: Notion[];
  counts: {
    livret: number;
    courses: number;
    fiches: number;
    notions: number;
  };
};

const guide = rawGuide as RawGuide;

export const LIVRET_CHAPTERS: LivretChapter[] = guide.livret;
export const COURSES: Course[] = guide.courses;
export const FICHES: Fiche[] = guide.fiches;
export const NOTIONS: Notion[] = guide.notions;

/** En-tête affiché dans l'écran Guide. */
export const GUIDE_INTRO = {
  title: "Guide pédagogique",
  tagline:
    "Livret du citoyen, cours, fiches de révision et notions détaillées — tout le contenu pédagogique d'Objectif Civique.",
};

/** Outils internes affichés en fin de page Guide. */
export type GuideTool = {
  title: string;
  subtitle: string;
  route: string;
  icon: string;
};

export const GUIDE_TOOLS: GuideTool[] = [
  {
    title: "Test d'éligibilité",
    subtitle: "Vérifiez si vous êtes dispensé(e) de l'examen civique.",
    route: "/eligibility",
    icon: "ShieldQuestion",
  },
  {
    title: "Centres d'examen",
    subtitle: `Trouvez l'un des 216 centres en France.`,
    route: "/exam-centers",
    icon: "MapPin",
  },
  {
    title: "Actualités",
    subtitle: "Articles à jour sur la naturalisation et le séjour.",
    route: "/news",
    icon: "Newspaper",
  },
  {
    title: "Forum",
    subtitle: "Échangez avec d'autres candidats.",
    route: "/forum",
    icon: "MessagesSquare",
  },
];
