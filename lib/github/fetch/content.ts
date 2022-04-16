import { getEnvGitHubToken } from "@/lib/app/env";
import { Octokit } from "octokit";
import { GitHubRequest } from "../type";
import { GitHubContent } from "./type";

const _octokit: { current: Octokit | null } = { current: null };

export const getOctokit = (): Octokit => {
	if (_octokit.current === null) {
		_octokit.current = new Octokit({
			// Doesn't really need "auth" but provide to have better rate limit
			auth: getEnvGitHubToken(),
		});
	}
	return _octokit.current;
};

export const fetchGitHubContent = async (
	request: GitHubRequest
): Promise<GitHubContent> => {
	const { owner, path, repo } = request;
	const response = await getOctokit().rest.repos.getContent({
		...{ owner, path, repo },
		mediaType: { format: "json" },
	});
	return response.data;
};
