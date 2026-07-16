import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, CalendarCheck2, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const trustPoints = [
  { icon: BadgeCheck, label: "Verified local professionals" },
  { icon: CalendarCheck2, label: "Book around your schedule" },
  { icon: ShieldCheck, label: "Secure, transparent service" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden overflow-hidden lg:block" aria-label="Why choose FixItNow">
        <Image
          src="/images/hero/home-services-hero.webp"
          alt="A professional completing a careful home repair"
          fill
          priority
          sizes="52vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10182f]/95 via-[#15214a]/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
          <div className="max-w-xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Home help, handled
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight xl:text-5xl">
              The right professional for every job at home.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustPoints.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <Icon className="h-5 w-5 text-[#78e0d3]" aria-hidden="true" />
                  <p className="mt-2 text-sm font-medium leading-snug text-white/90">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <Link
              href="/"
              className="hidden items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back home
            </Link>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8">
          <div className="w-full max-w-lg rounded-[var(--radius-2xl)] border border-border/80 bg-card p-6 shadow-card sm:p-9">
            {children}
          </div>
        </main>

        <footer className="px-6 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FixItNow. {" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy</Link>
          {" · "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">Terms</Link>
        </footer>
      </div>
    </div>
  );
}
