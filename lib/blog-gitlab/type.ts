/**
 * Params to get a resource from GitLab
 */
export interface BlogGitlabRequest {
	/** URL-encoded path of project */
	project: string;
	/** URL-encoded path to resource */
	path: string | null;
	/** The name of branch, tag or commit */
	ref: string | null;
	type: "tree" | "blob";
}
