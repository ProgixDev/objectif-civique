// Le polyfill d'URL DOIT être importé avant supabase-js en React Native
// (le runtime RN n'implémente pas complètement l'API URL).
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True si les variables d'environnement Supabase sont configurées.
 * Permet à l'app de tourner en mode dégradé (offline-only) tant que le `.env`
 * n'est pas rempli, sans crasher.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[supabase] EXPO_PUBLIC_SUPABASE_URL / _ANON_KEY manquants — " +
      "l'app fonctionne en local uniquement (pas de compte ni de sync)."
  );
}

/**
 * Client Supabase partagé.
 *
 * La session est persistée et rafraîchie dans AsyncStorage : `getSession()`
 * renvoie donc la session stockée même hors-ligne, ce qui permet de rester
 * connecté sans réseau (architecture offline-first).
 */
export const supabase = createClient(
  supabaseUrl ?? "http://localhost",
  supabaseAnonKey ?? "public-anon-key",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      // Pas de redirection web/URL en natif.
      detectSessionInUrl: false,
    },
  }
);
