import { getEnvGitHubToken } from "@/lib/env";
import { Octokit } from "octokit";

const ref: {
	current: Octokit | null;
} = {
	current: null,
};

export const getOctokit = (): Octokit => {
	if (ref.current === null) {
		ref.current = new Octokit({
			// Doesn't really need "auth" but provide to have better rate limit
			auth: getEnvGitHubToken(),
		});
	}
	return ref.current;
};
