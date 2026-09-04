import { getDomainCustom } from "./custom";
import { getDomainPlatform, hasDomainPlatform } from "./platform";

export type DomainRoute =
  // Rewrite into the internal blog namespace
  | { kind: "rewrite"; path: string }
  // Internal namespace
  | { kind: "stop" }
  // Our own pages: landing and such
  | { kind: "next" };

/** Local apex and Vercel preview may open /blog without an owner host. */
function allowsBlogPath(domain: string): boolean {
  if (domain === "localhost" || domain === "127.0.0.1") return true;
  return process.env.VERCEL_ENV === "preview";
}

/** Where a request should go, decided on plain strings */
export async function routeDomain(params: {
  domain: string;
  pathname: string;
}): Promise<DomainRoute> {
  const { domain, pathname } = params;

  // Each path returns a target that is safe to splice, or null.
  // A separate platform check saves cost in resolving custom domain.
  let target: string | null;
  if (hasDomainPlatform(domain)) {
    target = getDomainPlatform(domain);
  } else {
    const custom = await getDomainCustom(domain);
    target = custom.ok ? custom.target : null;
  }

  if (target !== null) {
    return { kind: "rewrite", path: `/blog/${target}${pathname}` };
  }

  // Public hosts use the owner subdomain. Preview and local apex may
  // open /blog directly so a deployment URL can show a post.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    if (allowsBlogPath(domain)) return { kind: "next" };
    return { kind: "stop" };
  }

  // All other routes are handled as ours.
  return { kind: "next" };
}
