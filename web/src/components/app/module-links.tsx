import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ModuleLinks({
  title,
  items,
  layout = "inline",
}: {
  title?: string;
  items: { href: string; label: string; description?: string }[];
  /** `grid`: cards grandes (hubs). `inline`: linha discreta no fim da página. */
  layout?: "inline" | "grid";
}) {
  if (layout === "inline") {
    return (
      <div
        className={cn("border-t border-border/80 pt-5", title && "space-y-2")}
        aria-label={title ?? "Links relacionados"}
      >
        {title ? (
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </h2>
        ) : null}
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href as never}
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {title && (
        <h2 className="font-display text-lg font-semibold text-muted-foreground">{title}</h2>
      )}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((i) => (
          <Link key={i.href} href={i.href as never} className="group block">
            <Card className="h-full transition-colors hover:border-primary/35">
              <CardContent className="flex items-start justify-between gap-3 p-4">
                <div>
                  <div className="font-medium">{i.label}</div>
                  {i.description && (
                    <div className="mt-0.5 text-xs text-muted-foreground">{i.description}</div>
                  )}
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
