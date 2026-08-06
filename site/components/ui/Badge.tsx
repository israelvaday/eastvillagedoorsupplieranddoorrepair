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
    default: "bg-stone-200 text-stone-800 border-stone-300",
    open:    "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    closed:  "bg-red-500/10 text-red-300 border-red-500/30",
    brass:   "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
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
