/** Perfis de proprietários aceitos no login (espelha o seed mock até existir API). */
const DEFAULT_OWNERS: { id: string; name: string; email: string }[] = [
  { id: "own_01", name: "Ricardo Mendonça", email: "ricardo.m@gmail.com" },
  { id: "own_02", name: "Fernanda Arantes", email: "fe.arantes@outlook.com" },
  { id: "own_03", name: "João Paulo Vasconcelos", email: "jpvasconcelos@icloud.com" },
  { id: "own_04", name: "Beatriz Nogueira Lima", email: "bea.nogueira@gmail.com" },
  { id: "own_05", name: "Construtora Maré Alta Ltda.", email: "financeiro@marealta.com.br" },
];

export function getOwnerLoginEmails(): string[] {
  const fromEnv = process.env.AUTH_OWNER_EMAILS?.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (fromEnv?.length) return fromEnv;
  return DEFAULT_OWNERS.map((o) => o.email.toLowerCase());
}

export function isStaffEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const extra = process.env.AUTH_STAFF_EMAILS?.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (extra?.includes(normalized)) return true;
  const domain = (process.env.AUTH_STAFF_EMAIL_DOMAIN ?? "almeidamares.com.br").toLowerCase();
  return normalized.endsWith(`@${domain}`);
}

export function findOwnerProfile(email: string): { id: string; name: string; email: string } | null {
  const normalized = email.trim().toLowerCase();
  const fromEnv = process.env.AUTH_OWNER_EMAILS?.trim();
  if (fromEnv) {
    if (!getOwnerLoginEmails().includes(normalized)) return null;
    const local = normalized.split("@")[0]?.replace(/[._]/g, " ") ?? "Proprietário";
    const name = local
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return { id: `own_${normalized}`, name, email: normalized };
  }
  const row = DEFAULT_OWNERS.find((o) => o.email.toLowerCase() === normalized);
  return row ? { id: row.id, name: row.name, email: row.email.toLowerCase() } : null;
}

export function staffDisplayName(email: string): string {
  const local = email.split("@")[0] ?? "Equipe";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
