import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck, Wrench } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/config/routes";

const FOOTER_LINKS = {
  Explore: [
    { href: ROUTES.services, label: "Browse services" },
    { href: ROUTES.technicians, label: "Find technicians" },
    { href: ROUTES.howItWorks, label: "How it works" },
  ],
  Company: [
    { href: ROUTES.about, label: "About FixItNow" },
    { href: ROUTES.contact, label: "Contact us" },
  ],
  Account: [
    { href: ROUTES.login, label: "Log in" },
    { href: ROUTES.register, label: "Create an account" },
    { href: `${ROUTES.register}?role=TECHNICIAN`, label: "Join as a technician" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)+0.25rem)] border border-brand/20 bg-brand px-6 py-8 text-brand-foreground shadow-lg sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full border-[32px] border-brand-foreground/5" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-foreground/75">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              A better way to handle home tasks
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Find the right help and keep every booking step clear.
            </h2>
          </div>
          <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-brand-foreground text-brand hover:bg-brand-foreground/90"
            >
              <Link href={ROUTES.services}>
                Browse services
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-brand-foreground/35 text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            >
              <Link href={`${ROUTES.register}?role=TECHNICIAN`}>Join as a technician</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-10 pb-2 pt-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] lg:gap-12">
          <div>
            <Logo size="md" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Browse home services, request a time, pay through the supported checkout flow,
              and follow each booking status in one place.
            </p>
            <a
              href="mailto:support@fixitnow.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
              support@fixitnow.com
            </a>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
              <ul className="space-y-3" role="list">
                {links.map(({ href, label }) => (
                  <li key={`${href}-${label}`}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FixItNow. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              Secure provider-based checkout
            </span>
            <Link href={ROUTES.privacy} className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href={ROUTES.terms} className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
