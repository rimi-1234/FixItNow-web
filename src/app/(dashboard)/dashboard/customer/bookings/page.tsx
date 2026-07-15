import type { Metadata } from "next";
import { CustomerBookingsList } from "@/features/bookings/components/customer-bookings-list";

export const metadata: Metadata = { title: "My Bookings" };

export default function CustomerBookingsPage() {
  return <CustomerBookingsList />;
}
