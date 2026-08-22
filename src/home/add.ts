import { addVercelDomain } from "@/vercel/add";
import { listVercelDomains } from "@/vercel/list";
import { VercelVerify } from "@/vercel/verify";

type Result =
    | { ok: boolean, verify: VercelVerify }
    | { ok: false, reason: "limit"}

export async function addHomeDomain(domain: string): Promise<Result> {
  const exists = await listVercelDomains();

  const matched = exists.filter((exist) => {
    const { apex } = exist;
    return domain === apex || domain.endsWith(`.${apex}`);
  });

  if (matched.length >= 3) return { ok: false, reason: "limit" }

  const { verify } = await addVercelDomain(domain);
  return { ok: true, verify }
}
