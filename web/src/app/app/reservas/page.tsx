import Link from "next/link";
import { BedDouble, CalendarDays, Download, Filter, Plus, Search } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { ReservasTableBody } from "@/components/app/reservas-table-body";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PageHeader } from "@/components/app/page-header";
import { demoEmptyList } from "@/lib/demo-empty";
import { reservations } from "@/lib/mock-data";
import { brl } from "@/lib/formatters";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ReservasPage({ searchParams }: Props) {
  const sorted = await demoEmptyList(
    [...reservations].sort(
      (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime(),
    ),
    searchParams,
  );
  const stats = {
    total: sorted.length,
    active: sorted.filter((r) => r.status !== "cancelada").length,
    confirmed: sorted.filter((r) => r.status === "confirmada").length,
    checkedIn: sorted.filter((r) => r.status === "em_estadia").length,
    gross: sorted.reduce((s, r) => s + r.grossValue, 0),
  };

  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Reservas"
        description={`${stats.total} reservas · ${stats.active} ativas · ${brl(stats.gross)} em bruto`}
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          render={<Link href="/app/relatorios/gerar/extrato-mensal" />}
        >
          <Download className="h-4 w-4" />
          Exportar
        </Button>
        <Button size="sm" className="gap-1.5" render={<Link href="/app/reservas/nova" />}>
          <Plus className="h-4 w-4" />
          Nova reserva
        </Button>
      </PageHeader>

      <Tabs defaultValue="todas">
        <TabsList>
          <TabsTrigger value="todas">Todas ({stats.total})</TabsTrigger>
          <TabsTrigger value="confirmadas">Confirmadas ({stats.confirmed})</TabsTrigger>
          <TabsTrigger value="estadia">Em estadia ({stats.checkedIn})</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por hóspede, código, propriedade…" className="pl-8" />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          render={<Link href="/app/reservas/filtros" />}
        >
          <Filter className="h-4 w-4" />
          Filtros
          <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">3</Badge>
        </Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={BedDouble}
          title="Nenhuma reserva encontrada"
          description="Quando houver reservas sincronizadas ou criadas manualmente, elas aparecem aqui com canal, valores e datas."
        >
          <Button size="sm" className="gap-1.5" render={<Link href="/app/reservas/nova" />}>
            <Plus className="h-4 w-4" />
            Nova reserva
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" render={<Link href="/app/calendario" />}>
            <CalendarDays className="h-4 w-4" />
            Ver calendário
          </Button>
        </EmptyState>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[110px]">Código</TableHead>
                <TableHead>Hóspede</TableHead>
                <TableHead>Propriedade</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead className="text-center">Check-in</TableHead>
                <TableHead className="text-center">Check-out</TableHead>
                <TableHead className="text-center">Noites</TableHead>
                <TableHead className="text-right">Bruto</TableHead>
                <TableHead className="text-right">Líquido</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <ReservasTableBody rows={sorted} />
          </Table>
        </Card>
      )}
    </div>
  );
}
