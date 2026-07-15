"use client";

import { Menu, LogOut, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDashboardUIStore } from "@/state/use-dashboard-ui-store";
import { useLogoutMutation } from "@/features/auth/queries";
import { ROUTES, ROLE_HOME } from "@/config/routes";
import Link from "next/link";
import type { User } from "@/domain/models";

interface TopbarProps {
  user: User | null;
}

export function DashboardTopbar({ user }: TopbarProps) {
  const { setMobileNavOpen } = useDashboardUIStore();
  const { mutate: logout, isPending: loggingOut } = useLogoutMutation();

  const profileHref = user?.role
    ? ROLE_HOME[user.role as keyof typeof ROLE_HOME]
    : ROUTES.dashboard.root;

  return (
    <header className="sticky top-0 z-[100] flex h-14 items-center gap-4 border-b border-border bg-surface/95 backdrop-blur-sm px-4 sm:px-6">
      {/* Mobile nav toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* User menu */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="User menu">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {user.email[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium leading-none truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={profileHref}>
                  <User2 className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-danger focus:text-danger focus:bg-danger/10"
                onClick={() => logout()}
                disabled={loggingOut}
              >
                <LogOut className="h-4 w-4" />
                {loggingOut ? "Logging out…" : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
