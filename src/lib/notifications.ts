import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Notifications LOCALES (planifiées sur l'appareil, sans serveur) :
 * rappel quotidien de révision. Marche hors-ligne. Les notifications push
 * (depuis un serveur) ne sont pas gérées ici.
 */

const DAILY_ID = "daily-study-reminder";

// Affichage en premier plan (si l'app est ouverte au moment du déclenchement).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/** Demande l'autorisation d'envoyer des notifications. */
export async function requestNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("reminders", {
      name: "Rappels de révision",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

/**
 * Planifie (ou replanifie) un rappel quotidien à l'heure donnée.
 * Retourne false si l'utilisateur a refusé les notifications.
 */
export async function scheduleDailyReminder(
  hour = 19,
  minute = 0
): Promise<boolean> {
  const ok = await requestNotificationPermission();
  if (!ok) return false;
  await ensureAndroidChannel();
  await Notifications.cancelScheduledNotificationAsync(DAILY_ID).catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: DAILY_ID,
    content: {
      title: "Objectif Civique",
      body: "5 minutes de révision aujourd'hui pour garder ta série ? 🔥",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
  return true;
}

export async function cancelDailyReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(DAILY_ID).catch(() => {});
}
