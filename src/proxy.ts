import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getOwnerFromHost } from "@/owner/host";

export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;

  const host = request.headers.get("host") ?? "";
  const owner = getOwnerFromHost(host);

  if (owner === null) {
    // The /owner namespace is reachable only via the rewrite below, never
    // directly, so owner pages have exactly one public URL each.
    if (pathname === "/owner" || pathname.startsWith("/owner/")) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.next();
  }

  const url = new URL(`/owner/${owner}${pathname}${search}`, request.url);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
