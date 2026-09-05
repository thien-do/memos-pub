import { DomainCustomReason, getDomainCustom } from "./custom";
import {
  DomainPlatformReason,
  getDomainPlatform,
  hasDomainPlatform,
} from "./platform";

export type DomainRouteReason =
  | { type: "custom"; reason: DomainCustomReason }
  | { type: "platform"; reason: DomainPlatformReason };

type Result =
  | { ok: true; path: string }
  | { ok: false; reason: DomainRouteReason };

function succeed(path: string): Result {
  return { ok: true, path };
}

function failPlatform(reason: DomainPlatformReason): Result {
  return { ok: false, reason: { type: "platform", reason } };
}

function failCustom(reason: DomainCustomReason): Result {
  return { ok: false, reason: { type: "custom", reason } };
}

/**
 * Get a route path suffix from a domain, e.g.,
 * - thien.do → thien-do/blog/2026 (custom)
 * - thien-do.memos.pub → thien-do (platform)
 * - example.com → custom not found
 * - www.memos.pub → platform unsafe
 */
export async function getDomainRoute(domain: string): Promise<Result> {
  if (hasDomainPlatform(domain)) {
    const platform = getDomainPlatform(domain);
    return platform.ok
      ? succeed(platform.target)
      : failPlatform(platform.reason);
  }

  const custom = await getDomainCustom(domain);
  if (custom.ok) return succeed(custom.target);
  return failCustom(custom.reason);
}
