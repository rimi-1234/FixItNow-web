"use client";

import { User2, Mail, Shield } from "lucide-react";
import { useCurrentUser } from "@/features/auth/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/domain/formatters";

export function CustomerProfile() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-lg">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-48 w-full rounded-[var(--radius-xl)]" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-brand-subtle flex items-center justify-center text-brand text-2xl font-bold">
              {user.email[0]?.toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-lg">{user.email}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={user.status === "ACTIVE" ? "success" : "danger"}>
                  {user.status}
                </Badge>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
            <span className="text-foreground">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
            <span className="text-foreground capitalize">{user.role.toLowerCase()} account</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User2 className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
            <span className="text-muted-foreground">Member since {formatDate(user.createdAt)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">
            To update your email or password, please contact support. Profile editing features are coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
