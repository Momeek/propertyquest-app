import { UserAttr } from "../interfaces/user.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrentUserState {
  token: string | null;
  user: UserAttr;
  isAthenticated: boolean;
  isVerified: boolean;
  terms: boolean;
  setUser: (user: UserAttr) => void;
  setToken: (token: string) => void;
  setCookieToken: (token: string) => void;
  setTerms: (terms: boolean) => void;
  logout: () => void;
}

export const useCurrentUserStore = create<
  CurrentUserState,
  [["zustand/persist", CurrentUserState], ["zustand/devtools", never]]
>(
  persist(
    (set) => ({
      token: null,
      user: {},
      isAthenticated: false,
      isVerified: false,
      terms: false,
      setUser: (user: UserAttr) => set({ user }),
      setToken: (token: string) => set({ token, isAthenticated: true }),
      setCookieToken: (token: string) => set({ token }),
      setTerms: (terms: boolean) => set({ terms }),
      logout: () => set({ user: {}, token: null, isAthenticated: false }),
    }),
    {
      name: "current-user",
    }
  )
);
