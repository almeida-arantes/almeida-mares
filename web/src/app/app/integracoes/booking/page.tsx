import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function IntegracaoBookingPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Booking.com Connectivity"
        description="B.XML / OTA 2003B · Basic Auth · secure-supply-xml.booking.com"
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display text-base">Status da conta máquina</CardTitle>
          <Badge className="bg-emerald-600 hover:bg-emerald-600">Ativo</Badge>
        </CardHeader>
        <CardContent className="space-y-2 font-mono text-xs text-muted-foreground">
          <div>POST /reservations — última chamada há 12s (respeita limite 20s)</div>
          <div>Scopes: reservations, rates_and_availability, photos, promotions</div>
          <div>hotel_ids vinculados: 11</div>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outras integrações"
        items={[
          { href: "/app/integracoes", label: "Visão geral" },
          { href: "/app/integracoes/airbnb", label: "Airbnb" },
          { href: "/app/integracoes/whatsapp", label: "WhatsApp" },
          { href: "/app/integracoes/pagamentos", label: "Pagamentos" },
        ]}
      />
    </div>
  );
}
