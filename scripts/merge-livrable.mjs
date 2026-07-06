#!/usr/bin/env node
/**
 * Compile la 2ᵉ base de données client (LIVRABLE-prepacivique-fr) en un seul
 * fichier `src/data/livrable.json` consommé par l'app (loader src/data/livrable.ts).
 *
 *     node scripts/merge-livrable.mjs
 *
 * Pipelines FULL-DATA inchangés : ce contenu est fusionné au runtime (les
 * questions sont dédupliquées contre le pool principal côté app).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "LIVRABLE-prepacivique-fr");
const OUT = path.join(ROOT, "src", "data", "livrable.json");

const SECTION_TO_THEME = {
  "principes-valeurs": "principes-valeurs-republique",
  "droits-et-devoirs": "droits-et-devoirs",
  "systeme-institutionnel": "systeme-institutionnel",
  "histoire-geographie-culture": "histoire-geographie-culture",
  "vivre-en-france": "vivre-en-societe",
};
const SECTION_LABEL = {
  "principes-valeurs": "Principes & valeurs",
  "droits-et-devoirs": "Droits & devoirs",
  "systeme-institutionnel": "Système institutionnel",
  "histoire-geographie-culture": "Histoire, géo & culture",
  "vivre-en-france": "Vivre en France",
};
const LEVEL_LABEL = { NAT: "Naturalisation", CR: "Carte de Résident", CSP: "CSP" };

const stripHtml = (s) =>
  (s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf-8"));
const exists = (p) => fs.existsSync(p);

/** Remplace toute mention de la marque/site d'origine par Objectif Civique. */
function cleanBrand(text) {
  return (text ?? "")
    // Liens markdown vers le site d'origine → on garde le texte, on retire l'URL.
    .replace(
      /\[([^\]]+)\]\(https?:\/\/[^)]*(prepacivique|test-civique|vercel)[^)]*\)/gi,
      "$1"
    )
    // URLs nues vers le site d'origine.
    .replace(/https?:\/\/[^\s)]*(prepacivique|test-civique|vercel)[^\s)]*/gi, "")
    // E-mails de contact du site source.
    .replace(/[a-z0-9._%+-]+@(prepa|test-)?civique[a-z0-9.-]*\.[a-z]{2,}/gi, "")
    .replace(/[a-z0-9._%+-]+@prepacivique[a-z0-9.-]*\.[a-z]{2,}/gi, "")
    // Domaines & marque du site source → marque de l'app.
    .replace(/www\.\s*pr[ée]pa[\s-]*civique\.[a-z.]+/gi, "Objectif Civique")
    .replace(/pr[ée]pa[\s-]*civique\.[a-z]{2,}/gi, "Objectif Civique")
    .replace(/pr[ée]pa[\s-]*civique/gi, "Objectif Civique")
    .replace(/\bLe\s+Test\s+Civique\b/g, "Objectif Civique")
    .replace(/\btest-?civique\.[a-z]{2,}/gi, "Objectif Civique")
    // Nettoyages résiduels.
    .replace(/\bwww\.\s*/gi, "")
    .replace(/Objectif Civique(\s+Objectif Civique)+/g, "Objectif Civique")
    // Élisions correctes après le remplacement (de/à/le → d'/à l'…).
    .replace(/\bde Objectif Civique/g, "d'Objectif Civique")
    .replace(/\bDe Objectif Civique/g, "D'Objectif Civique");
}

/**
 * Dans les pages LÉGALES uniquement : le produit est une APPLICATION, pas un
 * site. On remplace les références « site » d'origine par « application »
 * (formes capitalisées et termes définis d'abord, pour garder la casse).
 */
function siteToApp(text) {
  return (text ?? "")
    .replace(/\bsite (internet|web)\b/gi, "application")
    .replace(/\bNotre site\b/g, "Notre application")
    .replace(/\bCe site\b/g, "Cette application")
    .replace(/\bLe site\b/g, "L'application")
    .replace(/\ble Site\b/g, "l'Application")
    .replace(/\bdu Site\b/g, "de l'Application")
    .replace(/\bau Site\b/g, "à l'Application")
    .replace(/\bprésent site\b/gi, "présente application")
    .replace(/\bnotre site\b/gi, "notre application")
    .replace(/\bce site\b/gi, "cette application")
    .replace(/\bdu site\b/gi, "de l'application")
    .replace(/\bau site\b/gi, "à l'application")
    .replace(/\ble site\b/gi, "l'application");
}

/** Nettoie un markdown de site (artefacts de navigation + marque d'origine). */
function cleanMarkdown(raw) {
  let lines = raw.split(/\r?\n/);
  // Retire les lignes parasites issues du scraping web.
  lines = lines.filter((l) => {
    const t = l.trim();
    if (t === "Aussi utile") return false;
    if (/→\s*$/.test(t)) return false; // CTA de navigation "… →"
    if (/^Skip to/i.test(t)) return false;
    return true;
  });
  let body = cleanBrand(lines.join("\n"))
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return body;
}

function buildExcerpt(body, maxChars = 220) {
  const flat = body
    .replace(/^#.*$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return flat.length <= maxChars ? flat : flat.slice(0, maxChars).trimEnd() + "…";
}

const slugFromFile = (f) => path.basename(f, ".md");
const humanize = (slug) =>
  slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const MONTHS = {
  janvier: "01", février: "02", fevrier: "02", mars: "03", avril: "04",
  mai: "05", juin: "06", juillet: "07", août: "08", aout: "08",
  septembre: "09", octobre: "10", novembre: "11", décembre: "12", decembre: "12",
};

/**
 * Date de publication : on ne prend qu'une ligne qui EST une date (éventuellement
 * préfixée "Dernière mise à jour :"), pour ne pas capter une date historique
 * citée dans le texte (ex. "4 octobre 1958").
 */
function findDate(lines) {
  for (const raw of lines.slice(0, 10)) {
    const t = raw
      .trim()
      .replace(/^.*?(mise à jour|publi[ée] le|le)\s*:?\s*/i, "")
      .trim();
    const m1 = t.match(/^(\d{1,2})\s+([a-zéûôà]+)\s+(\d{4})$/i);
    if (m1 && MONTHS[m1[2].toLowerCase()]) {
      return `${m1[3]}-${MONTHS[m1[2].toLowerCase()]}-${m1[1].padStart(2, "0")}`;
    }
    const m2 = t.match(/^([a-zéûôà]+)\s+(\d{4})$/i);
    if (m2 && MONTHS[m2[1].toLowerCase()]) return `${m2[2]}-${MONTHS[m2[1].toLowerCase()]}-01`;
  }
  return null;
}

const isBreadcrumb = (t) =>
  / \/ /.test(t) && /accueil|articles|guides|pr[ée]paration|pages/i.test(t);

/** Parse un fichier .md → { title, body, excerpt, date }. Robuste aux formats
 * sans titre `#` (fil d'Ariane, "Retour à", etc.). */
function parseMd(file, fallbackSlug) {
  const raw = fs.readFileSync(file, "utf-8");
  const lines = raw.split(/\r?\n/);

  let title = "";
  const h = lines.find((l) => l.startsWith("# "));
  if (h) title = h.replace(/^#\s+/, "").trim();
  if (!title) {
    // Fil d'Ariane "Accueil / Articles / Titre" → dernier segment = titre page.
    const bc = lines.find((l) => isBreadcrumb(l.trim()));
    if (bc) title = bc.split("/").pop().trim();
  }
  // NB : on n'utilise PAS la ligne après "Retour à" (= section parente, pas le
  // titre de la page) → on retombe sur le nom de fichier, fiable et distinct.
  if (!title && fallbackSlug) title = humanize(fallbackSlug);
  // Le titre aussi doit être débarrassé de la marque du site d'origine.
  title = cleanBrand(title).trim();

  const date = findDate(lines);

  // Corps : on retire fil d'Ariane, "Retour à", et la 1re occurrence du titre.
  let titleRemoved = false;
  const body = cleanMarkdown(
    lines
      .filter((l) => {
        const t = l.trim();
        if (/^retour à/i.test(t)) return false;
        if (isBreadcrumb(t)) return false;
        if (!titleRemoved && title && (t === title || t === `# ${title}`)) {
          titleRemoved = true;
          return false;
        }
        return true;
      })
      .join("\n")
  );
  return { title, body, excerpt: buildExcerpt(body), date };
}

// ───────────────────────── Questions / Tests / Examens ─────────────────────

function convertQuestion(wrapped) {
  const q = wrapped.question ?? wrapped;
  const theme = SECTION_TO_THEME[q.section];
  if (!theme) return null;
  const choices = (q.choices ?? []).map((c) => stripHtml(c.text));
  if (choices.length < 2) return null;
  let correctIndex = Array.isArray(q.correctIndices) && q.correctIndices.length
    ? q.correctIndices[0]
    : (q.choices ?? []).findIndex((c) => c.isCorrect);
  if (correctIndex < 0) return null;
  const cat = { NAT: "NAT", CR: "CR", CSP: "CSP" }[q.level];
  return {
    id: q.id,
    shortId: q.shortId,
    categories: cat ? [cat] : ["NAT", "CR", "CSP"],
    theme,
    text: stripHtml(q.statement),
    choices,
    correctIndex,
    explanation: stripHtml(q.explanation ?? ""),
    type: q.type === "SITUATIONAL" ? "mise-en-situation" : "qcm",
    isOfficial: q.source === "OFFICIAL",
    // Banque interne neutre (jamais la marque du site source) — rejoint les
    // banques existantes officielles / mise-en-situation / entraînement.
    source:
      q.type === "SITUATIONAL"
        ? "mise-en-situation"
        : q.source === "OFFICIAL"
          ? "officielles"
          : "entrainement",
  };
}

const LEVELS = ["nat", "cr", "csp"];

// Pool de questions (depuis questions.json par niveau).
const questions = [];
for (const lvl of LEVELS) {
  const f = path.join(SRC, "data", lvl, "questions.json");
  if (!exists(f)) continue;
  for (const w of readJson(f)) {
    const q = convertQuestion(w);
    if (q) questions.push(q);
  }
}

// Tests pré-construits (par section).
const tests = [];
for (const lvl of LEVELS) {
  const dir = path.join(SRC, "data", lvl, "tests");
  if (!exists(dir)) continue;
  for (const name of fs.readdirSync(dir).sort()) {
    if (!name.endsWith(".json")) continue;
    const t = readJson(path.join(dir, name));
    const qs = (t.questions ?? [])
      .map(convertQuestion)
      .filter(Boolean);
    if (qs.length === 0) continue;
    const kind = name.includes("official")
      ? "officiel"
      : name.includes("situational")
        ? "mise en situation"
        : "entraînement";
    tests.push({
      id: t.slug,
      title: `${LEVEL_LABEL[t.level] ?? t.level} · ${SECTION_LABEL[t.section] ?? t.section} (${kind})`,
      level: t.level,
      questions: qs,
    });
  }
}

// Examens blancs (40 questions) → packs de simulation.
const exams = [];
for (const lvl of LEVELS) {
  const dir = path.join(SRC, "data", lvl, "examens");
  if (!exists(dir)) continue;
  for (const name of fs.readdirSync(dir).sort()) {
    if (!name.endsWith(".json")) continue;
    const e = readJson(path.join(dir, name));
    const qs = (e.questions ?? []).map(convertQuestion).filter(Boolean);
    if (qs.length === 0) continue;
    const official = name.includes("official");
    const num = (name.match(/(\d+)\.json$/) ?? [])[1] ?? "";
    exams.push({
      id: e.slug,
      slug: e.slug,
      title: `Examen blanc ${LEVEL_LABEL[e.level] ?? e.level} #${num}${official ? " (officiel)" : ""}`,
      level: e.level,
      questions: qs,
    });
  }
}

// ───────────────────────── Articles / Guides / Préparation / Pages ─────────

function readMdDir(dir) {
  if (!exists(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => n.endsWith(".md") && n !== "index.md")
    .sort()
    .map((n) => {
      const slug = slugFromFile(n);
      return { slug, ...parseMd(path.join(dir, n), slug) };
    })
    .filter((x) => x.title && x.body);
}

const articles = readMdDir(path.join(SRC, "articles")).map((a) => ({
  id: `liv-${a.slug}`,
  slug: a.slug,
  title: a.title,
  publishedAt: a.date ?? null,
  source: "L'équipe Objectif Civique",
  excerpt: a.excerpt,
  body: a.body,
}));

// Guides (racine + sous-dossier naturalisation-francaise).
const guides = [];
for (const g of readMdDir(path.join(SRC, "guides"))) {
  guides.push({ id: `liv-guide-${g.slug}`, slug: g.slug, title: g.title, body: g.body, excerpt: g.excerpt });
}
for (const g of readMdDir(path.join(SRC, "guides", "naturalisation-francaise"))) {
  guides.push({ id: `liv-guide-nat-${g.slug}`, slug: g.slug, title: g.title, body: g.body, excerpt: g.excerpt });
}

// Préparation : fichiers par thème (racine = intro thème, sous-dossiers = sujets).
const PREP_THEME = {
  "principes-valeurs": "principes-valeurs-republique",
  "droits-et-devoirs": "droits-et-devoirs",
  "systeme-institutionnel": "systeme-institutionnel",
  "histoire-geographie-culture": "histoire-geographie-culture",
  "vivre-en-france": "vivre-en-societe",
};
const preparation = [];
const prepRoot = path.join(SRC, "preparation");
if (exists(prepRoot)) {
  for (const entry of fs.readdirSync(prepRoot, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md") {
      const key = slugFromFile(entry.name);
      const themeId = PREP_THEME[key];
      if (!themeId) continue;
      const p = parseMd(path.join(prepRoot, entry.name), key);
      preparation.push({ id: `liv-prep-${key}`, themeId, title: p.title, body: p.body, excerpt: p.excerpt });
    } else if (entry.isDirectory()) {
      const themeId = PREP_THEME[entry.name];
      if (!themeId) continue;
      for (const g of readMdDir(path.join(prepRoot, entry.name))) {
        preparation.push({ id: `liv-prep-${entry.name}-${g.slug}`, themeId, title: g.title, body: g.body, excerpt: g.excerpt });
      }
    }
  }
}

// Pages : on garde les pages info/légales, on ignore marketing + centres-examen
// (déjà géré par la liste des 216 centres) + eligibilite (écran dédié).
const PAGE_SKIP = new Set(["accueil", "avis", "centres-examen"]);
const LEGAL = new Set([
  "mentions-legales",
  "politique-confidentialite",
  "politique-remboursement",
  "conditions-generales",
]);
// Pages où « site » doit devenir « application » : les légales + « à propos ».
const SITE_TO_APP = new Set([...LEGAL, "a-propos"]);
const pages = [];
for (const p of readMdDir(path.join(SRC, "pages"))) {
  if (PAGE_SKIP.has(p.slug)) continue;
  const applySiteToApp = SITE_TO_APP.has(p.slug);
  pages.push({
    id: `liv-page-${p.slug}`,
    slug: p.slug,
    title: applySiteToApp ? siteToApp(p.title) : p.title,
    body: applySiteToApp ? siteToApp(p.body) : p.body,
    group: LEGAL.has(p.slug) ? "legal" : "info",
  });
}

const out = {
  questions,
  tests,
  exams,
  articles,
  guides,
  preparation,
  pages,
  counts: {
    questions: questions.length,
    tests: tests.length,
    exams: exams.length,
    articles: articles.length,
    guides: guides.length,
    preparation: preparation.length,
    pages: pages.length,
  },
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 0), "utf-8");
console.log("→ src/data/livrable.json écrit");
console.log(JSON.stringify(out.counts, null, 2));
