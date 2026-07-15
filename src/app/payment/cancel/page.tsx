"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-warning/10 p-5">
            <XCircle className="h-14 w-14 text-warning" aria-hidden />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Cancelled</h1>
          <p className="mt-2 text-muted-foreground">
            You cancelled the payment. Your booking is still saved — you can pay later.
          </p>
          {bookingId && (
            <p className="mt-1 text-xs text-muted-foreground font-mono">Booking ID: {bookingId}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href={ROUTES.dashboard.customer.bookings}>Return to Bookings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={ROUTES.home}>Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense>
      <PaymentCancelContent />
    </Suspense>
  );
}
