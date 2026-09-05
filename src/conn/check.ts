"use server";

import { cleanConn, ConnCleanReason } from "./clean";
import { getVercelConfig, VercelConfigReason } from "@/vercel/config";
import { VercelDetailReason } from "@/vercel/detail";
import { getConn, ConnGetReason } from "./get";
import { getHostCustomPath } from "@/host/custom";

/**
 * Host doesn't expose its reason (for good reason)
 * so we have only one generic reason here.
 */
type PathReason = "invalid";

/**
 * These are separated steps from technical perspective,
 * but it's super useful to show them at once,
 * as they are all settings in one place for the users.
 */
interface ResultSetup {
  type: "setup";
  path: PathReason | null;
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

  // Calling get here will add a real entry to our Vercel project,
  // even before the user has created their _memos entry.
  // This is not ideal but it allows us to show all DNS entries at once.
  const get = await getConn(domain);
  if (get.ok === false) return { type: "get", reason: get.reason };

  const { apex, verify } = get.detail;
  const config = await getVercelConfig({ apex, domain });
  const path = await getHostCustomPath(domain);

  if (path !== null && config.ok && verify.ok) return { type: "success", path };

  return {
    type: "setup",
    path: path ? null : "invalid",
    config: config.ok ? null : config.reason,
    verify: verify.ok ? null : verify.reason,
  };
}
