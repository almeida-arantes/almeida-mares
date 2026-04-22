import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

const tpl = [
  {
    nome: "Boas-vindas check-in (PT)",
    canal: "WhatsApp",
    editarHref: "/app/integracoes/whatsapp",
  },
  {
    nome: "Extrato mensal (PT)",
    canal: "E-mail",
    editarHref: "/app/relatorios/gerar/extrato-mensal",
  },
  {
    nome: "Pedido de review pós-estadia",
    canal: "WhatsApp",
    editarHref: "/app/mensagens",
  },
] as const;

export default function ConfigTemplatesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Templates de mensagem"
        description={
          <>
            Variáveis {"{{nome_hospede}}"}, {"{{imovel}}"}, etc.
          </>
        }
      />
      <div className="space-y-2">
        {tpl.map((t) => (
          <Card key={t.nome}>
            <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-medium">{t.nome}</div>
                <div className="text-xs text-muted-foreground">{t.canal}</div>
              </div>
              <Button size="sm" variant="outline" render={<Link href={t.editarHref} />}>
                Editar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/webhooks", label: "Webhooks" },
          { href: "/app/configuracoes/api-keys", label: "API Keys" },
        ]}
      />
    </div>
  );
}
