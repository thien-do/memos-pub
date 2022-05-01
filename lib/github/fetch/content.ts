import { getEnvGitHubToken } from "@/lib/app/env";
import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";
import { GitHubRequest } from "../type";
import { GitHubContent } from "./type";
import { githubErrorHasStatus } from "./blog/error";

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
		console.info("github cache miss");
		cacheMap.set(cacheKey, response);
		return response.data;
	} catch (error) {
		// Return cache
		if (!githubErrorHasStatus(error)) throw error;
		if (error.status !== 304) throw error;
		if (cached === undefined) throw Error("No cache but 304");
		console.info("github cache hit");
		return cached.data;
	}
};
