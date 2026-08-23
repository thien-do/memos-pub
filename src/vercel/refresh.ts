import { getVercel } from "./instance";

/**
 * Ask Vercel to refresh the verification status of a domain in our project.
 * This does not return the challenges.
 * It only ensures the next get is updated.
 */
export async function refreshVercelDomain(domain: string): Promise<boolean> {
  const { project, vercel } = getVercel();

  const result = await vercel.projects.verifyProjectDomain({
    domain,
    idOrName: project,
  });

  return result.verified;
}
