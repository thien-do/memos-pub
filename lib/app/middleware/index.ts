import { redirectGitHubFullUrl } from "@/lib/blog-github/middleware/full-url";
import { rewriteBlogGitHubUrl } from "@/lib/blog-github/middleware/rewrite";
import { rewriteBlogGitLabUrl } from "@/lib/blog-gitlab/middleware/rewrite";
import { rewriteMemberRequest } from "@/lib/blog-member/middleware/rewrite";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";

export const appMiddleware: NextMiddleware = (req) => {
	// host: e.g. "thien-do.memos.pub"
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")

	// Skip /api requests
	if (pathname.startsWith("/api")) return NextResponse.next();

	// Avoid direct access to internal routing
	if (pathname.startsWith(`/_blog-github`))
		return new NextResponse(null, { status: 404 });
	if (pathname.startsWith(`/_blog-gitlab`))
		return new NextResponse(null, { status: 404 });

	const memberRewrite = rewriteMemberRequest(req);
	if (memberRewrite !== null) return memberRewrite;

	const redirect = redirectGitHubFullUrl(req);
	if (redirect !== null) return redirect;

	// GitLab should be preferred over GitHub rewrite
	const glRewrite = rewriteBlogGitLabUrl(req);
	if (glRewrite !== null) return glRewrite;

	const rewrite = rewriteBlogGitHubUrl(req);
	if (rewrite !== null) return rewrite;

	return NextResponse.next();
};
