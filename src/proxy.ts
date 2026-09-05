import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getHostBlog } from "./host/blog";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

function getHostname(request: NextRequest): string {
  // nextUrl is not reliable, as Vercel may override it
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":").at(0)?.toLowerCase() ?? "";
  return hostname;
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  // No blog routing in preview.
  // Check this first to avoid paying host lookup cost.
  if (IS_PREVIEW) return NextResponse.next();

  const hostname = getHostname(request);

  const blog = await getHostBlog(hostname);
  if (typeof blog === "string") {
    const url = request.nextUrl.clone();
    const target = blog.split("/").map(encodeURIComponent).join("/");
    url.pathname = `/blog/${target}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Prevent direct access to avoid duplicated paths
  const { pathname } = request.nextUrl;
  if (pathname === "/blog" || pathname.startsWith("/blog/"))
    return new NextResponse("Not Found", { status: 404 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
