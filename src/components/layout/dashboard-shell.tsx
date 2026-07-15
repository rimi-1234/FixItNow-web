"use client";

import { useCurrentUser } from "@/features/auth/queries";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { useDashboardUIStore } from "@/state/use-dashboard-ui-store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useCurrentUser();
  const { sidebarCollapsed, mobileNavOpen } = useDashboardUIStore();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar user={user ?? null} />

      {/* Mobile overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/50 md:hidden"
          aria-hidden="true"
          onClick={() => useDashboardUIStore.getState().setMobileNavOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={cn(
          "flex flex-1 flex-col min-w-0 transition-all duration-200",
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        <DashboardTopbar user={user ?? null} />
        <main
          id="main-content"
          className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
