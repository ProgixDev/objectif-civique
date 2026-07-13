# Objectif Civique — Prompt Pack

Application mobile **Expo SDK 55**, **frontend uniquement**, en français.
Cible : immigrants en France préparant les tests civiques (Naturalisation, CSP, CR).

## Décisions verrouillées

- **Nom de l'app** : Objectif Civique
- **Langue** : Français uniquement (v1)
- **Stack** : Expo SDK 55 (React Native), TypeScript strict, Expo Router (file-based)
- **Backend** : aucun (frontend only — données mockées dans `data/`, persistance locale via AsyncStorage)
- **Palette** : Bleu/Blanc French (deep navy + soft white + accent rouge subtil)
- **Style** : minimaliste, moderne, premium, glass effect (iOS 26 vibe), bords arrondis 999, micro-animations, gamification haute
- **Categories d'examen** : CR (Carte de Résident), CSP (Carte de Séjour Pluriannuelle), NAT (Naturalisation)
- **Examen blanc** : 40 questions / 45 minutes / seuil 80%
- **Pas d'admin panel en v1**

## Comment utiliser ce pack

L'ordre est important. Exécute chaque prompt dans l'ordre, dans une session AI fresh (Claude / Cursor / Lovable / v0).

| # | Fichier | Outil cible | Description |
|---|---------|-------------|-------------|
| 0 | `00_LOGO.md` | Midjourney / DALL-E / Recraft | Génération du logo |
| 1 | `01_DESIGN_SYSTEM.md` | Figma AI / Galileo / Uizard | Design system + maquettes UI |
| 2 | `02_PROJECT_SETUP.md` | Cursor / Claude Code | **Prompt 0** — scaffold du projet Expo |
| 3 | `03_SPLASH_ONBOARDING.md` | Cursor / Claude Code | Splash + 3 slides d'onboarding |
| 4 | `04_AUTH.md` | Cursor / Claude Code | Welcome / Sign Up / Sign In (mocké) |
| 5 | `05_PERSONALIZATION.md` | Cursor / Claude Code | Formulaire interactif d'onboarding |
| 6 | `06_ASSESSMENT_PAYWALL.md` | Cursor / Claude Code | Mini-test de niveau + paywall |
| 7 | `07_HOME_TABS.md` | Cursor / Claude Code | Home + Tab Bar (4 onglets) |
| 8 | `08_QUIZ_ENGINE.md` | Cursor / Claude Code | Entraînement, QCM, feedback immédiat, récap |
| 9 | `09_SIMULATION.md` | Cursor / Claude Code | Simulation 40 questions / timer 45 min |
| 10 | `10_THEMES.md` | Cursor / Claude Code | Révision par thème (5 catégories officielles) |
| 11 | `11_PROGRESS.md` | Cursor / Claude Code | Onglet Progrès (stats, graphiques) |
| 12 | `12_PROFILE_SETTINGS.md` | Cursor / Claude Code | Profil, Paramètres, Abonnement |
| 13 | `13_HUMAN_COACHING.md` | Cursor / Claude Code | Upsell accompagnement humain |
| — | `assets.ts` | — | À copier dans `src/constants/assets.ts` |
| — | `ASSETS.md` | — | Liste exhaustive de chaque image/icône à fournir |

## Règles à appliquer dans CHAQUE prompt frontend

L'AI exécutant les prompts 02 → 13 doit suivre ces règles **sans exception** :

1. **Pas d'écran vide.** Chaque écran a un état "loading", "empty", "error" et "success".
2. **Chaque bouton doit être cliquable et naviguer / déclencher quelque chose.** Aucun placeholder mort.
3. **Layout compact.** Padding 12–16px (pas 24+). Cards denses. Pas de gros vide.
4. **Typographie petite.** Titres 18–22px, corps 13–14px, captions 11px. Système : SF Pro / Inter.
5. **Bords arrondis 999** (pill) sur boutons, inputs, badges. Cards : `borderRadius: 20`.
6. **Couleur** : palette définie dans `01_DESIGN_SYSTEM.md`. Aucune couleur hardcodée hors du token.
7. **Glass effect** sur cards principales (BlurView Expo + bg semi-transparent).
8. **Gradient subtils** : navy → indigo, ou white → bleu très clair. Jamais rouge → bleu.
9. **Toutes les chaînes en français.** Aucun texte anglais visible.
10. **Persistance** : AsyncStorage pour user state, onboarding, progrès. Pas de re-ask au reload.
11. **Animations** : Reanimated 3 / Moti pour transitions. Spring, pas linear.
12. **Sécurité types** : TypeScript strict, pas de `any`, types pour chaque prop.
13. **Données mockées** : tout dans `src/data/*.ts` (questions, themes, user profil mock).
14. **Navigation** : Expo Router (file-based, dossier `app/`).
15. **Accessibilité** : labels sur tous les Pressable, contraste AA minimum.

## Stratégie data (frontend only)

- `src/data/questions.ts` → ~30 questions seed par catégorie (CR, CSP, NAT). Format JSON typé.
- `src/data/themes.ts` → 5 thèmes officiels (Institutions, Histoire, Valeurs, Géographie, Culture).
- `src/data/mockUser.ts` → utilisateur de démo (stats, série, progression).
- `src/store/userStore.ts` → Zustand store, persisté via AsyncStorage.

L'utilisateur "vit" entièrement en local. Prêt pour brancher un backend plus tard sans refactor majeur.

## Ordre de génération recommandé

```
0 (logo)  →  1 (design)  →  2 (setup)  →  3 (splash)  →  4 (auth)
       →  5 (perso)  →  6 (assess)  →  7 (home)  →  8 (quiz)
       →  9 (simu)  →  10 (themes)  →  11 (progrès)  →  12 (profil)  →  13 (coaching)
```

À chaque étape : tester sur Expo Go (ou simulateur iOS), valider la UX, puis enchaîner.
.