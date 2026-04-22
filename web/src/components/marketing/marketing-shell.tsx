"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
  { href: "/termos", label: "Termos" },
  { href: "/privacidade", label: "Privacidade" },
] as const;

export function MarketingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-brand-gradient" />
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-6">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/servicos" className="transition-colors hover:text-foreground">
              Serviços
            </Link>
            <Link href="/contato" className="transition-colors hover:text-foreground">
              Contato
            </Link>
            <Link href="/termos" className="transition-colors hover:text-foreground">
              Termos
            </Link>
            <Link href="/privacidade" className="transition-colors hover:text-foreground">
              Privacidade
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent side="right" className="w-[min(100%,320px)]">
                <SheetHeader>
                  <SheetTitle className="font-display text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded-md px-3 py-2.5 text-sm hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                  <hr className="my-2 border-border" />
                  <Link
                    href="/login"
                    className="rounded-md px-3 py-2.5 text-sm hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/login?next=/app/inicio"
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-primary hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    Área operacional
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" render={<Link href="/login" />}>
              Entrar
            </Button>
            <Button size="sm" className="hidden sm:inline-flex gap-1" render={<Link href="/login?next=/app/inicio" />}>
              Área operacional
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="mx-auto max-w-7xl px-6 py-12 outline-none"
      >
        {children}
      </main>
      <footer className="border-t bg-muted/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:items-end">
            <div className="flex flex-wrap gap-4">
              <Link href="/servicos" className="hover:text-foreground">
                Serviços
              </Link>
              <Link href="/contato" className="hover:text-foreground">
                Contato
              </Link>
              <Link href="/termos" className="hover:text-foreground">
                Termos de uso
              </Link>
              <Link href="/privacidade" className="hover:text-foreground">
                Política de privacidade
              </Link>
              <Link href="/login" className="hover:text-foreground">
                Login
              </Link>
            </div>
            <p className="max-w-md text-right leading-relaxed">
              Almeida Mares Gestão de Imóveis · Salvador, BA ·{" "}
              <span className="whitespace-nowrap">contato@almeidamares.com.br</span>
            </p>
            <p>© {new Date().getFullYear()} Almeida Mares · LGPD</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
