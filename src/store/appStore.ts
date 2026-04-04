import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  language: "en" | "si";
  currency: string;
  setLanguage: (lang: "en" | "si") => void;
  setCurrency: (currency: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "en",
      currency: "USD",
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (curr) => set({ currency: curr }),
    }),
    {
      name: "cozycorner-settings-storage",
    }
  )
);
