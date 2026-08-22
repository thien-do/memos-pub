"use server";

import { getDomainCustom } from "@/domain/custom";
import { parseDomainHost } from "@/domain/host";
import { addVercelDomain, getVercelDomainDns } from "@/vercel/domain";

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
  await addVercelDomain({ name: host });
  const dns = await getVercelDomainDns({ name: host });
  return { target, cname: dns.cname, ipv4: dns.ipv4 };
}
