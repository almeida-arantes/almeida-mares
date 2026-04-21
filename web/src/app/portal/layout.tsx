import Link from "next/link";
import {
  CalendarDays,
  FileText,
  Home,
  LogOut,
  Receipt,
  Shield,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Painel", href: "/portal/painel", icon: Home },
  { label: "Calendário", href: "/portal/calendario", icon: CalendarDays },
  { label: "Extratos", href: "/portal/extratos", icon: Receipt },
  { label: "Propriedades", href: "/portal/propriedades", icon: Home },
  { label: "Documentos", href: "/portal/documentos", icon: FileText },
  { label: "Perfil", href: "/portal/perfil", icon: User },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((i) => (
                <Button
                  key={i.href}
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  render={<Link href={i.href as never} />}
                >
                  <i.icon className="h-4 w-4" />
                  {i.label}
                </Button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden items-center gap-2 border-l pl-3 sm:flex">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  RM
                </AvatarFallback>
              </Avatar>
              <div className="text-xs leading-tight">
                <div className="font-medium">Ricardo Mendonça</div>
                <div className="text-muted-foreground">Proprietário</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              render={<Link href="/" />}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            Acesso criptografado · LGPD compliant
          </div>
          <div>© 2026 Almeida Mares</div>
        </div>
      </footer>
    </div>
  );
}
