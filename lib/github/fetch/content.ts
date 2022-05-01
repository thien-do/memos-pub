import { getEnvGitHubToken } from "@/lib/app/env";
import type { OctokitResponse } from "@octokit/types";
import { Octokit } from "octokit";
import type { GitHubRequest } from "../type";
import { githubErrorHasStatus } from "./blog/error";
import type { GitHubContent } from "./type";

const _octokit: { current: Octokit | null } = { current: null };

const getOctokit = (): Octokit => {
	if (_octokit.current === null) {
		_octokit.current = new Octokit({
			// Doesn't really need "auth" but provide to have better rate limit
			auth: getEnvGitHubToken(),
		});
	}
	return _octokit.current;
};

const cacheMap: Map<string, OctokitResponse<GitHubContent, 200>> = new Map();

export const getGitHubContentCache = () => cacheMap;

export const fetchGitHubContent = async (
	request: GitHubRequest
): Promise<GitHubContent> => {
	const { owner, path, repo } = request;
	const cacheKey = `${owner}/${repo}/${path}`;
	const cached = cacheMap.get(cacheKey);
	try {
		const response = await getOctokit().rest.repos.getContent({
			...{ owner, path, repo },
			headers: { "If-None-Match": cached?.headers.etag },
			mediaType: { format: "json" },
		});
		cacheMap.set(cacheKey, response);
		return response.data;
	} catch (error) {
		// Return cache
		if (!githubErrorHasStatus(error)) throw error;
		if (error.status !== 304) throw error;
		if (cached === undefined) throw Error("No cache but 304");
		return cached.data;
	}
};
