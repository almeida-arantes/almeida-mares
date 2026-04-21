"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  Home,
  Inbox,
  Receipt,
  Search,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { owners, properties, reservations } from "@/lib/mock-data";

const navItems = [
  { label: "Início", href: "/app/inicio", icon: Home },
  { label: "Calendário", href: "/app/calendario", icon: CalendarDays },
  { label: "Reservas", href: "/app/reservas", icon: BookOpen },
  { label: "Mensagens", href: "/app/mensagens", icon: Inbox },
  { label: "Proprietários", href: "/app/proprietarios", icon: Users },
  { label: "Propriedades", href: "/app/propriedades", icon: Building2 },
  { label: "Financeiro", href: "/app/financeiro", icon: Receipt },
  { label: "Relatórios", href: "/app/relatorios", icon: FileText },
  { label: "Operação", href: "/app/operacao", icon: Wrench },
  { label: "Configurações", href: "/app/configuracoes", icon: Settings },
];

export function CommandPalette({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href as never);
  };

  return (
    <>
      {children ? (
        <span onClick={() => setOpen(true)}>{children}</span>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground"
        >
          <Search className="h-3.5 w-3.5" />
          Buscar
        </button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar reservas, hóspedes, proprietários, propriedades…" />
        <CommandList>
          <CommandEmpty>Nenhum resultado.</CommandEmpty>
          <CommandGroup heading="Navegar">
            {navItems.map((i) => (
              <CommandItem key={i.href} onSelect={() => go(i.href)} value={i.label}>
                <i.icon className="mr-2 h-4 w-4" />
                {i.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Reservas recentes">
            {reservations.slice(0, 6).map((r) => (
              <CommandItem
                key={r.id}
                value={`${r.code} ${r.guestName}`}
                onSelect={() => go("/app/reservas")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span className="font-mono text-xs">{r.code}</span>
                <span className="ml-2 text-muted-foreground">— {r.guestName}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Proprietários">
            {owners.map((o) => (
              <CommandItem
                key={o.id}
                value={o.name}
                onSelect={() => go("/app/proprietarios")}
              >
                <Users className="mr-2 h-4 w-4" />
                {o.name}
                <span className="ml-2 text-xs text-muted-foreground">· {o.city}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Propriedades">
            {properties.map((p) => (
              <CommandItem
                key={p.id}
                value={p.nickname}
                onSelect={() => go("/app/propriedades")}
              >
                <Building2 className="mr-2 h-4 w-4" />
                {p.nickname}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
