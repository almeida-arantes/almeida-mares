"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { submitContactForm, type ContactFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Enviando…" : "Enviar mensagem"}
    </Button>
  );
}

export function ContatoForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const lastSentAt = useRef<string | null>(null);
  const lastFailedAt = useRef<string | null>(null);

  useEffect(() => {
    if (!state.ok || !state.sentAt) return;
    if (lastSentAt.current === state.sentAt) return;
    lastSentAt.current = state.sentAt;
    toast.success(state.message ?? "Enviado.");
    formRef.current?.reset();
  }, [state]);

  useEffect(() => {
    if (state.ok || !state.failedAt || state.errors) return;
    if (lastFailedAt.current === state.failedAt) return;
    lastFailedAt.current = state.failedAt;
    toast.error(state.message ?? "Não foi possível enviar.");
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" placeholder="Seu nome" aria-invalid={!!state.errors?.name} />
          {state.errors?.name ? (
            <p className="text-xs text-destructive" role="alert">
              {state.errors.name}
            </p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email ? (
            <p className="text-xs text-destructive" role="alert">
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="subject">Assunto</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Ex.: Proposta de gestão para temporada"
          aria-invalid={!!state.errors?.subject}
        />
        {state.errors?.subject ? (
          <p className="text-xs text-destructive" role="alert">
            {state.errors.subject}
          </p>
        ) : null}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Como podemos ajudar?"
          className="min-h-[120px]"
          aria-invalid={!!state.errors?.message}
        />
        {state.errors?.message ? (
          <p className="text-xs text-destructive" role="alert">
            {state.errors.message}
          </p>
        ) : null}
      </div>
      <SubmitButton />
    </form>
  );
}
