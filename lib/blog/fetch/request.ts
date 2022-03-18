import { BlogRequest } from "../type";

/**
 * PageRequest comes from outside so it's expectedly loose (fields are optional,
 * and the request itself may also be undefined)
 */
export type BlogPageParams =
	| { slug: string[] | undefined; owner: string | undefined }
	| undefined;

export const parseBlogRequest = (page: BlogPageParams): BlogRequest => {
	if (page === undefined) throw Error("request is undefined");
	const { owner } = page;
	if (owner === undefined) throw Error("owner is undefined");

	// Use special profile repo if there's no slug (no repo specified)
	// https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme
	const slug = page.slug ?? [owner];

	const [repo, ...parts] = slug;
	const path = parts.join("/");

	const request: BlogRequest = { owner, path, repo };
	return request;
};
