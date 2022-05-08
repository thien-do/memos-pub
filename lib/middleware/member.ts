// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { join as pathJoin } from "path";
import { MEMBER_LIST } from "../member/list";

/**
 * Re-write member requests. E.g.
 * - thien.do 			-> /_blog/thien.do/thien-do/thien-do
 * - thien.do/foo.md	-> /_blog/thien.do/thien-do/thien-do/foo.md
 */
export const memberMiddleware = (req: NextRequest): null | NextResponse => {
	// Prefer "host" header because it works better in local dev. E.g. When
	// thien.do is mapped to localhost via /etc/hosts:
	// - req.nextUrl.host returns "localhost"
	// - req.headers.get("host") return "thien.do:3000" -> we want this
	const host = req.headers.get("host")?.replace(":3000", "");
	if (host === null) throw Error("Host is not defined");

	const member = MEMBER_LIST.find((member) => member.from === host);
	if (member === undefined) return null;

	const url = req.nextUrl.clone();
	const { from, to } = member;
	const { pathname } = req.nextUrl;
	// Not sure if pathname has leading slash so using pathJoin to be sure
	url.pathname = `/_blog/${pathJoin(from, to, pathname)}`;

	return NextResponse.rewrite(url);
};
