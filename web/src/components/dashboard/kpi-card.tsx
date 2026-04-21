import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  label: string;
  value: string;
  delta?: number;
  deltaSuffix?: string;
  hint?: string;
  icon?: React.ElementType;
  tone?: "primary" | "accent" | "neutral";
};

export function KpiCard({
  label,
  value,
  delta,
  deltaSuffix = "%",
  hint,
  icon: Icon,
  tone = "neutral",
}: KpiCardProps) {
  const positive = delta !== undefined && delta >= 0;
  const toneBg =
    tone === "primary"
      ? "bg-primary/10 text-primary"
      : tone === "accent"
        ? "bg-chart-2/15 text-chart-2"
        : "bg-muted text-muted-foreground";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
          {Icon && (
            <div
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md",
                toneBg,
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="mt-3 font-display text-2xl font-semibold tracking-tight">
          {value}
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium",
                positive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {positive ? "+" : ""}
              {delta.toString().replace(".", ",")}
              {deltaSuffix}
            </span>
          )}
          {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
