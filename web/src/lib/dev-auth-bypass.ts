/**
 * Ambientes em que o bypass de auth para áreas /app e /portal está permitido.
 *
 * - `next dev`: ativo por padrão (desligue com NEXT_PUBLIC_AUTH_DEV_BYPASS=false).
 * - Qualquer deploy (inclui Production na Vercel): defina `NEXT_PUBLIC_AUTH_DEV_BYPASS=true`
 *   no painel do projeto — necessário para links diretos ao painel sem login.
 */
export function isAuthDevBypass(): boolean {
  if (process.env.NEXT_PUBLIC_AUTH_DEV_BYPASS === "false") return false;

  if (process.env.NEXT_PUBLIC_AUTH_DEV_BYPASS === "true") return true;

  return process.env.NODE_ENV === "development";
}
