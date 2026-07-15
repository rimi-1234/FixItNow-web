import type { UserRole, UserStatus, BookingStatus, PaymentStatus, PaymentProvider } from "@/domain/enums";

export interface TechnicianProfile {
  id: string;
  userId: string;
  skills: string[];
  availability: string[];
  experience: number;
  hourlyRate: number;
  bio: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  technicianProfile?: TechnicianProfile | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  technician?: Pick<User, "id" | "email">;
}

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledTime: string;
  createdAt: string;
  updatedAt: string;
  technician?: { id: string; email: string; technicianProfile: TechnicianProfile | null };
  customer?: Pick<User, "id" | "email">;
  service?: Service;
  payment?: Payment | null;
  review?: Review | null;
}

export interface Payment {
  id: string;
  bookingId: string;
  transactionId: string | null;
  amount: number;
  method: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}
