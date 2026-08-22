import { getVercelDomainConfig, type VercelDomainDns } from "@/vercel/domain";
import {
  addVercelProjectDomain,
  getVercelProjectDomain,
} from "@/vercel/project";
import { getDomainCustom } from "./custom";
import { parseDomainHost } from "./host";

export type DomainCheck = {
  target: string;
  dns: VercelDomainDns;
  txt: { domain: string; value: string } | null;
};

export async function checkDomain(input: string): Promise<DomainCheck | null> {
  const host = parseDomainHost(input);
  if (host === null) return null;
  const target = await getDomainCustom(host);
  if (target === null) return null;
  let project = await getVercelProjectDomain({ name: host });
  if (project === null) {
    project = await addVercelProjectDomain({ name: host });
  }
  const dns = await getVercelDomainConfig({ name: host });
  return { target, dns, txt: project.txt };
}
