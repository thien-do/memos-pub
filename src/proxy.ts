import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getHostBlog } from "./host/blog";
import { getBlogProxy, getBlogProxyPreview } from "./blog/proxy";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  if (IS_PREVIEW) return getBlogProxyPreview(request);

  const { pathname } = request.nextUrl;
  const target = await getHostBlog(request);
  if (target !== null) return getBlogProxy({ request, target, pathname });

  // Prevent direct access to avoid duplicated paths
  if (pathname === "/blog" || pathname.startsWith("/blog/"))
    return new NextResponse("Not Found", { status: 404 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots\\.txt$).*)"],
};
