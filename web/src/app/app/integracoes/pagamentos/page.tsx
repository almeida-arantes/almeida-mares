import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { brl } from "@/lib/formatters";
import { PageHeader } from "@/components/app/page-header";

export default function IntegracaoPagamentosPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Asaas · PIX & boletos" description="Repasse em lote e cobrança de reservas diretas." />
      <Card>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
          <div>
            <div className="text-xs text-muted-foreground">PIX este mês</div>
            <div className="font-display text-xl font-semibold">{brl(77_100)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Taxa média</div>
            <div className="font-display text-xl font-semibold">0,99%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Falhas</div>
            <div className="font-display text-xl font-semibold">0</div>
          </div>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outras integrações"
        items={[
          { href: "/app/integracoes", label: "Visão geral" },
          { href: "/app/integracoes/contabil", label: "Exportação contábil" },
        ]}
      />
    </div>
  );
}
