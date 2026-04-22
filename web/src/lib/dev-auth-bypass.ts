/**
 * Ambientes em que o bypass de auth para áreas /app e /portal está permitido.
 *
 * - `next dev`: ativo por padrão (desligue com NEXT_PUBLIC_AUTH_DEV_BYPASS=false).
 * - Preview na Vercel: só com NEXT_PUBLIC_AUTH_DEV_BYPASS=true (nunca em production).
 */
export function isAuthDevBypass(): boolean {
  if (process.env.NEXT_PUBLIC_AUTH_DEV_BYPASS === "false") return false;

  if (process.env.NODE_ENV === "development") return true;

  return (
    process.env.VERCEL_ENV === "preview" &&
    process.env.NEXT_PUBLIC_AUTH_DEV_BYPASS === "true"
  );
}
