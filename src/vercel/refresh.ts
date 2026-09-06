import { VercelError } from "@vercel/sdk/models/vercelerror";
import { z } from "zod";
import { getVercel } from "./instance";

const MissingTxtRecord = z.object({
  error: z.object({ code: z.literal("missing_txt_record") }),
});

/**
 * Ask Vercel to refresh the verification status of a domain in our project.
 * This does not return the challenges.
 * It only ensures the next get is updated.
 */
export async function refreshVercelDomain(domain: string): Promise<void> {
  const { project, vercel } = getVercel();

  try {
    await vercel.projects.verifyProjectDomain({
      domain,
      idOrName: project,
    });
  } catch (error) {
    // This is surprisingly complicated, but Vercel doesn't type missing txt,
    // but it's an expected case for us when users change path
    // _after_ we added the record.
    if (!(error instanceof VercelError) || error.statusCode !== 400)
      throw error;

    try {
      const body: unknown = JSON.parse(error.body);
      if (MissingTxtRecord.safeParse(body).success) return;
    } catch {
      // Keep the original SDK error if its body is not JSON.
    }
    throw error;
  }
}
