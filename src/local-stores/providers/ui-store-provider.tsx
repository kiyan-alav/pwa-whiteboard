"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useStore } from "zustand";

import { type UiStore, createUiStore } from "@/local-stores/stores/ui-store";

export type UiStoreApi = ReturnType<typeof createUiStore>;

export const UiStoreContext = createContext<UiStoreApi | undefined>(undefined);

export interface UiStoreProviderProps {
  children: ReactNode;
}

export const UiStoreProvider = ({ children }: UiStoreProviderProps) => {
  const storeRef = useRef<UiStoreApi | null>(null);

  if (!storeRef.current) storeRef.current = createUiStore();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved && saved !== storeRef.current!.getState().theme) {
      const html = document.documentElement;
      html.classList.remove(storeRef.current!.getState().theme);
      html.classList.add(saved);
      storeRef.current!.setState({ theme: saved });
    }
  }, []);

  return (
    <UiStoreContext.Provider value={storeRef.current}>
      {children}
    </UiStoreContext.Provider>
  );
};

export const useUiStore = <T,>(selector: (store: UiStore) => T): T => {
  const uiStoreContext = useContext(UiStoreContext);

  if (!uiStoreContext) {
    throw new Error(`useUiStore must be used within UiStoreProvider`);
  }

  return useStore(uiStoreContext, selector);
};
