import { getBlogOwner } from "@/lib/blog/middleware/owner";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

/*
Re-route `foo.memos.pub/bar/baz` into `memos.pub/_blog/foo/bar/baz`. Extended
from https://github.com/vercel/platforms/blob/main/pages/_middleware.js
*/
export const rewriteBlogGitHubUrl = (req: NextRequest): null | NextResponse => {
	// e.g. "/blog-slug" (this includes "/")
	const { pathname } = req.nextUrl;
	const owner = getBlogOwner(req);

	if (owner === null) return null;

	// Rewrite blog request to _blog
	const url = req.nextUrl.clone();
	// No "/" between owner and pathname because pathname includes "/"
	url.pathname = `/_blog-github/${owner}${pathname}`;
	return NextResponse.rewrite(url);
};
