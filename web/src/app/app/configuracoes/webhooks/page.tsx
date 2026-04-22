import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function ConfigWebhooksPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Webhooks de saída"
        description="Eventos para Zapier / Make / endpoint próprio."
      />
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">reservation.created</span>
            <Badge>Ativo</Badge>
          </div>
          <div className="space-y-2">
            <Label>URL HTTPS</Label>
            <Input placeholder="https://hooks.zapier.com/..." className="font-mono text-xs" />
          </div>
          <Button variant="outline">Testar envio</Button>
        </CardContent>
      </Card>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/api-keys", label: "API Keys" },
        ]}
      />
    </div>
  );
}
