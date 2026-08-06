"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber-500 text-indigo-950 hover:bg-amber-400 shadow-lift border-2 border-amber-600 font-bold uppercase tracking-wide",
  secondary:
    "bg-indigo-700 text-stone-50 hover:bg-indigo-600 border-2 border-indigo-800 shadow-card",
  ghost:
    "bg-transparent text-indigo-800 hover:bg-stone-200 border-2 border-transparent hover:border-stone-300",
  danger:
    "bg-danger text-white hover:bg-red-700 shadow-card border-2 border-red-800",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: false;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold tracking-tight",
        "transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold tracking-tight",
        "transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
