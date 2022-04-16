export type BlogEntry = BlogEntryPost | BlogEntryList;

export interface BlogEntryBase {
	/** Fetch, URL */
	name: string;
	/** Display, sort */
	title: string;
	date: Date | null;
}

export interface BlogEntryPost extends BlogEntryBase {
	type: "post";
}

export interface BlogEntryList extends BlogEntryBase {
	type: "list";
}
