import { CheckCircle2, Link2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

const mov = [
  { desc: "PIX Entrada Airbnb *4172", valor: "R$ 3.240,00", match: "Reserva HMXZ4172", ok: true },
  { desc: "TED Condomínio Barra", valor: "R$ −5.600,00", match: "Contas a pagar #8821", ok: true },
  { desc: "PIX Saída limpeza", valor: "R$ −280,00", match: "Pendente classificação", ok: false },
];

const hub = [
  { href: "/app/financeiro", label: "Visão geral" },
  { href: "/app/financeiro/fluxo-caixa", label: "Fluxo de caixa" },
  { href: "/app/financeiro/faturas", label: "Faturas" },
];

export default function ConciliacaoPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Conciliação bancária"
        description="Open Finance (Pluggy) · última sync há 12 minutos."
      />
      <div className="space-y-2">
        {mov.map((m) => (
          <Card key={m.desc}>
            <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 font-medium">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  {m.desc}
                </div>
                <div className="font-mono text-sm text-muted-foreground">{m.valor}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{m.match}</span>
                {m.ok ? (
                  <Badge className="bg-emerald-600 hover:bg-emerald-600"><CheckCircle2 className="mr-1 h-3 w-3" /> OK</Badge>
                ) : (
                  <Badge variant="destructive">Revisar</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks title="Navegação" items={hub} />
    </div>
  );
}
