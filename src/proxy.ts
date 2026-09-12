import type { NextRequest } from "next/server";
import type { BlogForm } from "./blog/form";
import { NextResponse } from "next/server";
import { getHostBlog } from "./host/blog";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  if (pathname === "/blog" || pathname.startsWith("/blog/"))
    return new NextResponse("Not Found", { status: 404 });

  let target: string | null;
  let contentPath = pathname;
  if (IS_PREVIEW) {
    if (!pathname.startsWith("/preview/")) return NextResponse.next();
    const [, , owner, ...path] = pathname.split("/");
    if (!owner) return new NextResponse("Not Found", { status: 404 });
    target = owner;
    contentPath = `/${path.join("/")}`;
  } else {
    target = await getHostBlog(request);
  }
  if (target === null) return NextResponse.next();

  const form: BlogForm =
    pathname === "/" ? "root" : pathname.endsWith("/") ? "slash" : "bare";
  const encodedTarget = target.split("/").map(encodeURIComponent).join("/");
  // NextURL would restore the incoming trailing slash after rewriting.
  const url = new URL(request.nextUrl.href);
  url.pathname = `/blog/${form}/${encodedTarget}${contentPath}`.replace(
    /\/$/,
    "",
  );
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots\\.txt$).*)"],
};
