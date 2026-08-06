import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "open" | "closed" | "brass";
}) {
  const tones = {
    default: "bg-cream-200 text-cream-800 border-cream-300",
    open:    "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    closed:  "bg-red-500/10 text-red-300 border-red-500/30",
    brass:   "bg-teal-500/10 text-teal-600 border-teal-500/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
