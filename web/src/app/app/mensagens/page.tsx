import { Bot, Inbox, MessageSquare, Search, Send, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { channels, reservations } from "@/lib/mock-data";
import { initials, relativeFromNow } from "@/lib/formatters";

const threads = reservations.slice(0, 8).map((r, i) => ({
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

export default function MensagensPage() {
  const active = threads[0];
  const ch = channels[active.channel];

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="border-b px-6 py-3">
        <h1 className="font-display text-xl font-semibold tracking-tight">Mensagens</h1>
        <p className="text-xs text-muted-foreground">
          Inbox unificado · Booking, Airbnb, WhatsApp e e-mail em uma tela.
        </p>
      </div>

      <div className="grid flex-1 grid-cols-12 overflow-hidden">
        {/* Threads */}
        <div className="col-span-12 flex flex-col border-r md:col-span-4 lg:col-span-3">
          <div className="border-b p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar conversa" className="h-8 pl-8 text-xs" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {threads.map((t, i) => {
                const chc = channels[t.channel];
                const isActive = i === 0;
                return (
                  <div
                    key={t.id}
                    className={`mb-1 cursor-pointer rounded-md p-2.5 text-sm transition ${
                      isActive ? "bg-muted" : "hover:bg-muted/50"
                    }`}
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
                          {t.unread && (
                            <span className="size-1.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <span
                            className="size-1.5 rounded-full"
                            style={{ backgroundColor: chc.hex }}
                          />
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
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Conversation */}
        <div className="hidden flex-col md:col-span-8 md:flex lg:col-span-6">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {initials(active.guest)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{active.guest}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: ch.hex }}
                  />
                  {ch.label} · Casa Itacimirim 3 quartos
                </div>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <Bot className="h-3 w-3" />
              Tradução PT ⇄ EN ativa
            </Badge>
          </div>
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-3">
              {[
                { me: false, text: "Oi, tudo bem? Estamos chegando por volta das 16h, pode ser?", t: "10:24" },
                { me: true, text: "Olá Ana Luísa! Tranquilo, preparamos sua chegada. Passo o endereço exato e o código do portão no WhatsApp.", t: "10:26" },
                { me: false, text: "Perfeito! Uma dúvida — a piscina é climatizada?", t: "10:28" },
                { me: true, text: "Não é climatizada, mas a água está ótima essa época do ano (nossos hóspedes de abril adoraram). Posso separar toalhas extras de piscina?", t: "10:30" },
                { me: false, text: "Pode sim, obrigada!", t: "10:31" },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.me ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-3.5 py-2 text-sm ${
                      m.me
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {m.text}
                    <div
                      className={`mt-0.5 text-right text-[10px] ${
                        m.me ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {m.t}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Badge variant="secondary" className="cursor-pointer gap-1">
                <Sparkles className="h-3 w-3" /> Sugerir resposta (IA)
              </Badge>
              <Badge variant="outline" className="cursor-pointer">Template: Check-in</Badge>
              <Badge variant="outline" className="cursor-pointer">Template: Boas-vindas</Badge>
            </div>
            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Escreva uma resposta…"
                className="min-h-[60px] flex-1 resize-none"
              />
              <Button size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Context panel */}
        <div className="hidden overflow-hidden border-l lg:col-span-3 lg:block">
          <div className="border-b p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Reserva ativa
            </div>
            <div className="mt-1 font-mono text-xs">HMXZ4172</div>
          </div>
          <div className="space-y-4 p-4 text-sm">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground">Estadia</div>
              <div>22 abr → 26 abr · 4 noites</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground">Hóspedes</div>
              <div>2 adultos · 1 criança</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground">Valor total</div>
              <div className="font-mono">R$ 3.240</div>
            </div>
            <Card className="border-dashed">
              <CardContent className="flex items-start gap-2 p-3 text-xs">
                <Inbox className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                <div className="text-muted-foreground">
                  Mensagens dos canais ficam centralizadas aqui. Nada passa despercebido.
                </div>
              </CardContent>
            </Card>
            <div>
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                Ver timeline completa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
