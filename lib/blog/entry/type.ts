export type BlogEntry = BlogEntryPost | BlogEntryList;

export interface BlogEntryBase {
	/** Fetch, URL */
	name: string;
	/** Display, sort */
	title: string;
	/** Always in yyyy-mm-dd if exist */
	date: string | null;
}

export interface BlogEntryPost extends BlogEntryBase {
	type: "post";
}

export interface BlogEntryList extends BlogEntryBase {
	type: "list";
}
