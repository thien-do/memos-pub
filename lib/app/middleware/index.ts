import { blogMiddleware } from "@/lib/blog/middleware";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";

export const appMiddleware: NextMiddleware = (req, event) => {
	// host: e.g. "thien-do.memos.pub"
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")

	// Skip /api requests
	if (pathname.startsWith("/api")) return NextResponse.next();

	// Avoid direct access to blog routing
	if (pathname.startsWith(`/_blog`))
		return new NextResponse(null, { status: 404 });

	return blogMiddleware(req, event);
};
