import { Building2, Key, Mail, ShieldCheck, Users, Webhook } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  { icon: Building2, title: "Empresa", description: "Razão social, CNPJ, logo, dados fiscais da Almeida Mares." },
  { icon: Users, title: "Equipe e permissões (RBAC)", description: "6 papéis pré-definidos + criação de papéis custom com 30+ flags granulares." },
  { icon: Mail, title: "Templates", description: "Mensagens, relatórios e contratos. Multi-idioma. Variáveis automáticas." },
  { icon: Webhook, title: "Webhooks", description: "Eventos de saída para Zapier, Make e integrações custom." },
  { icon: Key, title: "API Keys", description: "Caso decida vender a plataforma para outros gestores (multi-tenant)." },
  { icon: ShieldCheck, title: "LGPD", description: "Política de privacidade, consentimentos, exportação de dados, direito ao esquecimento." },
];

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Ajustes da conta, da empresa e dos papéis que acessam o sistema.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => (
          <Card key={s.title} className="group cursor-pointer transition hover:border-primary/40">
            <CardContent className="p-5">
              <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

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

      <Card className="bg-primary/5 border-primary/30">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <Badge className="w-fit bg-primary">LGPD</Badge>
          <div className="flex-1">
            <div className="text-sm font-medium">Conformidade ativa</div>
            <div className="text-xs text-muted-foreground">
              Criptografia at-rest (AES-256), TLS 1.3, pseudonimização no portal do proprietário, retenção definida, log de acessos sensíveis.
            </div>
          </div>
          <Button variant="outline" size="sm">Ver política</Button>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center text-xs text-muted-foreground">
        Versão 2026.1 · Build 1a2b3c4d · <span className="font-mono">almeida-mares @ vercel</span>
      </div>
    </div>
  );
}
