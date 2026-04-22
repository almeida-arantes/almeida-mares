import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function ConfigApiKeysPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="API Keys"
        description="Acesso programático à Almeida Mares (futuro multi-tenant)."
      />
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="rounded-md border border-dashed bg-muted/40 p-4 font-mono text-xs text-muted-foreground">
            Nenhuma chave ativa. Gere uma chave de API para integrações externas.
          </div>
          <Button disabled>Gerar chave de produção</Button>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/plano", label: "Plano & faturamento" },
        ]}
      />
    </div>
  );
}
