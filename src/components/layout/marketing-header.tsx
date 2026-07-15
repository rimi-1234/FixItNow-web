"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: ROUTES.services, label: "Services" },
  { href: ROUTES.technicians, label: "Technicians" },
  { href: ROUTES.howItWorks, label: "How It Works" },
  { href: ROUTES.about, label: "About" },
];

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[600] bg-brand text-brand-foreground px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-[200] w-full transition-all duration-200",
          scrolled
            ? "bg-surface/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-[var(--radius-sm)] transition-colors hover:bg-muted"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.login}>Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={ROUTES.register}>Book a Service</Link>
            </Button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t border-border bg-surface/98 backdrop-blur-md px-4 py-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-[var(--radius-md)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              <Button variant="outline" asChild>
                <Link href={ROUTES.login} onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.register} onClick={() => setMobileOpen(false)}>
                  Book a Service
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
