import type { NextRequest } from "next/server";
import type { BlogForm } from "./form";
import { NextResponse } from "next/server";

/** Rewrite a resolved blog target and path to the internal route. */
export function getBlogProxy(params: {
  request: NextRequest;
  target: string;
  path: string[];
}): NextResponse {
  const { request, target, path } = params;
  const { pathname } = request.nextUrl;
  const form: BlogForm =
    pathname === "/" ? "root" : pathname.endsWith("/") ? "slash" : "bare";
  const segments = [form, target, ...path].filter(Boolean);

  // NextURL would restore the incoming trailing slash after rewriting.
  const url = new URL(request.nextUrl.href);
  url.pathname = `/blog/${segments.join("/")}`;
  return NextResponse.rewrite(url);
}
