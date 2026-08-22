import { VercelError } from "@vercel/sdk/models/vercelerror.js";
import { getEnvVar } from "@/kit/env";
import { getVercel } from "./instance";

export async function addVercelDomain(params: { name: string }): Promise<void> {
  const { name } = params;
  const idOrName = getEnvVar("MEMOS_VERCEL_PROJECT_ID");
  const vercel = getVercel();

  try {
    await vercel.projects.getProjectDomain({ idOrName, domain: name });
    return;
  } catch (error) {
    const missed = error instanceof VercelError && error.statusCode === 404;
    if (!missed) throw error;
  }

  await vercel.projects.addProjectDomain({
    idOrName,
    requestBody: { name },
  });
}

export type VercelDomainDns = {
  cname: string | null;
  ipv4: string | null;
};

export async function getVercelDomainDns(params: {
  name: string;
}): Promise<VercelDomainDns> {
  const { name } = params;
  const vercel = getVercel();
  const projectIdOrName = getEnvVar("MEMOS_VERCEL_PROJECT_ID");
  const config = await vercel.domains.getDomainConfig({
    domain: name,
    projectIdOrName,
  });
  const cname = config.recommendedCNAME.at(0)?.value ?? null;
  const ipv4 = config.recommendedIPv4.at(0)?.value.at(0) ?? null;
  return { cname, ipv4 };
}
