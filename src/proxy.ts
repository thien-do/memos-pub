import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getHostBlog } from "./host/blog";
import { getBlogRewritePath, getBlogUrlForm } from "./blog/url";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  let contentPath = pathname;
  let blog: string | null = null;
  if (IS_PREVIEW) {
    if (!pathname.startsWith("/blog/")) return NextResponse.next();
    const [, , owner, ...path] = pathname.split("/");
    if (!owner) return new NextResponse("Not Found", { status: 404 });
    try {
      blog = decodeURIComponent(owner);
      if (blog.includes("/") || blog === "." || blog === "..")
        return new NextResponse("Not Found", { status: 404 });
    } catch {
      return new NextResponse("Not Found", { status: 404 });
    }
    contentPath = `/${path.join("/")}`;
  } else {
    blog = await getHostBlog(request);
  }
  if (typeof blog === "string") {
    const url = request.nextUrl.clone();
    url.pathname = getBlogRewritePath({
      target: blog,
      pathname: contentPath,
      form: getBlogUrlForm(pathname),
    });
    return NextResponse.rewrite(url);
  }

  // Prevent direct access to avoid duplicated paths
  if (pathname === "/blog" || pathname.startsWith("/blog/"))
    return new NextResponse("Not Found", { status: 404 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots\\.txt$).*)"],
};
