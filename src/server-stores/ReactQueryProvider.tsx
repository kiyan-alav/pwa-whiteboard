"use client";
import { getQueryClient } from "@/app/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type * as React from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const showDevtools = process.env.NODE_ENV === "development";
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
