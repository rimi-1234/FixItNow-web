"use client";

import { Users } from "lucide-react";
import { useAdminUsers, useUpdateUserStatusMutation } from "@/features/admin-dashboard/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserStatusPresentation, formatDate } from "@/domain/formatters";
import type { User } from "@/domain/models";

const STATUS_BADGE_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  danger: "danger" as const,
};

function UserRow({ user }: { user: User }) {
  const { label, color } = getUserStatusPresentation(user.status);
  const badgeVariant = STATUS_BADGE_MAP[color] ?? "secondary";
  const { mutate, isPending } = useUpdateUserStatusMutation();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
              <Badge variant="secondary" className="text-xs">{user.role}</Badge>
              <Badge variant={badgeVariant} className="text-xs">{label}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Joined {formatDate(user.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {user.status === "ACTIVE" ? (
              <Button
                size="sm"
                variant="outline"
                className="text-danger border-danger/30 hover:bg-danger/10 text-xs"
                loading={isPending}
                onClick={() => mutate({ id: user.id, status: "BANNED" })}
                disabled={isPending}
              >
                Ban User
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="text-success border-success/30 hover:bg-success/10 text-xs"
                loading={isPending}
                onClick={() => mutate({ id: user.id, status: "ACTIVE" })}
                disabled={isPending}
              >
                Unban User
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminUsersManager() {
  const { data: users, isLoading, isError, refetch } = useAdminUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Users Management</h1>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-20 w-full rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && users?.length === 0 && (
        <EmptyState icon={Users} title="No users found" description="Users will appear here" />
      )}

      {!isLoading && !isError && users && users.length > 0 && (
        <ul className="space-y-3" role="list" aria-label={`${users.length} users`}>
          {users.map((u) => <li key={u.id}><UserRow user={u} /></li>)}
        </ul>
      )}
    </div>
  );
}
