import { Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { brl } from "@/lib/formatters";
import { PageHeader } from "@/components/app/page-header";

const ordens = [
  { id: "OS-1042", imovel: "Vila Praia do Forte — Coral", problema: "Ar-cond. quarto principal", valor: 420, status: "Aguardando peça" },
  { id: "OS-1039", imovel: "Flat Ondina Vista Mar", problema: "Vazamento torneira cozinha", valor: 180, status: "Em execução" },
];

export default function OperacaoManutencaoPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Manutenção"
        description="Ordens de serviço vinculadas à propriedade e ao proprietário."
      />
      <div className="space-y-3">
        {ordens.map((o) => (
          <Card key={o.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{o.id}</div>
                  <div className="font-medium">{o.imovel}</div>
                  <div className="text-sm text-muted-foreground">{o.problema}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">{brl(o.valor)}</span>
                <Badge variant="secondary">{o.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks
        title="Navegação"
        items={[
          { href: "/app/operacao", label: "Operação (visão geral)" },
          { href: "/app/operacao/limpeza", label: "Limpeza" },
          { href: "/app/operacao/checkin-checkout", label: "Check-in / Check-out" },
          { href: "/app/operacao/estoque", label: "Estoque" },
        ]}
      />
    </div>
  );
}
