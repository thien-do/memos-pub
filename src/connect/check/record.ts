import type { VercelDetail } from "@/vercel/detail";
import { addVercelDomain } from "@/vercel/add";
import { getVercelDomain } from "@/vercel/get";
import { listVercelDomains } from "@/vercel/list";
import { refreshVercelDomain } from "@/vercel/refresh";

export type ConnectCheckRecordReason = "apex-limit";

type Result =
  | { ok: true; detail: VercelDetail }
  | { ok: false; reason: ConnectCheckRecordReason };

async function get(hostname: string): Promise<VercelDetail | null> {
  const current = await getVercelDomain(hostname);

  if (current.found === false) return null;
  if (current.detail.verify.ok) return current.detail;

  // This is tricky: Vercel doesn't auto refresh verify status,
  // so a false verify after get could be outdated,
  // and we need to refresh before telling the user.
  //
  // Also, we don't want to refresh before get,
  // as we need to both handle domain not found and pay a redundant refresh.
  await refreshVercelDomain(hostname);
  const again = await getVercelDomain(hostname);

  // This is mostly a TypeScript guard.
  // In practice this could only happen if the domain is removed during refresh.
  if (again.found === false) throw Error("Domain missing after refresh");

  return again.detail;
}

async function add(hostname: string): Promise<Result> {
  const exists = await listVercelDomains();

  const matched = exists.filter((exist) => {
    const { apex } = exist;
    return hostname === apex || hostname.endsWith(`.${apex}`);
  });

  if (matched.length >= 3) return { ok: false, reason: "apex-limit" };

  // Unlike get, the verify status after add is always latest
  const detail = await addVercelDomain(hostname);
  return { ok: true, detail };
}

export async function ensureConnectCheckRecord(
  hostname: string,
): Promise<Result> {
  const detail = await get(hostname);
  if (detail === null) return add(hostname);
  return { ok: true, detail };
}
