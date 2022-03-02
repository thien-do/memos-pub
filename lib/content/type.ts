export interface ContentDirEntry {
	type: "file" | "dir";
	name: string;
}

export interface ContentDir {
	type: "dir";
	entries: ContentDirEntry[];
}

export interface ContentFile {
	type: "file";
	markdown: string;
	html: string;
}

export type ContentCommon = ContentDir | ContentFile;

/**
 * Params to get a resource from GitHub
 */
export interface ContentRequest {
	/** e.g. "thien-do" */
	owner: string;
	/** e.g. "notes" */
	repo: string;
	/** e.g. "dir/foo", "dir/foo/hello.md" */
	path: string;
}
