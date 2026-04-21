"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  Inbox,
  Plug,
  Receipt,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";

const primary = [
  { title: "Início", href: "/app/inicio", icon: Home },
  { title: "Calendário", href: "/app/calendario", icon: CalendarDays },
  { title: "Reservas", href: "/app/reservas", icon: BookOpen },
  { title: "Mensagens", href: "/app/mensagens", icon: Inbox, badge: "3" },
];

const cadastros = [
  { title: "Proprietários", href: "/app/proprietarios", icon: Users },
  { title: "Propriedades", href: "/app/propriedades", icon: Building2 },
];

const finance = [
  { title: "Financeiro", href: "/app/financeiro", icon: Receipt },
  { title: "Relatórios", href: "/app/relatorios", icon: FileText },
];

const ops = [
  { title: "Operação", href: "/app/operacao", icon: Wrench },
  { title: "Integrações", href: "/app/integracoes", icon: Plug },
  { title: "Auditoria", href: "/app/auditoria", icon: ClipboardList },
];

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const renderGroup = (
    label: string,
    items: { title: string; href: string; icon: typeof Home; badge?: string }[],
  ) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={isActive(item.href)}
                tooltip={item.title}
                render={<Link href={item.href as never} />}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto h-5 px-1.5 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Logo />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {renderGroup("Operação", primary)}
        {renderGroup("Cadastros", cadastros)}
        {renderGroup("Financeiro", finance)}
        {renderGroup("Sistema", ops)}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Desempenho"
              render={<Link href="/app/inicio" />}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Desempenho</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Configurações"
              render={<Link href="/app/configuracoes" />}
            >
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
