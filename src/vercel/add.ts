import { getVercel } from "./instance";
import { getVercelVerify, VercelVerify } from "./verify";

interface Result {
  verify: VercelVerify
}

export async function addVercelDomain(domain: string): Promise<Result> {
  const { project, vercel } = getVercel();

  const body = await vercel.projects.addProjectDomain({
    idOrName: project,
    requestBody: { name: domain },
  });

  const verify = getVercelVerify(body)
  return { verify}
}
