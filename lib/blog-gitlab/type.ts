/**
 * Params to get a resource from GitLab
 */
export interface BlogGitlabRequest {
	source: "gitlab";
	/** path to project */
	project: string;
	/** path to resource, "" when at repo root */
	path: string;
	/** The name of branch, tag or commit */
	ref: string | null;
	type: "tree" | "blob";
}
