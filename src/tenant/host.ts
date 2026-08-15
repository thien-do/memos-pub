const ROOT_DOMAINS = ["memos.pub", "localhost"];

/**
 * A tenant is the single label in front of a root domain: "a" in
 * a.memos.pub. GitHub usernames cannot contain dots, so a multi-label
 * subdomain like a.b.memos.pub names no tenant.
 *
 * "null" means no tenant.
 */
export function getTenantFromHost(host: string): string | null {
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
