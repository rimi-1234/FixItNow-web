import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-brand-foreground shadow-sm hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-md active:translate-y-0 active:scale-[0.98]",
        destructive:
          "bg-danger text-danger-foreground hover:bg-danger/90 active:scale-[0.98]",
        outline:
          "border border-border bg-transparent hover:-translate-y-0.5 hover:border-brand/30 hover:bg-muted hover:text-foreground hover:shadow-sm active:translate-y-0 active:scale-[0.98]",
        secondary:
          "bg-muted text-foreground hover:-translate-y-0.5 hover:bg-muted/80 hover:shadow-sm active:translate-y-0 active:scale-[0.98]",
        ghost:
          "hover:bg-muted hover:text-foreground active:scale-[0.98]",
        link: "text-brand underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-[var(--radius-md)]",
        sm: "h-8 rounded-[var(--radius-sm)] px-3 text-xs",
        lg: "h-11 rounded-[var(--radius-md)] px-6 text-base",
        xl: "h-12 rounded-[var(--radius-lg)] px-8 text-base",
        icon: "h-10 w-10 rounded-[var(--radius-md)]",
        "icon-sm": "h-8 w-8 rounded-[var(--radius-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, disabled, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
