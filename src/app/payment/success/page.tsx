"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");
  const [verifying, setVerifying] = useState(!!sessionId);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    async function verifySession() {
      try {
        const res = await fetch(`/api/bff/payments/confirm?session_id=${sessionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (res.ok) setSynced(true);
      } catch {
        // ignore — webhook will handle
      } finally {
        setVerifying(false);
      }
    }

    verifySession();
  }, [sessionId]);

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
              <div className="rounded-full bg-success/10 p-5">
                <CheckCircle2 className="h-14 w-14 text-success" aria-hidden />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Payment Successful!</h1>
              <p className="mt-2 text-muted-foreground">
                {synced
                  ? "Your payment has been confirmed and your booking is now active."
                  : "Your payment was received. Confirmation will arrive shortly."}
              </p>
              {bookingId && (
                <p className="mt-1 text-xs text-muted-foreground font-mono">
                  Booking ID: {bookingId}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href={ROUTES.dashboard.customer.bookings}>
                  View Bookings <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={ROUTES.home}>Go Home</Link>
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
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
