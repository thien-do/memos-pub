import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routeDomain } from "@/domain/route";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  // This is more reliable than nextUrl.hostname,
  // which could be overriden by Vercel, both local and remote.
  const host = request.headers.get("host") ?? "";
  // Drop port
  const domain = host.split(":").at(0) ?? "";
  const { pathname } = request.nextUrl;
  const route = await routeDomain({ domain, pathname });

  switch (route.kind) {
    case "rewrite": {
      const path = `${route.path}${request.nextUrl.search}`;
      const url = new URL(path, request.url);
      return NextResponse.rewrite(url);
    }
    case "next":
      return NextResponse.next();
    case "stop":
      return new NextResponse("Not Found", { status: 404 });
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
