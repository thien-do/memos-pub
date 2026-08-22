import { getVercel } from "./instance";

interface Reason {
  cname: string | null;
  ipv4: string | null;
}

type Result = { configured: true } | { configured: false; reason: Reason };

export async function getVercelDomainConfig(host: string): Promise<Result> {
  const { project, vercel } = getVercel();

  const config = await vercel.domains.getDomainConfig({
    domain: host,
    projectIdOrName: project,
  });

  if (config.misconfigured === false) return { configured: true };

  const cname = config.recommendedCNAME.at(0)?.value ?? null;
  const ipv4 = config.recommendedIPv4.at(0)?.value.at(0) ?? null;
  const reason: Reason = { cname, ipv4 };
  return { configured: false, reason };
}
