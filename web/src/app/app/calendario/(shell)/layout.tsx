import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { CalendarSubnav } from "@/components/app/calendar-subnav";
import { CalendarToolbar } from "@/components/app/calendar-toolbar";
import { PageHeader } from "@/components/app/page-header";

export default function CalendarioShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Calendário unificado"
        description="Todas as reservas, bloqueios e janelas de turnover em uma linha do tempo."
      >
        <CalendarToolbar />
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CalendarSubnav />
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/app/integracoes" title="Ver status das integrações">
            <Badge
              variant="outline"
              className="cursor-pointer gap-1 font-mono text-[10px] transition-colors hover:border-primary/50"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              12 sincronizadas
            </Badge>
          </Link>
          <Link href="/app/integracoes" title="Ver integrações em sincronização">
            <Badge
              variant="outline"
              className="cursor-pointer gap-1 font-mono text-[10px] transition-colors hover:border-primary/50"
            >
              <span className="size-1.5 rounded-full bg-amber-500" />
              1 em sync
            </Badge>
          </Link>
          <Link href="/app/integracoes/booking" title="Diagnosticar erro de canal">
            <Badge
              variant="outline"
              className="cursor-pointer gap-1 font-mono text-[10px] transition-colors hover:border-destructive/40"
            >
              <span className="size-1.5 rounded-full bg-rose-500" />
              1 erro
            </Badge>
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
