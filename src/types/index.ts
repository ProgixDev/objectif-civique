export type Category = "CR" | "CSP" | "NAT";

export type ThemeId =
  | "institutions"
  | "histoire"
  | "valeurs"
  | "geographie"
  | "culture";

export type Level = "debutant" | "intermediaire" | "avance" | "inconnu";

export type Deadline = "lt1m" | "1to3m" | "3to6m" | "undecided";

export type SubscriptionPlan = "free" | "monthly" | "quarterly" | "lifetime";

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
};

export type Question = {
  id: string;
  category: Category;
  theme: ThemeId;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
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
