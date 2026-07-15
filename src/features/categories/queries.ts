"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "@/lib/query/query-keys";
import { categoriesService } from "@/services/api/categories.service";
import { toast } from "sonner";
import type { Category } from "@/domain/models";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: categoryKeys.list(),
    queryFn: ({ signal }) => categoriesService.list(signal),
    staleTime: 15 * 60_000,
  });
}

export function useAdminCategories() {
  return useQuery<Category[]>({
    queryKey: categoryKeys.adminList(),
    queryFn: ({ signal }) => categoriesService.adminList(signal),
    staleTime: 5 * 60_000,
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; slug: string }) => categoriesService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("Category created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{ name: string; slug: string }> }) =>
      categoriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("Category updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("Category deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
