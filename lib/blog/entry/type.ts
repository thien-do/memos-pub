export type BlogEntry = BlogEntryPost | BlogEntryList;

export interface BlogEntryBase {
	/** Raw name, use to fetch */
	name: string;
	/** Clean name, use to display */
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
