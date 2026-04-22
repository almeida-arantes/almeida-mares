"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Inbox, Search } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { channels, reservations } from "@/lib/mock-data";
import { initials, relativeFromNow } from "@/lib/formatters";
import { cn } from "@/lib/utils";

function buildThreads() {
  return reservations.slice(0, 8).map((r, i) => ({
    id: r.id,
    guest: r.guestName,
    channel: r.channel,
    lastMessage: [
      "Oi! Chegando por volta das 16h, tudo certo?",
      "A piscina é climatizada?",
      "Obrigado pela estadia incrível!",
      "Podemos fazer late checkout?",
      "Como chego da rodoviária?",
    ][i % 5],
    unread: i < 3,
    when: new Date(Date.now() - (i + 1) * 3600_000 * (i % 2 === 0 ? 1 : 4)).toISOString(),
  }));
}

export function MensagensSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const threads = searchParams.get("demo") === "vazio" ? [] : buildThreads();

  return (
    <div className={cn("flex flex-col border-b md:border-b-0 md:border-r", className)}>
      <div className="border-b p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar conversa" className="h-8 pl-8 text-xs" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {threads.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Nenhuma conversa na caixa"
              description="Quando houver reservas ativas ou mensagens dos canais, os threads aparecem aqui com prévia e canal."
              className="border-0 bg-transparent py-10"
            >
              <Button size="sm" variant="outline" render={<Link href="/app/reservas" />}>
                Ver reservas
              </Button>
              <Button size="sm" variant="outline" render={<Link href="/app/calendario" />}>
                Calendário
              </Button>
            </EmptyState>
          ) : (
            threads.map((t) => {
              const chc = channels[t.channel];
              const active = pathname === `/app/mensagens/${t.id}`;
              return (
                <Link
                  key={t.id}
                  href={`/app/mensagens/${t.id}`}
                  className={cn(
                    "mb-1 block rounded-md p-2.5 text-sm transition",
                    active ? "bg-muted" : "hover:bg-muted/50",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                        {initials(t.guest)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate font-medium">{t.guest}</span>
                        {t.unread && <span className="size-1.5 rounded-full bg-primary" />}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: chc.hex }} />
                        {chc.label}
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {relativeFromNow(t.when)}
                    </div>
                  </div>
                  <div className="mt-1 line-clamp-1 pl-10 text-xs text-muted-foreground">
                    {t.lastMessage}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
