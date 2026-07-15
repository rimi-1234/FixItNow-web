"use client";

import { BookOpen } from "lucide-react";
import { useAdminBookings } from "@/features/bookings/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

function AdminBookingRow({ booking }: { booking: Booking }) {
  const { label, color } = getBookingStatusPresentation(booking.status);
  const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-medium text-foreground text-sm">{booking.service?.name ?? "Service"}</h3>
              <Badge variant={badgeVariant} className="text-xs">{label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Customer: {booking.customer?.email ?? booking.customerId.slice(-8)} ·
              Tech: {booking.technician?.email ?? booking.technicianId.slice(-8)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(booking.scheduledTime)}
              {booking.service?.price && ` · ${formatCurrency(booking.service.price)}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminBookingsList() {
  const { data: bookings, isLoading, isError, refetch } = useAdminBookings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">All Bookings</h1>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-20 w-full rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && bookings?.length === 0 && (
        <EmptyState icon={BookOpen} title="No bookings yet" />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <ul className="space-y-3" role="list" aria-label={`${bookings.length} bookings`}>
          {bookings.map((b) => <li key={b.id}><AdminBookingRow booking={b} /></li>)}
        </ul>
      )}
    </div>
  );
}
