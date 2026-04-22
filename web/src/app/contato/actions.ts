"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120),
  email: z.string().email("E-mail inválido.").max(255),
  subject: z.string().trim().min(3, "Assunto muito curto.").max(200),
  message: z.string().trim().min(10, "Mensagem muito curta (mín. 10 caracteres).").max(5000),
});

export type ContactFormState = {
  ok: boolean;
  message?: string;
  sentAt?: string;
  failedAt?: string;
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      errors: {
        name: f.name?.[0],
        email: f.email?.[0],
        subject: f.subject?.[0],
        message: f.message?.[0],
      },
    };
  }

  const payload = parsed.data;
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "almeida_mares_contact",
          ...payload,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return {
          ok: false,
          message:
            "Não foi possível enviar agora. Tente de novo em instantes ou use outro canal de contato.",
          failedAt: new Date().toISOString(),
        };
      }
    } catch {
      return {
        ok: false,
        message: "Falha ao enviar. Verifique sua conexão ou tente outro canal.",
        failedAt: new Date().toISOString(),
      };
    }
  } else {
    console.info("[contato] formulário recebido", {
      ...payload,
      submittedAt: new Date().toISOString(),
    });
  }

  return {
    ok: true,
    message: "Mensagem enviada. Responderemos em até um dia útil.",
    sentAt: new Date().toISOString(),
  };
}
