/**
 * Get tenant info from host. E.g.:
 * - thien-do.memos.pub -> "thien-do"
 * - memos.pub -> null
 * - thien-do.localhost:3000 -> "thien-do"
 * - localhost:3000 -> null
 */
export const getMwTenant = (host: string): string | null => {
	const root = process.env.MP_ROOT_HOST; // part without tenant
	if (host === root) return null; // no tenant, we're at root
	const tenant = host.replace(`.${root}`, "");
	return tenant;
};

interface TenantPath {
	tenant: string;
	path: string;
}

/**
 * Transform raw path into a redirect. E.g.:
 *
 * - input:  /github.com/thien-do/notes/blob/main/hello-world.md
 * - output: { tenant: "thien-do", path: "/notes/hello-world.md" }
 *
 * - input:  /github.com/thien-do/notes
 * - output: { tenant: "thien-do", path: "/notes" }
 */
export const getMwTenantRedirect = (pathname: string): TenantPath => {
	const [_empty, host, user, repo, _type, _branch, ...others] =
		pathname.split("/");

	if (host !== "github.com") throw Error(`Unsupported host "${host}`);

	const parts: string[] = [repo];
	if (others !== undefined) parts.push(...others);
	return { tenant: user, path: `/${parts.join("/")}` };
};
