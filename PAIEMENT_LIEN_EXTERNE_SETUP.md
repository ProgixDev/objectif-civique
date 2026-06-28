# Paiement par « lien d'achat externe » — Checklist de mise en place

> Objectif : encaisser les abonnements via **Stripe** (sur le site web) tout en
> affichant un bouton « Payer sur notre site » **dans l'app**, conformément aux
> règles Apple et Google. Cela ramène la commission des stores de **30 %** à
> **~0–20 %** au lieu d'un rejet de l'app.

Ce que l'app fait **déjà** (codé) :
- ✅ Bouton **« Payer sur notre site »** (paywall + écran « Mon accès »).
- ✅ **Écran d'avertissement** avant de quitter l'app.
- ✅ Pré-remplissage de l'e-mail + ouverture du site `/abonnement`.
- ✅ **Déblocage automatique** au retour (webhook Stripe → Supabase → app).

Ce qui dépend du **client** (comptes + inscriptions) ci-dessous.

---

## 🟢 Android (Google Play) — le plus simple

> Faisable rapidement. Pour les **tests fermés**, le bouton marche déjà sans rien.
> Les étapes ci-dessous sont nécessaires pour la **publication publique** dans l'EEE.

1. **Compte Google Play Console** (25 $, paiement unique) — *si pas déjà fait*.
2. Dans la Play Console → **Monétiser → programmes de facturation** :
   - S'inscrire au programme **« Offres externes » (External offers)** pour
     l'**EEE** (Espace économique européen).
   - OU **« Facturation alternative »** (Stripe à côté de Google Play Billing).
3. Accepter l'avenant / les conditions du programme.
4. Déclarer le **lien externe** utilisé (le site `objectifcivique.fr`).

**Délai** : quasi immédiat (formulaire, pas de validation longue).
**Commission Google restante** : ~11 % (au lieu de 15 %).

---

## 🍎 iOS (App Store) — le vrai prérequis bloquant

> Sans ces étapes, le bouton « Payer sur notre site » fait **rejeter** l'app sur iOS.

1. **Compte Apple Developer** (99 $/an) — **à ouvrir par le client**.
   - Type « Organisation » (recommandé) → demande un **numéro D-U-N-S**
     (gratuit, ~5–10 jours à obtenir).
   - Type « Individuel » → plus rapide mais au nom de la personne.
2. Dans App Store Connect / Certificates → activer l'entitlement :
   - `com.apple.developer.storekit.external-purchase-link`
   - Signer l'**addendum** « StoreKit External Purchase Link (EU) ».
3. Déclarer la (les) **URL externe(s)** autorisée(s) : `objectifcivique.fr`.
4. Côté app (à coder une fois l'entitlement obtenu) :
   - Brancher l'API **StoreKit External Purchase Link** → affiche l'**écran
     d'avertissement système** officiel d'Apple avant la sortie.
5. **Reporting mensuel** : déclarer à Apple les ventes réalisées via le lien
   externe (Apple facture sa commission sur ce CA).

**Délai** : ~1–2 semaines (compte + D-U-N-S + entitlement) + temps de dev.
**Commission Apple restante** : ~10–20 % (Core Technology Commission 5 % +
Store Services 5–13 % + 2 % acquisition les 6 premiers mois).

---

## 💳 Stripe (commun aux deux + au site)

1. Le client **active son compte Stripe** (infos société + RIB).
2. Récupérer les **clés LIVE** : `pk_live_…` et `sk_live_…`.
3. Mettre la clé secrète **uniquement** dans les secrets Supabase
   (Edge Functions) — **jamais** dans le code de l'app.
4. Configurer le **webhook** Stripe → Edge Function `stripe-webhook`.
5. Voir `STRIPE_SETUP.md` pour le détail.

---

## ✅ Ordre conseillé

1. **Stripe en LIVE** (sinon rien n'encaisse). 
2. **Android** : inscription External offers → publication possible vite.
3. **Apple** : ouvrir le compte Developer + D-U-N-S **dès que possible** (c'est
   le plus long), puis entitlement + écran système + reporting.

---

## ⚠️ Important — bouton de paiement natif

Le bouton **« Continuer »** actuel paie via **Stripe natif DANS l'app**. Ce mode
est **interdit** par les stores pour du contenu numérique → **à masquer** avant
la soumission publique, en ne laissant que **« Payer sur notre site »** (ou en le
remplaçant par Google Play Billing / Apple IAP si on accepte les 15 %).
