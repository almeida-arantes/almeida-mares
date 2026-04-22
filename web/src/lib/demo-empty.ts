/**
 * Append `?demo=vazio` to the URL to preview empty states with the same mock backend.
 * Omit the param in normal navigation (lists stay populated).
 */
export type AppSearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function demoEmptyList<T>(items: T[], searchParams: AppSearchParams): Promise<T[]> {
  const sp = await searchParams;
  const raw = sp.demo;
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "vazio") return [];
  return items;
}
