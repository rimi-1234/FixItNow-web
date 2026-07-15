"use client";

import { Users, BookOpen, Tag } from "lucide-react";
import Link from "next/link";
import { useAdminUsers } from "@/features/admin-dashboard/queries";
import { useAdminBookings } from "@/features/bookings/queries";
import { useAdminCategories } from "@/features/categories/queries";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";

export function AdminOverview() {
  const { data: users } = useAdminUsers();
  const { data: bookings } = useAdminBookings();
  const { data: categories } = useAdminCategories();

  const stats = [
    { icon: Users, label: "Total Users", value: users?.length ?? 0, href: ROUTES.dashboard.admin.users },
    { icon: BookOpen, label: "Total Bookings", value: bookings?.length ?? 0, href: ROUTES.dashboard.admin.bookings },
    { icon: Tag, label: "Categories", value: categories?.length ?? 0, href: ROUTES.dashboard.admin.categories },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Platform overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:border-brand/40 hover:shadow-md transition-all duration-200 group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                  </div>
                  <div className="rounded-[var(--radius-lg)] bg-brand-subtle p-3 group-hover:bg-brand transition-colors">
                    <Icon className="h-5 w-5 text-brand group-hover:text-brand-foreground transition-colors" aria-hidden />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
