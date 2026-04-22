import { redirect } from "next/navigation";

import { reservations } from "@/lib/mock-data";

export default function MensagensIndexPage() {
  const first =
    reservations.find((r) => r.status !== "cancelada") ?? reservations[0];
  if (!first) redirect("/app/inicio");
  redirect(`/app/mensagens/${first.id}`);
}
