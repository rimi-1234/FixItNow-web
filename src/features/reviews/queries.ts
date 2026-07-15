"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingKeys } from "@/lib/query/query-keys";
import { reviewsService, type CreateReviewInput } from "@/services/api/reviews.service";
import { toast } from "sonner";

export function useCreateReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateReviewInput) => reviewsService.create(input),
    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(review.bookingId) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      toast.success("Review submitted!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
