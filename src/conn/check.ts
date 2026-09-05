"use server";

import { cleanConn, ConnCleanReason } from "./clean";
import { getVercelConfig, VercelConfigReason } from "@/vercel/config";
import { VercelDetailReason } from "@/vercel/detail";
import { getConn, ConnGetReason } from "./get";
import { getHostCustomPath } from "@/host/custom";

/**
 * Custom, routing, and ownership are all DNS.
 * Show them together so the customer can set them in one pass.
 *
 * All-done would be success, not this result.
 */
interface ResultSetup {
  type: "setup";
  custom: boolean;
  config: VercelConfigReason | null;
  verify: VercelDetailReason | null;
}

export type ConnCheckResult =
  | { type: "clean"; reason: ConnCleanReason }
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

  const get = await getConn(domain);
  if (get.ok === false) return { type: "get", reason: get.reason };
  const { apex, verify } = get.detail;

  const config = await getVercelConfig({ apex, domain });
  const custom = await getHostCustomPath(domain);
  if (custom !== null && config.ok && verify.ok)
    return { type: "success", path: custom };

  return {
    type: "setup",
    custom: custom === null,
    config: config.ok ? null : config.reason,
    verify: verify.ok ? null : verify.reason,
  };
}
