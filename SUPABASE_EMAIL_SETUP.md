# Inscription par e-mail + e-mail de bienvenue (Supabase)

Choix retenu : **confirmation d'e-mail obligatoire**. À l'inscription, l'utilisateur
reçoit un e-mail de bienvenue contenant un lien de confirmation ; il doit cliquer
ce lien, puis se connecter dans l'app. L'e-mail de confirmation **fait office de
message de bienvenue** (pas de service tiers à configurer).

Côté app, c'est déjà géré : après l'inscription, l'utilisateur voit
« Compte créé ! Vérifiez votre e-mail… » et est redirigé vers l'écran de
connexion (plus d'éjection/sortie de l'app).

## Réglages à faire dans le dashboard Supabase

### 1. Activer la confirmation d'e-mail
**Authentication → Providers → Email** → activer **« Confirm email »** (ON).

### 2. Autoriser le retour vers l'app
**Authentication → URL Configuration → Redirect URLs** → ajouter :
```
objectifcivique://auth-callback
```
(Le lien de confirmation valide le compte côté serveur, puis tente de rouvrir l'app.)

### 3. Personnaliser l'e-mail de bienvenue
**Authentication → Emails → « Confirm signup »** :
- **Subject :** `Bienvenue sur Objectif Civique — confirmez votre e-mail`
- **Message body :** coller le contenu de
  [`supabase/email-templates/confirm-signup.html`](supabase/email-templates/confirm-signup.html)

### 4. ⚠️ Envoi d'e-mails en production (important)
Le serveur e-mail intégré de Supabase est **limité (quelques mails/heure)** et
réservé aux tests — en production, les e-mails risquent de ne pas partir.
Pour de vrais envois, configurer un **SMTP personnalisé** :
**Authentication → SMTP Settings** → renseigner un fournisseur
(ex. Resend, Brevo, Mailgun, ou le SMTP de l'hébergeur mail du client).

## Vérifier que ça marche
1. Créer un compte test dans l'app → l'app affiche « Vérifiez votre e-mail… ».
2. L'e-mail de bienvenue arrive → cliquer « Confirmer mon e-mail ».
3. Revenir dans l'app → se connecter → le questionnaire d'onboarding s'affiche. ✅

> Si tu préfères plus tard **supprimer la confirmation** (entrée directe sans
> e-mail), il suffit de désactiver « Confirm email » : le code gère déjà les deux
> cas automatiquement.
