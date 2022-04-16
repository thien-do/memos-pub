import { BlogEntry } from "../entry/type";
import { BlogPost } from "../post/type";
import { BlogListConfig } from "./config";

export interface BlogList {
	type: "list";
	entries: BlogEntry[];
	readme: BlogPost | null;
	config: BlogListConfig | null;
}
