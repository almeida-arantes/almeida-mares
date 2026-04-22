import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { demoEmptyList } from "@/lib/demo-empty";
import { alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const icon = {
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
  success: CheckCircle2,
} as const;

const tone = {
  warning: "text-amber-600 bg-amber-500/10",
  error: "text-rose-600 bg-rose-500/10",
  info: "text-sky-600 bg-sky-500/10",
  success: "text-emerald-600 bg-emerald-500/10",
} as const;

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function NotificacoesPage({ searchParams }: Props) {
  const list = await demoEmptyList(alerts, searchParams);

  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Notificações"
        description="Mesmo feed dos alertas do painel · clique para ir ao módulo sugerido."
      >
        <Badge variant="secondary" className="w-fit gap-1">
          <Bell className="h-3 w-3" />
          {list.length} notificações
        </Badge>
      </PageHeader>

      {list.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Nada novo por aqui"
          description="Quando o sistema ou os canais gerarem alertas, eles aparecem neste feed com atalho para o módulo certo."
        >
          <Button size="sm" variant="outline" render={<Link href="/app/inicio" />}>
            Voltar ao início
          </Button>
          <Button size="sm" variant="outline" render={<Link href="/app/configuracoes/conta" />}>
            Preferências de alerta
          </Button>
        </EmptyState>
      ) : (
      <div className="space-y-3">
        {list.map((a) => {
          const Icon = icon[a.type];
          const hrefById: Record<string, string> = {
            a1: "/app/calendario",
            a2: "/app/integracoes/booking",
            a3: "/app/reservas",
            a4: "/app/operacao",
            a5: "/app/financeiro/repasses",
          };
          const href = hrefById[a.id] ?? "/app/inicio";
          return (
            <Card key={a.id} className="transition hover:border-primary/30">
              <CardContent className="flex gap-4 p-4">
                <div
                  className={cn(
                    "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md",
                    tone[a.type],
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium leading-snug">{a.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{a.description}</div>
                  <Button className="mt-3 h-8" size="sm" variant="outline" render={<Link href={href as never} />}>
                    Abrir
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      )}

      <Card className="border-dashed bg-muted/20">
        <CardHeader>
          <CardTitle className="text-base">Preferências</CardTitle>
          <CardDescription>Escolha canais e horários para alertas operacionais e financeiros.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" render={<Link href="/app/configuracoes/conta" />}>
            Ir para conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
