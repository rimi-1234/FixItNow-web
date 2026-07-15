import { format, formatDistanceToNow, parseISO } from "date-fns";
import type { PaymentStatus, UserStatus } from "@/domain/enums";

const DEFAULT_CURRENCY = process.env["NEXT_PUBLIC_DEFAULT_CURRENCY"] ?? "BDT";
const DEFAULT_TIMEZONE = process.env["NEXT_PUBLIC_DEFAULT_TIMEZONE"] ?? "Asia/Dhaka";

export function formatCurrency(
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  locale = "en-BD"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(isoString: string, fmt = "MMM d, yyyy"): string {
  try {
    return format(parseISO(isoString), fmt);
  } catch {
    return isoString;
  }
}

export function formatDateTime(isoString: string): string {
  try {
    return format(parseISO(isoString), "MMM d, yyyy 'at' h:mm a");
  } catch {
    return isoString;
  }
}

export function formatTimeAgo(isoString: string): string {
  try {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
  } catch {
    return isoString;
  }
}

export function formatScheduledTime(isoString: string): string {
  try {
    return format(parseISO(isoString), "EEEE, MMM d 'at' h:mm a");
  } catch {
    return isoString;
  }
}

export function getTimezone(): string {
  return DEFAULT_TIMEZONE;
}

export function getPaymentStatusPresentation(status: PaymentStatus | string): {
  label: string;
  color: "default" | "success" | "warning" | "danger";
} {
  const map: Record<string, { label: string; color: "default" | "success" | "warning" | "danger" }> = {
    PENDING: { label: "Pending", color: "warning" },
    COMPLETED: { label: "Completed", color: "success" },
    FAILED: { label: "Failed", color: "danger" },
  };
  return map[status] ?? { label: "Unknown", color: "default" };
}

export function getUserStatusPresentation(status: UserStatus | string): {
  label: string;
  color: "default" | "success" | "danger";
} {
  const map: Record<string, { label: string; color: "default" | "success" | "danger" }> = {
    ACTIVE: { label: "Active", color: "success" },
    BANNED: { label: "Banned", color: "danger" },
  };
  return map[status] ?? { label: "Unknown", color: "default" };
}
