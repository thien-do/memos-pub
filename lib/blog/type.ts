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

export interface BlogRequestBase {
	path: string;
}
