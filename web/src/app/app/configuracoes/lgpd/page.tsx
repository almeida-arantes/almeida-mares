import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function ConfigLgpdPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="LGPD & privacidade"
        description="Registro de operações com dados pessoais e políticas internas."
      />
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="flex gap-4 p-6">
          <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-600" />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Sistema em conformidade com o mínimo exigido pela LGPD para operação de PME.</p>
            <p>Consentimentos versionados, base legal por finalidade, portabilidade e exclusão sob solicitação verificável.</p>
            <Button variant="outline" size="sm" render={<Link href="/privacidade" />}>
              Ver política pública (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/empresa", label: "Empresa" },
          { href: "/app/configuracoes/conta", label: "Conta" },
        ]}
      />
    </div>
  );
}
