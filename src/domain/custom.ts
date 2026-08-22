import { BADNAME, NODATA, NOTFOUND, resolveTxt } from "node:dns/promises";
import { z } from "zod";

// DNS error from missing or wrong config, not crash
const NotFound = z.object({
  code: z.enum([NOTFOUND, NODATA, BADNAME]),
});

async function resolveTxtSafe(host: string): Promise<string[][] | null> {
  try {
    const records = await resolveTxt(`_memos.${host}`);
    return records;
  } catch (error) {
    if (NotFound.safeParse(error).success) return null;
    throw error;
  }
}

// A target mounts a sub-path, so "" or a "." / ".." segment could
// climb out of /blog and alias the whole namespace or our own pages.
function isSafeTarget(target: string): boolean {
  return target.split("/").every((s) => s !== "" && s !== "." && s !== "..");
}

/**
 * Get blog path from a custom domain.
 * This could be as long as they want.
 * e.g., "thien.do" to "thien-do/blog/notes",
 * which is the same as "thien-do.memos.pub/blog/notes".
 */
export async function getDomainCustom(host: string): Promise<string | null> {
  const records = await resolveTxtSafe(host);
  const value = records?.at(0)?.join("") ?? null;
  if (value === null || !isSafeTarget(value)) return null;
  return value;
}
