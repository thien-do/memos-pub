export interface BlogDirEntry {
	type: "file" | "dir";
	name: string;
}

export interface BlogDir {
	type: "dir";
	entries: BlogDirEntry[];
	/**
	 * A dir may have an "index" or "README" file which should be displayed
	 * along the entry list
	 */
	readme: BlogFile | null;
}

export interface BlogFile {
	type: "file";
	code: string;
}

export interface BlogError {
	type: "error";
	status: number;
	message: string;
}

export type BlogResponse = BlogDir | BlogFile | BlogError;

/**
 * Params to get a resource from GitHub
 */
export interface BlogRequest {
	source: "github";
	/** e.g. "thien-do" */
	owner: string;
	/** e.g. "notes" */
	repo: string;
	/** e.g. "dir/foo", "dir/foo/hello.md", "" when at repo root */
	path: string;
}

/**
 * BlogRequest does not have "ref" info because they are parsed from URL. Ref
 * is only available after fetching, and it is required in some uses (e.g.
 * resolve image src)
 */
export interface BlogRequestWithRef extends BlogRequest {
	ref: string;
}
