import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  xp: number;
  streak: number;
  dailyXP: number;
  dailyGoal: number;
  completedLessonIds: string[];
  addXP: (amount: number) => void;
  addDailyXP: (amount: number) => void;
  completeLesson: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 120,
      streak: 12,
      dailyXP: 15,
      dailyGoal: 20,
      completedLessonIds: [],
      addXP: (amount) => set((s) => ({ xp: s.xp + amount })),
      addDailyXP: (amount) =>
        set((s) => ({ dailyXP: Math.min(s.dailyXP + amount, s.dailyGoal) })),
      completeLesson: (id) =>
        set((s) => ({
          completedLessonIds: s.completedLessonIds.includes(id)
            ? s.completedLessonIds
            : [...s.completedLessonIds, id],
        })),
      isLessonCompleted: (id) => get().completedLessonIds.includes(id),
    }),
    {
      name: "lingua-progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
