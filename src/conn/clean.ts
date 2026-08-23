import { hasDomainPlatform } from "@/domain/platform";

export type ConnCleanReason = "parse" | "platform";

type Result =
  | { ok: true; domain: string }
  | { ok: false; reason: ConnCleanReason };

export function cleanConn(raw: string): Result {
  let input = raw.trim().toLowerCase();
  // URL class requires scheme
  input = input.includes("://") ? input : `https://${input}`;
  const domain = URL.parse(input)?.hostname ?? null;

  if (domain === null) return { ok: false, reason: "parse" };
  if (hasDomainPlatform(domain)) return { ok: false, reason: "platform" };

  return { ok: true, domain };
}
