"use client";

import { CreditCard } from "lucide-react";
import { usePayments } from "@/features/payments/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPaymentStatusPresentation, formatDate, formatCurrency } from "@/domain/formatters";
import type { Payment } from "@/domain/models";

const BADGE_MAP = {
  default: "secondary" as const,
  success: "success" as const,
  warning: "warning" as const,
  danger: "danger" as const,
};

function PaymentRow({ payment }: { payment: Payment }) {
  const { label, color } = getPaymentStatusPresentation(payment.status);
  const badgeVariant = BADGE_MAP[color] ?? "secondary";

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-[var(--radius-md)] bg-brand-subtle flex items-center justify-center shrink-0">
              <CreditCard className="h-4 w-4 text-brand" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {payment.provider} Payment
              </p>
              <p className="text-xs text-muted-foreground">
                {payment.paidAt ? formatDate(payment.paidAt) : formatDate(payment.createdAt)}
                {payment.transactionId && ` · #${payment.transactionId.slice(-8)}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-bold text-foreground">{formatCurrency(payment.amount)}</span>
            <Badge variant={badgeVariant}>{label}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CustomerPaymentsList() {
  const { data: payments, isLoading, isError, refetch } = usePayments();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Payment History</h1>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isLoading && !isError && payments?.length === 0 && (
        <EmptyState icon={CreditCard} title="No payments yet" description="Your payment history will appear here" />
      )}

      {!isLoading && !isError && payments && payments.length > 0 && (
        <ul className="space-y-3" role="list" aria-label="Payments">
          {payments.map((p) => <li key={p.id}><PaymentRow payment={p} /></li>)}
        </ul>
      )}
    </div>
  );
}
