export function propertyDetailNav(id: string) {
  return [
    { href: `/app/propriedades/${id}`, label: "Visão geral" },
    { href: `/app/propriedades/${id}/canais`, label: "Canais" },
    { href: `/app/propriedades/${id}/tarifas`, label: "Tarifas" },
    { href: `/app/propriedades/${id}/fotos`, label: "Fotos" },
    { href: `/app/propriedades/${id}/custos`, label: "Custos" },
    { href: `/app/propriedades/${id}/checklist`, label: "Checklist" },
  ];
}
