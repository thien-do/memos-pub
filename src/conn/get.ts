import { VercelDetail } from "@/vercel/detail";
import { getVercelDomain } from "@/vercel/get";
import { refreshVercelDomain } from "@/vercel/refresh";
import { addConn, ConnAddReason } from "./add";

type Result =
  | { ok: true; detail: VercelDetail }
  // get only rely on add for now
  | { ok: false; reason: ConnAddReason };

/**
 * Get intentionally adds if not found
 */
export async function getConn(domain: string): Promise<Result> {
  const get = await getVercelDomain(domain);

  // This is surprisingly simpler than found lol,
  // as the verification after adding is latest.
  if (get.found === false) return addConn(domain);

  // Can only return if verified, as verification could be outdated otherwise.
  if (get.detail.verify.ok) return { ok: true, detail: get.detail };

  // Vercel doesn't auto refresh the domain verification,
  // so false verified may be outdated.
  // We need to force a refresh to get the correct verification.
  await refreshVercelDomain(domain);

  // We _could_ rely on refresh and update the existing "get",
  // but it's simpler and cheap enough to just get again.
  const again = await getVercelDomain(domain);
  if (again.found === false) throw Error("Domain missing after refresh");
  return { ok: true, detail: again.detail };
}
