"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

const items: { href: string; label: string; Icon?: typeof CalendarDays }[] = [
  { href: "/app/calendario", label: "Linha do tempo", Icon: CalendarDays },
  { href: "/app/calendario/mensal", label: "Mensal" },
  { href: "/app/calendario/lista", label: "Lista" },
  { href: "/app/calendario/ocupacao", label: "Ocupação" },
];

export function CalendarSubnav() {
  const pathname = usePathname();
  return (
    <nav
      className="flex flex-wrap gap-1 rounded-lg border border-border/80 bg-muted/40 p-1"
      aria-label="Visualizações do calendário"
    >
      {items.map((i) => {
        const active =
          pathname === i.href ||
          (i.href === "/app/calendario" &&
            pathname.startsWith("/app/calendario") &&
            !["/app/calendario/mensal", "/app/calendario/lista", "/app/calendario/ocupacao", "/app/calendario/filtros"].some(
              (p) => pathname === p || pathname.startsWith(p + "/"),
            ));
        const Icon = i.Icon;
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
