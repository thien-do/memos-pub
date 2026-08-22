const PLATFORM_DOMAINS = ["memos.pub", "localhost"];

/** Whether the host is ours to handle */
export function hasPlatform(host: string): boolean {
  return PLATFORM_DOMAINS.some((root) => {
    return host === root || host.endsWith(`.${root}`);
  });
}

/**
 * Get blog path from a platform domain, i.e., a sub domain of ours.
 * This could only be "owner", with no "repo" nor "path" here.
 * e.g., "thien-do.memos.pub" → "thien-do"
 */
export function getDomainPlatform(host: string): string | null {
  // e.g., memos.pub
  const found = PLATFORM_DOMAINS.find((root) => host.endsWith(`.${root}`));
  if (found === undefined) return null;

  // thien-do.memos.pub -> thien-do
  const suffix = `.${found}`;
  const label = host.slice(0, suffix.length * -1);

  // Label is a single GitHub username
  if (label === "" || label === "www") return null;
  if (label.includes(".") || label.includes("/")) return null;
  return label;
}
