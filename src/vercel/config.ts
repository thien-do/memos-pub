import { getVercel } from "./instance";

interface Reason {
  cname: string | null;
  ipv4: string | null;
}

export type VercelConfigReason = Reason

type Result = | { ok: true } | { ok: false; reason: Reason };

export async function getVercelDomainConfig(domain: string): Promise<Result> {
  const { project, vercel } = getVercel();

  const config = await vercel.domains.getDomainConfig({
    domain,
    projectIdOrName: project,
  });

  if (config.misconfigured === false) return { ok: true };

  const cname = config.recommendedCNAME.at(0)?.value ?? null;
  const ipv4 = config.recommendedIPv4.at(0)?.value.at(0) ?? null;
  const reason: Reason = { cname, ipv4 };
  return { ok: false, reason };
}
