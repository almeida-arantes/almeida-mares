import { GanttTimeline } from "@/components/calendar/gantt-timeline";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarioPage() {
  return (
    <>
      <GanttTimeline />
      <Card>
        <CardContent className="flex flex-col gap-2 p-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>
              <span className="font-medium text-foreground">Dica:</span>{" "}
              Clique em uma reserva no Gantt para abrir o detalhe. Arrastar e redimensionar chegam na v1
              produtiva.
            </span>
          </div>
          <div className="font-mono text-[10px]">
            Última sincronização Booking há <span className="text-foreground">2 min</span> · Airbnb via iCal há{" "}
            <span className="text-foreground">8 min</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
