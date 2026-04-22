import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OccupancyChart } from "@/components/dashboard/occupancy-chart";

export default function CalendarioOcupacaoPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="font-display text-lg">Curva de ocupação</CardTitle>
            <CardDescription>Média ponderada da carteira · mesma base dos relatórios</CardDescription>
          </div>
          <Button variant="outline" size="sm" render={<Link href="/app/relatorios/ocupacao" />}>
            Relatório detalhado
          </Button>
        </CardHeader>
        <CardContent>
          <OccupancyChart />
        </CardContent>
      </Card>
    </div>
  );
}
