import { getDomainCustom } from "@/domain/custom";
import { addVercelDomain } from "@/vercel/add";
import { getVercelDomainConfig } from "@/vercel/config";
import { getVercelDomain } from "@/vercel/get";
import { listVercelDomains } from "@/vercel/list";
import { verifyVercelDomain } from "@/vercel/verify";
import { parseDomainHost } from "./host";

export type DomainCheck =
  | { type: "error"; reason: string }
  | {
      type: "ok";
      target: string;
      config: { cname: string | null; ipv4: string | null };
      txt: { domain: string; value: string } | null;
    };

export async function checkDomain(input: string): Promise<DomainCheck> {
  const host = parseDomainHost(input);
  if (host === null) {
    return { type: "error", reason: "Can't use this domain." };
  }

  const target = await getDomainCustom(host);
  if (target === null) {
    return {
      type: "error",
      reason: `Add a TXT record at _memos.${host}. Set it to your GitHub path, for example thien-do or thien-do/blog/notes.`,
    };
  }

  const found = await getVercelDomain(host);
  if (found.type === "not-found") {
    const rows = await listVercelDomains();
    const matched = rows.filter((row) => {
      return host === row.apex || host.endsWith(`.${row.apex}`);
    });
    if (matched.length >= 3) {
      const apex = matched.at(0)?.apex ?? host;
      return {
        type: "error",
        reason: `Only three names per domain. ${apex} is full.`,
      };
    }
    await addVercelDomain(host);
  }

  await verifyVercelDomain(host);
  const project = await getVercelDomain(host);
  if (project.type === "not-found") {
    throw Error("Domain is not on the project");
  }

  const config = await getVercelDomainConfig(host);
  if (project.type === "verified") {
    return { type: "ok", target, config, txt: null };
  }

  const row = project.verification.find((item) => item.type === "TXT");
  if (row === undefined) throw Error("Domain not verified with no TXT");
  const txt = { domain: row.domain, value: row.value };
  return { type: "ok", target, config, txt };
}
