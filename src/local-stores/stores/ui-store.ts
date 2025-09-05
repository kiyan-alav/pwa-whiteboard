import { createStore } from "zustand/vanilla";

export type UiState = {
  theme: "dark" | "light";
};

export type UiActions = {
  toggleTheme: () => void;
};

export type UiStore = UiState & UiActions;

export const defaultInitState: UiState = {
  theme: "light",
};

export const createUiStore = (initState: UiState = defaultInitState) => {
  return createStore<UiStore>()((set) => ({
    ...initState,
    toggleTheme: () =>
      set((state) => {
        if (typeof document === "undefined") return state;

        const html = document.documentElement;
        const currentTheme = state.theme;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        html.classList.remove(currentTheme);
        html.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);

        return { theme: newTheme };
      }),
  }));
};
