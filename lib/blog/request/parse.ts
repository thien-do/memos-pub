import { BlogRequest } from "./type";

/**
 * PageRequest comes from outside so it's expectedly loose (fields are optional,
 * and the request itself may also be undefined)
 */
export interface BlogPageParams extends NodeJS.Dict<string | string[]> {
	domain: string | undefined;
	owner: string | undefined;
	slug: string[] | undefined;
}

export const parseBlogRequest = (
	page: BlogPageParams | undefined
): BlogRequest => {
	if (page === undefined) throw Error("request is undefined");

	const { owner, slug } = page;
	if (page.domain === undefined) throw Error("domain is undefined");
	if (owner === undefined) throw Error("owner is undefined");
	if (slug === undefined) throw Error("slug is undefined");

	const domain = page.domain === "_" ? null : page.domain;
	const [repo, ...parts] = slug;
	const path = parts.join("/");

	const request: BlogRequest = { domain, owner, path, repo };
	return request;
};
