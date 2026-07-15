export const USER_ROLES = {
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  ADMIN: "ADMIN",
} as const;

export type UserRole = keyof typeof USER_ROLES;

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  BANNED: "BANNED",
} as const;

export type UserStatus = keyof typeof USER_STATUS;

export const BOOKING_STATUS = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  PAID: "PAID",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type BookingStatus = keyof typeof BOOKING_STATUS;

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type PaymentStatus = keyof typeof PAYMENT_STATUS;

export const PAYMENT_PROVIDER = {
  STRIPE: "STRIPE",
  SSLCOMMERZ: "SSLCOMMERZ",
} as const;

export type PaymentProvider = keyof typeof PAYMENT_PROVIDER;
