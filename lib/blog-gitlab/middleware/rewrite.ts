import { getBlogOwner } from "@/lib/blog/middleware/owner";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

/*
Re-route `gitlabhq.memos.pub/<path>` into `memos.pub/_blog-gitlab/<path>`
*/
export const rewriteBlogGitLabUrl = (req: NextRequest): null | NextResponse => {
	const owner = getBlogOwner(req);
	if (owner === null) return null;
	if (owner !== "gitlabhq") return null;

	// Rewrite requests to gitlab controller
	const url = req.nextUrl.clone();
	url.pathname = `/_blog-gitlab${url.pathname}`;
	return NextResponse.rewrite(url);
};
