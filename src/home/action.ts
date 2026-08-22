"use server";

import { getDomainCustom } from "@/domain/custom";
import { parseDomainHost } from "@/domain/host";
import { getVercelDomainConfig } from "@/vercel/domain";
import { addVercelProjectDomain } from "@/vercel/project";

export type DomainCheck = {
  target: string;
  cname: string | null;
  ipv4: string | null;
};

export async function checkDomainAction(
  _prev: DomainCheck | null | undefined,
  formData: FormData,
): Promise<DomainCheck | null> {
  const raw = formData.get("host");
  if (typeof raw !== "string") return null;
  const host = parseDomainHost(raw);
  if (host === null) return null;
  const target = await getDomainCustom(host);
  if (target === null) return null;
  await addVercelProjectDomain({ name: host });
  const config = await getVercelDomainConfig({ name: host });
  return { target, cname: config.cname, ipv4: config.ipv4 };
}
