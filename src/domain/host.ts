import { hasPlatform } from "./platform";

const LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const IPV4 = /^(?:\d{1,3}\.){3}\d{1,3}$/;

/**
 * Parse a guest-entered domain into a hostname we can claim.
 * Null if empty, invalid, or one of ours.
 */
export function parseDomainHost(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  if (trimmed === "") return null;

  const withScheme = trimmed.includes("://") ? trimmed : `https://${trimmed}`;

  let hostname: string;
  try {
    hostname = new URL(withScheme).hostname;
  } catch {
    return null;
  }

  if (hostname.endsWith(".")) hostname = hostname.slice(0, -1);
  if (!isHostname(hostname)) return null;
  if (hasPlatform(hostname)) return null;
  return hostname;
}

function isHostname(value: string): boolean {
  if (IPV4.test(value)) return false;
  const labels = value.split(".");
  if (labels.length < 2) return false;
  return labels.every((label) => LABEL.test(label));
}
