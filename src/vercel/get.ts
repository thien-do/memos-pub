import { VercelError } from "@vercel/sdk/models/vercelerror";
import { getVercel } from "./instance";
import { GetProjectDomainResponseBody as VercelBody } from "@vercel/sdk/models/getprojectdomainop";
import { getVercelProject, VercelProject } from "./project";

type Result = { found: false } | ({ found: true } & VercelProject);

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

/** Return the project domain if it is already attached. */
export async function getVercelDomain(domain: string): Promise<Result> {
  const body = await getDetail(domain);
  if (body === null) return { found: false };
  return { found: true, ...getVercelProject(body) };
}
