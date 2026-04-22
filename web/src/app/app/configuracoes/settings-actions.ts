"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  setAccountSettings,
  setCompanySettings,
  type AccountSettings,
  type CompanySettings,
} from "@/lib/app-settings";

const accountSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto.").max(120),
  email: z.string().email("E-mail inválido.").max(255),
});

const companySchema = z.object({
  legalName: z.string().trim().min(3, "Informe a razão social.").max(200),
  cnpj: z.string().trim().min(8, "CNPJ inválido.").max(32),
  address: z.string().trim().min(8, "Endereço muito curto.").max(300),
});

export type SettingsFormState = {
  ok: boolean;
  message?: string;
  savedAt?: string;
  errors?: Partial<Record<string, string>>;
};

export async function saveAccountSettingsAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const parsed = accountSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      errors: {
        name: f.name?.[0],
        email: f.email?.[0],
      },
    };
  }
  await setAccountSettings(parsed.data as AccountSettings);
  revalidatePath("/app/configuracoes/conta");
  return {
    ok: true,
    message: "Dados da conta salvos.",
    savedAt: new Date().toISOString(),
  };
}

export async function saveCompanySettingsAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const parsed = companySchema.safeParse({
    legalName: formData.get("legalName"),
    cnpj: formData.get("cnpj"),
    address: formData.get("address"),
  });
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      errors: {
        legalName: f.legalName?.[0],
        cnpj: f.cnpj?.[0],
        address: f.address?.[0],
      },
    };
  }
  await setCompanySettings(parsed.data as CompanySettings);
  revalidatePath("/app/configuracoes/empresa");
  return {
    ok: true,
    message: "Dados da empresa salvos.",
    savedAt: new Date().toISOString(),
  };
}
