// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";
import { rewriteTenantMiddleware } from "./tenant";

/*
Re-route `foo.memos.pub/bar/baz` into `memos.pub/_tenants/foo/bar/baz`. Extended
from https://github.com/vercel/platforms/blob/main/pages/_middleware.js
*/
export const middleware: NextMiddleware = (req, event) => {
	// host: e.g. "thien-do.memos.pub"
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")

	// Skip /api requests
	if (pathname.startsWith("/api")) return NextResponse.next();

	// Avoid direct access to tenant routing
	if (pathname.startsWith(`/_tenants`))
		return new NextResponse(null, { status: 404 });

	return rewriteTenantMiddleware(req, event);
};
