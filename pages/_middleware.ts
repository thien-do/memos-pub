import { NextResponse, NextMiddleware } from "next/server";
import { getMwTenant, getMwTenantRedirect } from "@/lib/middleware/tenant";

/*
Re-route `foo.memos.pub/bar/baz` into `memos.pub/_tenants/foo/bar/baz`. Extended
from https://github.com/vercel/platforms/blob/main/pages/_middleware.js
*/
const middleware: NextMiddleware = (req) => {
	// host: e.g. "thien-do.memos.pub"
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")
	// Get host from headers to have subdomain. nextUrl.host doesn't have
	// sub-domain.
	const host = req.headers.get("host");
	if (host === null) throw Error("Host is not defined");
	const tenant = getMwTenant(host);

	// Skip /api requests
	if (pathname.startsWith("/api")) return NextResponse.next();

	// Avoid direct access to tenant routing
	if (pathname.startsWith(`/_tenants`))
		return new NextResponse(null, { status: 404 });

	// Tenant request -> Rewrite to _tenants
	if (tenant !== null) {
		const url = req.nextUrl.clone();
		url.pathname = `/_tenants/${tenant}${pathname}`;
		return NextResponse.rewrite(url);
	}

	// Root request with asset -> Redirect to tenant request
	if (tenant === null && pathname.startsWith("/github.com")) {
		const redirect = getMwTenantRedirect(pathname);
		const url = req.nextUrl.clone();
		url.host = `${redirect.tenant}.${process.env.MP_ROOT_HOST}`;
		url.pathname = redirect.path;
		return NextResponse.redirect(url);
	}

	NextResponse.next();
};

export default middleware;
