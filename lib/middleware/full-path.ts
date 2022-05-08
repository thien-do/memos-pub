// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { BlogRequest } from "../blog/request/type";
import { join as pathJoin } from "path";
import { getEnvRootHost } from "../env";

/**
 * Redirect memos.pub/https:/github.com/... to <owner>.memos.pub/...
 */
export const fullPathMiddleware = (req: NextRequest): NextResponse | null => {
	const { pathname } = req.nextUrl;

	// Parse pathname for request parts
	const request = parseRequest(pathname);
	if (request === null) return null; // skip

	const { owner, path, repo } = request;
	const url = req.nextUrl.clone();
	url.host = `${owner}.${getEnvRootHost()}`;
	url.pathname = `/${pathJoin(repo, path)}`;
	return NextResponse.redirect(url);
};

const parseRequest = (pathname: string): BlogRequest | null => {
	// > "/https:/github.com/axieinfinity/festival/blob/master/component_export.md".split("/");
	// ['', 'https:', 'github.com', 'axieinfinity', 'festival', 'blob', 'master', 'component_export.md']
	// > "/https:/github.com/axieinfinity/festival/".split("/");
	// [ '', 'https:', 'github.com', 'axieinfinity', 'festival', '' ]
	// > "/https:/github.com/axieinfinity/".split("/");
	// [ '', 'https:', 'github.com', 'axieinfinity', '' ]
	const [_blank, _protocol, host, owner, oRepo, _blob, _branch, ...paths] =
		pathname.split("/");
	if (host !== "github.com") return null;
	// When repo is not defined then use profile repo (thien-do/thien-do)
	const repo = oRepo ?? owner;
	const path = paths.join("/");
	return { owner, repo, path, domain: null };
};
