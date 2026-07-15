import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About FixItNow",
  description: "Learn about FixItNow, your trusted home service platform.",
};

const VALUES = [
  { title: "Verified Professionals", description: "Every technician on our platform is thoroughly vetted and verified." },
  { title: "Transparent Pricing", description: "No hidden fees. See exact pricing before you book." },
  { title: "Secure Payments", description: "Pay securely via Stripe or SSLCommerz. Your money is protected." },
  { title: "Real-time Updates", description: "Track the status of your booking from request to completion." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4">About {siteConfig.name}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-12">
        FixItNow is your trusted platform for finding and booking skilled home service technicians. 
        We connect homeowners with verified professionals for plumbing, electrical, cleaning, painting, and more.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-6">Our Values</h2>
      <ul className="grid sm:grid-cols-2 gap-5 mb-12" role="list">
        {VALUES.map(({ title, description }) => (
          <li key={title} className="flex gap-3 p-4 rounded-[var(--radius-xl)] border border-border bg-card">
            <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold text-foreground text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted-foreground">
        FixItNow is committed to making home services accessible, reliable, and trustworthy for everyone.
      </p>
    </div>
  );
}
