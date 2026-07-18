# 🚀 Checklist de lancement — Objectif Civique (paiements)

_Dernière mise à jour : 17/07/2026_

## ✅ Déjà fait (ne rien toucher)

- **Stripe (web)** : compte DEMARCHES CIVIQUES validé, 6 forfaits, webhook, secrets Supabase, fonctions déployées.
- **App** : 100 questions d'entretien (contenu prestataire), mentions Canada retirées.
- **Google Play** : 6 produits ponctuels créés (`discovery`, `premium`, `silver`, `gold`, `diamond`, `vip`).
- **RevenueCat** : 6 produits + offering `default` (courante) + 6 packages attachés.
- **Webhook RevenueCat → Supabase** : branché et testé (bon secret → 200, mauvais → 401).

---

## 🔴 Bloquant — Ibrahima (chemin critique)

- [ ] **Surveiller le compte bancaire** : Google envoie un **micro-virement** (quelques centimes) ou un **code** dans le libellé de l'opération.
- [ ] **Saisir ce montant/code** dans Google Play → _Paramètres → Profil de paiement_ → le bandeau rouge « Problème concernant votre profil de paiement » disparaît.
- [ ] Trancher **Particulier vs Entreprise** (voir note en bas — impacte le délai de lancement).

## 🔵 Après validation bancaire — Wissem

- [ ] **Vérifier les prix** des 6 produits, surtout `vip` = **41,99 €** (avait été mis à 39,99).
      Prix cibles : discovery 5,99 · premium 11,99 · silver 17,99 · gold 21,99 · diamond 31,99 · vip 41,99.
- [ ] Créer le **compte de service Google Play** + télécharger le **JSON** (Play Console → Paramètres → Accès à l'API).
- [ ] **Charger le JSON dans RevenueCat** (app Play Store → Service Account credentials) — indispensable pour valider les achats.
- [ ] **Test de licence** : ajouter les e-mails testeurs (Play Console → Configuration monétisation / Test de licence) → achats gratuits.
- [ ] Publier sur la **piste de test interne** + installer l'app **via le lien Play** (⚠️ jamais l'APK sideloadé — le billing ne marche que via le Store).
- [ ] **Achat de test** (Découverte) → vérifier que le forfait se débloque dans l'app (le webhook écrit `subscription_plan` dans Supabase).

## 🗓️ Avant la mise en production

- [ ] **Test fermé : 12 testeurs pendant 14 jours** (obligatoire pour un compte personnel — commencer à recruter dès maintenant).
- [ ] Compléter la **fiche Store** : captures d'écran, classification du contenu, sécurité des données, politique de confidentialité, public cible.

## 🍏 iOS / App Store (en parallèle — voir prérequis)

- [ ] **Compte Apple Developer** actif (99 $/an).
- [ ] Signer le **Paid Applications Agreement** (banque + fiscalité) dans App Store Connect.
- [ ] Créer la **fiche app** dans App Store Connect (bundle id).
- [ ] Créer les **6 produits IAP** avec les mêmes identifiants (`discovery`, `premium`, `silver`, `gold`, `diamond`, `vip`).
- [ ] Ajouter l'**app iOS dans RevenueCat** + clé publique → `EXPO_PUBLIC_REVENUECAT_IOS_KEY` dans `eas.json`.
- [ ] Charger dans RevenueCat la **clé App Store Connect API** (validation des achats iOS).
- [ ] Build iOS (EAS cloud) + TestFlight.

## 🔐 Sécurité (à faire bientôt)

- [ ] **Faire pivoter la clé secrète Stripe** (elle a circulé) → prévenir pour mettre à jour Supabase + redéployer.
- [ ] **Révoquer les 2 clés RevenueCat** `sk_QAKu…` (v1) et `sk_wZv…` (v2) — l'app n'utilise que `goog_…`.
- [ ] Supprimer les fichiers de clés locaux : `fichier.txt`, `.revenuecat-webhook-secret.txt`, `.stripe-live-key.txt`.

---

## 📌 Note — Particulier vs Entreprise (Google Play)

- **Compte personnel** (cas actuel) → Google impose le **test fermé de 14 jours** avant la production.
- **Compte entreprise** → pas de test fermé obligatoire, mais conversion plus longue (numéro **D-U-N-S** à obtenir, 1-2 semaines).

À trancher par Ibrahima selon l'objectif : lancer vite (personnel) ou propre pour le long terme (entreprise).

---

## 🔗 Références techniques

- Projet Supabase : `ofzfughnmxjxszhdlblu`
- Webhook RevenueCat → Supabase : `https://ofzfughnmxjxszhdlblu.supabase.co/functions/v1/revenuecat-webhook`
- Compte Stripe : `acct_1TsoTxK62fAdBlvH` (DEMARCHES CIVIQUES)
- RevenueCat : projet `Objectif Civique` (`proje9247366`), offering `default`
- Détails Stripe : voir [STRIPE_SETUP.md](STRIPE_SETUP.md) · RevenueCat : voir [REVENUECAT_SETUP.md](REVENUECAT_SETUP.md)
