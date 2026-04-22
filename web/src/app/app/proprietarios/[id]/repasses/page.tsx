import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { DetailNav } from "@/components/app/detail-nav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { getOwnerById } from "@/lib/mock-data";
import { brl } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

const mockRows = [
  { ref: "Abr/2026", bruto: 26_840, liquido: 16_420, status: "Processando" },
  { ref: "Mar/2026", bruto: 24_100, liquido: 15_200, status: "Pago" },
  { ref: "Fev/2026", bruto: 27_400, liquido: 17_800, status: "Pago" },
];

export default async function ProprietarioRepassesPage({ params }: Props) {
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
      <PageHeader title={`Repasses · ${o.name}`} />
      <DetailNav items={nav} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Referência</TableHead>
              <TableHead className="text-right">Bruto</TableHead>
              <TableHead className="text-right">Líquido</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRows.map((row) => (
              <TableRow key={row.ref}>
                <TableCell className="font-medium">{row.ref}</TableCell>
                <TableCell className="text-right font-mono">{brl(row.bruto)}</TableCell>
                <TableCell className="text-right font-mono">{brl(row.liquido)}</TableCell>
                <TableCell>
                  <Badge variant={row.status === "Pago" ? "default" : "secondary"}>{row.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
