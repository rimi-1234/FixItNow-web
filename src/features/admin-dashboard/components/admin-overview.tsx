"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck2,
  ShieldCheck,
  Tag,
  Users,
  Wrench,
} from "lucide-react";
import { useAdminUsers } from "@/features/admin-dashboard/queries";
import { useAdminBookings } from "@/features/bookings/queries";
import { useAdminCategories } from "@/features/categories/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardHero,
  DashboardMetric,
  DashboardPanel,
} from "@/components/dashboard/dashboard-presentation";
import { ROUTES } from "@/config/routes";
import { getBookingStatusPresentation } from "@/domain/policies/booking.policy";
import { formatCurrency, formatDate } from "@/domain/formatters";
import type { Booking } from "@/domain/models";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

function BookingStatusBadge({ booking }: { booking: Booking }) {
  const { label, color } = getBookingStatusPresentation(booking.status);
  const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
  return <Badge variant={badgeVariant}>{label}</Badge>;
}

export function AdminOverview() {
  const { data: users, isLoading: loadingUsers } = useAdminUsers();
  const { data: bookings, isLoading: loadingBookings } = useAdminBookings();
  const { data: categories, isLoading: loadingCategories } = useAdminCategories();

  const recentBookings = bookings?.slice(0, 6) ?? [];
  const activeUsers = users?.filter((user) => user.status === "ACTIVE").length ?? 0;
  const openBookings =
    bookings?.filter((booking) => ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)).length ?? 0;
  const completedBookings = bookings?.filter((booking) => booking.status === "COMPLETED").length ?? 0;
  const cancelledBookings =
    bookings?.filter((booking) => ["CANCELLED", "DECLINED"].includes(booking.status)).length ?? 0;
  const bookingTotal = Math.max(bookings?.length ?? 0, 1);

  const roleMix = [
    { label: "Customers", value: users?.filter((user) => user.role === "CUSTOMER").length ?? 0, className: "bg-brand" },
    { label: "Technicians", value: users?.filter((user) => user.role === "TECHNICIAN").length ?? 0, className: "bg-accent" },
    { label: "Admins", value: users?.filter((user) => user.role === "ADMIN").length ?? 0, className: "bg-warning" },
  ];
  const userTotal = Math.max(users?.length ?? 0, 1);

  return (
    <div className="space-y-6 lg:space-y-8">
      <DashboardHero
        eyebrow="Admin control center"
        title="The whole platform, one clear view."
        description="Monitor marketplace activity, keep service categories organized, and move quickly when users or bookings need attention."
        imageSrc="/images/hero/home-services-hero.webp"
        imageAlt="Home-service platform operations"
        mediaLabel="Open bookings"
        mediaValue={loadingBookings ? "—" : openBookings}
        tone="warning"
        actions={
          <>
            <Button asChild className="rounded-xl">
              <Link href={ROUTES.dashboard.admin.users}>
                <Users className="h-4 w-4" aria-hidden="true" />
                Manage users
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-xl bg-card/60">
              <Link href={ROUTES.dashboard.admin.bookings}>
                Review bookings
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Platform summary">
        <DashboardMetric
          icon={Users}
          label="Total users"
          value={users?.length ?? 0}
          supportingText={`${activeUsers} active accounts`}
          href={ROUTES.dashboard.admin.users}
          loading={loadingUsers}
          tone="brand"
          delay={0.04}
        />
        <DashboardMetric
          icon={BookOpen}
          label="Total bookings"
          value={bookings?.length ?? 0}
          supportingText={`${openBookings} currently open`}
          href={ROUTES.dashboard.admin.bookings}
          loading={loadingBookings}
          tone="accent"
          delay={0.08}
        />
        <DashboardMetric
          icon={Tag}
          label="Categories"
          value={categories?.length ?? 0}
          supportingText="Available service groups"
          href={ROUTES.dashboard.admin.categories}
          loading={loadingCategories}
          tone="warning"
          delay={0.12}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <DashboardPanel
          className="lg:col-span-8"
          eyebrow="Marketplace activity"
          title="Recent bookings"
          description="A concise view of the latest jobs moving through the platform."
          delay={0.14}
          contentClassName="p-0 sm:p-0"
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.dashboard.admin.bookings}>
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          }
        >
          {loadingBookings ? (
            <div className="space-y-3 p-5 sm:p-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-56 max-w-full" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
                <CalendarCheck2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">No booking activity yet</h3>
              <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                New bookings will appear here as customers begin using the platform.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border/60" role="list" aria-label="Recent platform bookings">
              {recentBookings.map((booking) => (
                <li key={booking.id} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/40 sm:px-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                    <Wrench className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {booking.service?.name ?? "Service booking"}
                      </p>
                      {booking.service?.price !== undefined && (
                        <span className="hidden shrink-0 text-xs font-semibold text-brand sm:inline">
                          {formatCurrency(booking.service.price)}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {booking.customer?.email ?? "Customer"} · {formatDate(booking.scheduledTime)}
                    </p>
                  </div>
                  <BookingStatusBadge booking={booking} />
                </li>
              ))}
            </ul>
          )}
        </DashboardPanel>

        <div className="space-y-6 lg:col-span-4">
          <DashboardPanel
            eyebrow="Community"
            title="User mix"
            description="Accounts currently registered by role."
            delay={0.18}
          >
            {loadingUsers ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-9 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {roleMix.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${item.className}`}
                        style={{ width: `${(item.value / userTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" size="sm" className="mt-5 w-full" asChild>
              <Link href={ROUTES.dashboard.admin.users}>
                Open user management
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </DashboardPanel>

          <DashboardPanel
            eyebrow="Operations"
            title="Booking health"
            description="Status distribution across every booking."
            delay={0.22}
          >
            {loadingBookings ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { label: "Open", value: openBookings, icon: BookOpen, className: "text-accent bg-accent/15" },
                  { label: "Completed", value: completedBookings, icon: ShieldCheck, className: "text-success bg-success/15" },
                  { label: "Closed", value: cancelledBookings, icon: CalendarCheck2, className: "text-muted-foreground bg-muted" },
                ].map(({ label, value, icon: Icon, className }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${className}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground">{label}</p>
                      <p className="mt-0.5 text-lg font-bold tracking-tight text-foreground">{value}</p>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {Math.round((value / bookingTotal) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}
