import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ROUTES } from "@/config/routes";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  Product: [
    { href: ROUTES.services, label: "Services" },
    { href: ROUTES.technicians, label: "Technicians" },
    { href: ROUTES.howItWorks, label: "How It Works" },
  ],
  Company: [
    { href: ROUTES.about, label: "About" },
    { href: ROUTES.contact, label: "Contact" },
  ],
  Legal: [
    { href: ROUTES.privacy, label: "Privacy Policy" },
    { href: ROUTES.terms, label: "Terms of Service" },
  ],
  Account: [
    { href: ROUTES.login, label: "Log in" },
    { href: ROUTES.register, label: "Register" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Reliable home services at your fingertips. Book skilled technicians with confidence.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
              <ul className="space-y-2" role="list">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Your trusted home service platform
          </p>
        </div>
      </div>
    </footer>
  );
}
