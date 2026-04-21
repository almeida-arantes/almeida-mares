export const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export const brlCents = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const pct = (value: number, digits = 1) =>
  `${value.toFixed(digits).replace(".", ",")}%`;

export const compactNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const dateShort = (d: Date | string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(typeof d === "string" ? new Date(d) : d);

export const dateLong = (d: Date | string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(typeof d === "string" ? new Date(d) : d);

export const monthYear = (d: Date | string) =>
  new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(typeof d === "string" ? new Date(d) : d);

export const relativeFromNow = (d: Date | string) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const diff = (date.getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ["second", 60],
    ["minute", 60],
    ["hour", 24],
    ["day", 7],
    ["week", 4.34524],
    ["month", 12],
    ["year", Number.POSITIVE_INFINITY],
  ];
  let value = diff;
  for (const [unit, amount] of divisions) {
    if (Math.abs(value) < amount) return rtf.format(Math.round(value), unit);
    value /= amount;
  }
  return "";
};

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
