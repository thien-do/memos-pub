import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getHostBlog } from "./host/blog";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

type Init = NonNullable<Parameters<typeof NextResponse.next>[0]>;

/** We rely on the original pathname for trailing slash redirect */
function addPathname(request: NextRequest): Init {
  const headers = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  headers.set("x-memos-pathname", pathname);
  return { request: { headers } };
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const options = addPathname(request);

  // Previews use the blog route directly.
  if (IS_PREVIEW) return NextResponse.next(options);

  const blog = await getHostBlog(request);
  if (typeof blog === "string") {
    const url = request.nextUrl.clone();
    const target = blog.split("/").map(encodeURIComponent).join("/");
    url.pathname = `/blog/${target}${url.pathname}`;
    return NextResponse.rewrite(url, options);
  }

  // Prevent direct access to avoid duplicated paths
  const { pathname } = request.nextUrl;
  if (pathname === "/blog" || pathname.startsWith("/blog/"))
    return new NextResponse("Not Found", { status: 404 });

  return NextResponse.next(options);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
