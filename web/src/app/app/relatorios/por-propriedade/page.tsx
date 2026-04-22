import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { properties } from "@/lib/mock-data";
import { brl } from "@/lib/formatters";
import { PageHeader } from "@/components/app/page-header";

export default function RelatorioPorPropriedadePage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Relatório por propriedade"
        description="Performance individual com fotos da capa e comparativo com cluster."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {properties.slice(0, 8).map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <div className="font-medium">{p.nickname}</div>
              <div className="text-xs text-muted-foreground">{p.city}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm">Ocupação {p.occupancy30d}%</span>
                <span className="font-mono text-sm">{brl(p.revenue30d)}</span>
              </div>
              <Button
                size="sm"
                className="mt-3 w-full"
                variant="outline"
                render={<Link href="/app/relatorios/gerar/desempenho-propriedade" />}
              >
                Pré-visualizar PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks
        title="Outros relatórios"
        items={[
          { href: "/app/relatorios", label: "Índice" },
          { href: "/app/relatorios/por-proprietario", label: "Por proprietário" },
          { href: "/app/relatorios/ocupacao", label: "Ocupação" },
        ]}
      />
    </div>
  );
}
