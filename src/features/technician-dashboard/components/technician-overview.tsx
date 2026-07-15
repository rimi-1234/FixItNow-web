"use client";

import { Calendar, Wrench, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTechnicianBookings } from "@/features/bookings/queries";
import { useCurrentUser } from "@/features/auth/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/config/routes";
import { getBookingStatusPresentation } from "@/domain/policies/booking.policy";
import { formatScheduledTime } from "@/domain/formatters";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

export function TechnicianOverview() {
  const { data: user } = useCurrentUser();
  const { data: bookings, isLoading } = useTechnicianBookings();

  const pending = bookings?.filter((b) => b.status === "REQUESTED").length ?? 0;
  const active = bookings?.filter((b) => ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)).length ?? 0;
  const completed = bookings?.filter((b) => b.status === "COMPLETED").length ?? 0;

  const recentBookings = bookings?.slice(0, 5) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Technician Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Calendar, label: "Pending Requests", value: pending, href: ROUTES.dashboard.technician.bookings },
          { icon: Clock, label: "Active Jobs", value: active, href: ROUTES.dashboard.technician.bookings },
          { icon: Wrench, label: "Completed", value: completed, href: ROUTES.dashboard.technician.bookings },
        ].map(({ icon: Icon, label, value, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:border-brand/40 hover:shadow-md transition-all duration-200 group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                  </div>
                  <div className="rounded-[var(--radius-lg)] bg-brand-subtle p-3 group-hover:bg-brand transition-colors">
                    <Icon className="h-5 w-5 text-brand group-hover:text-brand-foreground transition-colors" aria-hidden />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-[var(--radius-xl)] bg-brand-subtle border border-brand/20 p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground text-sm">Manage your services</p>
            <p className="text-xs text-muted-foreground">Add or update the services you offer</p>
          </div>
          <Button size="sm" asChild>
            <Link href={ROUTES.dashboard.technician.services}>
              Services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="rounded-[var(--radius-xl)] bg-muted border border-border p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground text-sm">Update availability</p>
            <p className="text-xs text-muted-foreground">Let customers know when you're free</p>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link href={ROUTES.dashboard.technician.availability}>
              Availability
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Booking Requests</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.dashboard.technician.bookings}>View all</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-5 space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-muted-foreground">No booking requests yet.</p>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-border">
              {recentBookings.map((booking) => {
                const { label, color } = getBookingStatusPresentation(booking.status);
                const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
                return (
                  <li key={booking.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{booking.service?.name ?? "Service"}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.customer?.email ?? "Customer"} · {formatScheduledTime(booking.scheduledTime)}
                      </p>
                    </div>
                    <Badge variant={badgeVariant}>{label}</Badge>
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
