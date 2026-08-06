import Image from "next/image";
import { cn } from "@/lib/cn";
import { BIZ } from "@/lib/business";

export function LogoMark({
  className,
  title = BIZ.name,
  priority = false,
}: { className?: string; title?: string; priority?: boolean }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <span
      className={cn(
        "relative block h-10 w-10 shrink-0 select-none overflow-hidden border-2 border-amber-500 bg-indigo-950 shadow-inset",
        className
      )}
    >
      <Image
        src={`${base}/icon.png`}
        alt={title}
        fill
        priority={priority}
        sizes="96px"
        className="object-cover"
      />
    </span>
  );
}

export function Logo({
  className,
  showWordmark = true,
  size = "md",
  variant = "light",
}: { className?: string; showWordmark?: boolean; size?: "sm" | "md" | "lg"; variant?: "light" | "dark" }) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  const dark = variant === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={dim} />
      {showWordmark && (
        <span className={cn("font-display font-bold tracking-tight leading-none flex flex-col", text)}>
          <span className={dark ? "text-stone-50" : "text-indigo-900"}>East Village Door</span>
          <span className={cn("mt-1 text-[9px] font-semibold tracking-[0.28em] uppercase", dark ? "text-amber-400" : "text-amber-600")}>
            Supply · Repair · NYC
          </span>
        </span>
      )}
    </span>
  );
}
