import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { pullAll, startSync, stopSync, pushProfile } from "@/lib/sync";
import { loginRevenueCat, logoutRevenueCat } from "@/lib/revenuecat";
import { User } from "@/types";

/**
 * Service d'authentification — encapsule `supabase.auth` et synchronise les
 * stores locaux. Les écrans n'appellent que ces fonctions.
 */

/** Traduit les erreurs Supabase courantes en messages FR lisibles. */
function frError(message: string | undefined): string {
  const m = (message ?? "").toLowerCase();
  if (m.includes("invalid login")) return "E-mail ou mot de passe incorrect.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Un compte existe déjà avec cet e-mail.";
  if (m.includes("password")) return "Mot de passe invalide (6 caractères min).";
  if (m.includes("email")) return "Adresse e-mail invalide.";
  if (m.includes("network") || m.includes("fetch"))
    return "Pas de connexion. Vérifiez votre réseau.";
  return "Une erreur est survenue. Veuillez réessayer.";
}

function ensureConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Le backend n'est pas configuré (.env Supabase manquant)."
    );
  }
}

function defaultUser(id: string, firstName: string, email: string): User {
  return {
    id,
    firstName,
    email,
    goal: null,
    deadline: null,
    level: null,
    channel: null,
    companion: null,
    createdAt: new Date().toISOString(),
    subscriptionPlan: "free",
    civicTestPassed: null,
    languageTestStatus: null,
    languageCertLevel: null,
  };
}

/**
 * Crée un compte.
 *
 * Retour :
 *   - `User`  → session active, on peut entrer dans l'app (perso).
 *   - `null`  → la confirmation d'e-mail est exigée par Supabase : aucune
 *               session n'est créée. Le compte existe, mais l'utilisateur doit
 *               cliquer le lien reçu par e-mail puis se connecter. NE PAS le
 *               faire entrer dans l'app (sinon état "fantôme" + éjection au
 *               rechargement).
 */
export async function signUpWithEmail(input: {
  firstName: string;
  email: string;
  password: string;
}): Promise<User | null> {
  ensureConfigured();
  const email = input.email.trim().toLowerCase();
  const firstName = input.firstName.trim();

  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      data: { first_name: firstName },
      // Lien de confirmation : tente de rouvrir l'app après validation.
      emailRedirectTo: Linking.createURL("auth-callback"),
    },
  });
  if (error) throw new Error(frError(error.message));
  if (!data.user) throw new Error(frError(undefined));

  // Confirmation d'e-mail activée → pas de session : on signale au caller.
  if (!data.session) return null;

  // Le trigger SQL a créé profiles + progress. On pose l'utilisateur local
  // (defaults) tout de suite pour ne pas bloquer l'onboarding, puis on lance la
  // sync continue.
  const user = defaultUser(data.user.id, firstName, email);
  useUserStore.getState().setUser(user);
  startSync(user.id);
  void loginRevenueCat(user.id);
  // S'assure que first_name/email sont bien persistés côté serveur.
  pushProfile(user);
  return user;
}

export async function signInWithEmail(input: {
  email: string;
  password: string;
}): Promise<User> {
  ensureConfigured();
  const email = input.email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: input.password,
  });
  if (error) throw new Error(frError(error.message));
  if (!data.user) throw new Error(frError(undefined));

  // Restaure profil + progression depuis le backend.
  const pulled = await pullAll(data.user.id);
  const user = pulled ?? defaultUser(data.user.id, "", email);
  if (!pulled) useUserStore.getState().setUser(user);
  startSync(user.id);
  void loginRevenueCat(user.id);
  return user;
}

/**
 * Connexion via Google (OAuth, flux web PKCE).
 * Ouvre le navigateur système, l'utilisateur choisit son compte Google, puis on
 * échange le code contre une session Supabase. Le trigger SQL crée profil +
 * progression au premier login. Retourne null si l'utilisateur annule.
 *
 * Prérequis Supabase : provider Google activé (Client ID + Secret) et l'URL
 * `objectifcivique://auth-callback` ajoutée aux Redirect URLs autorisées.
 */
export async function signInWithGoogle(): Promise<User | null> {
  ensureConfigured();
  const redirectTo = Linking.createURL("auth-callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) throw new Error(frError(error.message));
  if (!data?.url) throw new Error(frError(undefined));

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== "success" || !result.url) return null; // annulé

  // Flux PKCE : la redirection contient `?code=...` à échanger.
  const code = result.url.match(/[?&]code=([^&#]+)/)?.[1];
  if (!code) throw new Error("Réponse Google invalide.");

  const { error: exErr } = await supabase.auth.exchangeCodeForSession(
    decodeURIComponent(code)
  );
  if (exErr) throw new Error(frError(exErr.message));

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const authUser = session?.user;
  if (!authUser) throw new Error(frError(undefined));

  const pulled = await pullAll(authUser.id);
  const user =
    pulled ??
    defaultUser(
      authUser.id,
      (authUser.user_metadata?.full_name as string) ??
        (authUser.user_metadata?.name as string) ??
        "",
      authUser.email ?? ""
    );
  if (!pulled) useUserStore.getState().setUser(user);
  startSync(user.id);
  void loginRevenueCat(user.id);
  return user;
}

/**
 * Connexion via Apple (natif iOS). OBLIGATOIRE dès qu'un login social tiers
 * (Google) est proposé — règle App Store 4.8, sinon rejet.
 *
 * Flux natif : `expo-apple-authentication` renvoie un `identityToken` échangé
 * contre une session Supabase (provider "apple"). Apple ne transmet le nom
 * qu'au PREMIER login → on le capture s'il est présent.
 *
 * Prérequis : iOS uniquement ; `usesAppleSignIn: true` (app.json) ; provider
 * Apple activé dans Supabase (Services ID + clé). Retourne null si annulé.
 */
/**
 * Vrai si « Se connecter avec Apple » est réellement utilisable ici.
 *
 * Le bouton était affiché sans condition. Or `signInAsync` échoue quand la
 * fonctionnalité n'est pas disponible — aucun compte iCloud sur l'appareil,
 * restrictions parentales, iOS trop ancien — et l'utilisateur se retrouvait
 * devant un message d'erreur après avoir touché un bouton qui n'aurait pas dû
 * lui être proposé. C'est ce qu'a rapporté la vérification Apple.
 */
export async function isAppleSignInAvailable(): Promise<boolean> {
  if (Platform.OS !== "ios") return false;
  try {
    return await AppleAuthentication.isAvailableAsync();
  } catch {
    return false;
  }
}

export async function signInWithApple(): Promise<User | null> {
  ensureConfigured();
  if (Platform.OS !== "ios") {
    throw new Error("« Se connecter avec Apple » est disponible sur iPhone.");
  }
  if (!(await isAppleSignInAvailable())) {
    throw new Error(
      "« Se connecter avec Apple » n'est pas disponible sur cet appareil. Utilisez votre e-mail et mot de passe."
    );
  }

  let credential: AppleAuthentication.AppleAuthenticationCredential;
  try {
    credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
  } catch (e) {
    // L'utilisateur a fermé la feuille Apple.
    if (e && typeof e === "object" && (e as { code?: string }).code === "ERR_REQUEST_CANCELED") {
      return null;
    }
    throw new Error(frError(e instanceof Error ? e.message : undefined));
  }

  const idToken = credential.identityToken;
  if (!idToken) throw new Error(frError(undefined));

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "apple",
    token: idToken,
  });
  if (error) throw new Error(frError(error.message));

  // On utilise l'utilisateur renvoyé directement par l'appel, sans repasser par
  // `getSession()` : sur React Native la session est persistée dans
  // AsyncStorage, et une relecture immédiate peut revenir vide. Le code levait
  // alors une erreur alors que la connexion Apple avait réussi.
  // `getSession()` ne sert plus que de repli.
  const authUser =
    data.user ??
    data.session?.user ??
    (await supabase.auth.getSession()).data.session?.user;
  if (!authUser) throw new Error(frError(undefined));

  // Apple ne renvoie le nom qu'au tout premier login.
  const appleName = [
    credential.fullName?.givenName,
    credential.fullName?.familyName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const pulled = await pullAll(authUser.id);
  const user =
    pulled ??
    defaultUser(
      authUser.id,
      appleName || (authUser.user_metadata?.full_name as string) || "",
      authUser.email ?? ""
    );
  if (!pulled) useUserStore.getState().setUser(user);
  startSync(user.id);
  void loginRevenueCat(user.id);
  return user;
}

export async function signOut(): Promise<void> {
  stopSync();
  void logoutRevenueCat();
  try {
    if (isSupabaseConfigured) await supabase.auth.signOut();
  } catch (err) {
    console.warn("[auth] signOut", err);
  }
  useUserStore.getState().clearUser();
  useProgressStore.getState().reset();
  useSessionStore.getState().reset();
}

/**
 * Supprime définitivement le compte de l'utilisateur connecté (RGPD).
 * Appelle la fonction SQL `delete_current_user` (cascade profiles + progress),
 * puis nettoie la session et l'état local.
 */
export async function deleteAccount(): Promise<void> {
  ensureConfigured();
  const { error } = await supabase.rpc("delete_current_user");
  if (error) throw new Error(frError(error.message));
  await signOut();
}

export async function resetPassword(email: string): Promise<void> {
  ensureConfigured();
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: "objectifcivique://reset-password" }
  );
  if (error) throw new Error(frError(error.message));
}

/** Résout quand le persist (AsyncStorage) d'un store zustand est hydraté. */
function whenPersistHydrated(store: {
  persist: { hasHydrated: () => boolean; onFinishHydration: (cb: () => void) => () => void };
}): Promise<void> {
  if (store.persist.hasHydrated()) return Promise.resolve();
  return new Promise((resolve) => {
    const unsub = store.persist.onFinishHydration(() => {
      unsub();
      resolve();
    });
  });
}

/**
 * Au démarrage : restaure la session persistée (offline OK).
 * 1. Attend l'hydratation locale (user + progress depuis AsyncStorage).
 * 2. Vérifie la session Supabase :
 *    - présente → pull (si en ligne) + démarre la sync continue ;
 *    - absente → déconnecte localement (purge user + progression).
 * 3. Pose `hydrated = true` pour débloquer la navigation.
 */
export async function restoreSession(): Promise<void> {
  await Promise.all([
    whenPersistHydrated(useUserStore as any),
    whenPersistHydrated(useProgressStore as any),
  ]);

  const { setHydrated, clearUser, user } = useUserStore.getState();
  try {
    if (!isSupabaseConfigured) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      await pullAll(session.user.id);
      startSync(session.user.id);
      void loginRevenueCat(session.user.id);
    } else if (user) {
      // Plus de session valide → on déconnecte localement.
      clearUser();
      useProgressStore.getState().reset();
    }
  } catch (err) {
    console.warn("[auth] restoreSession", err);
  } finally {
    setHydrated(true);
  }
}
