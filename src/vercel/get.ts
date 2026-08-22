import { VercelError } from "@vercel/sdk/models/vercelerror";
import { getVercel } from "./instance";
import {
  GetProjectDomainResponseBody as VercelBody,
  Verification as VercelVerification,
} from "@vercel/sdk/models/getprojectdomainop";

type Result =
  | { type: "verified" }
  | { type: "not-found" }
  | { type: "not-verified"; verification: VercelVerification[] };

/** null if not found */
async function getDetail(domain: string): Promise<VercelBody | null> {
  const { project, vercel } = getVercel();

  try {
    const detail = await vercel.projects.getProjectDomain({
      idOrName: project,
      domain,
    });
    return detail;
  } catch (error) {
    const missed = error instanceof VercelError && error.statusCode === 404;
    if (missed) return null;
    throw error;
  }
}

export async function getVercelDomain(domain: string): Promise<Result> {
  const detail = await getDetail(domain);

  if (detail === null) {
    return { type: "not-found" };
  }

  if (detail.verified === false) {
    const { verification } = detail;
    if (verification === undefined)
      throw Error("Domain not verified with no verification");
    return { type: "not-verified", verification };
  }

  return { type: "verified" };
}
