import type { Metadata } from "next";
import { TechnicianServicesManager } from "@/features/technician-dashboard/components/technician-services-manager";

export const metadata: Metadata = { title: "My Services" };

export default function TechnicianServicesPage() {
  return <TechnicianServicesManager />;
}
