# Intégration Stripe — Objectif Civique

Paiement par **Stripe PaymentSheet natif** (`@stripe/stripe-react-native`).
Backend = **Edge Functions Supabase** + **webhook** (source de vérité des forfaits).

## ⚠️ À savoir avant publication sur les stores

Apple App Store et Google Play **interdisent Stripe** pour les abonnements
numériques dans une app mobile (ils imposent leurs achats in-app). Stripe est
acceptable pour : une version **web**, une distribution **hors store**, ou via
l'exception **DMA en UE** (procédure spécifique à activer auprès d'Apple/Google).
Cette intégration fonctionne techniquement dès maintenant en build de dev/interne ;
vérifier la conformité store avant une mise en production grand public.

---

## Les 6 forfaits

| Forfait    | id (interne) | Prix     | Type            |
|------------|--------------|----------|-----------------|
| Découverte | `discovery`  | 5,99 €   | Paiement unique, **7 jours** d'accès |
| Premium    | `premium`    | 9,99 €   | Abonnement **mensuel** |
| Argent     | `silver`     | 15,99 €  | Abonnement **3 mois** |
| Or         | `gold`       | 19,99 €  | Abonnement **6 mois** |
| Diamant    | `diamond`    | 29,99 €  | Abonnement **annuel** |
| Accès VIP  | `vip`        | 39,99 €  | Paiement unique, **à vie** |

Définition unique côté app : [`src/data/plans.ts`](src/data/plans.ts).
Définition côté serveur : [`supabase/functions/_shared/plans.ts`](supabase/functions/_shared/plans.ts).

---

## Étapes de configuration

### 1. Compte & clés Stripe
1. Créer un compte sur https://dashboard.stripe.com (rester en **mode Test** au début).
2. Récupérer dans *Développeurs → Clés API* :
   - clé **publiable** `pk_test_…`
   - clé **secrète** `sk_test_…`

### 2. Créer les produits/tarifs
```powershell
$env:STRIPE_SECRET_KEY = "sk_test_..."
node scripts/stripe-setup.mjs
```
Le script crée les 6 produits et imprime les `price_id` des 4 abonnements.

### 3. Clé publiable côté app
Dans `.env` :
```
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Schéma de base de données
Exécuter [`supabase/schema.sql`](supabase/schema.sql) dans
*Supabase → SQL Editor* (idempotent : ajoute les colonnes Stripe, le trigger
anti-fraude et la table d'idempotence des webhooks).

### 5. Secrets des Edge Functions
```bash
supabase secrets set \
  STRIPE_SECRET_KEY=sk_test_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  STRIPE_PRICE_PREMIUM=price_... \
  STRIPE_PRICE_SILVER=price_... \
  STRIPE_PRICE_GOLD=price_... \
  STRIPE_PRICE_DIAMOND=price_...
```
> `SUPABASE_URL`, `SUPABASE_ANON_KEY` et `SUPABASE_SERVICE_ROLE_KEY` sont
> injectés automatiquement dans les Edge Functions — ne pas les redéfinir.
> Le `STRIPE_WEBHOOK_SECRET` s'obtient à l'étape 7.

### 6. Déployer les fonctions
```bash
supabase functions deploy create-payment-sheet
supabase functions deploy cancel-subscription
supabase functions deploy stripe-webhook --no-verify-jwt   # ⚠️ sans JWT
```
Le `--no-verify-jwt` est **obligatoire** pour le webhook : Stripe n'envoie pas
de JWT Supabase, c'est la signature Stripe qui authentifie l'appel.

### 7. Configurer le webhook Stripe
Dans *Stripe → Développeurs → Webhooks → Ajouter un endpoint* :
- URL : `https://<PROJET>.supabase.co/functions/v1/stripe-webhook`
- Événements à écouter :
  - `payment_intent.succeeded`
  - `invoice.paid`
  - `invoice.payment_succeeded`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Copier le *Signing secret* `whsec_…` → le mettre dans les secrets (étape 5)
  puis redéployer `stripe-webhook`.

### 8. Build natif (obligatoire — pas d'Expo Go)
Le module Stripe est natif. Lancer un **build de dev** :
```bash
npx expo prebuild
npx expo run:android   # ou run:ios (macOS)
```
Cartes de test : `4242 4242 4242 4242`, date future, CVC quelconque.

---

## Architecture & sécurité

- **Le client ne décide jamais du forfait.** L'app appelle
  `create-payment-sheet`, paie via le PaymentSheet, puis **réconcilie** le
  forfait depuis le backend ([`usePurchase`](src/hooks/usePurchase.ts)).
- **La vérité vient du webhook** (service role) qui écrit `subscription_plan`,
  `subscription_status`, `subscription_expires_at` dans `profiles`.
- Un **trigger Postgres** (`protect_subscription_columns`) empêche tout
  utilisateur authentifié de modifier ces colonnes — impossible de s'offrir un
  forfait en bidouillant le state local.
- L'expiration est gérée par [`effectivePlan()`](src/lib/entitlements.ts) :
  Découverte expire après 7 jours, les abonnements à la fin de période si non
  renouvelés, VIP jamais.

## Changement de formule / annulation
- **Changer de formule** : `create-payment-sheet` annule l'abonnement actif
  existant puis en crée un nouveau (remplacement immédiat, v1).
- **Annuler** : `cancel-subscription` pose `cancel_at_period_end` — l'accès
  reste actif jusqu'à l'échéance déjà payée.

## Passage en production (live)
1. Refaire les étapes 1→7 avec les clés `sk_live_…` / `pk_live_…`.
2. Relancer `scripts/stripe-setup.mjs` avec la clé live (nouveaux `price_id`).
3. Créer un webhook live distinct et mettre à jour `STRIPE_WEBHOOK_SECRET`.
