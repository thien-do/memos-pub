import { NextResponse, NextMiddleware } from "next/server";

const middleware: NextMiddleware = (req) => {
	const url = req.nextUrl.clone(); // clone the request url
	const { pathname } = req.nextUrl; // get pathname of request (e.g. /blog-slug)
	const hostname = req.headers.get("host"); // get hostname of request (e.g. demo.vercel.pub)
	if (hostname === null) throw Error("Host is null");

	// // only for demo purposes – remove this if you want to use your root domain as the landing page
	// if (hostname === "vercel.pub" || hostname === "platforms.vercel.app") {
	// 	return NextResponse.redirect("https://demo.vercel.pub");
	// }

	const currentHost =
		process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
			? hostname.replace(`.writing.md`, "") // you have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
			: hostname.replace(`.localhost:3000`, "");

	if (pathname.startsWith(`/_sites`)) {
		return new Response(null, { status: 404 });
	}

	if (!pathname.includes(".") && !pathname.startsWith("/api")) {
		if (hostname === "localhost:3000") {
			url.pathname = `/home`;
			return NextResponse.rewrite(url);
		} else {
			url.pathname = `/_sites/${currentHost}${pathname}`;
			return NextResponse.rewrite(url);
		}
	}
};

export default middleware;
