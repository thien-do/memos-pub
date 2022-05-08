// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { getEnvRootHost } from "../env";
import { join as pathJoin } from "path";

/**
 * Re-write subdomain requests. E.g.
 * - Request: thien-do.memos.pub/notes/hello.md
 * - Rewrite: /_blog/_/thien-do/notes/hello/md
 */
export const subdomainMiddleware = (req: NextRequest): null | NextResponse => {
	const { pathname } = req.nextUrl;
	const owner = getSubdomain(req);
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
	url.pathname = pathJoin("_blog", "_", owner, pathname);
	return NextResponse.rewrite(url);
};

/**
 * Get subdomain info from host. E.g.:
 * - thien-do.memos.pub -> "thien-do"
 * - memos.pub -> null
 * - thien-do.localhost:3000 -> "thien-do"
 * - localhost:3000 -> null
 */
const getSubdomain = (req: NextRequest): string | null => {
	// Get host from headers to have subdomain. nextUrl.host doesn't have
	// sub-domain.
	const host = req.headers.get("host");
	if (host === null) throw Error("Host is not defined");

	const root = getEnvRootHost();
	if (host === root) return null; // no subdomain, we're at root
	const subdomain = host.replace(`.${root}`, "");
	return subdomain;
};
