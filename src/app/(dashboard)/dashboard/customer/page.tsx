import type { Metadata } from "next";
import { CustomerOverview } from "@/features/customer-dashboard/components/customer-overview";

export const metadata: Metadata = { title: "Customer Dashboard" };

export default function CustomerDashboardPage() {
  return <CustomerOverview />;
}
