import { getVercel } from "./instance";

interface Reason {
  /**
   * cname for subdomain, ipv4 for apex.
   * Technically we could use cname for apex, but it depends on the provider,
   * so it's simpler to switch by apex.
   */
  kind: "cname" | "ipv4";
  name: string;
  value: string;
}

export type VercelConfigReason = Reason;

type Result = { ok: true } | { ok: false; reason: Reason };

/**
 * Return config required to point the domain to Vercel.
 * This does not move the domain to our project if it's else where on Vercel.
 * Even more, we require "apex" here to decide the recommended config.
 * Fetch project domain for this apex.
 */
export async function getVercelDomainConfig(params: {
  domain: string;
  apex: string;
}): Promise<Result> {
  const { apex, domain } = params;
  const { project, vercel } = getVercel();

  const config = await vercel.domains.getDomainConfig({
    domain,
    projectIdOrName: project,
  });

  if (config.misconfigured === false) return { ok: true };

  if (domain === apex) {
    const value = config.recommendedIPv4.at(0)?.value.at(0) ?? null;
    if (value === null) throw Error("apex domain but ipv4 not found");
    return { ok: false, reason: { kind: "ipv4", name: "@", value } };
  }

  const value = config.recommendedCNAME.at(0)?.value ?? null;
  if (value === null) throw Error("apex domain but ipv4 not found");
  const name = domain.replace(`.${apex}`, "");
  return { ok: false, reason: { kind: "cname", name, value } };
}
