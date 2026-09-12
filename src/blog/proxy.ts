import type { NextRequest } from "next/server";
import type { BlogForm } from "./form";
import { NextResponse } from "next/server";
import { getHostBlog } from "@/host/blog";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

/** Resolve preview paths or hostnames and route requests to the internal blog. */
export async function getBlogProxy(
  request: NextRequest,
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  if (pathname === "/blog" || pathname.startsWith("/blog/"))
    return new NextResponse("Not Found", { status: 404 });

  if (IS_PREVIEW) {
    if (!pathname.startsWith("/preview/")) return NextResponse.next();
    const [, , owner, ...path] = pathname.split("/");
    if (!owner) return new NextResponse("Not Found", { status: 404 });
    return rewrite({ request, target: owner, path });
  }

  const target = await getHostBlog(request);
  if (target === null) return NextResponse.next();
  const path = pathname.split("/");
  return rewrite({ request, target, path });
}

/** Rewrite a resolved blog target and path to the internal route. */
function rewrite(params: {
  request: NextRequest;
  target: string;
  path: string[];
}): NextResponse {
  const { request, target, path } = params;
  const { pathname } = request.nextUrl;
  const form: BlogForm =
    pathname === "/" ? "root" : pathname.endsWith("/") ? "slash" : "bare";
  const segments = [form, target, ...path].filter(Boolean);

  // NextURL would restore the incoming trailing slash after rewriting.
  const url = new URL(request.nextUrl.href);
  url.pathname = `/blog/${segments.join("/")}`;
  return NextResponse.rewrite(url);
}
