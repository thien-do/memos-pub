"use server";

import { connectCheckClean } from "./clean";
import { getVercelConfig } from "@/vercel/config";
import { connectCheckEnsure } from "./ensure";
import { getHostCustomPath } from "@/host/custom";
import { connectCheckRecords } from "./records";
import type { ConnectCheckResult } from "./result";

export async function connectCheckMain(
  _prev: ConnectCheckResult | undefined,
  formData: FormData,
): Promise<ConnectCheckResult> {
  const raw = formData.get("domain");
  if (typeof raw !== "string") throw Error("invalid domain input");

  const inputPath = formData.get("path") ?? "";
  if (typeof inputPath !== "string") throw Error("invalid path input");

  const clean = connectCheckClean(raw);
  if (clean.ok === false) return { type: "clean", reason: clean.reason };
  const { domain } = clean;

  // Register before checking DNS so we can return all required records at once.
  const ensure = await connectCheckEnsure(domain);
  if (ensure.ok === false) return { type: "ensure", reason: ensure.reason };

  const { apex, verify } = ensure.detail;
  const config = await getVercelConfig({ apex, domain });
  const path = await getHostCustomPath(domain);

  if (path !== null && config.ok && verify.ok) return { type: "success", path };

  return {
    type: "setup",
    records: connectCheckRecords({
      domain,
      path,
      inputPath,
      config: config.ok ? null : config.reason,
      verify: verify.ok ? null : verify.reason,
    }),
  };
}
