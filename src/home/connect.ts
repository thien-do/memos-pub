import { DomainCustomReason, getDomainCustom } from "@/domain/custom";
import { cleanHomeDomain, HomeCleanReason } from "./clean";
import { VercelVerify, VercelVerifyReason } from "@/vercel/verify";
import { getVercelDomain } from "@/vercel/get";
import { getVercelDomainConfig, VercelConfigReason } from "@/vercel/config";
import { addHomeDomain, HomeAddReason } from "./add";

type Result =
  | { type: "success" }
  | { type: "custom"; reason: DomainCustomReason }
  | { type: "add"; reason: HomeAddReason }
  | { type: "clean"; reason: HomeCleanReason }
  | {
      type: "setup";
      config: VercelConfigReason | null;
      verify: VercelVerifyReason | null;
    };

export type ConnectHomeDomainResult = Result;

export async function connectHomeDomain(
  input: string,
): Promise<ConnectHomeDomainResult> {
  const clean = cleanHomeDomain(input);
  if (clean.ok === false) return { type: "clean", reason: clean.reason };
  const { domain } = clean;

  // Always check for custom first to avoid adding redundant domains
  const custom = await getDomainCustom(domain);
  if (custom.ok === false) return { type: "custom", reason: custom.reason };

  const detail = await getVercelDomain(domain);
  let apex: string;
  let verify: VercelVerify;
  if (detail.found) {
    apex = detail.apex;
    verify = detail.verify;
  } else {
    const result = await addHomeDomain(domain);
    if (result.ok === false) return { type: "add", reason: result.reason };
    apex = result.apex;
    verify = result.verify;
  }

  const config = await getVercelDomainConfig({ apex, domain });
  if (config.ok && verify.ok) return { type: "success" };
  return {
    type: "setup",
    config: config.ok ? null : config.reason,
    verify: verify.ok ? null : verify.reason,
  };
}
