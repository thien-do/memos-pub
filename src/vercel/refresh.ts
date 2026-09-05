import { VercelError } from "@vercel/sdk/models/vercelerror";
import { z } from "zod";
import { getVercel } from "./instance";

const MissingTxtRecord = z.object({
  error: z.object({ code: z.literal("missing_txt_record") }),
});

export async function refreshVercelDomain(domain: string): Promise<boolean> {
  const { project, vercel } = getVercel();

  try {
    const result = await vercel.projects.verifyProjectDomain({
      domain,
      idOrName: project,
    });

    return result.verified;
  } catch (error) {
    if (!(error instanceof VercelError) || error.statusCode !== 400)
      throw error;

    let body: unknown;
    try {
      body = JSON.parse(error.body);
    } catch {
      throw error;
    }

    if (MissingTxtRecord.safeParse(body).success) return false;
    throw error;
  }
}
