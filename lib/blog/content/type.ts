import { BlogList } from "../list/type";
import { BlogPost } from "../post/type";

export type BlogContent = BlogList | BlogPost | BlogContentError;

export interface BlogContentError {
	type: "error";
	status: number;
	message: string;
}
