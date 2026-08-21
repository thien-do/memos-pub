const PLATFORM_DOMAINS = ["memos.pub", "localhost"];

/** Whether the hostname is ours to handle */
export function hasPlatform(hostname: string): boolean {
  return PLATFORM_DOMAINS.some((root) => {
    return hostname === root || hostname.endsWith(`.${root}`);
  });
}

/**
 * Get blog path from a platform domain, i.e., a sub domain of ours.
 * This could only be "owner", with no "repo" nor "path" here.
 * e.g., "thien-do.memos.pub" → "thien-do"
 */
export function getDomainPlatform(hostname: string): string | null {
  // e.g., memos.pub
  const found = PLATFORM_DOMAINS.find((root) => hostname.endsWith(`.${root}`));
  if (found === undefined) return null;

  // thien-do.memos.pub -> thien-do
  const suffix = `.${found}`;
  const label = hostname.slice(0, suffix.length * -1);

  // Label is a single GitHub username
  if (label === "" || label === "www") return null;
  if (label.includes(".") || label.includes("/")) return null;
  return label;
}
