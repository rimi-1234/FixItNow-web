"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: ROUTES.services, label: "Services" },
  { href: ROUTES.technicians, label: "Technicians" },
  { href: ROUTES.howItWorks, label: "How it works" },
  { href: ROUTES.about, label: "About" },
];

export function MarketingHeader() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[600] rounded-[var(--radius-md)] bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-[200] w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-border/80 bg-background/92 shadow-[0_14px_40px_-28px_var(--foreground)] backdrop-blur-xl"
            : "border-transparent bg-background/78 backdrop-blur-lg"
        )}
      >
        <nav
          className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Logo size="md" />

          <ul
            className="hidden items-center gap-1 rounded-[var(--radius-lg)] border border-border/70 bg-surface/70 p-1 shadow-sm md:flex"
            role="list"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-[var(--radius-md)] px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      active
                        ? "bg-brand-subtle text-brand"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.login}>Log in</Link>
            </Button>
            <Button size="sm" asChild className="group rounded-[var(--radius-md)] shadow-sm">
              <Link href={ROUTES.services}>
                Book a service
                <ArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              id="mobile-nav"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-border bg-background/96 px-4 pb-5 pt-3 shadow-xl backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col">
                {NAV_LINKS.map(({ href, label }) => {
                  const active = pathname === href || pathname.startsWith(`${href}/`);

                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-[var(--radius-md)] px-3 py-3 text-sm font-semibold transition-colors",
                        active
                          ? "bg-brand-subtle text-brand"
                          : "text-foreground hover:bg-muted"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  );
                })}

                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-4">
                  <Button variant="outline" asChild>
                    <Link href={ROUTES.login} onClick={() => setMobileOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={ROUTES.services} onClick={() => setMobileOpen(false)}>
                      Book a service
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
