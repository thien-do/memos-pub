import { Octokit } from "octokit";
import { getEnvGitHubToken } from "../env";
import { getGitHubCache, setGitHubCache } from "./cache";
import { isErrorHasStatus } from "./error";
import type { GitHubContent, GitHubRequest } from "./type";

const _octokit: { current: Octokit | null } = { current: null };

const getOctokit = (): Octokit => {
	if (_octokit.current === null) {
		_octokit.current = new Octokit({
			auth: getEnvGitHubToken(),
		});
	}
	return _octokit.current;
};

export const fetchGitHubContent = async (
	request: GitHubRequest
): Promise<GitHubContent> => {
	const { owner, path, repo } = request;
	const cached = await getGitHubCache(request);
	try {
		const response = await getOctokit().rest.repos.getContent({
			...{ owner, path, repo },
			headers: { "If-None-Match": cached?.headers.etag },
			mediaType: { format: "json" },
		});
		setGitHubCache(request, response);
		return response.data;
	} catch (error) {
		// Return cache
		if (!isErrorHasStatus(error)) throw error;
		if (error.status !== 304) throw error;
		if (cached === null) throw Error("No cache but 304");
		return cached.data;
	}
};
