import { VercelError } from "@vercel/sdk/models/vercelerror";
import { getVercel } from "./instance";
import { GetProjectDomainResponseBody as VercelBody } from "@vercel/sdk/models/getprojectdomainop";
import { getVercelDetail, VercelDetail } from "./detail";

type Result = { found: false } | { found: true; detail: VercelDetail };

/** null if not found */
async function getOrNull(domain: string): Promise<VercelBody | null> {
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

/**
 * Return the status of the domain as attached to our project.
 * Not attached (not found) is a handled status here.
 */
export async function getVercelDomain(domain: string): Promise<Result> {
  const body = await getOrNull(domain);
  if (body === null) return { found: false };
  return { found: true, detail: getVercelDetail(body) };
}
