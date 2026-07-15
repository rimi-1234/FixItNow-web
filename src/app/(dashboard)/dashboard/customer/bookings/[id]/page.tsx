import type { Metadata } from "next";
import { CustomerBookingDetail } from "@/features/bookings/components/customer-booking-detail";

export const metadata: Metadata = { title: "Booking Details" };

export default function CustomerBookingDetailPage() {
  return <CustomerBookingDetail />;
}
