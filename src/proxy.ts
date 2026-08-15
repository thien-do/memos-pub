import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getTenantFromHost } from "@/tenant/host";

export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;

  const host = request.headers.get("host") ?? "";
  const tenant = getTenantFromHost(host);

  if (tenant === null) {
    // The /tenant namespace is reachable only via the rewrite below, never
    // directly, so tenant pages have exactly one public URL each.
    if (pathname === "/tenant" || pathname.startsWith("/tenant/")) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.next();
  }

  const url = new URL(`/tenant/${tenant}${pathname}${search}`, request.url);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
