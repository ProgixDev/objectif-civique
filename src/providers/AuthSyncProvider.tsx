import React, { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { restoreSession } from "@/lib/auth";
import { stopSync } from "@/lib/sync";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { usePrefsStore } from "@/store/prefsStore";
import { scheduleDailyReminder } from "@/lib/notifications";

/**
 * Restaure la session au démarrage et réagit aux changements d'auth globaux
 * (déconnexion côté serveur, expiration). À monter une seule fois, haut dans
 * l'arbre (RootLayout).
 */
export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    restoreSession();

    // Réinstaure le rappel quotidien si l'utilisateur l'avait activé
    // (les notifications planifiées sont perdues après réinstallation/reboot).
    const { remindersEnabled, reminderHour } = usePrefsStore.getState();
    if (remindersEnabled) scheduleDailyReminder(reminderHour).catch(() => {});

    if (!isSupabaseConfigured) return;

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      // Le login/sign-up est géré explicitement par lib/auth (pull + startSync).
      // Ici on ne traite que la perte de session.
      if (event === "SIGNED_OUT") {
        stopSync();
        useUserStore.getState().clearUser();
        useProgressStore.getState().reset();
      }
    });

    return () => {
      sub.subscription.unsubscribe();
      stopSync();
    };
  }, []);

  return <>{children}</>;
}
