import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function IntegracaoAirbnbPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Airbnb" description="Homes API + iCal · Partner Program em análise." />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display text-base">Modo atual</CardTitle>
          <Badge variant="secondary">iCal bidirecional</Badge>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Sincronização de calendário a cada 10 minutos. Após aprovação no Partner Program: messaging, tarifas dinâmicas e webhooks.
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outras integrações"
        items={[
          { href: "/app/integracoes", label: "Visão geral" },
          { href: "/app/integracoes/booking", label: "Booking.com" },
          { href: "/app/integracoes/vrbo", label: "Vrbo" },
        ]}
      />
    </div>
  );
}
