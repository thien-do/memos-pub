import { BlogRequestBase } from "../blog/type";

export interface BlogGitLabRequest extends BlogRequestBase {
	/** path to project */
	project: string;
	/** path to resource, "" when at repo root */
	path: string;
	/** the name of branch, tag or commit, HEAD when none defined */
	ref: string;
	type: "tree" | "blob";
}
