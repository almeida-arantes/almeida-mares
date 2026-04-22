/**
 * URL pública do site (SEO, metadataBase, links absolutos).
 * Defina NEXT_PUBLIC_SITE_URL no deploy (ex.: https://www.almeidamares.com.br).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export function getSiteMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}
