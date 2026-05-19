#!/usr/bin/env node
/**
 * Merge tous les fichiers JSON par ville (FULL-DATA/4-centres-examen/par-ville/*.json)
 * en un seul tableau de centres, écrit dans src/data/examCenters.json.
 *
 * À relancer si le client met à jour FULL-DATA/4-centres-examen.
 *
 *     node scripts/merge-exam-centers.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const PAR_VILLE_DIR = path.join(
  ROOT,
  "FULL-DATA",
  "4-centres-examen",
  "par-ville"
);
const OUTPUT_FILE = path.join(ROOT, "src", "data", "examCenters.json");

const files = fs
  .readdirSync(PAR_VILLE_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

console.log(`Found ${files.length} city files.`);

const allCenters = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(PAR_VILLE_DIR, file), "utf-8");
  const data = JSON.parse(raw);
  const ville = data.ville ?? path.basename(file, ".json");
  const slug = data.slug ?? path.basename(file, ".json");
  for (const c of data.centres ?? []) {
    allCenters.push({
      id: c.id,
      shortId: c.shortId,
      name: c.nom,
      address: c.adresse,
      postalCode: c.cp,
      city: c.ville,
      citySlug: slug,
      cityLabel: ville,
    });
  }
}

console.log(`Total centers: ${allCenters.length}`);

allCenters.sort((a, b) =>
  (a.cityLabel ?? "").localeCompare(b.cityLabel ?? "", "fr")
);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allCenters, null, 0), "utf-8");
console.log(`Wrote ${OUTPUT_FILE}`);
