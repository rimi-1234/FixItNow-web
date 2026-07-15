"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Home, MapPin, Navigation, Search, Sparkles } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 100, damping: 15 };

export function LandingHeroSection() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from.trim()) params.set("from", from.trim());
    if (to.trim()) params.set("to", to.trim());
    const qs = params.toString();
    router.push(qs ? `${ROUTES.technicians}?${qs}` : ROUTES.technicians);
  };

  return (
    <section
      className="relative overflow-hidden bg-slate-950 text-white"
      aria-labelledby="landing-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Premium home-service routing
          </motion.div>

          <motion.h1
            id="landing-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.12 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Find your perfect{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-white to-indigo-300 bg-clip-text text-transparent">
              home route
            </span>{" "}
            to skilled technicians
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Enter your current stop and home location. FixItNow plots a fast path to verified
            technicians — book, pay, and track with a premium transit-grade experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href={ROUTES.register}
              className={cn(
                "group inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950",
                "shadow-lg shadow-emerald-400/25 transition duration-300 ease-out hover:scale-[1.02] hover:bg-emerald-300 hover:shadow-emerald-300/40"
              )}
            >
              Book a Service
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={ROUTES.howItWorks}
              className="inline-flex items-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 ease-out hover:scale-[1.02] hover:border-white/30 hover:bg-white/10"
            >
              How it works
            </Link>
          </motion.div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.22 }}
          className={cn(
            "rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl sm:p-6",
            "ring-1 ring-white/5"
          )}
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/30 text-indigo-200">
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Route Finder</h2>
              <p className="text-xs text-slate-300">Current stop → Home location</p>
            </div>
          </div>

          <label className="mb-3 block space-y-1.5">
            <span className="text-xs font-medium text-slate-300">Current Location / Bus Stop</span>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Gulshan 2 Stop"
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/50 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/50"
              />
            </div>
          </label>

          <label className="mb-5 block space-y-1.5">
            <span className="text-xs font-medium text-slate-300">Home Location</span>
            <div className="relative">
              <Home className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Banani House 42"
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/50 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50"
              />
            </div>
          </label>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-400 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/30 transition duration-300 ease-out hover:shadow-emerald-400/30"
          >
            <Search className="h-4 w-4" />
            Find technicians on this route
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
