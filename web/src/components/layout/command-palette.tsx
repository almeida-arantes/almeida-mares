"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Bell,
  BedDouble,
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  Filter,
  Home,
  Inbox,
  Plug,
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

type NavItem = { label: string; href: string; icon: typeof Home };

const groupPrincipal: NavItem[] = [
  { label: "Início", href: "/app/inicio", icon: Home },
  { label: "Notificações", href: "/app/notificacoes", icon: Bell },
];

const groupCalendarioReservas: NavItem[] = [
  { label: "Calendário", href: "/app/calendario", icon: CalendarDays },
  { label: "Filtros do calendário", href: "/app/calendario/filtros", icon: Filter },
  { label: "Reservas", href: "/app/reservas", icon: BedDouble },
  { label: "Filtros de reservas", href: "/app/reservas/filtros", icon: Filter },
  { label: "Nova reserva", href: "/app/reservas/nova", icon: BedDouble },
  { label: "Mensagens", href: "/app/mensagens", icon: Inbox },
];

const groupPessoasAtivos: NavItem[] = [
  { label: "Proprietários", href: "/app/proprietarios", icon: Users },
  { label: "Propriedades", href: "/app/propriedades", icon: Building2 },
];

const groupFinanceiro: NavItem[] = [
  { label: "Financeiro", href: "/app/financeiro", icon: Receipt },
  { label: "Fluxo de caixa", href: "/app/financeiro/fluxo-caixa", icon: Receipt },
  { label: "Relatórios", href: "/app/relatorios", icon: FileText },
];

const groupSistema: NavItem[] = [
  { label: "Operação", href: "/app/operacao", icon: Wrench },
  { label: "Integrações", href: "/app/integracoes", icon: Plug },
  { label: "Auditoria", href: "/app/auditoria", icon: ClipboardList },
  { label: "Configurações", href: "/app/configuracoes", icon: Settings },
];

export function CommandPalette({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const showPortalPreview = role !== "owner";

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

  const renderGroup = (heading: string, items: NavItem[]) => (
    <CommandGroup heading={heading}>
      {items.map((i) => (
        <CommandItem key={i.href} onSelect={() => go(i.href)} value={`${heading} ${i.label}`}>
          <i.icon className="mr-2 h-4 w-4" />
          {i.label}
        </CommandItem>
      ))}
    </CommandGroup>
  );

  return (
    <>
      {children ? (
        <span className="cursor-pointer" onClick={() => setOpen(true)}>
          {children}
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground"
        >
          <Search className="h-3.5 w-3.5" />
          Buscar
        </button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar páginas, reservas, proprietários, imóveis…" />
        <CommandList>
          <CommandEmpty>Nenhum resultado.</CommandEmpty>
          {renderGroup("Principal", groupPrincipal)}
          {renderGroup("Calendário e reservas", groupCalendarioReservas)}
          {renderGroup("Pessoas e ativos", groupPessoasAtivos)}
          {renderGroup("Financeiro e relatórios", groupFinanceiro)}
          {renderGroup("Sistema", groupSistema)}
          {showPortalPreview ? (
            <>
              <CommandSeparator />
              <CommandGroup heading="Visualização">
                <CommandItem
                  value="Portal do proprietário preview"
                  onSelect={() => go("/portal/painel")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Portal do proprietário (preview)
                </CommandItem>
              </CommandGroup>
            </>
          ) : null}
          <CommandSeparator />
          <CommandGroup heading="Reservas recentes">
            {reservations.slice(0, 6).map((r) => (
              <CommandItem
                key={r.id}
                value={`${r.code} ${r.guestName}`}
                onSelect={() => go(`/app/reservas/${r.id}`)}
              >
                <BedDouble className="mr-2 h-4 w-4" />
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
                onSelect={() => go(`/app/proprietarios/${o.id}`)}
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
                onSelect={() => go(`/app/propriedades/${p.id}`)}
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
