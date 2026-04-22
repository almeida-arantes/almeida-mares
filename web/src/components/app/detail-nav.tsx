"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function DetailNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-1 border-b pb-3">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href as never}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            pathname === i.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
