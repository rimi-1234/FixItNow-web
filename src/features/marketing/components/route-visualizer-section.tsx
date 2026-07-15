"use client";

import { motion } from "motion/react";
import { Bus, Home, MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";

export function RouteVisualizerSection() {
  return (
    <section
      className="relative bg-slate-900 py-16 sm:py-20"
      aria-labelledby="route-visualizer-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Live route canvas
          </p>
          <h2
            id="route-visualizer-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Watch your home route draw itself
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            From your nearest stop to your door — animated paths make every booking feel clear and
            premium.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          whileHover={{ scale: 1.02 }}
          className={cn(
            "mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:p-8",
            "transition duration-300 ease-out hover:shadow-indigo-500/20"
          )}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <MapPinned className="h-4 w-4 text-emerald-400" />
              Technician en route → Home
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              ETA 18 min
            </span>
          </div>

          <div className="relative flex items-center justify-between gap-4">
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/30 text-indigo-200 ring-1 ring-white/15">
                <Bus className="h-7 w-7" />
              </div>
              <span className="text-xs text-slate-300">Pickup stop</span>
            </div>

            <svg
              viewBox="0 0 420 80"
              className="absolute left-16 right-16 top-[1.7rem] hidden h-16 w-auto flex-1 sm:block"
              aria-hidden="true"
            >
              <motion.path
                d="M 10 40 C 90 10, 150 70, 210 40 S 330 10, 410 40"
                fill="none"
                stroke="rgba(52,211,153,0.35)"
                strokeWidth="3"
                strokeDasharray="8 10"
              />
              <motion.path
                d="M 10 40 C 90 10, 150 70, 210 40 S 330 10, 410 40"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0.6 }}
              />
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>

            {/* Mobile simplified path */}
            <div className="relative mx-2 h-1 flex-1 overflow-hidden rounded-full bg-white/10 sm:invisible sm:absolute">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400"
                animate={{ x: ["-20%", "120%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="z-10 flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/25 text-emerald-200 ring-1 ring-white/15">
                <Home className="h-7 w-7" />
              </div>
              <span className="text-xs text-slate-300">Your home</span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Distance", value: "4.2 km" },
              { label: "Matched tech", value: "Plumber nearby" },
              { label: "Confidence", value: "98% on-time" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
              >
                <p className="text-[11px] uppercase tracking-wide text-slate-400">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
