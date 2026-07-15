"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { useCustomerBookings, useCancelBookingMutation } from "@/features/bookings/queries";
import { useCreatePaymentMutation, useSyncPaymentSessionMutation } from "@/features/payments/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBookingStatusPresentation, canCustomerCancel, canCustomerPay, canCustomerReview } from "@/domain/policies/booking.policy";
import { formatScheduledTime, formatCurrency } from "@/domain/formatters";
import { ReviewDialog } from "@/features/reviews/components/review-dialog";
import { useEffect, useRef, useState } from "react";
import type { Booking } from "@/domain/models";
import { ROUTES } from "@/config/routes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

function BookingCard({ booking }: { booking: Booking }) {
  const { label, color } = getBookingStatusPresentation(booking.status);
  const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
  const { mutateAsync: cancel, isPending: cancelling } = useCancelBookingMutation();
  const { mutateAsync: createPayment, isPending: paying } = useCreatePaymentMutation();
  const [reviewOpen, setReviewOpen] = useState(false);

  const handlePay = async () => {
    await createPayment({ bookingId: booking.id, provider: "STRIPE" });
  };

  return (
    <Card className="transition-colors hover:border-brand/30">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <Link
            href={ROUTES.dashboard.customer.booking(booking.id)}
            className="min-w-0 flex-1 rounded-[var(--radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                {booking.service?.name ?? "Service"}
              </h3>
              <Badge variant={badgeVariant}>{label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              by {booking.technician?.email ?? "Unknown"} · {formatScheduledTime(booking.scheduledTime)}
            </p>
            {booking.service?.price !== undefined && (
              <p className="mt-1 text-sm font-bold text-brand">{formatCurrency(booking.service.price)}</p>
            )}
          </Link>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Button size="sm" variant="ghost" asChild>
              <Link href={ROUTES.dashboard.customer.booking(booking.id)}>View</Link>
            </Button>
            {canCustomerPay(booking) && (
              <Button size="sm" loading={paying} onClick={handlePay}>
                Pay Now
              </Button>
            )}
            {canCustomerReview(booking) && !booking.review && (
              <>
                <Button size="sm" variant="outline" onClick={() => setReviewOpen(true)}>
                  Leave Review
                </Button>
                <ReviewDialog
                  open={reviewOpen}
                  onOpenChange={setReviewOpen}
                  bookingId={booking.id}
                  technicianId={booking.technicianId}
                />
              </>
            )}
            {booking.review && (
              <Badge variant="success">Reviewed ★{booking.review.rating}</Badge>
            )}
            {canCustomerCancel(booking) && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="text-danger border-danger/30 hover:bg-danger/10">
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will cancel your booking for {booking.service?.name}. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep booking</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-danger text-danger-foreground hover:bg-danger/90"
                      onClick={() => cancel(booking.id)}
                      disabled={cancelling}
                    >
                      {cancelling ? "Cancelling…" : "Yes, cancel"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CustomerBookingsList() {
  const { data: bookings, isLoading, isError, refetch } = useCustomerBookings();
  const { mutate: syncSession } = useSyncPaymentSessionMutation();
  const attemptedSessions = useRef(new Set<string>());

  useEffect(() => {
    if (!bookings?.length) return;
    for (const booking of bookings) {
      const payment = booking.payment;
      if (
        payment?.status === "PENDING" &&
        payment.provider === "STRIPE" &&
        payment.transactionId &&
        !attemptedSessions.current.has(payment.transactionId)
      ) {
        attemptedSessions.current.add(payment.transactionId);
        syncSession(payment.transactionId);
      }
    }
  }, [bookings, syncSession]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && bookings?.length === 0 && (
        <EmptyState
          icon={Calendar}
          title="No bookings yet"
          description="Book a technician to get started with your first service"
          action={{ label: "Browse Services", href: "/services" }}
        />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <ul className="space-y-3" role="list" aria-label="Bookings">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
