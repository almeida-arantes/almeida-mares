import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getReportGeneratorMeta } from "@/lib/report-generator";

type Props = { params: Promise<{ template: string }> };

export default async function GerarRelatorioTemplatePage({ params }: Props) {
  const { template } = await params;
  const meta = getReportGeneratorMeta(template);
  if (!meta) notFound();

  return (
    <div className="space-y-6 p-6">
      <Button variant="ghost" size="sm" className="-ml-2 w-fit" render={<Link href="/app/relatorios" />}>
        ← Relatórios
      </Button>
      <PageHeader
        title={
          <span className="inline-flex flex-wrap items-center gap-2">
            {meta.title}
            <Badge variant="outline" className="font-mono text-[10px]">
              {meta.key}
            </Badge>
          </span>
        }
        description={meta.desc}
      />
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
            Defina período, filtros por proprietário ou imóvel, formato (PDF, XLSX) e destinatários. A pré-visualização
            será gerada na sequência.
          </div>
          <div className="flex flex-wrap gap-2">
            <Button render={<Link href="/app/relatorios" />}>Gerar pré-visualização</Button>
            <Button variant="outline" render={<Link href="/app/configuracoes/templates" />}>
              Agendar envio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
