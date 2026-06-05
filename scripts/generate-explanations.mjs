#!/usr/bin/env node
/**
 * Génère des explications pour les questions QCM qui n'en ont pas, via Groq
 * (Llama), de façon ANCRÉE pour éviter les hallucinations :
 *
 *  - On connaît déjà la bonne réponse → l'IA ne devine rien, elle explique
 *    seulement POURQUOI la bonne réponse est correcte.
 *  - Consigne stricte : 1-2 phrases, aucune date / chiffre / nom propre /
 *    article de loi inventé, rester général en cas de doute, français clair.
 *  - Validation : longueur bornée, pas de copie de l'énoncé, pas de "je ne sais
 *    pas". Les cas qui échouent sont laissés vides → l'app retombe sur le
 *    fallback runtime « La bonne réponse est : … ».
 *
 * Sortie : src/data/explanations.generated.json  ({ [questionId]: "texte" }).
 * REPRENABLE : relancer ne régénère que les ids manquants.
 *
 *   GROQ_API_KEY=xxx node scripts/generate-explanations.mjs
 *   (options : GROQ_MODEL=..., LIMIT=50 pour un essai, CONCURRENCY=4)
 */
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ALL = path.join(ROOT, "FULL-DATA", "1-questions", "_all.json");
const OUT = path.join(ROOT, "src", "data", "explanations.generated.json");

// ── Config ──────────────────────────────────────────────────────────────
function loadEnvKey() {
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
  // Fallback : lit GROQ_API_KEY depuis un .env à la racine.
  try {
    const env = fs.readFileSync(path.join(ROOT, ".env"), "utf-8");
    const m = env.match(/^GROQ_API_KEY\s*=\s*(.+)\s*$/m);
    if (m) return m[1].trim();
  } catch {}
  return null;
}
const API_KEY = loadEnvKey();
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const CONCURRENCY = Number(process.env.CONCURRENCY || 3);
const LIMIT = process.env.LIMIT ? Number(process.env.LIMIT) : Infinity;
// Espacement minimal entre deux requêtes (toutes workers confondus) pour rester
// sous la limite de débit Groq (offre gratuite ≈ 30 req/min sur llama-3.3-70b).
const MIN_INTERVAL_MS = Number(process.env.MIN_INTERVAL_MS || 2200);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let nextSlot = 0;
async function rateGate() {
  const now = Date.now();
  const wait = Math.max(0, nextSlot - now);
  nextSlot = Math.max(now, nextSlot) + MIN_INTERVAL_MS;
  if (wait) await sleep(wait);
}

if (!API_KEY) {
  console.error(
    "❌ GROQ_API_KEY manquant. Lance avec : GROQ_API_KEY=xxx node scripts/generate-explanations.mjs"
  );
  process.exit(1);
}

const THEME_LABELS = {
  "principes-valeurs-republique": "Principes et valeurs de la République",
  "droits-et-devoirs": "Droits et devoirs",
  "systeme-institutionnel": "Système institutionnel",
  "histoire-geographie-culture": "Histoire, géographie et culture",
  "vivre-en-societe": "Vivre en société",
};

// ── Appel Groq (OpenAI-compatible) ──────────────────────────────────────
function groqChat(messages) {
  const body = JSON.stringify({
    model: MODEL,
    messages,
    temperature: 0.2,
    max_tokens: 200,
  });
  const opts = {
    host: "api.groq.com",
    path: "/openai/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(opts, (res) => {
      // Accumule des Buffers puis décode en UTF-8 — concaténer en string couperait
      // les caractères accentués multi-octets (é, è…) → mojibake.
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () =>
        resolve({
          status: res.statusCode,
          body: Buffer.concat(chunks).toString("utf8"),
        })
      );
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const SYSTEM = `Tu es un expert de l'éducation civique française qui rédige des explications pédagogiques courtes pour un examen (naturalisation, carte de résident, carte de séjour).
RÈGLES ABSOLUES :
1. Explique uniquement POURQUOI la bonne réponse fournie est correcte.
2. 1 à 2 phrases maximum, français simple et clair.
3. N'invente JAMAIS de date, de chiffre précis, d'article de loi ni de nom propre : n'utilise que des faits généraux et certains de l'éducation civique française. En cas de doute sur un détail précis, reste général.
4. Ne mentionne pas « la bonne réponse », ni les lettres A/B/C/D : explique le fond.
5. Pas de formule d'introduction. Ne commence JAMAIS par « La bonne réponse est correcte car », « Cette réponse… », « En effet » : commence directement par l'explication du fond.`;

function buildUserPrompt(q, correctText, others) {
  const theme = THEME_LABELS[q.theme] || q.theme;
  return `Thème : ${theme}
Question : ${q.statement}
Réponse correcte : "${correctText}"
Autres options proposées : ${others.map((o) => `"${o}"`).join(", ") || "(aucune)"}

Rédige l'explication.`;
}

// ── Validation anti-bruit ───────────────────────────────────────────────
function isValid(text, q, correctText) {
  if (!text) return false;
  const t = text.trim();
  if (t.length < 15 || t.length > 500) return false;
  const low = t.toLowerCase();
  if (/(je ne sais|désolé|en tant qu|i cannot|i'm sorry|as an ai)/.test(low))
    return false;
  // Ne doit pas être une simple recopie de l'énoncé.
  if (low === q.statement.trim().toLowerCase()) return false;
  // Ne doit pas citer les lettres d'option.
  if (/\b(option|réponse)\s+[abcd]\b/i.test(t)) return false;
  return true;
}

function cleanText(raw) {
  let t = raw
    .trim()
    .replace(/^["'«»\s]+|["'«»\s]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  // Retire les préambules méta du type « La bonne réponse est correcte car … »
  // que le modèle ajoute parfois malgré la consigne.
  t = t.replace(
    /^(la bonne réponse|cette réponse|cette option|c['’]est la bonne réponse|la réponse correcte|la réponse)\b[^.]*?\b(car|parce que|puisque|étant donné que)\s+/i,
    ""
  );
  t = t.replace(
    /^(la bonne réponse|cette réponse) est (correcte|la bonne)\.?\s*/i,
    ""
  );
  t = t.trim();
  // Re-capitalise la première lettre.
  if (t) t = t.charAt(0).toUpperCase() + t.slice(1);
  return t;
}

// ── Main ────────────────────────────────────────────────────────────────
const all = JSON.parse(fs.readFileSync(ALL, "utf-8"));
const overlay = fs.existsSync(OUT)
  ? JSON.parse(fs.readFileSync(OUT, "utf-8"))
  : {};

const targets = all.filter((q) => {
  const choices = q.choices || [];
  const hasChoices = choices.length >= 2 && choices.some((c) => c.isCorrect);
  const emptyExp = !(q.explanation && q.explanation.trim());
  return hasChoices && emptyExp && !overlay[q.id];
});

const todo = targets.slice(0, LIMIT);
console.log(
  `Cibles : ${targets.length} questions sans explication (${todo.length} à traiter ce run). Modèle : ${MODEL}.`
);

let done = 0;
let ok = 0;
let failed = 0;
let saveTick = 0;

function save() {
  fs.writeFileSync(OUT, JSON.stringify(overlay, null, 0), "utf-8");
}

async function handle(q) {
  const choices = q.choices || [];
  const correct = choices.find((c) => c.isCorrect);
  const correctText = (correct?.text || "").trim();
  const others = choices.filter((c) => !c.isCorrect).map((c) => c.text.trim());

  let rateLimitHits = 0;
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      await rateGate();
      const res = await groqChat([
        { role: "system", content: SYSTEM },
        { role: "user", content: buildUserPrompt(q, correctText, others) },
      ]);
      if (res.status === 429) {
        // Groq indique « try again in Xs » → on respecte ce délai (cap 30s).
        // Un 429 ne consomme pas de tentative, mais on plafonne pour éviter une
        // boucle infinie si le quota journalier est épuisé.
        if (++rateLimitHits > 15) {
          console.warn(`  [${q.shortId || q.id}] quota saturé — laissé pour un prochain run`);
          break;
        }
        const m = res.body.match(/try again in ([\d.]+)s/i);
        const wait = m
          ? Math.min(30000, parseFloat(m[1]) * 1000 + 500)
          : 4000 * (rateLimitHits + 1);
        await sleep(wait);
        attempt--;
        continue;
      }
      if (res.status !== 200) {
        if (attempt >= 3)
          console.warn(`  [${q.shortId || q.id}] HTTP ${res.status}: ${res.body.slice(0, 120)}`);
        await sleep(1000);
        continue;
      }
      const json = JSON.parse(res.body);
      const text = cleanText(json.choices?.[0]?.message?.content || "");
      if (isValid(text, q, correctText)) {
        overlay[q.id] = text;
        ok++;
      } else {
        failed++;
      }
      return;
    } catch (e) {
      if (attempt >= 3) console.warn(`  [${q.shortId || q.id}] erreur: ${e.message}`);
      await sleep(1000);
    }
  }
  // Toutes les tentatives ont échoué (rate limit persistant, etc.) — compté
  // comme échec ; un prochain run reprendra cet id (overlay resumable).
  failed++;
}

async function run() {
  const queue = [...todo];
  async function worker() {
    while (queue.length) {
      const q = queue.shift();
      await handle(q);
      done++;
      if (++saveTick % 10 === 0) save();
      if (done % 25 === 0)
        console.log(`  ${done}/${todo.length} — ok:${ok} échoués:${failed}`);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, todo.length) }, worker)
  );
  save();
  console.log(
    `\n✅ Terminé. Générées : ${ok} · ignorées (validation) : ${failed} · total overlay : ${Object.keys(overlay).length}.`
  );
  console.log(`Fichier : ${OUT}`);
}

run();
