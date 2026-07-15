"use client";

import { motion } from "motion/react";
import { useCurrentUser } from "@/features/auth/queries";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { useDashboardUIStore } from "@/state/use-dashboard-ui-store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollProgressBar } from "@/components/chrome/scroll-progress-bar";
import { ScrollToTopButton } from "@/components/chrome/scroll-to-top-button";
import { MessengerWidget } from "@/components/chrome/messenger-widget";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useCurrentUser();
  const { sidebarCollapsed, mobileNavOpen } = useDashboardUIStore();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-background to-indigo-950/20">
        <div className="w-64 space-y-4 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-xl backdrop-blur-xl">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-slate-50 via-background to-indigo-50/40 dark:from-slate-950 dark:via-background dark:to-indigo-950/30">
      <ScrollProgressBar />
      <DashboardSidebar user={user ?? null} />

      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => useDashboardUIStore.getState().setMobileNavOpen(false)}
        />
      )}

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col transition-all duration-300 ease-out",
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        <DashboardTopbar user={user ?? null} />
        <main id="main-content" className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
            className="mx-auto max-w-6xl"
          >
            {children}
          </motion.div>
        </main>
      </div>

      <ScrollToTopButton />
      <MessengerWidget />
    </div>
  );
}
