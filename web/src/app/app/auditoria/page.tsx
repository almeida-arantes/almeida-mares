import { CheckCircle2, FileSignature, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/app/page-header";

const events = [
  { time: "14:32:08", user: "Ingrid A.", action: "approved_payout", target: "Ricardo Mendonça · abril/26", hash: "0x9fa…c21" },
  { time: "13:18:42", user: "Ingrid A.", action: "reservation_updated", target: "HMXZ4172 · datas alteradas", hash: "0x2bc…f90" },
  { time: "12:05:11", user: "sys", action: "booking_sync", target: "11 reservas atualizadas", hash: "0x81d…a74" },
  { time: "11:47:29", user: "Ingrid A.", action: "owner_created", target: "Construtora Maré Alta Ltda.", hash: "0xfc3…e12" },
  { time: "11:21:03", user: "sys", action: "report_generated", target: "Extrato · Fernanda Arantes · abr/26", hash: "0x4a2…9b7" },
  { time: "10:58:14", user: "sys", action: "ical_sync_airbnb", target: "12 propriedades atualizadas", hash: "0xe09…1d4" },
  { time: "09:02:45", user: "Ingrid A.", action: "login", target: "192.168.1.12 · Edge / Win", hash: "0x71f…5cc" },
];

export default function AuditoriaPage() {
  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Auditoria"
        description="Registro imutável de todas as ações no sistema. Cadeia de hash assinada, pronta para validação externa."
      >
        <Badge variant="outline" className="gap-1">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          Integridade validada
        </Badge>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-xs uppercase text-muted-foreground">Eventos (30d)</div>
            <div className="mt-1 font-display text-xl font-semibold">12.847</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs uppercase text-muted-foreground">Cadeia íntegra há</div>
            <div className="mt-1 font-display text-xl font-semibold">487 dias</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs uppercase text-muted-foreground">Eventos financeiros</div>
            <div className="mt-1 font-display text-xl font-semibold">2.103</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Atividade recente</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Alvo</TableHead>
                <TableHead className="text-right">Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {e.time}
                  </TableCell>
                  <TableCell className="text-sm">
                    {e.user === "sys" ? (
                      <Badge variant="outline" className="gap-1 text-[10px]">
                        <FileSignature className="h-3 w-3" />
                        sistema
                      </Badge>
                    ) : (
                      e.user
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {e.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {e.target}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {e.hash}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
