// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { BlogRequest } from "../type";

// > "/https:/github.com/axieinfinity/festival/blob/master/component_export.md".split("/");
// ['', 'https:', 'github.com', 'axieinfinity', 'festival', 'blob', 'master', 'component_export.md']
// > "/https:/github.com/axieinfinity/festival/".split("/");
// [ '', 'https:', 'github.com', 'axieinfinity', 'festival', '' ]
const getRequest = (pathname: string): BlogRequest | null => {
	const parts = pathname.split("/");
	const [_1, _protocol, host, owner, repo, _blob, _branch, ...paths] = parts;
	if (host !== "github.com") return null;
	return { source: "github", owner, repo, path: paths.join("/") };
};

/**
 * Redirect memos.pub/https:/github.com/... to <owner>.memos.pub/...
 * Return null if should skip
 */
export const blogMwRedirect = (req: NextRequest): NextResponse | null => {
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
