import { getProject } from "./instance";

export async function verifyVercelProjectDomain(params: {
  name: string;
}): Promise<void> {
  const { name } = params;
  const { idOrName, vercel } = getProject();
  await vercel.projects.verifyProjectDomain({
    idOrName,
    domain: name,
  });
}
