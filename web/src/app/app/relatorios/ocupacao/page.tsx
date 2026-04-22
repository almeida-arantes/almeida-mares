import { OccupancyChart } from "@/components/dashboard/occupancy-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function RelatorioOcupacaoPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Relatório de ocupação" description="Série histórica e visão por propriedade." />
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Carteira consolidada</CardTitle>
        </CardHeader>
        <CardContent>
          <OccupancyChart />
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outros relatórios"
        items={[
          { href: "/app/relatorios", label: "Índice" },
          { href: "/app/relatorios/adr-revpar", label: "ADR & RevPAR" },
          { href: "/app/relatorios/canais", label: "Canais" },
        ]}
      />
    </div>
  );
}
