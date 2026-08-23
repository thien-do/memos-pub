import { getVercel } from "./instance";
import { VercelDetail, getVercelDetail } from "./detail";

export async function addVercelDomain(domain: string): Promise<VercelDetail> {
  const { project, vercel } = getVercel();

  const body = await vercel.projects.addProjectDomain({
    idOrName: project,
    requestBody: { name: domain },
  });

  const detail = getVercelDetail(body);
  return detail;
}
