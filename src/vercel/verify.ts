import { getVercel } from "./instance";

export async function verifyVercelDomain(host: string): Promise<void> {
  const { project: idOrName, vercel } = getVercel();

  await vercel.projects.verifyProjectDomain({ idOrName, domain: host });
}
