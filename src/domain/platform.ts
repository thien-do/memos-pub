const PLATFORM_DOMAINS = ["memos.pub", "localhost"];

/** Whether the domain is ours to handle */
export function hasDomainPlatform(domain: string): boolean {
  return PLATFORM_DOMAINS.some((root) => {
    return domain === root || domain.endsWith(`.${root}`);
  });
}

export type DomainPlatformReason = "invalid" | "unsafe";

type Result =
  { ok: true; target: string } | { ok: false; reason: DomainPlatformReason };

/**
 * Get blog path from a platform domain, i.e., a sub domain of ours.
 * This could only be "owner", never with "repo" nor "path" here.
 * e.g., "thien-do.memos.pub" → "thien-do"
 */
export function getDomainPlatform(domain: string): Result {
  // e.g., memos.pub
  const found = PLATFORM_DOMAINS.find((root) => domain.endsWith(`.${root}`));
  if (found === undefined) return { ok: false, reason: "invalid" };

  // thien-do.memos.pub -> thien-do
  const suffix = `.${found}`;
  const label = domain.slice(0, suffix.length * -1);

  // Label should be a single GitHub username
  if (
    label === "" ||
    label === "www" ||
    label.includes(".") ||
    label.includes("/")
  )
    return { ok: false, reason: "unsafe" };

  return { ok: true, target: label };
}
