import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";
import { brl } from "@/lib/formatters";

const rows = [
  { origem: "Reserva HMXZ4172", canal: "Airbnb", valor: 3_240, status: "Recebido" },
  { origem: "Reserva #3182740", canal: "Booking", valor: 2_880, status: "Em custódia OTA" },
  { origem: "Reserva direta", canal: "PIX", valor: 4_100, status: "Compensado" },
];

const hub = [
  { href: "/app/financeiro", label: "Visão geral" },
  { href: "/app/financeiro/fluxo-caixa", label: "Fluxo de caixa" },
  { href: "/app/financeiro/contas-pagar", label: "Contas a pagar" },
];

export default function ContasReceberPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Contas a receber" description="Recebíveis por reserva e canal." />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origem</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.origem}>
                <TableCell className="font-mono text-sm">{r.origem}</TableCell>
                <TableCell>{r.canal}</TableCell>
                <TableCell className="text-right font-mono">{brl(r.valor)}</TableCell>
                <TableCell><Badge variant="outline">{r.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <ModuleLinks title="Navegação" items={hub} />
    </div>
  );
}
