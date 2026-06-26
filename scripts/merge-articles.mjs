#!/usr/bin/env node
/**
 * Compile les articles markdown de FULL-DATA/3-articles/<slug>/lesson.md
 * en un seul fichier JSON consommable par l'app.
 *
 *     node scripts/merge-articles.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const ARTICLES_DIR = path.join(ROOT, "FULL-DATA", "3-articles");
const OUTPUT_FILE = path.join(ROOT, "src", "data", "articles.json");

/** Convertit "01/02/2026" en ISO "2026-02-01" pour tri facile. */
function frenchDateToIso(dateStr) {
  const m = dateStr?.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

/** Construit un extrait court à partir du body (première phrase pleine). */
function buildExcerpt(body, maxChars = 240) {
  const flat = body
    .replace(/^!\[.*?\]\(.*?\)$/gm, "") // images markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // liens [texte](url) -> texte
    .replace(/[*_`#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (flat.length <= maxChars) return flat;
  return flat.slice(0, maxChars).trimEnd() + "…";
}

const folders = fs
  .readdirSync(ARTICLES_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const articles = [];
for (const folder of folders) {
  const lessonPath = path.join(ARTICLES_DIR, folder, "lesson.md");
  if (!fs.existsSync(lessonPath)) {
    console.warn(`Skip ${folder} — pas de lesson.md`);
    continue;
  }
  const raw = fs.readFileSync(lessonPath, "utf-8");
  const lines = raw.split(/\r?\n/);

  // Titre : 1re ligne `# ...`
  const titleLine = lines.find((l) => l.startsWith("# ")) ?? "";
  const title = titleLine.replace(/^#\s+/, "").trim();

  // Date : 1er match au format JJ/MM/AAAA dans les 15 premières lignes
  let publishedAt = null;
  for (let i = 0; i < Math.min(15, lines.length); i++) {
    const iso = frenchDateToIso(lines[i]);
    if (iso) {
      publishedAt = iso;
      break;
    }
  }

  // Body : tout après la zone meta (on prend après le 1er `---` séparateur si présent,
  // sinon après les images d'en-tête)
  let bodyLines = [...lines];
  // Coupe au premier `---` standalone après les 5 premières lignes
  const sepIdx = lines.findIndex(
    (l, i) => i > 3 && l.trim() === "---"
  );
  if (sepIdx > -1) {
    bodyLines = lines.slice(sepIdx + 1);
  } else {
    // Sinon, saute le titre + meta + image
    bodyLines = lines.slice(5);
  }
  let body = bodyLines.join("\n").trim();

  // Remplace les mentions à la source d'origine par notre équipe.
  // On retire aussi tous les liens et handles externes (sociaux, sites du
  // partenaire d'origine) pour que le contenu paraisse 100% issu de notre app.
  body = body
    .replace(/Équipe\s+Le\s+Test\s+Civique/gi, "L'équipe Objectif Civique")
    .replace(/le\s*test\s*civique\.com/gi, "Objectif Civique")
    .replace(/test-civique\.com/gi, "Objectif Civique")
    .replace(/horizon224\.fr/gi, "Objectif Civique")
    // Nom de produit/marque de la source → notre marque.
    .replace(/Horizon\s?224/gi, "Objectif Civique")
    .replace(/D[ée]marches\s?Civique/gi, "Objectif Civique")
    .replace(/Pr[ée]pa\s?Civique/gi, "Objectif Civique")
    // Liens markdown vers les comptes sociaux horizon224 : on retire la ligne
    .replace(/^\s*[*-]\s*<https?:\/\/[^>]*horizon22[^>]*>\s*$/gim, "")
    .replace(/<https?:\/\/[^>]*horizon22[^>]*>/gi, "")
    .replace(/@horizon22\d*/gi, "@objectifcivique")
    // Liens markdown vers test-civique.com — on retire l'URL en gardant le texte
    .replace(
      /\[([^\]]+)\]\(https?:\/\/[^)]*(test-?civique|examen-?civique)[^)]*\)/gi,
      "$1"
    );

  articles.push({
    id: folder,
    slug: folder.replace(/^\d+-/, ""),
    title,
    publishedAt,
    source: "L'équipe Objectif Civique",
    excerpt: buildExcerpt(body),
    body,
  });
}

// Tri par date desc
articles.sort((a, b) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 0), "utf-8");
console.log(`Wrote ${articles.length} articles to ${OUTPUT_FILE}`);
