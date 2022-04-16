export interface BlogDirConfig {
	/**
	 * Control the display of the dir's README file (if exist):
	 * - "show": Display the README below the entry list
	 * - "hide": Don't display the README
	 * - "only": Display only the README, hide the dir's name and entry list.
	 *
	 * Default is "show"
	 */
	readme?: "show" | "only" | "hide";
	/**
	 * Customize the entry list. Use this to control the order of blog posts
	 * or display different titles than file names.
	 *
	 * If not defined, memos.pub uses the original file names to list and sort
	 * the entry list
	 */
	entries?: BlogDirConfigEntry[];
}

export interface BlogDirConfigEntry {
	/**
	 * The name to be displayed in the entry list. It can include whitespace,
	 * punctuation marks or any special characters. This is usually the
	 * article's title.
	 *
	 * E.g. "This, That, and the Other! An Outré Collection"
	 */
	name: string;
	/**
	 * The actual name of the markdown file. It is used in URLs and to fetch
	 * the file content. This is usually a short, URL-friendly file name.
	 *
	 * E.g. "this-that-other-outre-collection.md"
	 */
	path: string;
}
