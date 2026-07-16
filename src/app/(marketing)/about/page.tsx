import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CreditCard, HeartHandshake, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "About FixItNow",
  description: "Learn how FixItNow makes finding and managing reliable home services simpler.",
};

const values = [
  {
    icon: BadgeCheck,
    title: "Quality you can assess",
    description: "Clear profiles, skills, experience, and customer feedback help you make an informed choice.",
  },
  {
    icon: Layers3,
    title: "Clarity at every step",
    description: "Service details and booking status stay organized from the first request through completion.",
  },
  {
    icon: CreditCard,
    title: "Secure payment flow",
    description: "Supported payment options are handled through dedicated payment providers instead of informal transfers.",
  },
  {
    icon: HeartHandshake,
    title: "Built for both sides",
    description: "Customers get convenient access to help while skilled technicians get a professional place to offer it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A simpler way to care for the place you call home."
        description={`${siteConfig.name} brings service discovery, booking, payment, and job updates into one thoughtful experience.`}
      >
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href={ROUTES.services}>Explore services</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full bg-surface/80 px-6 backdrop-blur-sm">
          <Link href={ROUTES.register}>Create an account</Link>
        </Button>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8 lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
            Trust is a product decision.
          </h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            Home service is personal. The experience should make details easier to understand, actions easier to take, and progress easier to follow.
          </p>
          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-success/20 bg-success/10 p-4 text-sm text-foreground">
            <ShieldCheck className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
            Account roles and protected dashboard areas keep each workflow focused.
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2" role="list">
          {values.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="group rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
