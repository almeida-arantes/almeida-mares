import type { ReactNode } from "react";

export function LegalArticle({
  title,
  subtitle,
  toc,
  children,
}: {
  title: string;
  subtitle?: string;
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 lg:px-6">
      <nav className="hidden lg:block" aria-label="Sumário do documento">
        <div className="sticky top-28 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Nesta página
          </p>
          <ul className="space-y-2 border-l border-border/80 pl-3 text-sm">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <article className="prose prose-neutral min-w-0 dark:prose-invert">
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        {subtitle ? (
          <p className="text-sm text-muted-foreground not-prose">{subtitle}</p>
        ) : null}
        {children}
      </article>
    </div>
  );
}
