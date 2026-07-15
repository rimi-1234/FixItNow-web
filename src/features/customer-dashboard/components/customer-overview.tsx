"use client";

import Link from "next/link";
import { Calendar, CreditCard, Star, ArrowRight } from "lucide-react";
import { useCurrentUser } from "@/features/auth/queries";
import { useCustomerBookings } from "@/features/bookings/queries";
import { usePayments } from "@/features/payments/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/config/routes";
import { getBookingStatusPresentation } from "@/domain/policies/booking.policy";
import { formatDate, formatCurrency } from "@/domain/formatters";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

function StatCard({ icon: Icon, label, value, href }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="group rounded-2xl border-border/70 bg-card/80 shadow-sm backdrop-blur-md transition duration-300 ease-out hover:scale-[1.02] hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
            <div className="rounded-2xl bg-brand-subtle p-3 transition-colors group-hover:bg-brand">
              <Icon className="h-5 w-5 text-brand transition-colors group-hover:text-brand-foreground" aria-hidden />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CustomerOverview() {
  const { data: user } = useCurrentUser();
  const { data: bookings, isLoading: loadingBookings } = useCustomerBookings();
  const { data: payments } = usePayments();

  const recentBookings = bookings?.slice(0, 5) ?? [];
  const totalSpent = payments?.reduce((sum, p) => p.status === "COMPLETED" ? sum + p.amount : sum, 0) ?? 0;
  const pendingCount = bookings?.filter((b) => ["REQUESTED", "ACCEPTED", "PAID"].includes(b.status)).length ?? 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Calendar}
          label="Total Bookings"
          value={bookings?.length ?? 0}
          href={ROUTES.dashboard.customer.bookings}
        />
        <StatCard
          icon={CreditCard}
          label="Active Jobs"
          value={pendingCount}
          href={ROUTES.dashboard.customer.bookings}
        />
        <StatCard
          icon={Star}
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          href={ROUTES.dashboard.customer.payments}
        />
      </div>

      {/* Quick action */}
      <div className="rounded-[var(--radius-xl)] bg-gradient-to-r from-brand/10 to-accent/5 border border-brand/20 p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Need something fixed?</p>
          <p className="text-sm text-muted-foreground mt-0.5">Browse technicians and book in seconds</p>
        </div>
        <Button asChild>
          <Link href={ROUTES.technicians}>
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Recent bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Recent Bookings</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.dashboard.customer.bookings}>View all</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {loadingBookings ? (
            <div className="p-5 space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
              <Button size="sm" className="mt-3" asChild>
                <Link href={ROUTES.services}>Browse Services</Link>
              </Button>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-border">
              {recentBookings.map((booking) => {
                const { label, color } = getBookingStatusPresentation(booking.status);
                const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
                return (
                  <li key={booking.id}>
                    <Link
                      href={ROUTES.dashboard.customer.booking(booking.id)}
                      className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{booking.service?.name ?? "Service"}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(booking.scheduledTime)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={badgeVariant}>{label}</Badge>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
