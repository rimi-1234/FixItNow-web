"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Star,
  Tag,
  User2,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { useDashboardUIStore } from "@/state/use-dashboard-ui-store";
import { ROLE_HOME, ROUTES } from "@/config/routes";
import type { User } from "@/domain/models";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const CUSTOMER_NAV: NavItem[] = [
  { href: ROUTES.dashboard.customer.root, label: "Overview", icon: LayoutDashboard },
  { href: ROUTES.dashboard.customer.bookings, label: "Bookings", icon: Calendar },
  { href: ROUTES.dashboard.customer.payments, label: "Payments", icon: CreditCard },
  { href: ROUTES.dashboard.customer.reviews, label: "Reviews", icon: Star },
  { href: ROUTES.dashboard.customer.profile, label: "Profile", icon: User2 },
];

const TECHNICIAN_NAV: NavItem[] = [
  { href: ROUTES.dashboard.technician.root, label: "Overview", icon: LayoutDashboard },
  { href: ROUTES.dashboard.technician.bookings, label: "Bookings", icon: Calendar },
  { href: ROUTES.dashboard.technician.services, label: "My Services", icon: Wrench },
  { href: ROUTES.dashboard.technician.availability, label: "Availability", icon: Clock },
  { href: ROUTES.dashboard.technician.reviews, label: "Reviews", icon: Star },
  { href: ROUTES.dashboard.technician.profile, label: "Profile", icon: User2 },
];

const ADMIN_NAV: NavItem[] = [
  { href: ROUTES.dashboard.admin.root, label: "Overview", icon: LayoutDashboard },
  { href: ROUTES.dashboard.admin.users, label: "Users", icon: Users },
  { href: ROUTES.dashboard.admin.bookings, label: "Bookings", icon: BookOpen },
  { href: ROUTES.dashboard.admin.categories, label: "Categories", icon: Tag },
];

function getNavItems(role?: string): NavItem[] {
  switch (role) {
    case "CUSTOMER":
      return CUSTOMER_NAV;
    case "TECHNICIAN":
      return TECHNICIAN_NAV;
    case "ADMIN":
      return ADMIN_NAV;
    default:
      return [];
  }
}

function getDashboardHome(user: User | null): string {
  if (!user) return ROUTES.dashboard.root;
  return ROLE_HOME[user.role];
}

function getRoleLabel(role?: string): string {
  if (!role) return "Workspace";
  return `${role.charAt(0)}${role.slice(1).toLowerCase()} workspace`;
}

interface SidebarContentProps {
  user: User | null;
  pathname: string;
  collapsed: boolean;
  mobile?: boolean;
  shouldReduceMotion: boolean | null;
  onNavigate?: () => void;
  onClose?: () => void;
  onToggle?: () => void;
}

function SidebarContent({
  user,
  pathname,
  collapsed,
  mobile = false,
  shouldReduceMotion,
  onNavigate,
  onClose,
  onToggle,
}: SidebarContentProps) {
  const navItems = getNavItems(user?.role);
  const dashboardHome = getDashboardHome(user);

  return (
    <nav className="flex h-full flex-col px-3 py-4" aria-label="Dashboard navigation">
      <div className={cn("flex h-11 items-center", collapsed ? "justify-center" : "justify-between px-2")}>
        <Logo href={dashboardHome} variant={collapsed ? "mark" : "full"} size="sm" />
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="mt-7 px-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Workspace
          </p>
        </div>
      )}

      <ul className="mt-3 flex-1 space-y-1" role="list">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isRoot = href === dashboardHome;
          const isActive = isRoot
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                className={cn(
                  "group relative flex min-h-11 items-center gap-3 overflow-hidden rounded-xl px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-brand"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  collapsed && "justify-center px-0"
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={collapsed ? label : undefined}
                title={collapsed ? label : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId={mobile ? "mobile-dashboard-active" : "desktop-dashboard-active"}
                    className="absolute inset-0 rounded-xl border border-brand/15 bg-brand-subtle"
                    transition={{
                      type: "spring",
                      stiffness: shouldReduceMotion ? 1000 : 380,
                      damping: shouldReduceMotion ? 100 : 32,
                      duration: shouldReduceMotion ? 0 : undefined,
                    }}
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10 h-[1.1rem] w-[1.1rem] shrink-0 transition-transform duration-200 motion-reduce:transition-none",
                    !isActive && "group-hover:scale-105"
                  )}
                  aria-hidden="true"
                />
                {!collapsed && <span className="relative z-10 truncate">{label}</span>}
                {isActive && !collapsed && (
                  <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {user && (
        <div className="mt-4 border-t border-border/60 pt-4">
          <div
            className={cn(
              "flex items-center rounded-2xl border border-border/60 bg-muted/45 p-2.5",
              collapsed ? "justify-center border-transparent bg-transparent p-0" : "gap-3"
            )}
            title={collapsed ? user.email : undefined}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-brand-foreground shadow-sm shadow-brand/15">
              {user.email[0]?.toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">{user.email}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[0.68rem] text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-success" aria-hidden="true" />
                  {getRoleLabel(user.role)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {!mobile && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-colors hover:border-brand/30 hover:text-brand md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      )}
    </nav>
  );
}

interface SidebarProps {
  user: User | null;
}

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileNavOpen,
    setMobileNavOpen,
  } = useDashboardUIStore();

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[120] hidden border-r border-border/70 bg-surface/95 shadow-[10px_0_35px_-28px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[width] duration-300 ease-out motion-reduce:transition-none md:block",
          sidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        <SidebarContent
          user={user}
          pathname={pathname}
          collapsed={sidebarCollapsed}
          shouldReduceMotion={shouldReduceMotion}
          onToggle={toggleSidebar}
        />
      </aside>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.button
            type="button"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[150] bg-foreground/45 backdrop-blur-sm md:hidden"
            onClick={closeMobileNav}
            aria-label="Close dashboard navigation"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.aside
            id="dashboard-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard navigation"
            initial={shouldReduceMotion ? false : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-y-0 left-0 z-[200] w-[min(20rem,88vw)] border-r border-border/70 bg-surface shadow-2xl md:hidden"
          >
            <SidebarContent
              user={user}
              pathname={pathname}
              collapsed={false}
              mobile
              shouldReduceMotion={shouldReduceMotion}
              onNavigate={closeMobileNav}
              onClose={closeMobileNav}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
