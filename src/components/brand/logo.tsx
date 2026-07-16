"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mark";
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { mark: 24, fullH: 24, fullW: 110 },
  md: { mark: 32, fullH: 32, fullW: 140 },
  lg: { mark: 40, fullH: 40, fullW: 180 },
};

const subscribeToHydration = () => () => undefined;

export function Logo({
  variant = "full",
  href = "/",
  className,
  size = "md",
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";
  const dim = SIZES[size];

  const content =
    variant === "mark" ? (
      <Image
        src="/brand/fixitnow-mark.svg"
        alt="FixItNow"
        width={dim.mark}
        height={dim.mark}
        priority
      />
    ) : (
      <Image
        src={isDark ? "/brand/fixitnow-logo-dark.svg" : "/brand/fixitnow-logo.svg"}
        alt="FixItNow"
        width={dim.fullW}
        height={dim.fullH}
        priority
      />
    );

  if (!href) {
    return (
      <span className={cn("inline-flex items-center", className)} role="img" aria-label="FixItNow">
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      <span className="sr-only">FixItNow — Home</span>
      <span aria-hidden="true">{content}</span>
    </Link>
  );
}
