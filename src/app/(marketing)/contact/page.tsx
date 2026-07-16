import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, ReceiptText, UserRound } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the FixItNow team or find the right place for booking support.",
};

const channels = [
  { icon: Mail, label: "Email support", value: "support@fixitnow.com", href: "mailto:support@fixitnow.com" },
  { icon: Phone, label: "Phone support", value: "+880 1700 000000", href: "tel:+8801700000000" },
  { icon: MapPin, label: "Service base", value: "Dhaka, Bangladesh" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need help with."
        description="For account, booking, or platform questions, choose the channel that works for you. Booking-specific details are easiest to find inside your dashboard."
      >
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href={ROUTES.dashboard.root}>Open dashboard</Link>
        </Button>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-3">
          {channels.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
                <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
                {href ? <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" /> : null}
              </>
            );

            return href ? (
              <a key={label} href={href} className="group relative rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30">
                {content}
              </a>
            ) : (
              <div key={label} className="relative rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-card">
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-surface shadow-card lg:grid-cols-2">
          <div className="p-7 sm:p-9">
            <ReceiptText className="h-6 w-6 text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground">Question about a booking?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Your booking page keeps the service, schedule, payment state, and job status together so you can share the right details.</p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href={ROUTES.dashboard.customer.bookings}>View my bookings</Link>
            </Button>
          </div>
          <div className="border-t border-border bg-brand p-7 text-brand-foreground sm:p-9 lg:border-l lg:border-t-0">
            <UserRound className="h-6 w-6" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight">Need the right professional?</h2>
            <p className="mt-3 leading-7 text-brand-foreground/80">Start with the services catalog, then compare active professionals based on the details that matter for your home.</p>
            <Button asChild variant="secondary" className="mt-6 rounded-full bg-white text-[#1d2c68] hover:bg-white/90">
              <Link href={ROUTES.services}>Browse services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
