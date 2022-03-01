export interface ContentDirFile {
	type: "file" | "dir";
	name: string;
}

export interface ContentDir {
	type: "dir";
	files: ContentDirFile[];
}

export interface ContentFile {
	type: "file";
	markdown: string;
	html: string;
}

export type ContentCommon = ContentDir | ContentFile;
