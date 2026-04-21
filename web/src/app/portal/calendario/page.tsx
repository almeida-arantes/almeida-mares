import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GanttTimeline } from "@/components/calendar/gantt-timeline";
import { ShieldCheck } from "lucide-react";

export default function PortalCalendarioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Calendário</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Reservas confirmadas dos seus imóveis. Os dados pessoais dos hóspedes ficam
          ocultos por política LGPD — só a Almeida Mares tem acesso.
        </p>
      </div>

      <GanttTimeline />

      <Card className="bg-muted/30 border-dashed">
        <CardHeader className="flex-row items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <CardTitle className="font-display text-base">Privacidade garantida</CardTitle>
            <CardDescription>
              Você visualiza apenas os seus imóveis. Datas, canais e valores — sem
              nomes ou contatos de hóspedes.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent />
      </Card>
    </div>
  );
}
