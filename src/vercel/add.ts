import { getVercel } from "./instance";
import { getVercelVerify, VercelVerify } from "./verify";

interface Result {
  apex: string;
  verify: VercelVerify;
}

/** Fails with 400 if the name is already on the project. */
export async function addVercelDomain(domain: string): Promise<Result> {
  const { project, vercel } = getVercel();

  const body = await vercel.projects.addProjectDomain({
    idOrName: project,
    requestBody: { name: domain },
  });

  const verify = getVercelVerify(body);
  return { apex: body.apexName, verify };
}
