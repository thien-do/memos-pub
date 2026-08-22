import { getVercel } from "./instance";

/**
 * Ask Vercel to refresh the verification status of a domain.
 * This does not return the challenges, so we need a follow-up get.
 */
export async function refreshVercelDomain(domain: string): Promise<boolean> {
  const { project, vercel } = getVercel();

  const result = await vercel.projects.verifyProjectDomain({
    domain,
    idOrName: project,
  });

  return result.verified
}
