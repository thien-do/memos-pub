/**
 * Drop auto ".md" so lists and links match routing.
 * Leave remote URLs and hashes in place.
 */
export function dropAutoMd(url: string): string {
  if (url.includes("://") || url.startsWith("mailto:")) return url;

  const hash = url.indexOf("#");
  const path = hash === -1 ? url : url.slice(0, hash);
  const rest = hash === -1 ? "" : url.slice(hash);

  return path.endsWith(".md") ? `${path.slice(0, -".md".length)}${rest}` : url;
}
