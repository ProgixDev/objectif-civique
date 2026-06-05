import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";

/**
 * Préférences locales de l'appareil (non synchronisées sur le backend) :
 * réglages d'expérience comme les rappels de notification.
 */
type PrefsState = {
  /** Rappel quotidien de révision activé. */
  remindersEnabled: boolean;
  /** Heure du rappel (0-23). */
  reminderHour: number;
  setRemindersEnabled: (v: boolean) => void;
  setReminderHour: (h: number) => void;
};

export const usePrefsStore = create<PrefsState>()(
  persist(
    (set) => ({
      remindersEnabled: false,
      reminderHour: 19,
      setRemindersEnabled: (v) => set({ remindersEnabled: v }),
      setReminderHour: (h) => set({ reminderHour: h }),
    }),
    {
      name: "objectif-civique-prefs",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
