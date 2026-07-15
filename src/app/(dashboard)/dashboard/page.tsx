"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/queries";
import { ROLE_HOME } from "@/config/routes";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.role) {
      const role = user.role as keyof typeof ROLE_HOME;
      router.replace(ROLE_HOME[role]);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return null;
}
