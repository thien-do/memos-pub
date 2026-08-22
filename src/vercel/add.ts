import { getVercel } from "./instance";

export async function addVercelDomain(host: string): Promise<void> {
  const { project, vercel } = getVercel();

  await vercel.projects.addProjectDomain({
    idOrName: project,
    requestBody: { name: host },
  });
}
