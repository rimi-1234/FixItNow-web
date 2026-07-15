"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { paymentKeys, bookingKeys } from "@/lib/query/query-keys";
import { paymentsService, type CreatePaymentInput } from "@/services/api/payments.service";
import { toast } from "sonner";
import type { Payment } from "@/domain/models";

export function usePayments() {
  return useQuery<Payment[]>({
    queryKey: paymentKeys.list(),
    queryFn: ({ signal }) => paymentsService.list(signal),
    staleTime: 30_000,
  });
}

export function usePaymentDetail(id: string) {
  return useQuery<Payment>({
    queryKey: paymentKeys.detail(id),
    queryFn: ({ signal }) => paymentsService.getById(id, signal),
    enabled: !!id,
    staleTime: 15_000,
  });
}

export function useCreatePaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreatePaymentInput) => paymentsService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
