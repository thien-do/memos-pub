import type { Result } from "@/kit/result";
import { getEnvVar } from "@/kit/env";
import { getVercel } from "./instance";

export type VercelDomainDns = {
  cname: Result<string>;
  ipv4: Result<string>;
};

export async function getVercelDomainConfig(params: {
  name: string;
}): Promise<VercelDomainDns> {
  const { name } = params;
  const vercel = getVercel();
  const config = await vercel.domains.getDomainConfig({
    domain: name,
    projectIdOrName: getEnvVar("MEMOS_VERCEL_PROJECT_ID"),
  });
  const cname = config.recommendedCNAME.at(0)?.value;
  const ipv4 = config.recommendedIPv4.at(0)?.value.at(0);
  return {
    cname:
      cname === undefined
        ? { ok: false, reason: "No CNAME" }
        : { ok: true, value: cname },
    ipv4:
      ipv4 === undefined
        ? { ok: false, reason: "No A record" }
        : { ok: true, value: ipv4 },
  };
}
