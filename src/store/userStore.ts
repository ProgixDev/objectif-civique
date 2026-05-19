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
      // Version du schéma persistant : bumpe ce nombre si la forme de `User`
      // change de manière incompatible. Zustand efface alors le state
      // persistant obsolète au prochain démarrage.
      version: 2,
      migrate: () => ({
        // Si on hydrate depuis une version antérieure, on remet à zéro.
        user: null,
        hydrated: false,
      }),
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
