import { getDomainCustom } from "./custom";
import { getDomainPlatform, hasPlatform } from "./platform";

export type DomainRoute =
  // Rewrite into the internal blog namespace
  | { kind: "rewrite"; path: string }
  // Internal namespace
  | { kind: "stop" }
  // Our own pages: landing and such
  | { kind: "next" };

/** Where a request should go, decided on plain strings */
export async function routeDomain(params: {
  host: string;
  pathname: string;
}): Promise<DomainRoute> {
  const { host: header, pathname } = params;

  // Drop port.
  const host = header.split(":").at(0)?.toLowerCase() ?? "";

  // Each path returns a target that is safe to splice, or null.
  // A separate platform check saves cost in resolving custom domain.
  const target = hasPlatform(host)
    ? getDomainPlatform(host)
    : await getDomainCustom(host);

  if (target !== null) {
    return { kind: "rewrite", path: `/blog/${target}${pathname}` };
  }

  // "Blog" should be accessed via the rewrite above only.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return { kind: "stop" };
  }

  // All other routes are handled as ours.
  return { kind: "next" };
}
