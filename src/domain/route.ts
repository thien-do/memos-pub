import { getDomainCustom } from "./custom";
import { getDomainHost } from "./host";
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
  const { host, pathname } = params;

  const hostname = getDomainHost(host);

  // Each rung returns a target that is safe to splice, or null.
  // A separate platform check saves cost in resolving custom domain.
  const target = hasPlatform(hostname)
    ? getDomainPlatform(hostname)
    : await getDomainCustom(hostname);

  if (target !== null) {
    return { kind: "rewrite", path: `/blog/${target}${pathname}` };
  }

  // Blog pages have exactly one public URL: the rewrite above.
  // We should prevent direct access.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return { kind: "stop" };
  }

  // All other routes are handled as ours.
  return { kind: "next" };
}
