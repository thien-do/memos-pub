import { BlogDir } from "./dir/type";
import { BlogFile } from "./file/type";

export interface BlogRequestBase {
	path: string;
}

export type BlogResponse = BlogDir | BlogFile | BlogError;

export interface BlogError {
	type: "error";
	status: number;
	message: string;
}
