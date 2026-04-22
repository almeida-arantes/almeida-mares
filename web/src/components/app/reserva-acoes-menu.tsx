"use client";

import Link from "next/link";
import { Copy, FileText, MoreHorizontal, Route } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ReservaAcoesMenu({ id }: { id: string }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" className="size-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link href={`/app/reservas/${id}/timeline`} />}>
          <Route className="mr-2 h-4 w-4" /> Timeline
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href={`/app/reservas/${id}/financeiro`} />}>
          <FileText className="mr-2 h-4 w-4" /> Financeiro
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href={`/app/reservas/nova`} />}>
          <Copy className="mr-2 h-4 w-4" /> Duplicar como rascunho
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
