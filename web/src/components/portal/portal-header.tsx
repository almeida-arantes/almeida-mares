"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  CalendarDays,
  FileText,
  Home,
  LogOut,
  Menu,
  Receipt,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { isAuthDevBypass } from "@/lib/dev-auth-bypass";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Painel", href: "/portal/painel", icon: Home },
  { label: "Calendário", href: "/portal/calendario", icon: CalendarDays },
  { label: "Extratos", href: "/portal/extratos", icon: Receipt },
  { label: "Propriedades", href: "/portal/propriedades", icon: Building2 },
  { label: "Documentos", href: "/portal/documentos", icon: FileText },
  { label: "Perfil", href: "/portal/perfil", icon: User },
];

function initials(name: string | null | undefined, email: string | null | undefined) {
  const n = (name ?? "").trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0];
    const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : parts[0]?.[1];
    return ((a ?? "") + (b ?? "")).toUpperCase().slice(0, 2) || "PT";
  }
  const local = email?.split("@")[0] ?? "";
  return local.slice(0, 2).toUpperCase() || "PT";
}

export function PortalHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const bypass = isAuthDevBypass();
  const displayName =
    user?.name ?? (bypass ? "Portal (modo local)" : "Proprietário");
  const av = user ? initials(user?.name, user?.email) : bypass ? "PV" : "PT";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Portal do proprietário">
            {navItems.map((i) => {
              const active = pathname === i.href || pathname.startsWith(i.href + "/");
              return (
                <Button
                  key={i.href}
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-1.5"
                  aria-current={active ? "page" : undefined}
                  render={<Link href={i.href as never} />}
                >
                  <i.icon className="h-4 w-4" />
                  {i.label}
                </Button>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-[min(100%,320px)]">
              <SheetHeader>
                <SheetTitle className="font-display text-left">Portal</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Menu do portal">
                {navItems.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    <i.icon className="h-4 w-4" />
                    {i.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden items-center gap-2 border-l pl-3 sm:flex">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">{av}</AvatarFallback>
            </Avatar>
            <div className="text-xs leading-tight">
              <div className="font-medium">{displayName}</div>
              <div className="text-muted-foreground">Proprietário</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
