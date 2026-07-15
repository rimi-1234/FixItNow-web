"use client";

import { motion } from "motion/react";
import { MapPinned, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: MapPinned,
    title: "Live Tracking",
    description: "Follow your technician in real time from stop to door — no guesswork.",
    accent: "from-indigo-500/20 to-indigo-500/5 text-indigo-300",
  },
  {
    icon: Zap,
    title: "Fast Routes",
    description: "Smart matching finds the shortest path to a verified pro near your home.",
    accent: "from-emerald-500/20 to-emerald-500/5 text-emerald-300",
  },
  {
    icon: ShieldCheck,
    title: "Safe Travel",
    description: "Secure booking, payments, and status updates for every home visit.",
    accent: "from-sky-500/20 to-sky-500/5 text-sky-300",
  },
];

export function LandingFeaturesSection() {
  return (
    <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="landing-features-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2
            id="landing-features-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Built for calm, modern home service
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Soft glass surfaces, clear status, and motion that guides — not distracts.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={cn(
                  "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl",
                  "transition duration-300 ease-out hover:border-white/20 hover:shadow-emerald-500/10"
                )}
              >
                <div
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br",
                    feature.accent
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
