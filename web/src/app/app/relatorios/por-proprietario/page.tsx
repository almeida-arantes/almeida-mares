import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { owners } from "@/lib/mock-data";
import { brl, initials } from "@/lib/formatters";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/app/page-header";

export default function RelatorioPorProprietarioPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Relatório por proprietário"
        description="Receita, ocupação e canais por cliente — exportação XLSX/PDF."
      />
      <div className="space-y-2">
        {owners.map((o) => (
          <Card key={o.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Avatar><AvatarFallback className="bg-primary/15 text-primary">{initials(o.name)}</AvatarFallback></Avatar>
                <div>
                  <div className="font-medium">{o.name}</div>
                  <div className="text-xs text-muted-foreground">{o.city}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm">YTD {brl(o.ytdRevenue)}</span>
                <Button
                  size="sm"
                  variant="outline"
                  render={<Link href="/app/relatorios/gerar/extrato-mensal" />}
                >
                  Gerar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks
        title="Outros relatórios"
        items={[
          { href: "/app/relatorios", label: "Índice de relatórios" },
          { href: "/app/relatorios/por-propriedade", label: "Por propriedade" },
          { href: "/app/relatorios/ocupacao", label: "Ocupação" },
          { href: "/app/relatorios/adr-revpar", label: "ADR & RevPAR" },
          { href: "/app/relatorios/canais", label: "Canais" },
        ]}
      />
    </div>
  );
}
