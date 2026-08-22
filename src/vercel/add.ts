import { getProject } from "./instance";

export async function addVercelProjectDomain(params: {
  name: string;
}): Promise<void> {
  const { name } = params;
  const { idOrName, vercel } = getProject();
  await vercel.projects.addProjectDomain({
    idOrName,
    requestBody: { name },
  });
}
