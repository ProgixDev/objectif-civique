# Paiement in-app via RevenueCat — Configuration

> RevenueCat gère l'achat **dans l'app** via **Google Play Billing** (Android)
> et **Apple In-App Purchase** (iOS) — la voie **conforme** aux stores
> (commission 15–30 %, mais **aucun risque de rejet**). Le site web reste
> disponible **séparément** (Stripe), sans lien depuis l'app.

## ✅ Ce qui est déjà codé dans l'app
- SDK `react-native-purchases` installé.
- [src/lib/revenuecat.ts](src/lib/revenuecat.ts) : init, login/logout, achat.
- `usePurchase` utilise RevenueCat **dès qu'une clé est configurée** (sinon
  aucun impact — l'app reste inchangée).
- login/logout RevenueCat branchés sur l'authentification (app_user_id =
  identifiant Supabase de l'utilisateur).
- Webhook serveur : [supabase/functions/revenuecat-webhook](supabase/functions/revenuecat-webhook/index.ts)
  → écrit `subscription_plan` dans Supabase (même principe que Stripe).

## 🔧 À configurer (client + intégrateur)

### 1. Compte & clés RevenueCat
1. Créer le **projet** RevenueCat (fait ✅) et y ajouter **2 apps** : Android
   (Play) et iOS (App Store).
2. Récupérer les **clés API publiques** (Project settings → API keys) et les
   mettre dans `.env` :
   ```
   EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_...
   EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_...
   ```

### 2. Produits dans les stores
Créer **6 produits** (un par forfait) dans **Google Play Console** et **App
Store Connect**, avec des **identifiants qui contiennent l'id du forfait** :

| Forfait | id (à inclure dans le product_id) | Durée |
|---|---|---|
| Découverte | `discovery` | 7 j |
| Premium | `premium` | 30 j |
| Argent | `silver` | 90 j |
| Or | `gold` | 180 j |
| Diamant | `diamond` | 365 j |
| VIP | `vip` | à vie |

> **Type de produit** : nos forfaits sont en **paiement unique** (sans
> renouvellement). Sur l'App Store → « **abonnement non renouvelable** » (ou
> non-consommable pour le VIP à vie). Sur Google Play → produit **in-app**
> (one-time). La **durée d'accès** est gérée par notre backend (accessDays).

### 3. Offerings & Entitlement RevenueCat
1. Créer un **Entitlement** (ex. `premium_access`).
2. Rattacher les 6 produits à cet entitlement.
3. Créer une **Offering** « default » avec **6 packages**, dont l'**identifiant
   de package = l'id du forfait** (`discovery`, `premium`, …) — c'est ce que
   l'app cherche pour lancer le bon achat.

### 4. Webhook RevenueCat → Supabase
1. Déployer la fonction :
   ```
   supabase functions deploy revenuecat-webhook --no-verify-jwt
   ```
2. Définir les secrets Supabase :
   ```
   supabase secrets set REVENUECAT_WEBHOOK_AUTH=<un_secret_au_hasard>
   ```
   (`SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont déjà présents.)
3. Dans RevenueCat → **Integrations → Webhooks** :
   - URL : `https://<projet>.supabase.co/functions/v1/revenuecat-webhook`
   - **Authorization header** : la même valeur que `REVENUECAT_WEBHOOK_AUTH`.

## 🧪 Test
- RevenueCat n'est testable que dans un **build EAS** (le module natif n'est pas
  dans Expo Go), avec un **compte de test** (Google Licence testing / Sandbox
  Apple).
- Sans clé configurée, l'app ignore RevenueCat → pas de régression.

## ⚠️ Prérequis bloquants
- **Google Play** : compte développeur **validé** + app créée (cf. checklist).
- **Apple** : compte Developer reçu + produits créés.
- Tant que les produits n'existent pas, `getOfferings()` est vide → l'achat
  affiche « forfait indisponible ». C'est normal avant la configuration.
