import { getIsHostPlatform } from "@/host/platform";

export type ConnCleanReason = "parse" | "unsafe";

type Result =
  | { ok: true; domain: string }
  | { ok: false; reason: ConnCleanReason };

export function cleanConn(raw: string): Result {
  let input = raw.trim().toLowerCase();
  // URL class requires scheme
  input = input.includes("://") ? input : `https://${input}`;
  const domain = URL.parse(input)?.hostname ?? null;

  if (domain === null) return { ok: false, reason: "parse" };
  if (getIsHostPlatform(domain)) return { ok: false, reason: "unsafe" };

  return { ok: true, domain };
}
