import { BlogEntry } from "../entry/type";
import { BlogPost } from "../post/type";

export interface BlogList {
	type: "list";
	entries: BlogEntry[];
	readme: BlogPost | null;
}
