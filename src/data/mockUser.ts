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
};

export const INITIAL_THEME_PROGRESS: Record<string, number> = {
  institutions: 72,
  histoire: 58,
  valeurs: 85,
  geographie: 40,
  culture: 33,
};
