import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DetailNav } from "@/components/app/detail-nav";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { getOwnerById } from "@/lib/mock-data";

type Props = { params: Promise<{ id: string }> };

const docs = [
  { name: "Contrato de gestão residencial", date: "12/02/2024" },
  { name: "Procuração para recebimento", date: "12/02/2024" },
  { name: "Adendo taxa variável", date: "03/04/2025" },
];

export default async function ProprietarioDocumentosPage({ params }: Props) {
  const { id } = await params;
  const o = getOwnerById(id);
  if (!o) notFound();

  const nav = [
    { href: `/app/proprietarios/${id}`, label: "Perfil" },
    { href: `/app/proprietarios/${id}/propriedades`, label: "Propriedades" },
    { href: `/app/proprietarios/${id}/repasses`, label: "Repasses" },
    { href: `/app/proprietarios/${id}/documentos`, label: "Documentos" },
  ];

  return (
    <div className="space-y-5 p-6">
      <Link href="/app/proprietarios" className="text-sm text-muted-foreground hover:text-foreground">← Proprietários</Link>
      <PageHeader title={`Documentos · ${o.name}`} />
      <DetailNav items={nav} />
      <div className="space-y-2">
        {docs.map((d) => (
          <Card key={d.name}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">Assinado · {d.date}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> PDF</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
