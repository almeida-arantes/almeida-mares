import Link from "next/link";
import { Download, FileText, Paperclip } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoEmptyList } from "@/lib/demo-empty";

const allExtracts = [
  { id: "abr-26", month: "Abril / 2026", amount: "R$ 18.420", status: "Aprovado · em processamento", tag: "Novo", attachments: 4 },
  { id: "mar-26", month: "Março / 2026", amount: "R$ 16.890", status: "Pago · 05/04/2026", attachments: 4 },
  { id: "fev-26", month: "Fevereiro / 2026", amount: "R$ 19.240", status: "Pago · 05/03/2026", attachments: 3 },
  { id: "jan-26", month: "Janeiro / 2026", amount: "R$ 22.480", status: "Pago · 05/02/2026", attachments: 4 },
  { id: "dez-25", month: "Dezembro / 2025", amount: "R$ 28.140", status: "Pago · 05/01/2026", attachments: 5 },
  { id: "nov-25", month: "Novembro / 2025", amount: "R$ 17.320", status: "Pago · 05/12/2025", attachments: 3 },
];

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ExtratosPage({ searchParams }: Props) {
  const extracts = await demoEmptyList(allExtracts, searchParams);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Extratos mensais</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Todos os repasses, com faturas originais anexadas. Cada PDF traz um QR de validação.
        </p>
      </div>

      {extracts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Ainda não há extratos disponíveis"
          description="Assim que o fechamento mensal for publicado, os PDFs com QR de validação aparecem aqui para download."
        >
          <Button size="sm" variant="outline" render={<Link href="/portal/painel" />}>
            Voltar ao painel
          </Button>
          <Button size="sm" variant="outline" render={<Link href="/portal/perfil" />}>
            Dados cadastrais
          </Button>
        </EmptyState>
      ) : (
        <div className="grid gap-3">
          {extracts.map((e) => (
            <Card key={e.id} className="group transition hover:border-primary/40">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-semibold">{e.month}</span>
                    {e.tag && <Badge>{e.tag}</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">{e.status}</div>
                </div>
                <div className="text-right sm:text-center">
                  <div className="font-display text-xl font-semibold">{e.amount}</div>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground sm:justify-center">
                    <Paperclip className="h-3 w-3" />
                    {e.attachments} anexos
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5" render={<Link href={`/portal/extratos/${e.id}`} />}>
                    <FileText className="h-3.5 w-3.5" /> Abrir
                  </Button>
                  <Button size="sm" className="gap-1.5" render={<Link href={`/portal/extratos/${e.id}`} />}>
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-muted/30 border-dashed">
        <CardHeader>
          <CardTitle className="font-display text-base">Quer o extrato por WhatsApp?</CardTitle>
          <CardDescription>
            Ative o envio automático. Todo dia 5, você recebe o PDF diretamente no seu número cadastrado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" render={<Link href="/portal/perfil" />}>
            Ativar envio por WhatsApp
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
