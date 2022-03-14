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
	const { tenant } = page;
	if (tenant === undefined) throw Error("tenant is undefined");

	const owner = tenant;
	// Use special profile repo if there's no slug (no repo specified)
	// https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme
	const slug = page.slug ?? [owner];

	const [repo, ...parts] = slug;
	const path = parts.join("/");

	const content: ContentRequest = { owner, path, repo };
	return content;
};
