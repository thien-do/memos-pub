import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getDomainRoute } from "@/domain/route";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  // This is more reliable than nextUrl.hostname,
  // which could be overriden by Vercel, both local and remote.
  const host = request.headers.get("host") ?? "";
  // Drop port and case. Host is case-insensitive.
  const domain = host.split(":").at(0)?.toLowerCase() ?? "";
  const { pathname } = request.nextUrl;

  // Avoid duplicate content over internal blog path
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const isPreview = process.env.VERCEL_ENV === "preview";
  const notFound = new NextResponse("Not Found", { status: 404 });
  if (isBlog && isPreview === false) return notFound;

  // Route to blog path from domain
  const route = await getDomainRoute(domain);
  if (route.ok) {
    const url = request.nextUrl.clone();
    url.pathname = `/blog/${route.path}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (route.reason.type === "custom" || route.reason.reason === "unsafe")
    return new NextResponse(route.reason.reason, { status: 400 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
