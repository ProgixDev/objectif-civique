#!/usr/bin/env node
/**
 * Compile les nouveaux dossiers FULL-DATA (APPRENDRE, PREPA-INTENSE, REFERENTIEL,
 * REFERENTIEL-OFFICIEL, SITUATION, Tests, Simulations, Guide) en JSON exploitables
 * par l'app.
 *
 *  - Strip HTML (<p>, <strong>, <em>, <ul>, <li>, etc.)
 *  - Mappe les categories du client (csp/cr/nat/ec-fiche/ltc/...) vers app Categories
 *  - Déduplique par `id` à travers toutes les sources
 *
 *     node scripts/merge-new-data.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const FULL_DATA = path.join(ROOT, "FULL-DATA");
const OUTPUT = path.join(ROOT, "src", "data", "extraContent.json");

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div|h\d)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<\/?strong>/gi, "")
    .replace(/<\/?em>/gi, "")
    .replace(/<\/?b>/gi, "")
    .replace(/<\/?i>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Convertit les categories raw du client vers les Category[] de l'app. */
function mapCategories(raw) {
  if (!Array.isArray(raw)) return ["NAT", "CR", "CSP"];
  const cats = new Set();
  for (const r of raw) {
    const v = String(r).toLowerCase();
    if (v === "nat") cats.add("NAT");
    else if (v === "cr") cats.add("CR");
    else if (v === "csp") cats.add("CSP");
  }
  // Aucune cat spécifique = applicable à tous les cas (fiches/référentiel généraux)
  if (cats.size === 0) return ["NAT", "CR", "CSP"];
  return [...cats];
}

const VALID_THEMES = new Set([
  "principes-valeurs-republique",
  "droits-et-devoirs",
  "systeme-institutionnel",
  "histoire-geographie-culture",
  "vivre-en-societe",
]);

/** Devine le thème depuis le nom de fichier (republique, droits, institutions, histoire, vivre). */
function themeFromFilename(filename) {
  const base = path.basename(filename, ".json").toLowerCase();
  if (base.startsWith("republique") || base === "republique-all")
    return "principes-valeurs-republique";
  if (base.startsWith("droits") || base.includes("devoir"))
    return "droits-et-devoirs";
  if (base.startsWith("institutions"))
    return "systeme-institutionnel";
  if (base.startsWith("histoire") || base.includes("geographie"))
    return "histoire-geographie-culture";
  if (base.startsWith("vivre"))
    return "vivre-en-societe";
  return null;
}

/**
 * Lit un fichier JSON contenant `[{question: {...}}, ...]` et retourne les
 * questions normalisées au format de l'app. Conserve un champ `source`
 * indiquant la provenance.
 */
function loadQuestionsFile(filePath, sourceTag, defaultTheme = null) {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const out = [];
  for (const entry of raw) {
    const q = entry.question ?? entry;
    if (!q || !q.id) continue;
    const choices = (q.choices ?? []).map((c) => ({
      text: stripHtml(c.text),
      isCorrect: !!c.isCorrect,
    }));
    out.push({
      id: q.id,
      shortId: q.shortId,
      categories: mapCategories(q.category),
      theme: defaultTheme ?? themeFromFilename(filePath) ?? null,
      statement: stripHtml(q.statement),
      choices,
      correctIndex: choices.findIndex((c) => c.isCorrect),
      explanation: stripHtml(q.explanation),
      source: sourceTag,
    });
  }
  return out;
}

/** Charge tous les fichiers d'un dossier (1 par thème). */
function loadFolder(folderName, sourceTag) {
  const folder = path.join(FULL_DATA, folderName);
  if (!fs.existsSync(folder)) {
    console.warn(`Skip: ${folderName} introuvable`);
    return [];
  }
  const files = fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => f !== "_index.json");
  const all = [];
  for (const f of files) {
    all.push(...loadQuestionsFile(path.join(folder, f), sourceTag));
  }
  return all;
}

// ─────────────────────────────────────────────────────────────
// Sources
// ─────────────────────────────────────────────────────────────

console.log("Compilation des nouvelles sources...");

// Flashcards (sans choix QCM) — agrégés depuis les 4 sources Q&A
const apprendre = loadFolder("APPRENDRE", "APPRENDRE");
const prepa = loadFolder("PREPA-INTENSE", "PREPA-INTENSE");
const referentiel = loadFolder("REFERENTIEL", "REFERENTIEL");
const referentielOff = loadFolder("REFERENTIEL-OFFICIEL", "REFERENTIEL-OFFICIEL");
const situation = loadFolder("SITUATION", "SITUATION");

// Tests : QCM par sous-thème (acces-aux-soins, devise-symboles, etc.)
const testsDir = path.join(FULL_DATA, "Tests");
const testFiles = fs.readdirSync(testsDir).filter((f) => f.endsWith(".json"));
const testsBySubTheme = [];
for (const f of testFiles) {
  const slug = path.basename(f, "-all.json");
  const questions = loadQuestionsFile(
    path.join(testsDir, f),
    `Tests/${slug}`
  );
  // Auto-détermine un titre humain à partir du slug
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  testsBySubTheme.push({
    id: slug,
    title,
    questions,
  });
}

// Simulations : 12 packs pré-construits
const simulationsDir = path.join(FULL_DATA, "Simulations");
const simFiles = fs
  .readdirSync(simulationsDir)
  .filter((f) => f.endsWith(".json"));
const simulationPacks = [];
for (const f of simFiles) {
  const slug = path.basename(f, "-all.json");
  const questions = loadQuestionsFile(
    path.join(simulationsDir, f),
    `Simulations/${slug}`
  );
  // Titre humain à partir du slug
  const title = slug
    .replace(/^examen-civique-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Simulation";
  simulationPacks.push({
    id: slug,
    slug,
    title: title.trim(),
    questions,
  });
}

// ─────────────────────────────────────────────────────────────
// Fusion + dédup pour les flashcards
// ─────────────────────────────────────────────────────────────

const flashcardsRaw = [
  ...apprendre,
  ...prepa,
  ...referentiel,
  ...referentielOff,
  ...situation,
];
const seenFlashIds = new Set();
const flashcards = [];
for (const q of flashcardsRaw) {
  if (seenFlashIds.has(q.id)) continue;
  seenFlashIds.add(q.id);
  flashcards.push(q);
}

console.log(
  `Flashcards : ${flashcards.length} uniques (sur ${flashcardsRaw.length} brutes, ${flashcardsRaw.length - flashcards.length} doublons inter-sources)`
);
console.log(
  `Tests ciblés : ${testsBySubTheme.length} sous-thèmes, ${testsBySubTheme.reduce((acc, t) => acc + t.questions.length, 0)} questions total`
);
console.log(
  `Simulations packs : ${simulationPacks.length} packs, ${simulationPacks.reduce((acc, p) => acc + p.questions.length, 0)} questions total`
);

// ─────────────────────────────────────────────────────────────
// Sortie
// ─────────────────────────────────────────────────────────────

const out = {
  flashcards,
  testsBySubTheme,
  simulationPacks,
  counts: {
    flashcards: flashcards.length,
    testsBySubTheme: testsBySubTheme.length,
    simulationPacks: simulationPacks.length,
  },
};

fs.writeFileSync(OUTPUT, JSON.stringify(out), "utf-8");
console.log(`Wrote ${OUTPUT}`);
