import type { Metadata } from "next";
import { AdminOverview } from "@/features/admin-dashboard/components/admin-overview";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  return <AdminOverview />;
}
