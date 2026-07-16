"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  LogOut,
  Menu,
  Search,
  User2,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardUIStore } from "@/state/use-dashboard-ui-store";
import { useLogoutMutation } from "@/features/auth/queries";
import { ROUTES } from "@/config/routes";
import type { User } from "@/domain/models";

interface TopbarProps {
  user: User | null;
}

interface RouteMeta {
  section: string;
  title: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  [ROUTES.dashboard.customer.root]: { section: "Customer", title: "Overview" },
  [ROUTES.dashboard.customer.bookings]: { section: "Customer", title: "My bookings" },
  [ROUTES.dashboard.customer.payments]: { section: "Customer", title: "Payment history" },
  [ROUTES.dashboard.customer.reviews]: { section: "Customer", title: "My reviews" },
  [ROUTES.dashboard.customer.profile]: { section: "Customer", title: "Profile" },
  [ROUTES.dashboard.technician.root]: { section: "Technician", title: "Overview" },
  [ROUTES.dashboard.technician.bookings]: { section: "Technician", title: "Booking inbox" },
  [ROUTES.dashboard.technician.services]: { section: "Technician", title: "My services" },
  [ROUTES.dashboard.technician.availability]: { section: "Technician", title: "Availability" },
  [ROUTES.dashboard.technician.reviews]: { section: "Technician", title: "Reviews" },
  [ROUTES.dashboard.technician.profile]: { section: "Technician", title: "Professional profile" },
  [ROUTES.dashboard.admin.root]: { section: "Admin", title: "Platform overview" },
  [ROUTES.dashboard.admin.users]: { section: "Admin", title: "Users" },
  [ROUTES.dashboard.admin.bookings]: { section: "Admin", title: "All bookings" },
  [ROUTES.dashboard.admin.categories]: { section: "Admin", title: "Categories" },
};

function getRouteMeta(pathname: string): RouteMeta {
  const exact = ROUTE_META[pathname];
  if (exact) return exact;

  if (pathname.startsWith(`${ROUTES.dashboard.customer.bookings}/`)) {
    return { section: "Customer", title: "Booking details" };
  }

  return { section: "Dashboard", title: "Workspace" };
}

function getProfileHref(user: User | null): string {
  switch (user?.role) {
    case "CUSTOMER":
      return ROUTES.dashboard.customer.profile;
    case "TECHNICIAN":
      return ROUTES.dashboard.technician.profile;
    case "ADMIN":
      return ROUTES.dashboard.admin.root;
    default:
      return ROUTES.dashboard.root;
  }
}

function getQuickAction(role?: string): {
  label: string;
  href: string;
  icon: LucideIcon;
} | null {
  switch (role) {
    case "CUSTOMER":
      return { label: "Find a pro", href: ROUTES.technicians, icon: Search };
    case "TECHNICIAN":
      return { label: "Manage services", href: ROUTES.dashboard.technician.services, icon: Wrench };
    case "ADMIN":
      return { label: "Manage users", href: ROUTES.dashboard.admin.users, icon: Users };
    default:
      return null;
  }
}

export function DashboardTopbar({ user }: TopbarProps) {
  const pathname = usePathname();
  const { mobileNavOpen, setMobileNavOpen } = useDashboardUIStore();
  const { mutate: logout, isPending: loggingOut } = useLogoutMutation();
  const pageMeta = getRouteMeta(pathname);
  const profileHref = getProfileHref(user);
  const quickAction = getQuickAction(user?.role);
  const QuickActionIcon = quickAction?.icon;

  return (
    <header className="sticky top-0 z-[110] flex h-[4.5rem] items-center gap-3 border-b border-border/70 bg-surface/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open navigation"
        aria-controls="dashboard-mobile-nav"
        aria-expanded={mobileNavOpen}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="min-w-0 flex-1">
        <div className="hidden items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:flex">
          <span>{pageMeta.section}</span>
          <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
          <span>Workspace</span>
        </div>
        <p className="truncate text-sm font-semibold tracking-tight text-foreground sm:mt-0.5 sm:text-base">
          {pageMeta.title}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {quickAction && QuickActionIcon && (
          <Button size="sm" variant="outline" asChild className="hidden rounded-xl lg:inline-flex">
            <Link href={quickAction.href}>
              <QuickActionIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {quickAction.label}
            </Link>
          </Button>
        )}

        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-2 rounded-xl px-1.5 sm:pr-2.5"
                aria-label="Open user menu"
              >
                <Avatar className="h-8 w-8 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-brand text-xs font-bold text-brand-foreground">
                    {user.email[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-36 truncate text-xs font-semibold text-foreground xl:block">
                  {user.email}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <p className="truncate text-sm font-semibold leading-none text-foreground">{user.email}</p>
                  <p className="text-xs capitalize text-muted-foreground">
                    {user.role.toLowerCase()} account
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={profileHref}>
                  <User2 className="h-4 w-4" />
                  {user.role === "ADMIN" ? "Admin dashboard" : "View profile"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.home}>
                  <ArrowUpRight className="h-4 w-4" />
                  Visit website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-danger focus:bg-danger/10 focus:text-danger"
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
