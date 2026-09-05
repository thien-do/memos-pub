import { BADNAME, NODATA, NOTFOUND, resolveTxt } from "node:dns/promises";
import { z } from "zod";

// DNS error from missing or wrong config, not crash
const NotFound = z.object({
  code: z.enum([NOTFOUND, NODATA, BADNAME]),
});

async function resolveTxtSafe(hostname: string): Promise<string[][] | null> {
  try {
    return await resolveTxt(`_memos.${hostname}`);
  } catch (error) {
    const notFound = NotFound.safeParse(error);
    if (notFound.success) return null;
    throw error;
  }
}

function isSafe(path: string): boolean {
  return path.split("/").every((segment) => {
    return segment !== "..";
  });
}

/**
 * Get a potential blog path from a custom hostname.
 * This could include owner, repo, and folders.
 * e.g., "thien.do" to "thien-do/blog/2026".
 */
export async function getHostCustomPath(
  hostname: string,
): Promise<string | null> {
  const records = await resolveTxtSafe(hostname);

  const path = records?.at(0)?.join("") ?? null;
  if (path === null) return null;
  if (isSafe(path) === false) return null;

  return path;
}
