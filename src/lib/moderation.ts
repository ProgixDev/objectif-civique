import { Alert } from "react-native";
import {
  blockUser,
  reportContent,
  REPORT_REASONS,
  ReportKind,
} from "@/lib/forumApi";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/store/toastStore";

/**
 * Menu de modération affiché depuis le bouton « ⋯ » d'une discussion ou d'une
 * réponse : signaler le contenu, bloquer son auteur.
 *
 * Ce sont deux des quatre garde-fous exigés par l'App Store (guideline 1.2) —
 * les deux autres étant le filtrage à la publication (`lib/contentFilter`) et
 * l'adresse de contact publiée dans les réglages.
 *
 * On s'appuie sur `Alert` : c'est la feuille d'action native, immédiatement
 * reconnaissable par l'utilisateur comme par le vérificateur Apple.
 */
export function showContentActions(opts: {
  kind: ReportKind;
  contentId: string;
  authorId: string | null;
  authorName: string;
  /** Appelé après un blocage, pour recharger la liste sans le contenu masqué. */
  onBlocked?: () => void;
}): void {
  const { kind, contentId, authorId, authorName, onBlocked } = opts;
  const currentUserId = useUserStore.getState().user?.id ?? null;
  // Ni auto-blocage, ni blocage du contenu système (auteur nul).
  const canBlock = !!authorId && authorId !== currentUserId;

  const buttons: Parameters<typeof Alert.alert>[2] = [
    { text: "Signaler ce contenu", onPress: () => askReason() },
  ];
  if (canBlock) {
    buttons.push({
      text: "Bloquer cet utilisateur",
      style: "destructive",
      onPress: () => confirmBlock(),
    });
  }
  buttons.push({ text: "Annuler", style: "cancel" });

  Alert.alert(authorName, "Que souhaitez-vous faire ?", buttons);

  function askReason() {
    Alert.alert(
      "Signaler",
      "Pour quelle raison signalez-vous ce contenu ?",
      [
        ...REPORT_REASONS.map((reason) => ({
          text: reason,
          onPress: () => submitReport(reason),
        })),
        { text: "Annuler", style: "cancel" as const },
      ]
    );
  }

  async function submitReport(reason: string) {
    try {
      await reportContent({ kind, contentId, authorId, reason });
      toast.success(
        "Signalement envoyé. Notre équipe examinera ce contenu sous 24 h."
      );
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Signalement impossible."
      );
    }
  }

  function confirmBlock() {
    Alert.alert(
      `Bloquer ${authorName} ?`,
      "Vous ne verrez plus aucune de ses discussions ni de ses réponses. Vous pourrez le débloquer depuis les réglages.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Bloquer",
          style: "destructive",
          onPress: async () => {
            try {
              await blockUser(authorId!, authorName);
              toast.success(`${authorName} a été bloqué.`);
              onBlocked?.();
            } catch (e) {
              toast.error(
                e instanceof Error ? e.message : "Blocage impossible."
              );
            }
          },
        },
      ]
    );
  }
}
