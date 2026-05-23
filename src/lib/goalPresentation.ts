import { ImageSourcePropType } from "react-native";
import { Assets } from "@/constants/assets";
import { Category } from "@/types";

/**
 * Centralise tout le contenu textuel d'affichage par cas (NAT, CR, CSP).
 * Permet d'éviter de hardcoder les libellés à plusieurs endroits et de
 * rendre l'app immédiatement reconnaissable selon le parcours utilisateur.
 */
export type GoalPresentation = {
  /** Libellé court (ex: "Naturalisation") */
  shortLabel: string;
  /** Libellé long (ex: "Naturalisation française") */
  longLabel: string;
  /** Texte affiché en majuscules sur la bannière (ex: "PARCOURS NATURALISATION") */
  banner: string;
  /** Phrase d'introduction sur la bannière */
  tagline: string;
  /** Titre du hero "continuer ma préparation" */
  heroTitle: string;
  /** Sous-titre du hero */
  heroSubtitle: string;
  /** Niveau de langue exigé (forme courte) */
  languageLevel: string;
  /** Verbe d'action principal pour les CTA contextuels */
  actionVerb: string;
  /** Nom de l'icône lucide-react-native (fallback si pas d'image) */
  iconName: string;
  /** Illustration principale du cas (perso-naturalisation/csp/cr.png) */
  illustration: ImageSourcePropType | null;
};

export const GOAL_PRESENTATION: Record<Category, GoalPresentation> = {
  NAT: {
    shortLabel: "Naturalisation",
    longLabel: "Naturalisation française",
    banner: "PARCOURS NATURALISATION",
    tagline:
      "Devenez français — préparez le test civique et l'entretien d'assimilation.",
    heroTitle: "Préparez votre naturalisation",
    heroSubtitle:
      "Test civique, livret du citoyen, entretien d'assimilation : tout est ici.",
    languageLevel: "B2",
    actionVerb: "Continuer ma naturalisation",
    iconName: "Award",
    illustration: Assets.perso.naturalisation,
  },
  CR: {
    shortLabel: "Carte de Résident",
    longLabel: "Carte de Résident (10 ans)",
    banner: "PARCOURS CARTE DE RÉSIDENT",
    tagline:
      "Obtenez une carte de résident de 10 ans — programme civique et linguistique.",
    heroTitle: "Préparez votre Carte de Résident",
    heroSubtitle:
      "Programme civique officiel et conditions d'intégration pour le titre de 10 ans.",
    languageLevel: "B1",
    actionVerb: "Continuer ma préparation CR",
    iconName: "ShieldCheck",
    illustration: Assets.perso.cr,
  },
  CSP: {
    shortLabel: "Carte de Séjour Pluriannuelle",
    longLabel: "Carte de Séjour Pluriannuelle",
    banner: "PARCOURS CARTE DE SÉJOUR",
    tagline:
      "Obtenez ou renouvelez votre Carte de Séjour Pluriannuelle (CSP).",
    heroTitle: "Préparez votre Carte de Séjour",
    heroSubtitle:
      "Contrat d'intégration républicaine et programme civique adaptés à la CSP.",
    languageLevel: "A2",
    actionVerb: "Continuer ma préparation CSP",
    iconName: "CalendarClock",
    illustration: Assets.perso.csp,
  },
};

/**
 * Fallback de présentation quand l'utilisateur n'a pas encore renseigné son cas.
 * Permet d'afficher l'accueil sans crash le temps qu'il finisse l'onboarding.
 */
export const FALLBACK_PRESENTATION: GoalPresentation = {
  shortLabel: "Mon parcours",
  longLabel: "Mon parcours civique",
  banner: "MON PARCOURS",
  tagline:
    "Choisissez votre objectif pour adapter votre préparation à votre cas.",
  heroTitle: "Continuez votre préparation",
  heroSubtitle: "Révisez, simulez et préparez votre dossier.",
  languageLevel: "—",
  actionVerb: "Continuer",
  iconName: "Target",
  illustration: null,
};

export function getPresentation(goal: Category | null | undefined): GoalPresentation {
  if (!goal) return FALLBACK_PRESENTATION;
  return GOAL_PRESENTATION[goal];
}
