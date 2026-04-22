import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

const templates = [
  "check_in_reminder_pt",
  "monthly_statement_ready",
  "review_request",
];

export default function IntegracaoWhatsAppPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="WhatsApp Business Cloud"
        description="Meta · número verificado · templates aprovados."
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display text-base">Templates HSM ({templates.length})</CardTitle>
          <Badge variant="outline">WABA ativo</Badge>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {templates.map((t) => (
              <li key={t} className="font-mono text-xs">{t}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outras integrações"
        items={[
          { href: "/app/integracoes", label: "Visão geral" },
          { href: "/app/integracoes/pagamentos", label: "Pagamentos" },
          { href: "/app/integracoes/contabil", label: "Contábil" },
        ]}
      />
    </div>
  );
}
