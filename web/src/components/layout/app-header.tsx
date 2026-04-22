"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
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
import { isAuthDevBypass } from "@/lib/dev-auth-bypass";
import { resolveBreadcrumbSegment } from "@/lib/breadcrumb-labels";
import { getSearchShortcutLabel } from "@/lib/search-shortcut-label";
import { alerts } from "@/lib/mock-data";

function initials(name: string | null | undefined, email: string | null | undefined) {
  const n = (name ?? "").trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0];
    const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : parts[0]?.[1];
    return ((a ?? "") + (b ?? "")).toUpperCase().slice(0, 2) || "AM";
  }
  const local = email?.split("@")[0] ?? "";
  return local.slice(0, 2).toUpperCase() || "AM";
}

export function AppHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { data: session } = useSession();
  const user = session?.user;
  const bypass = isAuthDevBypass();
  const displayName =
    user?.name ?? (bypass ? "Desenvolvedor (modo local)" : "Conta");
  const userEmail =
    user?.email ?? (bypass ? "sem sessão — apenas dev" : "");
  const av = user ? initials(user?.name, user?.email) : bypass ? "DV" : "AM";

  const [kbdSearch, setKbdSearch] = useState("⌘K");
  useEffect(() => {
    setKbdSearch(getSearchShortcutLabel());
  }, []);

  const alertCount = alerts.filter((a) => a.type === "warning" || a.type === "error").length;

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <Breadcrumb className="hidden min-w-0 sm:flex">
          <BreadcrumbList>
            {segments.map((seg, i) => {
              const href = "/" + segments.slice(0, i + 1).join("/");
              const isLast = i === segments.length - 1;
              const prev = segments[i - 1];
              const label = resolveBreadcrumbSegment(seg, prev, segments);
              return (
                <span key={href} className="flex min-w-0 items-center gap-2">
                  <BreadcrumbItem className="min-w-0">
                    {isLast ? (
                      <BreadcrumbPage className="truncate text-sm">{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        className="truncate text-sm"
                        render={<Link href={href as never} />}
                      >
                        {label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
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
                {kbdSearch}
              </kbd>
            </Button>
          </CommandPalette>

          <Button
            variant="ghost"
            size="icon"
            className="relative size-8"
            render={<Link href="/app/notificacoes" />}
            aria-label={`Notificações${alertCount ? `, ${alertCount} alertas` : ""}`}
          >
            <Bell className="h-[1.05rem] w-[1.05rem]" />
            {alertCount > 0 ? (
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full p-0 px-1 text-[9px]">
                {alertCount}
              </Badge>
            ) : null}
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="size-8 rounded-full">
                  <Avatar className="size-8">
                    <AvatarImage src="" alt={displayName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {av}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm">{displayName}</span>
                  <span className="text-xs text-muted-foreground">{userEmail}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/app/configuracoes/conta" />}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/app/configuracoes/empresa" />}>
                Empresa
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/app/configuracoes/equipe" />}>
                Equipe & permissões
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/" />}>
                Voltar ao site
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer"
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
