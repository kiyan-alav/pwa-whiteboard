"use client";

import { ReactNode } from "react";
import { StrokeStoreProvider } from "./providers/stroke-store-provider";
import { UiStoreProvider } from "./providers/ui-store-provider";

export const ZustandProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <UiStoreProvider>
        <StrokeStoreProvider>{children}</StrokeStoreProvider>
      </UiStoreProvider>
    </>
  );
};
