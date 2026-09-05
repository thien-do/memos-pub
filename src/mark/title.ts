/**
 * First ATX heading in markdown.
 * Setext and HTML headings are skipped.
 */
export function getMarkTitle(text: string): string | null {
  for (const line of text.split("\n")) {
    const match = /^#{1,6}\s+(.*)$/.exec(line);
    const raw = match
      ?.at(1)
      ?.trim()
      .replace(/\s+#+$/, "");
    if (raw !== undefined && raw !== "") return raw;
  }
  return null;
}
