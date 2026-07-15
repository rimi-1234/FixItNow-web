"use client";

import { Suspense } from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

function PaymentFailedContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-danger/10 p-5">
            <AlertTriangle className="h-14 w-14 text-danger" aria-hidden />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Failed</h1>
          <p className="mt-2 text-muted-foreground">
            Something went wrong with your payment. Please try again or use a different payment method.
          </p>
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

export default function PaymentFailedPage() {
  return (
    <Suspense>
      <PaymentFailedContent />
    </Suspense>
  );
}
