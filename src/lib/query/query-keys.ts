import type { TechnicianFilters } from "@/services/api/technicians.service";
import type { ServiceFilters } from "@/services/api/services.service";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all, "list"] as const,
  adminList: () => [...categoryKeys.all, "admin-list"] as const,
};

export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: (filters?: ServiceFilters) => [...serviceKeys.lists(), filters ?? {}] as const,
};

export const technicianKeys = {
  all: ["technicians"] as const,
  lists: () => [...technicianKeys.all, "list"] as const,
  list: (filters?: TechnicianFilters) => [...technicianKeys.lists(), filters ?? {}] as const,
  details: () => [...technicianKeys.all, "detail"] as const,
  detail: (id: string) => [...technicianKeys.details(), id] as const,
  bookings: () => [...technicianKeys.all, "bookings"] as const,
};

export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: () => [...bookingKeys.lists()] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
  technicianList: () => [...bookingKeys.all, "technician-list"] as const,
  adminList: () => [...bookingKeys.all, "admin-list"] as const,
};

export const paymentKeys = {
  all: ["payments"] as const,
  list: () => [...paymentKeys.all, "list"] as const,
  detail: (id: string) => [...paymentKeys.all, "detail", id] as const,
};

export const adminKeys = {
  users: {
    all: ["admin-users"] as const,
    list: () => [...adminKeys.users.all, "list"] as const,
  },
};
