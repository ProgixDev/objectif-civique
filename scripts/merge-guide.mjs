#!/usr/bin/env node
/**
 * Compile l'arborescence FULL-DATA/2-guides-pedagogiques en un seul JSON :
 *   - livret_citoyen : 9 chapitres officiels (markdown)
 *   - cours          : 37 leçons regroupées par thème > sous-thème
 *   - fiches         : 20 fiches de révision (JSON déjà structuré)
 *   - notions        : ~36 notions détaillées (Q/R)
 *
 *     node scripts/merge-guide.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const GUIDE_DIR = path.join(ROOT, "FULL-DATA", "2-guides-pedagogiques");
const OUTPUT_FILE = path.join(ROOT, "src", "data", "guideContent.json");

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function readMd(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

function extractTitle(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

/** Récupère le body sans le titre, en strippant les premières lignes vides. */
function stripFirstHeading(md) {
  return md.replace(/^#\s+.+\n/, "").replace(/^\s+/, "");
}

// Mapping dossier thème → ThemeId attendu par l'app
const THEME_MAP = {
  "1-principes-valeurs-republique": "principes-valeurs-republique",
  "2-droits-et-devoirs": "droits-et-devoirs",
  "3-systeme-institutionnel": "systeme-institutionnel",
  "4-histoire-geographie-culture": "histoire-geographie-culture",
  "5-vivre-en-societe": "vivre-en-societe",
};

// ─────────────────────────────────────────────────────────────
// 1. Livret citoyen — 9 chapitres
// ─────────────────────────────────────────────────────────────

const livretDir = path.join(GUIDE_DIR, "livret-officiel-citoyen");
const livretChapters = [];
const livretFolders = fs
  .readdirSync(livretDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const folder of livretFolders) {
  const md = readMd(path.join(livretDir, folder, "lesson.md"));
  livretChapters.push({
    id: folder,
    order: parseInt(folder.split("-")[0], 10),
    title: extractTitle(md) ?? folder,
    body: stripFirstHeading(md),
  });
}

// ─────────────────────────────────────────────────────────────
// 2. Cours — 37 leçons hiérarchisées
// ─────────────────────────────────────────────────────────────

const coursDir = path.join(GUIDE_DIR, "cours");
const courses = [];
const themeFolders = fs
  .readdirSync(coursDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const themeFolder of themeFolders) {
  const themeId = THEME_MAP[themeFolder] ?? themeFolder;
  const subFolders = fs
    .readdirSync(path.join(coursDir, themeFolder), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const subFolder of subFolders) {
    const leafFolders = fs
      .readdirSync(path.join(coursDir, themeFolder, subFolder), {
        withFileTypes: true,
      })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();

    for (const leafFolder of leafFolders) {
      const lessonPath = path.join(
        coursDir,
        themeFolder,
        subFolder,
        leafFolder,
        "lesson.md"
      );
      if (!fs.existsSync(lessonPath)) continue;
      const md = readMd(lessonPath);
      courses.push({
        id: `${themeFolder}/${subFolder}/${leafFolder}`,
        themeId,
        subTheme: subFolder,
        order: parseInt(leafFolder.split("-")[0], 10),
        title: extractTitle(md) ?? leafFolder,
        body: stripFirstHeading(md),
      });
    }
  }
}

// ─────────────────────────────────────────────────────────────
// 3. Fiches de révision — 20 cartes
// ─────────────────────────────────────────────────────────────

const fichesAll = JSON.parse(
  readMd(path.join(GUIDE_DIR, "fiches-revision", "all.json"))
);
const fiches = fichesAll.map((f) => ({
  id: f.id,
  shortId: f.shortId,
  title: f.title,
  content: f.content,
  themeId: f.theme,
  subTheme: f.subTheme,
}));

// ─────────────────────────────────────────────────────────────
// 4. Notions détaillées — ~36 entrées Q/R
// ─────────────────────────────────────────────────────────────

const notionsDir = path.join(GUIDE_DIR, "notions-detaillees");
const notionFiles = fs
  .readdirSync(notionsDir)
  .filter((f) => f.endsWith(".json") && f !== "all.json")
  .sort();

const notions = [];
for (const file of notionFiles) {
  const arr = JSON.parse(readMd(path.join(notionsDir, file)));
  const themeFolder = file.replace(/\.json$/, "");
  const themeId = THEME_MAP[themeFolder] ?? themeFolder;
  for (const n of arr) {
    notions.push({
      id: n.id,
      shortId: n.shortId,
      themeId,
      question: n.question,
      answer: n.answer,
    });
  }
}

// ─────────────────────────────────────────────────────────────
// Write output
// ─────────────────────────────────────────────────────────────

const out = {
  livret: livretChapters,
  courses,
  fiches,
  notions,
  counts: {
    livret: livretChapters.length,
    courses: courses.length,
    fiches: fiches.length,
    notions: notions.length,
  },
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(out, null, 0), "utf-8");
console.log(
  `Wrote: livret=${livretChapters.length}, courses=${courses.length}, fiches=${fiches.length}, notions=${notions.length}`
);
console.log(`Output: ${OUTPUT_FILE}`);
