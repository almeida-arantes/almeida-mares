import { CalendarDays, Filter, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { GanttTimeline } from "@/components/calendar/gantt-timeline";

export default function CalendarioPage() {
  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Calendário unificado
          </h1>
          <p className="text-sm text-muted-foreground">
            Todas as reservas, bloqueios e janelas de turnover em uma linha do tempo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Nova reserva
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="gantt">
          <TabsList>
            <TabsTrigger value="gantt" className="gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              Gantt
            </TabsTrigger>
            <TabsTrigger value="mes">Mensal</TabsTrigger>
            <TabsTrigger value="lista">Lista</TabsTrigger>
            <TabsTrigger value="ocupacao">Ocupação</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1 font-mono text-[10px]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            12 sincronizadas
          </Badge>
          <Badge variant="outline" className="gap-1 font-mono text-[10px]">
            <span className="size-1.5 rounded-full bg-amber-500" />
            1 em sync
          </Badge>
          <Badge variant="outline" className="gap-1 font-mono text-[10px]">
            <span className="size-1.5 rounded-full bg-rose-500" />
            1 erro
          </Badge>
        </div>
      </div>

      <GanttTimeline />

      <Card>
        <CardContent className="flex flex-col gap-2 p-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>
              <span className="font-medium text-foreground">Dica:</span>{" "}
              Arraste as barras para remarcar uma reserva. Redimensione as laterais para alterar check-in ou check-out.
            </span>
          </div>
          <div className="font-mono text-[10px]">
            Última sincronização Booking há <span className="text-foreground">2 min</span> · Airbnb via iCal há <span className="text-foreground">8 min</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
