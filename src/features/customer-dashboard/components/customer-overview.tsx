"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock3,
  CreditCard,
  Search,
  Star,
  UserRoundSearch,
  Wrench,
} from "lucide-react";
import { useCurrentUser } from "@/features/auth/queries";
import { useCustomerBookings } from "@/features/bookings/queries";
import { usePayments } from "@/features/payments/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DashboardHero,
  DashboardMetric,
  DashboardPanel,
} from "@/components/dashboard/dashboard-presentation";
import { ROUTES } from "@/config/routes";
import { getBookingStatusPresentation } from "@/domain/policies/booking.policy";
import { formatDate, formatCurrency } from "@/domain/formatters";
import type { Booking } from "@/domain/models";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

const ACTIVE_STATUSES = ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"] as const;

function getFriendlyName(email?: string): string {
  if (!email) return "there";
  const localPart = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  if (!localPart) return "there";
  return localPart.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function BookingStatusBadge({ booking }: { booking: Booking }) {
  const { label, color } = getBookingStatusPresentation(booking.status);
  const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
  return <Badge variant={badgeVariant}>{label}</Badge>;
}

export function CustomerOverview() {
  const { data: user } = useCurrentUser();
  const { data: bookings, isLoading: loadingBookings } = useCustomerBookings();
  const { data: payments, isLoading: loadingPayments } = usePayments();

  const recentBookings = bookings?.slice(0, 5) ?? [];
  const totalSpent =
    payments?.reduce(
      (sum, payment) => (payment.status === "COMPLETED" ? sum + payment.amount : sum),
      0
    ) ?? 0;
  const activeBookings =
    bookings?.filter((booking) => ACTIVE_STATUSES.includes(booking.status as (typeof ACTIVE_STATUSES)[number])) ?? [];
  const nextBooking = activeBookings[0];

  return (
    <div className="space-y-6 lg:space-y-8">
      <DashboardHero
        eyebrow="Customer workspace"
        title={`Good to see you, ${getFriendlyName(user?.email)}.`}
        description="Keep every home-service job organized in one place—from finding the right professional to tracking payment and completion."
        imageSrc="/images/hero/home-services-hero.webp"
        imageAlt="Home service professionals at work"
        mediaLabel="Active bookings"
        mediaValue={loadingBookings ? "—" : activeBookings.length}
        actions={
          <>
            <Button asChild className="rounded-xl">
              <Link href={ROUTES.services}>
                <Search className="h-4 w-4" aria-hidden="true" />
                Browse services
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-xl bg-card/60">
              <Link href={ROUTES.dashboard.customer.bookings}>
                View bookings
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Account summary">
        <DashboardMetric
          icon={Calendar}
          label="Total bookings"
          value={bookings?.length ?? 0}
          supportingText="All service requests"
          href={ROUTES.dashboard.customer.bookings}
          loading={loadingBookings}
          tone="brand"
          delay={0.04}
        />
        <DashboardMetric
          icon={Clock3}
          label="Active jobs"
          value={activeBookings.length}
          supportingText="Requested or in progress"
          href={ROUTES.dashboard.customer.bookings}
          loading={loadingBookings}
          tone="accent"
          delay={0.08}
        />
        <DashboardMetric
          icon={CreditCard}
          label="Total spent"
          value={formatCurrency(totalSpent)}
          supportingText="Completed payments"
          href={ROUTES.dashboard.customer.payments}
          loading={loadingPayments}
          tone="success"
          delay={0.12}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <DashboardPanel
          className="lg:col-span-8"
          eyebrow="Activity"
          title="Recent bookings"
          description="The latest service requests and their current status."
          delay={0.14}
          contentClassName="p-0 sm:p-0"
          action={
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.dashboard.customer.bookings}>
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          }
        >
          {loadingBookings ? (
            <div className="space-y-3 p-5 sm:p-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
                <Wrench className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">Your first fix starts here</h3>
              <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                Browse available services and book a trusted professional when you are ready.
              </p>
              <Button size="sm" className="mt-5" asChild>
                <Link href={ROUTES.services}>Browse services</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border/60" role="list" aria-label="Recent bookings">
              {recentBookings.map((booking) => (
                <li key={booking.id}>
                  <Link
                    href={ROUTES.dashboard.customer.booking(booking.id)}
                    className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                      <Wrench className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {booking.service?.name ?? "Service booking"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(booking.scheduledTime)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <BookingStatusBadge booking={booking} />
                      <ArrowRight className="hidden h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 sm:block" aria-hidden="true" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </DashboardPanel>

        <div className="space-y-6 lg:col-span-4">
          <DashboardPanel
            eyebrow="Next up"
            title="Your next booking"
            description="The most immediate job in your queue."
            delay={0.18}
          >
            {loadingBookings ? (
              <div className="space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
            ) : nextBooking ? (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {nextBooking.service?.name ?? "Service booking"}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(nextBooking.scheduledTime)}
                    </p>
                  </div>
                  <BookingStatusBadge booking={nextBooking} />
                </div>
                <Button variant="outline" size="sm" className="mt-5 w-full" asChild>
                  <Link href={ROUTES.dashboard.customer.booking(nextBooking.id)}>
                    Open booking
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="py-2 text-center">
                <p className="text-sm font-medium text-foreground">No active booking</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Your schedule is clear right now.</p>
              </div>
            )}
          </DashboardPanel>

          <DashboardPanel
            eyebrow="Shortcuts"
            title="Get things done"
            delay={0.22}
            contentClassName="p-2 sm:p-2"
          >
            <ul role="list" className="divide-y divide-border/60">
              {[
                { href: ROUTES.services, label: "Browse services", icon: Search },
                { href: ROUTES.technicians, label: "Find technicians", icon: UserRoundSearch },
                { href: ROUTES.dashboard.customer.reviews, label: "Your reviews", icon: Star },
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                    <span className="flex-1">{label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}
