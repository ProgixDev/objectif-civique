# Questions — index

Banque unifiée : **1867 questions uniques**.

## Fichiers globaux
- `_all.json` — toutes les questions (dédupliquées par id)
- `_index.json` — compteurs (thème × type × niveau)
- `_flashcards.json` — vue dérivée des questions sans choix

## Buckets

### `officielles/` — niveaux d'examen officiels (csp / cr / nat)
1152 questions au total.

- `officielles/all.json` — toutes les officielles, tous thèmes confondus
- `officielles/<N-theme>/all.json` — toutes les officielles d'un thème
- `officielles/<N-theme>/<csp|cr|nat>.json` — partitionné par niveau

Par niveau : cr=430 · csp=444 · nat=502

### `entrainement/` — questions non officielles, par thème
327 questions.

- `entrainement/all.json` — toutes
- `entrainement/<N-theme>.json` — par thème (à plat)

### `mise-en-situation/` — scénarios pratiques, par thème
397 questions (peut chevaucher `officielles/`).

- `mise-en-situation/all.json` — toutes
- `mise-en-situation/<N-theme>.json` — par thème (à plat)

## Notes de routing

Une question peut apparaître dans **plusieurs buckets** :
- `isOfficial=true` ⇒ présente dans `officielles/`
- `type=mise-en-situation` ⇒ présente dans `mise-en-situation/`
- `type=flashcard` ⇒ listée dans `_flashcards.json`

Les 9 questions hybrides (officielles + situation) apparaissent dans **2 buckets**.
Pour dédupliquer en chargeant plusieurs fichiers, utiliser le champ `id`.
