import { BlogPost } from "../post/type";
import { BlogListConfig } from "./config/type";
import { BlogListEntry } from "./entry/type";

export interface BlogList {
	type: "list";
	entries: BlogListEntry[];
	readme: BlogPost | null;
	config: BlogListConfig | null;
}
