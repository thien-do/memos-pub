import { getDomainCustom } from "./custom";
import { parseDomainHost } from "./host";

/** TXT target for a guest-entered domain. Null if host or record is missing. */
export async function checkDomainTxt(input: string): Promise<string | null> {
  const host = parseDomainHost(input);
  if (host === null) return null;
  return getDomainCustom(host);
}
