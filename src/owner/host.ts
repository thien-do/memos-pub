const ROOT_DOMAINS = ["memos.pub", "localhost"];

/**
 * An owner is the single label in front of a root domain: "a" in
 * a.memos.pub. GitHub owner names cannot contain dots, so a multi-label
 * subdomain like a.b.memos.pub names no owner.
 *
 * "null" means no owner.
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
