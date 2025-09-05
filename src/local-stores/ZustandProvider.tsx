"use client";

import { ReactNode } from "react";
import { UiStoreProvider } from "./providers/ui-store-provider";

export const ZustandProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <UiStoreProvider>{children}</UiStoreProvider>
    </>
  );
};
