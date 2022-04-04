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
	// owner is null when we are at root -> null to skip to other middleware
	if (owner === null) return null;

	// Redirect to profile repo if no repo exists in pathname
	// https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme
	if (pathname === "/") {
		const url = req.nextUrl.clone();
		url.pathname = `/${owner}/`;
		return NextResponse.redirect(url);
	}

	// Rewrite blog request to _blog
	const url = req.nextUrl.clone();
	// No "/" between owner and pathname because pathname includes "/"
	url.pathname = `/_blog-github/${owner}${pathname}`;
	return NextResponse.rewrite(url);
};
