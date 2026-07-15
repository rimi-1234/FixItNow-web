"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useCreateReviewMutation } from "@/features/reviews/queries";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z.number().int().min(1, "Select a rating").max(5),
  comment: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  technicianId: string;
}

export function ReviewDialog({ open, onOpenChange, bookingId, technicianId }: ReviewDialogProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const { mutateAsync, isPending } = useCreateReviewMutation();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0 },
  });

  const selectedRating = watch("rating");

  const onSubmit = async (values: ReviewFormValues) => {
    await mutateAsync({ bookingId, technicianId, rating: values.rating, comment: values.comment });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>Share your experience with this technician</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-2">
          {/* Star rating */}
          <div className="space-y-1.5">
            <Label>Rating <span className="text-danger">*</span></Label>
            <div className="flex gap-1" role="group" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  aria-pressed={selectedRating >= star}
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors",
                      (hoverRating || selectedRating) >= star
                        ? "fill-warning text-warning"
                        : "fill-muted text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-xs text-danger">{errors.rating.message}</p>}
          </div>

          {/* Comment */}
          <div className="space-y-1.5">
            <Label htmlFor="review-comment">Comment (optional)</Label>
            <Input
              id="review-comment"
              placeholder="Describe your experience…"
              {...register("comment")}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending} disabled={isPending || selectedRating === 0}>
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
