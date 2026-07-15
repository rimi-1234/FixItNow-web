import type { Metadata } from "next";
import { TechnicianBookingsList } from "@/features/technician-dashboard/components/technician-bookings-list";

export const metadata: Metadata = { title: "Booking Inbox" };

export default function TechnicianBookingsPage() {
  return <TechnicianBookingsList />;
}
