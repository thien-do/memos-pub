import { blogMwGetOwner } from "@/lib/blog/middleware/rewrite";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

/*
Re-route `gitlabhq.memos.pub/<path>` into `memos.pub/_blog-gitlab/<path>`
*/
export const blogGitlabMwRewrite = (req: NextRequest): null | NextResponse => {
	const owner = blogMwGetOwner(req);
	if (owner === null) return null;
	if (owner !== "gitlabhq") return null;

	// Rewrite requests to gitlab controller
	const url = req.nextUrl.clone();
	url.pathname = `/_blog-gitlab/${url.pathname}`.replaceAll("//", "/");
	return NextResponse.rewrite(url);
};
