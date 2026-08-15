const ROOT_DOMAINS = ["memos.pub", "localhost"];

/**
 * "thien-do.memos.pub" → "thien-do"
 * `null` means no owner
 */
export function getOwnerFromHost(host: string): string | null {
  const hostname = host.split(":").at(0)?.toLowerCase() ?? null;
  if (hostname === null) throw new Error(`Could not parse host "${host}"`);

  for (const root of ROOT_DOMAINS) {
    const suffix = `.${root}`;
    if (!hostname.endsWith(suffix)) continue;

    const label = hostname.slice(0, -suffix.length);
    if (label === "" || label === "www" || label.includes(".")) return null;
    return label;
  }

  return null;
}
