import { BlogRequestBase } from "../blog/type";

export interface BlogGitHubRequest extends BlogRequestBase {
	/** e.g. "thien-do" */
	owner: string;
	/** e.g. "notes" */
	repo: string;
	/** e.g. "dir/foo", "dir/foo/hello.md", "" when at repo root */
	path: string;
}
