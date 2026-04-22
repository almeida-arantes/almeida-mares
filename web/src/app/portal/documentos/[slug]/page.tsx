import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const docs: Record<string, { name: string; type: string; size: string; date: string }> = {
  "contrato-gestao-2024": {
    name: "Contrato de gestão — 2024",
    type: "PDF",
    size: "420 KB",
    date: "12/02/2024",
  },
  procuracao: {
    name: "Procuração — administração de bens",
    type: "PDF",
    size: "210 KB",
    date: "12/02/2024",
  },
  "adendo-abril-2025": {
    name: "Adendo contratual — abril/2025",
    type: "PDF",
    size: "180 KB",
    date: "03/04/2025",
  },
  "carne-leao-2024": {
    name: "Declaração Carnê-Leão 2024",
    type: "PDF",
    size: "640 KB",
    date: "28/02/2025",
  },
};

type Props = { params: Promise<{ slug: string }> };

export default async function PortalDocumentoDetalhePage({ params }: Props) {
  const { slug } = await params;
  const d = docs[slug];
  if (!d) notFound();

  return (
    <div className="space-y-6">
      <Link href="/portal/documentos" className="text-sm text-muted-foreground hover:text-foreground">
        ← Documentos
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">{d.name}</h1>
          <p className="text-sm text-muted-foreground">
            {d.size} · {d.date}
          </p>
        </div>
        <Badge variant="outline">{d.type}</Badge>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <FileText className="h-14 w-14 text-muted-foreground/50" />
          <p className="max-w-md text-sm text-muted-foreground">
            Pré-visualização do documento. Na produção, o arquivo seria exibido aqui com carimbo de tempo e
            assinatura ICP-Brasil.
          </p>
          <Button className="gap-2" render={<Link href={`/portal/documentos/${slug}/download`} />}>
            <Download className="h-4 w-4" />
            Baixar documento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
