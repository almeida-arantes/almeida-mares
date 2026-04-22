import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function IntegracaoVrboPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Vrbo / Expedia (EPS Rapid)"
        description="REST + OAuth 2.0 — planejado para fase pós-MVP na sua carteira."
      />
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          2 propriedades elegíveis. Quando conectado, seguirá o mesmo modelo de conciliação que Booking e Airbnb.
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outras integrações"
        items={[
          { href: "/app/integracoes", label: "Visão geral" },
          { href: "/app/integracoes/booking", label: "Booking.com" },
          { href: "/app/integracoes/airbnb", label: "Airbnb" },
        ]}
      />
    </div>
  );
}
