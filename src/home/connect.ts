import { getDomainCustom } from "@/domain/custom";
import { cleanHomeDomain } from "./clean";
import { Verification as VercelVerification } from "@vercel/sdk/models/getprojectdomainop";
import { listVercelDomains } from "@/vercel/list";
import { VercelVerify } from "@/vercel/verify";
import { getVercelDomain } from "@/vercel/get";

export type ConnectHomeDomainResult =
  | { type: "success" }
  | { type: "custom-not-found" }
  | { type: "apex-limit" }
  | { type: "domain-invalid" };

export async function connectHomeDomain(
  input: string,
): Promise<ConnectHomeDomainResult> {
  const domain = cleanHomeDomain(input);
  if (domain === null) return { type: "domain-invalid" };

  const detail = await getVercelDomain(domain)

  if (detail.found === false) {
    // add
    // show config
    return
  }

  if (detail.verify)

  const custom = await getDomainCustom(domain);
  if (custom === null) return { type: "custom-not-found" };

  // We only rely on found or not found here.
  const found = await getVercelDomain(host);

  switch (found.type) {
    case "not-found": {
      // add
      // verify
      break;
    }
    case "not-verified": {
      found.verification;
      break;
    }
    case "verified": {
      break;
    }
  }

  // Add if not exist
  if (found.type === "not-found") {
    const result = await addSafe(host);
    if (result.type === "limit") return { type: "apex-limit" };
  }

  // Refresh in case we add
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

  return { type: "success" };
}
