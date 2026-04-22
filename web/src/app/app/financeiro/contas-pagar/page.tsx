import Link from "next/link";
import { Receipt } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { demoEmptyList } from "@/lib/demo-empty";
import { brl, dateShort } from "@/lib/formatters";

const allRows = [
  { fornecedor: "Limpeza Express", venc: new Date(), valor: 2_400, status: "Pago" },
  { fornecedor: "Manutenção JR", venc: new Date(), valor: 820, status: "Pendente" },
  { fornecedor: "Condomínio Barra", venc: new Date(), valor: 5_600, status: "Agendado" },
];

const hub = [
  { href: "/app/financeiro", label: "Visão geral" },
  { href: "/app/financeiro/fluxo-caixa", label: "Fluxo de caixa" },
  { href: "/app/financeiro/contas-receber", label: "Contas a receber" },
];

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ContasPagarPage({ searchParams }: Props) {
  const rows = await demoEmptyList(allRows, searchParams);

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Contas a pagar"
        description="Fornecedores, condomínio e serviços terceirizados."
      />
      {rows.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="Sem contas a pagar neste filtro"
          description="Lançamentos de fornecedores, condomínio e serviços aparecem aqui com vencimento e status."
        >
          <Button size="sm" render={<Link href="/app/financeiro" />}>
            Visão geral financeira
          </Button>
          <Button size="sm" variant="outline" render={<Link href="/app/financeiro/fluxo-caixa" />}>
            Fluxo de caixa
          </Button>
        </EmptyState>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.fornecedor}>
                  <TableCell className="font-medium">{r.fornecedor}</TableCell>
                  <TableCell>{dateShort(r.venc)}</TableCell>
                  <TableCell className="text-right font-mono">{brl(r.valor)}</TableCell>
                  <TableCell><Badge variant="secondary">{r.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      <ModuleLinks title="Navegação" items={hub} />
    </div>
  );
}
