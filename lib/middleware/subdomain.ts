// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from "next/server";
import { getEnvRootHost } from "../env";

/**
 * Get subdomain info from host. E.g.:
 * - thien-do.memos.pub -> "thien-do"
 * - memos.pub -> null
 * - thien-do.localhost:3000 -> "thien-do"
 * - localhost:3000 -> null
 */
export const getRequestSubdomain = (req: NextRequest): string | null => {
	// Get host from headers to have subdomain. nextUrl.host doesn't have
	// sub-domain.
	const host = req.headers.get("host");
	if (host === null) throw Error("Host is not defined");

	const root = getEnvRootHost();
	if (host === root) return null; // no owner, we're at root
	const owner = host.replace(`.${root}`, "");
	return owner;
};
