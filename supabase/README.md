# Backend Supabase — Objectif Civique

Auth (e-mail/mot de passe) + comptes + synchronisation de la progression.
Architecture **offline-first** : les stores locaux (Zustand + AsyncStorage)
restent le cache d'affichage ; Supabase est la source de vérité du compte.

## Mise en place (une seule fois)

1. **Créer un projet Supabase** sur https://supabase.com → **région EU**
   (Frankfurt) pour le RGPD / marché FR.

2. **Créer le schéma** : Dashboard → **SQL Editor** → New query → coller le
   contenu de [`schema.sql`](./schema.sql) → **Run**. Crée les tables
   `profiles` et `progress`, la RLS, et les triggers (profil/progression auto à
   l'inscription, `updated_at`).

3. **Désactiver la confirmation d'e-mail** (pour la v1) : Dashboard →
   **Authentication → Sign In / Providers → Email** → décocher *Confirm email*.
   Ainsi `signUp` ouvre une session immédiatement et l'onboarding enchaîne.

4. **URL de redirection** (pour « mot de passe oublié ») : Dashboard →
   **Authentication → URL Configuration → Redirect URLs** → ajouter
   `objectifcivique://reset-password`.

5. **Variables d'environnement** : copier `.env.example` → `.env` à la racine et
   remplir avec **Project Settings → API** :
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
   Puis **redémarrer** le serveur Expo (`npm run start -c` pour vider le cache).
   La clé `anon` est publique — c'est la RLS qui protège, pas son secret.
   Ne jamais committer `.env` (déjà dans `.gitignore`).

## Comment ça marche (côté code)

| Fichier | Rôle |
|---|---|
| `src/lib/supabase.ts` | Client Supabase (polyfill URL + session persistée en AsyncStorage). |
| `src/lib/auth.ts` | `signUpWithEmail`, `signInWithEmail`, `signOut`, `resetPassword`, `restoreSession`. |
| `src/lib/sync.ts` | `pullAll` (login), push **debounced** offline-first (profil + progression), flush au foreground. |
| `src/lib/mappers.ts` | Conversions camelCase ⇄ snake_case (types app ⇄ Postgres). |
| `src/providers/AuthSyncProvider.tsx` | Restaure la session au démarrage + écoute la déconnexion. Monté dans `app/_layout.tsx`. |

Le flux d'onboarding (`perso/*`, `paywall`) utilise déjà `updateUser` → la sync
pousse automatiquement les mises à jour de profil, sans modification.

## Sécurité / RLS

Chaque utilisateur ne peut lire/écrire que **ses** lignes (`auth.uid() = id` /
`= user_id`). Vérifiable avec deux comptes de test.

## Hors périmètre v1 (à venir)

OAuth Google/Apple · achats in-app (RevenueCat) · table `sessions` détaillée
(replay Q/R) · realtime multi-appareils · résolution de conflits fine
(actuellement *last-write-wins* via `updated_at`).
