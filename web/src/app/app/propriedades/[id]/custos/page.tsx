import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DetailNav } from "@/components/app/detail-nav";
import { getPropertyById } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/page-header";
import { propertyDetailNav } from "@/lib/property-detail-nav";
import { brl } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

const rows = [
  { item: "Condomínio", tipo: "Fixo/mês", valor: 890 },
  { item: "Energia (média)", tipo: "Variável", valor: 320 },
  { item: "Limpeza pós-estadia", tipo: "Por reserva", valor: 280 },
];

export default async function PropriedadeCustosPage({ params }: Props) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) notFound();

  return (
    <div className="space-y-5 p-6">
      <Link href={`/app/propriedades/${id}`} className="text-sm text-muted-foreground hover:text-foreground">
        ← {p.nickname}
      </Link>
      <PageHeader title="Custos operacionais" />
      <DetailNav items={propertyDetailNav(id)} />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor ref.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.item}>
                <TableCell>{r.item}</TableCell>
                <TableCell className="text-muted-foreground">{r.tipo}</TableCell>
                <TableCell className="text-right font-mono">{brl(r.valor)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
