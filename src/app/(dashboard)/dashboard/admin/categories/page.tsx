import type { Metadata } from "next";
import { AdminCategoriesManager } from "@/features/admin-dashboard/components/admin-categories-manager";

export const metadata: Metadata = { title: "Category Management" };

export default function AdminCategoriesPage() {
  return <AdminCategoriesManager />;
}
