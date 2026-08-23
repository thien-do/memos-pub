import { getVercelDomain } from "@/vercel/get";
import { refreshVercelDomain } from "@/vercel/refresh";
import { VercelProject } from "@/vercel/project";
import { addHomeDomain, HomeAddReason } from "./add";

type Result =
  | ({ ok: true } & VercelProject)
  | { ok: false; reason: HomeAddReason };

export async function getHomeDomain(domain: string): Promise<Result> {
  const detail = await getVercelDomain(domain);
  if (detail.found === false) return addHomeDomain(domain);

  if (detail.verify.ok === false) {
    await refreshVercelDomain(domain);
    const again = await getVercelDomain(domain);
    if (again.found === false) throw Error("Domain missing after refresh");
    return { ok: true, apex: again.apex, verify: again.verify };
  }

  return { ok: true, apex: detail.apex, verify: detail.verify };
}
