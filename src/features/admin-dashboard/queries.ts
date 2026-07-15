"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminKeys } from "@/lib/query/query-keys";
import { adminService } from "@/services/api/admin.service";
import { toast } from "sonner";
import type { User } from "@/domain/models";
import type { UserStatus } from "@/domain/enums";

export function useAdminUsers() {
  return useQuery<User[]>({
    queryKey: adminKeys.users.list(),
    queryFn: ({ signal }) => adminService.listUsers(signal),
    staleTime: 30_000,
  });
}

export function useUpdateUserStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserStatus }) =>
      adminService.updateUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users.all });
      toast.success("User status updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
