import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";
import { owners } from "@/lib/mock-data";
import { brl } from "@/lib/formatters";

const hub = [
  { href: "/app/financeiro", label: "Visão geral" },
  { href: "/app/financeiro/faturas", label: "Faturas OTA" },
  { href: "/app/financeiro/conciliacao", label: "Conciliação" },
];

export default function RepassesFinanceiroPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Repasses a proprietários"
        description="Fila de aprovação e histórico de PIX em lote."
      />
      <div className="space-y-3">
        {owners.map((o) => (
          <Card key={o.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-medium">{o.name}</div>
                <div className="text-xs text-muted-foreground">Pendente: {brl(o.pendingPayout)}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" render={<Link href={`/app/proprietarios/${o.id}/repasses`} />}>
                  Detalhe
                </Button>
                <Button size="sm" render={<Link href={`/app/proprietarios/${o.id}/repasses`} />}>
                  Aprovar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks title="Navegação" items={hub} />
    </div>
  );
}
