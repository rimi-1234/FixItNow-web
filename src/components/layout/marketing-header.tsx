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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 z-[600] rounded-[var(--radius-md)] bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-[200] w-full transition-all duration-300 ease-out",
          scrolled
            ? "border-b border-white/10 bg-slate-950/80 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "bg-slate-950/40 backdrop-blur-md"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Logo size="md" className="[&_img]:brightness-0 [&_img]:invert" />

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition duration-300 ease-out hover:bg-white/10 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-slate-200 hover:bg-white/10 hover:text-white"
            >
              <Link href={ROUTES.login}>Log in</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="rounded-xl bg-emerald-400 text-slate-950 hover:bg-emerald-300"
            >
              <Link href={ROUTES.register}>Book a Service</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {mobileOpen && (
          <div
            id="mobile-nav"
            className="flex flex-col gap-1 border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <Button variant="outline" asChild className="border-white/20 bg-transparent text-white">
                <Link href={ROUTES.login} onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button asChild className="bg-emerald-400 text-slate-950 hover:bg-emerald-300">
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
