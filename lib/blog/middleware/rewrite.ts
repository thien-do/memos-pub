// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

/**
 * Get owner info from host. E.g.:
 * - thien-do.memos.pub -> "thien-do"
 * - memos.pub -> null
 * - thien-do.localhost:3000 -> "thien-do"
 * - localhost:3000 -> null
 */
export const blogMwGetOwner = (req: NextRequest): string | null => {
	// Get host from headers to have subdomain. nextUrl.host doesn't have
	// sub-domain.
	const host = req.headers.get("host");
	if (host === null) throw Error("Host is not defined");

	const root = process.env.MP_ROOT_HOST; // part without owner
	if (host === root) return null; // no owner, we're at root
	const owner = host.replace(`.${root}`, "");
	return owner;
};

/*
Re-route `foo.memos.pub/bar/baz` into `memos.pub/_blog/foo/bar/baz`. Extended
from https://github.com/vercel/platforms/blob/main/pages/_middleware.js
*/
export const blogMwRewrite = (req: NextRequest): null | NextResponse => {
	// e.g. "/blog-slug" (this includes "/")
	const { pathname } = req.nextUrl;
	const owner = blogMwGetOwner(req);

	if (owner === null) return null;

	// Rewrite blog request to _blog
	const url = req.nextUrl.clone();
	// No "/" between owner and pathname because pathname includes "/"
	url.pathname = `/_blog/${owner}${pathname}`;
	return NextResponse.rewrite(url);
};
