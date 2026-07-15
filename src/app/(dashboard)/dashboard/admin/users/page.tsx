import type { Metadata } from "next";
import { AdminUsersManager } from "@/features/admin-dashboard/components/admin-users-manager";

export const metadata: Metadata = { title: "Users Management" };

export default function AdminUsersPage() {
  return <AdminUsersManager />;
}
