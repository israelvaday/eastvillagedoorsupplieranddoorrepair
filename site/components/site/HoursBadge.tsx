import { Badge } from "@/components/ui/Badge";
import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export function HoursBadge({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <Badge
      tone="open"
      className={cn(
        variant === "dark" && "border-amber-500/50 bg-indigo-900 text-amber-200",
        className
      )}
    >
      <Clock className="h-3 w-3" />
      Mon–Fri 7–6 · Sat 8–2
    </Badge>
  );
}
