"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authKeys, bookingKeys, paymentKeys, categoryKeys, serviceKeys, technicianKeys, adminKeys } from "@/lib/query/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES, ROLE_HOME } from "@/config/routes";
import type { User } from "@/domain/models";
import type { LoginInput, RegisterInput } from "@/services/api/auth.service";
import { ApiError } from "@/services/http/api-error";

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: authKeys.me(),
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/auth/session", { signal });
      const json = await res.json() as { success: boolean; data?: { user: User } };
      if (!json.success || !json.data?.user) throw new ApiError("Not authenticated", 401);
      return json.data.user;
    },
    staleTime: 5 * 60_000,
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json() as { success: boolean; message?: string; data?: { user: User } };
      if (!json.success) throw new ApiError(json.message ?? "Login failed", res.status);
      return json.data?.user;
    },
    onSuccess: (user) => {
      if (!user) return;
      queryClient.setQueryData(authKeys.me(), user);
      toast.success("Welcome back!");
      const role = user.role as keyof typeof ROLE_HOME;
      router.push(ROLE_HOME[role] ?? ROUTES.dashboard.root);
    },
    onError: (error) => {
      const msg = error instanceof ApiError ? error.message : "Login failed";
      toast.error(msg);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const res = await fetch("/api/bff/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json() as { success: boolean; message?: string; data?: { user?: User } };
      if (!res.ok || !json.success) throw new ApiError(json.message ?? "Registration failed", res.status);
      return json.data;
    },
    onSuccess: () => {
      toast.success("Account created! Please log in.");
      router.push(ROUTES.login);
    },
    onError: (error) => {
      const msg = error instanceof ApiError ? error.message : "Registration failed";
      toast.error(msg);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await fetch("/api/auth/logout", { method: "POST" });
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.removeQueries({ queryKey: bookingKeys.all });
      queryClient.removeQueries({ queryKey: paymentKeys.all });
      queryClient.removeQueries({ queryKey: categoryKeys.all });
      queryClient.removeQueries({ queryKey: serviceKeys.all });
      queryClient.removeQueries({ queryKey: technicianKeys.all });
      queryClient.removeQueries({ queryKey: adminKeys.users.all });
      router.push(ROUTES.login);
    },
  });
}
