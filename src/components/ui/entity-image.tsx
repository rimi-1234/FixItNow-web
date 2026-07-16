import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ASPECT_CLASSES = {
  service: "aspect-[16/10]",
  category: "aspect-[4/3]",
  technician: "aspect-[16/11]",
  square: "aspect-square",
} as const;

const DEFAULT_SIZES = {
  service: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  category: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  technician: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  square: "160px",
} as const;

interface EntityImageProps {
  src: string;
  alt: string;
  aspect?: keyof typeof ASPECT_CLASSES;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}

export function EntityImage({
  src,
  alt,
  aspect = "service",
  sizes,
  priority = false,
  overlay = true,
  className,
  imageClassName,
  children,
}: EntityImageProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-muted",
        ASPECT_CLASSES[aspect],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? DEFAULT_SIZES[aspect]}
        unoptimized={src.toLowerCase().endsWith(".svg")}
        draggable={false}
        className={cn(
          "object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.045] group-hover:saturate-[1.08]",
          imageClassName
        )}
      />
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/68 via-slate-950/5 to-transparent"
          aria-hidden="true"
        />
      )}
      <div
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/12 opacity-0 blur-md transition-all duration-700 ease-out group-hover:left-[115%] group-hover:opacity-100"
        aria-hidden="true"
      />
      {children && <div className="absolute inset-0 z-10">{children}</div>}
    </div>
  );
}
