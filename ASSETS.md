# Assets — Spécifications complètes

> Liste exhaustive de chaque image / icône à fournir dans le projet `objectif-civique`.
> Place les fichiers exactement aux chemins indiqués. Le fichier `assets.ts` les référence par `require()`.
> Si tu génères les visuels avec une IA (Midjourney, Recraft, Ideogram, Adobe Firefly), utilise les prompts fournis sous chaque fiche.

---

## Conventions globales

- **Format** : PNG avec transparence, sauf splash et coach photos (JPG accepté).
- **Style 3D** : claymorphism doux, soft shadows, couleurs harmonisées avec la palette navy/ivory/gold.
- **Palette de référence** : primary #001245 · primary-container #002473 · tertiary/gold #fabd0d · secondary/red #b7102a · surface/ivory #f7f9fb.
- **Pas de texte** dans les images (les UIs gèrent le texte).
- **Pas de visages stéréotypés** — diversité ethnique pour les photos coaching.
- **Lighting** : top-left key light, soft shadows.
- **Background** : transparent sauf indication contraire.
- **Densité** : `@2x` minimum (taille indiquée correspond au @2x bundlable).

---

## 1. Branding — `assets/branding/`

Voir aussi `00_LOGO.md` pour les prompts logo détaillés.

| Fichier | Dimensions | Notes |
|---|---|---|
| `icon.png` | 1024×1024 | App icon iOS + Android adaptive. Squircle iOS-style, fond bg ivory ou gradient subtil. |
| `icon-foreground.png` | 1024×1024 | Couche foreground Android adaptive (logo seul, transparent). |
| `logo-horizontal.png` | 1600×600 | Lockup horizontal : icône + wordmark "Objectif Civique" en navy. |
| `logo-mono-white.png` | 1024×1024 | Logo entièrement blanc sur fond transparent (splash navy + dark contexts). |
| `favicon.png` | 512×512 | Version simplifiée pour rendu très petit. |
| `splash.png` | 2048×2048 | Image splash Expo : logo centré sur fond `#FFFFFF`. |

---

## 2. Onboarding — `assets/images/onboarding-*.png`

3 illustrations 3D claymorphism, 1024×1024 transparent, identités cohérentes.

### `onboarding-exam.png` — Slide 1 "Préparez votre Examen Civique"
> **Prompt IA** : *3D claymorphism illustration of a magnifying glass hovering over an open French passport revealing a soft Marianne silhouette and tricolor ribbon, soft yellow blob accent in the background top-left, soft gray pebble bottom-right, premium clay style, soft top-left key light, ivory off-white background blending to transparent at edges, no text, 1024×1024 transparent PNG.*

### `onboarding-questions.png` — Slide 2 "2500+ Questions Officielles"
> **Prompt IA** : *3D claymorphism illustration of a tall stack of 4 colorful book/cards (navy, white, gold, soft red) with a winding dotted path emerging from the stack and curving away into the distance, small pebble accents around the base, premium clay material, soft warm lighting, no text, no numbers visible, 1024×1024 transparent PNG.*

### `onboarding-progress.png` — Slide 3 "Suivez votre Progression"
> **Prompt IA** : *3D claymorphism illustration of a navy folder/notebook with a yellow elastic band, surrounded by 3 floating file-format chips (small soft cubes labeled by visual texture, not text), soft yellow circle accent top-right, ivory pebbles, premium clay style, top-left soft key light, no text, no readable letters, 1024×1024 transparent PNG.*

---

## 3. Perso (Personalization) — `assets/images/perso-*.png`

### `perso-naturalisation.png` (256×256)
> *3D claymorphism French passport (deep navy cover with a small gold cocarde emblem) tilted at 15°, soft glow, no readable text, premium clay, transparent bg.*

### `perso-csp.png` (256×256)
> *3D claymorphism plastic ID card with a small calendar icon overlapping in the corner, soft navy + ivory + gold accents, no text, transparent bg.*

### `perso-cr.png` (256×256)
> *3D claymorphism golden house key crossed with a soft hexagonal map of France (navy), small ivory pebbles, no text, transparent bg.*

### `perso-channel-social.png` (128×128)
> *3D claymorphism smartphone with a few floating heart and like icons above it, soft pink/gold tints, navy phone case, transparent bg.*

### `perso-channel-search.png` (128×128)
> *3D claymorphism magnifying glass tilted, navy handle, gold rim, soft blue glass, transparent bg.*

### `perso-channel-friend.png` (128×128)
> *3D claymorphism handshake — two simplified hands meeting (one warm beige, one soft brown skin tone), navy and ivory sleeves, transparent bg.*

### `perso-channel-other.png` (128×128)
> *3D claymorphism question mark inside a soft cloud, navy mark, ivory cloud, gold accents, transparent bg.*

---

## 4. Assessment — `assets/images/`

### `assessment-intro.png` (512×512)
> *3D claymorphism human brain with a glowing lightbulb floating above it, soft navy + ivory + gold lighting, transparent bg, no text.*

### `result-celebration.png` (512×512)
> *3D claymorphism medal on a navy ribbon surrounded by colorful confetti pieces (gold, navy, ivory), celebratory but tasteful, transparent bg.*

---

## 5. Simulation — `assets/images/`

### `sim-intro.png` (512×512)
> *3D claymorphism kitchen-style timer (navy body, gold ring) on top of a small clipboard with abstract lines, soft shadows, transparent bg, no readable text.*

---

## 6. Themes (banners) — `assets/images/theme-*.png`

Format : 512×256, paysage, transparent, décoratif (bandeau en haut de l'écran détail thème).

| Fichier | Description / Prompt |
|---|---|
| `theme-institutions.png` | *3D claymorphism mini Assemblée nationale building with a small Marianne bust beside it, navy + ivory + gold, transparent bg.* |
| `theme-histoire.png` | *3D claymorphism rolled parchment scroll with a small Bastille tower silhouette behind it, navy + warm sepia + gold accent, transparent bg.* |
| `theme-valeurs.png` | *3D claymorphism scale of justice with a small French tricolor ribbon draped on the base, navy + ivory + soft red, transparent bg.* |
| `theme-geographie.png` | *3D claymorphism stylized hexagonal map of France with subtle region divisions, soft topographic shading, navy borders, transparent bg.* |
| `theme-culture.png` | *3D claymorphism Eiffel Tower miniature next to a small croissant and an open book, navy + ivory + gold, transparent bg.* |

---

## 7. Coaching (PHOTOS RÉELLES) — `assets/images/coach-*.png`

**Important** : ces 5 fichiers sont des **photos réelles**, pas des 3D. Diversité ethnique requise.
Sources possibles : Unsplash, Pexels (licences CC0), ou photos pro propriétaires.

### `coach-hero.png` (1080×720, JPG ou PNG)
> Photo grand angle d'un coach souriant, amical, lumière chaude naturelle (heure dorée), arrière-plan flou avec hint de bureau ou cadre lumineux. Diversité : peau métisse / arabe / noire de préférence pour parler à l'audience cible. Tenue smart-casual (chemise unie, sans logo). Vue : 3/4 face, regard caméra.

### `coach-teaser.png` (256×256, format carré)
> Crop circulaire du même coach (ou un autre) souriant — visage centré, fond neutre flou.

### `coach-1.png` / `coach-2.png` / `coach-3.png` (256×256 chacun)
> Trois portraits crop circle, diversité ethnique forte (1 femme noire, 1 homme arabe, 1 femme blanche/asiatique par exemple), souriants, fond neutre.

---

## 8. Achievements — `assets/images/badge-*.png`

10 badges 3D, 256×256, transparent. Style cohérent : médaille ronde 3D, gradient gold pour les unlocked (le screen affichera locked en grayscale via filter `tintColor` ou opacity).

| Fichier | Concept |
|---|---|
| `badge-first-step.png` | Empreinte de pied 3D dorée |
| `badge-streak-7.png` | Flamme 3D orange-or |
| `badge-centurion.png` | Bouclier 3D avec un "100" embossé subtil |
| `badge-excellence.png` | Étoile 3D dorée à 5 branches |
| `badge-perfect-theme.png` | Couronne 3D dorée |
| `badge-early-bird.png` | Soleil levant 3D |
| `badge-night-owl.png` | Lune 3D bleu-doré |
| `badge-marathon.png` | Chaussure de course 3D |
| `badge-scholar.png` | Toque de diplôme 3D |
| `badge-citizen.png` | Cocarde tricolore 3D |

> **Prompt générique IA** : *3D claymorphism medallion, circular base, soft gold gradient, embossed [emblem] in the center, soft drop shadow, premium clay material, top-left key light, transparent background, 256×256 PNG. No text.*

---

## 9. Empty States — `assets/images/empty-*.png`

Format 512×512, transparent, ton amical, pas triste.

| Fichier | Prompt |
|---|---|
| `empty-bookmarks.png` | *3D claymorphism single bookmark ribbon with small sparkle particles around it, navy ribbon, gold sparkles, transparent bg.* |
| `empty-activity.png` | *3D claymorphism notepad with a small "zzz" cloud floating above (sleep emoji style), navy + ivory, transparent bg.* |
| `empty-results.png` | *3D claymorphism magnifying glass over an empty paper sheet, soft shadows, navy + ivory, transparent bg.* |

---

## 10. Decorative — `assets/images/blob-*.png` etc.

| Fichier | Format | Prompt |
|---|---|---|
| `blob-yellow.png` | 512×512 transparent | *Soft watercolor blob in warm gold-yellow (#fabd0d to #fde68a), organic irregular shape, soft fuzzy edges, transparent background.* |
| `blob-navy.png` | 512×512 transparent | *Same as above but in deep primary (#001245 to #002473).* |
| `paper-texture.png` | 1024×1024 transparent | *Subtle paper grain texture, very low contrast, ivory tones, used as a 5% opacity overlay.* |
| `confetti.png` | 512×512 transparent | *Burst of colorful confetti (navy, gold, ivory, soft red) frozen mid-air, top-down perspective, transparent bg.* |

---

## Récapitulatif rapide (checklist)

```
assets/
├── branding/
│   ├── icon.png
│   ├── icon-foreground.png
│   ├── logo-horizontal.png
│   ├── logo-mono-white.png
│   ├── favicon.png
│   └── splash.png
└── images/
    ├── onboarding-exam.png
    ├── onboarding-questions.png
    ├── onboarding-progress.png
    ├── perso-naturalisation.png
    ├── perso-csp.png
    ├── perso-cr.png
    ├── perso-channel-social.png
    ├── perso-channel-search.png
    ├── perso-channel-friend.png
    ├── perso-channel-other.png
    ├── assessment-intro.png
    ├── result-celebration.png
    ├── sim-intro.png
    ├── theme-institutions.png
    ├── theme-histoire.png
    ├── theme-valeurs.png
    ├── theme-geographie.png
    ├── theme-culture.png
    ├── coach-hero.png
    ├── coach-teaser.png
    ├── coach-1.png
    ├── coach-2.png
    ├── coach-3.png
    ├── badge-first-step.png
    ├── badge-streak-7.png
    ├── badge-centurion.png
    ├── badge-excellence.png
    ├── badge-perfect-theme.png
    ├── badge-early-bird.png
    ├── badge-night-owl.png
    ├── badge-marathon.png
    ├── badge-scholar.png
    ├── badge-citizen.png
    ├── empty-bookmarks.png
    ├── empty-activity.png
    ├── empty-results.png
    ├── blob-yellow.png
    ├── blob-navy.png
    ├── paper-texture.png
    └── confetti.png
```

**Total** : 6 fichiers branding + 36 fichiers images = **42 assets**.

## Stratégie de production

1. **Logo (priorité 1)** — fais-le valider avant tout le reste, c'est l'identité.
2. **Onboarding (priorité 2)** — 3 visuels qui font la première impression utilisateur.
3. **Perso + Assessment + Simulation (priorité 3)** — visibles dans les 5 premières minutes.
4. **Themes + Achievements + Empty states (priorité 4)** — pour la complétude.
5. **Coaching photos (priorité 5)** — sourcing humain, peut être briefé en parallèle à un photographe ou trouvé sur Unsplash.

## Placeholder de secours

En attendant la livraison des assets, crée un fichier `assets/images/_placeholder.png` (512×512, fond `#f2f4f6`, simple "?" primary (#001245) au centre). L'IA codeuse peut s'y rabattre avec un commentaire `// TODO: replace with assets/images/<real-name>.png`.
