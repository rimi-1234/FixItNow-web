import type { Metadata } from "next";
import { AdminBookingsList } from "@/features/admin-dashboard/components/admin-bookings-list";

export const metadata: Metadata = { title: "All Bookings" };

export default function AdminBookingsPage() {
  return <AdminBookingsList />;
}
