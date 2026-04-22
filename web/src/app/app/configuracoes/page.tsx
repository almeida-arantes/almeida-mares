import Link from "next/link";
import { Building2, Key, Mail, ShieldCheck, Users, Webhook } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

const sections = [
  { href: "/app/configuracoes/empresa" as const, icon: Building2, title: "Empresa", description: "Razão social, CNPJ, logo, dados fiscais da Almeida Mares." },
  { href: "/app/configuracoes/equipe" as const, icon: Users, title: "Equipe e permissões (RBAC)", description: "Papéis pré-definidos e permissões granulares." },
  { href: "/app/configuracoes/templates" as const, icon: Mail, title: "Templates", description: "Mensagens, relatórios e contratos. Multi-idioma. Variáveis automáticas." },
  { href: "/app/configuracoes/webhooks" as const, icon: Webhook, title: "Webhooks", description: "Eventos de saída para Zapier, Make e integrações custom." },
  { href: "/app/configuracoes/api-keys" as const, icon: Key, title: "API Keys", description: "Integrações programáticas e multi-tenant, quando aplicável." },
  { href: "/app/configuracoes/lgpd" as const, icon: ShieldCheck, title: "LGPD", description: "Política de privacidade, consentimentos, exportação de dados, direito ao esquecimento." },
];

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Configurações"
        description="Ajustes da conta, da empresa e dos papéis que acessam o sistema."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.title} href={s.href} className="group block rounded-xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
            <Card className="h-full transition hover:border-primary/40">
              <CardContent className="p-5">
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <ModuleLinks
        layout="grid"
        title="Atalhos"
        items={[
          { href: "/app/configuracoes/conta", label: "Minha conta" },
          { href: "/app/configuracoes/plano", label: "Plano & faturamento" },
          { href: "/app/auditoria", label: "Auditoria" },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Empresa · Almeida Mares</CardTitle>
          <CardDescription>Os dados abaixo aparecem em todos os extratos e PDFs gerados.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {[
            { k: "Razão social", v: "Almeida Mares Gestão de Imóveis LTDA" },
            { k: "CNPJ", v: "48.***.***/0001-72" },
            { k: "Endereço", v: "Av. Oceânica, 880 — sala 302, Ondina · Salvador, BA" },
            { k: "Telefone", v: "+55 71 3200-7700" },
            { k: "E-mail", v: "operacao@almeidamares.com.br" },
            { k: "Chave PIX (recebimento)", v: "48912***00172" },
            { k: "Regime tributário", v: "Simples Nacional · Anexo III" },
            { k: "CNAE principal", v: "6822-6/00 — Gestão de imóveis de terceiros" },
          ].map((f) => (
            <div key={f.k} className="flex flex-col gap-0.5 border-b py-2 last:border-0">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {f.k}
              </span>
              <span className="font-mono text-sm">{f.v}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <Badge className="w-fit bg-primary">LGPD</Badge>
          <div className="flex-1">
            <div className="text-sm font-medium">Conformidade ativa</div>
            <div className="text-xs text-muted-foreground">
              Criptografia at-rest (AES-256), TLS 1.3, pseudonimização no portal do proprietário, retenção definida, log de acessos sensíveis.
            </div>
          </div>
          <Button variant="outline" size="sm" render={<Link href="/app/configuracoes/lgpd" />}>
            Ver política
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <p className="text-center text-xs text-muted-foreground">
        Dúvidas sobre configuração?{" "}
        <Link href="/contato" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
          Contato comercial
        </Link>
      </p>
    </div>
  );
}
