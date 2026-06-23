# Cartographie des QCM — miroir de prepacivique.fr

Index lisible des 2 128 questions. Genere par `build_index.py`.
Chaque niveau propose les memes 3 entrees, calquees sur le site :

- **`questions.json`** — toutes les questions uniques du niveau (dedupliquees).
- **`sections/`** — entrainement par theme (les 5 sections officielles).
- **`tests/`** — QCM d'entrainement, tels que decoupes sur le site (par section).
- **`examens/`** — examens blancs (40 questions, conditions reelles).

## CSP - Carte de Sejour Pluriannuelle — 658 questions uniques

| Section (theme) | Questions | Fichier |
|---|---:|---|
| Principes et valeurs de la Republique | 177 | `csp/sections/principes-valeurs.json` |
| Systeme institutionnel et politique | 113 | `csp/sections/systeme-institutionnel.json` |
| Histoire, geographie et culture | 107 | `csp/sections/histoire-geographie-culture.json` |
| Droits et devoirs | 170 | `csp/sections/droits-et-devoirs.json` |
| Vivre dans la societe francaise | 91 | `csp/sections/vivre-en-france.json` |

- **QCM d'entrainement** : 33 fichiers dans `csp/tests/`
- **Examens blancs** : 26 fichiers dans `csp/examens/`
- **Index machine** : `csp/_index.json`

## CR - Carte de Resident — 769 questions uniques

| Section (theme) | Questions | Fichier |
|---|---:|---|
| Principes et valeurs de la Republique | 190 | `cr/sections/principes-valeurs.json` |
| Systeme institutionnel et politique | 151 | `cr/sections/systeme-institutionnel.json` |
| Histoire, geographie et culture | 141 | `cr/sections/histoire-geographie-culture.json` |
| Droits et devoirs | 185 | `cr/sections/droits-et-devoirs.json` |
| Vivre dans la societe francaise | 102 | `cr/sections/vivre-en-france.json` |

- **QCM d'entrainement** : 40 fichiers dans `cr/tests/`
- **Examens blancs** : 26 fichiers dans `cr/examens/`
- **Index machine** : `cr/_index.json`

## NAT - Naturalisation — 701 questions uniques

| Section (theme) | Questions | Fichier |
|---|---:|---|
| Principes et valeurs de la Republique | 156 | `nat/sections/principes-valeurs.json` |
| Systeme institutionnel et politique | 181 | `nat/sections/systeme-institutionnel.json` |
| Histoire, geographie et culture | 133 | `nat/sections/histoire-geographie-culture.json` |
| Droits et devoirs | 167 | `nat/sections/droits-et-devoirs.json` |
| Vivre dans la societe francaise | 64 | `nat/sections/vivre-en-france.json` |

- **QCM d'entrainement** : 36 fichiers dans `nat/tests/`
- **Examens blancs** : 26 fichiers dans `nat/examens/`
- **Index machine** : `nat/_index.json`
