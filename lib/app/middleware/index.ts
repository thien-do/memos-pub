import { blogGitlabMwRewrite } from "@/lib/blog-gitlab/middleware/rewrite";
import { blogMwRedirect } from "@/lib/blog/middleware/redirect";
import { blogMwRewrite } from "@/lib/blog/middleware/rewrite";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";

export const appMiddleware: NextMiddleware = (req) => {
	// host: e.g. "thien-do.memos.pub"
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")

	// Skip /api requests
	if (pathname.startsWith("/api")) return NextResponse.next();

	// Avoid direct access to internal routing
	if (pathname.startsWith(`/_blog`))
		return new NextResponse(null, { status: 404 });
	if (pathname.startsWith(`/_blog-gitlab`))
		return new NextResponse(null, { status: 404 });

	const redirect = blogMwRedirect(req);
	if (redirect !== null) return redirect;

	// GitLab should be preferred over GitHub rewrite
	const glRewrite = blogGitlabMwRewrite(req);
	if (glRewrite !== null) return glRewrite;

	const rewrite = blogMwRewrite(req);
	if (rewrite !== null) return rewrite;

	return NextResponse.next();
};
