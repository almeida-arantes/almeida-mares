import Link from "next/link";
import { Download, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const docs = [
  { slug: "contrato-gestao-2024", name: "Contrato de gestão — 2024", type: "PDF", size: "420 KB", date: "12/02/2024" },
  { slug: "procuracao", name: "Procuração — administração de bens", type: "PDF", size: "210 KB", date: "12/02/2024" },
  { slug: "adendo-abril-2025", name: "Adendo contratual — abril/2025", type: "PDF", size: "180 KB", date: "03/04/2025" },
  { slug: "carne-leao-2024", name: "Declaração Carnê-Leão 2024", type: "PDF", size: "640 KB", date: "28/02/2025" },
];

export default function DocumentosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Documentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contratos, procurações e comprovantes. Todos assinados digitalmente.
        </p>
      </div>

      <div className="grid gap-3">
        {docs.map((d) => (
          <Card key={d.slug}>
            <CardContent className="flex items-center gap-4 p-4">
              <Link
                href={`/portal/documentos/${d.slug}`}
                className="flex flex-1 items-center gap-4 min-w-0"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {d.name}
                    <Badge variant="outline">{d.type}</Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {d.size} · {d.date}
                  </div>
                </div>
              </Link>
              <Button variant="outline" size="sm" className="gap-1.5 shrink-0" render={<Link href={`/portal/documentos/${d.slug}/download`} />}>
                <Download className="h-3.5 w-3.5" /> Baixar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
