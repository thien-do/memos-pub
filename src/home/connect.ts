import { DomainCustomReason, getDomainCustom } from "@/domain/custom";
import { cleanHomeDomain, HomeCleanReason } from "./clean";
import { VercelVerifyReason } from "@/vercel/verify";
import { getVercelDomainConfig, VercelConfigReason } from "@/vercel/config";
import { getHomeDomain } from "./get";
import { HomeAddReason } from "./add";

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

  const attached = await getHomeDomain(domain);
  if (attached.ok === false) return { type: "add", reason: attached.reason };
  const { apex, verify } = attached;

  const config = await getVercelDomainConfig({ apex, domain });
  if (config.ok && verify.ok) return { type: "success" };
  return {
    type: "setup",
    config: config.ok ? null : config.reason,
    verify: verify.ok ? null : verify.reason,
  };
}
