"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { apiPaths } from "@/config/api-paths";
import { bookingKeys, paymentKeys } from "@/lib/query/query-keys";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");
  const [verifying, setVerifying] = useState(!!sessionId);
  const [synced, setSynced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let cancelled = false;

    async function verifySession() {
      try {
        const res = await fetch(`/api/bff${apiPaths.payments.syncSession}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const json = (await res.json()) as {
          success?: boolean;
          message?: string;
          data?: { synced?: boolean };
        };

        if (!res.ok || !json.success) {
          if (!cancelled) {
            setError(json.message ?? "Could not verify payment with Stripe");
          }
          return;
        }

        if (!cancelled) {
          setSynced(Boolean(json.data?.synced));
          if (!json.data?.synced) {
            setError(json.message ?? "Payment is not marked paid yet");
          }
        }

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: bookingKeys.all }),
          queryClient.invalidateQueries({ queryKey: paymentKeys.all }),
        ]);
      } catch {
        if (!cancelled) {
          setError("Could not verify payment. If money was taken, refresh bookings in a moment.");
        }
      } finally {
        if (!cancelled) setVerifying(false);
      }
    }

    verifySession();
    return () => {
      cancelled = true;
    };
  }, [sessionId, queryClient]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {verifying ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-12 w-12 text-brand animate-spin" />
            <p className="text-foreground font-medium">Verifying your payment…</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <div className={`rounded-full p-5 ${synced ? "bg-success/10" : "bg-warning/10"}`}>
                {synced ? (
                  <CheckCircle2 className="h-14 w-14 text-success" aria-hidden />
                ) : (
                  <AlertTriangle className="h-14 w-14 text-warning" aria-hidden />
                )}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {synced ? "Payment Successful!" : "Payment received"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {synced
                  ? "Your payment has been confirmed and your booking is now marked as Paid."
                  : error ??
                    "Your payment was received. Confirmation may take a moment — check bookings shortly."}
              </p>
              {bookingId && (
                <p className="mt-1 text-xs text-muted-foreground font-mono">
                  Booking ID: {bookingId}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link
                  href={
                    bookingId
                      ? ROUTES.dashboard.customer.booking(bookingId)
                      : ROUTES.dashboard.customer.bookings
                  }
                >
                  View Booking <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={ROUTES.dashboard.customer.payments}>Payment history</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
