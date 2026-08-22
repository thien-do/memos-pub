import { getEnvVar } from "@/kit/env";
import { getVercel } from "./instance";

/** Recommended config only */
type Config = {
  cname: string | null;
  ipv4: string | null;
};

export async function getVercelDomainConfig(params: {
  name: string;
}): Promise<Config> {
  const { name } = params;

  const vercel = getVercel();

  const config = await vercel.domains.getDomainConfig({
    domain: name,
    projectIdOrName: getEnvVar("MEMOS_VERCEL_PROJECT_ID"),
  });

  const cname = config.recommendedCNAME.at(0)?.value ?? null;
  const ipv4 = config.recommendedIPv4.at(0)?.value.at(0) ?? null;

  return { cname, ipv4 };
}
