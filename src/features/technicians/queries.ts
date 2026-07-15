"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { technicianKeys } from "@/lib/query/query-keys";
import { techniciansService, type TechnicianFilters, type UpdateProfileInput } from "@/services/api/technicians.service";
import { toast } from "sonner";
import type { User } from "@/domain/models";

export function useTechnicians(filters?: TechnicianFilters) {
  return useQuery<User[]>({
    queryKey: technicianKeys.list(filters),
    queryFn: ({ signal }) => techniciansService.list(filters, signal),
    staleTime: 2 * 60_000,
  });
}

export function useTechnicianDetail(id: string) {
  return useQuery<User>({
    queryKey: technicianKeys.detail(id),
    queryFn: ({ signal }) => techniciansService.getById(id, signal),
    staleTime: 2 * 60_000,
    enabled: !!id,
  });
}

export function useUpdateTechnicianProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProfileInput) => techniciansService.updateProfile(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: technicianKeys.all });
      toast.success("Profile updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateAvailabilityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (availability: string[]) => techniciansService.updateAvailability(availability),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: technicianKeys.all });
      toast.success("Availability updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
