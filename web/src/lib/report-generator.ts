/** Slugs for /app/relatorios/gerar/[template] — ASCII-only paths for produção. */
export const reportGeneratorMeta: Record<string, { title: string; desc: string }> = {
  "extrato-mensal": {
    title: "Extrato mensal do proprietário",
    desc: "PDF com memória de cálculo e anexos.",
  },
  "ocupacao-pdf": {
    title: "Relatório de ocupação",
    desc: "Gráficos e tabela por imóvel.",
  },
  "performance-canais": {
    title: "Performance por canal",
    desc: "Booking, Airbnb, Vrbo e direto com comissão efetiva.",
  },
  "adr-revpar-pdf": {
    title: "ADR & RevPAR",
    desc: "Série histórica e benchmarking entre propriedades.",
  },
  "breakdown-financeiro": {
    title: "Breakdown financeiro",
    desc: "Receitas e despesas categorizadas para fechamento contábil.",
  },
  "desempenho-propriedade": {
    title: "Desempenho por propriedade",
    desc: "Ocupação, ADR, receita e rating por imóvel.",
  },
  "carne-leao": {
    title: "Apoio Carnê-Leão",
    desc: "Base para declaração do proprietário PF.",
  },
  "forecast-90": {
    title: "Forecast 90 dias",
    desc: "Reservas confirmadas + pré-reservas.",
  },
};

/** Legacy slug with special char → canonical */
export function normalizeReportTemplateSlug(raw: string): string | null {
  if (raw === "carnê-leão" || raw === "carne-leao") return "carne-leao";
  return raw in reportGeneratorMeta ? raw : null;
}

export function getReportGeneratorMeta(template: string) {
  const key = normalizeReportTemplateSlug(template);
  if (!key) return null;
  return { key, ...reportGeneratorMeta[key] };
}
