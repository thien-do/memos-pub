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
