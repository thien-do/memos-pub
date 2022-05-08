// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";
import { fullPathMiddleware } from "./full-path";
import { memberMiddleware } from "./member";
import { subdomainMiddleware } from "./subdomain";

export const appMiddleware: NextMiddleware = (req) => {
	// host: e.g. "thien-do.memos.pub"
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")

	// Skip /api requests
	if (pathname.startsWith("/api")) return NextResponse.next();

	const member = memberMiddleware(req);
	if (member !== null) return member;

	const subdomain = subdomainMiddleware(req);
	if (subdomain !== null) return subdomain;

	const fullPath = fullPathMiddleware(req);
	if (fullPath !== null) return fullPath;

	return NextResponse.next();
};
