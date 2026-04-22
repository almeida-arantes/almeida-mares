import { Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

const items = [
  { sku: "AMEN-KIT", nome: "Kit amenities padrão", qtd: 42, min: 20 },
  { sku: "TOALHA-BAN", nome: "Toalha banho branca 70x140", qtd: 86, min: 40 },
  { sku: "LENCOL-KING", nome: "Lençol king branco", qtd: 28, min: 16 },
];

export default function OperacaoEstoquePage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Estoque central"
        description="Amenities e enxoval — alertas quando abaixo do mínimo."
      />
      <div className="space-y-2">
        {items.map((it) => (
          <Card key={it.sku}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-muted-foreground">{it.sku}</div>
                  <div className="font-medium">{it.nome}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono">{it.qtd} un.</div>
                {it.qtd < it.min * 1.2 && (
                  <Badge variant="outline" className="text-amber-600 border-amber-500/50">Próximo do mínimo ({it.min})</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks
        title="Navegação"
        items={[
          { href: "/app/operacao", label: "Operação" },
          { href: "/app/operacao/limpeza", label: "Limpeza" },
          { href: "/app/operacao/manutencao", label: "Manutenção" },
          { href: "/app/operacao/checkin-checkout", label: "Check-in / Check-out" },
        ]}
      />
    </div>
  );
}
