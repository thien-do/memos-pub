"use server";

import { cleanConn, ConnCleanReason } from "./clean";
import { getVercelConfig, VercelConfigReason } from "@/vercel/config";
import { VercelDetailReason } from "@/vercel/detail";
import { getConn, ConnGetReason } from "./get";
import { getHostCustomPath } from "@/host/custom";

/**
 * This could be 2 separate results,
 * but that requires users to complete them separately.
 * UX-wise it's better to let them know all at once,
 * as they are all DNS settings usually in one place.
 *
 * Btw both "null" would be runtime error,
 * even though we haven't put that into type.
 */
interface ResultSetup {
  type: "setup";
  config: VercelConfigReason | null;
  verify: VercelDetailReason | null;
}

export type ConnCheckResult =
  | { type: "clean"; reason: ConnCleanReason }
  | { type: "custom" }
  | { type: "get"; reason: ConnGetReason }
  | ResultSetup
  | { type: "success"; path: string };

export async function checkConnAction(
  _prev: ConnCheckResult | undefined,
  formData: FormData,
): Promise<ConnCheckResult> {
  const raw = formData.get("domain");
  if (typeof raw !== "string") throw Error("invalid domain input");

  const clean = cleanConn(raw);
  if (clean.ok === false) return { type: "clean", reason: clean.reason };
  const { domain } = clean;

  // Always check for custom first to avoid adding any domain and waste our
  // project domain limit for real users.
  const custom = await getHostCustomPath(domain);
  if (custom === null) return { type: "custom" };

  const get = await getConn(domain);
  if (get.ok === false) return { type: "get", reason: get.reason };
  const { apex, verify } = get.detail;

  const config = await getVercelConfig({ apex, domain });
  if (config.ok && verify.ok) return { type: "success", path: custom };

  return {
    type: "setup",
    config: config.ok ? null : config.reason,
    verify: verify.ok ? null : verify.reason,
  };
}
