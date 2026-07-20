import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  themeName: "default" | "ocean-breeze" | "starry-night";
  primaryColor: string;
  radius: number;
  fontFamily: string;
  isGlass: boolean;
  setThemeName: (name: "default" | "ocean-breeze" | "starry-night") => void;
  setPrimaryColor: (color: string) => void;
  setRadius: (radius: number) => void;
  setFontFamily: (font: string) => void;
  setIsGlass: (isGlass: boolean) => void;
  reset: () => void;
}

const initialState = {
  themeName: "default" as const,
  primaryColor: "",
  radius: 0.5,
  fontFamily: "font-sans",
  isGlass: false,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...initialState,
      setThemeName: (themeName) => set({ themeName }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setRadius: (radius) => set({ radius }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setIsGlass: (isGlass) => set({ isGlass }),
      reset: () => set(initialState),
    }),
    {
      name: "theme-storage",
    },
  ),
);
