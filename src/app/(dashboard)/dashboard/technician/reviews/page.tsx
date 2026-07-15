import type { Metadata } from "next";
import { TechnicianReviewsPage } from "@/features/technician-dashboard/components/technician-reviews-page";

export const metadata: Metadata = { title: "My Reviews" };

export default function TechnicianReviewsRoute() {
  return <TechnicianReviewsPage />;
}
