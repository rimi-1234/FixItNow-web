import { browserApi } from "@/services/http/browser-client";
import { apiPaths } from "@/config/api-paths";
import type { Review } from "@/domain/models";

export interface CreateReviewInput {
  bookingId: string;
  technicianId: string;
  rating: number;
  comment?: string;
}

export const reviewsService = {
  async create(input: CreateReviewInput): Promise<Review> {
    return browserApi.post<undefined>(apiPaths.reviews.create, {
      body: input,
    }) as Promise<Review>;
  },
};
