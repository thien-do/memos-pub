import { getVercel } from "./instance";

export async function addVercelDomain(domain: string): Promise<void> {
  const { project, vercel } = getVercel();

  await vercel.projects.addProjectDomain({
    idOrName: project,
    requestBody: { name: domain },
  });
}
