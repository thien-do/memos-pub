// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextRequest, NextResponse } from "next/server";

/**
 * Get tenant info from host. E.g.:
 * - thien-do.memos.pub -> "thien-do"
 * - memos.pub -> null
 * - thien-do.localhost:3000 -> "thien-do"
 * - localhost:3000 -> null
 */
const getTenant = (req: NextRequest): string | null => {
	// Get host from headers to have subdomain. nextUrl.host doesn't have
	// sub-domain.
	const host = req.headers.get("host");
	if (host === null) throw Error("Host is not defined");

	const root = process.env.MP_ROOT_HOST; // part without tenant
	if (host === root) return null; // no tenant, we're at root
	const tenant = host.replace(`.${root}`, "");
	return tenant;
};

/*
Re-route `foo.memos.pub/bar/baz` into `memos.pub/_tenants/foo/bar/baz`. Extended
from https://github.com/vercel/platforms/blob/main/pages/_middleware.js
*/
export const rewriteTenantMiddleware: NextMiddleware = (req) => {
	// e.g. "/blog-slug" (this includes "/")
	const { pathname } = req.nextUrl;
	const tenant = getTenant(req);

	if (tenant === null) return NextResponse.next();

	// Rewrite tenant request to _tenants
	const url = req.nextUrl.clone();
	url.pathname = `/_tenants/${tenant}${pathname}`;
	return NextResponse.rewrite(url);
};
