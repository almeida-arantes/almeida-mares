import { AlertCircle, CheckCircle2, Clock, Link as LinkIcon, Settings2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Integration = {
  name: string;
  tagline: string;
  status: "connected" | "partial" | "pending" | "error";
  mode: string;
  stats: { label: string; value: string }[];
  notes: string;
};

const integrations: Integration[] = [
  {
    name: "Booking.com",
    tagline: "Connectivity API · XML (OTA 2003B / B.XML)",
    status: "connected",
    mode: "Basic Auth · Machine Account",
    stats: [
      { label: "Propriedades", value: "11" },
      { label: "Última sync", value: "há 12s" },
      { label: "Scopes", value: "5" },
    ],
    notes:
      "Polling /reservations a cada 20 segundos. Reconciliação de segurança via /reservationssummary a cada 15 minutos.",
  },
  {
    name: "Airbnb",
    tagline: "Homes API · iCal + Partner Program",
    status: "partial",
    mode: "iCal bidirecional (Partner em avaliação)",
    stats: [
      { label: "Propriedades", value: "12" },
      { label: "Última sync", value: "há 8min" },
      { label: "Status Partner", value: "Em análise" },
    ],
    notes:
      "Funcionando via iCal para bloqueio de datas. Aprovação do Partner Program desbloqueará tarifas dinâmicas, messaging e webhooks.",
  },
  {
    name: "Vrbo / Expedia",
    tagline: "EPS Rapid · REST + OAuth 2.0",
    status: "pending",
    mode: "Não conectado",
    stats: [
      { label: "Propriedades", value: "2 elegíveis" },
    ],
    notes: "Integração planejada para Fase 2 (após MVP Booking + Airbnb).",
  },
  {
    name: "WhatsApp Business",
    tagline: "Meta Cloud API oficial · +55 71 3200-7700",
    status: "connected",
    mode: "Webhook ativo",
    stats: [
      { label: "Templates aprovados", value: "7" },
      { label: "Conversas (30d)", value: "248" },
      { label: "Taxa de entrega", value: "99,4%" },
    ],
    notes:
      "Notificações transacionais de check-in, check-out, extrato mensal e pedido de review.",
  },
  {
    name: "Asaas (PIX)",
    tagline: "Pagamentos instantâneos e boletos",
    status: "connected",
    mode: "Chave PIX vinculada",
    stats: [
      { label: "Repasses este mês", value: "R$ 77 mil" },
      { label: "Taxas", value: "0,99% PIX" },
    ],
    notes: "Execução em lote dos repasses aprovados. Arquivo CNAB 240 como fallback.",
  },
  {
    name: "Pluggy (Open Finance)",
    tagline: "Conciliação bancária automática",
    status: "connected",
    mode: "2 contas vinculadas",
    stats: [
      { label: "Últimos 30d", value: "412 movimentações" },
      { label: "Classificadas", value: "94%" },
    ],
    notes: "Importação diária de extratos e reconciliação automática por descrição.",
  },
  {
    name: "PriceLabs",
    tagline: "Dynamic pricing",
    status: "pending",
    mode: "Disponível para ativar",
    stats: [
      { label: "Propriedades elegíveis", value: "11" },
    ],
    notes: "Sugestões diárias de tarifa aprovadas antes de ir para os canais.",
  },
];

const statusConfig = {
  connected: { label: "Conectado", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  partial: { label: "Parcial", icon: Clock, color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
  pending: { label: "Pendente", icon: Clock, color: "text-sky-600 bg-sky-500/10 border-sky-500/20" },
  error: { label: "Erro", icon: AlertCircle, color: "text-rose-600 bg-rose-500/10 border-rose-500/20" },
} as const;

export default function IntegracoesPage() {
  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Integrações
        </h1>
        <p className="text-sm text-muted-foreground">
          Conexões vivas com os canais e serviços que movem a operação.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((i) => {
          const s = statusConfig[i.status];
          const Icon = s.icon;
          return (
            <Card key={i.name}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold">{i.name}</h3>
                      <Badge
                        variant="outline"
                        className={`${s.color} gap-1 border`}
                      >
                        <Icon className="h-3 w-3" />
                        {s.label}
                      </Badge>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {i.tagline}
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="size-8">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 rounded-md border bg-muted/30 p-3">
                  {i.stats.map((st) => (
                    <div key={st.label}>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {st.label}
                      </div>
                      <div className="mt-0.5 font-mono text-sm font-medium">
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <LinkIcon className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">{i.mode}.</span>{" "}
                    {i.notes}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
