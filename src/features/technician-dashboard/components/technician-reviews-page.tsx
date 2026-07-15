"use client";

import { Star } from "lucide-react";
import { useTechnicianBookings } from "@/features/bookings/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/domain/formatters";
import type { Booking } from "@/domain/models";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-warning text-warning" : "fill-muted text-muted-foreground"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewCard({ booking }: { booking: Booking }) {
  const review = booking.review;
  if (!review) return null;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm">{booking.service?.name ?? "Service"}</p>
            <p className="text-xs text-muted-foreground mb-2">from {booking.customer?.email ?? "Customer"}</p>
            <StarRating rating={review.rating} />
            {review.comment && <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>}
          </div>
          <p className="text-xs text-muted-foreground shrink-0">{formatDate(review.createdAt)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TechnicianReviewsPage() {
  const { data: bookings, isLoading } = useTechnicianBookings();
  const reviewed = (bookings ?? []).filter((b) => !!b.review);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Reviews Received</h1>
      {isLoading && <div className="space-y-3">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-[var(--radius-xl)]" />)}</div>}
      {!isLoading && reviewed.length === 0 && (
        <EmptyState icon={Star} title="No reviews yet" description="Reviews from completed bookings will appear here" />
      )}
      {!isLoading && reviewed.length > 0 && (
        <ul className="space-y-3" role="list">
          {reviewed.map((b) => <li key={b.id}><ReviewCard booking={b} /></li>)}
        </ul>
      )}
    </div>
  );
}
