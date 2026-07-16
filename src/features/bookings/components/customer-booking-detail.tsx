"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Wrench, CreditCard, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useBookingDetail, useCancelBookingMutation } from "@/features/bookings/queries";
import { useCreatePaymentMutation, useSyncPaymentSessionMutation } from "@/features/payments/queries";
import { ReviewDialog } from "@/features/reviews/components/review-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/feedback/error-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import {
  canCustomerCancel,
  canCustomerPay,
  canCustomerReview,
  getBookingStatusPresentation,
} from "@/domain/policies/booking.policy";
import {
  formatCurrency,
  formatDateTime,
  formatScheduledTime,
  getPaymentStatusPresentation,
} from "@/domain/formatters";
import { ROUTES } from "@/config/routes";

const BADGE_VARIANT_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
  info: "info" as const,
};

export function CustomerBookingDetail() {
  const params = useParams<{ id: string }>();
  const bookingId = params?.id ?? "";
  const { data: booking, isLoading, isError, refetch, error } = useBookingDetail(bookingId);
  const { mutateAsync: cancel, isPending: cancelling } = useCancelBookingMutation();
  const { mutateAsync: createPayment, isPending: paying } = useCreatePaymentMutation();
  const { mutate: syncSession } = useSyncPaymentSessionMutation();
  const [reviewOpen, setReviewOpen] = useState(false);
  const attemptedSessions = useRef(new Set<string>());

  useEffect(() => {
    const payment = booking?.payment;
    if (
      payment?.status === "PENDING" &&
      payment.provider === "STRIPE" &&
      payment.transactionId &&
      !attemptedSessions.current.has(payment.transactionId)
    ) {
      attemptedSessions.current.add(payment.transactionId);
      syncSession(payment.transactionId);
    }
  }, [
    booking?.payment,
    syncSession,
  ]);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-2xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-[var(--radius-xl)]" />
        <Skeleton className="h-32 w-full rounded-[var(--radius-xl)]" />
      </div>
    );
  }

  if (isError || !booking) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "We could not load this booking.";

    return (
      <div className="space-y-6 max-w-2xl">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href={ROUTES.dashboard.customer.bookings}>
            <ArrowLeft className="h-4 w-4" /> Back to bookings
          </Link>
        </Button>
        <ErrorState title="Booking not found" description={message} onRetry={() => refetch()} />
      </div>
    );
  }

  const { label, color } = getBookingStatusPresentation(booking.status);
  const badgeVariant = BADGE_VARIANT_MAP[color] ?? "secondary";
  const paymentStatus = booking.payment
    ? getPaymentStatusPresentation(booking.payment.status)
    : null;

  const handlePay = async () => {
    await createPayment({ bookingId: booking.id, provider: "STRIPE" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-3">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href={ROUTES.dashboard.customer.bookings}>
            <ArrowLeft className="h-4 w-4" /> Back to bookings
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">
                {booking.service?.name ?? "Booking details"}
              </h1>
              <Badge variant={badgeVariant}>{label}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Booking ID · <span className="font-mono text-xs">{booking.id}</span>
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Booking information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Scheduled</p>
                <p className="text-sm font-medium text-foreground">
                  {formatScheduledTime(booking.scheduledTime)}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Technician</p>
                <p className="text-sm font-medium text-foreground">
                  {booking.technician?.email ?? "Unknown"}
                </p>
                {booking.technician?.technicianProfile?.location && (
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {booking.technician.technicianProfile.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs text-muted-foreground">Service</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">
              {booking.service?.name ?? "Service"}
            </p>
            {booking.service?.description && (
              <p className="mt-1 text-sm text-muted-foreground">{booking.service.description}</p>
            )}
            {booking.service?.price !== undefined && (
              <p className="mt-2 text-lg font-bold text-brand">
                {formatCurrency(booking.service.price)}
              </p>
            )}
          </div>

          <Separator />

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="font-medium text-foreground">{formatDateTime(booking.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last updated</p>
              <p className="font-medium text-foreground">{formatDateTime(booking.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4" /> Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          {booking.payment ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={BADGE_VARIANT_MAP[paymentStatus?.color ?? "default"]}>
                  {paymentStatus?.label ?? booking.payment.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{booking.payment.provider}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(booking.payment.amount)}
              </p>
              {booking.payment.paidAt && (
                <p className="text-xs text-muted-foreground">
                  Paid {formatDateTime(booking.payment.paidAt)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No payment recorded yet.</p>
          )}
        </CardContent>
      </Card>

      {(booking.review || canCustomerReview(booking)) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-4 w-4" /> Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            {booking.review ? (
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {"★".repeat(booking.review.rating)}
                  <span className="ml-2 text-muted-foreground">
                    {booking.review.rating}/5
                  </span>
                </p>
                {booking.review.comment && (
                  <p className="text-sm text-muted-foreground">{booking.review.comment}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                This job is completed. You can leave a review for the technician.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        {canCustomerPay(booking) && (
          <Button loading={paying} onClick={handlePay}>
            Pay Now
          </Button>
        )}
        {canCustomerReview(booking) && !booking.review && (
          <>
            <Button variant="outline" onClick={() => setReviewOpen(true)}>
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
        {canCustomerCancel(booking) && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-danger/30 text-danger hover:bg-danger/10">
                Cancel booking
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel booking?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will cancel your booking for {booking.service?.name}. This action cannot be
                  undone.
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
  );
}
