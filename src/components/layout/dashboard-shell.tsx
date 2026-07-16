"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCurrentUser } from "@/features/auth/queries";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { useDashboardUIStore } from "@/state/use-dashboard-ui-store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollProgressBar } from "@/components/chrome/scroll-progress-bar";
import { ScrollToTopButton } from "@/components/chrome/scroll-to-top-button";

function DashboardShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-background" aria-busy="true" aria-label="Loading dashboard">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border/70 bg-surface p-5 md:block">
        <Skeleton className="h-8 w-36" />
        <div className="mt-10 space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="absolute bottom-5 left-5 right-5 h-16 rounded-2xl" />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col md:ml-72">
        <div className="flex h-[4.5rem] items-center justify-between border-b border-border/70 bg-surface px-5 sm:px-7">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <Skeleton className="h-72 w-full rounded-[1.75rem]" />
            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-2xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { data: user, isLoading } = useCurrentUser();
  const { sidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useDashboardUIStore();

  useEffect(() => {
    if (!mobileNavOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileNavOpen, setMobileNavOpen]);

  if (isLoading) return <DashboardShellSkeleton />;

  return (
    <div className="relative flex min-h-screen bg-background">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[500] -translate-y-20 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-lg transition-transform motion-reduce:transition-none focus:translate-y-0"
      >
        Skip to dashboard content
      </a>

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-40 -top-52 h-[32rem] w-[32rem] rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-64 left-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <ScrollProgressBar />
      <DashboardSidebar user={user ?? null} />

      <div
        className={cn(
          "relative flex min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-out motion-reduce:transition-none",
          sidebarCollapsed ? "md:ml-20" : "md:ml-72"
        )}
      >
        <DashboardTopbar user={user ?? null} />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 scroll-mt-24 px-4 py-6 outline-none sm:px-6 lg:px-8 lg:py-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto w-full max-w-7xl"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
