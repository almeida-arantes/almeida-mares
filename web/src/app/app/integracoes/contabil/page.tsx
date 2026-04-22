import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModuleLinks } from "@/components/app/module-links";
import { Download } from "lucide-react";

import { PageHeader } from "@/components/app/page-header";

export default function IntegracaoContabilPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Exportação contábil" description="SPED, CSV e CNAB 240 para o contador." />
      <Card>
        <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">Último fechamento: abril/2026 · bloco completo validado</div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Baixar pacote contábil
          </Button>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outras integrações"
        items={[
          { href: "/app/integracoes", label: "Visão geral" },
          { href: "/app/integracoes/pagamentos", label: "Pagamentos" },
        ]}
      />
    </div>
  );
}
