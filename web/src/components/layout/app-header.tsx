"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandPalette } from "@/components/layout/command-palette";

const labels: Record<string, string> = {
  app: "Painel",
  inicio: "Início",
  calendario: "Calendário",
  reservas: "Reservas",
  mensagens: "Mensagens",
  proprietarios: "Proprietários",
  propriedades: "Propriedades",
  financeiro: "Financeiro",
  relatorios: "Relatórios",
  operacao: "Operação",
  integracoes: "Integrações",
  auditoria: "Auditoria",
  configuracoes: "Configurações",
};

export function AppHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 backdrop-blur">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            {segments.map((seg, i) => {
              const href = "/" + segments.slice(0, i + 1).join("/");
              const isLast = i === segments.length - 1;
              const label = labels[seg] ?? seg;
              return (
                <span key={href} className="flex items-center gap-2">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-sm">{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        className="text-sm"
                        render={<Link href={href as never} />}
                      >
                        {label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </BreadcrumbSeparator>
                  )}
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-1.5">
          <CommandPalette>
            <Button
              variant="outline"
              size="sm"
              className="hidden h-8 w-72 justify-between gap-2 text-muted-foreground md:flex"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                Buscar reservas, proprietários…
              </span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </Button>
          </CommandPalette>

          <Button variant="ghost" size="icon" className="relative size-8">
            <Bell className="h-[1.05rem] w-[1.05rem]" />
            <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full p-0 px-1 text-[9px]">
              5
            </Badge>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="size-8 rounded-full">
                  <Avatar className="size-8">
                    <AvatarImage src="" alt="Almeida Mares" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      AM
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm">Almeida Mares</span>
                  <span className="text-xs text-muted-foreground">
                    operacao@almeidamares.com.br
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Empresa</DropdownMenuItem>
              <DropdownMenuItem>Equipe & permissões</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/" />}>
                Voltar ao site
              </DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
