import { Category, Question } from "@/types";
import { QUESTIONS, FLASHCARD_QUESTIONS } from "./questions";

/**
 * Banques de questions — organisées par provenance FULL-DATA, telles que le
 * client souhaite les voir (officielles, entraînement, mise en situation,
 * prépa intense, etc.). Chaque banque pointe vers une ou plusieurs valeurs de
 * `Question.source`, ce qui garantit que TOUT le contenu importé est exploité
 * et atteignable depuis l'app.
 *
 * Note : la source "REFERENTIEL-OFFICIEL" de FULL-DATA est un doublon exact de
 * "PREPA-INTENSE" (mêmes ids) — elle est donc fusionnée dans la banque Prépa
 * intense et n'apparaît pas en double.
 */

export type BankKind = "qcm" | "flashcard";

export type Bank = {
  id: string;
  label: string;
  description: string;
  /** Valeur(s) de `Question.source` regroupées dans cette banque. */
  sources: string[];
  kind: BankKind;
  /** Nom d'icône lucide-react-native. */
  icon: string;
};

/** Banques jouables en QCM (entraînement chronométrable, correction immédiate). */
export const QCM_BANKS: Bank[] = [
  {
    id: "officielles",
    label: "Questions officielles",
    description: "Banque officielle du gouvernement",
    sources: ["officielles"],
    kind: "qcm",
    icon: "ShieldCheck",
  },
  {
    id: "entrainement",
    label: "Entraînement",
    description: "QCM d'entraînement de l'équipe Objectif Civique",
    sources: ["entrainement"],
    kind: "qcm",
    icon: "Dumbbell",
  },
  {
    id: "mise-en-situation",
    label: "Mise en situation",
    description: "Scénarios réalistes d'entretien en préfecture",
    sources: ["mise-en-situation", "SITUATION"],
    kind: "qcm",
    icon: "MessagesSquare",
  },
];

/** Banques de révision en flashcards (Q/R, sans choix). */
export const FLASHCARD_BANKS: Bank[] = [
  {
    id: "prepa-intense",
    label: "Prépa intense",
    description: "Cartes de révision express, tous thèmes",
    sources: ["PREPA-INTENSE", "REFERENTIEL-OFFICIEL"],
    kind: "flashcard",
    icon: "Zap",
  },
  {
    id: "referentiel",
    label: "Référentiel",
    description: "Notions de référence à mémoriser",
    sources: ["REFERENTIEL"],
    kind: "flashcard",
    icon: "Library",
  },
  {
    id: "apprendre",
    label: "Apprendre",
    description: "Premières notions à découvrir",
    sources: ["APPRENDRE"],
    kind: "flashcard",
    icon: "GraduationCap",
  },
  {
    id: "livret",
    label: "Livret officiel",
    description: "Fiches du livret du citoyen",
    sources: ["officielles"],
    kind: "flashcard",
    icon: "BookMarked",
  },
];

export const ALL_BANKS: Bank[] = [...QCM_BANKS, ...FLASHCARD_BANKS];

function inBank(q: Question, bank: Bank): boolean {
  return q.source != null && bank.sources.includes(q.source);
}

/**
 * Nombre de questions d'une banque, optionnellement filtré par cas (NAT/CR/CSP).
 * Lit le bon pool selon le type de banque.
 */
export function bankCount(bank: Bank, category?: Category | "Tous"): number {
  const pool = bank.kind === "flashcard" ? FLASHCARD_QUESTIONS : QUESTIONS;
  return pool.filter(
    (q) =>
      inBank(q, bank) &&
      (!category || category === "Tous" || q.categories.includes(category))
  ).length;
}

export function getBank(id: string): Bank | undefined {
  return ALL_BANKS.find((b) => b.id === id);
}
