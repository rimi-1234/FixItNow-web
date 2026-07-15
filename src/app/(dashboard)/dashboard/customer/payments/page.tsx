import type { Metadata } from "next";
import { CustomerPaymentsList } from "@/features/payments/components/customer-payments-list";

export const metadata: Metadata = { title: "Payments" };

export default function CustomerPaymentsPage() {
  return <CustomerPaymentsList />;
}
