import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the FixItNow team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-12">
        Have a question or need support? We're here to help.
      </p>

      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: Mail, label: "Email", value: "support@fixitnow.com", href: "mailto:support@fixitnow.com" },
          { icon: Phone, label: "Phone", value: "+880 1700 000000", href: "tel:+8801700000000" },
          { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", href: undefined },
        ].map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="rounded-[var(--radius-xl)] border border-border bg-card p-5 text-center">
            <div className="rounded-[var(--radius-lg)] bg-brand-subtle p-3 inline-flex mb-3">
              <Icon className="h-5 w-5 text-brand" aria-hidden />
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{label}</p>
            {href ? (
              <a href={href} className="text-sm font-medium text-foreground hover:text-brand transition-colors">{value}</a>
            ) : (
              <p className="text-sm font-medium text-foreground">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
