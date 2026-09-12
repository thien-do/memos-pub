import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getHostBlog } from "./host/blog";
import { getBlogProxy } from "./blog/proxy";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  if (pathname === "/blog" || pathname.startsWith("/blog/"))
    return new NextResponse("Not Found", { status: 404 });

  if (IS_PREVIEW) {
    if (!pathname.startsWith("/preview/")) return NextResponse.next();
    const [, , owner, ...path] = pathname.split("/");
    if (!owner) return new NextResponse("Not Found", { status: 404 });
    return getBlogProxy({ request, target: owner, path });
  }

  const target = await getHostBlog(request);
  if (target === null) return NextResponse.next();
  const path = pathname.split("/");
  return getBlogProxy({ request, target, path });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots\\.txt$).*)"],
};
