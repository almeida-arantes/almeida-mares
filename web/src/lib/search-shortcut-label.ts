/** Rótulo da busca global para exibir no botão (client-safe). */
export function getSearchShortcutLabel(): string {
  if (typeof window === "undefined") return "⌘K";
  return /Mac|iPhone|iPod|iPad/i.test(navigator.platform) ? "⌘K" : "Ctrl+K";
}
