export type BlogListEntry = BlogListEntryPost | BlogListEntryList;

export interface BlogListEntryPost {
	type: "post";
	name: string;
}

export interface BlogListEntryList {
	type: "list";
	name: string;
}

export type BlogListEntryDisplay = BlogListEntry & {
	title: string;
	date: Date | null;
};
