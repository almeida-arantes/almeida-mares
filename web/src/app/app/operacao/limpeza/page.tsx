import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModuleLinks } from "@/components/app/module-links";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";

export default function OperacaoLimpezaPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Turnover — limpeza"
        description="Mesmo kanban da visão principal, filtrado só para limpeza."
      >
        <Button render={<Link href="/app/operacao" />}>Ver kanban completo</Button>
      </PageHeader>
      <Card className="p-8 text-center text-sm text-muted-foreground">
        Use o kanban em <Link href="/app/operacao" className="text-primary underline">Operação</Link> — visão consolidada
        com filtros e atalhos da equipe.
      </Card>
      <ModuleLinks
        title="Outras áreas"
        items={[
          { href: "/app/operacao/manutencao", label: "Manutenção" },
          { href: "/app/operacao/checkin-checkout", label: "Check-in / Check-out" },
          { href: "/app/operacao/estoque", label: "Estoque" },
        ]}
      />
    </div>
  );
}
