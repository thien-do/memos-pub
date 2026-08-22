import { BADNAME, NODATA, NOTFOUND, resolveTxt } from "node:dns/promises";
import { z } from "zod";

// DNS error from missing or wrong config, not crash
const NotFound = z.object({
  code: z.enum([NOTFOUND, NODATA, BADNAME]),
});

async function resolveTxtSafe(domain: string): Promise<string[][] | null> {
  try {
    const records = await resolveTxt(`_memos.${domain}`);
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

export type DomainCustomReason = "missing" | "unsafe";

type Result =
  | { ok: true; target: string }
  | { ok: false; reason: DomainCustomReason };

/**
 * Get blog path from a custom domain.
 * This could be as long as they want.
 * e.g., "thien.do" to "thien-do/blog/notes",
 * which is the same as "thien-do.memos.pub/blog/notes".
 */
export async function getDomainCustom(domain: string): Promise<Result> {
  const records = await resolveTxtSafe(domain);
  const value = records?.at(0)?.join("") ?? null;
  if (value === null) return { ok: false, reason: "missing" };
  if (!isSafeTarget(value)) return { ok: false, reason: "unsafe" };
  return { ok: true, target: value };
}
