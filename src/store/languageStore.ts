import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Language } from "@/types/learning";

// ─── Language Store ────────────────────────────────────────────────────────────
// Persists the user's selected learning language to AsyncStorage so the choice
// survives app restarts. _hasHydrated tracks when the store has finished reading
// from AsyncStorage — used to gate routing decisions in the index screen.

interface LanguageState {
  selectedLanguage: Language | null;
  /** True once the store has rehydrated from AsyncStorage */
  _hasHydrated: boolean;
  setSelectedLanguage: (language: Language) => void;
  clearLanguage: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      _hasHydrated: false,
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      clearLanguage: () => set({ selectedLanguage: null }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "lingua-language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
