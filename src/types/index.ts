export type Category = "CR" | "CSP" | "NAT";

export type ThemeId =
  | "principes-valeurs-republique"
  | "droits-et-devoirs"
  | "systeme-institutionnel"
  | "histoire-geographie-culture"
  | "vivre-en-societe";

export type QuestionType = "qcm" | "flashcard" | "mise-en-situation";

export type Level = "debutant" | "intermediaire" | "avance" | "inconnu";

export type Deadline = "lt1m" | "1to3m" | "3to6m" | "undecided";

export type SubscriptionPlan = "free" | "monthly" | "quarterly" | "lifetime";

export type LanguageTestStatus = "passed" | "not_yet" | "planned";

export type LanguageCertLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type User = {
  id: string;
  firstName: string;
  email: string;
  goal: Category | null;
  deadline: Deadline | null;
  level: Level | null;
  channel: string | null;
  companion: string | null;
  createdAt: string;
  subscriptionPlan: SubscriptionPlan;
  /** Naturalisation only: has the candidate already passed the test civique? */
  civicTestPassed: boolean | null;
  /** All cases: has the candidate already passed an official French language test? */
  languageTestStatus: LanguageTestStatus | null;
  /** Certified level if languageTestStatus === "passed" */
  languageCertLevel: LanguageCertLevel | null;
};

export type Question = {
  id: string;
  /** Identifiant court humain-lisible (ex: "Q-89331C") */
  shortId?: string;
  /**
   * Cas concernés par la question (NAT, CR, CSP).
   * Une question peut être valide pour plusieurs cas — d'où un tableau.
   */
  categories: Category[];
  theme: ThemeId;
  text: string;
  choices: string[];
  /** -1 si la question est une flashcard sans choix */
  correctIndex: number;
  explanation: string;
  /** Type pédagogique de la question. Défaut: "qcm". */
  type?: QuestionType;
  /** True si la question est extraite des banques officielles du gouvernement. */
  isOfficial?: boolean;
  /**
   * Banque de provenance FULL-DATA — utilisée pour organiser et filtrer les
   * questions par source (ex: "officielles", "entrainement", "mise-en-situation",
   * "PREPA-INTENSE", "SITUATION", "APPRENDRE", "REFERENTIEL").
   */
  source?: string;
};

export type Theme = {
  id: ThemeId;
  name: string;
  icon: string;
  questionCount: number;
};

export type Answer = {
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean | null;
};

export type SessionType =
  | "practice"
  | "simulation"
  | "theme"
  | "assessment"
  | "assimilation";

export type AssimilationTopic =
  | "motivation"
  | "valeurs"
  | "histoire"
  | "institutions"
  | "vie-quotidienne"
  | "personnel";

export type AssimilationQuestion = {
  id: string;
  topic: AssimilationTopic;
  type: "vraiFaux" | "choix";
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type Session = {
  id: string;
  type: SessionType;
  category?: Category;
  themeId?: ThemeId;
  startedAt: string;
  endedAt?: string;
  questions: Question[];
  answers: Answer[];
  durationMs?: number;
  // For simulation
  startedAtMs?: number;
  timerInitialSeconds?: number;
  /**
   * Clé de la simulation lancée depuis le catalogue (ex: "histoire-1").
   * Utilisée par l'écran de résultats pour proposer la simu suivante.
   */
  simKey?: string;
  /**
   * Clé décrivant le contexte d'origine de la session d'entraînement
   * (ex: `theme:histoire-geographie-culture:NAT`, `bank:officielles:NAT`,
   * `practice:NAT`, `test:histoire`). L'écran d'entraînement s'en sert pour
   * savoir s'il doit reconstruire la session (contexte différent) ou conserver
   * celle en cours (retour arrière / navigation entre questions).
   */
  originKey?: string;
};

export type Plan = {
  id: "monthly" | "quarterly" | "lifetime";
  title: string;
  price: string;
  period: string;
  highlight: boolean;
  badge?: string;
  features: string[];
};

export type Recap = {
  correct: number;
  wrong: number;
  skipped: number;
  percent: number;
  total: number;
};

export type DailyStat = {
  date: string;
  questionsAnswered: number;
  successRate: number;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
};
