import { hasPlatform } from "@/domain/platform";

/**
 * Parse a guest-entered domain into a hostname we can claim.
 */
export function parseDomainHost(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  if (trimmed === "") return null;

  const withScheme = trimmed.includes("://") ? trimmed : `https://${trimmed}`;

  try {
    const host = new URL(withScheme).hostname;
    if (hasPlatform(host)) return null;
    return host;
  } catch {
    return null;
  }
}
