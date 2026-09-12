import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getBlogForm } from "./form";
import { getBlogUrl } from "./url";

/** Rewrite a blog target from hostname routing or preview parsing to its cached route. */
export function getBlogProxy(params: {
  request: NextRequest;
  target: string;
  pathname: string;
}): NextResponse {
  const { request, target, pathname } = params;
  // NextURL would restore the incoming trailing slash after rewriting.
  const url = new URL(request.nextUrl.href);
  url.pathname = getBlogUrl({
    target,
    pathname,
    form: getBlogForm(request.nextUrl.pathname),
  });
  return NextResponse.rewrite(url);
}

/** Read /blog/owner/path preview URLs instead of resolving a hostname. */
export function getBlogProxyPreview(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/blog/")) return NextResponse.next();

  const [, , owner, ...path] = pathname.split("/");
  if (!owner) return new NextResponse("Not Found", { status: 404 });

  return getBlogProxy({
    request,
    target: owner,
    pathname: `/${path.join("/")}`,
  });
}
