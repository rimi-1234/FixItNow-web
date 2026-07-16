import type { Metadata } from "next";
import { ScrollText } from "lucide-react";

export const metadata: Metadata = { title: "Terms of Service" };

const sections = [
  { id: "service", label: "Use of service" },
  { id: "payments", label: "Payments" },
  { id: "cancellations", label: "Cancellations" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
            <ScrollText className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-foreground sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">The essential terms for using FixItNow to discover, request, manage, and pay for home services.</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">On this page</p>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col" aria-label="Terms sections">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-card sm:p-9 lg:p-12">
          <p className="text-sm font-semibold text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          <p className="mt-6 text-base leading-8 text-muted-foreground">By using FixItNow, you agree to these terms of service. Please read them carefully before creating a booking or offering a service.</p>

          <section id="service" className="scroll-mt-28 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Use of service</h2>
            <p className="mt-4 leading-8 text-muted-foreground">FixItNow provides a marketplace for connecting customers with home service technicians. Technicians are responsible for the services they offer and the work they complete.</p>
          </section>

          <section id="payments" className="scroll-mt-28 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Payments</h2>
            <p className="mt-4 leading-8 text-muted-foreground">Payments are processed through supported payment providers. FixItNow does not store payment card information directly.</p>
          </section>

          <section id="cancellations" className="scroll-mt-28 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Cancellations</h2>
            <p className="mt-4 leading-8 text-muted-foreground">Customers may cancel eligible bookings before work reaches the in-progress stage. Any refund is handled according to the booking and payment state.</p>
          </section>

          <section id="contact" className="scroll-mt-28 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Contact</h2>
            <p className="mt-4 leading-8 text-muted-foreground">For legal inquiries, email <a href="mailto:legal@fixitnow.com" className="font-semibold text-brand underline-offset-4 hover:underline">legal@fixitnow.com</a>.</p>
          </section>
        </article>
      </div>
    </>
  );
}
