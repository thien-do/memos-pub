import { NextResponse, NextMiddleware } from "next/server";

/*
Re-route `foo.memos.pub/bar/baz` into `memos.pub/_sites/foo/bar/baz`. Extended
from https://github.com/vercel/platforms/blob/main/pages/_middleware.js
*/
const middleware: NextMiddleware = (req) => {
	// clone the request url to change it later
	const url = req.nextUrl.clone();

	// get parts of url
	const { pathname } = req.nextUrl; // e.g. "/blog-slug" (this includes "/")
	const host = req.headers.get("host"); // e.g. "thien.memos.pub"
	if (host === null) throw Error("Host is null");
	const tenant =
		process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
			? host.replace(`.memos.pub`, "") // e.g. "thien"
			: host.replace(`.localhost:3000`, "");

	// _sites is our dynamic routing logic
	if (pathname.startsWith(`/_sites`)) {
		return new Response(null, { status: 404 });
	}

	// avoid rewriting /api requests
	if (pathname.startsWith("/api")) return;

	const isHome = host === "localhost:3000" || host === "memos.pub"; // not tenant
	const prefix = isHome ? "/home" : `_sites/${tenant}`;
	url.pathname = `${prefix}${pathname}`;
	return NextResponse.rewrite(url);
};

export default middleware;
