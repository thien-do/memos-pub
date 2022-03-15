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
	/**
	 * MDX's code to be executed on client-side
	 */
	code: string;
}

export type BlogResponse = BlogDir | BlogFile;

/**
 * Params to get a resource from GitHub
 */
export interface BlogRequest {
	/** e.g. "thien-do" */
	owner: string;
	/** e.g. "notes" */
	repo: string;
	/** e.g. "dir/foo", "dir/foo/hello.md" */
	path: string;
}
