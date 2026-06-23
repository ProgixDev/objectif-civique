#!/usr/bin/env node
/**
 * Compte le contenu réellement exposé par l'app, en répliquant la logique
 * d'assemblage de src/data/questions.ts (base FULL-DATA + EXTRA + LIVRABLE).
 *     node scripts/count-content.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf-8"));

const THEMES = [
  "principes-valeurs-republique",
  "droits-et-devoirs",
  "systeme-institutionnel",
  "histoire-geographie-culture",
  "vivre-en-societe",
];
const isTheme = (t) => THEMES.includes(t);
const norm = (s) =>
  (s ?? "")
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9àâäéèêëïîôöùûüç]+/gi, " ")
    .trim();

const all = read("FULL-DATA/1-questions/_all.json");
const extra = read("src/data/extraContent.json");
const liv = read("src/data/livrable.json");

// Map énoncé → thème (pour récupérer le thème côté EXTRA, comme l'app).
const themeByStatement = new Map();
for (const q of all) {
  if (q.statement && isTheme(q.theme)) {
    const k = norm(q.statement);
    if (!themeByStatement.has(k)) themeByStatement.set(k, q.theme);
  }
}

// 1) BASE QCM (FULL-DATA/_all.json)
const baseQcm = [];
for (const q of all) {
  if (!isTheme(q.theme)) continue;
  const choices = q.choices ?? [];
  const ci = choices.findIndex((c) => c.isCorrect);
  if (choices.length >= 2 && ci >= 0) baseQcm.push({ id: q.id, text: q.statement });
}

// 2) EXTRA_QCM (extraContent.json.flashcards, theme strict-recover, choix>=2)
const extraQcm = [];
for (const q of extra.flashcards ?? []) {
  let theme = q.theme;
  if (!theme) theme = themeByStatement.get(norm(q.statement)) ?? null;
  if (!theme) continue; // EXTRA strict : pas de fallback
  const choices = q.choices ?? [];
  if (choices.length >= 2 && q.correctIndex >= 0)
    extraQcm.push({ id: q.id, text: q.statement });
}

// dedup base+extra par id
const byId = new Set();
const pool = [];
for (const q of [...baseQcm, ...extraQcm]) {
  if (byId.has(q.id)) continue;
  byId.add(q.id);
  pool.push(q);
}

// 3) + LIVRABLE questions nouvelles (dédup par énoncé)
const seenText = new Set(pool.map((q) => norm(q.text)));
let livAdded = 0;
for (const q of liv.questions ?? []) {
  if (!(q.choices?.length >= 2) || q.correctIndex < 0) continue;
  const k = norm(q.text);
  if (seenText.has(k)) continue;
  seenText.add(k);
  pool.push({ id: q.id, text: q.text });
  livAdded++;
}

// Flashcards
const baseFlash = all.filter((q) => isTheme(q.theme) && q.type === "flashcard");
const extraFlash = (extra.flashcards ?? []).filter(
  (q) => (q.choices ?? []).length === 0
);
const flashIds = new Set();
let flashCount = 0;
for (const q of [...baseFlash, ...extraFlash]) {
  if (flashIds.has(q.id)) continue;
  flashIds.add(q.id);
  flashCount++;
}

// Simulations
const dynamicSims = 3 /*cas*/ + 1 /*mix*/ + 5 * 5; /*5 thèmes × 5 séries*/
const examPacks = (extra.simulationPacks?.length ?? 0) + (liv.exams?.length ?? 0);

console.log("════════ CONTENU TOTAL DE L'APP ════════");
console.log("QUESTIONS (QCM jouables) :", pool.length);
console.log("   ├─ base FULL-DATA      :", baseQcm.length);
console.log("   ├─ + mises en situation:", extraQcm.length);
console.log("   └─ + 2ᵉ base (nouvelles):", livAdded, `(sur ${liv.questions.length} converties)`);
console.log("FLASHCARDS               :", flashCount);
console.log("");
console.log("SIMULATIONS (total)      :", dynamicSims + examPacks);
console.log("   ├─ simulations dynamiques:", dynamicSims);
console.log("   └─ examens blancs (packs):", examPacks, `(${extra.simulationPacks?.length ?? 0} FULL-DATA + ${liv.exams.length} 2ᵉ base)`);
console.log("");
console.log("TESTS (catalogue)        :",
  "14 chapitres + 6 catégories +", liv.tests.length, "sections =", 20 + liv.tests.length);
console.log("ARTICLES (+2ᵉ base)      : +" + liv.articles.length);
console.log("GUIDES / PRÉPA / PAGES   :", liv.guides.length, "/", liv.preparation.length, "/", liv.pages.length);
