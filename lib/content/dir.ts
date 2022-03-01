export interface ContentDirFile {
	type: "file" | "dir";
	name: string;
}

export interface ContentDir {
	files: ContentDirFile[];
}
