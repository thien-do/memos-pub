import { VercelError } from "@vercel/sdk/models/vercelerror";
import { getVercel } from "./instance";
import {
  GetProjectDomainResponseBody as VercelBody,
} from "@vercel/sdk/models/getprojectdomainop";
import { getVercelVerify, VercelVerify } from "./verify";
import { refreshVercelDomain } from "./refresh";

type Result =
  | { found: false }
  | { found: true, verify: VercelVerify }

/** null if not found */
async function getDetail(domain: string): Promise<VercelBody | null> {
  const { project, vercel } = getVercel();

  try {
    const detail = await vercel.projects.getProjectDomain({
      domain,
      idOrName: project,
    });
    return detail;
  } catch (error) {
    const missed = error instanceof VercelError && error.statusCode === 404;
    if (missed) return null;
    throw error;
  }
}

/** Return both found and verified status */
export async function getVercelDomain(domain: string): Promise<Result> {
  // Important: verified status may be outdated without refresh
  await refreshVercelDomain(domain)

  const body = await getDetail(domain);
  if (body === null) return { found: false };

  const verify = getVercelVerify(body)
  return { found: true, verify };
}
