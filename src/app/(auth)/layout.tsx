import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/80 backdrop-blur-sm">
        <Logo size="sm" />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      <footer className="py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FixItNow.{" "}
        <Link href="/privacy" className="hover:text-foreground underline">Privacy</Link>
        {" · "}
        <Link href="/terms" className="hover:text-foreground underline">Terms</Link>
      </footer>
    </div>
  );
}
