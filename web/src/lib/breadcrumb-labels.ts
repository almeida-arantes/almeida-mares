import { owners, properties, reservations } from "@/lib/mock-data";

/** Rótulos estáticos para segmentos de URL (breadcrumb). */
export const BREADCRUMB_STATIC: Record<string, string> = {
  app: "Painel",
  inicio: "Início",
  calendario: "Calendário",
  reservas: "Reservas",
  mensagens: "Mensagens",
  notificacoes: "Notificações",
  proprietarios: "Proprietários",
  propriedades: "Propriedades",
  financeiro: "Financeiro",
  relatorios: "Relatórios",
  operacao: "Operação",
  integracoes: "Integrações",
  auditoria: "Auditoria",
  configuracoes: "Configurações",
  filtros: "Filtros",
  mensal: "Mensal",
  lista: "Lista",
  ocupacao: "Ocupação",
  nova: "Nova reserva",
  novo: "Novo cadastro",
  gerar: "Gerar",
  conta: "Minha conta",
  empresa: "Empresa",
  equipe: "Equipe",
  templates: "Templates",
  webhooks: "Webhooks",
  "api-keys": "API Keys",
  lgpd: "LGPD",
  plano: "Plano",
  contabil: "Contábil",
  pagamentos: "Pagamentos",
  whatsapp: "WhatsApp",
  airbnb: "Airbnb",
  booking: "Booking.com",
  vrbo: "Vrbo",
  "contas-pagar": "Contas a pagar",
  "contas-receber": "Contas a receber",
  conciliacao: "Conciliação",
  faturas: "Faturas",
  "fluxo-caixa": "Fluxo de caixa",
  repasses: "Repasses",
  canais: "Canais",
  "adr-revpar": "ADR / RevPAR",
  "por-propriedade": "Por propriedade",
  "por-proprietario": "Por proprietário",
  documentos: "Documentos",
  extratos: "Extratos",
  download: "Download",
  painel: "Painel",
  perfil: "Perfil",
  tarifas: "Tarifas",
  fotos: "Fotos",
  custos: "Custos",
  checklist: "Checklist",
  timeline: "Linha do tempo",
  manutencao: "Manutenção",
  estoque: "Estoque",
  "checkin-checkout": "Check-in / Check-out",
  limpeza: "Limpeza",
  aceite: "Aceite",
};

export function resolveBreadcrumbSegment(
  seg: string,
  prev: string | undefined,
  segments: string[],
): string {
  if (prev === "mensagens" && seg !== "filtros") {
    return "Conversa";
  }

  if (prev === "reservas" && seg.startsWith("res_")) {
    const r = reservations.find((x) => x.id === seg);
    if (r) return r.code;
  }

  if (prev === "proprietarios" && seg.startsWith("own_")) {
    const o = owners.find((x) => x.id === seg);
    if (o) return o.name;
  }

  if (prev === "propriedades" && seg.startsWith("prop_")) {
    const p = properties.find((x) => x.id === seg);
    if (p) return p.nickname;
  }

  if (prev === "relatorios" && seg === "gerar") {
    return "Gerar relatório";
  }

  if (segments.includes("gerar") && prev === "gerar") {
    const map: Record<string, string> = {
      "extrato-mensal": "Extrato mensal",
      "desempenho-propriedade": "Desempenho por propriedade",
    };
    return map[seg] ?? BREADCRUMB_STATIC[seg] ?? seg;
  }

  return BREADCRUMB_STATIC[seg] ?? seg;
}
