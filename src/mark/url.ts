/**
 * Drop auto ".md" so links match routing.
 * Absolute URLs stay. Search and hash stay.
 */
export function dropAutoMd(href: string): string {
  // Absolute (https:, mailto:, ...) is not auto-routed.
  if (URL.canParse(href) || href.startsWith("//")) return href;

  const parsed = new URL(href, "https://mark.local");
  const extra = `${parsed.search}${parsed.hash}`;
  const path = extra === "" ? href : href.slice(0, -extra.length);
  if (!path.endsWith(".md")) return href;
  return `${path.slice(0, -".md".length)}${extra}`;
}
