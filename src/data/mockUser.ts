import { User } from "@/types";

export const MOCK_USER: User = {
  id: "demo-user",
  firstName: "Ibrahima",
  email: "demo@objectifcivique.fr",
  goal: "NAT",
  deadline: "1to3m",
  level: "intermediaire",
  channel: "search",
  companion: "alone",
  createdAt: new Date().toISOString(),
  subscriptionPlan: "free",
  civicTestPassed: null,
  languageTestStatus: null,
  languageCertLevel: null,
};

export const INITIAL_THEME_PROGRESS: Record<string, number> = {
  "principes-valeurs-republique": 85,
  "droits-et-devoirs": 58,
  "systeme-institutionnel": 72,
  "histoire-geographie-culture": 40,
  "vivre-en-societe": 33,
};
