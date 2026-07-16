"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";
import { getQueryClient } from "@/lib/query/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        enableColorScheme
        storageKey="fixitnow-theme"
      >
        <MotionConfig reducedMotion="user">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "bg-card text-card-foreground border border-border shadow-md",
                title: "font-semibold",
                description: "text-muted-foreground text-sm",
                success: "border-success/30 bg-success/5",
                error: "border-danger/30 bg-danger/5",
              },
            }}
          />
        </MotionConfig>
      </ThemeProvider>
      {process.env["NODE_ENV"] === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
