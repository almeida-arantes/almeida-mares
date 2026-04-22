"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { channels, properties, reservations } from "@/lib/mock-data";
import { brl, dateShort } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const DAY_WIDTH = 42;
const DAYS_BEFORE = 3;
const DAYS_AFTER = 40;

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function diffDays(a: Date, b: Date) {
  return Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / 86_400_000);
}

export function GanttTimeline() {
  const today = startOfDay(new Date());
  const [origin, setOrigin] = React.useState(() => {
    const o = new Date(today);
    o.setDate(o.getDate() - DAYS_BEFORE);
    return o;
  });

  const totalDays = DAYS_BEFORE + DAYS_AFTER;
  const days = React.useMemo(() => {
    return Array.from({ length: totalDays }, (_, i) => {
      const d = new Date(origin);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [origin, totalDays]);

  const shift = (n: number) => {
    const next = new Date(origin);
    next.setDate(next.getDate() + n);
    setOrigin(next);
  };

  // Group reservations by property
  const reservationsByProp = React.useMemo(() => {
    const map = new Map<string, typeof reservations>();
    for (const r of reservations) {
      if (r.status === "cancelada") continue;
      if (!map.has(r.propertyId)) map.set(r.propertyId, []);
      map.get(r.propertyId)!.push(r);
    }
    return map;
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => shift(-7)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7"
            onClick={() => {
              const o = new Date();
              o.setDate(o.getDate() - DAYS_BEFORE);
              o.setHours(0, 0, 0, 0);
              setOrigin(o);
            }}
          >
            Hoje
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => shift(7)}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          {Object.entries(channels).map(([key, ch]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-sm"
                style={{ backgroundColor: ch.hex }}
              />
              {ch.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll container */}
      <div className="overflow-x-auto">
        <div
          className="relative"
          style={{ width: 260 + DAY_WIDTH * totalDays }}
        >
          {/* Date header row */}
          <div
            className="sticky top-0 z-20 grid border-b bg-muted/50 backdrop-blur"
            style={{ gridTemplateColumns: `260px repeat(${totalDays}, ${DAY_WIDTH}px)` }}
          >
            <div className="flex items-center border-r px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Propriedade
            </div>
            {days.map((d, i) => {
              const isToday = diffDays(d, today) === 0;
              const isWeekend = d.getDay() === 0 || d.getDay() === 6;
              return (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col items-center border-r py-1.5 text-[10px]",
                    isWeekend && "bg-muted/50",
                    isToday && "bg-primary/10",
                  )}
                >
                  <span className="font-medium uppercase text-muted-foreground">
                    {new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
                      .format(d)
                      .slice(0, 3)
                      .replace(".", "")}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                      isToday &&
                        "bg-primary text-primary-foreground",
                    )}
                  >
                    {d.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Rows */}
          {properties.map((prop) => {
            const resv = reservationsByProp.get(prop.id) ?? [];
            return (
              <div
                key={prop.id}
                className="grid border-b hover:bg-muted/20 transition"
                style={{ gridTemplateColumns: `260px repeat(${totalDays}, ${DAY_WIDTH}px)` }}
              >
                <div className="flex items-center gap-2 border-r px-4 py-2.5 text-sm">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{prop.nickname}</div>
                    <div className="truncate text-[10px] text-muted-foreground">
                      {prop.city} · {prop.bedrooms} quartos
                    </div>
                  </div>
                </div>

                <div
                  className="relative col-span-[calc(var(--cols))] h-14"
                  style={{ gridColumn: `2 / span ${totalDays}`, width: DAY_WIDTH * totalDays }}
                >
                  {/* Day cells background */}
                  <div className="absolute inset-0 flex">
                    {days.map((d, i) => {
                      const isToday = diffDays(d, today) === 0;
                      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                      return (
                        <div
                          key={i}
                          className={cn(
                            "h-full border-r border-border/50",
                            isWeekend && "bg-muted/30",
                            isToday && "bg-primary/5",
                          )}
                          style={{ width: DAY_WIDTH }}
                        />
                      );
                    })}
                  </div>
                  {/* Bars */}
                  {resv.map((r) => {
                    const start = diffDays(new Date(r.checkIn), origin);
                    const end = diffDays(new Date(r.checkOut), origin);
                    if (end <= 0 || start >= totalDays) return null;
                    const left = Math.max(0, start) * DAY_WIDTH + 4;
                    const right = Math.min(totalDays, end) * DAY_WIDTH - 4;
                    const width = Math.max(32, right - left);
                    const ch = channels[r.channel];
                    const isCurrent = r.status === "em_estadia";
                    return (
                      <Tooltip key={r.id}>
                        <TooltipTrigger
                          render={
                            <Link
                              href={`/app/reservas/${r.id}`}
                              className={cn(
                                "absolute top-2 h-10 cursor-pointer rounded-md px-2 py-1 text-[10px] shadow-sm ring-1 ring-inset ring-white/20 transition-all hover:translate-y-[-1px] hover:shadow-md",
                                isCurrent && "ring-2 ring-primary ring-offset-1",
                              )}
                              style={{
                                left,
                                width,
                                backgroundColor: ch.hex,
                                color: "white",
                              }}
                            >
                              <div className="truncate font-semibold leading-tight">
                                {r.guestName}
                              </div>
                              <div className="truncate text-[9px] opacity-90">
                                {r.nights}n · {brl(r.grossValue)}
                              </div>
                            </Link>
                          }
                        />
                        <TooltipContent side="top" className="max-w-[260px]">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium">{r.guestName}</span>
                              <Badge
                                variant="outline"
                                style={{ borderColor: ch.hex, color: ch.hex }}
                              >
                                {ch.label}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {dateShort(r.checkIn)} → {dateShort(r.checkOut)} · {r.nights} noites
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                {r.guests} hóspedes
                              </span>
                              <span className="font-mono font-medium">{brl(r.grossValue)}</span>
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground">
                              Código: {r.code}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
