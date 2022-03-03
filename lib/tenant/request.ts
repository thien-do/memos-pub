import { ContentRequest } from "../content/type";

/**
 * PageRequest comes from outside so it's expectedly loose (fields are optional,
 * and the request itself may also be undefined)
 */
interface PageRequest {
	slug: string[] | undefined;
	tenant: string | undefined;
}

export const parseTenantRequest = (
	page: PageRequest | undefined
): ContentRequest => {
	if (page === undefined) throw Error("request is undefined");
	const { slug, tenant } = page;
	if (tenant === undefined) throw Error("tenant is undefined");
	if (slug === undefined) throw Error("slug is undefined");

	const owner = tenant;
	const [repo, ...parts] = slug;
	const path = parts.join("/");

	const content: ContentRequest = { owner, path, repo };
	return content;
};
