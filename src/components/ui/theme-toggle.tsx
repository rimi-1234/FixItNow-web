"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const iconTransition = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
};

const subscribeToHydration = () => () => undefined;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);

  const isDark = resolvedTheme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full border border-border/70 bg-surface/70"
        aria-label="Toggle color theme"
        disabled
      >
        <span className="h-4 w-4 rounded-full bg-muted" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative overflow-hidden rounded-full border border-border/70 bg-surface/70 text-foreground shadow-sm backdrop-blur-md hover:border-brand/30 hover:bg-muted"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, rotate: isDark ? -55 : 55, scale: 0.65 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 55 : -55, scale: 0.65 }}
          transition={iconTransition}
          aria-hidden="true"
        >
          {isDark ? <Sun className="text-warning" /> : <Moon className="text-brand" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
