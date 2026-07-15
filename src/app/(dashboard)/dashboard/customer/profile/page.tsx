import type { Metadata } from "next";
import { CustomerProfile } from "@/features/customer-dashboard/components/customer-profile";

export const metadata: Metadata = { title: "My Profile" };

export default function CustomerProfilePage() {
  return <CustomerProfile />;
}
