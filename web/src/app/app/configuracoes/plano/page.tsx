import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function ConfigPlanoPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Plano & faturamento"
        description="Uso interno da Almeida Mares — monolito licenciado."
      />
      <Card>
        <CardContent className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium">Licença enterprise · autohospedado</div>
            <div className="text-xs text-muted-foreground">Renovação anual · próximo ciclo jan/2027</div>
          </div>
          <Badge variant="secondary">Ativo</Badge>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/lgpd", label: "LGPD" },
        ]}
      />
    </div>
  );
}
