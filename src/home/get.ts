import { getVercelDomain } from "@/vercel/get";
import { refreshVercelDomain } from "@/vercel/refresh";
import { VercelProject } from "@/vercel/project";
import { addHomeDomain, HomeAddReason } from "./add";

type Result =
  | { ok: true; project: VercelProject }
  | { ok: false; reason: HomeAddReason };

export async function getHomeDomain(domain: string): Promise<Result> {
  const detail = await getVercelDomain(domain);
  if (detail.found === false) return addHomeDomain(domain);

  if (detail.project.verify.ok === false) {
    await refreshVercelDomain(domain);
    const again = await getVercelDomain(domain);
    if (again.found === false) throw Error("Domain missing after refresh");
    return { ok: true, project: again.project };
  }

  return { ok: true, project: detail.project };
}
