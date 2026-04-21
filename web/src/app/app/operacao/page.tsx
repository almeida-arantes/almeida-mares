import { Camera, CheckCircle2, Clock, Plus, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { properties } from "@/lib/mock-data";
import { brl, initials } from "@/lib/formatters";

const cleaningColumns = [
  { id: "agendar", title: "A agendar", color: "bg-muted/60" },
  { id: "agendado", title: "Agendado", color: "bg-sky-500/10" },
  { id: "progresso", title: "Em andamento", color: "bg-amber-500/10" },
  { id: "vistoria", title: "Vistoria", color: "bg-chart-3/15" },
  { id: "concluido", title: "Concluído", color: "bg-emerald-500/10" },
];

type CleaningCard = {
  id: string;
  property: string;
  assigned: string;
  window: string;
  cost: number;
  progress: number;
  photos: number;
  col: string;
};

const cards: CleaningCard[] = [
  {
    id: "c1",
    property: "Casa Itacimirim 3 quartos",
    assigned: "Joana Silva",
    window: "Hoje · 11h–14h",
    cost: 220,
    progress: 0,
    photos: 0,
    col: "agendar",
  },
  {
    id: "c2",
    property: "Chalé Itacimirim Mar",
    assigned: "Maria das Graças",
    window: "Amanhã · 11h–14h",
    cost: 180,
    progress: 0,
    photos: 0,
    col: "agendado",
  },
  {
    id: "c3",
    property: "Flat Ondina Vista Mar",
    assigned: "Camila Souza",
    window: "Hoje · 12h–14h",
    cost: 150,
    progress: 60,
    photos: 4,
    col: "progresso",
  },
  {
    id: "c4",
    property: "Apto Rio Vermelho",
    assigned: "Joana Silva",
    window: "Hoje · 11h–13h",
    cost: 110,
    progress: 100,
    photos: 8,
    col: "vistoria",
  },
  {
    id: "c5",
    property: "Loft Pelourinho Design",
    assigned: "Luiza Andrade",
    window: "Ontem · 11h–13h",
    cost: 120,
    progress: 100,
    photos: 6,
    col: "concluido",
  },
  {
    id: "c6",
    property: "Casa Praia do Forte — Azul",
    assigned: "Joana Silva",
    window: "Ontem · 11h–14h",
    cost: 250,
    progress: 100,
    photos: 10,
    col: "concluido",
  },
];

export default function OperacaoPage() {
  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Operação</h1>
          <p className="text-sm text-muted-foreground">
            Kanban de turnover e manutenção. Cada card vira notificação WhatsApp automática para a equipe.
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Nova tarefa
        </Button>
      </div>

      <Tabs defaultValue="limpeza">
        <TabsList>
          <TabsTrigger value="limpeza">Limpeza (6)</TabsTrigger>
          <TabsTrigger value="manutencao">Manutenção (2)</TabsTrigger>
          <TabsTrigger value="checkin">Check-in / Check-out</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        {cleaningColumns.map((col) => {
          const colCards = cards.filter((c) => c.col === col.id);
          return (
            <div key={col.id} className="rounded-lg border bg-background p-3">
              <div className={`mb-3 flex items-center justify-between rounded-md ${col.color} px-2 py-1`}>
                <div className="text-xs font-medium uppercase tracking-wider">
                  {col.title}
                </div>
                <Badge variant="secondary" className="h-5 text-[10px]">
                  {colCards.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {colCards.map((c) => (
                  <Card key={c.id} className="p-3 transition hover:-translate-y-0.5 hover:shadow-sm">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{c.property}</div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {c.window}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="size-5">
                            <AvatarFallback className="bg-primary/15 text-primary text-[9px]">
                              {initials(c.assigned)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[11px]">{c.assigned}</span>
                        </div>
                        <span className="font-mono text-[11px]">{brl(c.cost)}</span>
                      </div>
                      {c.progress > 0 && c.progress < 100 && (
                        <div className="h-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-amber-500"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                      )}
                      {c.photos > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Camera className="h-3 w-3" />
                          {c.photos} fotos
                          {c.progress === 100 && (
                            <CheckCircle2 className="ml-auto h-3 w-3 text-emerald-600" />
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Card className="bg-amber-500/5 border-amber-500/30">
        <CardContent className="flex items-start gap-3 p-4">
          <div className="inline-flex size-8 items-center justify-center rounded-md bg-amber-500/15 text-amber-700">
            <Wrench className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">2 ordens de manutenção abertas</div>
            <div className="text-xs text-muted-foreground">
              {properties[3].nickname} · ar-condicionado do quarto principal · orçamento R$ 420 · aguardando peça
            </div>
          </div>
          <Button variant="outline" size="sm">Ver todas</Button>
        </CardContent>
      </Card>
    </div>
  );
}
