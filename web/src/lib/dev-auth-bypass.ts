/**
 * Só em `next dev`: libera /app e /portal sem sessão.
 * Em `next build` / produção, NODE_ENV é "production" → nunca ativo.
 */
export function isAuthDevBypass(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_AUTH_DEV_BYPASS === "true"
  );
}
