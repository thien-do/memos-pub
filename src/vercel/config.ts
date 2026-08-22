import { getVercel } from "./instance";

/** Recommended config only */
type Config = {
  cname: string | null;
  ipv4: string | null;
};

export async function getVercelDomainConfig(domain: string): Promise<Config> {
  const { project, vercel } = getVercel();

  const config = await vercel.domains.getDomainConfig({
    domain,
    projectIdOrName: project,
  });

  const cname = config.recommendedCNAME.at(0)?.value ?? null;
  const ipv4 = config.recommendedIPv4.at(0)?.value.at(0) ?? null;
  return { cname, ipv4 };
}
