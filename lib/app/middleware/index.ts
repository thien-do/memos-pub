import { redirectBlogGitHubUrl } from "@/lib/blog-github/middleware/redirect";
import { rewriteBlogGitHubUrl } from "@/lib/blog-github/middleware/rewrite";
import { rewriteBlogGitLabUrl } from "@/lib/blog-gitlab/middleware/rewrite";
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

	// Custom domain experiment
	const { host } = req.nextUrl;
	if (host === "memo.mocmeo.blog") {
		const url = req.nextUrl.clone();
		// https://huyng12.memos.pub/blog/posts/hello-world.mdx
		url.pathname = `/_blog/huyng12/blog/posts${url.pathname}`;
		return NextResponse.rewrite(url);
	}

	const redirect = redirectBlogGitHubUrl(req);
	if (redirect !== null) return redirect;

	// GitLab should be preferred over GitHub rewrite
	const glRewrite = rewriteBlogGitLabUrl(req);
	if (glRewrite !== null) return glRewrite;

	const rewrite = rewriteBlogGitHubUrl(req);
	if (rewrite !== null) return rewrite;

	return NextResponse.next();
};
