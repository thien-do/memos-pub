export interface BlogDirEntryBase {
	name: string;
}

export interface BlogDirEntryFile extends BlogDirEntryBase {
	type: "file";
}

export interface BlogDirEntryDir extends BlogDirEntryBase {
	type: "dir";
}

export type BlogDirEntry = BlogDirEntryFile | BlogDirEntryDir;

export type BlogDirEntryDisplay = BlogDirEntry & {
	title: string;
	date: Date | null;
};

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
