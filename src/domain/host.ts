import { hasPlatform } from "./platform";

/**
 * Parse a guest-entered domain into a hostname we can claim.
 * Null if empty, unparsable, or one of ours.
 */
export function parseDomainHost(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  if (trimmed === "") return null;

  const withScheme = trimmed.includes("://") ? trimmed : `https://${trimmed}`;

  try {
    const hostname = new URL(withScheme).hostname;
    if (hasPlatform(hostname)) return null;
    return hostname;
  } catch {
    return null;
  }
}
