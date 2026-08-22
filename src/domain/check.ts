import { getVercelDomainConfig } from "@/vercel/domain";
import {
  addVercelProjectDomain,
  getVercelProjectDomain,
} from "@/vercel/project";
import { getDomainCustom } from "./custom";
import { parseDomainHost } from "./host";

export type DomainCheck = {
  target: string;
  config: { cname: string | null; apex: string | null };
  verify: { txt: { domain: string; value: string } | null };
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
  const { cname, ipv4 } = await getVercelDomainConfig({ name: host });
  const config = { cname, apex: ipv4 };
  const verify = { txt: project.txt };
  return { target, config, verify };
}
