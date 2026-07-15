import type { Metadata } from "next";
import { TechnicianOverview } from "@/features/technician-dashboard/components/technician-overview";

export const metadata: Metadata = { title: "Technician Dashboard" };

export default function TechnicianDashboardPage() {
  return <TechnicianOverview />;
}
