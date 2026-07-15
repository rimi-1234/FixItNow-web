import type { Metadata } from "next";
import { CustomerReviewsPage } from "@/features/reviews/components/customer-reviews-page";

export const metadata: Metadata = { title: "My Reviews" };

export default function CustomerReviewsPageRoute() {
  return <CustomerReviewsPage />;
}
