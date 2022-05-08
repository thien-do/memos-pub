import { components, operations } from "@octokit/openapi-types";

export interface GitHubRequest {
	/** E.g. "thien-do" */
	owner: string;
	/** E.g. "notes" */
	repo: string;
	/** E.g. "dir/foo", "dir/foo/hello.md", "" when at repo root */
	path: string;
}

export type GitHubContent =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

export type GitHubFile = components["schemas"]["content-file"];

export type GitHubDir = components["schemas"]["content-directory"];

export type GitHubEntry = GitHubDir[number];
