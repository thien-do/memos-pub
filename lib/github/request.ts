import { GitHubBlogRequest } from "./type";

/**
 * PageRequest comes from outside so it's expectedly loose (fields are optional,
 * and the request itself may also be undefined)
 */
export type GitHubBlogPageParams =
	| { slug: string[] | undefined; owner: string | undefined }
	| undefined;

export const parseGitHubBlogRequest = (
	page: GitHubBlogPageParams
): GitHubBlogRequest => {
	if (page === undefined) throw Error("request is undefined");
	const { owner, slug } = page;
	if (owner === undefined) throw Error("owner is undefined");
	if (slug === undefined) throw Error("repo (slug) is undefined");

	const [repo, ...parts] = slug;
	const path = parts.join("/");

	const request: GitHubBlogRequest = { owner, path, repo };
	return request;
};