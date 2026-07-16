import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { HowItWorksSection } from "@/features/customer-dashboard/components/how-it-works-section";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how to discover a service, choose a technician, and manage your FixItNow booking.",
};

const expectations = [
  "Review service and professional details before requesting a booking.",
  "See booking status changes in your dashboard as the job progresses.",
  "Complete supported payments through the dedicated checkout flow.",
  "Share a review after a completed service to help the community.",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From something’s wrong to everything’s handled."
        description="FixItNow gives every home service request a clear path—from discovering help to closing out the job."
      >
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href={ROUTES.services}>Find a service</Link>
        </Button>
      </PageHero>

      <HowItWorksSection />

      <section className="border-t border-border bg-surface-raised py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">What to expect</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">A transparent workflow, not a guessing game.</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">Important job details remain attached to the booking, giving customers and technicians a shared view of what comes next.</p>
          </div>
          <ul className="space-y-3" role="list">
            {expectations.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                <span className="text-sm leading-6 text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
