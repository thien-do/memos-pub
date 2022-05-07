import { redirectGitHubFullUrl } from "@/lib/github/middleware/full-url";
import { rewriteBlogGitHubUrl } from "@/lib/github/middleware/rewrite";
import { rewriteMemberRequest } from "@/lib/member/middleware";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";

export const appMiddleware: NextMiddleware = (req) => {
	// host: e.g. "thien-do.memos.pub"
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")

	// Skip /api requests
	if (pathname.startsWith("/api")) return NextResponse.next();

	// Avoid direct access to internal routing
	if (pathname.startsWith(`/_member`))
		return new NextResponse(null, { status: 404 });
	if (pathname.startsWith(`/_github`))
		return new NextResponse(null, { status: 404 });
	// if (pathname.startsWith(`/_blog-gitlab`))
	// 	return new NextResponse(null, { status: 404 });

	const memberRewrite = rewriteMemberRequest(req);
	if (memberRewrite !== null) return memberRewrite;

	const redirect = redirectGitHubFullUrl(req);
	if (redirect !== null) return redirect;

	const rewrite = rewriteBlogGitHubUrl(req);
	if (rewrite !== null) return rewrite;

	return NextResponse.next();
};
