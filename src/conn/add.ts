import { addVercelDomain } from "@/vercel/add";
import { listVercelDomains } from "@/vercel/list";
import { VercelDetail } from "@/vercel/detail";

export type ConnAddReason = "apex-limit";

type Result =
  | { ok: true; detail: VercelDetail }
  | { ok: false; reason: ConnAddReason };

export async function addConn(domain: string): Promise<Result> {
  const exists = await listVercelDomains();

  const matched = exists.filter((exist) => {
    const { apex } = exist;
    return domain === apex || domain.endsWith(`.${apex}`);
  });

  if (matched.length >= 3) return { ok: false, reason: "apex-limit" };

  const detail = await addVercelDomain(domain);
  return { ok: true, detail };
}
