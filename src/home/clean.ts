import { hasPlatform } from "@/domain/platform";

export type HomeCleanReason = "parse" | "platform";

type Result =
  | { ok: true; domain: string }
  | { ok: false; reason: HomeCleanReason };

export function cleanHomeDomain(raw: string): Result {
  const trimmed = raw.trim().toLowerCase();
  const withScheme = trimmed.includes("://") ? trimmed : `https://${trimmed}`;

  const domain = URL.parse(withScheme)?.hostname ?? null;
  if (domain === null) return { ok: false, reason: "parse" };
  if (hasPlatform(domain)) return { ok: false, reason: "platform" };
  return { ok: true, domain };
}
