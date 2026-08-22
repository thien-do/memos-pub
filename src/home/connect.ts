import { getDomainCustom } from "@/domain/custom";
import { cleanHomeDomain } from "./clean";
import { VercelVerify, VercelVerifyReason } from "@/vercel/verify";
import { getVercelDomain } from "@/vercel/get";
import { getVercelDomainConfig, VercelConfigReason } from "@/vercel/config";
import { addHomeDomain } from "./add";

type Result =
  | { type: "success" }
  | { type: "custom" }
  | { type: "apex-limit" }
  | { type: "clean" }
  | { type: "config"; reason: VercelConfigReason }
  | { type: "verify"; reason: VercelVerifyReason };

export type ConnectHomeDomainResult = Result;

function pipeVerify(verify: VercelVerify): Result {
  return verify.ok
    ? { type: "success" }
    : { type: "verify", reason: verify.reason };
}

export async function connectHomeDomain(
  input: string,
): Promise<ConnectHomeDomainResult> {
  const domain = cleanHomeDomain(input);
  if (domain === null) return { type: "clean" };

  // Always check for custom first to avoid adding redundant domains
  const custom = await getDomainCustom(domain);
  if (custom === null) return { type: "custom" };

  // We could add domain at this point, and display verified status,
  // but it's easier to reason by doing things in serial
  const config = await getVercelDomainConfig(domain);
  if (config.ok === false) return { type: "config", reason: config.reason };

  const detail = await getVercelDomain(domain);

  if (detail.found === false) {
    const result = await addHomeDomain(domain);
    return result.ok ? pipeVerify(result.verify) : { type: result.reason };
  }

  return pipeVerify(detail.verify);
}
