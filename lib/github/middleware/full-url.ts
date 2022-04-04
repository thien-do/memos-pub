// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { GitHubBlogRequest } from "../type";

// > "/https:/github.com/axieinfinity/festival/blob/master/component_export.md".split("/");
// ['', 'https:', 'github.com', 'axieinfinity', 'festival', 'blob', 'master', 'component_export.md']
// > "/https:/github.com/axieinfinity/festival/".split("/");
// [ '', 'https:', 'github.com', 'axieinfinity', 'festival', '' ]
// > "/https:/github.com/axieinfinity/".split("/");
// [ '', 'https:', 'github.com', 'axieinfinity', '' ]
const getRequest = (pathname: string): GitHubBlogRequest | null => {
	const parts = pathname.split("/");
	const [_blank, _protocol, host, owner, oRepo, _blob, _branch, ...paths] =
		parts;
	// When repo is not defined then use profile repo (thien-do/thien-do)
	const repo = oRepo ?? owner;
	if (host !== "github.com") return null;
	return { owner, repo, path: paths.join("/") };
};

/**
 * Redirect memos.pub/https:/github.com/... to <owner>.memos.pub/...
 * Return null if should skip
 */
export const redirectGitHubFullUrl = (
	req: NextRequest
): NextResponse | null => {
	// e.g. "/blog-slug" (this includes "/")
	const { pathname } = req.nextUrl;

	const request = getRequest(pathname);
	if (request === null) return null; // skip

	const { owner, path, repo } = request;
	const url = req.nextUrl.clone();
	url.host = `${owner}.${process.env.MP_ROOT_HOST}`;
	url.pathname = `/${repo}/${path}`;
	return NextResponse.redirect(url);
};
