import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { kpis } from "@/lib/mock-data";
import { brl, pct } from "@/lib/formatters";
import { PageHeader } from "@/components/app/page-header";

export default function RelatorioAdrRevparPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="ADR & RevPAR"
        description="Diária média e receita por unidade disponível — benchmark interno."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="text-xs uppercase text-muted-foreground">ADR médio</div>
            <div className="mt-2 font-display text-3xl font-semibold">{brl(kpis.adr)}</div>
            <div className="text-xs text-emerald-600">+{pct(kpis.adrDelta)} vs. período anterior</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-xs uppercase text-muted-foreground">RevPAR</div>
            <div className="mt-2 font-display text-3xl font-semibold">{brl(kpis.revpar)}</div>
            <div className="text-xs text-emerald-600">+{pct(kpis.revparDelta)} vs. período anterior</div>
          </CardContent>
        </Card>
      </div>
      <ModuleLinks
        title="Outros relatórios"
        items={[
          { href: "/app/relatorios", label: "Índice" },
          { href: "/app/relatorios/ocupacao", label: "Ocupação" },
          { href: "/app/relatorios/canais", label: "Canais" },
        ]}
      />
    </div>
  );
}
