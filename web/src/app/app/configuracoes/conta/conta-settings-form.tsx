"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { saveAccountSettingsAction, type SettingsFormState } from "../settings-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: SettingsFormState = { ok: false };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando…" : "Salvar alterações"}
    </Button>
  );
}

export function ContaSettingsForm({
  defaultName,
  defaultEmail,
}: {
  defaultName: string;
  defaultEmail: string;
}) {
  const [state, action] = useActionState(saveAccountSettingsAction, initial);
  const lastSaved = useRef<string | null>(null);

  useEffect(() => {
    if (!state.ok || !state.savedAt) return;
    if (lastSaved.current === state.savedAt) return;
    lastSaved.current = state.savedAt;
    toast.success(state.message ?? "Salvo.");
  }, [state]);

  return (
    <form action={action} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="acc-name">Nome</Label>
        <Input
          id="acc-name"
          name="name"
          defaultValue={defaultName}
          aria-invalid={!!state.errors?.name}
        />
        {state.errors?.name ? (
          <p className="text-xs text-destructive" role="alert">
            {state.errors.name}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="acc-email">E-mail</Label>
        <Input
          id="acc-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={defaultEmail}
          aria-invalid={!!state.errors?.email}
        />
        {state.errors?.email ? (
          <p className="text-xs text-destructive" role="alert">
            {state.errors.email}
          </p>
        ) : null}
      </div>
      <Submit />
    </form>
  );
}
