"use client";

import { Star } from "lucide-react";
import { useCustomerBookings } from "@/features/bookings/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground text-sm">{booking.service?.name ?? "Service"}</p>
            <p className="text-xs text-muted-foreground mb-2">by {booking.technician?.email ?? "Unknown"}</p>
            <StarRating rating={review.rating} />
            {review.comment && (
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <Badge variant="success">★ {review.rating}</Badge>
            <p className="text-xs text-muted-foreground mt-1">{formatDate(review.createdAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CustomerReviewsPage() {
  const { data: bookings, isLoading } = useCustomerBookings();

  const reviewed = (bookings ?? []).filter((b) => !!b.review);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {!isLoading && reviewed.length === 0 && (
        <EmptyState
          icon={Star}
          title="No reviews yet"
          description="After a booking is completed, you can leave a review for your technician"
        />
      )}

      {!isLoading && reviewed.length > 0 && (
        <ul className="space-y-3" role="list">
          {reviewed.map((booking) => (
            <li key={booking.id}>
              <ReviewCard booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
