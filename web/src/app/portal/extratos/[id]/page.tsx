import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText, QrCode } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const catalog: Record<string, { month: string; amount: string; status: string }> = {
  "abr-26": { month: "Abril / 2026", amount: "R$ 18.420", status: "Em processamento" },
  "mar-26": { month: "Março / 2026", amount: "R$ 16.890", status: "Pago" },
  "fev-26": { month: "Fevereiro / 2026", amount: "R$ 19.240", status: "Pago" },
  "jan-26": { month: "Janeiro / 2026", amount: "R$ 22.480", status: "Pago" },
  "dez-25": { month: "Dezembro / 2025", amount: "R$ 28.140", status: "Pago" },
  "nov-25": { month: "Novembro / 2025", amount: "R$ 17.320", status: "Pago" },
};

type Props = { params: Promise<{ id: string }> };

export default async function PortalExtratoDetalhePage({ params }: Props) {
  const { id } = await params;
  const row = catalog[id];
  if (!row) notFound();

  return (
    <div className="space-y-8">
      <Link href="/portal/extratos" className="text-sm text-muted-foreground hover:text-foreground">
        ← Todos os extratos
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">{row.month}</h1>
          <p className="text-muted-foreground">Extrato de repasse · Ricardo Mendonça</p>
        </div>
        <Badge variant="secondary">{row.status}</Badge>
      </div>

      <Card className="overflow-hidden">
        <div className="aspect-[1/1.4] max-h-[640px] bg-muted flex flex-col items-center justify-center gap-4 p-8 text-center">
          <FileText className="h-16 w-16 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground max-w-sm">
            Pré-visualização do PDF embutida aqui em produção. Valor líquido declarado:{" "}
            <strong className="text-foreground">{row.amount}</strong>.
          </p>
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs">
            <QrCode className="h-8 w-8" />
            <span>QR validação documento AM-2026-042</span>
          </div>
          <Button className="gap-2" render={<Link href={`/portal/extratos/${id}/download`} />}>
            <Download className="h-4 w-4" /> Baixar PDF
          </Button>
        </div>
      </Card>

      <Card>
        <CardContent className="p-4 text-xs text-muted-foreground">
          Anexos: fatura Booking (PDF), fatura Airbnb (PDF), comprovantes de limpeza. Todos com hash SHA-256 na auditoria.
        </CardContent>
      </Card>
    </div>
  );
}
