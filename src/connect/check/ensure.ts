import type { VercelDetail } from "@/vercel/detail";
import { addVercelDomain } from "@/vercel/add";
import { getVercelDomain } from "@/vercel/get";
import { listVercelDomains } from "@/vercel/list";
import { refreshVercelDomain } from "@/vercel/refresh";

export type ConnectCheckEnsureReason = "apex-limit";

type Result =
  | { ok: true; detail: VercelDetail }
  | { ok: false; reason: ConnectCheckEnsureReason };

export async function connectCheckEnsure(domain: string): Promise<Result> {
  const detail = await get(domain);
  if (detail === null) return add(domain);
  return { ok: true, detail };
}

async function get(domain: string): Promise<VercelDetail | null> {
  const current = await getVercelDomain(domain);

  if (current.found === false) return null;
  if (current.detail.verify.ok) return current.detail;

  // Refresh unverified domains so repeated checks can pick up DNS changes.
  await refreshVercelDomain(domain);

  const again = await getVercelDomain(domain);
  if (again.found === false) throw Error("Domain missing after refresh");
  return again.detail;
}

async function add(domain: string): Promise<Result> {
  const exists = await listVercelDomains();

  const matched = exists.filter((exist) => {
    const { apex } = exist;
    return domain === apex || domain.endsWith(`.${apex}`);
  });

  if (matched.length >= 3) return { ok: false, reason: "apex-limit" };

  const detail = await addVercelDomain(domain);
  return { ok: true, detail };
}
