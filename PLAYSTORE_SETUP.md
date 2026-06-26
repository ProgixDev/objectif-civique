# Dépôt Play Store — Objectif Civique

Checklist et infos prêtes pour la soumission. Ce qui est ✅ est déjà fait.

## 🔗 URLs publiques (hébergées sur le site)
- **Politique de confidentialité** ✅ : https://objectif-civique-landing-page.vercel.app/confidentialite
- **Suppression de compte** ✅ : https://objectif-civique-landing-page.vercel.app/suppression-compte
- **Mentions légales** ✅ : https://objectif-civique-landing-page.vercel.app/mentions-legales

> À renseigner dans la fiche Play Console (Politique de confidentialité) et dans
> *Paramètres de l'app → Suppression de compte → URL*.

## 👤 Compte de test pour les réviseurs Google ✅
À coller dans *Play Console → Test → Identifiants de connexion pour l'examen* :
- **E-mail** : `objectifcivique.review@gmail.com`
- **Mot de passe** : `Reviewer2026!`
- (Compte déjà en **premium** + onboarding complété → accès total, arrive directement sur l'app.)

## 📋 Formulaire « Data safety » (réponses à cocher)
Données **collectées** et **liées à l'utilisateur** :
- **E-mail** — pour la création de compte (authentification). Chiffré en transit. Suppressible.
- **Nom (prénom)** — personnalisation. Suppressible.
- **Activité dans l'app** (réponses, scores, progression) — pour sauvegarder la progression. Suppressible.
- **Infos de paiement** — gérées par le prestataire (Stripe) ; nous ne stockons pas la carte.

Réponses clés :
- Les données sont **chiffrées en transit** : **Oui**.
- L'utilisateur peut **demander la suppression** : **Oui** (in-app + page web).
- Vendez-vous les données ? **Non**.
- Données collectées par des tiers ? Supabase (hébergement), Stripe (paiement).

## ⚠️ Ne pas paraître « officiel » ✅
- Avertissement ajouté **dans l'app** (Profil) et **sur le site** (footer + mentions
  légales) : « application indépendante, non affiliée à une administration ».
- Pas de logo officiel / Marianne utilisé (branding Objectif Civique uniquement).

## ⏱️ Phase de test fermé (OBLIGATOIRE pour un nouveau compte perso)
Google impose **20 testeurs pendant 14 jours** avant d'autoriser la production.
Procédure :
1. **Play Console → Test → Test fermé → Créer une release** → uploader l'**AAB**.
2. Créer une **liste de testeurs** (e-mails Google) — il en faut **20**.
3. Partager le **lien d'inscription au test** ; les 20 testeurs installent et utilisent l'app.
4. Au bout de **14 jours**, le bouton « Passer en production » se débloque.
> 👉 À lancer **le plus tôt possible** (le compte à rebours démarre au 1er upload).

## 🖼️ Fiche Play Store — à préparer (côté client)
- Icône 512×512 (✅ on l'a)
- **Image de présentation** 1024×500
- **Captures d'écran** téléphone (2 à 8)
- Titre, **description courte** (80 car.) + **longue**
- Catégorie : **Éducation**
- E-mail de contact (public)
- Classification de contenu (questionnaire)

## ❗ À compléter / fournir par le client
1. **Vrai e-mail de contact** Objectif Civique (remplace `contact@objectif-civique.fr`
   utilisé dans l'app et les pages légales).
2. **Mentions légales** : nom/raison sociale, adresse, SIRET (champs `[à compléter]`).
3. **Visuels** de la fiche (image 1024×500 + captures).
4. **20 testeurs** (adresses Gmail) pour le test fermé.

## 🧱 Build
- **AAB** (production / test fermé) : `eas build -p android --profile production`
  (le profil production produit déjà un app-bundle).
