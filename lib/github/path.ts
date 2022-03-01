// github.com/MQuy/MQuy/tree/master/notes
// github.com/MQuy/MQuy/blob/master/notes/2022-01-04%20Blocking%20vs%20Non-Blocking.md

export interface GitHubPath {
	owner: string;
	repo: string;
	path: string;
	type: "tree" | "blob";
	branch: string;
}

const ensureType = (type: string): type is GitHubPath["type"] => {
	return ["tree", "blob"].includes(type);
};

export const parseGitHubPath = (segments: string[]): GitHubPath => {
	const [host, owner, repo, type, branch, ...others] = segments;
	if (host !== "github.com") throw Error("Host is not github.com");
	const path = others.join("/");
	if (!ensureType(type)) throw Error(`Unknown type "${type}"`);
	return { owner, repo, path, type, branch };
};
