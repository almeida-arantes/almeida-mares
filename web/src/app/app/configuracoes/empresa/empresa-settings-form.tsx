"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { saveCompanySettingsAction, type SettingsFormState } from "../settings-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: SettingsFormState = { ok: false };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="md:col-span-2 w-fit" disabled={pending}>
      {pending ? "Salvando…" : "Salvar dados da empresa"}
    </Button>
  );
}

export function EmpresaSettingsForm({
  legalName,
  cnpj,
  address,
}: {
  legalName: string;
  cnpj: string;
  address: string;
}) {
  const [state, action] = useActionState(saveCompanySettingsAction, initial);
  const lastSaved = useRef<string | null>(null);

  useEffect(() => {
    if (!state.ok || !state.savedAt) return;
    if (lastSaved.current === state.savedAt) return;
    lastSaved.current = state.savedAt;
    toast.success(state.message ?? "Salvo.");
  }, [state]);

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="co-legal">Razão social</Label>
        <Input
          id="co-legal"
          name="legalName"
          defaultValue={legalName}
          aria-invalid={!!state.errors?.legalName}
        />
        {state.errors?.legalName ? (
          <p className="text-xs text-destructive md:col-span-2" role="alert">
            {state.errors.legalName}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="co-cnpj">CNPJ</Label>
        <Input
          id="co-cnpj"
          name="cnpj"
          defaultValue={cnpj}
          aria-invalid={!!state.errors?.cnpj}
        />
        {state.errors?.cnpj ? (
          <p className="text-xs text-destructive md:col-span-2" role="alert">
            {state.errors.cnpj}
          </p>
        ) : null}
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="co-address">Endereço fiscal</Label>
        <Input
          id="co-address"
          name="address"
          defaultValue={address}
          aria-invalid={!!state.errors?.address}
        />
        {state.errors?.address ? (
          <p className="text-xs text-destructive" role="alert">
            {state.errors.address}
          </p>
        ) : null}
      </div>
      <Submit />
    </form>
  );
}
