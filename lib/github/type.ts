export interface GitHubRequest {
	/**
	 * e.g. "thien-do"
	 */
	owner: string;
	/**
	 * e.g. "notes", "notes/2022"
	 */
	repo: string;
	/**
	 * - e.g. "dir/foo", "dir/foo/hello.md"
	 * - "" when at repo root
	 */
	path: string;
}
