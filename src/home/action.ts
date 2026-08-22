"use server";

import { getDomainCustom } from "@/domain/custom";
import { parseDomainHost } from "@/domain/host";
import { getVercelDomainConfig } from "@/vercel/domain";
import { addVercelProjectDomain } from "@/vercel/project";

export type DomainCheck = {
  target: string;
  cname: string | null;
  ipv4: string | null;
  txtDomain: string | null;
  txtValue: string | null;
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
  const project = await addVercelProjectDomain({ name: host });
  const config = await getVercelDomainConfig({ name: host });
  const { cname, ipv4 } = config;
  const { txtDomain, txtValue } = project;
  return { target, cname, ipv4, txtDomain, txtValue };
}
