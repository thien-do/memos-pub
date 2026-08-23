import { addVercelDomain } from "@/vercel/add";
import { listVercelDomains } from "@/vercel/list";
import { VercelProject } from "@/vercel/project";

export type HomeAddReason = "apex-limit";

type Result =
  | ({ ok: true } & VercelProject)
  | { ok: false; reason: HomeAddReason };

export async function addHomeDomain(domain: string): Promise<Result> {
  const exists = await listVercelDomains();

  const matched = exists.filter((exist) => {
    const { apex } = exist;
    return domain === apex || domain.endsWith(`.${apex}`);
  });

  if (matched.length >= 3) return { ok: false, reason: "apex-limit" };

  const { apex, verify } = await addVercelDomain(domain);
  return { ok: true, apex, verify };
}
