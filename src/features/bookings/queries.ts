"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingKeys } from "@/lib/query/query-keys";
import { bookingsService, type CreateBookingInput } from "@/services/api/bookings.service";
import { toast } from "sonner";
import type { Booking } from "@/domain/models";
import type { BookingStatus } from "@/domain/enums";

export function useCustomerBookings() {
  return useQuery<Booking[]>({
    queryKey: bookingKeys.list(),
    queryFn: ({ signal }) => bookingsService.list(signal),
    staleTime: 30_000,
  });
}

export function useBookingDetail(id: string) {
  return useQuery<Booking>({
    queryKey: bookingKeys.detail(id),
    queryFn: ({ signal }) => bookingsService.getById(id, signal),
    staleTime: 15_000,
    enabled: !!id,
  });
}

export function useTechnicianBookings() {
  return useQuery<Booking[]>({
    queryKey: bookingKeys.technicianList(),
    queryFn: ({ signal }) => bookingsService.listTechnicianBookings(signal),
    staleTime: 20_000,
  });
}

export function useAdminBookings() {
  return useQuery<Booking[]>({
    queryKey: bookingKeys.adminList(),
    queryFn: ({ signal }) => bookingsService.adminList(signal),
    staleTime: 30_000,
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateBookingInput) => bookingsService.create(input),
    onSuccess: (booking) => {
      queryClient.setQueryData(bookingKeys.detail(booking.id), booking);
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      toast.success("Booking created!");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookingsService.cancel(id),
    onSuccess: (booking) => {
      queryClient.setQueryData(bookingKeys.detail(booking.id), booking);
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      toast.success("Booking cancelled");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateTechnicianBookingStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      bookingsService.updateTechnicianBookingStatus(id, status),
    onSuccess: (booking) => {
      queryClient.setQueryData(bookingKeys.detail(booking.id), booking);
      queryClient.invalidateQueries({ queryKey: bookingKeys.technicianList() });
      toast.success("Booking status updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
