import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import { User } from "@/types";

type UserState = {
  user: User | null;
  hydrated: boolean;
  setUser: (user: User) => void;
  updateUser: (patch: Partial<User>) => void;
  clearUser: () => void;
  setHydrated: (v: boolean) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : state.user,
        })),
      clearUser: () => set({ user: null }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "objectif-civique-user",
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export function isPersoComplete(user: User | null): boolean {
  if (!user) return false;
  return !!(
    user.goal &&
    user.deadline &&
    user.level &&
    user.companion
  );
}
