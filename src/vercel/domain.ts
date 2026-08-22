import { VercelError } from "@vercel/sdk/models/vercelerror.js";
import { getVercel } from "./instance";

export async function addVercelDomain(params: { name: string }): Promise<void> {
  const { name } = params;
  const idOrName = process.env.VERCEL_PROJECT_ID;
  if (idOrName === undefined || idOrName === "") {
    throw new Error("VERCEL_PROJECT_ID is not set");
  }

  const vercel = getVercel();
  const teamId = process.env.VERCEL_TEAM_ID;

  try {
    await vercel.projects.getProjectDomain({ idOrName, domain: name, teamId });
    return;
  } catch (error) {
    const missed = error instanceof VercelError && error.statusCode === 404;
    if (!missed) throw error;
  }

  await vercel.projects.addProjectDomain({
    idOrName,
    teamId,
    requestBody: { name },
  });
}
