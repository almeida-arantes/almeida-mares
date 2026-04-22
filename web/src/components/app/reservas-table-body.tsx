"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { channels, properties, type Reservation } from "@/lib/mock-data";
import { brl, dateShort, initials } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  confirmada: { label: "Confirmada", className: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  em_estadia: { label: "Em estadia", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  concluida: { label: "Concluída", className: "bg-muted text-muted-foreground" },
  cancelada: { label: "Cancelada", className: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
  pendente: { label: "Pendente", className: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
};

function propName(id: string) {
  return properties.find((p) => p.id === id)?.nickname ?? "—";
}

export function ReservasTableBody({ rows }: { rows: Reservation[] }) {
  const router = useRouter();

  return (
    <TableBody>
      {rows.map((r) => {
        const ch = channels[r.channel];
        const s = statusConfig[r.status];
        return (
          <TableRow
            key={r.id}
            role="link"
            tabIndex={0}
            className="cursor-pointer hover:bg-muted/40"
            onClick={() => router.push(`/app/reservas/${r.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/app/reservas/${r.id}`);
              }
            }}
          >
            <TableCell className="font-mono text-xs">
              <Link
                href={`/app/reservas/${r.id}`}
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {r.code}
              </Link>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                    {initials(r.guestName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {r.guestName}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {r.guests} hóspedes · {r.guestCountry}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="max-w-[200px] truncate text-sm">{propName(r.propertyId)}</div>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className="font-medium"
                style={{ borderColor: ch.hex, color: ch.hex }}
              >
                {ch.label}
              </Badge>
            </TableCell>
            <TableCell className="text-center text-sm">
              {dateShort(r.checkIn)}
            </TableCell>
            <TableCell className="text-center text-sm">
              {dateShort(r.checkOut)}
            </TableCell>
            <TableCell className="text-center text-sm font-mono">
              {r.nights}
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {brl(r.grossValue)}
            </TableCell>
            <TableCell className="text-right font-mono text-sm text-muted-foreground">
              {brl(r.netOwner)}
            </TableCell>
            <TableCell>
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                  s.className,
                )}
              >
                {s.label}
              </span>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
