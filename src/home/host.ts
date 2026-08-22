import type { Result } from "@/kit/result";
import { hasPlatform } from "@/domain/platform";

/**
 * Parse a guest-entered domain into a hostname we can claim.
 */
export function parseDomainHost(input: string): Result<string> {
  const trimmed = input.trim().toLowerCase();
  if (trimmed === "") return { ok: false, reason: "Can't use this domain." };

  const withScheme = trimmed.includes("://") ? trimmed : `https://${trimmed}`;

  try {
    const hostname = new URL(withScheme).hostname;
    if (hasPlatform(hostname)) {
      return { ok: false, reason: "Can't use this domain." };
    }
    return { ok: true, value: hostname };
  } catch {
    return { ok: false, reason: "Can't use this domain." };
  }
}
