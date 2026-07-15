import type { Booking } from "@/domain/models";
import type { BookingStatus } from "@/domain/enums";

// Mirror the backend's CANCELLABLE_STATUSES exactly
const CUSTOMER_CANCELLABLE: BookingStatus[] = ["REQUESTED", "ACCEPTED", "PAID"];

export function canCustomerCancel(booking: Booking): boolean {
  return CUSTOMER_CANCELLABLE.includes(booking.status);
}

export function canCustomerPay(booking: Booking): boolean {
  if (booking.status !== "ACCEPTED") return false;
  if (!booking.payment) return true;
  // Allow retry while a checkout session is still pending.
  return booking.payment.status === "PENDING";
}

export function canCustomerReview(booking: Booking): boolean {
  return booking.status === "COMPLETED" && !booking.review;
}

export function canTechnicianAccept(booking: Booking): boolean {
  return booking.status === "REQUESTED";
}

export function canTechnicianDecline(booking: Booking): boolean {
  return booking.status === "REQUESTED";
}

export function canTechnicianStart(booking: Booking): boolean {
  return booking.status === "PAID";
}

export function canTechnicianComplete(booking: Booking): boolean {
  return booking.status === "IN_PROGRESS";
}

export function getAllowedTechnicianTransitions(booking: Booking): BookingStatus[] {
  switch (booking.status) {
    case "REQUESTED":
      return ["ACCEPTED", "DECLINED"];
    case "PAID":
      return ["IN_PROGRESS"];
    case "IN_PROGRESS":
      return ["COMPLETED"];
    default:
      return [];
  }
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
  PAID: "Paid",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const STATUS_COLORS: Record<BookingStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  REQUESTED: "warning",
  ACCEPTED: "info",
  DECLINED: "danger",
  PAID: "info",
  IN_PROGRESS: "warning",
  COMPLETED: "success",
  CANCELLED: "danger",
};

export function getBookingStatusPresentation(status: string): {
  label: string;
  color: "default" | "success" | "warning" | "danger" | "info";
} {
  const knownStatus = status as BookingStatus;
  return {
    label: STATUS_LABELS[knownStatus] ?? "Unknown",
    color: STATUS_COLORS[knownStatus] ?? "default",
  };
}
