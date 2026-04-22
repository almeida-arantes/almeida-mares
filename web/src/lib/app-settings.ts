import { cookies } from "next/headers";

export const ACCOUNT_COOKIE = "am_settings_account_v1";
export const COMPANY_COOKIE = "am_settings_company_v1";

const ONE_YEAR = 60 * 60 * 24 * 365;

export type AccountSettings = { name: string; email: string };
export type CompanySettings = { legalName: string; cnpj: string; address: string };

export async function getAccountSettings(fallback: AccountSettings): Promise<AccountSettings> {
  const jar = await cookies();
  const raw = jar.get(ACCOUNT_COOKIE)?.value;
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as Partial<AccountSettings>;
    return {
      name: typeof parsed.name === "string" ? parsed.name : fallback.name,
      email: typeof parsed.email === "string" ? parsed.email : fallback.email,
    };
  } catch {
    return fallback;
  }
}

export async function setAccountSettings(data: AccountSettings) {
  const jar = await cookies();
  jar.set(ACCOUNT_COOKIE, JSON.stringify(data), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR,
  });
}

export const defaultCompanySettings: CompanySettings = {
  legalName: "Almeida Mares Gestão de Imóveis LTDA",
  cnpj: "48.***.***/0001-72",
  address: "Av. Oceânica, 880 — sala 302, Salvador, BA",
};

export async function getCompanySettings(): Promise<CompanySettings> {
  const jar = await cookies();
  const raw = jar.get(COMPANY_COOKIE)?.value;
  if (!raw) return defaultCompanySettings;
  try {
    const parsed = JSON.parse(raw) as Partial<CompanySettings>;
    return {
      legalName:
        typeof parsed.legalName === "string" ? parsed.legalName : defaultCompanySettings.legalName,
      cnpj: typeof parsed.cnpj === "string" ? parsed.cnpj : defaultCompanySettings.cnpj,
      address:
        typeof parsed.address === "string" ? parsed.address : defaultCompanySettings.address,
    };
  } catch {
    return defaultCompanySettings;
  }
}

export async function setCompanySettings(data: CompanySettings) {
  const jar = await cookies();
  jar.set(COMPANY_COOKIE, JSON.stringify(data), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR,
  });
}
