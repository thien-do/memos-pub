import { VercelError } from "@vercel/sdk/models/vercelerror.js";
import { getEnvVar } from "@/env";
import { getVercel } from "./instance";

export async function addVercelDomain(params: { name: string }): Promise<void> {
  const { name } = params;
  const idOrName = getEnvVar("MEMOS_VERCEL_PROJECT_ID");
  const vercel = getVercel();

  try {
    await vercel.projects.getProjectDomain({ idOrName, domain: name });
    return;
  } catch (error) {
    const missed = error instanceof VercelError && error.statusCode === 404;
    if (!missed) throw error;
  }

  await vercel.projects.addProjectDomain({
    idOrName,
    requestBody: { name },
  });
}
