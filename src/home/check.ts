import { getDomainCustom } from "@/domain/custom";
import { toResult, type Result } from "@/kit/result";
import { addVercelProjectDomain } from "@/vercel/add";
import { getVercelDomainConfig } from "@/vercel/config";
import { getVercelProjectDomain, listVercelProjectDomains } from "@/vercel/get";
import { verifyVercelProjectDomain } from "@/vercel/verify";
import { parseDomainHost } from "./host";

export type DomainCheck =
  | {
      ok: true;
      target: string;
      config: { cname: Result<string>; ipv4: Result<string> };
      verify: { txt: Result<{ domain: string; value: string }> };
    }
  | { ok: false; reason: string };

export async function checkDomain(input: string): Promise<DomainCheck> {
  const host = parseDomainHost(input);
  if (!host.ok) return host;
  const target = await getDomainCustom(host.value);
  if (target === null) {
    return {
      ok: false,
      reason: `Add a TXT record at _memos.${host.value}. Set it to your GitHub path, for example thien-do or thien-do/blog/notes.`,
    };
  }
  const found = await getVercelProjectDomain({ name: host.value });
  if (!found.ok) {
    const rows = await listVercelProjectDomains();
    const matched = rows.filter((row) => {
      return host.value === row.apex || host.value.endsWith(`.${row.apex}`);
    });
    if (matched.length >= 3) {
      const apex = matched.at(0)?.apex ?? host.value;
      return {
        ok: false,
        reason: `Only three names per domain. ${apex} is full.`,
      };
    }
    await addVercelProjectDomain({ name: host.value });
  }
  await verifyVercelProjectDomain({ name: host.value });
  const project = await getVercelProjectDomain({ name: host.value });
  if (!project.ok) {
    throw new Error("Domain is not on the project");
  }
  const dns = await getVercelDomainConfig({ name: host.value });
  const cname = toResult(dns.cname, "No CNAME");
  const ipv4 = toResult(dns.ipv4, "No A record");
  const config = { cname, ipv4 };
  if (project.value.verified) {
    const txt = { ok: false as const, reason: "Already verified" };
    return { ok: true, target, config, verify: { txt } };
  }
  const txt = { ok: true as const, value: project.value.txt };
  return { ok: true, target, config, verify: { txt } };
}
