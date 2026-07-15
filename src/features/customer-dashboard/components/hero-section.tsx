import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { ArrowRight, Star, CheckCircle2, Zap } from "lucide-react";

const TRUST_BADGES = [
  { icon: CheckCircle2, label: "Verified Technicians" },
  { icon: Star, label: "4.8+ Average Rating" },
  { icon: Zap, label: "Same-Day Booking" },
];

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand/5 via-background to-accent/5 py-24 sm:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-subtle px-4 py-1.5 text-xs font-medium text-brand mb-6">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Trusted Home Services at Your Fingertips
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]"
          >
            Get Your Home{" "}
            <span className="text-brand">Fixed</span>{" "}
            by Experts,{" "}
            <span className="text-accent">Instantly</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Find, book, and pay skilled technicians for any home repair — plumbing,
            electrical, cleaning, painting, and more. Transparent pricing, verified
            professionals, real-time tracking.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="xl" asChild>
              <Link href={ROUTES.register}>
                Book a Service
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href={ROUTES.technicians}>Browse Technicians</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <ul
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            aria-label="Trust indicators"
            role="list"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Icon className="h-4 w-4 text-success" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
