import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalendarioMensalPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="font-display text-lg">Visão mensal</CardTitle>
          <CardDescription>Abril de 2026 · grade por propriedade</CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="size-8" render={<Link href="/app/calendario/mensal" />}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="size-8" render={<Link href="/app/calendario/mensal" />}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed bg-muted/30 p-12 text-center text-sm text-muted-foreground">
          A grade mensal completa usa o mesmo motor do Gantt. Enquanto isso, use{" "}
          <Link href="/app/calendario" className="text-primary underline">
            Gantt
          </Link>{" "}
          ou{" "}
          <Link href="/app/calendario/lista" className="text-primary underline">
            Lista
          </Link>
          .
        </div>
      </CardContent>
    </Card>
  );
}
