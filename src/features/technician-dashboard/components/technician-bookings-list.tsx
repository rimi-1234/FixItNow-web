"use client";

import { Calendar } from "lucide-react";
import { useTechnicianBookings, useUpdateTechnicianBookingStatusMutation } from "@/features/bookings/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBookingStatusPresentation, getAllowedTechnicianTransitions } from "@/domain/policies/booking.policy";
import { formatScheduledTime, formatCurrency } from "@/domain/formatters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { Booking } from "@/domain/models";
import type { BookingStatus } from "@/domain/enums";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accept",
  DECLINED: "Decline",
  PAID: "Paid",
  IN_PROGRESS: "Start Work",
  COMPLETED: "Mark Complete",
  CANCELLED: "Cancelled",
};

function TechBookingCard({ booking }: { booking: Booking }) {
  const { label, color } = getBookingStatusPresentation(booking.status);
  const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
  const allowedTransitions = getAllowedTechnicianTransitions(booking);
  const { mutate: updateStatus, isPending } = useUpdateTechnicianBookingStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "">(
    allowedTransitions.length === 1 ? allowedTransitions[0]! : ""
  );

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-foreground text-sm">
                {booking.service?.name ?? "Service"}
              </h3>
              <Badge variant={badgeVariant}>{label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Customer: {booking.customer?.email ?? "Unknown"} · {formatScheduledTime(booking.scheduledTime)}
            </p>
            {booking.service?.price !== undefined && (
              <p className="text-sm font-bold text-brand mt-1">{formatCurrency(booking.service.price)}</p>
            )}
          </div>

          {/* Status action */}
          {allowedTransitions.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              {allowedTransitions.length > 1 ? (
                <>
                  <Select
                    value={selectedStatus}
                    onValueChange={(v) => setSelectedStatus(v as BookingStatus)}
                  >
                    <SelectTrigger className="h-8 text-xs w-36">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedTransitions.map((s) => (
                        <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    loading={isPending}
                    disabled={!selectedStatus || isPending}
                    onClick={() => selectedStatus && updateStatus({ id: booking.id, status: selectedStatus as BookingStatus })}
                  >
                    Update
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant={allowedTransitions[0] === "DECLINED" ? "outline" : "default"}
                  loading={isPending}
                  disabled={isPending}
                  onClick={() => allowedTransitions[0] && updateStatus({ id: booking.id, status: allowedTransitions[0] })}
                >
                  {STATUS_LABELS[allowedTransitions[0]!] ?? allowedTransitions[0]}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function TechnicianBookingsList() {
  const { data: bookings, isLoading, isError, refetch } = useTechnicianBookings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Booking Inbox</h1>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && bookings?.length === 0 && (
        <EmptyState icon={Calendar} title="No bookings yet" description="Customers will book your services here" />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <ul className="space-y-3" role="list">
          {bookings.map((b) => <li key={b.id}><TechBookingCard booking={b} /></li>)}
        </ul>
      )}
    </div>
  );
}
