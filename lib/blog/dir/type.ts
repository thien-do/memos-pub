import { BlogFile } from "../file/type";
import { BlogDirConfig } from "./config/type";

export interface BlogDir {
	type: "dir";
	entries: BlogDirEntry[];
	/**
	 * A dir may have an "index" or "README" file which should be displayed
	 * along the entry list
	 */
	readme: BlogFile | null;
	config?: BlogDirConfig;
}

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
