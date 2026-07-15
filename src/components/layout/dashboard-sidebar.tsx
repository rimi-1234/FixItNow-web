"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, CreditCard, Star, User2, Wrench, Clock,
  Users, BookOpen, Tag, ChevronLeft, ChevronRight
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { useDashboardUIStore } from "@/state/use-dashboard-ui-store";
import { ROUTES } from "@/config/routes";
import type { User } from "@/domain/models";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
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
    case "CUSTOMER": return CUSTOMER_NAV;
    case "TECHNICIAN": return TECHNICIAN_NAV;
    case "ADMIN": return ADMIN_NAV;
    default: return [];
  }
}

interface SidebarProps {
  user: User | null;
}

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, mobileNavOpen } = useDashboardUIStore();
  const navItems = getNavItems(user?.role);

  const sidebarContent = (
    <nav className="flex flex-col h-full py-4" aria-label="Dashboard navigation">
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between px-4 mb-6">
        {sidebarCollapsed ? (
          <Logo variant="mark" size="sm" />
        ) : (
          <Logo size="sm" />
        )}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-1.5 rounded-[var(--radius-sm)] hover:bg-muted text-muted-foreground transition-colors"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation items */}
      <ul className="flex-1 space-y-0.5 px-2" role="list">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== ROUTES.dashboard.customer.root && href !== ROUTES.dashboard.technician.root && href !== ROUTES.dashboard.admin.root && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-subtle text-brand"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  sidebarCollapsed && "justify-center"
                )}
                aria-current={isActive ? "page" : undefined}
                title={sidebarCollapsed ? label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {!sidebarCollapsed && <span>{label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* User footer */}
      {user && !sidebarCollapsed && (
        <div className="mt-auto px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-full bg-brand-subtle flex items-center justify-center text-brand text-sm font-bold shrink-0">
              {user.email[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-[100] bg-surface border-r border-border transition-all duration-200",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "flex md:hidden flex-col fixed top-0 left-0 bottom-0 z-[200] w-72 bg-surface border-r border-border transition-transform duration-200",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
