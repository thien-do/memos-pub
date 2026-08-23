import { getVercel } from "./instance";
import { getVercelProject, VercelProject } from "./project";

/** Fails with 400 if the name is already on the project. */
export async function addVercelDomain(domain: string): Promise<VercelProject> {
  const { project, vercel } = getVercel();

  const body = await vercel.projects.addProjectDomain({
    idOrName: project,
    requestBody: { name: domain },
  });

  return getVercelProject(body);
}
