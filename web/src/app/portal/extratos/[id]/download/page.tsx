import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const catalog = ["abr-26", "mar-26", "fev-26", "jan-26", "dez-25", "nov-25"] as const;

type Props = { params: Promise<{ id: string }> };

export default async function PortalExtratoDownloadPage({ params }: Props) {
  const { id } = await params;
  if (!catalog.includes(id as (typeof catalog)[number])) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-6 py-8">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold">Download iniciado</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              O PDF do extrato <span className="font-mono">{id}</span> está sendo preparado. Se o download não
              começar, use o botão abaixo para voltar e tentar novamente.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button className="gap-2" render={<Link href={`/portal/extratos/${id}`} />}>
              Voltar ao extrato
            </Button>
            <Button variant="outline" className="gap-2" render={<Link href="/portal/extratos" />}>
              <Download className="h-4 w-4" />
              Todos os extratos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
