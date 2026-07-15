import type { Metadata } from "next";
import { TechnicianAvailabilityManager } from "@/features/technician-dashboard/components/technician-availability-manager";

export const metadata: Metadata = { title: "Availability" };

export default function TechnicianAvailabilityPage() {
  return <TechnicianAvailabilityManager />;
}
