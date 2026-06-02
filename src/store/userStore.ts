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
      // v3 : passage au backend Supabase — `User.id` correspond désormais à
      // l'uid d'auth.users. On purge les anciens users mock locaux.
      version: 3,
      migrate: () => ({
        // Si on hydrate depuis une version antérieure, on remet à zéro.
        user: null,
        hydrated: false,
      }),
      // NB : on NE pose PAS `hydrated` ici. C'est `restoreSession()` (lib/auth)
      // qui devient l'autorité : il attend l'hydratation du persist, vérifie la
      // session Supabase, puis pose `hydrated = true`. Évite de naviguer avant
      // d'avoir réconcilié l'état local avec le backend.
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
