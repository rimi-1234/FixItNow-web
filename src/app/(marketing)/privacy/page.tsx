import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  { id: "information", label: "Information we collect" },
  { id: "usage", label: "How we use it" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-foreground sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">A plain-language overview of the information FixItNow uses to provide accounts, bookings, and payments.</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">On this page</p>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col" aria-label="Privacy policy sections">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-card sm:p-9 lg:p-12">
          <p className="text-sm font-semibold text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          <p className="mt-6 text-base leading-8 text-muted-foreground">FixItNow collects and uses personal information to connect customers with technicians. We take your privacy seriously and use this information to operate and improve the platform.</p>

          <section id="information" className="scroll-mt-28 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Information we collect</h2>
            <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2" role="list">
              {["Email address and account credentials", "Booking and payment history", "Service preferences and reviews", "Usage data and log files"].map((item) => (
                <li key={item} className="rounded-2xl border border-border bg-muted/35 p-4 leading-6">{item}</li>
              ))}
            </ul>
          </section>

          <section id="usage" className="scroll-mt-28 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">How we use it</h2>
            <p className="mt-4 leading-8 text-muted-foreground">We use your information to facilitate bookings, process supported payments, improve the service, protect platform access, and communicate with you about your account.</p>
          </section>

          <section id="contact" className="scroll-mt-28 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Contact</h2>
            <p className="mt-4 leading-8 text-muted-foreground">For privacy inquiries, email <a href="mailto:privacy@fixitnow.com" className="font-semibold text-brand underline-offset-4 hover:underline">privacy@fixitnow.com</a>.</p>
          </section>
        </article>
      </div>
    </>
  );
}
