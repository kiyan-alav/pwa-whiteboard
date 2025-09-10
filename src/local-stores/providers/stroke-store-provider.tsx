"use client";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  type StrokeStore,
  createStrokeStore,
} from "@/local-stores/stores/canvas-store";

export type StrokeStoreApi = ReturnType<typeof createStrokeStore>;

export const StrokeStoreContext = createContext<StrokeStoreApi | undefined>(
  undefined
);

export interface StrokeStoreProviderProps {
  children: ReactNode;
}

export const StrokeStoreProvider = ({ children }: StrokeStoreProviderProps) => {
  const storeRef = useRef<StrokeStoreApi | null>(null);

  if (!storeRef.current) storeRef.current = createStrokeStore();

  return (
    <StrokeStoreContext.Provider value={storeRef.current}>
      {children}
    </StrokeStoreContext.Provider>
  );
};

export const useStrokeStore = <T,>(selector: (store: StrokeStore) => T): T => {
  const strokeStoreContext = useContext(StrokeStoreContext);

  if (!strokeStoreContext) {
    throw new Error(`useStrokeStore must be used within StrokeStoreProvider`);
  }

  return useStore(strokeStoreContext, selector);
};
