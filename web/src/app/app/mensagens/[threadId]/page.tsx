import Link from "next/link";
import { Bot, Inbox, MessageSquare, Send, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { channels, getPropertyById, getReservationById } from "@/lib/mock-data";
import { brl, initials } from "@/lib/formatters";

type Props = { params: Promise<{ threadId: string }> };

export default async function MensagemThreadPage({ params }: Props) {
  const { threadId } = await params;
  const r = getReservationById(threadId);
  const title = r?.guestName ?? `Conversa ${threadId.slice(0, 8)}…`;
  const ch = r ? channels[r.channel] : channels.airbnb;
  const prop = r ? getPropertyById(r.propertyId) : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col border-b lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {initials(title)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{title}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full" style={{ backgroundColor: ch.hex }} />
                {ch.label}
                {prop && <span>· {prop.nickname}</span>}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="hidden gap-1 sm:inline-flex">
            <Bot className="h-3 w-3" />
            Tradução PT ⇄ EN
          </Badge>
        </div>
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-3">
            {[
              { me: false, text: "Oi, tudo bem? Estamos chegando por volta das 16h, pode ser?", t: "10:24" },
              { me: true, text: "Olá! Tranquilo, preparamos sua chegada. Passo o endereço exato e o código do portão no WhatsApp.", t: "10:26" },
              { me: false, text: "Perfeito! Uma dúvida — a piscina é climatizada?", t: "10:28" },
              { me: true, text: "Não é climatizada, mas a água está ótima essa época do ano. Posso separar toalhas extras de piscina?", t: "10:30" },
              { me: false, text: "Pode sim, obrigada!", t: "10:31" },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-2xl px-3.5 py-2 text-sm ${
                    m.me ? "bg-primary text-primary-foreground" : "bg-muted"
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
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="cursor-default gap-1">
              <Sparkles className="h-3 w-3" /> Sugerir resposta (IA)
            </Badge>
            <Badge variant="outline" className="cursor-default">
              Template: Check-in
            </Badge>
            <Badge variant="outline" className="cursor-default">
              Template: Boas-vindas
            </Badge>
          </div>
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Escreva uma resposta…"
              className="min-h-[60px] flex-1 resize-none"
            />
            <Button size="icon" className="shrink-0" type="button">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <aside className="hidden w-full shrink-0 border-l bg-muted/20 lg:block lg:w-[280px] xl:w-[320px]">
        <div className="border-b p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Reserva</div>
          <div className="mt-1 font-mono text-xs">{r?.code ?? "—"}</div>
        </div>
        <div className="space-y-4 p-4 text-sm">
          {r && (
            <>
              <div>
                <div className="text-[10px] uppercase text-muted-foreground">Valor total</div>
                <div className="font-mono">{brl(r.grossValue)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-muted-foreground">Propriedade</div>
                <Button variant="link" className="h-auto p-0 text-sm" render={<Link href={`/app/propriedades/${r.propertyId}`} />}>
                  {prop?.nickname ?? r.propertyId}
                </Button>
              </div>
            </>
          )}
          <Card className="border-dashed">
            <CardContent className="flex items-start gap-2 p-3 text-xs">
              <Inbox className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
              <div className="text-muted-foreground">
                Mensagens dos canais ficam centralizadas aqui. Nada passa despercebido.
              </div>
            </CardContent>
          </Card>
          {r && (
            <Button variant="outline" size="sm" className="w-full gap-1.5" render={<Link href={`/app/reservas/${r.id}/timeline`} />}>
              <MessageSquare className="h-3.5 w-3.5" />
              Ver timeline completa
            </Button>
          )}
        </div>
      </aside>
    </div>
  );
}
