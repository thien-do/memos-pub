const ROOTS = ["memos.pub", "localhost"];

export function getIsHostPlatform(hostname: string): boolean {
  return ROOTS.some((root) => hostname.endsWith(root));
}

/**
 * Get a potential blog owner from a platform hostname.
 * This could never including repo or segment.
 * e.g., "thien-do.memos.pub" to "thien-do"
 */
export function getHostPlatformOwner(hostname: string): string | null {
  const root = ROOTS.find((root) => hostname.endsWith(`.${root}`));
  if (root === undefined) return null;

  const owner = hostname.replace(`.${root}`, "");
  if (owner === "" || owner === "www") return null;
  if (owner.includes(".")) return null;

  return owner;
}
