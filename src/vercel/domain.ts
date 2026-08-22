import { Vercel } from "@vercel/sdk";
import { z } from "zod";

const NotFound = z.object({ statusCode: z.literal(404) });

function getVercel(): Vercel {
  const token = process.env.VERCEL_TOKEN;
  if (token === undefined || token === "") {
    throw new Error("VERCEL_TOKEN is not set");
  }
  return new Vercel({ bearerToken: token });
}

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
    if (!NotFound.safeParse(error).success) throw error;
  }

  await vercel.projects.addProjectDomain({
    idOrName,
    teamId,
    requestBody: { name },
  });
}
