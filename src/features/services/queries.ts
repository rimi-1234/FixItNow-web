"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceKeys } from "@/lib/query/query-keys";
import { servicesService, type ServiceFilters, type CreateServiceInput } from "@/services/api/services.service";
import { toast } from "sonner";
import type { Service } from "@/domain/models";

export function useServices(filters?: ServiceFilters) {
  return useQuery<Service[]>({
    queryKey: serviceKeys.list(filters),
    queryFn: ({ signal }) => servicesService.list(filters, signal),
    staleTime: 2 * 60_000,
  });
}

export function useCreateServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateServiceInput) => servicesService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success("Service created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateServiceInput> }) =>
      servicesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success("Service updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => servicesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success("Service deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
