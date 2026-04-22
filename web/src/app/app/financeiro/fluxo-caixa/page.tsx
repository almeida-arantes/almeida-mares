import { TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { brl } from "@/lib/formatters";

const hub = [
  { href: "/app/financeiro", label: "Visão geral", description: "KPIs e extratos" },
  { href: "/app/financeiro/contas-pagar", label: "Contas a pagar" },
  { href: "/app/financeiro/contas-receber", label: "Contas a receber" },
  { href: "/app/financeiro/repasses", label: "Repasses" },
  { href: "/app/financeiro/faturas", label: "Faturas OTA" },
  { href: "/app/financeiro/conciliacao", label: "Conciliação bancária" },
];

export default function FluxoCaixaPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Fluxo de caixa"
        description="Projetado vs. realizado · consolidado da operação."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Saldo projetado (30d)</div>
            <div className="mt-1 flex items-center gap-2 font-display text-xl font-semibold">
              {brl(312_400)} <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Saídas operacionais</div>
            <div className="mt-1 font-display text-xl font-semibold text-rose-600">{brl(48_200)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Repasses agendados</div>
            <div className="mt-1 font-display text-xl font-semibold">{brl(77_100)}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Entrada por canal (12 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart />
        </CardContent>
      </Card>
      <ModuleLinks title="Ir para" items={hub} />
    </div>
  );
}
